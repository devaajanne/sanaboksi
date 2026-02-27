import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  const testName = testInfo.title;
  page.on("request", (req) => {
    if (req.url().includes("localhost:8080")) {
      console.log(`[${testName}] Request:`, req.method(), req.url());
    }
  });
  page.on("response", (res) => {
    if (res.url().includes("localhost:8080")) {
      console.log(`[${testName}] Response:`, res.status(), res.url());
    }
  });

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
