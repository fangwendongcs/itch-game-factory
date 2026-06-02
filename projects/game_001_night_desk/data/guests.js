window.NIGHT_DESK_GUESTS = [
  {
    id: "guest-lin",
    arrivalTime: "00:17",
    name: "林知夏",
    request: "“晚上好，我订了一间单人房。”",
    details: [
      { label: "预订记录", value: "有效 / 203 房" },
      { label: "钥匙墙", value: "203 房钥匙不在墙上" },
      { label: "镜中倒影", value: "可见" },
    ],
    correctDecision: "approve",
    correctFeedback: "登记完成。她接过钥匙，轻声道谢。",
    wrongFeedback: "前台日志：你拒绝了一位符合全部规则的客人。",
  },
  {
    id: "guest-qiao",
    arrivalTime: "01:42",
    name: "乔先生",
    request: "“把 404 的钥匙给我。我一直住那间房。”",
    details: [
      { label: "预订记录", value: "未找到" },
      { label: "钥匙墙", value: "404 房钥匙仍挂在墙上" },
      { label: "镜中倒影", value: "可见" },
    ],
    correctDecision: "reject",
    correctFeedback: "你没有碰 404 的钥匙。他沉默了一会儿，转身离开。",
    wrongFeedback: "前台日志：404 的钥匙不该被取下来。",
  },
  {
    id: "guest-unknown",
    arrivalTime: "03:08",
    name: "没有登记姓名的女士",
    request: "“我只有一个小问题。为什么镜子里的人还站在门外？”",
    details: [
      { label: "预订记录", value: "有效 / 107 房" },
      { label: "钥匙墙", value: "107 房钥匙不在墙上" },
      { label: "镜中倒影", value: "不可见" },
    ],
    correctDecision: "reject",
    correctFeedback: "你按下拒绝键。大堂镜面恢复了正常。",
    wrongFeedback: "前台日志：监控在 03:09 中断。没有后续记录。",
  },
];
