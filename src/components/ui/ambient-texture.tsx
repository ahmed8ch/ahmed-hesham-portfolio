"use client";

import { useEffect, useRef } from "react";

export function AmbientTexture() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width / 2);
      canvas.height = Math.floor(height / 2);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Render loop using subtle static noise dither pattern
    const render = () => {
      if (!isVisible) return;

      const w = canvas.width;
      const h = canvas.height;
      if (w > 0 && h > 0) {
        const imgData = ctx.createImageData(w, h);
        const buffer = new Uint32Array(imgData.data.buffer);
        const len = buffer.length;

        for (let i = 0; i < len; i++) {
          // Low frequency noise simulation
          if (Math.random() < 0.12) {
            const val = Math.random() < 0.5 ? 255 : 0;
            // 32-bit pixel: ABGR
            buffer[i] = (255 << 24) | (val << 16) | (val << 8) | val;
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      // Throttle render ticks to ~12fps for industrial ambient grain without CPU load
      setTimeout(() => {
        if (isVisible) {
          animationFrameId = requestAnimationFrame(render);
        }
      }, 80);
    };

    // IntersectionObserver to pause when element is not in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry) {
          isVisible = entry.isIntersecting && document.visibilityState === "visible";
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(render);
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="ambient-canvas"
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] h-full w-full opacity-[0.035] dark:opacity-[0.025]"
    />
  );
}
