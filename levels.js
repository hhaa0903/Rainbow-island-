/*
 * 彩虹冒險島 Rainbow Island — 關卡資料
 * ------------------------------------------------------------
 * 新增每週內容時，主要只需要修改這個檔案：
 *   1. 在 levels 陣列裡找到地點，把 status 從 "preview" 改成 "playable"
 *   2. 補上 scene、host、intro、steps、ending（格式請參考「迎賓碼頭」和「心情森林」）
 *   3. unlock.requires 列出要先探索完的地點，沒完成前地圖會顯示「先去…」
 *
 * 地點欄位：
 *   scene       場景圖（index.html 的 SCENES：dock / forest）
 *   host        主角：id（HOSTS 裡的畫法）、name、zh、pitch（聲音高低）、start（開場狀態，例如 tired）
 *   cast        其他角色，例如 bird。台詞加上 speaker: "bird" 就由牠說
 *   ending.feedback  結尾動畫（例如 openDoor、bloomAll）
 *
 * 每個 step（一組對話）的欄位：
 *   id          唯一代號
 *   title       給家長看的中文小標題
 *   coop        姊妹一起玩時的輪流方式：
 *                 "each"      兩人輪流各回答一次
 *                 "alternate" 只有一人回答，下一個 alternate 換另一人
 *                 "together"  兩人一起說
 *   pose        角色動作：wave（揮手）/ drinks（拿出飲料）/ give（遞出禮物）/ listen（等孩子問）/ idle
 *   challengeOnly  true = 只在「挑戰模式」出現
 *   waitTip     （可省略）家長區等待提示，換掉預設的「先等約 5～10 秒」
 *   lines       角色台詞（英文 en + 中文 zh）。一次只說一兩句。
 *   repeatLines 第二位孩子回答時改用的台詞（可省略）
 *   helper      「英文小幫手」：更簡短的英文示範
 *   helperOnRequest  true = 只有按「需要幫忙」後才出現示範
 *   zhTip       「中文小提示」裡給家長的一句話
 *   answers     家長參考回答 simple（簡單版）/ advanced（進階版）
 *   cues        理解提示圖片（不是選擇題）：id、圖示 icon、keywords（麥克風比對用）
 *   responses   角色的回應；可依孩子選的 cue id 分開寫，default 為沒有選圖時
 *   enter       （可省略）這段開始時的動畫，例如 birdPeek
 *   feedback    場景回饋動畫代號，可以是一個或陣列（遊戲引擎裡的 FEEDBACK 函式）
 *
 * 文字中的 {name} 會換成正在回答的孩子名字（一起說時為 "Chloe and Joey"），
 * {age} / {Age} 會換成孩子年紀的英文（eight / Eight）。
 */
window.RAINBOW_DATA = {
  players: {
    chloe: { id: "chloe", name: "Chloe", zh: "Chloe", age: "8 歲", ageNum: 8, ageEn: "eight", color: "#E8766C" },
    joey: { id: "joey", name: "Joey", zh: "Joey", age: "6 歲", ageNum: 6, ageEn: "six", color: "#4E9A68" }
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
      scene: "dock",
      host: { id: "bunny", name: "Bunny", zh: "小兔子", pitch: 1.1 },
      intro: {
        zh: "小兔子 Bunny 的彩虹船準備出發了！牠想認識兩位新朋友。一起打招呼，幫忙準備飲料，就能找到第一塊彩虹碎片。",
        parentNote: "一次一句"
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
          id: "age",
          title: "幾歲了（挑戰）",
          challengeOnly: true,
          coop: "each",
          pose: "idle",
          lines: [{ en: "How old are you?", zh: "你幾歲？" }],
          helper: { en: "I'm {age}.", zh: "我 {age} 歲。" },
          zhTip: "孩子可以只說數字，或用手指比出來。",
          answers: { simple: ["{Age}."], advanced: ["I'm {age}."] },
          listenWords: ["eight", "six", "8", "6"],
          responses: { default: [{ en: "Wow, {age}! Cool!", zh: "哇，{age} 歲！好棒！" }] },
          feedback: "badgeAge"
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
          id: "askBunny",
          title: "問小兔子心情（挑戰）",
          challengeOnly: true,
          coop: "alternate",
          pose: "listen",
          lines: [{ en: "Your turn! Ask me.", zh: "換你問我！" }],
          helper: { en: "How are you, Bunny?", zh: "你好嗎，小兔子？" },
          zhTip: "這一題換孩子問問題。可以用剛剛小兔子問過的 How are you?",
          waitTip: "這次換孩子開口問。等一下下，需要時家長可以先小聲示範：How are you, Bunny?",
          answers: { simple: ["How are you?"], advanced: ["How are you, Bunny?"] },
          listenWords: ["how", "are", "you", "bunny"],
          responses: {
            default: [
              { en: "I'm happy!", zh: "我很開心！" },
              { en: "Thank you for asking.", zh: "謝謝你問我。" }
            ]
          },
          feedback: "hostHappy"
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
          waitTip: "留一點時間，讓孩子自然地說。先等約 5～10 秒，再提供提示。",
          answers: { simple: ["Thank you."], advanced: ["Thank you, Bunny."] },
          listenWords: ["thank", "thanks", "bunny"],
          responses: { default: [{ en: "You're welcome!", zh: "不客氣！" }] },
          feedback: "giftBadge"
        },
        {
          id: "bye",
          title: "揮手道別（挑戰）",
          challengeOnly: true,
          coop: "together",
          pose: "wave",
          lines: [{ en: "Bye, {name}!", zh: "掰掰，{name}！" }],
          helper: { en: "Bye, Bunny!", zh: "掰掰，小兔子！" },
          zhTip: "跟小兔子揮揮手說再見。只說 Bye 也很好。",
          answers: { simple: ["Bye!"], advanced: ["Bye, Bunny!"] },
          listenWords: ["bye", "bunny"],
          responses: { default: [{ en: "See you next time!", zh: "下次見！" }] },
          feedback: "waveBye"
        }
      ],
      ending: {
        lines: [
          { en: "Yay! The rainbow is back!", zh: "耶！彩虹回來了！" },
          { en: "Bye-bye, friends!", zh: "朋友們，掰掰！" }
        ],
        // 挑戰模式已經有道別對話，結尾就不再說 Bye-bye
        challengeLines: [{ en: "Yay! The rainbow is back!", zh: "耶！彩虹回來了！" }],
        zh: "彩虹恢復了第一道顏色！Chloe 和 Joey 一起找到第一塊彩虹碎片。",
        feedback: ["openDoor"],
        nextChoices: ["forest", "house"]
      }
    },

    {
      id: "forest",
      week: 2,
      status: "playable",
      scene: "forest",
      name: "Mood Forest",
      zh: "心情森林",
      theme: "表達開心、難過、疲倦",
      icon: "forest",
      map: { x: 330, y: 250 },
      shardColor: "#F4AE62",
      unlock: { requires: ["dock"] },
      host: { id: "bear", name: "Bear", zh: "小熊", pitch: 0.8, start: "tired" },
      cast: { bird: { id: "bird", name: "Bird", zh: "小鳥", pitch: 1.6 } },
      intro: {
        zh: "心情森林裡，小熊 Bear 走了好遠的路，好累好累；樹上的小鳥一個人，有點難過。陪牠們說說心情、分享蘋果、跟小鳥打招呼，森林的花就會一朵朵打開！",
        parentNote: "一次一句"
      },
      preview: {
        zh: "森林裡的小熊走了好久的路，覺得好累；小鳥找不到朋友，有點難過。陪牠們說說心情，讓森林的花都開起來。",
        sample: ["How are you?（複習）", "I'm tired.（新）", "Me too!（新）"]
      },
      steps: [
        {
          id: "meetBear",
          title: "認識小熊",
          coop: "each",
          pose: "wave",
          lines: [{ en: "Hi! I'm Bear.", zh: "嗨！我是小熊 Bear。" }],
          repeatLines: [{ en: "Hi! Hi!", zh: "嗨！嗨！（換你了）" }],
          helper: { en: "Hi, Bear!", zh: "嗨，小熊！" },
          zhTip: "跟小熊打招呼。想多說一點，可以加上自己的名字：Hi! I'm Chloe.",
          answers: { simple: ["Hi!"], advanced: ["Hi, Bear!", "Hi! I'm {name}."] },
          listenWords: ["hi", "bear"],
          responses: { default: [{ en: "Hi, {name}!", zh: "嗨，{name}！" }] },
          feedback: ["bloom", "hostWave"]
        },
        {
          id: "tired",
          title: "小熊好累",
          coop: "each",
          pose: "idle",
          lines: [
            { en: "I'm tired.", zh: "我好累喔。" },
            { en: "How are you?", zh: "你今天好嗎？" }
          ],
          repeatLines: [{ en: "How are you?", zh: "那你呢？你好嗎？" }],
          helper: { en: "Happy? Sad? Tired?", zh: "開心？難過？累？" },
          zhTip: "新句子：I'm tired.（我好累）。每一種心情都可以，孩子說哪一個就點哪一個。",
          answers: {
            simple: ["Happy.", "Sad.", "Tired."],
            advanced: ["I'm happy.", "I'm sad.", "I'm tired."]
          },
          cues: [
            { id: "happy", icon: "happy", label: "happy", keywords: ["happy", "good", "great", "fine"] },
            { id: "sad", icon: "sad", label: "sad", keywords: ["sad", "bad"] },
            { id: "tired", icon: "tired", label: "tired", keywords: ["tired", "sleepy", "sleep"] }
          ],
          responses: {
            happy: [{ en: "Yay! That makes me happy.", zh: "耶！我也開心起來了。" }],
            sad: [{ en: "Oh. Let's sit together.", zh: "喔。我們一起坐一下。" }],
            tired: [
              { en: "Me too!", zh: "我也是！" },
              { en: "Let's rest.", zh: "我們休息一下。" }
            ],
            default: [{ en: "Thank you for telling me.", zh: "謝謝你告訴我。" }]
          },
          feedback: ["bloom"]
        },
        {
          id: "askBear",
          title: "問小熊心情（挑戰）",
          challengeOnly: true,
          coop: "alternate",
          pose: "listen",
          lines: [{ en: "Your turn! Ask me.", zh: "換你問我！" }],
          helper: { en: "How are you, Bear?", zh: "你好嗎，小熊？" },
          zhTip: "和碼頭一樣，換孩子主動問問題。",
          waitTip: "這次換孩子開口問。需要時家長可以先小聲示範：How are you, Bear?",
          answers: { simple: ["How are you?"], advanced: ["How are you, Bear?"] },
          listenWords: ["how", "are", "you", "bear"],
          responses: {
            default: [
              { en: "I'm tired.", zh: "我好累。" },
              { en: "But I'm happy now!", zh: "可是我現在很開心！" }
            ]
          },
          feedback: ["bloom", "hostHappy"]
        },
        {
          id: "apple",
          title: "分享蘋果",
          coop: "each",
          pose: "apple",
          lines: [{ en: "I like apples!", zh: "我喜歡蘋果！" }],
          helper: { en: "Me too!", zh: "我也是！" },
          zhTip: "新句子：Me too!（我也是！）。不喜歡蘋果也可以說 No.",
          answers: { simple: ["Me too!", "No."], advanced: ["I like apples too!", "No, thank you."] },
          cues: [
            { id: "yes", icon: "heart", label: "me too", keywords: ["me too", "too", "yes", "like"] },
            { id: "no", icon: "nope", label: "no", keywords: ["no"] }
          ],
          responses: {
            yes: [{ en: "Yay! Let's share.", zh: "耶！我們一起分享。" }],
            no: [{ en: "That's okay!", zh: "沒關係！" }],
            default: [{ en: "Yum! I feel better!", zh: "好好吃！我覺得好多了！" }]
          },
          defaultCue: "yes",
          feedback: ["bloom", "shareApple"]
        },
        {
          id: "okay",
          title: "關心小鳥（挑戰）",
          challengeOnly: true,
          coop: "alternate",
          pose: "idle",
          enter: ["birdPeek"],
          lines: [{ en: "I'm sad.", zh: "我好難過。", speaker: "bird" }],
          helper: { en: "Are you okay?", zh: "你還好嗎？" },
          zhTip: "新句子：Are you okay?（你還好嗎？）。小鳥看起來很難過，問問牠。",
          waitTip: "讓孩子試著關心小鳥。說 Oh no! 或用手摸摸畫面上的小鳥也很好。",
          answers: { simple: ["Are you okay?", "Oh no!"], advanced: ["Are you okay, Bird?"] },
          listenWords: ["okay", "ok", "oh no"],
          responses: { default: [{ en: "I can't find my friends.", zh: "我找不到我的朋友。", speaker: "bird" }] },
          feedback: ["bloom", "birdPeek"]
        },
        {
          id: "hiBird",
          title: "跟小鳥做朋友",
          coop: "together",
          pose: "idle",
          enter: ["birdPeek"],
          lines: [
            { en: "Bird is sad.", zh: "小鳥好難過。" },
            { en: "Let's say hi!", zh: "我們跟牠說嗨！" }
          ],
          helper: { en: "Hi, Bird!", zh: "嗨，小鳥！" },
          zhTip: "一起跟小鳥打招呼，當牠的朋友。",
          answers: { simple: ["Hi!", "Hi, Bird!"], advanced: ["Hi, Bird! How are you?"] },
          listenWords: ["hi", "bird"],
          responses: {
            default: [
              { en: "Hi! Thank you!", zh: "嗨！謝謝你們！", speaker: "bird" },
              { en: "I'm happy now!", zh: "我現在好開心！", speaker: "bird" }
            ]
          },
          feedback: ["bloom", "birdHappy"]
        },
        {
          id: "bye",
          title: "揮手道別（挑戰）",
          challengeOnly: true,
          coop: "together",
          pose: "wave",
          lines: [{ en: "Bye, {name}!", zh: "掰掰，{name}！" }],
          helper: { en: "Bye, Bear! Bye, Bird!", zh: "掰掰，小熊！掰掰，小鳥！" },
          zhTip: "跟小熊和小鳥揮手說再見。只說 Bye 也很好。",
          answers: { simple: ["Bye!"], advanced: ["Bye, Bear!", "Bye, Bird!"] },
          listenWords: ["bye"],
          responses: { default: [{ en: "See you next time!", zh: "下次見！" }] },
          feedback: ["bloom", "waveBye"]
        }
      ],
      ending: {
        lines: [
          { en: "Look! The flowers!", zh: "你看！花都開了！" },
          { en: "Thank you, friends!", zh: "謝謝你們，朋友！" }
        ],
        zh: "森林的花都開了，小熊和小鳥都開心起來！彩虹又多了一道顏色，Chloe 和 Joey 一起找到新的彩虹碎片。",
        feedback: ["bloomAll", "birdHappy"],
        nextChoices: ["house", "shop"]
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
