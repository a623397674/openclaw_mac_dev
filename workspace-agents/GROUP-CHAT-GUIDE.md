# 🏢 一人公司群聊配置指南

## 📋 概述

创建一个"一人公司"群聊，你在群里说话时，所有 5 个角色（产品、后端、前端、财务、客服）都会根据自己的职责进行简短回复。

## ⚠️ 当前限制

**QQBot 广播组支持状态：** 实验性

目前 OpenClaw 的广播组（broadcast groups）功能主要支持 WhatsApp。QQBot 的多 Agent 回复需要以下配置：

### 方案 A：使用默认 Bot + 手动切换（推荐）

1. 创建一个 QQ 群，邀请所有 5 个 Bot 账号
2. 在群里 @对应的 Bot 来获取专业回复
3. 或使用统一 Bot（客服小暖）作为入口，内部路由到各 Agent

### 方案 B：配置群聊广播（需要 QQBot 支持）

如果 QQBot 支持广播组，配置如下：

```json
{
  "broadcast": {
    "strategy": "parallel",
    "GROUP_OPENID": ["product-manager", "backend-engineer", "frontend-engineer", "finance-assistant", "customer-service"]
  }
}
```

## 🎯 群聊配置步骤

### 第一步：创建 QQ 群

1. 打开 QQ，创建一个新群
2. 群名称：**一人公司 🏢**
3. 邀请以下 5 个 Bot 账号：
   - 产品小助手 (QQ: 1903516201)
   - 后端老张 (QQ: 1903517106)
   - 前端小美 (QQ: 1903517154)
   - 财务小慧 (QQ: 1903516313)
   - 客服小暖 (QQ: 1903488919)

### 第二步：获取群 ID

发送一条消息到群里，然后查看日志获取群 OpenID：

```bash
openclaw logs --follow | grep qqbot
```

找到类似这样的日志：
```
[qqbot] incoming group message: group_openid=xxxxx
```

### 第三步：配置广播组

编辑 `/Users/jie/.openclaw/openclaw.json`，添加：

```json
{
  "broadcast": {
    "strategy": "parallel",
    "GROUP_OPENID": ["product-manager", "backend-engineer", "frontend-engineer", "finance-assistant", "customer-service"]
  }
}
```

将 `GROUP_OPENID` 替换为实际的群 ID。

### 第四步：重启 Gateway

```bash
openclaw gateway restart
```

## 💬 使用示例

### 在群里发送：
```
我们要做一个新的用户系统
```

### 期望回复：

**📊 产品小助手：**
> 建议先明确目标用户和使用场景，我来帮你梳理需求文档框架？

**⚙️ 后端老张：**
> 数据库设计可以用 PostgreSQL，用户表需要哪些字段？我来设计表结构。

**🎨 前端小美：**
> 前端用 React + TypeScript 吧，登录注册页面我来搞定。

**💰 财务小慧：**
> 这个项目的预算是多少？记得记录开发成本哦。

**🎧 客服小暖：**
> 大家好！有任何使用问题随时找我，我会第一时间解答~

## 🔧 备选方案：单 Bot 多角色

如果广播组不可用，可以使用单 Bot（客服小暖）作为统一入口，在 SOUL.md 中配置多角色回复：

### 更新客服小暖的 SOUL.md

```markdown
## 群聊模式

当检测到群聊消息时，模拟所有角色的简短回复：

1. 先以客服身份回应
2. 然后模拟其他角色的专业意见（标注角色名）
3. 保持每条回复简短（1-2 句话）
```

## 📊 Token 消耗统计

财务小慧会每天 9:00 发送前一天的 Token 消耗报告到 QQ 623397674。

报告格式：
```
📊 Token 消耗日报 (2026-03-15)
━━━━━━━━━━━━━━━━━━━━━━
📊 产品小助手：12,345 tokens (¥0.12)
⚙️ 后端老张：8,765 tokens (¥0.09)
🎨 前端小美：5,432 tokens (¥0.05)
💰 财务小慧：2,100 tokens (¥0.02)
🎧 客服小暖：15,678 tokens (¥0.16)
━━━━━━━━━━━━━━━━━━━━━━
合计：44,320 tokens (¥0.44)
```

## 🎯 角色回复风格

每个角色在群里的回复应该：

| 角色 | 回复风格 | 示例 |
|------|---------|------|
| 📊 产品小助手 | 结构化、问需求 | "这个功能的用户价值是什么？" |
| ⚙️ 后端老张 | 技术导向、给方案 | "用 PostgreSQL + Redis 吧" |
| 🎨 前端小美 | 用户体验优先 | "移动端要适配一下" |
| 💰 财务小慧 | 成本意识 | "预算多少？记得记账" |
| 🎧 客服小暖 | 亲切友好 | "有问题随时找我~" |

## 📝 注意事项

1. **群 ID 格式**：QQ 群 ID 是 OpenID，不是群号
2. **Bot 权限**：确保所有 Bot 都被设为群管理员或允许发言
3. **消息频率**：5 个 Bot 同时回复可能被 QQ 限流
4. **Token 消耗**：广播模式会消耗 5 倍 Token

## 🔍 调试

查看群聊消息处理日志：

```bash
openclaw logs --follow | grep -E "qqbot|broadcast"
```

查看各 Agent 的 session：

```bash
openclaw sessions list
```

---
_创建时间：2026-03-15_
