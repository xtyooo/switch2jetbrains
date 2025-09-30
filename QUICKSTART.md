# Quick Start Guide

Welcome to **Switch2JetBrains**! This guide will help you get started quickly.

## 🎯 Step 1: Install Dependencies

Open terminal, navigate to the project directory, and run:

```bash
npm install
```

If Node.js is not installed on your system, please install it first:
- **macOS**: `brew install node`
- **Windows/Linux**: Visit https://nodejs.org/ to download

## 🔨 Step 2: Compile the Project

```bash
npm run compile
```

## 🧪 Step 3: Test the Extension

In VS Code/Cursor:

1. Press `F5` to start debugging
2. A new window will open with the extension loaded
3. Open a file and press `Option+Shift+O` (Windows: `Alt+Shift+O`) to test

## ⚙️ Configure IDE Paths

### Auto-detect (Recommended)

The extension will automatically detect installed JetBrains IDEs on first use.

### Manual Configuration

1. Open VS Code/Cursor settings (`Cmd+,` or `Ctrl+,`)
2. Search for `switch2jetbrains`
3. Click "Edit in settings.json"
4. Add configuration:

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

**Windows path example:**
```json
{
  "name": "IntelliJ IDEA",
  "path": "C:\\Program Files\\JetBrains\\IntelliJ IDEA 2023.2\\bin\\idea64.exe"
}
```

## 🎹 Keyboard Shortcuts

| Function | macOS | Windows/Linux |
|----------|-------|---------------|
| Open current file | `Option+Shift+O` | `Alt+Shift+O` |
| Open project | `Option+Shift+P` | `Alt+Shift+P` |

## 📖 Other Usage Methods

### 1. Command Palette

- `Cmd+Shift+P` (Windows: `Ctrl+Shift+P`)
- Type "Switch2JetBrains"
- Select the desired command

### 2. Context Menu

- Right-click in editor → "Open Current File in JetBrains IDE"
- Right-click in explorer → "Open Project in JetBrains IDE"

## 🔧 Common Issues

### IDE not found?

Make sure:
1. IDE is properly installed
2. Path in configuration is correct
3. Auto-detect is enabled

### Keyboard shortcuts not working?

1. Check for conflicts with other extensions
2. Customize shortcuts in settings

### Window not activating on Linux?

Install window management tools:
```bash
sudo apt-get install wmctrl
```

## 🚀 Start Using

You can now start using Switch2JetBrains!

1. Open a file in Cursor/VS Code
2. Press `Option+Shift+O` (or `Alt+Shift+O`)
3. Select target IDE
4. Enjoy seamless switching!

## 📚 More Resources

- [Full Documentation](./README.md)
- [Installation Guide](./INSTALL.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

---

**Happy coding!** 🎉

For questions, please visit [GitHub Issues](https://github.com/xtyooo/switch2jetbrains/issues).
