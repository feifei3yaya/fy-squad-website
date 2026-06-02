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
