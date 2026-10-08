"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// 5x7 font definition for monochrome LED rendering
const FONT_5X7: Record<string, number[]> = {
  O: [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  N: [0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001],
  L: [0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111],
  I: [0b01110, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
  E: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111],
  R: [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001],
  A: [0b01110, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  D: [0b11110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b11110],
  Y: [0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100, 0b00100],
  " ": [0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000],
};

const ROWS = 8;
const COLS = 38;

type MatrixState =
  | { mode: "status"; label: "ONLINE" | "READY" }
  | { mode: "life"; countdown: number };

interface DotMatrixProps {
  initialLabel?: "ONLINE" | "READY";
  className?: string;
  onLifeStart?: () => void;
}

export function DotMatrix({
  initialLabel = "ONLINE",
  className,
  onLifeStart,
}: DotMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [matrixState, setMatrixState] = useState<MatrixState>({
    mode: "status",
    label: initialLabel,
  });

  const lifeGridRef = useRef<boolean[][]>([]);

  // Seed Conway's Life grid
  const initLifeGrid = useCallback(() => {
    const grid: boolean[][] = [];
    for (let r = 0; r < ROWS; r++) {
      grid[r] = [];
      for (let c = 0; c < COLS; c++) {
        grid[r][c] = Math.random() < 0.28;
      }
    }
    // Inject a glider on left
    grid[1][1] = true;
    grid[2][2] = true;
    grid[3][0] = true;
    grid[3][1] = true;
    grid[3][2] = true;
    lifeGridRef.current = grid;
  }, []);

  const triggerConway = () => {
    if (matrixState.mode === "life") return;
    initLifeGrid();
    setMatrixState({ mode: "life", countdown: 10 });
    onLifeStart?.();
  };

  // Conway step calculation
  const stepLife = useCallback(() => {
    const prev = lifeGridRef.current;
    if (!prev || prev.length === 0) return;

    const next: boolean[][] = [];
    for (let r = 0; r < ROWS; r++) {
      next[r] = [];
      for (let c = 0; c < COLS; c++) {
        let neighbors = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = (r + dr + ROWS) % ROWS;
            const nc = (c + dc + COLS) % COLS;
            if (prev[nr]?.[nc]) neighbors++;
          }
        }
        const alive = prev[r][c];
        if (alive && (neighbors === 2 || neighbors === 3)) {
          next[r][c] = true;
        } else if (!alive && neighbors === 3) {
          next[r][c] = true;
        } else {
          next[r][c] = false;
        }
      }
    }
    lifeGridRef.current = next;
  }, []);

  // Life mode timer
  useEffect(() => {
    if (matrixState.mode !== "life") return;

    const interval = setInterval(() => {
      setMatrixState((curr) => {
        if (curr.mode !== "life") return curr;
        if (curr.countdown <= 1) {
          return { mode: "status", label: initialLabel };
        }
        return { mode: "life", countdown: curr.countdown - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [matrixState.mode, initialLabel]);

  // Main canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastLifeTick = 0;

    const render = (time: number) => {
      const isDark = document.documentElement.classList.contains("dark");
      const dotActive = isDark ? "#fafafa" : "#18181b";
      const dotInactive = isDark ? "#27272a" : "#e4e4e7";

      const dotSize = 2;
      const dotGap = 1.5;
      const step = dotSize + dotGap;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (matrixState.mode === "life") {
        if (time - lastLifeTick > 120) {
          stepLife();
          lastLifeTick = time;
        }

        const grid = lifeGridRef.current;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const active = grid[r]?.[c] ?? false;
            ctx.fillStyle = active ? dotActive : dotInactive;
            ctx.fillRect(c * step, r * step, dotSize, dotSize);
          }
        }
      } else {
        // Render Text: ONLINE or READY centered
        const text = matrixState.label;
        // Build 8xCOLS boolean buffer
        const buffer: boolean[][] = Array.from({ length: ROWS }, () =>
          Array(COLS).fill(false)
        );

        let startCol = 2;
        for (let chIdx = 0; chIdx < text.length; chIdx++) {
          const char = text[chIdx];
          const pattern = FONT_5X7[char] || FONT_5X7[" "];
          for (let r = 0; r < 7; r++) {
            const rowBits = pattern[r];
            for (let bit = 0; bit < 5; bit++) {
              if ((rowBits & (1 << (4 - bit))) !== 0) {
                const targetCol = startCol + bit;
                if (targetCol < COLS) {
                  buffer[r][targetCol] = true;
                }
              }
            }
          }
          startCol += 6; // 5 bits + 1 space
        }

        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const active = buffer[r][c];
            ctx.fillStyle = active ? dotActive : dotInactive;
            ctx.fillRect(c * step, r * step, dotSize, dotSize);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [matrixState, stepLife]);

  const dotSize = 2;
  const dotGap = 1.5;
  const canvasWidth = COLS * (dotSize + dotGap);
  const canvasHeight = ROWS * (dotSize + dotGap);

  return (
    <button
      type="button"
      onClick={triggerConway}
      title={
        matrixState.mode === "life"
          ? `Conway's Life running: ${matrixState.countdown}s remaining`
          : "Click to run Conway's Game of Life cellular automaton"
      }
      className={cn(
        "group inline-flex items-center gap-2 border border-zinc-200 bg-white/80 px-2 py-1 text-left backdrop-blur-sm transition-motion-fast hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/80 dark:hover:border-zinc-700",
        matrixState.mode === "life" && "border-zinc-600 dark:border-zinc-600",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="block"
        style={{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          imageRendering: "pixelated",
        }}
      />
      <div className="flex flex-col">
        <span className="type-caption font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
          {matrixState.mode === "life"
            ? `CONWAY [${matrixState.countdown}s]`
            : matrixState.label}
        </span>
        <span className="text-[10px] text-zinc-500 tabular-nums dark:text-zinc-400">
          {matrixState.mode === "life" ? "automaton" : "node::healthy"}
        </span>
      </div>
    </button>
  );
}
