import test from 'node:test';
import assert from 'node:assert/strict';

// Helper to load data module from ../src/data.js or ../data.js
async function loadDataModule() {
  const candidates = ['../src/data.js', '../data.js'];
  let lastError = null;

  for (const path of candidates) {
    try {
      const mod = await import(path);
      return mod;
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`[DATA_MODULE_NOT_FOUND] Could not import data.js. Underlying error: ${lastError?.message}`);
}

const VALID_ISLAND_IDS = new Set([
  'dev-island',
  'north-star',
  'craft-impact',
  'wisdom-knowledge',
  'vitality-health',
  'wealth-architecture',
  'deep-connections',
  'adventure-joy'
]);

test('[SYNERGY_CONNECTIONS_EXIST] data.js must export synergyConnections with at least 6 cross-island connections', async () => {
  const mod = await loadDataModule();
  assert.ok(
    Array.isArray(mod.synergyConnections),
    'synergyConnections export must exist and be an Array in data.js'
  );
  assert.ok(
    mod.synergyConnections.length >= 6,
    `synergyConnections must have at least 6 links, got ${mod.synergyConnections.length}`
  );
});

test('[SYNERGY_ENDPOINTS_VALID] Each synergy connection must link two distinct valid island IDs without self-loops', async () => {
  const mod = await loadDataModule();
  const connections = mod.synergyConnections;
  assert.ok(Array.isArray(connections), 'synergyConnections must be an Array before testing endpoints');

  for (const [index, conn] of connections.entries()) {
    assert.ok(conn && typeof conn === 'object', `Connection at index ${index} must be an object`);
    assert.ok(
      VALID_ISLAND_IDS.has(conn.from),
      `Connection at index ${index} has invalid 'from' island ID: '${conn.from}'`
    );
    assert.ok(
      VALID_ISLAND_IDS.has(conn.to),
      `Connection at index ${index} has invalid 'to' island ID: '${conn.to}'`
    );
    assert.notStrictEqual(
      conn.from,
      conn.to,
      `Connection at index ${index} cannot be a self-loop (from: '${conn.from}', to: '${conn.to}')`
    );
    assert.ok(
      typeof (conn.label || conn.desc || conn.description) === 'string' && (conn.label || conn.desc || conn.description).trim().length > 0,
      `Connection at index ${index} (${conn.from} -> ${conn.to}) must have a non-empty label or description`
    );
  }
});

test('[SEARCH_FILTER_PRECISION] Search function must accurately match keywords to islands and matched items', async () => {
  const mod = await loadDataModule();
  const searchFn = mod.searchIslands || mod.filterIslands;
  assert.strictEqual(
    typeof searchFn,
    'function',
    'data.js must export a search function (searchIslands or filterIslands)'
  );

  const testCases = [
    { keyword: 'Docker', expectedIslandId: 'dev-island' },
    { keyword: '金字塔', expectedIslandId: 'wealth-architecture' },
    { keyword: '哲學', expectedIslandId: 'wisdom-knowledge' }
  ];

  for (const { keyword, expectedIslandId } of testCases) {
    const startTime = performance.now();
    const results = searchFn(keyword);
    const elapsedMs = performance.now() - startTime;

    assert.ok(elapsedMs < 50, `Search execution for '${keyword}' took ${elapsedMs.toFixed(2)}ms, exceeding 50ms threshold`);
    assert.ok(Array.isArray(results), `Search results for '${keyword}' must return an array`);
    assert.ok(results.length > 0, `Search results for '${keyword}' must not be empty`);

    const matchedTarget = results.find(r => (r.id === expectedIslandId || r.islandId === expectedIslandId));
    assert.ok(
      Boolean(matchedTarget),
      `Search for '${keyword}' must return island with ID '${expectedIslandId}', returned IDs: ${results.map(r => r.id || r.islandId).join(', ')}`
    );
  }

  // Edge cases: empty or non-matching string
  const emptyResults = searchFn('');
  assert.ok(Array.isArray(emptyResults), 'Empty search must return an array');

  const nonExistentResults = searchFn('__NON_EXISTENT_KEYWORD_XYZ_123__');
  assert.ok(Array.isArray(nonExistentResults), 'Non-matching search must return an array');
  assert.strictEqual(nonExistentResults.length, 0, 'Non-matching search must return 0 results');
});
