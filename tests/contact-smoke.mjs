import assert from "node:assert/strict";
import { chromium, firefox, webkit } from "playwright";

const base = new URL(process.argv[2] || "http://127.0.0.1:4387");
const path = (pathname) => new URL(pathname, base).href;

for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  const browser = await engine.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(60000);
    const requests = [];
    let reply = { status: 504, code: "unknown" };
    // Every browser submission is intercepted: this suite cannot send real mail.
    await page.route("**/api/contact", async (route) => {
      const request = route.request();
      requests.push({
        key: request.headers()["idempotency-key"],
        body: request.postData(),
      });
      if (reply.abort) return route.abort("failed");
      return route.fulfill({
        status: reply.status,
        contentType: "application/json",
        body: JSON.stringify(reply),
      });
    });
    for (const locale of ["az", "ru", "en"]) {
      await page.goto(path("/" + locale + "/contact?service=ai-automation"), {
        waitUntil: "domcontentloaded",
      });
      // The service is applied by ContactForm's mount effect, which proves readiness.
      await page.waitForFunction(
        () =>
          document.querySelector("#contact-service")?.value === "ai-automation",
      );
      for (const href of [
        "mailto:info@sky-x.az",
        "tel:+994556118850",
        "https://wa.me/994556118850",
      ]) {
        assert.ok(await page.locator(`a[href="${href}"]`).count());
      }
      assert.equal(await page.locator("#contact-consent").isChecked(), false);
      await page.locator(".sky-contact-submit").click();
      await page.locator("#contact-error-name").waitFor();
      await page.waitForFunction(
        () => document.activeElement?.id === "contact-name",
      );
      assert.equal(
        requests.length,
        0,
        "Invalid enquiries must not contact the API",
      );
      if (locale !== "en") continue;
      await page.locator("#contact-name").fill("Example person");
      await page.locator("#contact-email").fill("test@example.com");
      await page
        .locator("#contact-project")
        .fill("A test project with enough detail for validation.");
      await page.locator("#contact-consent").check();
      const submit = page.locator(".sky-contact-submit");
      const status = page.locator(".sky-contact-status");
      async function send(expected) {
        const count = requests.length;
        await submit.click();
        await page.waitForFunction(
          () => !document.querySelector(".sky-contact-fields").disabled,
        );
        assert.equal(requests.length, count + 1);
        assert.match(await status.innerText(), expected);
      }
      await send(/not confirmed/);
      await send(/not confirmed/);
      assert.equal(requests[0].key, requests[1].key);
      assert.equal(requests[0].body, requests[1].body);
      await page
        .locator("#contact-project")
        .fill("A modified test project with enough detail for validation.");
      await send(/not confirmed/);
      assert.notEqual(requests[1].key, requests[2].key);
      reply = { status: 503, code: "unavailable" };
      await send(/currently unavailable/);
      assert.equal(
        await page.locator("#contact-name").inputValue(),
        "Example person",
      );
      reply = { status: 429, code: "limited" };
      await send(/15 minutes/);
      reply = { abort: true };
      await send(/connection was interrupted/);
      reply = { status: 422, code: "validation", fields: ["email"] };
      await send(/marked fields/);
      await page.waitForFunction(
        () => document.activeElement?.id === "contact-email",
      );
      assert.equal(
        await page.locator("#contact-email").getAttribute("aria-invalid"),
        "true",
      );
      await page.locator("#contact-email").fill("updated@example.com");
      reply = { status: 200, code: "tested" };
      await send(/No email was sent/);
      assert.equal(await submit.isDisabled(), true);
      await page
        .locator("#contact-project")
        .fill("A new test project with enough detail for validation.");
      assert.equal(await submit.isEnabled(), true);
      assert.equal(await status.innerText(), "");
      assert.match(page.url(), /\?service=ai-automation$/);
      assert.equal(
        await page.evaluate(() =>
          Object.values(localStorage).join(" ").includes("example.com"),
        ),
        false,
      );
    }
    assert.deepEqual(errors, [], name + " uncaught browser errors");
    const noJs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 320, height: 800 },
    });
    const staticPage = await noJs.newPage();
    for (const locale of ["az", "ru", "en"]) {
      await staticPage.goto(path("/" + locale + "/contact"), {
        waitUntil: "domcontentloaded",
      });
      assert.equal(
        await staticPage.locator(".sky-contact-form").isVisible(),
        false,
      );
      assert.equal(
        await staticPage
          .locator('.sky-contact-address a[href^="mailto"]')
          .isVisible(),
        true,
      );
      assert.equal(
        await staticPage.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
    }
    await noJs.close();
    console.log(
      name +
        " — AZ/RU/EN contact validation, focus, service preselection, retry keys, ambiguous/unavailable/limited/network/server-validation/tested states, edit-after-success, and no-JS alternatives passed (all submissions mocked).",
    );
  } finally {
    await browser.close();
  }
}
