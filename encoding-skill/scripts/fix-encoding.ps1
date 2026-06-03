# 快速编码修复脚本 - 只对当前会话生效
$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "      Trae 编码优化器 (快速修复)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    Write-Host "1. 设置控制台输出编码为 UTF-8..." -ForegroundColor Yellow
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    Write-Host "   完成！" -ForegroundColor Green
    
    Write-Host "2. 设置环境变量..." -ForegroundColor Yellow
    $env:LANG = "zh_CN.UTF-8"
    $env:LC_ALL = "zh_CN.UTF-8"
    $env:PYTHONIOENCODING = "utf-8"
    Write-Host "   完成！" -ForegroundColor Green
    
    Write-Host "3. 设置 PowerShell 输出编码..." -ForegroundColor Yellow
    $PSDefaultParameterValues['*:Encoding'] = 'utf8'
    Write-Host "   完成！" -ForegroundColor Green
    
    Write-Host "4. 测试中文显示..." -ForegroundColor Yellow
    $testString = "测试中文字符串 - 1234"
    Write-Host "   测试输出: $testString" -ForegroundColor Cyan
    Write-Host "   完成！" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  编码已成功修复 (当前会话)" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "提示：此修复仅对当前终端窗口生效" -ForegroundColor Cyan
    Write-Host "      如需永久生效，请运行 setup-encoding.ps1" -ForegroundColor Cyan
    
} catch {
    Write-Host "修复过程中出错: $_" -ForegroundColor Red
}
