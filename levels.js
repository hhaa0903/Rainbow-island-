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
 *   roleplay    「換你當角色」模式用：孩子要說的 say（+ zh），角色回答 reply（+ replyZh），
 *               可加 speaker（由其他角色回答）、feedback、pick（回饋動畫用的選項）
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
          roleplay: { say: "What's your name?", zh: "你叫什麼名字？", reply: "I'm Bunny!", replyZh: "我是小兔子！" },
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
          roleplay: { say: "How are you?", zh: "你好嗎？", reply: "I'm happy!", replyZh: "我很開心！" },
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
          roleplay: { say: "Water or milk?", zh: "要水還是牛奶？", reply: "Milk, please!", replyZh: "請給我牛奶！", feedback: ["basket"], pick: "milk" },
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
          roleplay: { say: "This is for you!", zh: "這是給你的！", reply: "Thank you!", replyZh: "謝謝！" },
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
          roleplay: { say: "Hi! I'm {name}.", zh: "嗨！我是{name}。", reply: "Hi! I'm Bear!", replyZh: "嗨！我是小熊！" },
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
          roleplay: { say: "How are you?", zh: "你好嗎？", reply: "I'm tired.", replyZh: "我好累。" },
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
          roleplay: { say: "I like apples!", zh: "我喜歡蘋果！", reply: "Me too!", replyZh: "我也是！", feedback: ["shareApple"], pick: "yes" },
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
          roleplay: { say: "Hi, Bird! How are you?", zh: "嗨，小鳥！你好嗎？", reply: "I'm happy now!", replyZh: "我現在好開心！", speaker: "bird", feedback: ["birdHappy"] },
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
      status: "playable",
      scene: "house",
      name: "Cozy House",
      zh: "家庭小屋",
      theme: "尋求幫忙、找物品、日常互動",
      icon: "house",
      map: { x: 585, y: 205 },
      shardColor: "#F2D46B",
      unlock: { requires: ["dock"] },
      host: { id: "kitty", name: "Kitty", zh: "小貓", pitch: 1.3 },
      cast: { mouse: { id: "mouse", name: "Mouse", zh: "小老鼠", pitch: 1.8 } },
      intro: {
        zh: "小貓 Kitty 的家亂糟糟，帽子和球都不見了！一起找一找、收拾玩具，再吃一塊小餅乾。",
        parentNote: "一次一句"
      },
      preview: {
        zh: "小貓找不到牠的帽子了！一起在小屋裡東找找、西看看，幫忙把東西收拾好。",
        sample: ["Hi!（複習）", "Help, please!（新）", "Here it is!（新）"]
      },
      steps: [
        {
          id: "meetKitty",
          roleplay: { say: "What's your name?", zh: "你叫什麼名字？", reply: "I'm Kitty!", replyZh: "我是小貓！" },
          title: "認識小貓",
          coop: "each",
          pose: "wave",
          lines: [
            { en: "Hi! I'm Kitty.", zh: "嗨！我是小貓 Kitty。" },
            { en: "What's your name?", zh: "你叫什麼名字？" }
          ],
          repeatLines: [{ en: "Hi! What's your name?", zh: "嗨！那你叫什麼名字？" }],
          helper: { en: "{name}.", zh: "只說名字就可以。" },
          zhTip: "複習碼頭學過的自我介紹。",
          answers: { simple: ["{name}."], advanced: ["I'm {name}."] },
          responses: { default: [{ en: "Hi, {name}! Come in!", zh: "嗨，{name}！請進！" }] },
          feedback: ["hostWave"]
        },
        {
          id: "askMouse",
          title: "問新朋友名字（挑戰）",
          challengeOnly: true,
          coop: "alternate",
          pose: "idle",
          enter: ["show:mouse"],
          lines: [{ en: "Look! A new friend!", zh: "你看！有新朋友！" }],
          helper: { en: "What's your name?", zh: "你叫什麼名字？" },
          zhTip: "這次換孩子問：What's your name?（你叫什麼名字？）牆角的小老鼠會回答。",
          waitTip: "讓孩子試著問小老鼠的名字。需要時家長可以先小聲示範：What's your name?",
          answers: { simple: ["What's your name?"], advanced: ["Hi! What's your name?"] },
          listenWords: ["name", "what"],
          responses: {
            default: [
              { en: "I'm Mouse!", zh: "我是小老鼠！", speaker: "mouse" },
              { en: "Hi, friends!", zh: "嗨，朋友們！", speaker: "mouse" }
            ]
          },
          feedback: ["hostHappy"]
        },
        {
          id: "find",
          roleplay: { say: "Where is my hat?", zh: "我的帽子在哪裡？", reply: "Here it is!", replyZh: "在這裡！" },
          title: "找帽子和球",
          coop: "each",
          pose: "idle",
          lines: [
            { en: "Oh no!", zh: "糟糕！" },
            { en: "Where is my hat?", zh: "我的帽子在哪裡？" }
          ],
          repeatLines: [{ en: "Oh no! Where is my ball?", zh: "糟糕！我的球在哪裡？" }],
          helper: { en: "Here it is!", zh: "在這裡！" },
          zhTip: "新句子：Here it is!（在這裡！）。孩子可以先指一指想找的地方，再說 Here!",
          answers: { simple: ["Here!"], advanced: ["Here it is!"] },
          cues: [
            { id: "box", icon: "box", label: "box", keywords: ["box"] },
            { id: "bed", icon: "bed", label: "bed", keywords: ["bed"] },
            { id: "chair", icon: "chair", label: "chair", keywords: ["chair"] }
          ],
          responses: { default: [{ en: "Yay! Thank you!", zh: "耶！謝謝你！" }] },
          defaultCue: "box",
          finds: ["hat", "ball"],
          feedback: ["find"]
        },
        {
          id: "tidy",
          roleplay: { say: "Can you help me?", zh: "你可以幫我嗎？", reply: "Yes!", replyZh: "好！", feedback: ["hide:toysFloor", "show:toysBox", "hostHappy"] },
          title: "一起收玩具",
          coop: "together",
          pose: "wave",
          lines: [
            { en: "Toys, toys, toys!", zh: "好多玩具！" },
            { en: "Can you help me?", zh: "你可以幫我嗎？" }
          ],
          helper: { en: "Yes!", zh: "好！" },
          zhTip: "孩子回答 Yes 或 Okay 就可以，也可以一起做收玩具的動作。",
          answers: { simple: ["Yes!", "Okay!"], advanced: ["Yes, I can!"] },
          listenWords: ["yes", "okay", "ok"],
          responses: { default: [{ en: "Thank you! So clean!", zh: "謝謝！好乾淨！" }] },
          feedback: ["hide:toysFloor", "show:toysBox", "hostHappy"]
        },
        {
          id: "teddy",
          title: "請小貓幫忙（挑戰）",
          challengeOnly: true,
          coop: "alternate",
          pose: "listen",
          lines: [{ en: "Oh! Your teddy is up there.", zh: "喔！你的小熊玩偶在上面。" }],
          helper: { en: "Help, please!", zh: "請幫幫我！" },
          zhTip: "新句子：Help, please!（請幫幫我！）需要別人幫忙時可以這樣說。",
          waitTip: "玩偶放太高了，讓孩子試著請小貓幫忙。",
          answers: { simple: ["Help, please!"], advanced: ["Kitty, help, please!"] },
          listenWords: ["help", "please"],
          responses: { default: [{ en: "Okay! Here you go!", zh: "好！給你！" }] },
          feedback: ["hide:teddyTop", "giveToken:teddy"]
        },
        {
          id: "cookie",
          roleplay: { say: "Cookie?", zh: "要吃餅乾嗎？", reply: "Yes, please!", replyZh: "好，麻煩你！" },
          title: "吃小餅乾",
          coop: "each",
          pose: "cookie",
          lines: [{ en: "Cookie?", zh: "要吃餅乾嗎？" }],
          helper: { en: "Yes, please!", zh: "好，麻煩你！" },
          zhTip: "Yes, please! 和碼頭的 Water, please 很像。不想吃也可以說 No, thank you.",
          answers: { simple: ["Yes, please!", "No, thank you."], advanced: ["Yes, please! Thank you!"] },
          cues: [
            { id: "yes", icon: "cookie", label: "yes", keywords: ["yes", "please"] },
            { id: "no", icon: "nope", label: "no", keywords: ["no"] }
          ],
          responses: {
            yes: [{ en: "Here you go!", zh: "給你！" }],
            no: [{ en: "Okay!", zh: "好喔！" }],
            default: [{ en: "Here you go!", zh: "給你！" }]
          },
          defaultCue: "yes",
          feedback: ["giveToken:cookie"]
        },
        {
          id: "bye",
          title: "揮手道別（挑戰）",
          challengeOnly: true,
          coop: "together",
          pose: "wave",
          lines: [{ en: "Bye, {name}!", zh: "掰掰，{name}！" }],
          helper: { en: "Bye, Kitty!", zh: "掰掰，小貓！" },
          zhTip: "跟小貓揮手說再見。",
          answers: { simple: ["Bye!"], advanced: ["Bye, Kitty!", "Bye, Mouse!"] },
          responses: { default: [{ en: "Come again!", zh: "再來玩喔！" }] },
          feedback: ["waveBye"]
        }
      ],
      ending: {
        lines: [
          { en: "Yay! All clean!", zh: "耶！都整理好了！" },
          { en: "Thank you, friends!", zh: "謝謝你們，朋友！" }
        ],
        zh: "小貓的家整理好了，帽子和球也找到了！彩虹又多了一道顏色。",
        feedback: ["hostHappy"],
        nextChoices: ["shop", "station"]
      }
    },
    {
      id: "shop",
      week: 4,
      status: "playable",
      scene: "shop",
      name: "Picnic Shop",
      zh: "野餐商店",
      theme: "選飲料、提出需求、道謝",
      icon: "shop",
      map: { x: 760, y: 360 },
      shardColor: "#7FC08A",
      unlock: { requires: ["dock"] },
      host: { id: "squirrel", name: "Squirrel", zh: "松鼠", pitch: 1.35 },
      intro: {
        zh: "松鼠的野餐商店開張了！挑一挑野餐要帶的飲料和點心，把野餐籃裝滿，記得說 please 和 thank you。",
        parentNote: "一次一句"
      },
      preview: {
        zh: "松鼠的野餐商店開張了！挑一挑要帶的飲料和點心，記得說 please 和 thank you。",
        sample: ["Water, please.（複習）", "Juice, please.（新）", "Thank you!（複習）"]
      },
      steps: [
        {
          id: "excuse",
          title: "引起注意（挑戰）",
          challengeOnly: true,
          coop: "together",
          pose: "idle",
          enter: ["busy"],
          lines: [{ en: "La la la...", zh: "啦啦啦⋯⋯（松鼠在忙，沒看到你們）" }],
          helper: { en: "Excuse me!", zh: "不好意思！" },
          zhTip: "新句子：Excuse me!（不好意思！）想請別人注意自己時可以說。",
          waitTip: "松鼠在哼歌沒注意到。讓孩子試著說 Excuse me! 叫牠。",
          answers: { simple: ["Excuse me!"], advanced: ["Excuse me! Hi!"] },
          listenWords: ["excuse", "me"],
          responses: { default: [{ en: "Oh! Hi! Sorry!", zh: "喔！嗨！不好意思！" }] },
          feedback: ["attention"]
        },
        {
          id: "welcome",
          roleplay: { say: "Hi! Welcome!", zh: "嗨！歡迎光臨！", reply: "Hi!", replyZh: "嗨！" },
          title: "歡迎光臨",
          coop: "each",
          pose: "wave",
          lines: [{ en: "Hi! Welcome!", zh: "嗨！歡迎光臨！" }],
          helper: { en: "Hi!", zh: "嗨！" },
          zhTip: "打招呼就好。想多說可以加上：I'm Chloe.",
          answers: { simple: ["Hi!"], advanced: ["Hi! I'm {name}."] },
          responses: { default: [{ en: "Hi, {name}!", zh: "嗨，{name}！" }] },
          feedback: ["hostWave"]
        },
        {
          id: "drink",
          roleplay: { say: "Water, milk, or juice?", zh: "要水、牛奶，還是果汁？", reply: "Juice, please!", replyZh: "請給我果汁！" },
          title: "選飲料",
          coop: "each",
          pose: "idle",
          lines: [{ en: "Water, milk, or juice?", zh: "要水、牛奶，還是果汁？" }],
          helper: { en: "Water? Milk? Juice?", zh: "水？牛奶？果汁？" },
          zhTip: "新單字：juice（果汁）。加上 please 更有禮貌：Juice, please.",
          answers: {
            simple: ["Water.", "Milk.", "Juice."],
            advanced: ["Water, please.", "Milk, please.", "Juice, please."]
          },
          cues: [
            { id: "water", icon: "water", label: "water", keywords: ["water"] },
            { id: "milk", icon: "milk", label: "milk", keywords: ["milk"] },
            { id: "juice", icon: "juice", label: "juice", keywords: ["juice"] }
          ],
          responses: { default: [{ en: "Here you go!", zh: "給你！" }] },
          defaultCue: "juice",
          feedback: ["giveToken"]
        },
        {
          id: "count",
          title: "要幾個蘋果（挑戰）",
          challengeOnly: true,
          coop: "alternate",
          pose: "apple",
          lines: [{ en: "Apples! How many?", zh: "蘋果！要幾個？" }],
          helper: { en: "Two, please!", zh: "請給我兩個！" },
          zhTip: "新句子：How many?（幾個？）。孩子說數字或比手指都可以。",
          answers: {
            simple: ["One.", "Two.", "Three."],
            advanced: ["One, please.", "Two, please.", "Three, please."]
          },
          cues: [
            { id: "n1", icon: "n1", label: "one", keywords: ["one", "1"] },
            { id: "n2", icon: "n2", label: "two", keywords: ["two", "2", "too"] },
            { id: "n3", icon: "n3", label: "three", keywords: ["three", "3"] }
          ],
          responses: { default: [{ en: "Okay! Here you go!", zh: "好！給你！" }] },
          defaultCue: "n2",
          feedback: ["giveToken"]
        },
        {
          id: "snack",
          roleplay: { say: "Cookie or banana?", zh: "要餅乾還是香蕉？", reply: "Banana, please!", replyZh: "請給我香蕉！" },
          title: "選點心",
          coop: "each",
          pose: "idle",
          lines: [{ en: "Cookie or banana?", zh: "要餅乾還是香蕉？" }],
          helper: { en: "Cookie? Banana?", zh: "餅乾？香蕉？" },
          zhTip: "新單字：banana（香蕉）。說一個字或指一指都可以。",
          answers: { simple: ["Cookie.", "Banana."], advanced: ["Cookie, please.", "Banana, please."] },
          cues: [
            { id: "cookie", icon: "cookie", label: "cookie", keywords: ["cookie"] },
            { id: "banana", icon: "banana", label: "banana", keywords: ["banana"] }
          ],
          responses: { default: [{ en: "Yum! Here you go!", zh: "好吃喔！給你！" }] },
          defaultCue: "cookie",
          feedback: ["giveToken"]
        },
        {
          id: "thanks",
          roleplay: { say: "Here you go!", zh: "給你！", reply: "Thank you!", replyZh: "謝謝！" },
          title: "拿野餐籃、道謝",
          coop: "together",
          pose: "basket",
          lines: [{ en: "Your picnic basket!", zh: "你們的野餐籃！" }],
          helper: { en: "Thank you!", zh: "謝謝！" },
          helperOnRequest: true,
          zhTip: "松鼠把裝好的野餐籃遞過來。留一點時間讓孩子自然地說謝謝。",
          waitTip: "留一點時間，讓孩子自然地說。先等約 5～10 秒，再提供提示。",
          answers: { simple: ["Thank you!"], advanced: ["Thank you, Squirrel!"] },
          listenWords: ["thank"],
          responses: { default: [{ en: "You're welcome!", zh: "不客氣！" }] },
          feedback: ["hostWave", "glowTokens"]
        },
        {
          id: "bye",
          title: "揮手道別（挑戰）",
          challengeOnly: true,
          coop: "together",
          pose: "wave",
          lines: [{ en: "Bye, {name}!", zh: "掰掰，{name}！" }],
          helper: { en: "Bye, Squirrel!", zh: "掰掰，松鼠！" },
          zhTip: "跟松鼠揮手說再見。",
          answers: { simple: ["Bye!"], advanced: ["Bye, Squirrel!"] },
          responses: { default: [{ en: "Have a nice picnic!", zh: "野餐愉快！" }] },
          feedback: ["waveBye"]
        }
      ],
      ending: {
        lines: [{ en: "Let's go on a picnic!", zh: "我們去野餐吧！" }],
        zh: "野餐籃裝滿了！彩虹又多了一道顏色。",
        feedback: ["hostHappy"],
        nextChoices: ["station", "house"]
      }
    },
    {
      id: "station",
      week: 5,
      status: "playable",
      scene: "station",
      name: "Travel Station",
      zh: "旅行車站",
      theme: "買票、出發、簡單旅行需求",
      icon: "station",
      map: { x: 540, y: 500 },
      shardColor: "#72B5D8",
      unlock: { requires: ["dock"] },
      host: { id: "elephant", name: "Ellie", zh: "小象站長 Ellie", pitch: 0.75 },
      intro: {
        zh: "彩虹列車要出發了！小象站長 Ellie 在車站等大家。說說名字、拿一張車票，最後一起喊 Let's go!",
        parentNote: "一次一句"
      },
      preview: {
        zh: "小象站長在車站等大家。買一張票，跳上彩虹列車，準備出發去旅行！",
        sample: ["One ticket, please.（新）", "Let's go!（新）", "Bye!（複習）"]
      },
      steps: [
        {
          id: "hello",
          roleplay: { say: "What's your name?", zh: "你叫什麼名字？", reply: "I'm Ellie!", replyZh: "我是 Ellie！" },
          title: "認識站長",
          coop: "each",
          pose: "wave",
          lines: [
            { en: "Hello! I'm Ellie.", zh: "哈囉！我是站長 Ellie。" },
            { en: "What's your name?", zh: "你叫什麼名字？" }
          ],
          repeatLines: [{ en: "And what's your name?", zh: "那你叫什麼名字？" }],
          helper: { en: "{name}.", zh: "只說名字就可以。" },
          zhTip: "複習自我介紹。Hello 和 Hi 意思一樣。",
          answers: { simple: ["{name}."], advanced: ["I'm {name}."] },
          responses: { default: [{ en: "Hi, {name}!", zh: "嗨，{name}！" }] },
          feedback: ["hostWave"]
        },
        {
          id: "age",
          title: "幾歲了（挑戰）",
          challengeOnly: true,
          coop: "each",
          pose: "idle",
          lines: [{ en: "How old are you?", zh: "你幾歲？" }],
          helper: { en: "I'm {age}.", zh: "我 {age} 歲。" },
          zhTip: "複習碼頭的年紀問答。說數字或比手指都可以。",
          answers: { simple: ["{Age}."], advanced: ["I'm {age}."] },
          listenWords: ["eight", "six", "8", "6"],
          responses: { default: [{ en: "{Age}! Okay!", zh: "{age} 歲！好！" }] },
          feedback: ["hopHost"]
        },
        {
          id: "ticket",
          roleplay: { say: "Ticket?", zh: "要車票嗎？", reply: "One ticket, please!", replyZh: "請給我一張票！" },
          title: "拿車票",
          coop: "each",
          pose: "ticket",
          lines: [{ en: "Ticket?", zh: "要車票嗎？" }],
          helper: { en: "One ticket, please.", zh: "請給我一張票。" },
          zhTip: "新句子：One ticket, please.（請給我一張票）。只說 Yes, please 也可以。",
          answers: { simple: ["Yes, please!", "Ticket, please."], advanced: ["One ticket, please."] },
          listenWords: ["ticket", "please", "yes"],
          responses: { default: [{ en: "Here you go!", zh: "給你！" }] },
          feedback: ["giveToken:ticket"]
        },
        {
          id: "where",
          title: "要去哪裡（挑戰）",
          challengeOnly: true,
          coop: "alternate",
          pose: "idle",
          lines: [{ en: "Where to?", zh: "要去哪裡？" }],
          helper: { en: "Beach? Mountain? Zoo?", zh: "海邊？山上？動物園？" },
          zhTip: "想去哪裡都可以，說地名或指一指圖片。火車的牌子會換成那個地方。",
          answers: {
            simple: ["Beach!", "Mountain!", "Zoo!"],
            advanced: ["The beach, please.", "The mountain, please.", "The zoo, please."]
          },
          cues: [
            { id: "beach", icon: "beach", label: "beach", keywords: ["beach", "sea"] },
            { id: "mountain", icon: "mountain", label: "mountain", keywords: ["mountain"] },
            { id: "zoo", icon: "zoo", label: "zoo", keywords: ["zoo"] }
          ],
          responses: {
            beach: [{ en: "The beach! Fun!", zh: "海邊！好好玩！" }],
            mountain: [{ en: "The mountain! Wow!", zh: "山上！哇！" }],
            zoo: [{ en: "The zoo! Cool!", zh: "動物園！好酷！" }],
            default: [{ en: "Okay! Let's see!", zh: "好！我們看看！" }]
          },
          defaultCue: "beach",
          feedback: ["trainSign"]
        },
        {
          id: "mood",
          roleplay: { say: "How are you today?", zh: "你今天好嗎？", reply: "I'm happy!", replyZh: "我很開心！" },
          title: "出發前的心情",
          coop: "each",
          pose: "idle",
          lines: [{ en: "How are you today?", zh: "你今天好嗎？" }],
          helper: { en: "Happy? Sleepy? Tired?", zh: "開心？想睡？累？" },
          zhTip: "複習前幾關的心情句子。每一種心情都可以，孩子的表情會出現在火車窗戶上。",
          answers: {
            simple: ["Happy.", "Sleepy.", "Tired."],
            advanced: ["I'm happy.", "I'm sleepy.", "I'm tired."]
          },
          cues: [
            { id: "happy", icon: "happy", label: "happy", keywords: ["happy", "good", "great"] },
            { id: "sleepy", icon: "sleepy", label: "sleepy", keywords: ["sleepy", "sleep"] },
            { id: "tired", icon: "tired", label: "tired", keywords: ["tired"] }
          ],
          responses: {
            happy: [{ en: "Great! Let's go!", zh: "太好了！出發吧！" }],
            sleepy: [{ en: "You can sleep on the train.", zh: "你可以在火車上睡一下。" }],
            tired: [{ en: "Sit down and rest.", zh: "坐下來休息一下。" }],
            default: [{ en: "Thank you for telling me.", zh: "謝謝你告訴我。" }]
          },
          feedback: ["windowFace"]
        },
        {
          id: "go",
          roleplay: { say: "All aboard!", zh: "大家上車囉！", reply: "Let's go!", replyZh: "出發吧！", feedback: ["trainGo"] },
          title: "一起出發",
          coop: "together",
          pose: "wave",
          lines: [
            { en: "All aboard!", zh: "大家上車囉！" },
            { en: "Ready?", zh: "準備好了嗎？" }
          ],
          helper: { en: "Let's go!", zh: "出發吧！" },
          zhTip: "新句子：Let's go!（出發吧！）大家一起大聲說！",
          answers: { simple: ["Let's go!", "Yes!"], advanced: ["Yes! Let's go!"] },
          listenWords: ["go", "yes"],
          responses: { default: [{ en: "Choo choo! Here we go!", zh: "嘟嘟！出發囉！" }] },
          feedback: ["trainGo"]
        },
        {
          id: "bye",
          title: "揮手道別（挑戰）",
          challengeOnly: true,
          coop: "together",
          pose: "wave",
          lines: [{ en: "Bye, {name}!", zh: "掰掰，{name}！" }],
          helper: { en: "Bye, Ellie!", zh: "掰掰，Ellie！" },
          zhTip: "火車開動了，跟站長揮手說再見。",
          answers: { simple: ["Bye!"], advanced: ["Bye, Ellie!"] },
          responses: { default: [{ en: "Have a nice trip!", zh: "旅途愉快！" }] },
          feedback: ["waveBye"]
        }
      ],
      ending: {
        lines: [{ en: "Look! The rainbow!", zh: "你看！彩虹！" }],
        zh: "彩虹列車出發了！彩虹又多了一道顏色。",
        feedback: ["trainAway"],
        nextChoices: ["forest", "house"]
      }
    }
  ]
};
