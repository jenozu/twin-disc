import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
const base = "http://127.0.0.1:4321";
const browser = await chromium.launch({ headless:true, args:["--no-sandbox"] });
const errors = [];
const page = await browser.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:1 });
page.on("pageerror", e => errors.push(e.message));
await mkdir("screenshots", { recursive:true });
async function visit(path) {
  const response=await page.goto(base+path,{waitUntil:"domcontentloaded"});
  assert.ok(response?.ok(), "Route must load: "+path);
}
try {
  await visit("/");
  assert.match(await page.locator("h1").first().innerText(), /work that\s+moves/i);
  assert.match(await page.locator(".ed-hero__actions .ed-cta").innerText(), /Request a Quote/i);
  assert.equal(await page.locator(".ed-family").count(), 4);
  assert.match(await page.locator(".ed-family").nth(1).getAttribute("href"), /q=Clutch/);
  assert.ok(await page.locator(".ed-product__quote").count() > 0);
  await page.screenshot({path:"screenshots/ondine-home-desktop.png",fullPage:true});
  await visit("/products?q=SP318C003");
  assert.equal((await page.locator("#product-search").inputValue()).toUpperCase(),"SP318C003");
  assert.ok(await page.locator(".catalogue-card:not([hidden])").count()>=1);
  assert.ok(await page.locator(".catalogue-card:not([hidden]) .catalogue-card__quote").count()>=1);
  await page.locator("#product-search").fill("");
  const filter=page.locator(".filter-chip").nth(1);
  const family=await filter.getAttribute("data-family");
  await filter.click();
  const found=await page.locator(".catalogue-card:not([hidden])").count();
  assert.ok(found>0);
  const families=await page.locator(".catalogue-card:not([hidden])").evaluateAll(nodes=>nodes.map(node=>node.getAttribute("data-family")));
  assert.ok(families.every(value=>value===family));
  await page.screenshot({path:"screenshots/ondine-catalogue-desktop.png",fullPage:true});
  await visit("/products/sp318c003-twd");
  assert.ok(await page.locator(".product-identity-card__quote").count()===1);
  assert.match(await page.locator(".product-identity-card__quote").getAttribute("href"),/rfq\?part=/);
  await visit("/rfq?part=SP318C003");
  assert.equal(await page.locator("#part").inputValue(),"SP318C003");
  assert.equal(await page.locator("#rfq-result").isVisible(),false);
  await page.locator('[name="email"]').fill("qa@example.com");
  await page.locator('#rfq-form button[type="submit"]').click();
  assert.equal(await page.locator("#rfq-result").isVisible(),true);
  assert.match(await page.locator("#rfq-result").innerText(),/not submitted/i);
  assert.match(await page.locator("#rfq-summary").innerText(),/SP318C003/);
  await page.setViewportSize({width:390,height:844});
  for(const path of ["/","/products","/rfq","/products/sp318c003-twd"]) {
    await visit(path);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=2,path+" overflows mobile viewport by "+overflow+"px");
    if(path!=="/rfq") assert.equal(await page.locator(".ed-mobile-rfq").isVisible(),true);
    if(path==="/") await page.screenshot({path:"screenshots/ondine-home-mobile.png",fullPage:true});
  }
  await page.emulateMedia({reducedMotion:"reduce"});
  await visit("/");
  assert.equal(await page.locator(".ed-hero__actions .ed-cta").isVisible(),true);
  assert.deepEqual(errors,[],"JavaScript errors: "+errors.join("; "));
  console.log("PASS: editorial homepage, CTAs, family links, catalogue filters, product RFQ prefill, truthful form state, responsive routes, reduced motion.");
} finally {await browser.close();}
