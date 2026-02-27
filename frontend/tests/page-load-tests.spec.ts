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

test("Header has title", async ({ page }) => {
  await expect(page).toHaveTitle("Sanaboksi");
});
