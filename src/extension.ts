import * as vscode from 'vscode';
import { JetBrainsManager } from './jetbrainsManager';

/**
 * 插件激活时调用
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Switch2JetBrains 插件已激活');

    const manager = new JetBrainsManager();

    // 注册命令：打开当前文件到 JetBrains IDE
    const openFileDisposable = vscode.commands.registerCommand(
        'switch2jetbrains.openFile',
        async () => {
            await manager.openCurrentFile();
        }
    );

    // 注册命令：打开当前项目到 JetBrains IDE
    const openProjectDisposable = vscode.commands.registerCommand(
        'switch2jetbrains.openProject',
        async () => {
            await manager.openCurrentProject();
        }
    );

    // 添加到订阅列表，用于清理
    context.subscriptions.push(openFileDisposable, openProjectDisposable);

    // 显示欢迎消息（仅首次激活）
    const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage(
            '欢迎使用 Switch2JetBrains! 使用 Alt+Shift+O (Mac: Option+Shift+O) 打开当前文件，Alt+Shift+P (Mac: Option+Shift+P) 打开项目。',
            '了解更多'
        ).then(selection => {
            if (selection === '了解更多') {
                vscode.env.openExternal(vscode.Uri.parse('https://github.com/xtyooo/switch2jetbrains'));
            }
        });
        context.globalState.update('hasShownWelcome', true);
    }
}

/**
 * 插件停用时调用
 */
export function deactivate() {
    console.log('Switch2JetBrains 插件已停用');
}
