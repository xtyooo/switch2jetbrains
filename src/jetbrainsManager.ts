import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { activateWindow } from './windowActivator';

const execAsync = promisify(exec);

export interface JetBrainsIDE {
    name: string;
    path: string;
}

export class JetBrainsManager {
    /**
     * 打开当前文件到选定的 JetBrains IDE
     */
    async openCurrentFile(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('没有打开的文件');
            return;
        }

        const filePath = editor.document.uri.fsPath;
        const line = editor.selection.active.line + 1; // 转换为 1-based
        const column = editor.selection.active.character + 1;

        // 选择目标 IDE
        const ide = await this.selectIDE();
        if (!ide) {
            return;
        }

        await this.openInIDE(ide, filePath, line, column);
    }

    /**
     * 打开当前项目到选定的 JetBrains IDE
     */
    async openCurrentProject(): Promise<void> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showWarningMessage('没有打开的工作区');
            return;
        }

        const projectPath = workspaceFolders[0].uri.fsPath;

        // 选择目标 IDE
        const ide = await this.selectIDE();
        if (!ide) {
            return;
        }

        await this.openInIDE(ide, projectPath);
    }

    /**
     * 在指定 IDE 中打开文件或项目
     */
    private async openInIDE(
        ide: JetBrainsIDE,
        targetPath: string,
        line?: number,
        column?: number
    ): Promise<void> {
        try {
            // 构建命令
            let command = `"${ide.path}"`;
            
            if (line !== undefined && column !== undefined) {
                command += ` --line ${line} --column ${column}`;
            }
            
            command += ` "${targetPath}"`;

            // 执行命令
            await execAsync(command);

            // 激活窗口
            setTimeout(() => {
                activateWindow(ide.name);
            }, 500);

            vscode.window.showInformationMessage(`已在 ${ide.name} 中打开`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`打开 IDE 失败: ${errorMessage}`);
        }
    }

    /**
     * 选择目标 IDE（从配置中读取或自动检测）
     */
    private async selectIDE(): Promise<JetBrainsIDE | null> {
        const config = vscode.workspace.getConfiguration('switch2jetbrains');
        let ides: JetBrainsIDE[] = config.get('ides', []);
        const defaultIDE: string = config.get('defaultIDE', '');
        const autoDetect: boolean = config.get('autoDetect', true);

        // 如果启用自动检测且配置为空，则自动检测
        if (autoDetect && ides.length === 0) {
            ides = await this.detectInstalledIDEs();
            if (ides.length > 0) {
                vscode.window.showInformationMessage(
                    `自动检测到 ${ides.length} 个 JetBrains IDE，已添加到配置中`
                );
                // 保存到配置
                await config.update('ides', ides, vscode.ConfigurationTarget.Global);
            }
        }

        if (ides.length === 0) {
            const action = await vscode.window.showErrorMessage(
                '未配置 JetBrains IDE。请在设置中添加 IDE 路径。',
                '打开设置'
            );
            if (action === '打开设置') {
                vscode.commands.executeCommand(
                    'workbench.action.openSettings',
                    'switch2jetbrains.ides'
                );
            }
            return null;
        }

        // 如果设置了默认 IDE，直接使用
        if (defaultIDE) {
            const ide = ides.find(i => i.name === defaultIDE);
            if (ide) {
                return ide;
            }
        }

        // 显示选择菜单
        const selected = await vscode.window.showQuickPick(
            ides.map(ide => ({
                label: ide.name,
                description: ide.path,
                ide: ide
            })),
            {
                placeHolder: '选择要打开的 JetBrains IDE'
            }
        );

        return selected ? selected.ide : null;
    }

    /**
     * 自动检测已安装的 JetBrains IDE
     */
    private async detectInstalledIDEs(): Promise<JetBrainsIDE[]> {
        const ides: JetBrainsIDE[] = [];
        const platform = process.platform;

        if (platform === 'darwin') {
            // macOS
            const ideConfigs = [
                { name: 'IntelliJ IDEA', app: 'IntelliJ IDEA.app', cmd: 'idea' },
                { name: 'GoLand', app: 'GoLand.app', cmd: 'goland' },
                { name: 'PyCharm', app: 'PyCharm.app', cmd: 'pycharm' },
                { name: 'WebStorm', app: 'WebStorm.app', cmd: 'webstorm' },
                { name: 'PhpStorm', app: 'PhpStorm.app', cmd: 'phpstorm' },
                { name: 'RustRover', app: 'RustRover.app', cmd: 'rustrover' },
                { name: 'CLion', app: 'CLion.app', cmd: 'clion' },
                { name: 'Android Studio', app: 'Android Studio.app', cmd: 'studio' },
                { name: 'DataGrip', app: 'DataGrip.app', cmd: 'datagrip' },
            ];

            for (const config of ideConfigs) {
                const appPath = `/Applications/${config.app}`;
                const binPath = `${appPath}/Contents/MacOS/${config.cmd}`;
                
                if (fs.existsSync(binPath)) {
                    ides.push({ name: config.name, path: binPath });
                }
            }
        } else if (platform === 'win32') {
            // Windows
            const ideConfigs = [
                { name: 'IntelliJ IDEA', pattern: 'IntelliJ IDEA*', exe: 'idea64.exe' },
                { name: 'GoLand', pattern: 'GoLand*', exe: 'goland64.exe' },
                { name: 'PyCharm', pattern: 'PyCharm*', exe: 'pycharm64.exe' },
                { name: 'WebStorm', pattern: 'WebStorm*', exe: 'webstorm64.exe' },
                { name: 'PhpStorm', pattern: 'PhpStorm*', exe: 'phpstorm64.exe' },
                { name: 'RustRover', pattern: 'RustRover*', exe: 'rustrover64.exe' },
                { name: 'CLion', pattern: 'CLion*', exe: 'clion64.exe' },
                { name: 'DataGrip', pattern: 'DataGrip*', exe: 'datagrip64.exe' },
            ];

            const basePaths = [
                'C:\\Program Files\\JetBrains',
                'C:\\Program Files (x86)\\JetBrains',
            ];

            for (const basePath of basePaths) {
                if (!fs.existsSync(basePath)) {
                    continue;
                }

                for (const config of ideConfigs) {
                    try {
                        const dirs = fs.readdirSync(basePath);
                        const matchedDirs = dirs.filter(d => 
                            d.startsWith(config.pattern.replace('*', ''))
                        );

                        for (const dir of matchedDirs) {
                            const binPath = path.join(basePath, dir, 'bin', config.exe);
                            if (fs.existsSync(binPath)) {
                                ides.push({ name: config.name, path: binPath });
                                break;
                            }
                        }
                    } catch (error) {
                        // 忽略错误，继续检测
                    }
                }
            }
        } else if (platform === 'linux') {
            // Linux - 检测常见的安装位置
            const ideConfigs = [
                { name: 'IntelliJ IDEA', cmd: 'idea' },
                { name: 'GoLand', cmd: 'goland' },
                { name: 'PyCharm', cmd: 'pycharm' },
                { name: 'WebStorm', cmd: 'webstorm' },
                { name: 'PhpStorm', cmd: 'phpstorm' },
                { name: 'RustRover', cmd: 'rustrover' },
                { name: 'CLion', cmd: 'clion' },
                { name: 'DataGrip', cmd: 'datagrip' },
            ];

            const basePaths = [
                path.join(process.env.HOME || '', '.local/share/JetBrains/Toolbox/apps'),
                '/opt',
                '/usr/local/bin',
            ];

            for (const config of ideConfigs) {
                try {
                    // 尝试在 PATH 中查找
                    const { stdout } = await execAsync(`which ${config.cmd}`);
                    const cmdPath = stdout.trim();
                    if (cmdPath) {
                        ides.push({ name: config.name, path: cmdPath });
                        continue;
                    }
                } catch (error) {
                    // 继续在特定目录中查找
                }

                // 在特定目录中查找
                for (const basePath of basePaths) {
                    if (!fs.existsSync(basePath)) {
                        continue;
                    }

                    try {
                        const binPath = path.join(basePath, config.cmd, 'bin', config.cmd + '.sh');
                        if (fs.existsSync(binPath)) {
                            ides.push({ name: config.name, path: binPath });
                            break;
                        }
                    } catch (error) {
                        // 忽略错误
                    }
                }
            }
        }

        return ides;
    }
}
