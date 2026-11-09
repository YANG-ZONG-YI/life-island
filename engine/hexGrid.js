import * as THREE from 'three';

/**
 * 六角網格幾何與座標轉換模組
 * 採用軸向座標系 (Axial Coordinates: q, r)
 */

export const HEX_RADIUS = 3.6; // 六角形外接圓半徑
export const EQUIDISTANT_RADIUS = 12.5; // 外環島嶼軌道半徑 (方案 A: 正七邊形等距)

/**
 * 軸向座標轉世界笛卡爾座標 (q, r -> x, z)
 * @param {number} q 軸向列
 * @param {number} r 軸向行
 * @param {number} radius 外接圓半徑
 * @returns {{x: number, z: number}}
 */
export function axialToCartesian(q, r, radius = HEX_RADIUS) {
  const x = radius * Math.sqrt(3) * (q + r / 2);
  const z = radius * 1.5 * r;
  return { x, z };
}

/**
 * 取得島嶼世界笛卡爾座標 (正七邊形極座標完美等距系統)
 * dev-island 位於中央原點 (0, 0)，外環 7 座島嶼等角均佈於半徑 EQUIDISTANT_RADIUS 軌道
 * @param {object} islandData
 * @param {Array<object>} allIslands
 * @returns {{x: number, z: number}}
 */
export function getEquidistantCoordinates(islandData, allIslands = []) {
  if (islandData.id === 'dev-island') {
    return { x: 0, z: 0 };
  }

  const outerIslands = allIslands.filter(i => i.id !== 'dev-island');
  const index = outerIslands.findIndex(i => i.id === islandData.id);
  const totalOuter = outerIslands.length || 7;
  const safeIndex = index >= 0 ? index : 0;

  // 正北起始 (-Math.PI / 2)，順時針均分 7 等分
  const angle = -Math.PI / 2 + (safeIndex * 2 * Math.PI) / totalOuter;
  const x = Number((EQUIDISTANT_RADIUS * Math.cos(angle)).toFixed(3));
  const z = Number((EQUIDISTANT_RADIUS * Math.sin(angle)).toFixed(3));

  return { x, z };
}

/**
 * 建立 Procedural 低多邊形六角柱體幾何（含頂面倒角）
 * @param {number} radius 六角外接半徑
 * @param {number} height 柱體高度
 * @param {number} bevel 倒角邊寬
 * @returns {THREE.BufferGeometry}
 */
export function createHexPrismGeometry(radius, height, bevel = 0.25) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + Math.PI / 6;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();

  const extrudeSettings = {
    steps: 1,
    depth: height,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: -bevel * 0.4,
    bevelSegments: 1
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.rotateX(Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * 建立單一島嶼主柱體與邊框 Mesh
 * @param {object} islandData
 * @param {Array<object>} allIslands
 * @returns {THREE.Group}
 */
export function createIslandMesh(islandData, allIslands = []) {
  const group = new THREE.Group();
  group.name = `island-${islandData.id}`;
  group.userData = { island: islandData };

  const coords = (allIslands && allIslands.length > 0)
    ? getEquidistantCoordinates(islandData, allIslands)
    : axialToCartesian(islandData.axialCoords.q, islandData.axialCoords.r);

  const baseHeight = 1.6 * (islandData.height || 1.0);

  // 1. 六角柱基底網格
  const baseGeometry = createHexPrismGeometry(HEX_RADIUS * 0.94, baseHeight, 0.2);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: islandData.color,
    roughness: 0.35,
    metalness: 0.15,
    flatShading: true
  });
  const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  baseMesh.position.y = baseHeight * 0.5;
  baseMesh.userData = { islandId: islandData.id, isClickable: true };
  group.add(baseMesh);

  // 2. 六角外框微光輪廓 (Rim Accent)
  const rimGeometry = createHexPrismGeometry(HEX_RADIUS * 0.97, 0.2, 0.05);
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(islandData.accentColor),
    emissive: new THREE.Color(islandData.accentColor),
    emissiveIntensity: 0.2,
    roughness: 0.2,
    metalness: 0.3,
    flatShading: true
  });
  const rimMesh = new THREE.Mesh(rimGeometry, rimMaterial);
  rimMesh.position.y = baseHeight + 0.1;
  group.add(rimMesh);

  // 3. 設定島嶼全局水平位置 (方案 A: 正七邊形等距極座標)
  group.position.set(coords.x, 0, coords.z);

  return group;
}

