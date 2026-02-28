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

  await page.getByRole("button", { name: "Toggle light/dark mode" }).click();

  const newMode = await page
    .locator("html")
    .getAttribute("data-mantine-color-scheme");

  expect(newMode).not.toBe(initialMode);
});

test("Clicking info button opens game instruction modal", async ({ page }) => {
  await page.getByRole("button", { name: "Avaa peliohjeet" }).click();

  await expect(
    page.getByRole("heading", { name: "Kuinka pelata Sanaboksia" }),
  ).toBeVisible();
});
