import { test, expect, Page } from "@playwright/test";

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

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1_000);
});

test("Changing game difficulty to four letters and saving loads a correct new game grid", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Avaa pelin asetukset" }).click();

  await expect(page.getByRole("heading", { name: "Asetukset" })).toBeVisible();

  await page.getByText("4 kirjainta").click();

  await page.getByRole("button", { name: "Tallenna" }).click();

  await page.waitForTimeout(1_000);

  const gridLetters = await getGridLetters(page);

  gridLetters.forEach((row) => {
    expect(row.filter((l) => l === "").length).toBe(3);
    expect(row.filter((l) => l !== "").length).toBe(1);
  });
});

test("Changing game difficulty to six letters and saving loads a correct new game grid", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Avaa pelin asetukset" }).click();

  await expect(page.getByRole("heading", { name: "Asetukset" })).toBeVisible();

  await page.getByText("6 kirjainta").click();

  await page.getByRole("button", { name: "Tallenna" }).click();

  await page.waitForTimeout(1_000);

  const gridLetters = await getGridLetters(page);

  gridLetters.forEach((row) => {
    expect(row.filter((l) => l === "").length).toBe(5);
    expect(row.filter((l) => l !== "").length).toBe(1);
  });
});

test("Changing game difficulty to seven letters and saving loads a correct new game grid", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Avaa pelin asetukset" }).click();

  await expect(page.getByRole("heading", { name: "Asetukset" })).toBeVisible();

  await page.getByText("7 kirjainta").click();

  await page.getByRole("button", { name: "Tallenna" }).click();

  await page.waitForTimeout(1_000);

  const gridLetters = await getGridLetters(page);

  gridLetters.forEach((row) => {
    expect(row.filter((l) => l === "").length).toBe(6);
    expect(row.filter((l) => l !== "").length).toBe(1);
  });
});

test("Changing game difficulty and leaving the modal does not load a new game grid", async ({
  page,
}) => {
  const initialGrid = await getGridLetters(page);

  await page.getByRole("button", { name: "Avaa pelin asetukset" }).click();

  await expect(page.getByRole("heading", { name: "Asetukset" })).toBeVisible();

  await page.getByText("7 kirjainta").click();

  await page.getByRole("button", { name: "Takaisin peliin" }).click();

  await page.waitForTimeout(1_000);

  const comparedGrid = await getGridLetters(page);

  expect(initialGrid).toEqual(comparedGrid);
});

test("Changing game difficulty renders the reload warning", async ({
  page,
}) => {
  const warningText =
    "Tallentaminen lataa uuden peliruudun, ja menetät edistymisesi tässä peliruudussa.";

  await page.getByRole("button", { name: "Avaa pelin asetukset" }).click();

  await expect(page.getByRole("heading", { name: "Asetukset" })).toBeVisible();
  await expect(page.getByText(warningText)).not.toBeVisible();

  await page.getByText("7 kirjainta").click();

  await expect(page.getByText(warningText)).toBeVisible();
});
