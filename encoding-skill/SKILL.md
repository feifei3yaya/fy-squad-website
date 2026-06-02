---
name: "encoding-fixer"
description: "解决 Trae 与 Windows 终端交互时的中文乱码问题，自动配置 PowerShell 编码、环境变量和控制台设置。"
---

# 编码优化器 (Encoding Fixer)

解决 Trae 与 Windows 终端交互时的中文乱码问题，自动配置 PowerShell 编码、环境变量和控制台设置。

## 触发条件

当满足以下任一场景时，自动激活本 Skill：
1. 用户遇到中文文件名乱码问题
2. 用户询问 PowerShell 编码设置
3. 用户遇到终端中文显示问题
4. 用户提到 "乱码"、"编码"、"UTF-8" 等关键词

## 工作流程

### 第一步：问题诊断
检查当前环境的编码状态，包括：PowerShell 控制台输出编码、系统区域设置、环境变量配置（LANG, LC_ALL 等）

### 第二步：快速修复（当前会话）
立即应用编码修复到当前会话：
1. 设置 `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`
2. 配置环境变量 `$env:LANG = "zh_CN.UTF-8"`、`$env:LC_ALL = "zh_CN.UTF-8"`
3. 设置 `$PSDefaultParameterValues['*:Encoding'] = 'utf8'`

### 第三步：永久配置
为用户提供永久配置选项：修改 PowerShell 配置文件（$PROFILE）、保存编码设置、提示重启终端

## 脚本使用

```powershell
.\scripts\fix-encoding.ps1       # 快速修复
.\scripts\setup-encoding.ps1     # 永久配置
.\scripts\diagnose-encoding.ps1  # 诊断
```

## 技术细节
支持的编码：UTF-8（推荐）、GBK、GB2312、Big5
