import { expect, test, type Page } from "@playwright/test";

const fixedLetters = [
  { fixedIndex: 0, fixedLetter: "v" }, // Example: "vehnä"
  { fixedIndex: 1, fixedLetter: "u" }, // Example: "suola"
  { fixedIndex: 2, fixedLetter: "i" }, // Example: "maito"
  { fixedIndex: 3, fixedLetter: "v" }, // Example: "kahvi"
  { fixedIndex: 4, fixedLetter: "a" }, // Example: "kerma"
];

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/fixed-letters/FI/5", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ wordLength: 5, fixedLetters }),
    });
  });
});

async function openGame(page: Page, width: number) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1_000);
  await expect(
    page.getByRole("textbox", { name: "Sana 1, Kirjain 1" }),
  ).toBeVisible();
}

test("Virtual keyboard renders on mobile viewport", async ({ page }) => {
  await openGame(page, 600);
  const virtualKeyboardLetters: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Å",
    "Ö",
    "Ä",
  ];

  for (const letter of virtualKeyboardLetters) {
    await expect(
      page.getByRole("button", { name: letter, exact: true }),
    ).toBeVisible();
  }
  await expect(
    page.getByRole("button", { name: "Poista kirjain" }),
  ).toBeVisible();
});

test("Virtual keyboard does not render on desktop viewport", async ({
  page,
}) => {
  await openGame(page, 800);

  await expect(page.getByRole("button", { name: "Q" })).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Poista kirjain" }),
  ).toHaveCount(0);
});

test("Reload and validate buttons render with the virtual keyboard", async ({
  page,
}) => {
  await openGame(page, 600);

  await expect(
    page.getByRole("button", { name: "Lataa uusi peli" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Tarkista sanat" }),
  ).toBeVisible();
});

test("Virtual keyboard inserts a letter and moves focus past fixed letters", async ({
  page,
}) => {
  await openGame(page, 600);
  await page.waitForTimeout(1_000);

  const input = page.getByRole("textbox", { name: "Sana 2, Kirjain 1" });
  await input.click();
  await page.getByRole("button", { name: "S", exact: true }).click();

  await expect(input).toHaveValue("S");
  await expect(
    page.getByRole("textbox", { name: "Sana 2, Kirjain 3" }),
  ).toBeFocused();
});

test("Virtual keyboard backspace clears the input but does not move focus backward", async ({
  page,
}) => {
  await openGame(page, 600);

  const input = page.getByRole("textbox", { name: "Sana 2, Kirjain 1" });
  await input.click();
  await page.getByRole("button", { name: "S", exact: true }).click();
  await page.getByRole("textbox", { name: "Sana 2, Kirjain 3" }).fill("O");
  await page.getByRole("textbox", { name: "Sana 2, Kirjain 3" }).click();

  await page.getByRole("button", { name: "Poista kirjain" }).click();

  await expect(
    page.getByRole("textbox", { name: "Sana 2, Kirjain 3" }),
  ).toHaveValue("");
  await expect(input).not.toBeFocused();
});

test("Virtual keyboard backspace clears the input and moves focus backward after second press", async ({
  page,
}) => {
  await openGame(page, 600);

  const input = page.getByRole("textbox", { name: "Sana 2, Kirjain 1" });
  await input.click();
  await page.getByRole("button", { name: "S", exact: true }).click();
  await page.getByRole("textbox", { name: "Sana 2, Kirjain 3" }).fill("O");
  await page.getByRole("textbox", { name: "Sana 2, Kirjain 3" }).click();

  await page.getByRole("button", { name: "Poista kirjain" }).click();
  await page.getByRole("button", { name: "Poista kirjain" }).click();

  await expect(
    page.getByRole("textbox", { name: "Sana 2, Kirjain 3" }),
  ).toHaveValue("");
  await expect(input).toBeFocused();
});

test("Virtual keyboard supports Finnish letters", async ({ page }) => {
  await openGame(page, 600);

  const input = page.getByRole("textbox", { name: "Sana 1, Kirjain 2" });
  await input.click();
  await page.getByRole("button", { name: "Ö", exact: true }).click();

  await expect(input).toHaveValue("Ö");
  await expect(
    page.getByRole("textbox", { name: "Sana 1, Kirjain 3" }),
  ).toBeFocused();
});

test("Virtual keyboard does not change a fixed letter", async ({ page }) => {
  await openGame(page, 600);

  const fixedInput = page.getByRole("textbox", {
    name: "Sana 2, Kirjain 2",
  });
  await fixedInput.click();
  await page.getByRole("button", { name: "S", exact: true }).click();

  await expect(fixedInput).toHaveValue("U");
  await expect(fixedInput).toBeFocused();
});

test("Virtual keyboard backspace skips a fixed letter from an empty input", async ({
  page,
}) => {
  await openGame(page, 600);

  const inputAfterFixedLetter = page.getByRole("textbox", {
    name: "Sana 3, Kirjain 4",
  });
  await inputAfterFixedLetter.click();
  await page.getByRole("button", { name: "Poista kirjain" }).click();

  await expect(
    page.getByRole("textbox", { name: "Sana 3, Kirjain 2" }),
  ).toBeFocused();
});

test("A complete grid entered with the virtual keyboard can be validated", async ({
  page,
}) => {
  await openGame(page, 600);
  await page.waitForTimeout(1_000);

  const words = ["VEHNÄ", "SUOLA", "MAITO", "KAHVI", "KERMA"];

  for (let rowIndex = 0; rowIndex < words.length; rowIndex++) {
    const row = page.getByRole("textbox", { name: `Sana ${rowIndex + 1}` });
    const inputs = row;
    const fixedIndex = fixedLetters[rowIndex].fixedIndex;
    const firstEditableIndex = fixedIndex === 0 ? 1 : 0;

    await page
      .getByRole("textbox", {
        name: `Sana ${rowIndex + 1}, Kirjain ${firstEditableIndex + 1}`,
      })
      .click();

    for (const [columnIndex, letter] of [...words[rowIndex]].entries()) {
      if (columnIndex !== fixedIndex) {
        await page.getByRole("button", { name: letter, exact: true }).click();
      }
    }

    await expect(inputs).toHaveCount(5);
  }

  await page.getByRole("button", { name: "Tarkista sanat" }).click();

  await expect(
    page.getByRole("heading", { name: "Kaikki ruudukon sanat ovat oikein!" }),
  ).toBeVisible();
});
