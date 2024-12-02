import { test, expect } from "../../fixtures/test.fixture";

test.describe("Profile Management", () => {
  test.beforeEach(async ({ authenticatedPage: page }) => {
    await page.goto("/profile");
  });

  test("should display user profile", async ({ authenticatedPage: page }) => {
    await expect(page.getByText("My Profile")).toBeVisible();
    await expect(page.getByText("Personal Information")).toBeVisible();
  });

  test("should update user name", async ({ authenticatedPage: page }) => {
    await page
      .getByRole("button", { name: "Edit", exact: true })
      .first()
      .click();

    await page.getByLabel("First Name").fill("John");
    await page.getByLabel("Last Name").fill("Doe");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Name changed successfully")).toBeVisible();
  });
});
