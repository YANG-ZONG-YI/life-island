import * as THREE from 'three';
import { getRandomQuote } from '../dataQuotes.js';

/**
 * 微縮探險小旅人控制器 (The Wanderer Mascot Controller)
 * 程序化低多邊形人物拼裝、島嶼躍動位移動畫與揮手彩蛋氣泡
 */

export function createWandererController(scene) {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'wanderer-mascot-group';
  scene.add(rootGroup);

  // 1. 人物材質 (Low-Poly FlatShading)
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.6 });
  const jacketMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 }); // 亮橘色探險夾克
  const hatMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 });    // 卡其色探險帽
  const packMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });   // 棕色皮質背包
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });  // 深藍褲子

  // 2. 幾何拼裝
  // 軀幹
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.55, 8), jacketMat);
  torso.position.y = 0.52;
  torso.castShadow = true;
  rootGroup.add(torso);

  // 頭部
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), skinMat);
  head.position.y = 0.95;
  head.castShadow = true;
  rootGroup.add(head);

  // 帽子 (帽冠 + 帽簷)
  const hatCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.16, 8), hatMat);
  hatCrown.position.y = 1.12;
  const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.04, 12), hatMat);
  hatBrim.position.y = 1.05;
  rootGroup.add(hatCrown);
  rootGroup.add(hatBrim);

  // 背包
  const pack = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.36, 0.18), packMat);
  pack.position.set(0, 0.58, -0.22);
  rootGroup.add(pack);

  // 腿部
  const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 6);
  const leftLeg = new THREE.Mesh(legGeo, pantsMat);
  leftLeg.position.set(-0.11, 0.18, 0);
  const rightLeg = new THREE.Mesh(legGeo, pantsMat);
  rightLeg.position.set(0.11, 0.18, 0);
  rootGroup.add(leftLeg);
  rootGroup.add(rightLeg);

  // 右手臂 (揮手樞軸)
  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.3, 0.7, 0);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.35, 6), jacketMat);
  arm.position.y = -0.15;
  rightArmPivot.add(arm);
  rootGroup.add(rightArmPivot);

  // 標記小人偶所有 Mesh 可點擊
  rootGroup.traverse((child) => {
    if (child.isMesh) {
      child.userData.isWanderer = true;
      child.userData.isClickable = true;
    }
  });

  // 3. 動態位移與狀態
  let isTraveling = false;
  let travelProgress = 0;
  const travelDuration = 1.1; // 秒
  const startPos = new THREE.Vector3(0, 2.2, 0);
  const targetPos = new THREE.Vector3(0, 2.2, 0);
  let onArrivedCallback = null;

  rootGroup.position.copy(startPos);

  let waveTime = 0;
  let isWaving = false;

  // DOM 氣泡
  const bubbleEl = document.getElementById('wanderer-bubble');

  function travelToIsland(destinationPos, onArrived) {
    startPos.copy(rootGroup.position);
    targetPos.copy(destinationPos);
    targetPos.y += 2.1; // 站在島嶼頂面

    isTraveling = true;
    travelProgress = 0;
    onArrivedCallback = onArrived;
    hideQuoteBubble();

    // 朝向目標點
    rootGroup.lookAt(targetPos.x, rootGroup.position.y, targetPos.z);
  }

  function triggerGreeting() {
    isWaving = true;
    waveTime = 0;
  }

  function showQuoteBubble(camera) {
    if (!bubbleEl) return;
    const quote = getRandomQuote();
    bubbleEl.innerHTML = `
      <div class="bubble-header">🏝️ 探險家心法</div>
      <div class="bubble-text">"${quote.text}"</div>
    `;
    bubbleEl.classList.add('visible');
    triggerGreeting();

    setTimeout(() => hideQuoteBubble(), 5500);
  }

  function hideQuoteBubble() {
    if (bubbleEl) bubbleEl.classList.remove('visible');
  }

  function update(delta, camera) {
    // 1. 拋物線彈跳位移
    if (isTraveling) {
      travelProgress += delta / travelDuration;
      if (travelProgress >= 1) {
        travelProgress = 1;
        isTraveling = false;
        rootGroup.position.copy(targetPos);
        triggerGreeting();
        if (onArrivedCallback) onArrivedCallback();
      } else {
        rootGroup.position.lerpVectors(startPos, targetPos, travelProgress);
        // 拋物線弧度高度
        const arc = Math.sin(travelProgress * Math.PI) * 4.2;
        rootGroup.position.y += arc;
      }
    } else {
      // 閒置微呼吸
      torso.position.y = 0.52 + Math.sin(Date.now() * 0.003) * 0.02;
    }

    // 2. 揮手動態
    if (isWaving) {
      waveTime += delta * 7;
      rightArmPivot.rotation.z = 1.8 + Math.sin(waveTime) * 0.6;
      if (waveTime > Math.PI * 4) {
        isWaving = false;
        rightArmPivot.rotation.z = 0;
      }
    }

    // 3. 氣泡投影位置跟隨
    if (bubbleEl && bubbleEl.classList.contains('visible') && camera) {
      const screenPos = rootGroup.position.clone();
      screenPos.y += 1.8;
      screenPos.project(camera);

      const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
      bubbleEl.style.left = `${x}px`;
      bubbleEl.style.top = `${y}px`;
    }
  }

  return {
    group: rootGroup,
    travelToIsland,
    triggerGreeting,
    showQuoteBubble,
    hideQuoteBubble,
    update
  };
}

