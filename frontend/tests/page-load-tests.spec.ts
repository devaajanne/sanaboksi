import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Header has title", async ({ page }) => {
  await expect(page).toHaveTitle("Sanaboksi");
});
