/**
 * Life Island 人生信條與架構心法金句庫 (Wisdom Quotes SSOT)
 * 供微縮探險小旅人互動彩蛋調用
 */

export const wisdomQuotes = [
  {
    id: "quote-1",
    category: "NORTH_STAR",
    text: "第一性原理：順著因果鏈溯源，在邊界輸入層徹底消除非法狀態。"
  },
  {
    id: "quote-2",
    category: "CRAFT",
    text: "優秀的工程師修復崩潰點；卓越的工程師重構架構讓崩潰點不可能發生。"
  },
  {
    id: "quote-3",
    category: "DEV",
    text: "零框架、零後端不是退縮，而是把最極致的運算交給最靠近使用者的邊緣端。"
  },
  {
    id: "quote-4",
    category: "WISDOM",
    text: "重要的不是你知道多少，而是你能否在噪音中看見最本質的核心規律。"
  },
  {
    id: "quote-5",
    category: "VITALITY",
    text: "身體是精神的唯一容器；規律的體能訓練是高強度專注力最堅固的護城河。"
  },
  {
    id: "quote-6",
    category: "WEALTH",
    text: "資產架構的核心是自由，不是數字；防禦性現金流能讓你永遠不下牌桌。"
  },
  {
    id: "quote-7",
    category: "CONNECTIONS",
    text: "真正滋養心靈的不是社交寬度，而是能坦誠相待的深度連結與同行者。"
  },
  {
    id: "quote-8",
    category: "ADVENTURE",
    text: "在舒適圈外探索未知的邊界，每一次心流體驗都是生命維度的真實擴張。"
  },
  {
    id: "quote-9",
    category: "NORTH_STAR",
    text: "Stay hungry, stay foolish. 永遠保持對世界最純粹的好奇與敬畏。"
  },
  {
    id: "quote-10",
    category: "DEV",
    text: "代碼是寫給人看的，只是恰好能被機器執行。保持克制與清晰。"
  },
  {
    id: "quote-11",
    category: "WISDOM",
    text: "把時間留給具有複利效應的事物，時間就會成為你最強大的盟友。"
  }
];

export function getRandomQuote() {
  const index = Math.floor(Math.random() * wisdomQuotes.length);
  return wisdomQuotes[index];
}

