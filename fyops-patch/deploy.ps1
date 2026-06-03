# FYops 邮箱验证功能部署脚本
# 运行方式: 右键此文件 -> 使用 PowerShell 运行
# 或: powershell -ExecutionPolicy Bypass -File deploy.ps1

$ErrorActionPreference = "Stop"
$projectRoot = "D:\FYops-v1.0.0.0"
$patchDir = "D:\FY-gw-v1.0.0.0\fyops-patch"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "    FYops 邮箱验证功能部署" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 确认
Write-Host "将更新以下内容:" -ForegroundColor Yellow
Write-Host "  - 新增 src/mail/ 邮件模块"
Write-Host "  - 更新 auth 认证模块（注册/验证邮箱）"
Write-Host "  - 更新 Prisma Schema"
Write-Host "  - 数据库添加 email_verified 等字段"
Write-Host "  - 重新构建后端"
Write-Host ""

# 0. 更新 Prisma Schema
Write-Host "[0/7] 更新 Prisma Schema..." -ForegroundColor Yellow
node "$patchDir\update-prisma-schema.js" "$projectRoot\apps\api\prisma\schema.prisma"
Write-Host "  ✓ Prisma Schema 已更新"

# 1. 拷贝邮件模块
Write-Host "[1/7] 部署邮件模块..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$projectRoot\apps\api\src\mail" -Force | Out-Null
Copy-Item "$patchDir\mail\*" -Destination "$projectRoot\apps\api\src\mail\" -Force
Write-Host "  ✓ mail 模块已部署"

# 2. 拷贝更新后的认证模块
Write-Host "[2/7] 部署更新后的认证模块..." -ForegroundColor Yellow
Copy-Item "$patchDir\auth\dto\index.ts" -Destination "$projectRoot\apps\api\src\auth\dto\index.ts" -Force
Copy-Item "$patchDir\auth\auth.module.ts" -Destination "$projectRoot\apps\api\src\auth\auth.module.ts" -Force
Copy-Item "$patchDir\auth\auth.service.ts" -Destination "$projectRoot\apps\api\src\auth\auth.service.ts" -Force
Copy-Item "$patchDir\auth\auth.controller.ts" -Destination "$projectRoot\apps\api\src\auth\auth.controller.ts" -Force
Write-Host "  ✓ 认证模块已更新"

# 3. 拷贝主模块
Write-Host "[3/7] 部署主模块..." -ForegroundColor Yellow
Copy-Item "$patchDir\app.module.ts" -Destination "$projectRoot\apps\api\src\app.module.ts" -Force
Copy-Item "$patchDir\main.ts" -Destination "$projectRoot\apps\api\src\main.ts" -Force
Write-Host "  ✓ 主模块已更新"

# 4. 更新数据库结构
Write-Host "[4/7] 更新数据库结构..." -ForegroundColor Yellow
Set-Location "$projectRoot\apps\api"

$dbPath = "$projectRoot\apps\api\prisma\dev.db"
if (Test-Path $dbPath) {
    Write-Host "  执行数据库迁移..."
    sqlite3 $dbPath "ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT 0;" 2>$null
    sqlite3 $dbPath "ALTER TABLE users ADD COLUMN email_verification_code TEXT;" 2>$null
    sqlite3 $dbPath "ALTER TABLE users ADD COLUMN email_verification_expires_at DATETIME;" 2>$null
    Write-Host "  ✓ 数据库字段已添加（如已存在则忽略错误）"
} else {
    Write-Host "  ⚠ 数据库文件不存在: $dbPath"
    Write-Host "  如果是新环境，Prisma 会在首次运行时自动创建表结构"
}

# 5. 重新生成 Prisma Client
Write-Host "[5/7] 重新生成 Prisma Client..." -ForegroundColor Yellow
npx prisma generate 2>&1
Write-Host "  ✓ Prisma Client 已重新生成"

# 6. 安装依赖和构建后端
Write-Host "[6/7] 安装依赖和构建后端..." -ForegroundColor Yellow
npm install nodemailer @types/nodemailer 2>&1
npm run build 2>&1
Write-Host "  ✓ 后端依赖安装和构建完成"

# 7. 完成
Write-Host "[7/7] 完成!" -ForegroundColor Green

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "   部署完成！" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "后续步骤（需在服务器上执行）：" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 如果使用 Docker:" -ForegroundColor White
Write-Host "   cd $projectRoot" -ForegroundColor Gray
Write-Host "   docker-compose down api" -ForegroundColor Gray
Write-Host "   docker-compose up -d --build api" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 如果使用 pm2/node 管理:" -ForegroundColor White
Write-Host "   手动重启 api 进程即可" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 验证 API 是否正常工作:" -ForegroundColor White
Write-Host "   curl http://localhost:3001/auth/register -H 'Content-Type: application/json' -d '{\"username\":\"test\",\"email\":\"test@qq.com\",\"password\":\"123456\"}'" -ForegroundColor Gray
Write-Host ""
