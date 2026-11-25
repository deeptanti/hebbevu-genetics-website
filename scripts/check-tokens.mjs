#!/usr/bin/env node
/**
 * Design-system guard. Fails if:
 *  1. Any arbitrary Tailwind value appears (e.g. p-[13px], text-[#fff], [&>x]:...).
 *  2. Inline style props are used in components/pages. Exception: components/motion and
 *     components/visuals, where `style` carries runtime motion values (e.g. scroll progress).
 *  3. `stone` is used as a control boundary or focus ring (brief §6 contrast trap):
 *     ring-stone / outline-stone anywhere, or border-stone on input/select/textarea/button.
 *  4. Raw hex colours appear outside globals.css. Exception: lib/email/, because email
 *     clients cannot read CSS variables; its palette mirrors the tokens in globals.css.
 *  5. An em dash (U+2014) appears anywhere: house style is no em dashes, in copy or code.
 * Run: npm run check:tokens
 */
import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "content", "lib"];
const exts = new Set([".tsx", ".ts", ".jsx", ".js", ".mdx"]);
const problems = [];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (exts.has(path.extname(e.name))) check(p);
  }
}

function check(file) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    const at = `${file}:${i + 1}`;
    // 1. arbitrary values/variants inside string literals
    for (const s of line.matchAll(/["'`]([^"'`]*)["'`]/g)) {
      const str = s[1];
      if (/(^|\s)[!a-z:-]*-\[[^\]]+\]/.test(str) || /(^|\s)\[[^\]]+\]:/.test(str)) problems.push(`${at}  arbitrary Tailwind value: "${str.trim()}"`);
      if (/\b(ring|outline)-stone\b/.test(str)) problems.push(`${at}  stone used as focus/ring/outline: "${str.trim()}"`);
    }
    // 2. inline style
    const motionDir = /components\/(motion|visuals)\//.test(file);
    if (/\bstyle=\{\{/.test(line) && !motionDir) problems.push(`${at}  inline style prop`);
    // 5. em dash, anywhere
    if (line.includes("\u2014")) problems.push(`${at}  em dash (house style: none, rewrite the sentence)`);
    // 4. raw hex outside the theme (allow viewport themeColor white, and email templates)
    const emailDir = /lib\/email\//.test(file);
    if (/#[0-9a-fA-F]{6}\b/.test(line) && !/themeColor/.test(line) && !emailDir) problems.push(`${at}  raw hex colour`);
  });
  // 3. stone on form controls / buttons (JSX element with border-stone)
  for (const m of src.matchAll(/<(input|select|textarea|button)\b[^>]*border-stone[^>]*>/gs)) {
    const line = src.slice(0, m.index).split("\n").length;
    problems.push(`${file}:${line}  border-stone on <${m[1]}> - control boundaries must be graphite`);
  }
}

roots.forEach((r) => fs.existsSync(r) && walk(r));
// Field/Button control classes must reference graphite, never stone.
for (const f of ["components/ui/Field.tsx", "components/ui/Button.tsx"]) {
  const s = fs.readFileSync(f, "utf8");
  if (/stone/.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ""))) problems.push(`${f}  references stone - controls must use graphite`);
}

if (problems.length) {
  console.error(`✗ Design-token check failed (${problems.length}):\n` + problems.map((p) => "  " + p).join("\n"));
  process.exit(1);
}
console.log("✓ Design tokens OK - no arbitrary values, no stone control boundaries.");
