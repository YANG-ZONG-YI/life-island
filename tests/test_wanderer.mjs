import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('[QUOTES_DATA_INTEGRITY] dataQuotes.js must export wisdomQuotes with at least 10 items', async () => {
  const mod = await import('../dataQuotes.js');

  assert.ok(Array.isArray(mod.wisdomQuotes), 'wisdomQuotes must be an Array');
  assert.ok(mod.wisdomQuotes.length >= 10, `Expected >= 10 quotes, got ${mod.wisdomQuotes.length}`);

  for (const quote of mod.wisdomQuotes) {
    assert.ok(quote.id, 'Quote must have an id');
    assert.ok(typeof quote.text === 'string' && quote.text.trim().length > 0, 'Quote must have non-empty text');
    assert.ok(typeof quote.category === 'string', 'Quote must have a category string');
  }

  assert.strictEqual(typeof mod.getRandomQuote, 'function', 'getRandomQuote must be a function');
  const sample = mod.getRandomQuote();
  assert.ok(sample && sample.text, 'Sample quote from getRandomQuote must be valid');
});

test('[WANDERER_ENGINE_SOURCE_INTEGRITY] engine/wanderer.js source code must declare createWandererController with required methods', () => {
  const code = fs.readFileSync('./engine/wanderer.js', 'utf-8');

  assert.ok(code.includes('export function createWandererController'), 'Must export createWandererController');
  assert.ok(code.includes('travelToIsland'), 'Must declare travelToIsland');
  assert.ok(code.includes('triggerGreeting'), 'Must declare triggerGreeting');
  assert.ok(code.includes('showQuoteBubble'), 'Must declare showQuoteBubble');
  assert.ok(code.includes('hideQuoteBubble'), 'Must declare hideQuoteBubble');
  assert.ok(code.includes('update'), 'Must declare update');
});

test('[WANDERER_DOM_AND_STYLES_CONTRACT] index.html and style.css must declare wanderer bubble element and styles', () => {
  const html = fs.readFileSync('./index.html', 'utf-8');
  assert.ok(html.includes('id="wanderer-bubble"'), 'index.html must contain #wanderer-bubble');

  const css = fs.readFileSync('./style.css', 'utf-8');
  assert.ok(css.includes('wanderer.css'), 'style.css must import wanderer.css');

  const wandererCss = fs.readFileSync('./css/wanderer.css', 'utf-8');
  assert.ok(wandererCss.includes('.wanderer-bubble'), 'css/wanderer.css must style .wanderer-bubble');
  assert.ok(wandererCss.includes('bubble-header'), 'css/wanderer.css must style .bubble-header');
});

