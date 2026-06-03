# Encoding Fixer (Trae 编码优化器)

解决 Trae 与 Windows 终端交互时的中文乱码问题，自动配置 PowerShell 编码、环境变量和控制台设置。

## 功能特性

- 🚀 **一键修复** - 快速修复当前会话的编码问题
- 🔧 **永久配置** - 修改 PowerShell 配置文件，永久生效
- 🔍 **智能诊断** - 检测当前环境编码状态
- 🔄 **安全备份** - 自动备份原有配置，支持回滚

## 快速开始

### 1. 快速修复（当前会话）

```powershell
.\scripts\fix-encoding.ps1
```

### 2. 永久配置（推荐）

```powershell
.\scripts\setup-encoding.ps1
```

### 3. 诊断问题

```powershell
.\scripts\diagnose-encoding.ps1
```

## 目录结构

```
encoding-fixer/
├── README.md                      # 项目说明文档
├── SKILL.md                       # Skill 定义文档
└── scripts/
    ├── fix-encoding.ps1          # 快速修复脚本
    ├── setup-encoding.ps1        # 永久配置脚本
    └── diagnose-encoding.ps1      # 诊断工具脚本
```

## 使用指南

### 脚本开头添加编码配置

在您的 PowerShell 脚本开头添加以下代码：

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$env:LANG = "zh_CN.UTF-8"
$env:LC_ALL = "zh_CN.UTF-8"
$PSDefaultParameterValues['*:Encoding'] = 'utf8'
```

### 手动配置

编辑 PowerShell 配置文件（`$PROFILE`），添加编码设置。

## 常见问题

**Q: 修复后需要重启终端吗？**

- 当前会话修复：不需要重启
- 永久配置：建议重新打开 PowerShell 以确保完全生效

**Q: 这个会影响其他程序吗？**

不会。仅影响 PowerShell 环境，不会修改系统级编码设置。

**Q: 配置出错了怎么办？**

永久配置脚本会自动备份原有配置，您可以手动恢复备份文件。

## 技术细节

### 支持的编码
- UTF-8（推荐）
- GBK
- GB2312
- Big5

### 环境变量配置
- `LANG`：语言设置
- `LC_ALL`：全部区域设置
- `PYTHONIOENCODING`：Python IO 编码

## 最佳实践

1. **始终在脚本开头添加编码配置**
2. **使用 UTF-8 编码保存所有脚本文件**
3. **优先使用永久配置，避免每次都手动设置**
4. **定期检查编码状态，确保设置生效**

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
