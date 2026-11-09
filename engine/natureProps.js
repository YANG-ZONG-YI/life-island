import * as THREE from 'three';

/**
 * 海島風與大自然神工共用微縮道具組件 (Nature Props & Tropical Vegetation)
 */

/**
 * 建立低多邊形熱帶棕櫚椰樹
 * @param {THREE.Group} group 目標群組
 * @param {number} x X 座標
 * @param {number} y 基底高程
 * @param {number} z Z 座標
 * @param {number} scale 縮放係數
 * @param {number} tiltAngle 傾斜角度 (弧度)
 */
export function addPalmTree(group, x, y, z, scale = 1.0, tiltAngle = 0.15) {
  const treeGroup = new THREE.Group();
  treeGroup.position.set(x, y, z);
  treeGroup.rotation.z = tiltAngle;

  // 1. 棕櫚樹幹 (微彎低多邊形樹幹)
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x854d0e,
    roughness: 0.8,
    flatShading: true
  });
  const trunkGeo = new THREE.CylinderGeometry(0.08 * scale, 0.14 * scale, 1.4 * scale, 5);
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 0.7 * scale;
  trunk.castShadow = true;
  treeGroup.add(trunk);

  // 2. 傘狀熱帶棕櫚葉簇
  const frondMat = new THREE.MeshStandardMaterial({
    color: 0x16a34a,
    roughness: 0.5,
    flatShading: true
  });
  const frondCount = 6;
  for (let i = 0; i < frondCount; i++) {
    const angle = (i * Math.PI * 2) / frondCount;
    const frondGeo = new THREE.ConeGeometry(0.35 * scale, 0.9 * scale, 4);
    const frond = new THREE.Mesh(frondGeo, frondMat);
    frond.position.set(
      Math.cos(angle) * 0.35 * scale,
      1.35 * scale,
      Math.sin(angle) * 0.35 * scale
    );
    frond.rotation.x = Math.sin(angle) * 0.75;
    frond.rotation.z = -Math.cos(angle) * 0.75;
    frond.castShadow = true;
    treeGroup.add(frond);
  }

  // 3. 椰子小球
  const coconutMat = new THREE.MeshStandardMaterial({ color: 0x713f12, roughness: 0.9 });
  const coconutGeo = new THREE.DodecahedronGeometry(0.08 * scale);
  const coconut = new THREE.Mesh(coconutGeo, coconutMat);
  coconut.position.set(0.05 * scale, 1.25 * scale, 0.05 * scale);
  treeGroup.add(coconut);

  group.add(treeGroup);
}

/**
 * 建立低多邊形天然天然岩石塊
 * @param {THREE.Group} group
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @param {number} color
 */
export function addNaturalBoulder(group, x, y, z, radius = 0.4, color = 0x64748b) {
  const geo = new THREE.DodecahedronGeometry(radius, 0);
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.85,
    flatShading: true
  });
  const boulder = new THREE.Mesh(geo, mat);
  boulder.position.set(x, y + radius * 0.8, z);
  boulder.castShadow = true;
  group.add(boulder);
}

