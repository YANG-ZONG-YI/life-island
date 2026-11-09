import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * 相機控制與平滑運鏡動力學模組 (Camera & Lerp Flight Controller)
 */

export function createCameraController(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2.15; // 限制視角不穿透水底
  controls.minDistance = 4;
  controls.maxDistance = 55;

  const defaultPosition = new THREE.Vector3(0, 18, 24);
  const defaultTarget = new THREE.Vector3(0, 0, 0);

  let isFlying = false;
  const flightTargetPos = new THREE.Vector3();
  const flightTargetLookAt = new THREE.Vector3();
  const lerpSpeed = 0.06;

  /**
   * 計算直向螢幕自適應視距
   * @param {number} aspect 視窗寬高比
   * @returns {THREE.Vector3}
   */
  function getResponsiveDefaultPosition(aspect = 1.0) {
    if (aspect < 1.0) {
      const factor = Math.min(1.85, Math.max(1.0, 0.95 / Math.max(0.45, aspect)));
      return new THREE.Vector3(0, 18 * factor, 24 * factor);
    }
    return defaultPosition.clone();
  }

  /**
   * 平滑運鏡飛行至指定世界座標
   * @param {THREE.Vector3|{x: number, y: number, z: number}} destination
   * @param {number} distance 相機與目標的距離偏移量
   */
  function flyTo(destination, distance = 8.5) {
    const aspect = camera.aspect || (window.innerWidth / window.innerHeight);
    const aspectFactor = aspect < 1.0 ? Math.min(1.35, 0.9 / Math.max(0.5, aspect)) : 1.0;
    const finalDist = distance * aspectFactor;

    flightTargetLookAt.set(destination.x, destination.y || 1.0, destination.z);
    flightTargetPos.set(
      destination.x,
      destination.y + finalDist * 0.75,
      destination.z + finalDist
    );
    isFlying = true;
  }

  /**
   * 重置回全局島嶼群俯瞰視角 (自適應直向/橫向長寬比)
   * @param {number} aspect
   */
  function reset(aspect = camera.aspect) {
    const targetPos = getResponsiveDefaultPosition(aspect || (window.innerWidth / window.innerHeight));
    flightTargetLookAt.copy(defaultTarget);
    flightTargetPos.copy(targetPos);
    isFlying = true;
  }

  /**
   * 響應視窗尺寸與長寬比變更
   * @param {number} aspect
   */
  function onWindowResize(aspect) {
    if (!isFlying && camera.position.distanceTo(defaultPosition) < 15) {
      const targetPos = getResponsiveDefaultPosition(aspect);
      camera.position.lerp(targetPos, 0.15);
    }
  }

  /**
   * 每幀更新相機動力學插值與軌道控制器
   */
  function update() {
    if (isFlying) {
      camera.position.lerp(flightTargetPos, lerpSpeed);
      controls.target.lerp(flightTargetLookAt, lerpSpeed);

      const posDist = camera.position.distanceTo(flightTargetPos);
      const targetDist = controls.target.distanceTo(flightTargetLookAt);

      if (posDist < 0.08 && targetDist < 0.08) {
        camera.position.copy(flightTargetPos);
        controls.target.copy(flightTargetLookAt);
        isFlying = false;
      }
    }

    controls.update();
  }

  return {
    controls,
    flyTo,
    reset,
    update,
    onWindowResize,
    getResponsiveDefaultPosition,
    defaultPosition,
    defaultTarget
  };
}

