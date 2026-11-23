import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contact page does not claim provider delivery from a query parameter", async () => {
  const [html, javascript] = await Promise.all([
    readFile(new URL("contact.html", root), "utf8"),
    readFile(new URL("assets/js/site.js", root), "utf8"),
  ]);

  assert.doesNotMatch(html, /name="_next"/);
  assert.doesNotMatch(html, /sentConfirmation/);
  assert.doesNotMatch(javascript, /sent=true/);
});
