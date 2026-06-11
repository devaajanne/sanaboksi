import { test, expect, Page } from "@playwright/test";

async function getColorMode(page: Page) {
  return await page.locator("html").getAttribute("data-mantine-color-scheme");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Toggles dark mode on when dark mode icon is clicked in light mode", async ({
  page,
}) => {
  const initialMode = await getColorMode(page);

  await page.getByRole("button", { name: "Vaihda tummaan tilaan" }).click();

  const newMode = await getColorMode(page);

  expect(newMode).not.toBe(initialMode);
});

test("Toggles light mode on when light mode icon is clicked in dark mode", async ({
  page,
}) => {
  const initialMode = await getColorMode(page);

  await page.getByRole("button", { name: "Vaihda tummaan tilaan" }).click();

  await page.getByRole("button", { name: "Vaihda vaaleaan tilaan" }).click();

  const newMode = await getColorMode(page);

  expect(newMode).toBe(initialMode);
});

test("Clicking info button opens game instruction modal", async ({ page }) => {
  await page.getByRole("button", { name: "Avaa peliohjeet" }).click();

  await expect(
    page.getByRole("heading", { name: "Kuinka pelata Sanaboksia" }),
  ).toBeVisible();
});

test("Clicking settings button opens game settings modal", async ({ page }) => {
  await page.getByRole("button", { name: "Avaa pelin asetukset" }).click();

  await expect(page.getByRole("heading", { name: "Asetukset" })).toBeVisible();
});

test("Clicking info button opens game info modal", async ({ page }) => {
  await page.getByRole("button", { name: "Lue tietoa pelistä" }).click();

  await expect(
    page.getByRole("heading", { name: "Mikä Sanaboksi?" }),
  ).toBeVisible();
});
