# itch-game-factory 项目上下文

## 正式工作目录

小游戏工厂唯一正式工作目录：

```text
/Users/fangwendong/02project/project/05批量小游戏开发/game-factory/itch-game-factory
```

GitHub 仓库：

```text
fangwendongcs/itch-game-factory
```

旧的 `my-game-factory` 文件夹已经废弃或删除。后续小游戏工厂相关开发、文档、模板和项目文件，只能在当前 `itch-game-factory` 仓库中创建或修改。不要再引用、创建或修改旧目录。

## 项目定位

这是一个面向 itch.io 的 HTML5 小游戏流水线项目，用于批量生产低成本、短时长、可直接在浏览器游玩的小游戏。

项目优先追求：

- 小范围、可快速完成的 MVP。
- 可复用的生产流程和玩法模板。
- 每个游戏独立开发、测试和发布。
- 无复杂构建工具的 HTML、CSS、Vanilla JavaScript 实现。
- 适合 itch.io `Play in browser` 的发布包。

## 核心目录职责

### `skills/`

长期复用的方法论文件，不属于任何单个游戏。

- `01game-idea.md`：游戏创意、Hook、itch 爆点。
- `02game-prd.md`：MVP 范围、功能清单、不做清单。
- `03game-build.md`：项目结构、技术方案、阶段开发提示词。
- `04game-test.md`：QA、边界测试、屏幕适配、报错排查。
- `05game-publish.md`：itch.io 页面文案、标签、展示物料和发行策略。

开发具体游戏时可以读取这些文件，但不要把某个游戏的剧情、数据或临时记录写回 `skills/`。

### `templates/`

可复用游戏模板库，不是具体游戏开发区。

模板保存某一类玩法的通用代码骨架和通用数据结构，例如：

- `rule_judgement_template`：规则判断类小游戏模板。
- `horror_chat_template`：聊天窗口恐怖游戏模板。
- `clicker_template`：点击或增量游戏模板。

模板应保持题材无关，不能写死某个具体游戏的标题、剧情、角色名或结局。

### `projects/`

具体游戏开发区。每个真正需要开发、测试和上传 itch.io 的游戏，都在这里拥有独立文件夹。

当前正式项目：

```text
projects/game_001_night_desk/
```

后续日常游戏开发应优先修改 `projects/` 中对应游戏的文件。

### `releases/`

最终发布包存放区，只保存准备上传 itch.io 的 zip 成品包，不用于日常开发。

Git 仓库只保留：

```text
releases/.gitkeep
```

不要提交大型 zip 成品包、临时素材或大视频文件。

## 当前第一个游戏

### `game_001_night_desk`

- 英文名：`Night Desk`
- 中文名：`旅馆前台：请勿让他们入住`
- 类型：规则判断、恐怖打工模拟、多结局互动小游戏
- 平台：HTML5、itch.io、`Play in browser`
- 目标时长：10-15 分钟
- 技术栈：HTML、CSS、Vanilla JavaScript

玩家扮演小旅馆夜班前台，根据逐渐矛盾的规则判断客人是否可以入住，并在赚钱、投诉、污染、理智和老板信任之间做取舍。

详细游戏上下文见：

```text
projects/game_001_night_desk/docs/00_CONTEXT.md
```

## 后续 Codex 工作原则

1. 所有小游戏工厂相关工作只在当前正式仓库中进行。
2. 先检查 `git status` 和现有文件，再开始修改。
3. 不修改 `skills/` 下已有方法论文件，除非用户明确要求。
4. 通用玩法能力沉淀到 `templates/`，具体剧情和数据只写入对应 `projects/` 子目录。
5. 日常开发不把文件写入 `releases/`；发布时再生成 zip 包。
6. 不提交大型 zip、临时素材、大视频文件或密钥。
7. 保持 HTML5 项目轻量，不引入大型引擎、复杂构建工具或不必要依赖。
8. 优先做小步、可验证、可回滚的修改。
9. 每次完成后报告修改文件和验证结果。
10. 未经用户明确要求，不执行 `commit` 或 `push`。
