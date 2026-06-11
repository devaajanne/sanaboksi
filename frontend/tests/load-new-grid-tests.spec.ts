import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/fixed-letters/FI/5/5", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        wordLength: 5,
        fixedLetters: [
          { fixedIndex: 0, fixedLetter: "v" }, // Example: "vehnä"
          { fixedIndex: 1, fixedLetter: "u" }, // Example: "suola"
          { fixedIndex: 2, fixedLetter: "i" }, // Example: "maito"
          { fixedIndex: 3, fixedLetter: "v" }, // Example: "kahvi"
          { fixedIndex: 4, fixedLetter: "a" }, // Example: "kerma"
        ],
      }),
    });
  });

  await page.goto("/");
});

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
  await page.getByRole("textbox", { name: "Sana 1, Kirjain 2" }).fill("E");

  await page.getByRole("button", { name: "Lataa uusi peliruudukko" }).click();

  await expect(
    page.getByRole("heading", { name: "Ruudukkosi on kesken!" }),
  ).toBeVisible();
});

test("Confirming grid reload loads a new grid when user has started to fill in the grid", async ({
  page,
}) => {
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
