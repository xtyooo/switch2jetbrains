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

### Method 2: Local Installation

1. Download the latest `.vsix` file from [Releases](https://github.com/xtyooo/switch2jetbrains/releases)
2. VS Code/Cursor → `Extensions` → `...` → `Install from VSIX...`
3. Select the downloaded file
4. Reload window

## 🚀 Usage Guide

### Basic Usage

#### Open Project

* **Keyboard Shortcuts:**
  * macOS: `Option+Shift+P`
  * Windows/Linux: `Alt+Shift+P`
* **Context Menu:** Right-click in project → `Open Project in JetBrains IDE`
* **Command Palette:** `Cmd+Shift+P` (Windows: `Ctrl+Shift+P`) → Type `Switch2JetBrains: Open Project`

#### Open Current File

* **Keyboard Shortcuts:**
  * macOS: `Option+Shift+O`
  * Windows/Linux: `Alt+Shift+O`
* **Context Menu:** Right-click in editor → `Open File in JetBrains IDE`
* **Command Palette:** `Cmd+Shift+P` (Windows: `Ctrl+Shift+P`) → Type `Switch2JetBrains: Open File`

### Configuration

Go to `Settings/Preferences` → Search for `Switch2JetBrains`:

* **Auto Detect** (`switch2jetbrains.autoDetect`): Automatically detect installed JetBrains IDEs (enabled by default)
* **Default IDE** (`switch2jetbrains.defaultIDE`): Set default IDE to use, leave empty to ask each time
* **IDE List** (`switch2jetbrains.ides`): Manually configure IDE list

#### Manual Configuration Example

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

### Supported IDEs

✅ IntelliJ IDEA  
✅ GoLand  
✅ PyCharm  
✅ WebStorm  
✅ PhpStorm  
✅ RustRover  
✅ CLion  
✅ Android Studio  
✅ DataGrip  
✅ And other JetBrains IDEs

## 🔄 Use with Switch2Cursor

Recommended to use together with [Switch2Cursor](https://github.com/qczone/switch2cursor) for bidirectional seamless switching:

* **Switch2Cursor**: JetBrains IDE → Cursor/VS Code
* **Switch2JetBrains**: Cursor/VS Code → JetBrains IDE

Perfect workflow! 🎯

## 🧑‍💻 Development Guide

### Build Project

```bash
# Clone repository
git clone https://github.com/xtyooo/switch2jetbrains.git
cd switch2jetbrains

# Install dependencies
npm install

# Compile
npm run compile

# Package
npm run package
```

### Debugging

1. Open project in VS Code
2. Press `F5` to start debugging
3. Test the extension in the new window

### Contributing

Pull Requests are welcome!

1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Submit Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

## 🙋 FAQ

### 1. Shortcuts/menu not working after installation?

**Solution:** Check if IDE path is correctly configured in settings, or enable auto-detection.

### 2. Window not activating automatically on Linux?

**Solution:** Install `wmctrl` or `xdotool`:

```bash
# Ubuntu/Debian
sudo apt-get install wmctrl

# Or
sudo apt-get install xdotool

# Fedora
sudo dnf install wmctrl

# Arch Linux
sudo pacman -S wmctrl
```

### 3. How to customize shortcuts?

**Solution:** Go to `Settings` → `Keyboard Shortcuts` → Search for `switch2jetbrains`

### 4. Which platforms are supported?

✅ macOS  
✅ Windows  
✅ Linux

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📮 Feedback

If you encounter any issues or have suggestions:

* Submit [GitHub Issue](https://github.com/xtyooo/switch2jetbrains/issues)
* Start a [Discussion](https://github.com/xtyooo/switch2jetbrains/discussions)

## 🌟 Star History

If this project helps you, please give it a Star ⭐️

[![Star History Chart](https://api.star-history.com/svg?repos=xtyooo/switch2jetbrains&type=Date)](https://star-history.com/#xtyooo/switch2jetbrains&Date)

## 🙏 Acknowledgments

Inspired by [Switch2Cursor](https://github.com/qczone/switch2cursor)

---

**Enjoy seamless editor switching!** 🚀
