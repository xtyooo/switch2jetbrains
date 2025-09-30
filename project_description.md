# Switch2JetBrains 项目说明

## 📋 项目概述

**Switch2JetBrains** 是一个 VS Code/Cursor 插件，实现了从 Cursor/VS Code 到 JetBrains 系列 IDE 的反向跳转功能，是 [Switch2Cursor](https://github.com/qczone/switch2cursor) 的姊妹项目。

### 项目目标

- ✅ 从 Cursor/VS Code 一键跳转到 JetBrains IDE
- ✅ 自动同步光标位置（行号、列号）
- ✅ 支持多个 JetBrains IDE
- ✅ 跨平台支持（macOS、Windows、Linux）
- ✅ 自动检测已安装的 IDE

## 🏗️ 技术架构

### 技术栈

- **开发语言**: TypeScript
- **插件框架**: VS Code Extension API
- **构建工具**: TypeScript Compiler
- **代码规范**: ESLint + TypeScript ESLint

### 核心模块

1. **extension.ts** - 插件入口
   - 注册命令和快捷键
   - 管理插件生命周期

2. **jetbrainsManager.ts** - IDE 管理器
   - 配置管理
   - IDE 自动检测
   - 命令行调用

3. **windowActivator.ts** - 窗口激活
   - 跨平台窗口激活
   - macOS/Windows/Linux 适配

## 📁 项目结构

```
Switch2JetBrains/
├── src/                          # 源代码
│   ├── extension.ts              # 插件入口
│   ├── jetbrainsManager.ts       # IDE 管理器
│   └── windowActivator.ts        # 窗口激活工具
├── out/                          # 编译输出（.gitignore）
├── images/                       # 图片资源
├── .vscode/                      # VS Code 配置
│   ├── launch.json              # 调试配置
│   ├── tasks.json               # 任务配置
│   ├── settings.json            # 编辑器设置
│   └── extensions.json          # 推荐扩展
├── package.json                  # 插件清单
├── tsconfig.json                # TypeScript 配置
├── .eslintrc.json               # ESLint 配置
├── .gitignore                   # Git 忽略文件
├── .vscodeignore                # 打包忽略文件
├── LICENSE                       # MIT 许可证
├── README.md                     # 英文文档
├── README_zh.md                  # 中文文档
├── CHANGELOG.md                  # 更新日志
├── CONTRIBUTING.md               # 贡献指南
├── INSTALL.md                    # 安装指南
├── 快速开始.md                   # 快速开始
└── 项目说明.md                   # 本文件
```

## 🔑 核心实现原理

### 1. 获取编辑器信息

使用 VS Code API 获取当前文件路径和光标位置：

```typescript
const editor = vscode.window.activeTextEditor;
const filePath = editor.document.uri.fsPath;
const line = editor.selection.active.line + 1;
const column = editor.selection.active.character + 1;
```

### 2. 调用 JetBrains IDE

JetBrains IDE 支持命令行参数打开文件并定位光标：

```bash
# macOS/Linux
/Applications/IntelliJ IDEA.app/Contents/MacOS/idea --line 10 --column 5 /path/to/file.ts

# Windows
"C:\Program Files\JetBrains\IntelliJ IDEA\bin\idea64.exe" --line 10 --column 5 "C:\path\to\file.ts"
```

### 3. 窗口激活

**macOS:**
```bash
osascript -e 'tell application "IntelliJ IDEA" to activate'
```

**Windows:**
```powershell
(New-Object -ComObject WScript.Shell).AppActivate('IntelliJ IDEA')
```

**Linux:**
```bash
wmctrl -a "IntelliJ IDEA"
```

### 4. IDE 自动检测

扫描常见安装目录：

- **macOS**: `/Applications/*.app`
- **Windows**: `C:\Program Files\JetBrains\*`
- **Linux**: `/opt/*`, `~/.local/share/JetBrains/Toolbox/apps/*`

## 🎨 用户体验设计

### 配置优先级

1. 用户手动配置的 IDE 列表
2. 自动检测的 IDE
3. 引导用户配置

### 交互流程

1. 用户触发命令（快捷键/菜单）
2. 检查配置，如果有默认 IDE 则直接使用
3. 否则显示选择列表
4. 执行跳转并显示提示

### 错误处理

- 配置为空 → 提示配置并提供快速跳转
- IDE 路径无效 → 显示错误信息
- 命令执行失败 → 显示详细错误

## 🧪 测试与调试

### 本地调试

1. 按 `F5` 启动扩展开发主机
2. 在新窗口中测试功能
3. 查看调试控制台输出

### 跨平台测试

需要在以下平台测试：
- ✅ macOS
- ⚠️ Windows（需要在 Windows 环境测试）
- ⚠️ Linux（需要在 Linux 环境测试）

## 📦 发布流程

### 1. 准备

- 更新版本号（package.json）
- 更新 CHANGELOG.md
- 确保所有功能正常工作

### 2. 打包

```bash
npm run package
```

生成 `switch2jetbrains-1.0.0.vsix`

### 3. 发布到 Marketplace

需要注册 Visual Studio Marketplace 发布者账号，然后：

```bash
# 安装发布工具
npm install -g @vscode/vsce

# 登录
vsce login your-publisher-name

# 发布
vsce publish
```

## 🤝 协作与贡献

### 开发分支策略

- `main` - 稳定版本
- `develop` - 开发分支
- `feature/*` - 功能分支
- `bugfix/*` - 修复分支

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `style:` - 代码格式
- `refactor:` - 重构
- `test:` - 测试
- `chore:` - 构建/工具

## 🔮 未来规划

### v1.1.0
- [ ] 支持多窗口/多项目管理
- [ ] 记住最近使用的 IDE
- [ ] 更智能的 IDE 选择（根据项目类型）

### v1.2.0
- [ ] 支持自定义命令行参数
- [ ] 支持项目级别配置
- [ ] 添加统计功能

### v2.0.0
- [ ] 双向同步（实时）
- [ ] 支持更多编辑器
- [ ] 云端配置同步

## 📞 联系方式

- **GitHub Issues**: 提交 Bug 和功能请求
- **GitHub Discussions**: 讨论和交流
- **Email**: your-email@example.com（可选）

## 📜 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

---

**感谢你对 Switch2JetBrains 的关注！** 🎉

如有任何问题或建议，欢迎提交 Issue 或 Pull Request。
