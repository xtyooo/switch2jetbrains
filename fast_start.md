# 快速开始指南

欢迎使用 **Switch2JetBrains**！本指南将帮助你快速上手。

## 🎯 第一步：安装依赖

打开终端，进入项目目录，运行：

```bash
npm install
```

如果你的系统没有安装 Node.js，请先安装：
- **macOS**: `brew install node`
- **Windows/Linux**: 访问 https://nodejs.org/ 下载安装

## 🔨 第二步：编译项目

```bash
npm run compile
```

## 🧪 第三步：测试插件

在 VS Code 中：

1. 按 `F5` 启动调试
2. 在弹出的新窗口中打开一个项目
3. 按 `Option+Shift+O` (Windows: `Alt+Shift+O`) 测试打开文件功能

## ⚙️ 配置 IDE 路径

### 自动检测（推荐）

插件会自动检测已安装的 JetBrains IDE，首次使用时会提示选择。

### 手动配置

1. 打开 VS Code 设置（`Cmd+,` 或 `Ctrl+,`）
2. 搜索 `switch2jetbrains`
3. 点击 "Edit in settings.json"
4. 添加配置：

```json
{
  "switch2jetbrains.ides": [
    {
      "name": "IntelliJ IDEA",
      "path": "/Applications/IntelliJ IDEA.app/Contents/MacOS/idea"
    },
    {
      "name": "GoLand",
      "path": "/Applications/GoLand.app/Contents/MacOS/goland"
    }
  ]
}
```

**Windows 路径示例:**
```json
{
  "name": "IntelliJ IDEA",
  "path": "C:\\Program Files\\JetBrains\\IntelliJ IDEA 2023.2\\bin\\idea64.exe"
}
```

## 🎹 快捷键

| 功能 | macOS | Windows/Linux |
|------|-------|---------------|
| 打开当前文件 | `Option+Shift+O` | `Alt+Shift+O` |
| 打开项目 | `Option+Shift+P` | `Alt+Shift+P` |

## 📖 其他使用方式

### 1. 命令面板

- `Cmd+Shift+P` (Windows: `Ctrl+Shift+P`)
- 输入 "Switch2JetBrains"
- 选择对应命令

### 2. 右键菜单

- 在编辑器中右键 → "在 JetBrains IDE 中打开当前文件"
- 在项目资源管理器中右键 → "在 JetBrains IDE 中打开项目"

## 🔧 常见问题

### 找不到 IDE？

确保：
1. IDE 已正确安装
2. 配置中的路径正确
3. 启用了自动检测功能

### 快捷键不工作？

1. 检查是否与其他插件冲突
2. 在设置中自定义快捷键

### Linux 窗口不激活？

安装窗口管理工具：
```bash
sudo apt-get install wmctrl
```

## 🚀 开始使用

现在你可以开始使用 Switch2JetBrains 了！

1. 在 Cursor/VS Code 中打开一个文件
2. 按 `Option+Shift+O` (或 `Alt+Shift+O`)
3. 选择目标 IDE
4. 享受无缝切换体验！

## 📚 更多资源

- [完整文档](./README_zh.md)
- [安装指南](./INSTALL.md)
- [贡献指南](./CONTRIBUTING.md)
- [更新日志](./CHANGELOG.md)

---

**祝使用愉快！** 🎉

如有问题，请访问 GitHub Issues 提问。
