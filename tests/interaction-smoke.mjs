import assert from "node:assert/strict";
import { chromium, firefox, webkit } from "playwright";

const base = new URL(process.argv[2] || "http://127.0.0.1:4387");
const path = (pathname) => new URL(pathname, base).href;
// NavigationBehavior normalizes these links in its mount effect. Waiting for that
// observable enhancement avoids clicking SSR controls before hydration completes.
const ready = (page) =>
  page.waitForFunction(() =>
    document
      .querySelector("a[data-switch-lang]")
      ?.getAttribute("href")
      ?.startsWith(location.origin),
  );

async function checkEngine(engine, name) {
  const browser = await engine.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(60000);
    await page.goto(path("/en"), { waitUntil: "domcontentloaded" });
    await ready(page);
    const flow = page.locator(".dm-workflow");
    const state = async (status) =>
      page.waitForFunction(
        (value) =>
          document.querySelector(".dm-workflow")?.dataset.state === value,
        status,
      );
    await page.getByRole("button", { name: "Run demo" }).click();
    await state("running");
    await page.waitForFunction(
      () =>
        document
          .querySelectorAll(".dm-node")[1]
          ?.getAttribute("aria-pressed") === "true",
    );
    await page.getByRole("button", { name: "Pause", exact: true }).click();
    await state("paused");
    await page.locator(".dm-node").nth(2).press("Enter");
    assert.equal(
      await page.locator(".dm-fields dd").first().innerText(),
      "Demo",
    );
    await page
      .getByRole("button", { name: "Resume", exact: true })
      .press("Space");
    await state("running");
    // Deterministic simulation of the Page Visibility event also works in headless engines.
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await state("paused");
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.getByRole("button", { name: "Replay", exact: true }).click();
    await state("complete");
    assert.equal(
      await flow.locator(".dm-readout-title h3").innerText(),
      "Ready for follow-up",
    );
    assert.equal(await page.locator("#architecture").count(), 0);
    await page
      .locator('.service-row[href="/en/services/ai-architecture"]')
      .click();
    await page.waitForURL(path("/en/services/ai-architecture"));
    await ready(page);
    assert.equal(await page.locator("h1").innerText(), "AI architecture");
    await page.locator(".ip-faq summary").first().press("Enter");
    assert.equal(
      await page.locator(".ip-faq details").first().getAttribute("open"),
      "",
    );
    await page.goBack({ waitUntil: "domcontentloaded" });
    await ready(page);
    await page.locator("label[for=industry-1]").click();
    await page.locator("#industry-1").press("ArrowRight");
    assert.equal(await page.locator("#scenario-2").isVisible(), true);
    await page.locator("#motion-preference").click();
    await page.waitForFunction(
      () => document.documentElement.dataset.motion === "off",
    );
    await page.reload({ waitUntil: "domcontentloaded" });
    await ready(page);
    await page.waitForFunction(
      () => document.documentElement.dataset.motion === "off",
    );
    await page.locator("#motion-preference").click();
    await page.waitForFunction(
      () => document.documentElement.dataset.motion === "on",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(
      () => document.documentElement.dataset.motion === "off",
    );
    await page.getByRole("button", { name: "Run demo" }).click();
    await state("running");
    assert.equal(await flow.locator(".dm-pulse:visible").count(), 0);
    await page.locator(".dm-node").nth(1).click();
    await state("paused");
    await page.setViewportSize({ width: 390, height: 844 });
    const menu = page.locator(".mobile-menu");
    const toggle = menu.locator("summary");
    await toggle.press("Enter");
    await page.waitForFunction(
      () =>
        document.activeElement === document.querySelector(".mobile-menu nav a"),
    );
    assert.equal(
      await page.evaluate(() => document.body.style.overflow),
      "hidden",
    );
    await menu.locator("[data-menu-close]").focus();
    await page.keyboard.press("Tab");
    assert.equal(
      await toggle.evaluate((el) => el === document.activeElement),
      true,
    );
    await page.keyboard.press("Shift+Tab");
    assert.equal(
      await menu
        .locator("[data-menu-close]")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.keyboard.press("Escape");
    await page.waitForFunction(
      () =>
        !document.querySelector(".mobile-menu").open &&
        document.activeElement ===
          document.querySelector(".mobile-menu summary"),
    );
    assert.notEqual(
      await page.evaluate(() => document.body.style.overflow),
      "hidden",
    );
    await toggle.press("Enter");
    await menu.locator('nav a[href="/en/about"]').click();
    await page.waitForURL(path("/en/about"));
    assert.notEqual(
      await page.evaluate(() => document.body.style.overflow),
      "hidden",
    );
    await ready(page);
    // Locale changes retain a valid enquiry service and the current fragment.
    await page.goto(
      path("/en/contact?service=ai-automation#contact-form-heading"),
      { waitUntil: "domcontentloaded" },
    );
    await ready(page);
    await page.locator(".foot-langs a[data-switch-lang=ru]").click();
    await page.waitForURL(
      path("/ru/contact?service=ai-automation#contact-form-heading"),
    );
    await ready(page);
    assert.equal(await page.locator("html").getAttribute("lang"), "ru");
    await page.waitForFunction(
      () =>
        document.querySelector("#contact-service")?.value === "ai-automation",
    );
    assert.deepEqual(errors, [], name + " browser errors");
    await context.close();
    const bare = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 320, height: 640 },
    });
    const staticPage = await bare.newPage();
    for (const lang of ["az", "ru", "en"]) {
      await staticPage.goto(path("/" + lang), {
        waitUntil: "domcontentloaded",
      });
      assert.equal(
        await staticPage.locator(".dm-text-fallback").isVisible(),
        true,
      );
      assert.equal(await staticPage.locator("#architecture").count(), 0);
      await staticPage.locator("label[for=industry-1]").click();
      assert.equal(await staticPage.locator("#scenario-1").isVisible(), true);
      assert.equal(
        await staticPage.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        name + " 320px overflow " + lang,
      );
      await staticPage
        .locator(`.service-row[href="/${lang}/services/ai-architecture"]`)
        .click();
      await staticPage.waitForURL(path(`/${lang}/services/ai-architecture`));
      assert.equal(await staticPage.locator("#scope").isVisible(), true);
      await staticPage.locator(".ip-faq summary").first().press("Enter");
      assert.equal(
        await staticPage.locator(".ip-faq details").first().getAttribute("open"),
        "",
      );
      assert.equal(
        await staticPage.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        name + " 320px architecture service overflow " + lang,
      );
    }
    await bare.close();
    console.log(
      name +
        " — desktop demo, pause/resume/replay, keyboard selection, mobile menu/focus, manual and system motion settings, locale/context navigation, architecture service access, zero browser errors, and no-JS mobile pages passed.",
    );
  } finally {
    await browser.close();
  }
}

// Real-time workflow transitions are checked one browser at a time so multiple
// software WebGL renderers cannot starve each other's event loops in CI.
for (const [engine, name] of [[chromium, "Chromium"], [firefox, "Firefox"], [webkit, "WebKit"]]) {
  if (process.argv[3] && process.argv[3].toLowerCase() !== name.toLowerCase()) continue;
  try {
    await checkEngine(engine, name);
  } catch (error) {
    console.error(new Error(name + ": " + error.message, { cause: error }));
    process.exitCode = 1;
  }
}
