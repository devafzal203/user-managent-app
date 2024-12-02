import { test as base } from "@playwright/test";

export const test = base.extend({
  // Authenticated page fixture
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "./e2e/.auth/user.json",
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from "@playwright/test";
