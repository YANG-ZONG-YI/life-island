import * as THREE from 'three';
import { addPalmTree, addNaturalBoulder } from './natureProps.js';

/**
 * 水行、金行、土行與水木共生大自然微縮地標
 * (Dev: 原初潮汐環礁, North Star: 晨曦金晶海岬, Craft: 喀斯特擎天柱, Wisdom: 深海藍洞)
 */

export function buildDevLandmark(group, y) {
  // 水行：天然珊瑚環礁與原初神泉
  const lagoonGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.15, 12);
  const lagoonMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: 0.95
  });
  const lagoon = new THREE.Mesh(lagoonGeo, lagoonMat);
  lagoon.position.set(0, y + 0.08, 0);
  group.add(lagoon);

  const atollGeo = new THREE.TorusGeometry(1.5, 0.22, 6, 16);
  const atollMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    roughness: 0.9,
    flatShading: true
  });
  const atoll = new THREE.Mesh(atollGeo, atollMat);
  atoll.rotation.x = Math.PI / 2;
  atoll.position.set(0, y + 0.1, 0);
  atoll.castShadow = true;
  group.add(atoll);

  // 潮汐中央神泉晶峰
  const geyserGeo = new THREE.ConeGeometry(0.35, 1.8, 6);
  const geyserMat = new THREE.MeshStandardMaterial({
    color: 0x7dd3fc,
    emissive: 0x0284c7,
    emissiveIntensity: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.85
  });
  const geyser = new THREE.Mesh(geyserGeo, geyserMat);
  geyser.position.set(0, y + 0.9, 0);
  group.add(geyser);

  addPalmTree(group, -1.1, y + 0.1, 0.8, 0.85, -0.2);
  addPalmTree(group, 1.0, y + 0.1, -0.7, 0.75, 0.25);
  addNaturalBoulder(group, 0.8, y + 0.1, 0.8, 0.28, 0xfde047);
}

export function buildNorthStarLandmark(group, y) {
  // 金行：晨曦金晶海岬與白金石英簇
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.7,
    metalness: 0.85,
    roughness: 0.15,
    flatShading: true
  });

  const crystalConfigs = [
    { radius: 0.45, h: 3.2, x: 0, z: 0, rx: 0.05, rz: -0.05 },
    { radius: 0.32, h: 2.2, x: 0.65, z: 0.45, rx: 0.2, rz: 0.1 },
    { radius: 0.28, h: 1.8, x: -0.6, z: -0.4, rx: -0.15, rz: -0.2 },
    { radius: 0.22, h: 1.3, x: -0.5, z: 0.5, rx: 0.1, rz: -0.25 }
  ];

  crystalConfigs.forEach(({ radius, h, x, z, rx, rz }) => {
    const geo = new THREE.ConeGeometry(radius, h, 6);
    const mesh = new THREE.Mesh(geo, crystalMat);
    mesh.position.set(x, y + h * 0.5, z);
    mesh.rotation.set(rx, 0, rz);
    mesh.castShadow = true;
    group.add(mesh);
  });

  addNaturalBoulder(group, 0.7, y, -0.7, 0.38, 0xd97706);
  addNaturalBoulder(group, -0.8, y, 0.2, 0.32, 0xb45309);
  addPalmTree(group, 1.1, y, 0.6, 0.7, 0.3);
}

export function buildCraftLandmark(group, y) {
  // 土行：喀斯特擎天海柱與天生石橋
  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.9,
    flatShading: true
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.8,
    flatShading: true
  });

  // 主柱與副柱
  const pillars = [
    { rTop: 0.45, rBot: 0.6, h: 2.5, x: -0.4, z: -0.2 },
    { rTop: 0.35, rBot: 0.45, h: 1.9, x: 0.7, z: 0.4 }
  ];
  pillars.forEach(({ rTop, rBot, h, x, z }) => {
    const geo = new THREE.CylinderGeometry(rTop, rBot, h, 6);
    const mesh = new THREE.Mesh(geo, rockMat);
    mesh.position.set(x, y + h * 0.5, z);
    mesh.castShadow = true;
    group.add(mesh);

    // 柱頂植被
    const capGeo = new THREE.ConeGeometry(rTop * 1.15, 0.4, 6);
    const cap = new THREE.Mesh(capGeo, mossMat);
    cap.position.set(x, y + h + 0.15, z);
    group.add(cap);
  });

  // 天生海蝕拱橋
  const archGeo = new THREE.TorusGeometry(0.7, 0.16, 5, 10, Math.PI * 0.8);
  const arch = new THREE.Mesh(archGeo, rockMat);
  arch.rotation.z = -Math.PI * 0.35;
  arch.position.set(0.15, y + 1.4, 0.1);
  arch.castShadow = true;
  group.add(arch);

  addPalmTree(group, -0.9, y, 0.8, 0.8, -0.15);
}

export function buildWisdomLandmark(group, y) {
  // 水木共生：深海天坑藍洞與石窟幽林
  const sinkholeMat = new THREE.MeshStandardMaterial({
    color: 0x1e1b4b,
    roughness: 0.15,
    metalness: 0.2
  });
  const sinkholeGeo = new THREE.CylinderGeometry(1.2, 0.5, 0.25, 10);
  const sinkhole = new THREE.Mesh(sinkholeGeo, sinkholeMat);
  sinkhole.position.set(0, y + 0.12, 0);
  group.add(sinkhole);

  const innerLightGeo = new THREE.DodecahedronGeometry(0.35);
  const innerLightMat = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    emissive: 0x9333ea,
    emissiveIntensity: 1.2
  });
  const innerLight = new THREE.Mesh(innerLightGeo, innerLightMat);
  innerLight.position.set(0, y + 0.3, 0);
  group.add(innerLight);

  addNaturalBoulder(group, -0.8, y, -0.7, 0.5, 0x475569);
  addPalmTree(group, -0.75, y, 0.85, 0.85, -0.2);
  addPalmTree(group, 0.9, y, -0.5, 0.75, 0.25);
}
