import * as THREE from 'three';

/**
 * 3D 聚光燈與調暗控制器 (Volumetric Spotlight & Island Dimmer)
 * 聚焦目標島嶼時升起 3D 垂直聚光柱，其餘島塊維持防禦性微幅調暗
 */

export function createSpotlightController(scene) {
  const spotlightGroup = new THREE.Group();
  spotlightGroup.name = 'spotlight-controller-group';
  spotlightGroup.visible = false;
  scene.add(spotlightGroup);

  // 1. 垂直聚光光柱 (Volumetric Cone Cylinder)
  const beamHeight = 22;
  const beamGeometry = new THREE.CylinderGeometry(0.8, 3.6, beamHeight, 32, 1, true);
  beamGeometry.translate(0, beamHeight * 0.5, 0);

  const beamMaterial = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const beamMesh = new THREE.Mesh(beamGeometry, beamMaterial);
  spotlightGroup.add(beamMesh);

  // 2. 地面發光聚光環 (Ground Spotlight Ring)
  const ringGeometry = new THREE.RingGeometry(0.2, 3.8, 32);
  ringGeometry.rotateX(-Math.PI / 2);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
  ringMesh.position.y = 0.15;
  spotlightGroup.add(ringMesh);

  let currentTargetIslandId = null;
  let animTime = 0;

  /**
   * 聚焦特定島嶼
   * @param {string} islandId 目標島嶼 ID
   * @param {Map} islandsMap 島嶼群 Map
   */
  function focusIsland(islandId, islandsMap) {
    const entry = islandsMap.get(islandId);
    if (!entry) return;

    currentTargetIslandId = islandId;
    const islandColor = entry.data.accentColor
      ? new THREE.Color(entry.data.accentColor)
      : new THREE.Color(0x38bdf8);

    beamMaterial.color.copy(islandColor);
    ringMaterial.color.copy(islandColor);

    // 定位光柱於目標島嶼世界座標
    const worldPos = entry.group.position;
    spotlightGroup.position.set(worldPos.x, worldPos.y + 0.1, worldPos.z);
    spotlightGroup.visible = true;

    // 其餘島塊調暗，目標島嶼保持亮起
    for (const [id, item] of islandsMap.entries()) {
      const isTarget = id === islandId;
      applyDimming(item.group, !isTarget);
    }
  }

  /**
   * 清除聚光狀態，恢復所有島嶼正常亮度
   * @param {Map} islandsMap 島嶼群 Map
   */
  function clearFocus(islandsMap) {
    currentTargetIslandId = null;
    spotlightGroup.visible = false;

    if (islandsMap) {
      for (const item of islandsMap.values()) {
        applyDimming(item.group, false);
      }
    }
  }

  /**
   * 遍歷 Mesh 進行調暗/恢復
   * @param {THREE.Group} group
   * @param {boolean} dim
   */
  function applyDimming(group, dim) {
    group.traverse((child) => {
      if (child.isMesh && child.material) {
        if (!child.userData.originalOpacity) {
          child.userData.originalOpacity = child.material.opacity ?? 1.0;
        }

        if (dim) {
          child.material.transparent = true;
          child.material.opacity = child.userData.originalOpacity * 0.42;
        } else {
          child.material.opacity = child.userData.originalOpacity;
          if (child.userData.originalOpacity >= 1.0) {
            child.material.transparent = false;
          }
        }
      }
    });
  }

  /**
   * 每幀動畫：聚光柱慢速自轉與微幅呼吸脈衝
   * @param {number} delta
   */
  function update(delta = 0.016) {
    if (!spotlightGroup.visible) return;

    animTime += delta;
    beamMesh.rotation.y += delta * 0.4;
    const pulse = 0.28 + 0.08 * Math.sin(animTime * 3.5);
    beamMaterial.opacity = pulse;
    ringMesh.scale.setScalar(1.0 + 0.04 * Math.sin(animTime * 2.5));
  }

  return {
    group: spotlightGroup,
    focusIsland,
    clearFocus,
    update,
    getCurrentTargetId: () => currentTargetIslandId
  };
}

