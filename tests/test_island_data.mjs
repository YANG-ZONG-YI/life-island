import test from 'node:test';
import assert from 'node:assert/strict';

// Attempt dynamic import of the data module from src/data.js or root data.js
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

  throw new Error(`[DATA_MODULE_NOT_FOUND] Could not import data.js from candidates (${candidates.join(', ')}). Underlying error: ${lastError?.message}`);
}

test('[ISLAND_CORE_COUNT] System must contain exactly 8 core islands', async () => {
  const { islands } = await loadDataModule();
  assert.ok(Array.isArray(islands), 'islands export must be an Array');
  assert.strictEqual(islands.length, 8, `Expected exactly 8 core islands, but got ${islands.length}`);
});

test('[DEV_ISLAND_SPEC] Dev island must exist and satisfy schema invariants', async () => {
  const { islands } = await loadDataModule();
  const devIsland = islands.find(island => island.id === 'dev-island');

  assert.ok(devIsland, "Core islands must contain an island with id='dev-island'");
  assert.strictEqual(typeof devIsland.name, 'string', 'dev-island name must be a string');
  assert.ok(devIsland.name.trim().length > 0, 'dev-island name must not be empty');

  assert.strictEqual(typeof devIsland.biome, 'string', 'dev-island biome must be a string');
  assert.ok(devIsland.biome.trim().length > 0, 'dev-island biome must not be empty');

  assert.ok(devIsland.axialCoords, 'dev-island must have axialCoords');
  assert.strictEqual(typeof devIsland.axialCoords.q, 'number', 'axialCoords.q must be a number');
  assert.strictEqual(typeof devIsland.axialCoords.r, 'number', 'axialCoords.r must be a number');
});

test('[AXIAL_COORDINATE_COLLISION] 8 islands must occupy unique coordinates without collision', async () => {
  const { islands } = await loadDataModule();
  assert.strictEqual(islands.length, 8, 'Precondition check: exactly 8 islands required');

  const coordMap = new Map();
  for (const island of islands) {
    assert.ok(island.axialCoords, `Island ${island.id} must define axialCoords`);
    assert.strictEqual(typeof island.axialCoords.q, 'number', `Island ${island.id} axialCoords.q must be a number`);
    assert.strictEqual(typeof island.axialCoords.r, 'number', `Island ${island.id} axialCoords.r must be a number`);

    const coordKey = `${island.axialCoords.q},${island.axialCoords.r}`;
    assert.strictEqual(
      coordMap.has(coordKey),
      false,
      `Coordinate collision detected at (${coordKey}) between island '${island.id}' and '${coordMap.get(coordKey)}'`
    );
    coordMap.set(coordKey, island.id);
  }

  assert.strictEqual(coordMap.size, 8, 'Set of axial coordinates must contain exactly 8 unique points');
});

test('[ISLAND_POLICIES_AND_ITEMS] Every island must have non-empty policies or milestone items', async () => {
  const { islands } = await loadDataModule();

  for (const island of islands) {
    const entries = island.items || island.policies;
    assert.ok(
      Array.isArray(entries),
      `Island '${island.id}' must provide an array of items or policies`
    );
    assert.ok(
      entries.length > 0,
      `Island '${island.id}' must contain at least 1 milestone or policy item`
    );
  }
});

test('[DEV_LOGS_FORMAT] Dev logs must exist and each entry must have valid YYYY-MM-DD date and unique numeric ID', async () => {
  const mod = await loadDataModule();
  const devIsland = (mod.islands || []).find(i => i.id === 'dev-island');
  const logs = mod.devLogs || (devIsland && devIsland.devLogs);

  assert.ok(Array.isArray(logs), 'devLogs must be exposed as an array (globally or within dev-island)');
  assert.ok(logs.length > 0, 'devLogs must contain at least 1 log entry');

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const idSet = new Set();

  for (const log of logs) {
    assert.ok(log.id !== undefined && log.id !== null, 'Log entry must have an id field');
    assert.ok(
      typeof log.id === 'number' || (typeof log.id === 'string' && /^\d+$/.test(log.id)),
      `Log id '${log.id}' must be represented as a number or numeric string`
    );
    assert.ok(
      !idSet.has(log.id),
      `Duplicate log id '${log.id}' detected! All devLogs must have strictly unique IDs`
    );
    idSet.add(log.id);

    assert.ok(log.date, `Log entry ${log.id} must have a date field`);
    assert.match(
      log.date,
      datePattern,
      `Log date '${log.date}' must strictly follow YYYY-MM-DD format`
    );
    assert.ok(
      Boolean(log.title || log.summary || log.content),
      `Log entry ${log.id} must have a descriptive title, summary, or content`
    );
  }
});

test('[MAJOR_MILESTONES] System must contain at least 1 MAJOR milestone with detailed action items', async () => {
  const mod = await loadDataModule();
  const islands = mod.islands || [];
  const devIsland = islands.find(i => i.id === 'dev-island');
  const rootLogs = mod.devLogs || [];
  const islandLogs = (devIsland && devIsland.devLogs) || [];

  // Aggregate all candidate entries across all islands and dev logs
  const allEntries = [];
  for (const island of islands) {
    const list = island.items || island.policies || [];
    allEntries.push(...list);
  }
  allEntries.push(...rootLogs, ...islandLogs);

  const majorEntries = allEntries.filter(
    item => item && (item.type === 'MAJOR' || item.isMajor === true)
  );

  assert.ok(
    majorEntries.length >= 1,
    `System must contain at least 1 item with type='MAJOR' or isMajor=true, found: ${majorEntries.length}`
  );

  for (const majorItem of majorEntries) {
    const details = majorItem.details || majorItem.subtasks || majorItem.steps;
    assert.ok(
      Array.isArray(details),
      `Major item '${majorItem.id || majorItem.title || 'untitled'}' must have an array of details/subtasks`
    );
    assert.ok(
      details.length > 0,
      `Major item '${majorItem.id || majorItem.title || 'untitled'}' details array must not be empty`
    );
  }
});

test('[EQUIDISTANT_RADIAL_LAYOUT] Outer 7 islands must be perfectly equidistant to center and adjacent peers', async () => {
  const { islands } = await loadDataModule();
  assert.strictEqual(islands.length, 8, 'Must have 8 islands');

  const outerIslands = islands.filter(i => i.id !== 'dev-island');
  assert.strictEqual(outerIslands.length, 7, 'Must have exactly 7 outer islands');

  const R = 12.5;
  const expectedChord = 2 * R * Math.sin(Math.PI / 7); // ~10.847

  // 1. 驗證每座外環島到中心的距離嚴格相等 (12.500)
  const coordsList = outerIslands.map((island, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 7;
    const x = Number((R * Math.cos(angle)).toFixed(3));
    const z = Number((R * Math.sin(angle)).toFixed(3));
    const distToCenter = Math.hypot(x, z);
    assert.ok(
      Math.abs(distToCenter - R) < 0.005,
      `Island ${island.id} distance to center (${distToCenter}) must equal ${R}`
    );
    return { id: island.id, x, z };
  });

  // 2. 驗證任意相鄰外環島嶼之弦長距離嚴格相等 (10.847)
  for (let i = 0; i < coordsList.length; i++) {
    const curr = coordsList[i];
    const next = coordsList[(i + 1) % coordsList.length];
    const distance = Math.hypot(curr.x - next.x, curr.z - next.z);
    assert.ok(
      Math.abs(distance - expectedChord) < 0.008,
      `Adjacent distance between ${curr.id} and ${next.id} (${distance.toFixed(3)}) must equal ${expectedChord.toFixed(3)}`
    );
  }
});
