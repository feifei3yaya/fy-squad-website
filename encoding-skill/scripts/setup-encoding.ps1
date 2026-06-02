# 永久编码配置脚本
$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "      Trae 编码优化器 (永久配置)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

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
        $dir = Split-Path -Parent $profilePath
        if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
        New-Item -ItemType File -Path $profilePath -Force | Out-Null
    }
    
    Write-Host "3. 备份现有配置..." -ForegroundColor Yellow
    $backupPath = $profilePath + ".backup" + (Get-Date -Format "yyyyMMddHHmmss")
    Copy-Item -Path $profilePath -Destination $backupPath -Force
    Write-Host "   备份完成: $backupPath" -ForegroundColor Green
    
    Write-Host "4. 添加编码配置..." -ForegroundColor Yellow
    $encodingConfig = @"
# ========================================
# Trae 编码优化器配置
# ========================================
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
`$env:LANG = "zh_CN.UTF-8"
`$env:LC_ALL = "zh_CN.UTF-8"
`$env:PYTHONIOENCODING = "utf-8"
`$PSDefaultParameterValues['*:Encoding'] = 'utf8'
# ========================================
"@
    Add-Content -Path $profilePath -Value $encodingConfig -Encoding UTF8
    Write-Host "   配置已写入！" -ForegroundColor Green
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  编码已永久配置成功！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "请重新打开 PowerShell 以使配置生效" -ForegroundColor Yellow
} catch {
    Write-Host "配置过程中出错: $_" -ForegroundColor Red
}
