import { searchIslands } from './searchEngine.js';

/**
 * 搜尋 HUD 與下拉建議組件控制器 (Search HUD Controller)
 */

export function createSearchUI({ onSelectIsland, onClearSearch }) {
  const inputEl = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const dropdownEl = document.getElementById('search-dropdown');

  let currentQuery = '';
  let activeResults = [];

  if (!inputEl || !dropdownEl) {
    return {
      getCurrentQuery: () => currentQuery,
      clearSearch: () => {}
    };
  }

  // 輸入監聽
  inputEl.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    currentQuery = query;

    if (query.length > 0) {
      if (clearBtn) clearBtn.style.display = 'block';
      activeResults = searchIslands(query);
      renderDropdown(activeResults, query);
    } else {
      clearSearch(false);
    }
  });

  // 鍵盤快捷鍵 (Enter 選取首項 / Esc 清除)
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearSearch(true);
      inputEl.blur();
    } else if (e.key === 'Enter') {
      if (activeResults.length > 0) {
        selectResult(activeResults[0].id, currentQuery);
      }
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearSearch(true);
      inputEl.focus();
    });
  }

  // 點擊外部自動收起下拉
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box-wrapper')) {
      hideDropdown();
    }
  });

  /**
   * 渲染即時搜尋下拉面板
   */
  function renderDropdown(results, keyword) {
    if (!results || results.length === 0) {
      dropdownEl.innerHTML = `<div class="search-empty">找不到符合「${escapeHtml(keyword)}」的島嶼或條目</div>`;
      dropdownEl.classList.add('visible');
      return;
    }

    let html = '';
    for (const res of results) {
      const itemsListHtml = res.matchedItems.slice(0, 3).map(item => `
        <div class="search-result-item" data-island-id="${res.id}">
          <span class="search-item-title">${highlightKeyword(item.title, keyword)}</span>
          <span class="search-item-snippet">${highlightKeyword(item.text, keyword)}</span>
        </div>
      `).join('');

      html += `
        <div class="search-result-group">
          <div class="search-group-header">
            <span>🏝️ ${res.islandName}</span>
            <span>(${res.matchedItems.length} 項符合)</span>
          </div>
          ${itemsListHtml}
        </div>
      `;
    }

    dropdownEl.innerHTML = html;
    dropdownEl.classList.add('visible');

    // 綁定項目點擊事件
    dropdownEl.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const targetId = el.getAttribute('data-island-id');
        if (targetId) selectResult(targetId, keyword);
      });
    });
  }

  function selectResult(islandId, keyword) {
    hideDropdown();
    if (onSelectIsland) {
      onSelectIsland(islandId, keyword);
    }
  }

  function hideDropdown() {
    dropdownEl.classList.remove('visible');
  }

  function clearSearch(triggerCallback = true) {
    currentQuery = '';
    activeResults = [];
    inputEl.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    hideDropdown();

    if (triggerCallback && onClearSearch) {
      onClearSearch();
    }
  }

  return {
    getCurrentQuery: () => currentQuery,
    clearSearch,
    highlightKeyword
  };
}

/**
 * 安全跳脫與關鍵字高光標記
 */
export function highlightKeyword(text, keyword) {
  if (!text || !keyword) return escapeHtml(text || '');
  const escapedText = escapeHtml(text);
  const escapedKw = escapeRegex(keyword);
  const regex = new RegExp(`(${escapedKw})`, 'gi');
  return escapedText.replace(regex, '<mark class="search-highlight">$1</mark>');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

