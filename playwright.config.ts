import { defineConfig } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },
  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: "authenticated",
      dependencies: ["setup"],
      testMatch: /.*\.test\.ts/,
      testIgnore: /auth\/.*\.test\.ts/,
      use: {
        storageState: "./e2e/.auth/user.json",
      },
    },
    {
      name: "unauthenticated",
      testMatch: /auth\/.*\.test\.ts/,
    },
  ],
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
  globalSetup: path.resolve(__dirname, "./e2e/config/global.setup.ts"),
});
