import { Page } from "@playwright/test";

export async function loginUser(page: Page) {
  await page.goto("/");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("Test@123");
  await page.getByRole("button", { name: "Login" }).click();
}

export const TEST_USER = {
  email: "test@example.com",
  password: "Test@123",
  firstName: "John",
  lastName: "Doe",
};
