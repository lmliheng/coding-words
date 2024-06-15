#!/usr/bin/env bash
read -p "请输入提交的原因：" REASON
[ -z "$REASON" ] && { echo "提交原因不能为空"; exit 1; }
branchName=$(git rev-parse --abbrev-ref HEAD)
git add .
git commit -m "$REASON"
git pull origin "$branchName"
git push origin "$branchName"