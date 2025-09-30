# 安装与构建指南

## 📦 环境准备

在开始之前，请确保已安装以下工具：

### 1. 安装 Node.js

**macOS:**
```bash
# 使用 Homebrew
brew install node

# 或者从官网下载
# https://nodejs.org/
```

**Windows:**
- 从 [Node.js 官网](https://nodejs.org/) 下载安装包
- 推荐安装 LTS 版本

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nodejs npm

# Fedora
sudo dnf install nodejs npm

# Arch Linux
sudo pacman -S nodejs npm
```

### 2. 验证安装

```bash
node --version   # 应该显示 v18.0.0 或更高版本
npm --version    # 应该显示 npm 版本号
```

## 🚀 构建插件

### 步骤 1: 安装依赖

在项目根目录运行：

```bash
npm install
```

这将安装所有必需的依赖包。

### 步骤 2: 编译 TypeScript

```bash
npm run compile
```

编译后的文件将输出到 `out/` 目录。

### 步骤 3: 开发模式（可选）

如果你要进行开发，可以使用监听模式：

```bash
npm run watch
```

这将在文件修改时自动重新编译。

### 步骤 4: 打包插件

```bash
npm run package
```

这将生成 `.vsix` 文件，可用于分发和安装。

## 🧪 测试插件

### 方法 1: 使用 VS Code 调试

1. 在 VS Code 中打开项目
2. 按 `F5` 启动调试
3. 会打开一个新的 VS Code 窗口，插件已加载
4. 在新窗口中测试插件功能

### 方法 2: 手动安装 .vsix 文件

1. 打包插件：`npm run package`
2. VS Code → 扩展 → `...` → 从 VSIX 安装
3. 选择生成的 `.vsix` 文件
4. 重新加载窗口

## 📝 常见问题

### Q: npm install 失败？

**A:** 尝试以下方法：
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### Q: TypeScript 编译错误？

**A:** 确保 TypeScript 版本正确：
```bash
npm install typescript@latest --save-dev
```

### Q: 找不到 @types 包？

**A:** 安装类型定义：
```bash
npm install --save-dev @types/node @types/vscode
```

## 🔧 开发工具推荐

### VS Code 扩展

建议安装以下扩展以提升开发体验：

- **ESLint** - 代码检查
- **TypeScript and JavaScript Language Features** - TypeScript 支持（内置）
- **Prettier** - 代码格式化（可选）

### 配置 ESLint

项目已配置 ESLint，运行检查：

```bash
npm run lint
```

## 📚 进一步学习

- [VS Code 扩展开发文档](https://code.visualstudio.com/api)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Node.js 官方文档](https://nodejs.org/docs/)

## 💡 提示

1. **首次开发插件？** 建议先阅读 [VS Code 扩展开发入门](https://code.visualstudio.com/api/get-started/your-first-extension)

2. **修改代码后忘记编译？** 使用 `npm run watch` 自动编译

3. **想发布到 Marketplace？** 阅读 [发布指南](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

---

如有任何问题，请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 或提交 Issue。
