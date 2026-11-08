/**
 * 2D 玻璃擬態 UI 控制器 (HUD & Glassmorphism Drawer)
 */

export function createUIController({ islands, devLogs, onIslandSelect, onResetView, onThemeToggle }) {
  const drawerEl = document.getElementById('island-drawer');
  const drawerContentEl = document.getElementById('drawer-content');
  const closeBtn = document.getElementById('drawer-close-btn');
  const hoverTooltipEl = document.getElementById('hover-tooltip');
  const islandSelectEl = document.getElementById('island-select');
  const resetBtn = document.getElementById('btn-reset-view');
  const themeToggleBtn = document.getElementById('btn-theme-toggle');

  let currentSelectedIslandId = null;

  // 1. 初始化下拉選單
  if (islandSelectEl) {
    islandSelectEl.innerHTML = '<option value="">-- 快速導航：選擇島嶼 --</option>';
    islands.forEach(island => {
      const opt = document.createElement('option');
      opt.value = island.id;
      opt.textContent = `${island.name} (${island.subtitle})`;
      islandSelectEl.appendChild(opt);
    });

    islandSelectEl.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (selectedId) {
        onIslandSelect(selectedId);
      }
    });
  }

  // 2. 視角重置與主題切換事件
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      closeDrawer();
      if (islandSelectEl) islandSelectEl.value = '';
      onResetView();
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isNight = document.body.classList.toggle('night-mode');
      themeToggleBtn.textContent = isNight ? '🌙 深夜霓虹' : '☀️ 晨曦暖陽';
      onThemeToggle(isNight);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  /**
   * 開啟抽屜並根據島嶼類型動態渲染
   * @param {object} island
   */
  function openDrawer(island) {
    currentSelectedIslandId = island.id;
    if (islandSelectEl) islandSelectEl.value = island.id;

    if (island.id === 'dev-island') {
      renderDevIslandDrawer(island);
    } else {
      renderStandardIslandDrawer(island);
    }

    drawerEl.classList.add('open');
  }

  function closeDrawer() {
    currentSelectedIslandId = null;
    drawerEl.classList.remove('open');
  }

  /**
   * 渲染開發島專屬的垂直時間軸視圖 (Timeline View)
   */
  function renderDevIslandDrawer(island) {
    const timelineHtml = devLogs.map(log => {
      const isMajor = log.type === 'MAJOR' || log.isMajor === true;
      const typeBadge = isMajor
        ? '<span class="badge badge-major">[重大規劃]</span>'
        : `<span class="badge badge-tech">[${log.type}]</span>`;
      
      const statusBadge = `<span class="badge-status status-${log.status.toLowerCase()}">${log.status}</span>`;

      const detailsList = Array.isArray(log.details)
        ? `<ul class="timeline-details">${log.details.map(d => `<li>${d}</li>`).join('')}</ul>`
        : '';

      return `
        <div class="timeline-item ${isMajor ? 'timeline-item-major' : ''}">
          <div class="timeline-dot"></div>
          <div class="timeline-header">
            <span class="timeline-date">${log.date}</span>
            <div class="timeline-badges">${typeBadge} ${statusBadge}</div>
          </div>
          <h4 class="timeline-title">${log.title}</h4>
          <p class="timeline-summary">${log.summary}</p>
          ${detailsList}
        </div>
      `;
    }).join('');

    const corePoliciesHtml = island.items.map(item => `
      <div class="policy-card">
        <h5 class="policy-title">${item.title}</h5>
        <p class="policy-desc">${item.desc}</p>
      </div>
    `).join('');

    drawerContentEl.innerHTML = `
      <div class="island-header" style="border-left: 4px solid ${island.accentColor}">
        <span class="island-biome">${island.biome}</span>
        <h2 class="island-title">${island.name}</h2>
        <h3 class="island-subtitle">${island.subtitle}</h3>
        <p class="island-desc">${island.description}</p>
      </div>

      <div class="section-container">
        <h4 class="section-title">核心架構準則</h4>
        <div class="policy-list">${corePoliciesHtml}</div>
      </div>

      <div class="section-container">
        <h4 class="section-title">歷次演進與重大規劃時間軸</h4>
        <div class="timeline-container">${timelineHtml}</div>
      </div>
    `;
  }

  /**
   * 渲染常規島嶼的內容條目視圖
   */
  function renderStandardIslandDrawer(island) {
    const items = island.items || island.policies || [];
    const itemsHtml = items.map(item => `
      <div class="milestone-card">
        <div class="milestone-header">
          <h4 class="milestone-title">${item.title}</h4>
          ${item.status ? `<span class="badge badge-neutral">${item.status}</span>` : ''}
        </div>
        <p class="milestone-desc">${item.desc || item.description || ''}</p>
      </div>
    `).join('');

    drawerContentEl.innerHTML = `
      <div class="island-header" style="border-left: 4px solid ${island.accentColor}">
        <span class="island-biome">${island.biome}</span>
        <h2 class="island-title">${island.name}</h2>
        <h3 class="island-subtitle">${island.subtitle}</h3>
        <p class="island-desc">${island.description}</p>
      </div>

      <div class="section-container">
        <h4 class="section-title">核心價值與關鍵條目 (${items.length})</h4>
        <div class="milestone-list">${itemsHtml}</div>
      </div>
    `;
  }

  /**
   * 更新滑鼠懸停微縮提示卡
   * @param {object|null} island
   * @param {number} clientX
   * @param {number} clientY
   */
  function updateTooltip(island, clientX, clientY) {
    if (!hoverTooltipEl) return;
    if (!island) {
      hoverTooltipEl.classList.remove('visible');
      return;
    }

    hoverTooltipEl.innerHTML = `
      <span class="tooltip-name">${island.name}</span>
      <span class="tooltip-biome">${island.biome}</span>
    `;
    hoverTooltipEl.style.left = `${clientX + 16}px`;
    hoverTooltipEl.style.top = `${clientY + 16}px`;
    hoverTooltipEl.classList.add('visible');
  }

  return {
    openDrawer,
    closeDrawer,
    updateTooltip,
    getCurrentIslandId: () => currentSelectedIslandId
  };
}

