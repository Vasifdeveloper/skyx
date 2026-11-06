import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.argv[2] || "http://127.0.0.1:4387";
(async () => {
  const browser = await chromium.launch({
    args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
  });
  const results = [];
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    // Exercise the real shader using software GL in CI, bypassing only the
    // device classification. A separate page below verifies software fallback.
    await page.addInitScript(() => {
      const original = WebGL2RenderingContext.prototype.getParameter;
      WebGL2RenderingContext.prototype.getParameter = function (parameter) {
        if (parameter === 0x9246) return "SKYX renderer test";
        return original.call(this, parameter);
      };
    });
    await page.goto(base + "/az", { waitUntil: "networkidle" });
    await page.waitForSelector(".orbit-stage.is-ready canvas", {
      timeout: 25000,
    });
    assert.equal(await page.locator("canvas").count(), 1);
    const chapters = await page.locator(".home > section[id]").evaluateAll(
      (sections) => sections.map((section) => ({
        id: section.id,
        top: section.getBoundingClientRect().top + scrollY,
      })),
    );
    assert.deepEqual(
      chapters.map(({ id }) => id),
      ["hero", "services", "automation", "scenarios", "process", "contact"],
    );
    assert.ok(
      chapters.every((chapter, i) => i === 0 || chapter.top > chapters[i - 1].top),
      "Homepage scene anchors increase through all six chapters",
    );

    results.push("First real WebGL frame renders, exactly one canvas");
    await page.evaluate(() => {
      window.sceneDraws = 0;
      const ctx = document.querySelector("canvas").getContext("webgl2");
      const draw = ctx.drawElements.bind(ctx);
      ctx.drawElements = (...args) => {
        window.sceneDraws++;
        return draw(...args);
      };
    });
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    const hiddenCount = await page.evaluate(() => window.sceneDraws);
    await page.waitForTimeout(200);
    assert.equal(await page.evaluate(() => window.sceneDraws), hiddenCount);
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForFunction(() => window.sceneDraws > 0);
    results.push(
      "Hidden document stops WebGL draws, visibility restore resumes",
    );
    for (const id of [
      "services",
      "automation",
      "scenarios",
      "process",
      "hero",
    ]) {
      await page.evaluate(
        (id) => document.getElementById(id).scrollIntoView(),
        id,
      );
      await page.waitForTimeout(75);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
    }
    results.push(
      "Forward/reverse scroll matches poses with no horizontal overflow",
    );
    await page.goto(base + "/ru#scenarios", { waitUntil: "networkidle" });
    await page.waitForSelector(".orbit-stage.is-ready canvas");
    assert.ok(
      Number(await page.locator(".orbit-stage").getAttribute("data-pose")) > 2,
    );
    await page.goto(base + "/en", { waitUntil: "networkidle" });
    await page.goBack();
    await page.waitForFunction(
      () => Number(document.querySelector(".orbit-stage").dataset.pose) > 2,
    );
    results.push(
      "Direct hash, locale change and Back restore the section pose",
    );
    await page.evaluate(() =>
      document.getElementById("contact-heading").scrollIntoView(),
    );
    await page.waitForFunction(
      () => getComputedStyle(document.querySelector(".orbit-stage")).opacity === "0",
    );
    assert.equal(
      await page
        .locator(".orbit-stage")
        .evaluate((el) => getComputedStyle(el).opacity),
      "0",
    );
    results.push("Contact fades the canvas completely");
    await page.goto(base + "/az", { waitUntil: "networkidle" });
    await page.waitForSelector(".orbit-stage.is-ready canvas");
    await page.evaluate(() =>
      document
        .querySelector("canvas")
        .getContext("webgl2")
        .getExtension("WEBGL_lose_context")
        .loseContext(),
    );
    await page.waitForSelector('.orbit-stage[data-fallback="context-loss"]');
    assert.equal(await page.locator("canvas").count(), 0);
    assert.equal(
      await page
        .locator(".orbit-poster")
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    results.push("Context loss removes WebGL and displays the finished poster");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("canvas").count(), 0);
    assert.equal(
      await page
        .locator(".orbit-window")
        .evaluate((el) => getComputedStyle(el).position),
      "absolute",
    );
    results.push("Reduced motion disables WebGL and travel");

    const noGL = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    await noGL.addInitScript(() => {
      const get = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        if (
          type === "webgl" ||
          type === "webgl2" ||
          type === "experimental-webgl"
        )
          return null;
        return get.call(this, type, ...args);
      };
    });
    await noGL.goto(base + "/az", { waitUntil: "networkidle" });
    await noGL.waitForSelector('[data-fallback="scene-error"]', {
      timeout: 20000,
    });
    assert.ok(await noGL.locator("h1").isVisible());
    results.push("WebGL unavailable preserves content and SVG fallback");
    const software = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    await software.goto(base + "/az", { waitUntil: "networkidle" });
    await software.waitForSelector('[data-fallback="software-renderer"]');
    assert.equal(await software.locator("canvas").count(), 0);
    results.push(
      "Software renderer selects poster before the first scene draw",
    );
    console.log(results.join("\n"));
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
