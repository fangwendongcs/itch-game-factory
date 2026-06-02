# 03 Build Plan

## 技术栈

- HTML5
- CSS
- Vanilla JavaScript
- 无构建步骤
- 无外部依赖

## 当前文件结构

```text
game_001_night_desk/
├── index.html
├── style.css
├── main.js
├── data/
│   ├── guests.js
│   ├── rules.js
│   └── endings.js
├── assets/
│   ├── audio/
│   ├── images/
│   └── ui/
└── docs/
```

## Milestone 1：骨架与最小循环

- 完成规则、旅客、结局数据拆分。
- 完成开始、判断、反馈、结束和重玩。
- 使用三位测试旅客验证流程。

状态：已完成。

## Milestone 2：正式内容数据

- 扩充到 10-14 位旅客。
- 调整规则出现顺序和学习曲线。
- 为错误选择增加更有辨识度的结果。

## Milestone 3：氛围表现

- 加入四类最小音效。
- 添加旅客剪影或照片。
- 加入克制的故障反馈，不影响阅读。

## Milestone 4：发布准备

- 完整手工回归测试。
- 制作封面、截图和短 GIF。
- 打包 HTML5 zip 到根目录 `releases/`。
