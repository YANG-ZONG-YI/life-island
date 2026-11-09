import * as THREE from 'three';
import { addPalmTree, addNaturalBoulder } from './natureProps.js';

/**
 * 木行、金土相生、木水交融與火行大自然微縮地標
 * (Vitality: 遠古神木, Wealth: 階梯海台, Connections: 雙生海蝕門, Adventure: 熔岩火山)
 */

export function buildVitalityLandmark(group, y) {
  // 木行：遠古潮汐神木雨林與巨榕氣根
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x582f0e,
    roughness: 0.9,
    flatShading: true
  });
  const foliageMat = new THREE.MeshStandardMaterial({
    color: 0x059669,
    roughness: 0.6,
    flatShading: true
  });

  // 神木主幹與氣根分枝
  const trunkGeo = new THREE.CylinderGeometry(0.35, 0.65, 1.8, 6);
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.set(0, y + 0.9, 0);
  trunk.castShadow = true;
  group.add(trunk);

  // 多層次低多邊形神木樹冠
  const canopyLevels = [
    { r: 1.4, h: 0.8, yOff: 1.7 },
    { r: 1.0, h: 0.7, yOff: 2.2 },
    { r: 0.6, h: 0.6, yOff: 2.6 }
  ];
  canopyLevels.forEach(({ r, h, yOff }) => {
    const geo = new THREE.ConeGeometry(r, h, 6);
    const canopy = new THREE.Mesh(geo, foliageMat);
    canopy.position.set(0, y + yOff, 0);
    canopy.castShadow = true;
    group.add(canopy);
  });

  addPalmTree(group, -1.0, y, 0.7, 0.85, -0.2);
  addPalmTree(group, 0.9, y, -0.7, 0.75, 0.25);
  addNaturalBoulder(group, -0.7, y, -0.8, 0.35, 0x166534);
}

export function buildWealthLandmark(group, y) {
  // 金土相生：階梯海蝕台地與天然金礦晶層
  const terraceMat = new THREE.MeshStandardMaterial({
    color: 0xa16207,
    roughness: 0.85,
    flatShading: true
  });
  const oreMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.8,
    metalness: 0.8,
    roughness: 0.2
  });

  // 三層階梯式地質海蝕台
  const steps = [
    { rTop: 1.5, rBot: 1.6, h: 0.35, yOff: 0.17 },
    { rTop: 1.0, rBot: 1.15, h: 0.45, yOff: 0.55 },
    { rTop: 0.55, rBot: 0.7, h: 0.55, yOff: 1.05 }
  ];
  steps.forEach(({ rTop, rBot, h, yOff }) => {
    const geo = new THREE.CylinderGeometry(rTop, rBot, h, 6);
    const mesh = new THREE.Mesh(geo, terraceMat);
    mesh.position.set(0, y + yOff, 0);
    mesh.castShadow = true;
    group.add(mesh);
  });

  // 頂層天然金礦石晶核
  const oreGeo = new THREE.DodecahedronGeometry(0.38);
  const ore = new THREE.Mesh(oreGeo, oreMat);
  ore.position.set(0, y + 1.55, 0);
  group.add(ore);

  addNaturalBoulder(group, 0.85, y + 0.35, 0.4, 0.25, 0xca8a04);
  addPalmTree(group, -0.9, y, 0.8, 0.75, -0.2);
}

export function buildConnectionsLandmark(group, y) {
  // 木水交融：雙生海蝕石門與珊瑚礁
  const coralRockMat = new THREE.MeshStandardMaterial({
    color: 0xe11d48,
    roughness: 0.8,
    flatShading: true
  });

  const archGeo = new THREE.TorusGeometry(1.0, 0.22, 6, 12, Math.PI * 0.9);
  const arch = new THREE.Mesh(archGeo, coralRockMat);
  arch.rotation.z = Math.PI * 0.05;
  arch.position.set(0, y + 0.9, 0);
  arch.castShadow = true;
  group.add(arch);

  // 門心天然共鳴晶核
  const coreGeo = new THREE.OctahedronGeometry(0.35, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xfecdd3,
    emissive: 0xf43f5e,
    emissiveIntensity: 0.9
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.set(0, y + 0.9, 0);
  group.add(core);

  addPalmTree(group, 0.85, y, 0.65, 0.8, 0.2);
  addNaturalBoulder(group, -0.85, y, -0.6, 0.38, 0xbe123c);
}

export function buildAdventureLandmark(group, y) {
  // 火行：熔岩玄武海蝕火山與地熱火山口
  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x27272a,
    roughness: 0.9,
    flatShading: true
  });
  const lavaMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xf97316,
    emissiveIntensity: 1.6,
    roughness: 0.2
  });

  // 火山錐主體 (中空錐台)
  const coneGeo = new THREE.CylinderGeometry(0.7, 1.6, 1.5, 7);
  const cone = new THREE.Mesh(coneGeo, rockMat);
  cone.position.set(0, y + 0.75, 0);
  cone.castShadow = true;
  group.add(cone);

  // 火山口內部熔岩湖
  const lavaGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.1, 7);
  const lava = new THREE.Mesh(lavaGeo, lavaMat);
  lava.position.set(0, y + 1.45, 0);
  group.add(lava);

  // 黑曜石天然柱石群
  const pillars = [
    { x: -0.8, z: 0.7, h: 1.1 },
    { x: 0.9, z: -0.6, h: 0.8 }
  ];
  pillars.forEach(({ x, z, h }) => {
    const pGeo = new THREE.CylinderGeometry(0.18, 0.24, h, 5);
    const pMesh = new THREE.Mesh(pGeo, rockMat);
    pMesh.position.set(x, y + h * 0.5, z);
    pMesh.castShadow = true;
    group.add(pMesh);
  });
}
