# 05 itch.io Publish Plan

## 暂定标题

`Night Desk / 旅馆前台：请勿让他们入住`

## Tagline

预订信息可以伪造，但镜子不会说谎。

## 页面文案草案

你接下了一份旅馆夜班前台的临时工作。

核对预订。检查钥匙。看一眼镜子。

只要照着值班规则做，你应该能平安等到天亮。

## 候选标签

- `Horror`
- `Short`
- `Atmospheric`
- `Point & Click`
- `Interactive Fiction`
- `HTML5`
- `Indie`

## 展示物料需求

- 封面：夜班前台、钥匙墙和镜面异常。
- 截图：规则便签、普通旅客资料、异常旅客资料、结局报告。
- GIF：第三位旅客出现后，玩家犹豫并按下拒绝入住的 5-8 秒片段。

## 打包约定

正式发布时，将可直接运行的 HTML5 文件打包为：

```text
releases/game_001_night_desk_v0.1.0_itch.zip
```

zip 内部只包含：

```text
index.html
style.css
main.js
data/
assets/
```

## 发布前检查

- itch.io 项目类型选择 HTML。
- 勾选浏览器运行。
- 验证 iframe 中的桌面端和移动端布局。
- 确认 zip 内没有设计文档、临时文件或仓库级目录。
