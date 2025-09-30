# Switch2JetBrains Project Documentation

## 📋 Project Overview

**Switch2JetBrains** is a VS Code/Cursor extension that enables reverse jumping from Cursor/VS Code to JetBrains IDE family, serving as a companion project to [Switch2Cursor](https://github.com/qczone/switch2cursor).

### Project Goals

- ✅ One-click jump from Cursor/VS Code to JetBrains IDE
- ✅ Automatic cursor position sync (line and column)
- ✅ Support multiple JetBrains IDEs
- ✅ Cross-platform support (macOS, Windows, Linux)
- ✅ Auto-detect installed IDEs

## 🏗️ Technical Architecture

### Tech Stack

- **Language**: TypeScript
- **Framework**: VS Code Extension API
- **Build Tool**: TypeScript Compiler
- **Code Quality**: ESLint + TypeScript ESLint

### Core Modules

1. **extension.ts** - Extension entry point
   - Register commands and shortcuts
   - Manage extension lifecycle

2. **jetbrainsManager.ts** - IDE manager
   - Configuration management
   - IDE auto-detection
   - Command line invocation

3. **windowActivator.ts** - Window activation
   - Cross-platform window activation
   - macOS/Windows/Linux adaptation

## 📁 Project Structure

```
Switch2JetBrains/
├── src/                          # Source code
│   ├── extension.ts              # Extension entry
│   ├── jetbrainsManager.ts       # IDE manager
│   └── windowActivator.ts        # Window activator
├── out/                          # Build output
├── images/                       # Image assets
├── .vscode/                      # VS Code config
│   ├── launch.json              # Debug config
│   ├── tasks.json               # Task config
│   ├── settings.json            # Editor settings
│   └── extensions.json          # Recommended extensions
├── package.json                  # Extension manifest
├── tsconfig.json                # TypeScript config
├── .eslintrc.json               # ESLint config
├── .gitignore                   # Git ignore
├── .vscodeignore                # Package ignore
├── LICENSE                       # MIT License
├── README.md                     # English docs
├── README_zh.md                  # Chinese docs
├── CHANGELOG.md                  # Changelog
├── CONTRIBUTING.md               # Contributing guide
├── INSTALL.md                    # Installation guide
├── QUICKSTART.md                 # Quick start
└── PROJECT.md                    # This file
```

## 🔑 Core Implementation

### 1. Get Editor Info

Use VS Code API to get current file path and cursor position:

```typescript
const editor = vscode.window.activeTextEditor;
const filePath = editor.document.uri.fsPath;
const line = editor.selection.active.line + 1;
const column = editor.selection.active.character + 1;
```

### 2. Invoke JetBrains IDE

JetBrains IDEs support command line arguments to open files and position cursor:

```bash
# macOS/Linux
/Applications/IntelliJ IDEA.app/Contents/MacOS/idea --line 10 --column 5 /path/to/file.ts

# Windows
"C:\Program Files\JetBrains\IntelliJ IDEA\bin\idea64.exe" --line 10 --column 5 "C:\path\to\file.ts"
```

### 3. Window Activation

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

### 4. IDE Auto-detection

Scan common installation directories:

- **macOS**: `/Applications/*.app`
- **Windows**: `C:\Program Files\JetBrains\*`
- **Linux**: `/opt/*`, `~/.local/share/JetBrains/Toolbox/apps/*`

## 🎨 User Experience Design

### Configuration Priority

1. User manually configured IDE list
2. Auto-detected IDEs
3. Guide user to configure

### Interaction Flow

1. User triggers command (shortcut/menu)
2. Check config, use default IDE if set
3. Otherwise show selection list
4. Execute jump and show notification

### Error Handling

- Empty config → Prompt to configure with quick link
- Invalid IDE path → Show error message
- Command execution failed → Show detailed error

## 🧪 Testing & Debugging

### Local Debugging

1. Press `F5` to start extension development host
2. Test functionality in new window
3. Check debug console output

### Cross-platform Testing

Needs testing on:
- ✅ macOS
- ⚠️ Windows (needs testing on Windows)
- ⚠️ Linux (needs testing on Linux)

## 📦 Publishing Process

### 1. Preparation

- Update version number (package.json)
- Update CHANGELOG.md
- Ensure all features work properly

### 2. Package

```bash
npm run package
```

Generates `switch2jetbrains-1.0.0.vsix`

### 3. Publish to Marketplace

Register Visual Studio Marketplace publisher account, then:

```bash
# Install publishing tool
npm install -g @vscode/vsce

# Login
vsce login your-publisher-name

# Publish
vsce publish
```

## 🤝 Collaboration & Contribution

### Branch Strategy

- `main` - Stable releases
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation update
- `style:` - Code formatting
- `refactor:` - Refactoring
- `test:` - Testing
- `chore:` - Build/tools

## 🔮 Future Plans

### v1.1.0
- [ ] Support multi-window/multi-project management
- [ ] Remember recently used IDE
- [ ] Smarter IDE selection (based on project type)

### v1.2.0
- [ ] Support custom command line arguments
- [ ] Support project-level configuration
- [ ] Add usage statistics

### v2.0.0
- [ ] Bidirectional sync (real-time)
- [ ] Support more editors
- [ ] Cloud config sync

## 📞 Contact

- **GitHub Issues**: Submit bugs and feature requests
- **GitHub Discussions**: Discussions and communication

## 📜 License

MIT License - see [LICENSE](./LICENSE) file

---

**Thank you for your interest in Switch2JetBrains!** 🎉

For questions or suggestions, please submit an Issue or Pull Request.
