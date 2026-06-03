
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
3. 用户遇到 Trae 终端中文显示问题
4. 用户提到 "乱码"、"编码"、"UTF-8" 等关键词

## 工作流程

### 第一步：问题诊断

检查当前环境的编码状态，包括：
- PowerShell 控制台输出编码
- 系统区域设置
- 环境变量配置（LANG, LC_ALL 等）

### 第二步：快速修复（当前会话）

立即应用编码修复到当前会话，包括：
1. 设置 `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`
2. 配置环境变量 `$env:LANG = "zh_CN.UTF-8"`、`$env:LC_ALL = "zh_CN.UTF-8"`
3. 设置 `$PSDefaultParameterValues['*:Encoding'] = 'utf8'`

### 第三步：永久配置

为用户提供永久配置选项：
1. 修改 PowerShell 配置文件（$PROFILE）
2. 保存编码设置
3. 提示重启终端

### 第四步：验证修复

验证编码是否成功应用：
1. 测试中文输出
2. 测试中文文件操作
3. 生成修复报告

## 功能特性

### 1. 一键修复

自动执行所有必要的编码设置，无需手动配置。

### 2. 多平台支持

- Windows PowerShell 5
- PowerShell Core (7+)
- Windows Terminal

### 3. 智能检测

自动检测当前环境状态，避免重复配置。

### 4. 回滚功能

提供配置回滚选项，可恢复到原始状态。

## 使用示例

### 示例 1：快速修复当前会话

&gt; 用户：我的中文文件名都乱码了
&gt;
&gt; 助手：我来帮您修复编码问题！
&gt;
&gt; [助手执行诊断]
&gt;
&gt; 助手：检测到编码问题，正在应用修复...
&gt;
&gt; [助手执行修复]
&gt;
&gt; 助手：✅ 编码已修复！当前会话的中文显示已正常。
&gt; 需要我帮您配置永久生效吗？

### 示例 2：永久配置

&gt; 用户：能帮我永久设置编码吗？
&gt;
&gt; 助手：好的，我来帮您永久配置 PowerShell 编码。
&gt;
&gt; [助手修改配置文件]
&gt;
&gt; 助手：✅ 编码已永久配置！请重新打开 PowerShell 以应用设置。

### 示例 3：生成编码代码片段

&gt; 用户：给我一段可以加到脚本开头的编码代码
&gt;
&gt; 助手：好的，这是标准的编码配置片段：
&gt;
&gt; ```powershell
&gt; [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
&gt; $env:LANG = "zh_CN.UTF-8"
&gt; $env:LC_ALL = "zh_CN.UTF-8"
&gt; $PSDefaultParameterValues['*:Encoding'] = 'utf8'
&gt; ```
&gt;
&gt; 助手：把这段代码加到您的 PowerShell 脚本开头即可。

## 脚本使用

### 快速修复脚本

```powershell
.\scripts\fix-encoding.ps1
```

### 永久配置脚本

```powershell
.\scripts\setup-encoding.ps1
```

### 诊断脚本

```powershell
.\scripts\diagnose-encoding.ps1
```

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
- `NODE_ENV`：Node.js 环境（可选）

### PowerShell 配置文件
- `$PROFILE`：用户配置文件
- `$PROFILE.AllUsersCurrentHost`：全局配置

## 最佳实践

1. **始终在脚本开头添加编码配置**
2. **使用 UTF-8 编码保存所有脚本文件**
3. **优先使用永久配置，避免每次都手动设置**
4. **定期检查编码状态，确保设置生效**

## 常见问题

### Q: 修复后需要重启终端吗？
A: 当前会话修复不需要重启，永久配置建议重启终端以确保完全生效。

### Q: 这个会影响其他程序吗？
A: 仅影响 PowerShell 环境，不会修改系统级编码设置，不会影响其他程序。

### Q: 可以只修复当前会话吗？
A: 可以，使用快速修复脚本只对当前终端窗口生效。

## 注意事项

1. **管理员权限**：某些系统级配置可能需要管理员权限
2. **配置文件备份**：永久配置前会自动备份现有配置
3. **兼容性**：不同 PowerShell 版本可能有细微差异
