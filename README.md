# Switch2JetBrains

[English](./README.md) | [中文](./README_zh.md)

> 💡 Recommended to use with [Switch2Cursor](https://github.com/qczone/switch2cursor) in JetBrains IDE

[![Visual Studio Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🔍 Introduction

A VS Code/Cursor extension that enables seamless switching from Cursor/VS Code to JetBrains IDE family (IntelliJ IDEA, GoLand, PyCharm, etc.) with automatic cursor position synchronization.

![Switch2JetBrains Demo](./images/demo.gif)

## 🌟 Features

* 🚀 **Seamless Editor Switching**
  * One-click switch from Cursor/VS Code to JetBrains IDE
  * Automatically positions to the same cursor location (line and column)
  * Perfectly maintains editing context without interrupting workflow

* ⌨️ **Convenient Shortcut Support**
  * macOS:
    * `Option+Shift+P` - Open project in JetBrains IDE
    * `Option+Shift+O` - Open current file in JetBrains IDE
  * Windows/Linux:
    * `Alt+Shift+P` - Open project in JetBrains IDE
    * `Alt+Shift+O` - Open current file in JetBrains IDE

* 🔧 **Multiple Access Methods**
  * Keyboard shortcuts
  * Editor context menu
  * Command palette

* 🎯 **Auto-detect IDEs**
  * Automatically detect installed JetBrains IDEs
  * Support custom IDE paths
  * Support default IDE setting

## 🛠️ Installation

### Method 1: Install from VS Code Marketplace

1. Open VS Code/Cursor → `Extensions` → Search for `switch2jetbrains`
2. Click `Install`
3. Reload window

### 方法 2: 本地安装

1. 从 [Releases](https://github.com/yourusername/switch2jetbrains/releases) 下载最新的 `.vsix` 文件
2. VS Code → `扩展` → `...` → `从 VSIX 安装...`
3. 选择下载的文件

## 🚀 使用指南

### 基础使用

#### 打开项目

* **快捷键:**
  * macOS: `Option+Shift+P`
  * Windows/Linux: `Alt+Shift+P`
* **右键菜单:** 右键点击项目 → `在 JetBrains IDE 中打开项目`
* **命令面板:** `Ctrl+Shift+P` → 输入 `Switch2JetBrains: 在 JetBrains IDE 中打开项目`

#### 打开当前文件

* **快捷键:**
  * macOS: `Option+Shift+O`
  * Windows/Linux: `Alt+Shift+O`
* **右键菜单:** 在编辑器中右键 → `在 JetBrains IDE 中打开当前文件`
* **命令面板:** `Ctrl+Shift+P` → 输入 `Switch2JetBrains: 在 JetBrains IDE 中打开当前文件`

### 配置

在 `设置` → 搜索 `Switch2JetBrains`:

* **自动检测 IDE** (`switch2jetbrains.autoDetect`): 自动检测已安装的 JetBrains IDE（默认启用）
* **默认 IDE** (`switch2jetbrains.defaultIDE`): 设置默认使用的 IDE，留空则每次询问
* **IDE 列表** (`switch2jetbrains.ides`): 手动配置 IDE 列表

#### 手动配置 IDE 示例

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
  ],
  "switch2jetbrains.defaultIDE": "IntelliJ IDEA"
}
```

### 支持的 IDE

* IntelliJ IDEA
* GoLand
* PyCharm
* WebStorm
* PhpStorm
* RustRover
* CLion
* Android Studio
* DataGrip
* 及其他 JetBrains IDE

## 🔄 与 Switch2Cursor 配合使用

推荐与 [Switch2Cursor](https://github.com/qczone/switch2cursor) 插件配合使用，实现双向无缝切换：

* **Switch2Cursor**: JetBrains IDE → Cursor/VS Code
* **Switch2JetBrains**: Cursor/VS Code → JetBrains IDE

## 🧑‍💻 开发指南

### 构建项目

```bash
# 克隆仓库
git clone https://github.com/yourusername/switch2jetbrains.git
cd switch2jetbrains

# 安装依赖
npm install

# 编译
npm run compile

# 打包
npm run package
```

### 调试

1. 在 VS Code 中打开项目
2. 按 `F5` 启动调试
3. 在新窗口中测试插件

### 贡献

欢迎提交 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 🙋 常见问题

### 1. 安装后快捷键/菜单点击没有反应？

检查设置中是否正确配置了 IDE 路径，或启用自动检测功能。

### 2. Linux 上窗口无法自动激活？

需要安装 `wmctrl` 或 `xdotool`:

```bash
# Ubuntu/Debian
sudo apt-get install wmctrl

# 或者
sudo apt-get install xdotool
```

### 3. 如何修改快捷键？

在 `设置` → `键盘快捷方式` → 搜索 `switch2jetbrains` 进行修改。

### 4. 支持哪些平台？

* macOS
* Windows
* Linux

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 📮 反馈

如遇到问题或有建议，请通过以下方式反馈：

* 提交 [GitHub Issue](https://github.com/yourusername/switch2jetbrains/issues)

## 🌟 Star History

如果这个项目对你有帮助，请给个 Star ⭐️

---

**享受流畅的编辑器切换体验！** 🚀
