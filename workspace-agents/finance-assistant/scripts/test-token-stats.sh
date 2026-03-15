#!/bin/bash

# 测试 Token 统计脚本
# 用法：bash test-token-stats.sh

echo "🧪 测试 Token 统计脚本..."
echo ""

# 检查脚本是否存在
SCRIPT_PATH="/Users/jie/.openclaw/workspace-agents/finance-assistant/scripts/token-stats.js"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "❌ 脚本不存在：$SCRIPT_PATH"
    exit 1
fi

echo "✅ 脚本文件存在"
echo ""

# 运行脚本
echo "📊 运行统计脚本..."
node "$SCRIPT_PATH"

echo ""
echo "✅ 测试完成"
