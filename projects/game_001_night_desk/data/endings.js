window.NIGHT_DESK_ENDINGS = [
  {
    id: "true-ending",
    title: "真结局：不要给旅馆名字",
    description: "你撑到天亮，也没有让旅馆学会你的完整轮廓。早班员工推门时，前台系统自动删除了 309、404 和你的第二份账号。",
    conditions: [
      { stat: "correctCount", gte: 12 },
      { stat: "corruption", lte: 34 },
      { stat: "sanity", gte: 35 },
      { stat: "bossTrust", gte: 35 },
    ],
  },
  {
    id: "hotel-eats-you",
    title: "结局：旅馆吃掉你",
    description: "污染值太高。06:00 的钟声没有响起，所有房门同时打开。早班员工只找到一张新工牌，上面写着你的名字和房号。",
    conditions: [
      { stat: "corruption", gte: 75 },
    ],
  },
  {
    id: "fired",
    title: "结局：被开除",
    description: "钱太少，投诉太多。老板没有问你看见了什么，只让你交出工牌。你离开时，前台电话还在用你的声音接客。",
    match: "any",
    conditions: [
      { stat: "money", lte: 20 },
      { stat: "complaints", gte: 65 },
    ],
  },
  {
    id: "boss-ending",
    title: "结局：老板的好员工",
    description: "老板很满意你的入住率，甚至没有追究那些消失的客人。月底奖金到账时，备注栏写着：继续喂它。",
    conditions: [
      { stat: "bossTrust", gte: 82 },
      { stat: "corruption", gte: 45 },
    ],
  },
  {
    id: "escape",
    title: "结局：逃离结局",
    description: "你犯过错，也救下了一些人。天亮前最后十分钟，你关掉系统，从员工通道逃出去。身后有人用老板的声音喊你的名字。",
    conditions: [
      { stat: "correctCount", gte: 9 },
      { stat: "sanity", gte: 20 },
    ],
  },
  {
    id: "front-desk-empty",
    title: "结局：前台无人",
    description: "早班员工发现大堂灯仍亮着。值班椅是空的，登记本停在凌晨 03:33。最后一行字迹像你，又不完全像你。",
    conditions: [],
  },
];
