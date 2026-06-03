# 编码诊断脚本
$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "      Trae 编码优化器 (诊断工具)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$issues = @()

Write-Host "1. 检查控制台输出编码..." -ForegroundColor Yellow
try {
    $consoleEncoding = [Console]::OutputEncoding
    Write-Host "   当前编码: $($consoleEncoding.EncodingName)" -ForegroundColor Cyan
    if ($consoleEncoding.EncodingName -notmatch "UTF-?8") {
        Write-Host "   ⚠️  建议设置为 UTF-8" -ForegroundColor Yellow
        $issues += "控制台输出编码不是 UTF-8"
    } else {
        Write-Host "   ✅ 编码设置正确" -ForegroundColor Green
    }
} catch {
    Write-Host "   ❌ 无法检测编码: $_" -ForegroundColor Red
    $issues += "无法检测控制台编码"
}

Write-Host ""
Write-Host "2. 检查环境变量..." -ForegroundColor Yellow

Write-Host "   LANG: $($env:LANG)" -ForegroundColor Cyan
Write-Host "   LC_ALL: $($env:LC_ALL)" -ForegroundColor Cyan
Write-Host "   PYTHONIOENCODING: $($env:PYTHONIOENCODING)" -ForegroundColor Cyan

if ([string]::IsNullOrWhiteSpace($env:LANG)) {
    $issues += "LANG 环境变量未设置"
} elseif ($env:LANG -notmatch "UTF-?8") {
    Write-Host "   ⚠️  LANG 建议设置为 zh_CN.UTF-8" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "3. 检查 PowerShell 配置..." -ForegroundColor Yellow

$profilePath = $PROFILE
Write-Host "   配置文件路径: $profilePath" -ForegroundColor Cyan
if (Test-Path $profilePath) {
    $content = Get-Content -Path $profilePath -Raw -ErrorAction SilentlyContinue
    $hasConfig = $content -match "Console.*OutputEncoding.*UTF8" -or `
                 $content -match "LANG.*zh_CN"
    if ($hasConfig) {
        Write-Host "   ✅ 检测到编码配置" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  未检测到编码配置" -ForegroundColor Yellow
        $issues += "PowerShell 配置文件中无编码设置"
    }
} else {
    Write-Host "   ⚠️  配置文件不存在" -ForegroundColor Yellow
    $issues += "PowerShell 配置文件不存在"
}

Write-Host ""
Write-Host "4. 测试中文显示..." -ForegroundColor Yellow

$testString = "这是一条中文测试消息 1234 ABCD"
Write-Host "   测试: $testString" -ForegroundColor Cyan
Write-Host "   长度: $($testString.Length) 字符" -ForegroundColor Cyan

Write-Host ""
Write-Host "5. 测试文件操作..." -ForegroundColor Yellow
$testFile = ".\编码测试文件_$(Get-Date -Format 'yyyyMMddHHmmss').txt"
try {
    "测试内容" | Out-File -FilePath $testFile -Encoding UTF8
    Write-Host "   ✅ 成功创建 UTF-8 文件: $testFile" -ForegroundColor Green
    Remove-Item -Path $testFile -ErrorAction SilentlyContinue
} catch {
    Write-Host "   ❌ 文件操作失败: $_" -ForegroundColor Red
    $issues += "文件操作可能存在编码问题"
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "        诊断结果总结" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($issues.Count -eq 0) {
    Write-Host "✅ 编码配置一切正常！" -ForegroundColor Green
} else {
    Write-Host "⚠️  发现 $($issues.Count) 个问题：" -ForegroundColor Yellow
    foreach ($issue in $issues) {
        Write-Host "   - $issue" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "建议操作：" -ForegroundColor Yellow
    Write-Host "   1. 运行 fix-encoding.ps1 - 快速修复当前会话" -ForegroundColor Cyan
    Write-Host "   2. 运行 setup-encoding.ps1 - 永久配置编码" -ForegroundColor Cyan
}
