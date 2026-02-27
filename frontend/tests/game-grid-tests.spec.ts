import { test, expect } from "@playwright/test";

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

test("Game grid loads fixed letters on page load", async ({ page }) => {
  const word1Letter = page.getByRole("textbox", { name: "Word 1, letter 1" });
  await expect(word1Letter).toHaveValue("V");

  const word2Letter = page.getByRole("textbox", { name: "Word 2, letter 2" });
  await expect(word2Letter).toHaveValue("U");

  const word3Letter = page.getByRole("textbox", { name: "Word 3, letter 3" });
  await expect(word3Letter).toHaveValue("I");

  const word4Letter = page.getByRole("textbox", { name: "Word 4, letter 4" });
  await expect(word4Letter).toHaveValue("V");

  const word5Letter = page.getByRole("textbox", { name: "Word 5, letter 5" });
  await expect(word5Letter).toHaveValue("A");
});

test("Player can input letters into the game grid", async ({ page }) => {
  await page.getByRole("textbox", { name: "Word 1, letter 2" }).fill("E");
  await page.getByRole("textbox", { name: "Word 1, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 1, letter 4" }).fill("N");
  await page.getByRole("textbox", { name: "Word 1, letter 5" }).fill("Ä");

  const letters = await page
    .getByRole("textbox", { name: "Word 1" })
    .evaluateAll((inputs) =>
      inputs.map((input) => (input as HTMLInputElement).value),
    );

  await expect(letters).toEqual(["V", "E", "H", "N", "Ä"]);
});

test("Player can validate a game grid when all words are correct", async ({
  page,
}) => {
  await page.getByRole("textbox", { name: "Word 1, letter 2" }).fill("E");
  await page.getByRole("textbox", { name: "Word 1, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 1, letter 4" }).fill("N");
  await page.getByRole("textbox", { name: "Word 1, letter 5" }).fill("Ä");

  await page.getByRole("textbox", { name: "Word 2, letter 1" }).fill("S");
  await page.getByRole("textbox", { name: "Word 2, letter 3" }).fill("O");
  await page.getByRole("textbox", { name: "Word 2, letter 4" }).fill("L");
  await page.getByRole("textbox", { name: "Word 2, letter 5" }).fill("A");

  await page.getByRole("textbox", { name: "Word 3, letter 1" }).fill("M");
  await page.getByRole("textbox", { name: "Word 3, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 3, letter 4" }).fill("T");
  await page.getByRole("textbox", { name: "Word 3, letter 5" }).fill("O");

  await page.getByRole("textbox", { name: "Word 4, letter 1" }).fill("K");
  await page.getByRole("textbox", { name: "Word 4, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 4, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 4, letter 5" }).fill("I");

  await page.getByRole("textbox", { name: "Word 5, letter 1" }).fill("K");
  await page.getByRole("textbox", { name: "Word 5, letter 2" }).fill("E");
  await page.getByRole("textbox", { name: "Word 5, letter 3" }).fill("R");
  await page.getByRole("textbox", { name: "Word 5, letter 4" }).fill("M");

  await page.getByRole("button", { name: "Validate game grid" }).click();

  await page.waitForTimeout(1000);
  await expect(page.getByText("Correct words!")).toBeVisible();
});

test("Player cannot validate an incomplete game grid", async ({ page }) => {
  await page.getByRole("textbox", { name: "Word 1, letter 2" }).fill("E");
  await page.getByRole("textbox", { name: "Word 1, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 1, letter 4" }).fill("N");
  await page.getByRole("textbox", { name: "Word 1, letter 5" }).fill("Ä");

  await page.getByRole("button", { name: "Validate game grid" }).click();

  await page.waitForTimeout(1000);
  await expect(page.getByText("Invalid game grid!")).toBeVisible();
});

test("Player cannot validate a game grid with duplicate words", async ({
  page,
}) => {
  await page.getByRole("textbox", { name: "Word 1, letter 2" }).fill("E");
  await page.getByRole("textbox", { name: "Word 1, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 1, letter 4" }).fill("N");
  await page.getByRole("textbox", { name: "Word 1, letter 5" }).fill("Ä");

  await page.getByRole("textbox", { name: "Word 2, letter 1" }).fill("S");
  await page.getByRole("textbox", { name: "Word 2, letter 3" }).fill("O");
  await page.getByRole("textbox", { name: "Word 2, letter 4" }).fill("L");
  await page.getByRole("textbox", { name: "Word 2, letter 5" }).fill("A");

  await page.getByRole("textbox", { name: "Word 3, letter 1" }).fill("M");
  await page.getByRole("textbox", { name: "Word 3, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 3, letter 4" }).fill("T");
  await page.getByRole("textbox", { name: "Word 3, letter 5" }).fill("O");

  await page.getByRole("textbox", { name: "Word 4, letter 1" }).fill("K");
  await page.getByRole("textbox", { name: "Word 4, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 4, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 4, letter 5" }).fill("I");

  await page.getByRole("textbox", { name: "Word 5, letter 1" }).fill("S");
  await page.getByRole("textbox", { name: "Word 5, letter 2" }).fill("U");
  await page.getByRole("textbox", { name: "Word 5, letter 3" }).fill("O");
  await page.getByRole("textbox", { name: "Word 5, letter 4" }).fill("L");

  await page.getByRole("button", { name: "Validate game grid" }).click();

  await page.waitForTimeout(1000);
  await expect(page.getByText("Duplicate words!")).toBeVisible();
});

test("Player cannot validate a game grid with incorrect words", async ({
  page,
}) => {
  await page.getByRole("textbox", { name: "Word 1, letter 2" }).fill("E");
  await page.getByRole("textbox", { name: "Word 1, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 1, letter 4" }).fill("N");
  await page.getByRole("textbox", { name: "Word 1, letter 5" }).fill("Ä");

  await page.getByRole("textbox", { name: "Word 2, letter 1" }).fill("S");
  await page.getByRole("textbox", { name: "Word 2, letter 3" }).fill("O");
  await page.getByRole("textbox", { name: "Word 2, letter 4" }).fill("L");
  await page.getByRole("textbox", { name: "Word 2, letter 5" }).fill("A");

  await page.getByRole("textbox", { name: "Word 3, letter 1" }).fill("M");
  await page.getByRole("textbox", { name: "Word 3, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 3, letter 4" }).fill("T");
  await page.getByRole("textbox", { name: "Word 3, letter 5" }).fill("O");

  await page.getByRole("textbox", { name: "Word 4, letter 1" }).fill("K");
  await page.getByRole("textbox", { name: "Word 4, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 4, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 4, letter 5" }).fill("I");

  await page.getByRole("textbox", { name: "Word 5, letter 1" }).fill("A");
  await page.getByRole("textbox", { name: "Word 5, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 5, letter 3" }).fill("A");
  await page.getByRole("textbox", { name: "Word 5, letter 4" }).fill("A");

  await page.getByRole("button", { name: "Validate game grid" }).click();

  await page.waitForTimeout(1000);
  await expect(page.getByText("Incorrect words!")).toBeVisible();
});

test("Player cannot validate a game grid with duplicate and incorrect words", async ({
  page,
}) => {
  await page.getByRole("textbox", { name: "Word 1, letter 2" }).fill("E");
  await page.getByRole("textbox", { name: "Word 1, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 1, letter 4" }).fill("N");
  await page.getByRole("textbox", { name: "Word 1, letter 5" }).fill("Ä");

  await page.getByRole("textbox", { name: "Word 2, letter 1" }).fill("S");
  await page.getByRole("textbox", { name: "Word 2, letter 3" }).fill("O");
  await page.getByRole("textbox", { name: "Word 2, letter 4" }).fill("L");
  await page.getByRole("textbox", { name: "Word 2, letter 5" }).fill("A");

  await page.getByRole("textbox", { name: "Word 3, letter 1" }).fill("M");
  await page.getByRole("textbox", { name: "Word 3, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 3, letter 4" }).fill("T");
  await page.getByRole("textbox", { name: "Word 3, letter 5" }).fill("O");

  await page.getByRole("textbox", { name: "Word 4, letter 1" }).fill("V");
  await page.getByRole("textbox", { name: "Word 4, letter 2" }).fill("V");
  await page.getByRole("textbox", { name: "Word 4, letter 3" }).fill("V");
  await page.getByRole("textbox", { name: "Word 4, letter 5" }).fill("V");

  await page.getByRole("textbox", { name: "Word 5, letter 1" }).fill("S");
  await page.getByRole("textbox", { name: "Word 5, letter 2" }).fill("U");
  await page.getByRole("textbox", { name: "Word 5, letter 3" }).fill("O");
  await page.getByRole("textbox", { name: "Word 5, letter 4" }).fill("L");

  await page.getByRole("button", { name: "Validate game grid" }).click();

  await page.waitForTimeout(1000);
  await expect(page.getByText("Duplicate and incorrect words!")).toBeVisible();
});

test("Player can play another game after validating a correct game grid", async ({
  page,
}) => {
  await page.getByRole("textbox", { name: "Word 1, letter 2" }).fill("E");
  await page.getByRole("textbox", { name: "Word 1, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 1, letter 4" }).fill("N");
  await page.getByRole("textbox", { name: "Word 1, letter 5" }).fill("Ä");

  await page.getByRole("textbox", { name: "Word 2, letter 1" }).fill("S");
  await page.getByRole("textbox", { name: "Word 2, letter 3" }).fill("O");
  await page.getByRole("textbox", { name: "Word 2, letter 4" }).fill("L");
  await page.getByRole("textbox", { name: "Word 2, letter 5" }).fill("A");

  await page.getByRole("textbox", { name: "Word 3, letter 1" }).fill("M");
  await page.getByRole("textbox", { name: "Word 3, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 3, letter 4" }).fill("T");
  await page.getByRole("textbox", { name: "Word 3, letter 5" }).fill("O");

  await page.getByRole("textbox", { name: "Word 4, letter 1" }).fill("K");
  await page.getByRole("textbox", { name: "Word 4, letter 2" }).fill("A");
  await page.getByRole("textbox", { name: "Word 4, letter 3" }).fill("H");
  await page.getByRole("textbox", { name: "Word 4, letter 5" }).fill("I");

  await page.getByRole("textbox", { name: "Word 5, letter 1" }).fill("K");
  await page.getByRole("textbox", { name: "Word 5, letter 2" }).fill("E");
  await page.getByRole("textbox", { name: "Word 5, letter 3" }).fill("R");
  await page.getByRole("textbox", { name: "Word 5, letter 4" }).fill("M");

  await page.getByRole("button", { name: "Validate game grid" }).click();

  await page.waitForTimeout(1000);
  await expect(page.getByText("Correct words!")).toBeVisible();

  await page.keyboard.press("Escape");

  await page.waitForTimeout(1000);
  await expect(
    page.getByRole("button", { name: "Play a new game" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Play a new game" }).click();

  await page.waitForTimeout(1000);
  await expect(
    page.getByRole("button", { name: "Validate game grid" }),
  ).toBeVisible();

  const letters = await page
    .getByRole("textbox", { name: "Word 1" })
    .evaluateAll((inputs) =>
      inputs.map((input) => (input as HTMLInputElement).value),
    );

  await expect(letters).toContain("");
});
