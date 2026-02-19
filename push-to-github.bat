@echo off
echo ========================================
echo 提交修复到 GitHub
echo ========================================
echo.

cd C:\Users\zyq15\pet-shop

echo [1/3] 添加更改...
git add .

echo [2/3] 提交更改...
git commit -m "Fix: Vercel deployment configuration"

echo [3/3] 推送到 GitHub...
git push origin main

echo.
echo ========================================
echo 完成！请返回 Vercel 点击 Redeploy
echo ========================================
pause
