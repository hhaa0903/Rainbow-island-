/*
 * 彩虹冒險島 Rainbow Island — 關卡資料
 * ------------------------------------------------------------
 * 新增每週內容時，主要只需要修改這個檔案：
 *   1. 在 levels 陣列裡找到地點，把 status 從 "preview" 改成 "playable"
 *   2. 補上 intro、steps、ending（格式請參考「迎賓碼頭 dock」）
 *
 * 每個 step（一組對話）的欄位：
 *   id          唯一代號
 *   title       給家長看的中文小標題
 *   coop        姊妹一起玩時的輪流方式：
 *                 "each"      兩人輪流各回答一次
 *                 "alternate" 只有一人回答，下一個 alternate 換另一人
 *                 "together"  兩人一起說
 *   pose        角色動作：wave（揮手）/ drinks（拿出飲料）/ give（遞出禮物）/ idle
 *   lines       角色台詞（英文 en + 中文 zh）。一次只說一兩句。
 *   repeatLines 第二位孩子回答時改用的台詞（可省略）
 *   helper      「英文小幫手」：更簡短的英文示範
 *   helperOnRequest  true = 只有按「需要幫忙」後才出現示範
 *   zhTip       「中文小提示」裡給家長的一句話
 *   answers     家長參考回答 simple（簡單版）/ advanced（進階版）
 *   cues        理解提示圖片（不是選擇題）：id、圖示 icon、keywords（麥克風比對用）
 *   responses   角色的回應；可依孩子選的 cue id 分開寫，default 為沒有選圖時
 *   feedback    場景回饋動畫代號（遊戲引擎裡的 FEEDBACK 函式）
 *
 * 文字中的 {name} 會換成正在回答的孩子名字（一起說時為 "Chloe and Joey"）。
 */
window.RAINBOW_DATA = {
  players: {
    chloe: { id: "chloe", name: "Chloe", zh: "Chloe", age: "8 歲", color: "#E8766C" },
    joey: { id: "joey", name: "Joey", zh: "Joey", age: "6 歲", color: "#4E9A68" }
  },

  levels: [
    {
      id: "dock",
      week: 1,
      status: "playable",
      name: "Welcome Dock",
      zh: "迎賓碼頭",
      theme: "打招呼、自我介紹",
      icon: "dock",
      map: { x: 235, y: 470 },
      shardColor: "#EF8A80",
      unlock: { requires: [] },
      host: { name: "Bunny", zh: "小兔子" },
      intro: {
        zh: "小兔子 Bunny 的彩虹船準備出發了！牠想認識兩位新朋友。一起打招呼，幫忙準備飲料，就能找到第一塊彩虹碎片。",
        parentNote: "約 5 分鐘・4 組對話・一次一句"
      },
      steps: [
        {
          id: "meet",
          title: "認識朋友",
          coop: "each",
          pose: "wave",
          lines: [
            { en: "Hi! I'm Bunny.", zh: "嗨！我是小兔子 Bunny。" },
            { en: "What's your name?", zh: "你叫什麼名字？" }
          ],
          repeatLines: [
            { en: "Hi! What's your name?", zh: "嗨！那你叫什麼名字呢？" }
          ],
          helper: { en: "{name}.", zh: "只說名字就可以。" },
          zhTip: "孩子只要說出自己的名字就很棒了，也可以指指自己。",
          answers: { simple: ["{name}."], advanced: ["I'm {name}."] },
          listenWords: ["chloe", "joey", "i'm", "name"],
          responses: { default: [{ en: "Hi, {name}!", zh: "嗨，{name}！" }] },
          feedback: "badgeName"
        },
        {
          id: "mood",
          title: "帶著今天的心情出發",
          coop: "each",
          pose: "idle",
          lines: [{ en: "How are you?", zh: "你今天好嗎？心情怎麼樣？" }],
          helper: { en: "Happy? Sad? Sleepy?", zh: "開心？難過？想睡？" },
          zhTip: "每一種心情都可以。圖片只是幫忙理解，孩子說哪一個就點哪一個。",
          answers: {
            simple: ["Happy.", "Sad.", "Sleepy."],
            advanced: ["I'm happy.", "I'm sad.", "I'm sleepy."]
          },
          cues: [
            { id: "happy", icon: "happy", label: "happy", keywords: ["happy", "good", "great", "fine"] },
            { id: "sad", icon: "sad", label: "sad", keywords: ["sad", "bad", "not"] },
            { id: "sleepy", icon: "sleepy", label: "sleepy", keywords: ["sleepy", "tired", "sleep"] }
          ],
          responses: {
            happy: [{ en: "Yay! Me too!", zh: "耶！我也很開心！" }],
            sad: [
              { en: "Oh, it's okay.", zh: "喔，沒關係。" },
              { en: "Let's take it slowly.", zh: "我們慢慢來。" }
            ],
            sleepy: [
              { en: "Okay. Let's take it slowly.", zh: "好，我們慢慢來。" }
            ],
            default: [{ en: "Thank you for telling me.", zh: "謝謝你告訴我。" }]
          },
          feedback: "badgeMood"
        },
        {
          id: "drink",
          title: "準備船上的飲料",
          coop: "each",
          pose: "drinks",
          lines: [{ en: "Water or milk?", zh: "要水還是牛奶？" }],
          helper: { en: "Water? Milk?", zh: "水？牛奶？" },
          zhTip: "小兔子拿出水和牛奶。孩子說出或指出想要的飲料就可以。",
          answers: {
            simple: ["Water.", "Milk."],
            advanced: ["Water, please.", "Milk, please."]
          },
          cues: [
            { id: "water", icon: "water", label: "water", keywords: ["water", "what"] },
            { id: "milk", icon: "milk", label: "milk", keywords: ["milk", "mill"] }
          ],
          responses: {
            default: [{ en: "Here you go!", zh: "給你！" }]
          },
          defaultCue: "water",
          feedback: "basket"
        },
        {
          id: "thanks",
          title: "向朋友道謝",
          coop: "together",
          pose: "give",
          lines: [{ en: "This is for you!", zh: "這是給你的！" }],
          helper: { en: "Thank you.", zh: "謝謝。" },
          helperOnRequest: true,
          zhTip: "小兔子把探險徽章遞給孩子。留一點時間，讓孩子自然地說謝謝。",
          answers: { simple: ["Thank you."], advanced: ["Thank you, Bunny."] },
          listenWords: ["thank", "thanks", "bunny"],
          responses: { default: [{ en: "You're welcome!", zh: "不客氣！" }] },
          feedback: "giftBadge"
        }
      ],
      ending: {
        lines: [
          { en: "Yay! The rainbow is back!", zh: "耶！彩虹回來了！" },
          { en: "Bye-bye, friends!", zh: "朋友們，掰掰！" }
        ],
        zh: "彩虹恢復了第一道顏色！Chloe 和 Joey 一起找到第一塊彩虹碎片。",
        nextChoices: ["forest", "house"]
      }
    },

    {
      id: "forest",
      week: 2,
      status: "preview",
      name: "Mood Forest",
      zh: "心情森林",
      theme: "表達開心、難過、疲倦",
      icon: "forest",
      map: { x: 330, y: 250 },
      shardColor: "#F4AE62",
      unlock: { requires: ["dock"] },
      host: { name: "Bear", zh: "小熊" },
      preview: {
        zh: "森林裡的小熊走了好久的路，覺得好累；小鳥找不到朋友，有點難過。陪牠們說說心情，看看誰需要一個抱抱。",
        sample: ["How are you?（複習）", "I'm tired.（新）", "Me too!（新）"]
      }
    },
    {
      id: "house",
      week: 3,
      status: "preview",
      name: "Cozy House",
      zh: "家庭小屋",
      theme: "尋求幫忙、找物品、日常互動",
      icon: "house",
      map: { x: 585, y: 205 },
      shardColor: "#F2D46B",
      unlock: { requires: ["dock"] },
      host: { name: "Kitty", zh: "小貓" },
      preview: {
        zh: "小貓找不到牠的帽子了！一起在小屋裡東找找、西看看，幫忙把東西收拾好。",
        sample: ["Hi!（複習）", "Help, please!（新）", "Here it is!（新）"]
      }
    },
    {
      id: "shop",
      week: 4,
      status: "preview",
      name: "Picnic Shop",
      zh: "野餐商店",
      theme: "選飲料、提出需求、道謝",
      icon: "shop",
      map: { x: 760, y: 360 },
      shardColor: "#7FC08A",
      unlock: { requires: ["dock"] },
      host: { name: "Squirrel", zh: "松鼠" },
      preview: {
        zh: "松鼠的野餐商店開張了！挑一挑要帶的飲料和點心，記得說 please 和 thank you。",
        sample: ["Water, please.（複習）", "Juice, please.（新）", "Thank you!（複習）"]
      }
    },
    {
      id: "station",
      week: 5,
      status: "preview",
      name: "Travel Station",
      zh: "旅行車站",
      theme: "買票、出發、簡單旅行需求",
      icon: "station",
      map: { x: 540, y: 500 },
      shardColor: "#72B5D8",
      unlock: { requires: ["dock"] },
      host: { name: "Elephant", zh: "小象站長" },
      preview: {
        zh: "小象站長在車站等大家。買一張票，跳上彩虹列車，準備出發去旅行！",
        sample: ["One ticket, please.（新）", "Let's go!（新）", "Bye!（複習）"]
      }
    }
  ]
};
