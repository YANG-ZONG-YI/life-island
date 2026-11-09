/**
 * Life Island 跨島協作能量光流關聯資料 (Synergy Connections SSOT)
 * 定義 8 大島嶼間的能量流動與互補共振網絡
 */

export const synergyConnections = [
  {
    from: 'dev-island',
    to: 'craft-impact',
    label: '底層技術賦能專業產出',
    strength: 0.95,
    color: '#38bdf8'
  },
  {
    from: 'dev-island',
    to: 'wisdom-knowledge',
    label: '架構思維驅動心智演化',
    strength: 0.85,
    color: '#818cf8'
  },
  {
    from: 'wisdom-knowledge',
    to: 'north-star',
    label: '深層哲學確立終極價值觀',
    strength: 0.9,
    color: '#a78bfa'
  },
  {
    from: 'vitality-health',
    to: 'adventure-joy',
    label: '巔峰體能支撐極限探索',
    strength: 0.95,
    color: '#34d399'
  },
  {
    from: 'vitality-health',
    to: 'craft-impact',
    label: '強健體魄保障高強度專注',
    strength: 0.8,
    color: '#10b981'
  },
  {
    from: 'craft-impact',
    to: 'wealth-architecture',
    label: '專業實力轉化資產配置',
    strength: 0.9,
    color: '#60a5fa'
  },
  {
    from: 'wealth-architecture',
    to: 'deep-connections',
    label: '充裕資源守護家庭社群',
    strength: 0.85,
    color: '#f59e0b'
  },
  {
    from: 'deep-connections',
    to: 'north-star',
    label: '利他初心印證人生意義',
    strength: 0.88,
    color: '#fb7185'
  }
];

