import { test, expect } from "../../fixtures/test.fixture";

test.describe("Sidebar Navigation", () => {
  test("should toggle sidebar", async ({ authenticatedPage: page }) => {
    await page.goto("/dashboard");
    const sidebar = page.locator("aside");
    await expect(sidebar).toHaveAttribute("style", /width:\s*250px/);
    await page.getByRole("button", { name: /layout-sidebar/ }).click();
    await expect(sidebar).toHaveAttribute("style", /width:\s*66px/);
  });
});
