import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Toggles light/dark mode when dark/light mode icon is clicked", async ({
  page,
}) => {
  const initialMode = await page
    .locator("html")
    .getAttribute("data-mantine-color-scheme");

  const lightDarkModeToggleButton = page.locator(
    '[aria-label="Button to toggle light and dark mode"]',
  );

  await lightDarkModeToggleButton.waitFor();
  await lightDarkModeToggleButton.click();

  const newMode = await page
    .locator("html")
    .getAttribute("data-mantine-color-scheme");

  expect(newMode).not.toBe(initialMode);
});
