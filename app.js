import * as THREE from 'three';
import { islands, devLogs, synergyConnections } from './data.js';
import { createIslandMesh } from './engine/hexGrid.js';
import { addIslandDecorations } from './engine/decorations.js';
import { createWaterPlane } from './engine/water.js';
import { createCameraController } from './engine/camera.js';
import { createUIController } from './engine/ui.js';
import { createSynergyLines } from './engine/synergyLines.js';
import { createSpotlightController } from './engine/spotlight.js';
import { createWandererController } from './engine/wanderer.js';

/**
 * Life Island 3D 主程序入口
 */
class LifeIslandApp {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.islandsMap = new Map();
    this.clickableMeshes = [];
    this.hoveredIslandGroup = null;

    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);

    this.initScene();
    this.initLights();
    this.initWater();
    this.initIslands();
    this.initSynergyAndSpotlight();
    this.initWanderer();
    this.initCameraAndUI();
    this.initEvents();

    // 啟動 800ms 後自動開啟核心島嶼抽屜，確保使用者進入即看到豐富內容
    setTimeout(() => {
      if (this.uiController && !this.uiController.getCurrentIslandId()) {
        this.focusIslandById('dev-island');
      }
    }, 800);

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f172a);
    this.scene.fog = new THREE.FogExp2(0x0f172a, 0.016);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 200);

    // 直向螢幕 (Portrait: aspect < 1.0) 初始相機自動拉開視距，確保 8 座群島全景可見
    const aspectFactor = aspect < 1.0 ? Math.min(1.85, 0.95 / Math.max(0.45, aspect)) : 1.0;
    this.camera.position.set(0, 18 * aspectFactor, 24 * aspectFactor);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfffbeb, 1.4);
    this.sunLight.position.set(20, 30, 15);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 100;
    const d = 25;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    this.hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.5);
    this.scene.add(this.hemiLight);
  }

  initWater() {
    this.water = createWaterPlane(85, 48);
    this.scene.add(this.water.mesh);
  }

  initIslands() {
    this.islandsRoot = new THREE.Group();
    this.scene.add(this.islandsRoot);

    for (const islandData of islands) {
      const islandGroup = createIslandMesh(islandData, islands);
      addIslandDecorations(islandGroup, islandData);

      this.islandsRoot.add(islandGroup);
      this.islandsMap.set(islandData.id, { data: islandData, group: islandGroup });

      islandGroup.traverse((child) => {
        if (child.isMesh) {
          child.userData.islandId = islandData.id;
          child.userData.isClickable = true;
          this.clickableMeshes.push(child);
        }
      });
    }
  }

  initSynergyAndSpotlight() {
    this.synergyLines = createSynergyLines(this.scene, this.islandsMap, synergyConnections);
    this.spotlightController = createSpotlightController(this.scene);
  }

  initWanderer() {
    this.wanderer = createWandererController(this.scene);
    this.wanderer.group.traverse((child) => {
      if (child.isMesh) {
        child.userData.isWanderer = true;
        child.userData.isClickable = true;
        this.clickableMeshes.push(child);
      }
    });

    const devIsland = this.islandsMap.get('dev-island');
    if (devIsland) {
      this.wanderer.travelToIsland(devIsland.group.position);
    }
  }

  initCameraAndUI() {
    this.cameraController = createCameraController(this.camera, this.renderer.domElement);
    this.uiController = createUIController({
      islands,
      devLogs,
      onIslandSelect: (islandId, kw) => this.focusIslandById(islandId, kw),
      onResetView: () => this.handleResetView(),
      onThemeToggle: (isNight) => this.applyTheme(isNight),
      onSynergyToggle: (visible) => this.synergyLines.setVisible(visible)
    });
  }

  focusIslandById(islandId, keyword = '') {
    const entry = this.islandsMap.get(islandId);
    if (!entry) return;

    this.cameraController.flyTo(entry.group.position);
    this.spotlightController.focusIsland(islandId, this.islandsMap);
    if (this.wanderer) {
      this.wanderer.travelToIsland(entry.group.position);
    }
    this.uiController.openDrawer(entry.data, keyword);
  }

  handleResetView() {
    this.spotlightController.clearFocus(this.islandsMap);
    this.cameraController.reset();
    if (this.wanderer) {
      const devIsland = this.islandsMap.get('dev-island');
      if (devIsland) {
        this.wanderer.travelToIsland(devIsland.group.position);
      }
    }
  }

  applyTheme(isNight) {
    const bg = isNight ? 0x020617 : 0x0f172a;
    this.scene.background.set(bg);
    this.scene.fog.color.set(bg);
    this.ambientLight.intensity = isNight ? 0.35 : 0.75;
    this.sunLight.intensity = isNight ? 0.5 : 1.4;
    this.sunLight.color.set(isNight ? 0x818cf8 : 0xfffbeb);
    this.water.material.color.set(isNight ? 0x02172d : 0x0369a1);
  }

  initEvents() {
    window.addEventListener('resize', () => {
      const aspect = window.innerWidth / window.innerHeight;
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      if (this.cameraController) {
        this.cameraController.onWindowResize(aspect);
      }
    });

    window.addEventListener('pointermove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.handlePointerHover(e.clientX, e.clientY);
    });

    window.addEventListener('click', (e) => {
      if (e.target.closest('#island-drawer') || e.target.closest('#hud-nav') || e.target.closest('#wanderer-bubble')) return;
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.handlePointerClick();
    });

    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (e.target.closest('#island-drawer') || e.target.closest('#hud-nav') || e.target.closest('#wanderer-bubble')) return;
      if (e.changedTouches && e.changedTouches[0]) {
        const touch = e.changedTouches[0];
        const moveDist = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
        if (moveDist > 10) return; // 判定為旋轉/拖曳視角，防誤觸

        this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        this.handlePointerClick();
      }
    }, { passive: true });
  }

  handlePointerHover(clientX, clientY) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.clickableMeshes);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const islandId = hitMesh.userData.islandId;
      const entry = this.islandsMap.get(islandId);

      if (entry && this.hoveredIslandGroup !== entry.group) {
        this.resetHoverState();
        this.hoveredIslandGroup = entry.group;
        entry.group.position.y = 0.45;
        document.body.style.cursor = 'pointer';
        this.uiController.updateTooltip(entry.data, clientX, clientY);
      } else if (entry) {
        this.uiController.updateTooltip(entry.data, clientX, clientY);
      } else if (hitMesh.userData.isWanderer) {
        document.body.style.cursor = 'pointer';
      }
    } else {
      if (this.hoveredIslandGroup) this.resetHoverState();
      this.uiController.updateTooltip(null, 0, 0);
      document.body.style.cursor = 'default';
    }
  }

  resetHoverState() {
    if (this.hoveredIslandGroup) {
      this.hoveredIslandGroup.position.y = 0;
      this.hoveredIslandGroup = null;
    }
  }

  handlePointerClick() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(this.clickableMeshes);
    if (hits.length > 0) {
      const hitObj = hits[0].object;
      if (hitObj.userData.isWanderer && this.wanderer) {
        this.wanderer.showQuoteBubble(this.camera);
        return;
      }
      if (hitObj.userData.islandId) {
        this.focusIslandById(hitObj.userData.islandId);
      }
    }
  }

  animate() {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    if (this.water) this.water.update(elapsedTime);
    if (this.synergyLines) this.synergyLines.update(delta);
    if (this.spotlightController) this.spotlightController.update(delta);
    if (this.wanderer) this.wanderer.update(delta, this.camera);
    if (this.cameraController) this.cameraController.update();

    this.renderer.render(this.scene, this.camera);
  }
}

function initApp() {
  new LifeIslandApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
