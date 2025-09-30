# 使用技巧 - 获得最佳体验

## 🚀 极速跳转配置

### 方法 1: 设置默认 IDE（推荐）⚡

**最快方式**，响应时间 <10ms！

```json
{
  "switch2jetbrains.defaultIDE": "GoLand"  // 替换为你常用的 IDE
}
```

**设置步骤:**
1. `Cmd+,` (Windows: `Ctrl+,`) 打开设置
2. 搜索 `switch2jetbrains`
3. 在 `Default IDE` 中填入你的 IDE 名称（如 "GoLand"、"IntelliJ IDEA" 等）

**效果**: 按快捷键后几乎瞬间跳转！⚡

---

### 方法 2: 自动记忆（默认启用）🧠

**无需配置**，插件会自动记住你上次使用的 IDE。

**工作流程:**
1. 第一次使用：选择 IDE（弹出选择框）
2. 第二次起：自动使用上次选的，无需再选！

**响应时间**: <20ms

**如需关闭:**
```json
{
  "switch2jetbrains.rememberLastUsed": false
}
```

---

### 方法 3: 单 IDE 环境（自动）

如果你的电脑只安装了一个 JetBrains IDE，插件会自动使用它，无需任何配置。

---

## ⚙️ 完整推荐配置

```json
{
  // 核心配置
  "switch2jetbrains.defaultIDE": "GoLand",           // 设置默认 IDE
  "switch2jetbrains.rememberLastUsed": true,         // 记住上次使用的（默认开启）
  
  // 性能优化
  "switch2jetbrains.autoDetect": false,              // 手动配置后关闭自动检测
  "switch2jetbrains.silentMode": true,               // 静默模式（默认开启）
  
  // 手动配置 IDE 列表（可选，但更快）
  "switch2jetbrains.ides": [
    {
      "name": "GoLand",
      "path": "/Applications/GoLand.app/Contents/MacOS/goland"
    }
  ]
}
```

---

## 🎯 不同场景的最佳配置

### 场景 1: 只用一个 IDE

```json
{
  "switch2jetbrains.defaultIDE": "GoLand",
  "switch2jetbrains.autoDetect": false,
  "switch2jetbrains.ides": [
    {
      "name": "GoLand",
      "path": "/Applications/GoLand.app/Contents/MacOS/goland"
    }
  ]
}
```

**效果**: 极速跳转，<10ms ⚡

---

### 场景 2: 多个 IDE，但主要用一个

```json
{
  "switch2jetbrains.defaultIDE": "GoLand",  // 主力 IDE
  "switch2jetbrains.rememberLastUsed": true
}
```

**效果**: 
- 主力 IDE：<10ms
- 临时切换其他：<20ms（第二次起）

---

### 场景 3: 多个 IDE，根据项目切换

```json
{
  "switch2jetbrains.rememberLastUsed": true,
  "switch2jetbrains.ides": [
    { "name": "GoLand", "path": "..." },
    { "name": "IntelliJ IDEA", "path": "..." },
    { "name": "WebStorm", "path": "..." }
  ]
}
```

**效果**: 每个项目自动记住对应的 IDE

---

## 📊 性能对比

| 配置方式 | 首次 | 第二次起 | 推荐度 |
|---------|------|---------|--------|
| 设置默认 IDE | <10ms | <10ms | ⭐⭐⭐⭐⭐ |
| 自动记忆（默认） | ~100ms | <20ms | ⭐⭐⭐⭐ |
| 每次选择 | ~100ms | ~100ms | ⭐⭐ |
| 自动检测 | ~500ms | ~100ms | ⭐ |

---

## 🔍 查找 IDE 可执行文件路径

### macOS

```bash
# GoLand
/Applications/GoLand.app/Contents/MacOS/goland

# IntelliJ IDEA
/Applications/IntelliJ IDEA.app/Contents/MacOS/idea

# 其他 IDE 类似
/Applications/<IDE名称>.app/Contents/MacOS/<命令名>
```

### Windows

```
C:\Program Files\JetBrains\GoLand 2023.3\bin\goland64.exe
C:\Program Files\JetBrains\IntelliJ IDEA 2023.3\bin\idea64.exe
```

### Linux

```bash
# 使用 which 查找
which goland
which idea

# 或者常见路径
/opt/goland/bin/goland.sh
~/.local/share/JetBrains/Toolbox/apps/goland/bin/goland.sh
```

---

## 💡 高级技巧

### 1. 不同项目使用不同 IDE

虽然插件没有项目级配置，但可以利用 **自动记忆** 功能：
- 在 Go 项目中使用 GoLand（第一次手动选）
- 在 Java 项目中使用 IDEA（第一次手动选）
- 第二次起自动记住！

### 2. 临时切换 IDE

即使设置了默认 IDE，你也可以：
1. 通过命令面板手动选择其他 IDE
2. 插件会记住这次选择，下次自动使用

### 3. 快速配置默认 IDE

1. 第一次使用时，选择你想要的 IDE
2. 在选择框的提示中，点击设置
3. 将你选择的 IDE 名称填入 `defaultIDE`

---

## 🚦 故障排查

### 为什么还是慢？

**检查清单:**
1. ✅ 是否设置了 `defaultIDE`？
2. ✅ 是否关闭了 `autoDetect`？
3. ✅ 是否手动配置了 `ides` 列表？
4. ✅ IDE 路径是否正确？

### 如何验证配置生效？

打开 VS Code 开发者工具（`帮助` → `切换开发人员工具`），在 Console 中执行命令，查看耗时。

---

## 📖 相关文档

- [性能优化说明](./PERFORMANCE.md)
- [版本管理指南](./VERSION_GUIDE.md)
- [完整文档](./README_zh.md)

---

**按照推荐配置，你应该能体验到几乎瞬间的跳转速度！** 🚀
