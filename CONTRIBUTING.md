# 贡献指南

感谢你对 Switch2JetBrains 的关注！我们欢迎任何形式的贡献。

## 🤝 如何贡献

### 报告 Bug

如果你发现了 Bug，请：

1. 检查 [Issues](https://github.com/xtyooo/switch2jetbrains/issues) 中是否已有相关报告
2. 如果没有，创建一个新的 Issue，包含：
   - 清晰的标题和描述
   - 重现步骤
   - 期望的行为
   - 实际的行为
   - 你的环境信息（操作系统、VS Code 版本等）
   - 如果可能，提供截图或错误日志

### 提出新功能

如果你有新功能的想法：

1. 先在 [Discussions](https://github.com/xtyooo/switch2jetbrains/discussions) 中讨论
2. 创建一个 Feature Request Issue
3. 清楚地描述功能和使用场景

### 提交代码

1. **Fork 仓库**
   ```bash
   git clone https://github.com/xtyooo/switch2jetbrains.git
   cd switch2jetbrains
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **开发**
   - 遵循现有的代码风格
   - 添加必要的注释
   - 确保代码通过 ESLint 检查
   ```bash
   npm run lint
   ```

5. **测试**
   - 按 `F5` 在 VS Code 中调试测试
   - 确保所有功能正常工作
   - 在不同平台测试（如果可能）

6. **提交**
   ```bash
   git add .
   git commit -m "feat: 添加某某功能"
   ```
   
   提交信息格式：
   - `feat:` 新功能
   - `fix:` Bug 修复
   - `docs:` 文档更新
   - `style:` 代码格式调整
   - `refactor:` 重构
   - `test:` 测试相关
   - `chore:` 构建/工具相关

7. **推送并创建 PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   然后在 GitHub 上创建 Pull Request

## 📝 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 添加必要的类型注解
- 编写清晰的注释（中文或英文）
- 保持代码简洁易读

## 🧪 测试

在提交 PR 前，请确保：

- [ ] 代码通过 ESLint 检查
- [ ] 在本地测试所有功能
- [ ] 更新相关文档
- [ ] 如果需要，更新 CHANGELOG.md

## 📄 许可证

提交代码即表示你同意将代码以 MIT 许可证开源。

## 💬 交流

如有任何问题，欢迎：
- 创建 Issue
- 发起 Discussion
- 提交 PR

感谢你的贡献！🎉
