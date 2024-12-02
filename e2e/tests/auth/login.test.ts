import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should show validation errors on empty form submission", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("WrongPass123");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Invalid credentials")).toBeVisible();
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("Test123a1");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL("/dashboard");
  });
});
