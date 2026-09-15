import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const output = process.env.UI_SCREENSHOT_DIR || "/tmp/mpeep-ui-check";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const styles = [];
try {
  for (const port of [3005]) {
    const page = await browser.newPage();
    for (const width of [1440, 768]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(`http://localhost:${port}/ui-preview`);
      assert.equal(response.status(), 200);
      await page.getByRole("heading", { name: "Mpeep UI", exact: true }).waitFor();
      for (const group of ["Foundations", "Core Components", "Navigation", "Cards", "Data Display", "Feedback", "Mpeep Business Components", "Page Templates"]) {
        await page.getByRole("button", { name: group, exact: true }).waitFor();
      }
      const choose = async name => {
        await page.getByRole("textbox", { name: "Search components" }).fill(name);
        await page.getByRole("navigation", { name: "Component menu" }).getByRole("button", { name, exact: true }).click();
        await page.getByRole("heading", { name, exact: true }).waitFor();
      };
      await choose("Button");
      await page.getByRole("button", { name: "Copy code", exact: true }).click();
      await page.getByRole("status").filter({ hasText: "Code copied" }).waitFor();
      await page.getByRole("textbox", { name: "Search props" }).fill("variant");
      await page.getByRole("cell", { name: "variant", exact: true }).waitFor();
      styles.push(await page.getByRole("button", { name: "Primary", exact: true }).evaluate(el => {
        const c = getComputedStyle(el);
        return { height: c.height, radius: c.borderRadius, font: c.fontFamily, size: c.fontSize, bg: c.backgroundColor };
      }));
      await choose("Pagination");
      await page.getByRole("link", { name: "Go to next page" }).click();
      await page.getByRole("cell", { name: "Material 04" }).waitFor();
      await choose("Modal/dialog");
      await page.getByRole("button", { name: "Open dialog" }).click();
      await page.getByRole("dialog", { name: "Item details" }).waitFor();
      await page.keyboard.press("Escape");
      await page.getByRole("dialog").waitFor({ state: "hidden" });
      await choose("Seller dashboard");
      await page.getByText("Template preview not yet added", { exact: true }).waitFor();
      await choose("Colors");
      await page.getByRole("textbox", { name: "Search components" }).fill("");
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({ path: `${output}/${port}-${width}.png`, fullPage: true });
      console.log(`${port}/${width}: catalog, search, pagination, dialog and status checks passed`);
    }
    await page.close();
  }
  for (const style of styles) assert.deepEqual(style, styles[0]);
  for (const port of [3000, 3004, 3003]) {
    const response = await fetch(`http://localhost:${port}/ui-preview`);
    assert.equal(response.status, 404, `Preview must not be served by app on ${port}`);
  }
} finally {
  await browser.close();
}
