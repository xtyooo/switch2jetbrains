import { exec } from 'child_process';

/**
 * 跨平台窗口激活工具
 * 根据不同操作系统使用相应的方法激活 IDE 窗口
 */
export function activateWindow(ideName: string): void {
    const platform = process.platform;

    try {
        switch (platform) {
            case 'win32':
                activateWindowsWindow(ideName);
                break;
            case 'darwin':
                activateMacWindow(ideName);
                break;
            case 'linux':
                activateLinuxWindow(ideName);
                break;
            default:
                console.warn(`Unsupported platform: ${platform}`);
        }
    } catch (error) {
        console.error('Failed to activate window:', error);
    }
}

/**
 * Windows: 通过窗口标题激活
 */
function activateWindowsWindow(ideName: string): void {
    // 使用 PowerShell 的 AppActivate 方法
    const script = `(New-Object -ComObject WScript.Shell).AppActivate('${ideName}')`;
    exec(`powershell -command "${script}"`, (error) => {
        if (error) {
            console.error('Failed to activate Windows window:', error);
        }
    });
}

/**
 * macOS: 通过应用名激活
 */
function activateMacWindow(ideName: string): void {
    // 使用 osascript 激活应用
    const script = `tell application "${ideName}" to activate`;
    exec(`osascript -e '${script}'`, (error) => {
        if (error) {
            console.error('Failed to activate macOS window:', error);
        }
    });
}

/**
 * Linux: 使用 wmctrl 或 xdotool 激活窗口
 */
function activateLinuxWindow(ideName: string): void {
    // 首先尝试 wmctrl
    exec(`wmctrl -a "${ideName}"`, (error) => {
        if (error) {
            // 如果 wmctrl 失败，尝试 xdotool
            exec(`xdotool search --name "${ideName}" windowactivate`, (error2) => {
                if (error2) {
                    console.error('Failed to activate Linux window (需要安装 wmctrl 或 xdotool):', error2);
                }
            });
        }
    });
}
