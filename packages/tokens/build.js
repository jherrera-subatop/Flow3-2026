#!/usr/bin/env node
/**
 * FLOW³ Tokens Build - Reads JSON token files and outputs flow3-tokens.css
 * Only Fibonacci / Kit values. No arbitrary values.
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

function flattenTokens(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const name = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object' && 'value' in val && !('value' in val && typeof val.value === 'object')) {
      result[name] = val.value;
    } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      Object.assign(result, flattenTokens(val, name));
    }
  }
  return result;
}

function jsonToCss(tokens) {
  const lines = [
    '/* FLOW³ Design Tokens - Generated. Do not edit by hand. */',
    '/* Fibonacci & Kit dimensions only. Use var(--flow-*) in code. */',
    ':root {',
    ...Object.entries(tokens).map(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, (m) => '-' + m.toLowerCase());
      const name = cssVar.startsWith('flow-') ? cssVar : `flow-${cssVar}`;
      return `  --${name}: ${value};`;
    }),
    '}',
  ];
  return lines.join('\n') + '\n';
}

const primitives = require(path.join(SRC, 'primitives', 'fibonacci.json'));
const spacing = require(path.join(SRC, 'semantic', 'spacing.json'));
const typography = require(path.join(SRC, 'semantic', 'typography.json'));
const radius = require(path.join(SRC, 'semantic', 'radius.json'));
const shadow = require(path.join(SRC, 'semantic', 'shadow.json'));
const motion = require(path.join(SRC, 'semantic', 'motion.json'));
const kits = ['alpha', 'beta', 'gamma', 'delta', 'epsilon'].reduce((acc, name) => {
  const kit = require(path.join(SRC, 'kits', `${name}.json`));
  return Object.assign(acc, flattenTokens(kit));
}, {});

const primFlat = flattenTokens(primitives);
const spaceFlat = flattenTokens(spacing);
const typFlat = flattenTokens(typography);
const radFlat = flattenTokens(radius);
const shadFlat = flattenTokens(shadow);
const motFlat = flattenTokens(motion);

// Map primitive number values to px for CSS (e.g. flow-fib-5 -> 5px)
const primCss = {};
for (const [k, v] of Object.entries(primFlat)) {
  primCss[k] = typeof v === 'number' ? `${v}px` : v;
}

const allTokens = { ...primCss, ...spaceFlat, ...typFlat, ...radFlat, ...shadFlat, ...motFlat, ...kits };

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
const css = jsonToCss(allTokens);
const outPath = path.join(DIST, 'flow3-tokens.css');
fs.writeFileSync(outPath, css, 'utf8');
console.log('FLOW³ tokens built:', outPath);
