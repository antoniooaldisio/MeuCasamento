import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  webpack: (config) => {
    const localModules = path.resolve(__dirname, "node_modules");
    const modules = config.resolve?.modules ?? [];
    config.resolve = {
      ...config.resolve,
      modules: [localModules, ...modules],
    };
    return config;
  },
};

export default nextConfig;
