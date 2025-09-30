# 版本管理指南

## 📌 版本号规则

本项目采用 [语义化版本控制](https://semver.org/lang/zh-CN/)：**MAJOR.MINOR.PATCH**

### 版本号格式: X.Y.Z

- **X (主版本号)**: 不兼容的 API 修改
- **Y (次版本号)**: 向下兼容的功能性新增
- **Z (修订号)**: 向下兼容的问题修正

### 示例

- `1.0.0` → `1.0.1`: Bug 修复、性能优化
- `1.0.1` → `1.1.0`: 新增功能（向下兼容）
- `1.1.0` → `2.0.0`: 重大更新（可能不兼容）

---

## 🔄 版本更新流程

### 1. 确定版本类型

根据更改内容选择版本号：

| 更改类型 | 版本号 | 示例 |
|---------|--------|------|
| 🐛 Bug 修复 | `PATCH` | 1.0.0 → 1.0.1 |
| ⚡ 性能优化 | `PATCH` | 1.0.1 → 1.0.2 |
| 📝 文档更新 | `PATCH` | 1.0.2 → 1.0.3 |
| ✨ 新功能（小） | `MINOR` | 1.0.3 → 1.1.0 |
| 🎨 UI 改进 | `MINOR` | 1.1.0 → 1.2.0 |
| 💥 破坏性更改 | `MAJOR` | 1.2.0 → 2.0.0 |

### 2. 更新 package.json

```json
{
  "version": "1.0.2"  // 更新版本号
}
```

### 3. 更新 CHANGELOG.md

在顶部添加新版本记录：

```markdown
## [1.0.2] - 2025-09-30

### 性能优化 🚀
- ⚡ 具体优化内容

### 改进
- 📚 具体改进内容

### 修复
- 🐛 具体修复内容
```

### 4. 提交更改

```bash
# 编译
npm run compile

# 打包
npm run package

# 提交
git add .
git commit -m "chore: bump version to 1.0.2"
git push origin main
```

### 5. 创建 Git Tag

```bash
# 创建标签
git tag -a v1.0.2 -m "Release v1.0.2"

# 推送标签
git push origin v1.0.2
```

### 6. 创建 GitHub Release

1. 访问 `https://github.com/xtyooo/switch2jetbrains/releases/new`
2. 选择标签: `v1.0.2`
3. 标题: `v1.0.2 - Performance Optimization`
4. 描述: 从 CHANGELOG.md 复制对应版本内容
5. 上传 `switch2jetbrains-1.0.2.vsix` 文件
6. 发布

---

## 📊 版本历史

| 版本 | 日期 | 主要更新 |
|------|------|----------|
| 1.0.2 | 2025-09-30 | 性能优化（20-60x 提升） |
| 1.0.1 | 2025-09-30 | 添加插件图标 |
| 1.0.0 | 2025-09-30 | 首次发布 |

---

## 🎯 快速检查清单

每次发布前检查：

- [ ] 更新 `package.json` 中的版本号
- [ ] 更新 `CHANGELOG.md` 添加版本记录
- [ ] 运行 `npm run compile` 确保编译成功
- [ ] 运行 `npm run package` 生成 .vsix 文件
- [ ] 测试 .vsix 文件能否正常安装使用
- [ ] 提交代码并推送到 GitHub
- [ ] 创建 Git Tag
- [ ] 创建 GitHub Release
- [ ] （可选）发布到 VS Code Marketplace

---

## 💡 提示

### 使用脚本自动化（可选）

创建 `scripts/release.sh`:

```bash
#!/bin/bash
VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Usage: ./scripts/release.sh <version>"
  exit 1
fi

# 更新版本号（需要手动在 package.json 中更新）
echo "请先在 package.json 中更新版本号为: $VERSION"
read -p "已更新？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  exit 1
fi

# 编译和打包
npm run compile
npm run package

# Git 提交
git add .
git commit -m "chore: bump version to $VERSION"
git push origin main

# 创建标签
git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin "v$VERSION"

echo "✅ 版本 $VERSION 已发布！"
echo "👉 请访问 GitHub 创建 Release: https://github.com/xtyooo/switch2jetbrains/releases/new"
```

使用方法：
```bash
chmod +x scripts/release.sh
./scripts/release.sh 1.0.2
```

---

## 📚 参考资料

- [语义化版本控制](https://semver.org/lang/zh-CN/)
- [约定式提交](https://www.conventionalcommits.org/zh-hans/)
- [Keep a Changelog](https://keepachangelog.com/zh-CN/)

---

**记住**: 每次有重要更新时都要更新版本号！🎯
