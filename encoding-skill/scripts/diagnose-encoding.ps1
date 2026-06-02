# 编码诊断脚本
$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "      Trae 编码优化器 (诊断工具)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$issues = @()

Write-Host "1. 检查控制台输出编码..." -ForegroundColor Yellow
try {
    $consoleEncoding = [Console]::OutputEncoding
    Write-Host "   当前编码: $($consoleEncoding.EncodingName)" -ForegroundColor Cyan
    if ($consoleEncoding.EncodingName -notmatch "UTF-?8") {
        Write-Host "   建议设置为 UTF-8" -ForegroundColor Yellow
        $issues += "控制台输出编码不是 UTF-8"
    } else { Write-Host "   编码设置正确" -ForegroundColor Green }
} catch { Write-Host "   无法检测编码: $_" -ForegroundColor Red; $issues += "无法检测控制台编码" }

Write-Host ""
Write-Host "2. 检查环境变量..." -ForegroundColor Yellow
Write-Host "   LANG: $($env:LANG)" -ForegroundColor Cyan
Write-Host "   LC_ALL: $($env:LC_ALL)" -ForegroundColor Cyan
Write-Host "   PYTHONIOENCODING: $($env:PYTHONIOENCODING)" -ForegroundColor Cyan

Write-Host ""
Write-Host "3. 测试中文显示..." -ForegroundColor Yellow
$testString = "这是一条中文测试消息 1234 ABCD"
Write-Host "   测试: $testString" -ForegroundColor Cyan

Write-Host ""
if ($issues.Count -eq 0) {
    Write-Host "编码配置正常！" -ForegroundColor Green
} else {
    Write-Host "发现 $($issues.Count) 个问题：" -ForegroundColor Yellow
    foreach ($issue in $issues) { Write-Host "   - $issue" -ForegroundColor Red }
}
