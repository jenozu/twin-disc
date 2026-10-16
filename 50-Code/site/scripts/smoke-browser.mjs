import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = "http://127.0.0.1:4321";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
page.on("pageerror", (error) => errors.push(error.message));
await mkdir("screenshots", { recursive: true });

try {
  await page.goto(base + "/", { waitUntil: "networkidle" });
  assert.match(await page.locator("h1").first().innerText(), /Power\s+in motion/i);
  assert.equal(await page.locator("[data-family-tab]").count(), 4);
  await page.locator("[data-family-tab]").nth(1).click();
  assert.match(await page.locator("#xp-family-name").innerText(), /Clutch Systems/);
  assert.match(await page.locator("#xp-family-link").getAttribute("href"), /q=Clutch/);
  await page.screenshot({ path: "screenshots/home-desktop.png", fullPage: true });

  await page.goto(base + "/products?q=SP318C003", { waitUntil: "networkidle" });
  assert.equal((await page.locator("#product-search").inputValue()).toUpperCase(), "SP318C003");
  assert.ok(await page.locator(".catalogue-row:not([hidden])").count() >= 1);
  await page.locator('[data-filter-family="Clutch"]').click();
  assert.ok(await page.locator(".catalogue-row:not([hidden])").count() >= 1);
  const families = await page.locator(".catalogue-row:not([hidden])").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-family")));
  assert.ok(families.every((value) => value === "Clutch"));
  await page.screenshot({ path: "screenshots/catalogue-desktop.png", fullPage: true });

  await page.goto(base + "/rfq?part=SP318C003", { waitUntil: "networkidle" });
  assert.equal(await page.locator("#part").inputValue(), "SP318C003");
  await page.locator('[name="email"]').fill("qa@example.com");
  await page.locator("#rfq-form button[type=submit]").click();
  assert.equal(await page.locator("#rfq-result").isVisible(), true);

  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/products", "/rfq", "/products/sp318c003-twd"]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const width = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(width <= 2, route + " overflows mobile viewport by " + width + "px");
    if (route === "/") await page.screenshot({ path: "screenshots/home-mobile.png", fullPage: true });
  }
  assert.deepEqual(errors, [], "Browser JavaScript errors: " + errors.join("; "));
  console.log("Browser smoke tests passed: homepage, family switch, search/filter, RFQ prototype, and mobile widths.");
} finally {
  await browser.close();
}
