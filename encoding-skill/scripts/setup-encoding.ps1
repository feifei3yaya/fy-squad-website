# 永久编码配置脚本
$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "      Trae 编码优化器 (永久配置)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    Write-Host "1. 设置当前会话编码..." -ForegroundColor Yellow
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    $env:LANG = "zh_CN.UTF-8"
    $env:LC_ALL = "zh_CN.UTF-8"
    $env:PYTHONIOENCODING = "utf-8"
    $PSDefaultParameterValues['*:Encoding'] = 'utf8'
    Write-Host "   完成！" -ForegroundColor Green
    
    Write-Host "2. 检查 PowerShell 配置文件..." -ForegroundColor Yellow
    $profilePath = $PROFILE
    Write-Host "   配置文件路径: $profilePath" -ForegroundColor Cyan
    
    if (-not (Test-Path $profilePath)) {
        Write-Host "   配置文件不存在，正在创建..." -ForegroundColor Yellow
        $dir = Split-Path -Parent $profilePath
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }
        New-Item -ItemType File -Path $profilePath -Force | Out-Null
        Write-Host "   配置文件已创建！" -ForegroundColor Green
    } else {
        Write-Host "   配置文件已存在" -ForegroundColor Cyan
    }
    
    Write-Host "3. 备份现有配置..." -ForegroundColor Yellow
    $backupPath = $profilePath + ".backup" + (Get-Date -Format "yyyyMMddHHmmss")
    Copy-Item -Path $profilePath -Destination $backupPath -Force
    Write-Host "   备份完成: $backupPath" -ForegroundColor Green
    
    Write-Host "4. 检查是否已包含编码配置..." -ForegroundColor Yellow
    $content = Get-Content -Path $profilePath -Raw -ErrorAction SilentlyContinue
    $hasEncodingConfig = $content -match "Console.*OutputEncoding.*UTF8" -or `
                         $content -match "LANG.*zh_CN"
    
    if ($hasEncodingConfig) {
        Write-Host "   检测到编码配置已存在，正在移除旧配置..." -ForegroundColor Yellow
        # 移除旧的编码配置
        $content = $content -replace "(?s)# PowerShell 编码配置.*?(?=\n#|\n$)", ""
        $content = $content -replace "(?s)\[Console\]::OutputEncoding.*?UTF8.*?\n", ""
        $content = $content -replace "(?s)\`$env:LANG.*?zh_CN.*?\n", ""
        $content = $content -replace "(?s)\`$env:LC_ALL.*?zh_CN.*?\n", ""
        $content = $content -replace "(?s)\`$env:PYTHONIOENCODING.*?utf8.*?\n", ""
        $content = $content -replace "(?s)\`$PSDefaultParameterValues.*?Encoding.*?\n", ""
    }
    
    Write-Host "5. 添加编码配置..." -ForegroundColor Yellow
    $encodingConfig = @"

# ========================================
# Trae 编码优化器配置
# 自动生成，请不要手动修改
# ========================================
# PowerShell 编码配置
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
`$env:LANG = "zh_CN.UTF-8"
`$env:LC_ALL = "zh_CN.UTF-8"
`$env:PYTHONIOENCODING = "utf-8"
`$PSDefaultParameterValues['*:Encoding'] = 'utf8'
# ========================================
"@
    
    # 确保有足够的空行
    if (-not [string]::IsNullOrWhiteSpace($content)) {
        if (-not $content.EndsWith("`n")) {
            $content += "`n"
        }
    }
    
    $content += $encodingConfig
    $content | Out-File -FilePath $profilePath -Encoding UTF8
    Write-Host "   配置已写入！" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  编码已永久配置成功！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "请关闭所有 PowerShell 窗口并重新打开" -ForegroundColor Yellow
    Write-Host "以使配置生效" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "备份文件已保存到: $backupPath" -ForegroundColor Cyan
    
} catch {
    Write-Host "配置过程中出错: $_" -ForegroundColor Red
}
