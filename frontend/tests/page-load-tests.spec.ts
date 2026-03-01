import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Header has title", async ({ page }) => {
  await expect(page).toHaveTitle("Sanaboksi");
});

test("Each word row initially has exactly one fixed letter", async ({
  page,
}) => {
  await page.waitForTimeout(1_000);

  const letters1 = await page
    .getByRole("textbox", { name: "Sana 1" })
    .evaluateAll((inputs) =>
      inputs.map((input) => (input as HTMLInputElement).value),
    );

  const letters2 = await page
    .getByRole("textbox", { name: "Sana 2" })
    .evaluateAll((inputs) =>
      inputs.map((input) => (input as HTMLInputElement).value),
    );

  const letters3 = await page
    .getByRole("textbox", { name: "Sana 3" })
    .evaluateAll((inputs) =>
      inputs.map((input) => (input as HTMLInputElement).value),
    );

  const letters4 = await page
    .getByRole("textbox", { name: "Sana 4" })
    .evaluateAll((inputs) =>
      inputs.map((input) => (input as HTMLInputElement).value),
    );

  const letters5 = await page
    .getByRole("textbox", { name: "Sana 5" })
    .evaluateAll((inputs) =>
      inputs.map((input) => (input as HTMLInputElement).value),
    );

  expect(letters1.filter((l) => l === "").length).toBe(4);
  expect(letters1.filter((l) => l !== "").length).toBe(1);

  expect(letters2.filter((l) => l === "").length).toBe(4);
  expect(letters2.filter((l) => l !== "").length).toBe(1);

  expect(letters3.filter((l) => l === "").length).toBe(4);
  expect(letters3.filter((l) => l !== "").length).toBe(1);

  expect(letters4.filter((l) => l === "").length).toBe(4);
  expect(letters4.filter((l) => l !== "").length).toBe(1);

  expect(letters5.filter((l) => l === "").length).toBe(4);
  expect(letters5.filter((l) => l !== "").length).toBe(1);
});
