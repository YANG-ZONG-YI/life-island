import * as THREE from 'three';
import {
  buildDevLandmark,
  buildNorthStarLandmark,
  buildCraftLandmark,
  buildWisdomLandmark
} from './landmarksTech.js';
import {
  buildVitalityLandmark,
  buildWealthLandmark,
  buildConnectionsLandmark,
  buildAdventureLandmark
} from './landmarksNature.js';

/**
 * 8 大島嶼微縮程序化地標裝飾調度器 (Deco Orchestrator)
 */

export function addIslandDecorations(islandGroup, islandData) {
  const decorGroup = new THREE.Group();
  decorGroup.name = `decor-${islandData.id}`;
  const baseTop = 1.6 * (islandData.height || 1.0) + 0.2;

  switch (islandData.id) {
    case 'dev-island':
      buildDevLandmark(decorGroup, baseTop);
      break;
    case 'north-star':
      buildNorthStarLandmark(decorGroup, baseTop);
      break;
    case 'craft-impact':
      buildCraftLandmark(decorGroup, baseTop);
      break;
    case 'wisdom-knowledge':
      buildWisdomLandmark(decorGroup, baseTop);
      break;
    case 'vitality-health':
      buildVitalityLandmark(decorGroup, baseTop);
      break;
    case 'wealth-architecture':
      buildWealthLandmark(decorGroup, baseTop);
      break;
    case 'deep-connections':
      buildConnectionsLandmark(decorGroup, baseTop);
      break;
    case 'adventure-joy':
      buildAdventureLandmark(decorGroup, baseTop);
      break;
    default:
      break;
  }

  islandGroup.add(decorGroup);
}
