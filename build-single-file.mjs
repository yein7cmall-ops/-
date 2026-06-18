// Single-file HTML builder for 《别独自用餐》 immersive learning page.
// Uses Node.js for reliable Unicode + regex handling.

import { readFileSync, writeFileSync } from 'node:fs';

const distDir  = 'C:\\Users\\李奕辰\\Desktop\\元模型大赛版\\dist';
const outFile  = 'C:\\Users\\李奕辰\\Desktop\\元模型大赛版\\别独自用餐-沉浸式学习.html';

const htmlRaw    = readFileSync(`${distDir}\\index.html`,  'utf8');
const cssRaw     = readFileSync(`${distDir}\\assets\\index-DmH0mJwR.css`, 'utf8');
const jsRaw      = readFileSync(`${distDir}\\assets\\index-DElF4eL1.js`,  'utf8');
const faviconRaw = readFileSync(`${distDir}\\favicon.svg`, 'utf8');

// Favicon as base64 data URI
const faviconBase64 = Buffer.from(faviconRaw, 'utf8').toString('base64');
const faviconDataUri = `data:image/svg+xml;base64,${faviconBase64}`;

let result = htmlRaw;

// 1. Replace favicon link with data URI
result = result.replace(
  /<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg"\s*\/>/,
  `<link rel="icon" type="image/svg+xml" href="${faviconDataUri}" />`
);

// 2. Inline CSS into <style> tag
const cssBlock = `\n<style data-inline="true">\n${cssRaw}\n</style>\n`;
result = result.replace(
  /<link rel="stylesheet" crossorigin href="\/assets\/index-DmH0mJwR\.css">/,
  cssBlock
);

// 3. Inline JS into <script type="module"> tag.
//    Only the FIRST occurrence in the HTML body is the real one;
//    the remaining string literals live inside the JS source itself
//    and will be ignored at runtime.
const firstScriptTag = /<script type="module" crossorigin src="\/assets\/index-DElF4eL1\.js"><\/script>/;
const jsBlock = `\n<script type="module">\n${jsRaw}\n</script>\n`;
result = result.replace(firstScriptTag, jsBlock);

// 4. Remove the TRAE dev badge widget.
//    It lives in a separate <script> (no type=module) right before </body>.
result = result.replace(
  /\s*<script>\s*\(function\(\)\s*\{\s*'use strict';\s*if\s*\(window\.TraeBadgePlugin\)[\s\S]*?window\.TraeBadgePlugin[\s\S]*?\}\)\(\);\s*<\/script>\s*/,
  '\n'
);

writeFileSync(outFile, result, 'utf8');

const sizeKB = (Buffer.byteLength(result, 'utf8') / 1024).toFixed(1);
console.log(`OK -> ${outFile}`);
console.log(`Size: ${sizeKB} KB`);

// Quick sanity checks
const checks = {
  '<style data-inline>': (result.match(/<style data-inline="true">/g) || []).length,
  'inline script type=module': (result.match(/<script type="module">/g) || []).length,
  'favicon data URI': (result.match(/data:image\/svg\+xml;base64,/g) || []).length,
  'TraeBadgePlugin残留': (result.match(/TraeBadgePlugin/g) || []).length,
  '剩余 /assets/ 引用': (result.match(/["']\/assets\/[^"']+["']/g) || []).length,
  'React createRoot': (result.match(/createRoot\(document\.getElementById\("root"\)\)/g) || []).length,
};
console.log('\nSanity checks:');
for (const [k, v] of Object.entries(checks)) {
  console.log(`  ${k}: ${v}`);
}
