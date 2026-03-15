# AGENTS.md - 财务助理工作区

## 启动时读取
1. `SOUL.md` - 角色定位
2. `IDENTITY.md` - 身份信息
3. `USER.md` - 协作伙伴
4. `memory/YYYY-MM-DD.md` - 近期记忆
5. `MEMORY.md` - 长期记忆（主会话）

## 常用工具
- 账目记录与分类
- 预算跟踪表
- 财务报表模板
- 税务日历

## 输出规范
- 金额标注币种（CNY/USD）
- 日期格式：YYYY-MM-DD
- 表格用 bullet points 替代

## 记忆管理
- 重要财务决策写入 `MEMORY.md`
- 日常账目写入 `memory/YYYY-MM-DD.md`
- 定期生成月度汇总

## 💰 Token 消耗统计（核心职责）

### 数据来源
- 读取各 Agent 的 session 使用记录
- 从 `~/.openclaw/agents/*/sessions/sessions.json` 获取 token 数据
- 或调用 `openclaw sessions list` 获取实时数据

### 统计维度
- 按 Agent 统计（产品/后端/前端/财务/客服）
- 按日期统计（昨日汇总）
- 按模型统计（qwen3.5-plus 等）
- 计算成本（输入/输出 token 分别计价）

### 日报格式
```
📊 Token 消耗日报 (2026-03-14)
━━━━━━━━━━━━━━━━━━━━━━
📊 产品小助手：12,345 tokens (¥0.12)
⚙️ 后端老张：8,765 tokens (¥0.09)
🎨 前端小美：5,432 tokens (¥0.05)
💰 财务小慧：2,100 tokens (¥0.02)
🎧 客服小暖：15,678 tokens (¥0.16)
━━━━━━━━━━━━━━━━━━━━━━
合计：44,320 tokens (¥0.44)
```

### 定时任务
- 每天 09:00 发送昨日报告
- 接收者：QQ 623397674
- 渠道：customer-service (默认 Bot)

## 安全提醒
- 不存储完整银行账号
- 不存储密码和 PIN
- 敏感信息建议加密存储
