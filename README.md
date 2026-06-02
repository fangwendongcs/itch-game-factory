# My Game Factory

一个面向 itch.io 的 HTML5 小游戏工厂。仓库用于沉淀可复用生产流程、小游戏模板和每个真实游戏项目，方便持续批量开发、测试与发布短篇 Web 游戏。

## 目录职责

```text
my-game-factory/
├── skills/
├── templates/
├── projects/
└── releases/
```

### `skills/`

长期复用的游戏生产流程文档，包括创意、PRD、开发、测试和发布方法论。

这里不是单个游戏的项目文档目录。开发具体游戏时应读取并参考这些文档，但不要把某个游戏的剧情、数据或临时记录写回 `skills/`。

### `templates/`

可复用的小游戏模板库。每个模板代表一种通用玩法骨架，例如规则判断、恐怖聊天或点击增量玩法。

模板应保持题材无关。创建新游戏时，可以复制合适的模板到 `projects/`，再在新项目中加入具体标题、剧情、角色和美术素材。

### `projects/`

具体游戏开发区。每一个真正要开发、测试和发布的游戏，都拥有独立文件夹。

当前项目：

- `projects/game_001_night_desk/`：`Night Desk / 旅馆前台：请勿让他们入住`

后续日常开发主要发生在对应的项目目录中。

### `releases/`

最终 itch.io 上传包存放区。这里仅用于存放已经打包完成、准备上传的 zip 成品，不用于日常开发。

发布 zip 不提交到 Git 仓库。目录通过 `.gitkeep` 保留。

## 本地预览

仓库中的小游戏均为可直接运行的 HTML5 项目。可在根目录启动静态服务器：

```bash
python3 -m http.server 8000
```

然后在浏览器中访问对应项目，例如：

```text
http://localhost:8000/projects/game_001_night_desk/
```

## 发布约定

准备发布时，只将具体游戏运行所需文件打包到 `releases/`，例如：

```text
releases/game_001_night_desk_v0.1.0_itch.zip
```

zip 内部应包含可直接运行的 HTML5 文件，例如 `index.html`、`style.css`、`main.js`、`data/` 和 `assets/`，不应包含仓库级文档、模板或临时素材。
