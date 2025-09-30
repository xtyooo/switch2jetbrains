# Switch2JetBrains

[English](./README.md) | [中文](./README_zh.md)

> 💡 推荐与 JetBrains IDE 中的 [Switch2Cursor](https://github.com/qczone/switch2cursor) 插件配合使用

[![Visual Studio Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com/)
[![许可证: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🔍 简介

一个强大的 VS Code/Cursor 扩展，让你能够从 Cursor/VS Code 无缝切换到 JetBrains 系列 IDE（IntelliJ IDEA、GoLand、PyCharm 等），并自动同步光标位置，提升跨编辑器开发效率。

![Switch2JetBrains 演示](./images/demo.gif)

## 🌟 核心功能

* 🚀 **无缝编辑器切换**
  * 一键从 Cursor/VS Code 切换到 JetBrains IDE
  * 自动定位到相同的光标位置（行号、列号）
  * 完美保持编辑上下文，不中断工作流

* ⌨️ **便捷的快捷键支持**
  * macOS:
    * `Option+Shift+P` - 在 JetBrains IDE 中打开项目
    * `Option+Shift+O` - 在 JetBrains IDE 中打开当前文件
  * Windows/Linux:
    * `Alt+Shift+P` - 在 JetBrains IDE 中打开项目
    * `Alt+Shift+O` - 在 JetBrains IDE 中打开当前文件

* 🔧 **多种访问方式**
  * 快捷键
  * 编辑器右键菜单
  * 命令面板

* 🎯 **自动检测 IDE**
  * 自动检测已安装的 JetBrains IDE
  * 支持自定义 IDE 路径
  * 支持设置默认 IDE

## 🛠️ 安装指南

### 方法 1: 从 VS Code Marketplace 安装

1. 打开 VS Code/Cursor → `扩展` → 搜索 `switch2jetbrains`
2. 点击 `安装`
3. 重新加载窗口

### 方法 2: 本地安装

1. 从 [GitHub Releases](https://github.com/xtyooo/switch2jetbrains/releases) 下载最新的 `.vsix` 文件
2. VS Code/Cursor → `扩展` → `...` → `从 VSIX 安装...`
3. 选择下载的 `.vsix` 文件
4. 重新加载窗口

## 🚀 使用指南

### 基础使用

#### 打开项目

* **快捷键:**
  * macOS: `Option+Shift+P`
  * Windows/Linux: `Alt+Shift+P`
* **右键菜单:** 右键点击项目 → `在 JetBrains IDE 中打开项目`
* **命令面板:** `Ctrl+Shift+P` (macOS: `Cmd+Shift+P`) → 输入 `Switch2JetBrains: 在 JetBrains IDE 中打开项目`

#### 打开当前文件

* **快捷键:**
  * macOS: `Option+Shift+O`
  * Windows/Linux: `Alt+Shift+O`
* **右键菜单:** 在编辑器中右键 → `在 JetBrains IDE 中打开当前文件`
* **命令面板:** `Ctrl+Shift+P` (macOS: `Cmd+Shift+P`) → 输入 `Switch2JetBrains: 在 JetBrains IDE 中打开当前文件`

### 配置

在 `设置` (`Preferences`) → 搜索 `Switch2JetBrains`:

* **自动检测 IDE** (`switch2jetbrains.autoDetect`): 自动检测已安装的 JetBrains IDE（默认启用）
* **默认 IDE** (`switch2jetbrains.defaultIDE`): 设置默认使用的 IDE，留空则每次询问
* **IDE 列表** (`switch2jetbrains.ides`): 手动配置 IDE 列表

#### 手动配置 IDE 示例

打开 `settings.json`，添加：

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
  "switch2jetbrains.defaultIDE": "GoLand"
}
```

**不同平台的路径示例:**

**macOS:**
```json
{
  "name": "IntelliJ IDEA",
  "path": "/Applications/IntelliJ IDEA.app/Contents/MacOS/idea"
}
```

**Windows:**
```json
{
  "name": "IntelliJ IDEA",
  "path": "C:\\Program Files\\JetBrains\\IntelliJ IDEA 2023.3\\bin\\idea64.exe"
}
```

**Linux:**
```json
{
  "name": "IntelliJ IDEA",
  "path": "/opt/idea/bin/idea.sh"
}
```

💡 **提示**: 插件默认会自动检测常见安装位置，大多数情况下无需手动配置。

### 支持的 IDE

✅ IntelliJ IDEA  
✅ GoLand  
✅ PyCharm  
✅ WebStorm  
✅ PhpStorm  
✅ RustRover  
✅ CLion  
✅ Android Studio  
✅ DataGrip  
✅ 及其他 JetBrains IDE

## 🔄 与 Switch2Cursor 配合使用

💡 **推荐组合**: 与 [Switch2Cursor](https://github.com/qczone/switch2cursor) 插件配合使用，实现双向无缝切换：

| 方向 | 插件 | 快捷键 |
|------|------|--------|
| JetBrains → Cursor | [Switch2Cursor](https://github.com/qczone/switch2cursor) | `Option+Shift+O/P` |
| Cursor → JetBrains | Switch2JetBrains | `Option+Shift+O/P` |

完美的双向工作流！🎯

## 🧑‍💻 开发指南

### 环境要求

* Node.js 18+
* npm 或 yarn
* VS Code 1.75.0+

### 构建项目

```bash
# 克隆仓库
git clone https://github.com/xtyooo/switch2jetbrains.git
cd switch2jetbrains

# 安装依赖
npm install

# 编译
npm run compile

# 监听模式（开发时使用）
npm run watch

# 打包成 .vsix 文件
npm run package
```

### 调试

1. 在 VS Code 中打开项目
2. 按 `F5` 启动调试（会打开一个新的扩展开发主机窗口）
3. 在新窗口中测试插件功能

### 项目结构

```
switch2jetbrains/
├── src/
│   ├── extension.ts          # 插件入口
│   ├── jetbrainsManager.ts   # IDE 管理器
│   └── windowActivator.ts    # 窗口激活工具
├── out/                       # 编译输出
├── package.json               # 插件配置
├── tsconfig.json             # TypeScript 配置
└── README.md
```

### 贡献指南

欢迎提交 Pull Request！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 🙋 常见问题

### 1. 安装后快捷键/菜单点击没有反应？

**解决方案:**
1. 检查设置中是否正确配置了 IDE 路径
2. 确保启用了自动检测功能（默认已启用）
3. 打开命令面板，手动运行命令测试
4. 查看开发者工具控制台是否有错误：`帮助` → `切换开发人员工具`
5. 确认 JetBrains IDE 已正确安装

### 2. 自动检测没有找到我的 IDE？

**解决方案:**
1. **手动配置**: 在设置中添加 IDE 路径（参见配置示例）
2. **检查路径**: 确保 IDE 安装在标准位置
3. **JetBrains Toolbox**: 通过 Toolbox 安装的 IDE 路径可能不同：
   - macOS: `~/Library/Application Support/JetBrains/Toolbox/apps/`
   - Windows: `%LOCALAPPDATA%\JetBrains\Toolbox\apps\`
   - Linux: `~/.local/share/JetBrains/Toolbox/apps/`

### 3. Linux 上窗口无法自动激活？

**解决方案:**  
需要安装 `wmctrl` 或 `xdotool`:

```bash
# Ubuntu/Debian
sudo apt-get install wmctrl

# 或者
sudo apt-get install xdotool

# Fedora
sudo dnf install wmctrl

# Arch Linux
sudo pacman -S wmctrl
```

### 4. 如何修改快捷键？

在 `设置` → `键盘快捷方式` → 搜索 `switch2jetbrains` 进行修改。

### 5. 支持哪些平台？

✅ macOS  
✅ Windows  
✅ Linux

### 6. 光标位置同步不准确？

**可能原因:**
- 编辑器的字符编码不同
- 制表符/空格设置不一致
- 文件未保存

**解决方案:**
1. 确保两个编辑器使用相同的字符编码（UTF-8 推荐）
2. 统一缩进设置（空格 vs 制表符）
3. 跳转前先保存文件

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 📮 反馈与支持

如遇到问题或有建议，欢迎反馈：

* 🐛 提交 [GitHub Issue](https://github.com/xtyooo/switch2jetbrains/issues) - 报告 Bug
* 💡 发起 [GitHub Discussion](https://github.com/xtyooo/switch2jetbrains/discussions) - 功能建议和讨论
* ⭐ 给项目点 Star - 支持项目发展

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=xtyooo/switch2jetbrains&type=Date)](https://star-history.com/#xtyooo/switch2jetbrains&Date)

## 🙏 致谢

感谢 [Switch2Cursor](https://github.com/qczone/switch2cursor) 项目的灵感启发！

---

**享受流畅的编辑器切换体验！** 🚀
