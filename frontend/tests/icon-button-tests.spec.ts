import { test, expect, Page, Route } from "@playwright/test";

async function getGridLetters(page: Page) {
  const gridLetters: string[][] = [];

  for (let i = 1; i <= 5; i++) {
    const letters = await page
      .getByRole("textbox", { name: `Sana ${i}` })
      .evaluateAll((inputs) =>
        inputs.map((input) => (input as HTMLInputElement).value),
      );
    gridLetters.push(letters);
  }
  return gridLetters;
}

async function setupFixedLetters(page: Page) {
  await page.route("*/**/api/fixed-letters/FI/5/5", async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        wordLength: 5,
        fixedLetters: [
          { fixedIndex: 0, fixedLetter: "v" },
          { fixedIndex: 1, fixedLetter: "u" },
          { fixedIndex: 2, fixedLetter: "i" },
          { fixedIndex: 3, fixedLetter: "v" },
          { fixedIndex: 4, fixedLetter: "a" },
        ],
      }),
    });
  });
}

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

test("Clicking load new grid button reloads new game grid", async ({
  page,
}) => {
  const initialGrid = await getGridLetters(page);

  await page.getByRole("button", { name: "Lataa uusi peliruudukko" }).click();

  await page.waitForTimeout(1500);

  const reloadedGrid = await getGridLetters(page);

  expect(initialGrid).not.toEqual(reloadedGrid);
});

test("Clicking load new grid button triggers confirmation modal when user has started to fill in the grid", async ({
  page,
}) => {
  await setupFixedLetters(page);

  await page.getByRole("textbox", { name: "Sana 1, Kirjain 2" }).fill("E");

  await page.getByRole("button", { name: "Lataa uusi peliruudukko" }).click();

  await expect(
    page.getByRole("heading", { name: "Ruudukkosi on kesken!" }),
  ).toBeVisible();
});

test("Confirming grid reload loads a new grid", async ({ page }) => {
  await setupFixedLetters(page);

  await page.getByRole("textbox", { name: "Sana 1, Kirjain 2" }).fill("E");

  const initialGrid = await getGridLetters(page);

  await page.getByRole("button", { name: "Lataa uusi peliruudukko" }).click();

  await expect(
    page.getByRole("heading", { name: "Ruudukkosi on kesken!" }),
  ).toBeVisible();

  await page
    .getByRole("dialog", { name: "Ruudukkosi on kesken!" })
    .getByLabel("Lataa uusi peliruudukko")
    .click();

  const reloadedGrid = await getGridLetters(page);

  expect(initialGrid).not.toEqual(reloadedGrid);
});

test("Closing new grid load confirmation modal does not load a new grid", async ({
  page,
}) => {
  await setupFixedLetters(page);

  await page.getByRole("textbox", { name: "Sana 1, Kirjain 2" }).fill("E");

  const initialGrid = await getGridLetters(page);

  await page.getByRole("button", { name: "Lataa uusi peliruudukko" }).click();

  await expect(
    page.getByRole("heading", { name: "Ruudukkosi on kesken!" }),
  ).toBeVisible();

  await page
    .getByRole("dialog", { name: "Ruudukkosi on kesken!" })
    .getByLabel("Takaisin peliin")
    .click();

  const reloadedGrid = await getGridLetters(page);

  expect(initialGrid).toEqual(reloadedGrid);
});
