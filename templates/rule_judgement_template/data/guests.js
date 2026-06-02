window.RULE_JUDGEMENT_GUESTS = [
  {
    id: "subject-a",
    name: "访客 A",
    details: [
      { label: "通行凭证", value: "有效" },
      { label: "携带物品", value: "无" },
    ],
    correctDecision: "approve",
    correctFeedback: "判断正确。",
    wrongFeedback: "判断错误：该访客符合全部规则。",
  },
  {
    id: "subject-b",
    name: "访客 B",
    details: [
      { label: "通行凭证", value: "已过期" },
      { label: "携带物品", value: "无" },
    ],
    correctDecision: "reject",
    correctFeedback: "判断正确。",
    wrongFeedback: "判断错误：该访客的通行凭证无效。",
  },
];
