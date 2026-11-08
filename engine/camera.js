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
   * 平滑運鏡飛行至指定世界座標
   * @param {THREE.Vector3|{x: number, y: number, z: number}} destination
   * @param {number} distance 相機與目標的距離偏移量
   */
  function flyTo(destination, distance = 8.5) {
    flightTargetLookAt.set(destination.x, destination.y || 1.0, destination.z);
    flightTargetPos.set(
      destination.x,
      destination.y + distance * 0.75,
      destination.z + distance
    );
    isFlying = true;
  }

  /**
   * 重置回全局島嶼群俯瞰視角
   */
  function reset() {
    flightTargetLookAt.copy(defaultTarget);
    flightTargetPos.copy(defaultPosition);
    isFlying = true;
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
    defaultPosition,
    defaultTarget
  };
}

