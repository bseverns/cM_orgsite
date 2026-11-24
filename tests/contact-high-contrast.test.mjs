import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("high-contrast mode keeps dark contact cards legible", async () => {
  const css = await readFile(new URL("assets/css/site.css", root), "utf8");
  const highContrast = css.slice(css.indexOf("@media (prefers-contrast: more)"));

  assert.match(
    highContrast,
    /\.surface-card--dark,[\s\S]*?background:\s*var\(--ink\);[\s\S]*?color:\s*var\(--paper\);/
  );
});
