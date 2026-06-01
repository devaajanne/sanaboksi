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

  await page.getByRole("button", { name: "Vaihda vaalea/tumma tila" }).click();

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

test("Clicking reload button reloads new game grid", async ({ page }) => {
  const initialGrid: string[][] = [];
  for (let i = 1; i <= 5; i++) {
    const letters = await page
      .getByRole("textbox", { name: `Sana ${i}` })
      .evaluateAll((inputs) =>
        inputs.map((input) => (input as HTMLInputElement).value),
      );
    initialGrid.push(letters);
  }

  await page.getByRole("button", { name: "Lataa uusi peliruudukko" }).click();
  await page.waitForTimeout(1500);

  const reloadedGrid: string[][] = [];
  for (let i = 1; i <= 5; i++) {
    const letters = await page
      .getByRole("textbox", { name: `Sana ${i}` })
      .evaluateAll((inputs) =>
        inputs.map((input) => (input as HTMLInputElement).value),
      );
    reloadedGrid.push(letters);
  }

  expect(initialGrid).not.toEqual(reloadedGrid);
});
