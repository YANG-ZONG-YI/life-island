import * as THREE from 'three';

/**
 * 低多邊形動態水面模組 (Low-Poly Dynamic Tropical Lagoon Water)
 * 透過頂點位置的正弦多頻動態擾動與 FlatShading 計算熱帶海島波光
 */

export function createWaterPlane(size = 85, segments = 48) {
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
  geometry.rotateX(-Math.PI / 2);

  // 記錄基準頂點位置供波動計算
  const posAttribute = geometry.attributes.position;
  const initialVertices = new Float32Array(posAttribute.array.length);
  initialVertices.set(posAttribute.array);

  // 熱帶海島碧藍清澈水體材質
  const material = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.22,
    metalness: 0.18,
    flatShading: true,
    transparent: true,
    opacity: 0.88
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'dynamic-water-plane';
  mesh.position.y = 0.35;
  mesh.receiveShadow = true;

  /**
   * 每幀更新水波頂點高程
   * @param {number} elapsedTime 累計運行秒數
   */
  function update(elapsedTime) {
    const positions = geometry.attributes.position.array;
    const vertexCount = positions.length / 3;

    for (let i = 0; i < vertexCount; i++) {
      const idx = i * 3;
      const x = initialVertices[idx];
      const z = initialVertices[idx + 2];

      // 複合正弦波演算法產生熱帶海島低多邊形浪潮起伏
      const wave1 = Math.sin(x * 0.25 + elapsedTime * 1.4) * 0.16;
      const wave2 = Math.cos(z * 0.3 + elapsedTime * 1.1) * 0.14;
      const wave3 = Math.sin((x + z) * 0.18 + elapsedTime * 0.8) * 0.08;

      positions[idx + 1] = wave1 + wave2 + wave3;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  return { mesh, update, material };
}
