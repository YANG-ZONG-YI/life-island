import * as THREE from 'three';

/**
 * 自然、財富、連結與探險類微縮地標 (Vitality, Wealth, Connections, Adventure)
 */

export function buildVitalityLandmark(group, y) {
  const treePositions = [
    [-0.8, -0.6], [0.7, -0.5], [-0.6, 0.7], [0.8, 0.6], [0, 0.1]
  ];
  const foliageMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    flatShading: true,
    roughness: 0.6
  });
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x78350f,
    flatShading: true
  });

  treePositions.forEach(([px, pz], idx) => {
    const scale = 0.8 + (idx % 3) * 0.25;
    const trunkGeo = new THREE.CylinderGeometry(0.1 * scale, 0.14 * scale, 0.6 * scale, 5);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(px, y + 0.3 * scale, pz);
    trunk.castShadow = true;
    group.add(trunk);

    const foliageGeo = new THREE.ConeGeometry(0.6 * scale, 1.4 * scale, 5);
    const foliage = new THREE.Mesh(foliageGeo, foliageMat);
    foliage.position.set(px, y + (0.6 + 0.7) * scale, pz);
    foliage.castShadow = true;
    group.add(foliage);
  });
}

export function buildWealthLandmark(group, y) {
  const pyrGeo = new THREE.ConeGeometry(1.6, 1.8, 4);
  const pyrMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.6,
    roughness: 0.3,
    flatShading: true
  });
  const pyr = new THREE.Mesh(pyrGeo, pyrMat);
  pyr.rotation.y = Math.PI / 4;
  pyr.position.set(0, y + 0.9, 0);
  pyr.castShadow = true;
  group.add(pyr);

  const capGeo = new THREE.ConeGeometry(0.5, 0.55, 4);
  const capMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.8
  });
  const cap = new THREE.Mesh(capGeo, capMat);
  cap.rotation.y = Math.PI / 4;
  cap.position.set(0, y + 1.8 + 0.27, 0);
  group.add(cap);
}

export function buildConnectionsLandmark(group, y) {
  const archMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    roughness: 0.3,
    metalness: 0.2
  });

  const archGeo = new THREE.TorusGeometry(1.1, 0.14, 8, 24, Math.PI);
  const arch = new THREE.Mesh(archGeo, archMat);
  arch.rotation.z = Math.PI;
  arch.position.set(0, y + 1.1, 0);
  arch.castShadow = true;
  group.add(arch);

  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.08, 6, 18, Math.PI),
    archMat
  );
  innerRing.rotation.z = Math.PI;
  innerRing.position.set(0, y + 0.6, 0);
  group.add(innerRing);

  const heartGeo = new THREE.DodecahedronGeometry(0.35);
  const heartMat = new THREE.MeshStandardMaterial({
    color: 0xfda4af,
    emissive: 0xe11d48,
    emissiveIntensity: 1.0
  });
  const heart = new THREE.Mesh(heartGeo, heartMat);
  heart.position.set(0, y + 1.0, 0);
  group.add(heart);
}

export function buildAdventureLandmark(group, y) {
  const baseGeo = new THREE.CylinderGeometry(0.5, 0.7, 1.8, 6);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xea580c,
    roughness: 0.4,
    flatShading: true
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(0, y + 0.9, 0);
  base.castShadow = true;
  group.add(base);

  const lightGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 6);
  const lightMat = new THREE.MeshStandardMaterial({
    color: 0xffedd5,
    emissive: 0xfb923c,
    emissiveIntensity: 1.4
  });
  const light = new THREE.Mesh(lightGeo, lightMat);
  light.position.set(0, y + 2.0, 0);
  group.add(light);

  const roofGeo = new THREE.ConeGeometry(0.5, 0.6, 6);
  const roof = new THREE.Mesh(roofGeo, baseMat);
  roof.position.set(0, y + 2.5, 0);
  group.add(roof);
}

