import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["**/*.test.tsx", "**/*.test.ts"],
      globals: true,
      environment: "jsdom",
      setupFiles: "tests/setup.ts",
      coverage: {
        reporter: ["text", "json", "html"],
        provider: "v8",
      },
    },
  })
);
