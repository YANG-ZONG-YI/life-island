/**
 * Life Island 關鍵字模糊搜尋引擎 (Search & Spotlight Indexer)
 * 支援島嶼名稱、副標題、敘述、條目政策與開發日誌全鏈路檢索
 */

import { islands } from '../data.js';
import { devLogs } from '../dataLogs.js';

/**
 * 跨島關鍵字模糊檢索
 * @param {string} query 搜尋關鍵字
 * @returns {Array<{id: string, islandId: string, islandName: string, islandSubtitle: string, matchedItems: Array<{title: string, type: string, text: string}>}>}
 */
export function searchIslands(query) {
  if (!query || typeof query !== 'string') return [];

  const rawKeyword = query.trim();
  if (rawKeyword.length === 0) return [];

  const keyword = rawKeyword.toLowerCase();
  const results = [];

  for (const island of islands) {
    const matchedItems = [];

    // 1. 檢查島嶼本體中繼資訊 (Name, Subtitle, Biome, Description)
    const islandMatch =
      island.name?.toLowerCase().includes(keyword) ||
      island.subtitle?.toLowerCase().includes(keyword) ||
      island.biome?.toLowerCase().includes(keyword) ||
      island.description?.toLowerCase().includes(keyword);

    if (islandMatch) {
      matchedItems.push({
        title: island.name,
        type: 'ISLAND_META',
        text: island.description || island.subtitle || ''
      });
    }

    // 2. 檢查島嶼條目 (Items / Policies)
    const items = island.items || island.policies || [];
    for (const item of items) {
      const titleMatch = item.title?.toLowerCase().includes(keyword);
      const descMatch = (item.desc || item.description || '')?.toLowerCase().includes(keyword);
      const detailsMatch = Array.isArray(item.details) &&
        item.details.some(d => d.toLowerCase().includes(keyword));

      if (titleMatch || descMatch || detailsMatch) {
        matchedItems.push({
          title: item.title,
          type: item.status || 'ITEM',
          text: item.desc || item.description || ''
        });
      }
    }

    // 3. 若為開發島，額外檢查時間軸日誌 (devLogs)
    if (island.id === 'dev-island' && Array.isArray(devLogs)) {
      for (const log of devLogs) {
        const titleMatch = log.title?.toLowerCase().includes(keyword);
        const summaryMatch = log.summary?.toLowerCase().includes(keyword);
        const detailsMatch = Array.isArray(log.details) &&
          log.details.some(d => d.toLowerCase().includes(keyword));

        if (titleMatch || summaryMatch || detailsMatch) {
          matchedItems.push({
            title: log.title,
            type: `LOG_${log.type || 'TECH'}`,
            text: log.summary || ''
          });
        }
      }
    }

    // 若有任何匹配，納入結果清單
    if (matchedItems.length > 0) {
      results.push({
        id: island.id,
        islandId: island.id,
        islandName: island.name,
        islandSubtitle: island.subtitle,
        matchedItems
      });
    }
  }

  return results;
}

// 別名導出相容測試
export const filterIslands = searchIslands;

