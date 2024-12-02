import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("Test123a1");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL("/dashboard");

  await page.context().storageState({
    path: "./e2e/.auth/user.json",
  });
});
