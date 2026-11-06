import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const base = new URL(process.argv[2] || "http://127.0.0.1:4387");
const extension = await mkdtemp(join(tmpdir(), "skyx-zoom-qa-"));
try {
  // This temporary test-only extension operates the browser's native zoom.
  // A blank disposable Chromium profile is used and removed after the test.
  await writeFile(
    join(extension, "manifest.json"),
    JSON.stringify({
      manifest_version: 3,
      name: "SKYX local zoom check",
      version: "1.0",
      permissions: ["tabs"],
      background: { service_worker: "worker.js" },
    }),
  );
  await writeFile(
    join(extension, "worker.js"),
    "chrome.runtime.onInstalled.addListener(() => {});",
  );
  const context = await chromium.launchPersistentContext("", {
    channel: "chromium",
    headless: true,
    viewport: { width: 1440, height: 900 },
    args: [
      "--disable-extensions-except=" + extension,
      "--load-extension=" + extension,
    ],
  });
  try {
    const page = await context.newPage();
    page.setDefaultNavigationTimeout(60000);
    await page.goto(new URL("/en", base).href, {
      waitUntil: "domcontentloaded",
    });
    const worker =
      context.serviceWorkers()[0] ||
      (await context.waitForEvent("serviceworker"));
    const factor = await worker.evaluate(async (origin) => {
      const tab = (await chrome.tabs.query({})).find((item) =>
        item.url?.startsWith(origin + "/"),
      );
      await chrome.tabs.setZoom(tab.id, 2);
      return chrome.tabs.getZoom(tab.id);
    }, base.origin);
    assert.equal(factor, 2);
    for (const locale of ["az", "ru", "en"]) {
      await page.goto(new URL("/" + locale, base).href, {
        waitUntil: "domcontentloaded",
      });
      await page.waitForFunction(
        () =>
          innerWidth <= 721 &&
          document
            .querySelector("a[data-switch-lang]")
            ?.getAttribute("href")
            ?.startsWith(location.origin),
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        "Overflow at 200% in " + locale,
      );
      assert.equal(
        await page.locator(".mobile-menu summary").isVisible(),
        true,
      );
      await page.locator(".mobile-menu summary").press("Enter");
      await page.waitForFunction(
        () => document.querySelector(".mobile-menu").open,
      );
      await page.keyboard.press("Escape");
      await page.waitForFunction(
        () => !document.querySelector(".mobile-menu").open,
      );
      assert.equal(await page.locator("#architecture").count(), 0);
      await page
        .locator(`.service-row[href="/${locale}/services/ai-architecture"]`)
        .click();
      await page.waitForURL(
        new URL(`/${locale}/services/ai-architecture`, base).href,
      );
      assert.equal(await page.locator("#scope").isVisible(), true);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        "Architecture service overflow at 200% in " + locale,
      );
    }
    console.log(
      "Chromium native desktop page zoom at 200% passed for AZ, RU and EN homepages and architecture services (1440×900 browser window, 720 CSS-pixel layout).",
    );
  } finally {
    await context.close();
  }
} finally {
  await rm(extension, { recursive: true, force: true });
}
