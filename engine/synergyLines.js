import * as THREE from 'three';

/**
 * 跨島協作能量光流線模組 (Synergy Lines Engine)
 * 運用三次貝茲樣條曲線 (CubicBezierCurve3) 呈現空中拱形光流
 */

export function createSynergyLines(scene, islandsMap, connections) {
  const group = new THREE.Group();
  group.name = 'synergy-lines-group';
  scene.add(group);

  const lineItems = [];
  const pulseParticles = [];

  // 粒子共用發光球體幾何
  const particleGeometry = new THREE.SphereGeometry(0.18, 12, 12);

  for (const conn of connections) {
    const fromEntry = islandsMap.get(conn.from);
    const toEntry = islandsMap.get(conn.to);

    if (!fromEntry || !toEntry) continue;

    const p0 = fromEntry.group.position.clone();
    const p3 = toEntry.group.position.clone();

    // 島嶼頂部發射點
    p0.y += 2.2;
    p3.y += 2.2;

    // 依兩島距離計算拱起高度
    const distance = p0.distanceTo(p3);
    const arcHeight = Math.max(3.5, distance * 0.38);

    // 空中拱形貝茲控制點
    const p1 = new THREE.Vector3(
      p0.x * 0.7 + p3.x * 0.3,
      p0.y + arcHeight,
      p0.z * 0.7 + p3.z * 0.3
    );

    const p2 = new THREE.Vector3(
      p0.x * 0.3 + p3.x * 0.7,
      p0.y + arcHeight,
      p0.z * 0.3 + p3.z * 0.7
    );

    const curve = new THREE.CubicBezierCurve3(p0, p1, p2, p3);
    const points = curve.getPoints(60);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const lineColor = new THREE.Color(conn.color || 0x38bdf8);

    const material = new THREE.LineDashedMaterial({
      color: lineColor,
      dashSize: 0.8,
      gapSize: 0.5,
      transparent: true,
      opacity: 0.75,
      linewidth: 1
    });

    const lineMesh = new THREE.Line(geometry, material);
    lineMesh.computeLineDistances();
    group.add(lineMesh);

    // 沿著貝茲曲線流動的能量發光粒子
    const particleMat = new THREE.MeshBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.95
    });
    const particleMesh = new THREE.Mesh(particleGeometry, particleMat);
    group.add(particleMesh);

    lineItems.push({
      material,
      speed: 0.85 + (conn.strength || 0.8) * 0.5
    });

    pulseParticles.push({
      mesh: particleMesh,
      curve,
      t: Math.random(), // 隨機初始相位，錯開粒子流
      speed: 0.2 + (conn.strength || 0.8) * 0.15
    });
  }

  /**
   * 每幀動畫更新：動態虛線位移與能量粒子巡航
   * @param {number} delta 幀時間差 (秒)
   */
  function update(delta = 0.016) {
    if (!group.visible) return;

    // 1. 動態更新 DashOffset 產生前進光流
    for (const item of lineItems) {
      item.material.dashOffset -= item.speed * delta * 1.5;
    }

    // 2. 更新能量流光粒子位置
    for (const p of pulseParticles) {
      p.t = (p.t + p.speed * delta) % 1;
      const pos = p.curve.getPointAt(p.t);
      p.mesh.position.copy(pos);
      // 拱頂縮放呼吸
      const scale = 0.8 + 0.4 * Math.sin(p.t * Math.PI);
      p.mesh.scale.set(scale, scale, scale);
    }
  }

  function setVisible(visible) {
    group.visible = visible;
  }

  function toggle() {
    group.visible = !group.visible;
    return group.visible;
  }

  return {
    group,
    update,
    setVisible,
    toggle,
    isVisible: () => group.visible
  };
}

