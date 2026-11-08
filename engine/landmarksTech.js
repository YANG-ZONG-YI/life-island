import * as THREE from 'three';

/**
 * 科技與心智類微縮地標 (Dev, North Star, Craft, Wisdom)
 */

export function buildDevLandmark(group, y) {
  const chipGeo = new THREE.BoxGeometry(2.0, 0.4, 2.0);
  const chipMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.8,
    roughness: 0.2
  });
  const chip = new THREE.Mesh(chipGeo, chipMat);
  chip.position.set(0, y + 0.2, 0);
  chip.castShadow = true;
  group.add(chip);

  const coreGeo = new THREE.BoxGeometry(0.9, 0.2, 0.9);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.8,
    roughness: 0.1
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.set(0, y + 0.45, 0);
  group.add(core);

  const towerGeo = new THREE.CylinderGeometry(0.08, 0.25, 2.8, 6);
  const towerMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    metalness: 0.9,
    roughness: 0.2
  });
  const tower = new THREE.Mesh(towerGeo, towerMat);
  tower.position.set(0, y + 1.8, 0);
  tower.castShadow = true;
  group.add(tower);

  const ringGeo = new THREE.TorusGeometry(0.35, 0.05, 6, 16);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 1.2
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, y + 2.7, 0);
  group.add(ring);
}

export function buildNorthStarLandmark(group, y) {
  const spireGeo = new THREE.ConeGeometry(0.8, 3.2, 4);
  const spireMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.7,
    roughness: 0.2,
    flatShading: true
  });
  const spire = new THREE.Mesh(spireGeo, spireMat);
  spire.position.set(0, y + 1.6, 0);
  spire.castShadow = true;
  group.add(spire);

  const beaconGeo = new THREE.OctahedronGeometry(0.45, 0);
  const beaconMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xfacc15,
    emissiveIntensity: 1.5
  });
  const beacon = new THREE.Mesh(beaconGeo, beaconMat);
  beacon.position.set(0, y + 3.6, 0);
  group.add(beacon);
}

export function buildCraftLandmark(group, y) {
  const heights = [1.2, 2.0, 1.6, 2.6, 1.4];
  const positions = [
    [-0.7, -0.6], [0.6, -0.5], [-0.5, 0.6], [0.3, 0.4], [0, -0.1]
  ];
  const mat = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    metalness: 0.6,
    roughness: 0.3,
    flatShading: true
  });

  heights.forEach((h, i) => {
    const geo = new THREE.BoxGeometry(0.65, h, 0.65);
    const mesh = new THREE.Mesh(geo, mat);
    const [px, pz] = positions[i];
    mesh.position.set(px, y + h * 0.5, pz);
    mesh.castShadow = true;
    group.add(mesh);
  });
}

export function buildWisdomLandmark(group, y) {
  const stepMat = new THREE.MeshStandardMaterial({
    color: 0x6d28d9,
    roughness: 0.5,
    flatShading: true
  });

  for (let i = 0; i < 3; i++) {
    const size = 1.8 - i * 0.45;
    const geo = new THREE.BoxGeometry(size, 0.3, size);
    const step = new THREE.Mesh(geo, stepMat);
    step.position.set(0, y + 0.15 + i * 0.3, 0);
    step.castShadow = true;
    group.add(step);
  }

  const crystalGeo = new THREE.OctahedronGeometry(0.55, 0);
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0xc084fc,
    emissive: 0x9333ea,
    emissiveIntensity: 0.9,
    metalness: 0.2,
    roughness: 0.1
  });
  const crystal = new THREE.Mesh(crystalGeo, crystalMat);
  crystal.position.set(0, y + 1.6, 0);
  group.add(crystal);
}

