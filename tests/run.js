import assert from "node:assert";
import { sliceFrom } from "../cut.js";
import { splitAt } from "../parts.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("sliceFrom returns text", () => {
  assert.strictEqual(typeof sliceFrom("abc", 1), "string");
});

check("splitAt returns a slice", () => {
  assert.strictEqual(typeof splitAt("abc", 1).slice, "string");
});

check("splitAt returns a head", () => {
  assert.strictEqual(typeof splitAt("abc", 1).head, "string");
});

check("render counts length", () => {
  assert.strictEqual(typeof render({ text: "abc", start: 1 }).length, "number");
});

check("render exposes head flag", () => {
  assert.strictEqual(typeof render({ text: "abc", start: 1 }).head_ok, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
