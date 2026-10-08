/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "ahmed-hesham-portfolio";

const nextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? `/${repoName}` : ""),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
