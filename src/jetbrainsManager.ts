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
    private cachedIDEs: JetBrainsIDE[] | null = null;
    private lastDetectionTime: number = 0;
    private readonly CACHE_DURATION = 300000; // 5分钟缓存
    private detectionPromise: Promise<JetBrainsIDE[]> | null = null;
    private lastUsedIDE: JetBrainsIDE | null = null; // 记忆上次使用的 IDE
    private isPreloaded: boolean = false; // 是否已预加载

    /**
     * 🚀 预加载 IDE 列表（在插件激活时调用）
     * 这样首次使用时就不需要等待检测了
     */
    async preloadIDEs(): Promise<void> {
        if (this.isPreloaded) {
            return;
        }

        try {
            // 后台异步加载，不阻塞
            await this.getIDEsQuick();
            this.isPreloaded = true;
        } catch (error) {
            console.error('预加载 IDE 列表失败:', error);
        }
    }

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

        // 快速选择目标 IDE
        const ide = await this.selectIDEFast();
        if (!ide) {
            return;
        }

        // 记忆此次使用的 IDE
        this.lastUsedIDE = ide;

        // 立即执行，不等待
        this.openInIDE(ide, filePath, line, column);
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

        // 快速选择目标 IDE
        const ide = await this.selectIDEFast();
        if (!ide) {
            return;
        }

        // 记忆此次使用的 IDE
        this.lastUsedIDE = ide;

        // 立即执行，不等待
        this.openInIDE(ide, projectPath);
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
            // 显示状态栏提示（更轻量）
            vscode.window.setStatusBarMessage(`正在打开 ${ide.name}...`, 2000);

            // 构建命令
            let command = `"${ide.path}"`;

            if (line !== undefined && column !== undefined) {
                command += ` --line ${line} --column ${column}`;
            }

            command += ` "${targetPath}"`;

            // 不等待执行完成，立即返回（异步执行）
            exec(command, (error) => {
                if (error) {
                    vscode.window.showErrorMessage(`打开 IDE 失败: ${error.message}`);
                }
            });

            // 延迟激活窗口（异步执行，不阻塞）
            setTimeout(() => {
                activateWindow(ide.name);
            }, 300);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`打开 IDE 失败: ${errorMessage}`);
        }
    }

    /**
     * 快速选择 IDE（优先使用默认/上次使用的）
     */
    private async selectIDEFast(): Promise<JetBrainsIDE | null> {
        const config = vscode.workspace.getConfiguration('switch2jetbrains');
        const defaultIDE: string = config.get('defaultIDE', '');
        const rememberLast: boolean = config.get('rememberLastUsed', true);

        // 第一优先级：默认 IDE
        if (defaultIDE) {
            const ides = await this.getIDEsQuick();
            const ide = ides.find(i => i.name === defaultIDE);
            if (ide) {
                return ide;
            }
        }

        // 第二优先级：记忆上次使用的 IDE
        if (rememberLast && this.lastUsedIDE) {
            return this.lastUsedIDE;
        }

        // 第三优先级：如果只有一个 IDE，直接使用
        const ides = await this.getIDEsQuick();
        if (ides.length === 1) {
            return ides[0];
        }

        // 最后：让用户选择
        return await this.selectIDE(ides);
    }

    /**
     * 快速获取 IDE 列表（优先使用缓存）
     */
    private async getIDEsQuick(): Promise<JetBrainsIDE[]> {
        const config = vscode.workspace.getConfiguration('switch2jetbrains');
        let ides: JetBrainsIDE[] = config.get('ides', []);

        // 如果配置了 IDE，直接返回
        if (ides.length > 0) {
            return ides;
        }

        // 使用缓存
        const now = Date.now();
        if (this.cachedIDEs && (now - this.lastDetectionTime < this.CACHE_DURATION)) {
            return this.cachedIDEs;
        }

        // 如果正在检测，等待结果
        if (this.detectionPromise) {
            return await this.detectionPromise;
        }

        // 启动后台检测
        this.detectionPromise = this.detectInstalledIDEs();
        ides = await this.detectionPromise;
        this.detectionPromise = null;

        this.cachedIDEs = ides;
        this.lastDetectionTime = now;

        // 静默保存到配置
        if (ides.length > 0) {
            config.update('ides', ides, vscode.ConfigurationTarget.Global);
        }

        return ides;
    }

    /**
     * 选择目标 IDE（显示选择框）
     */
    private async selectIDE(ides?: JetBrainsIDE[]): Promise<JetBrainsIDE | null> {
        if (!ides) {
            ides = await this.getIDEsQuick();
        }
        if (ides.length === 0) {
            vscode.window.showErrorMessage(
                '未找到 JetBrains IDE。请在设置中配置或检查安装。',
                '打开设置'
            ).then(action => {
                if (action === '打开设置') {
                    vscode.commands.executeCommand(
                        'workbench.action.openSettings',
                        'switch2jetbrains.ides'
                    );
                }
            });
            return null;
        }

        // 显示快速选择菜单（带提示）
        const items = ides.map(ide => ({
            label: ide.name,
            description: ide.path,
            detail: ide === this.lastUsedIDE ? '⭐ 上次使用' : undefined,
            ide: ide
        }));

        // 如果有上次使用的 IDE，放到最前面
        if (this.lastUsedIDE) {
            const lastIndex = items.findIndex(item => item.ide === this.lastUsedIDE);
            if (lastIndex > 0) {
                const lastItem = items.splice(lastIndex, 1)[0];
                items.unshift(lastItem);
            }
        }

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: '选择 JetBrains IDE（提示：可设置默认 IDE 实现无感跳转）',
            matchOnDescription: false
        });

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
