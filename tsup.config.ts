import { defineConfig } from "tsup";

export default defineConfig({
  outDir: "dist",
  format: ["esm"],
  platform: "node",
  target: "node20",
  entry: ["src/server.ts"],
  bundle: true,
  shims: true,
  treeshake: true,
  splitting: false,
  external: [
    "pg",
    "dotenv",
    "cloudinary",
    "puppeteer",
    "@prisma/client",
    "@prisma/adapter-pg",
  ],
});
