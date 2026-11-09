import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('[RWD_STYLES_CONTRACT] responsive.css must be imported and declare breakpoints', () => {
  const styleCss = fs.readFileSync('./style.css', 'utf-8');
  assert.ok(styleCss.includes('responsive.css'), 'style.css must import responsive.css');

  const responsiveCss = fs.readFileSync('./css/responsive.css', 'utf-8');
  assert.ok(responsiveCss.includes('@media (max-width: 768px)'), 'responsive.css must define 768px tablet breakpoint');
  assert.ok(responsiveCss.includes('@media (max-width: 480px)'), 'responsive.css must define 480px mobile breakpoint');
  assert.ok(responsiveCss.includes('safe-area-inset-top'), 'responsive.css must support iOS safe-area-inset');
  assert.ok(responsiveCss.includes('#island-drawer'), 'responsive.css must adapt #island-drawer');
});

test('[RWD_SEPARATION_OF_CONCERNS] timeline.css must not contain media query overrides', () => {
  const timelineCss = fs.readFileSync('./css/timeline.css', 'utf-8');
  assert.ok(!timelineCss.includes('@media'), 'timeline.css must be pure without media query contamination');
});

test('[CAMERA_PORTRAIT_ADAPTOR] camera.js must provide responsive default position logic', async () => {
  const code = fs.readFileSync('./engine/camera.js', 'utf-8');
  assert.ok(code.includes('getResponsiveDefaultPosition'), 'camera.js must declare getResponsiveDefaultPosition');
  assert.ok(code.includes('onWindowResize'), 'camera.js must declare onWindowResize');
});

test('[WANDERER_SCREEN_CLAMPING] wanderer.js must enforce screen boundary clamping', () => {
  const wandererCode = fs.readFileSync('./engine/wanderer.js', 'utf-8');
  assert.ok(wandererCode.includes('clampedX'), 'wanderer.js must calculate clampedX for screen clamping');
  assert.ok(wandererCode.includes('clampedY'), 'wanderer.js must calculate clampedY for screen clamping');
});

