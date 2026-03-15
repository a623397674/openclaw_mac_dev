# 📢 飞书多 Bot 群聊配置指南

## 🎯 目标

在飞书中创建一个"一人公司"群聊，5 个 Bot 同时在线，你在群里说话时所有 Bot 都会根据自己的职责回复。

---

## 📋 配置说明

### 5 个飞书机器人

| 角色 | Agent ID | 飞书 App ID | 职责 |
|------|----------|------------|------|
| 📊 产品小助手 | `product-manager` | `cli_product_manager_appid` | 需求分析 |
| ⚙️ 后端老张 | `backend-engineer` | `cli_backend_engineer_appid` | 技术架构 |
| 🎨 前端小美 | `frontend-engineer` | `cli_frontend_engineer_appid` | UI 开发 |
| 💰 财务小慧 | `finance-assistant` | `cli_finance_assistant_appid` | 账务+Token 统计 |
| 🎧 客服小暖 | `customer-service` | `cli_customer_service_appid` | 用户支持 |

---

## 🚀 配置步骤

### 第一步：创建 5 个飞书应用

#### 1. 访问飞书开放平台
- 国内版：https://open.feishu.cn/app
- 国际版（Lark）：https://open.larksuite.com/app

#### 2. 创建第一个应用（产品小助手）
1. 点击 **创建企业应用**
2. 应用名称：**产品小助手**
3. 应用图标：选一个📊相关的
4. 应用类型：选择 **机器人**

#### 3. 获取凭证
进入应用管理页面：
- **凭证与基础信息** → 复制 App ID (格式：`cli_xxx`)
- **凭证与基础信息** → 点击 **获取 Secret** → 复制 App Secret

#### 4. 配置权限
点击 **权限管理** → **批量导入**，粘贴以下权限：
```
im:message
im:message:send_as_bot
im:chat
im:chat:join
```

#### 5. 配置事件订阅
1. 进入 **事件订阅** 页面
2. 开启 **启用事件订阅**
3. 订阅类型选择 **WebSocket**（推荐，无需公网）
4. 添加事件：
   - `im.message.receive_v1` - 接收消息
   - `im.chat.member.bot.added_v1` - 被邀请进群

#### 6. 发布应用
点击 **版本管理与发布** → **创建版本** → **提交审核**（通常自动通过）

#### 7. 重复步骤 2-6
创建剩余 4 个应用：
- 后端老张 (⚙️)
- 前端小美 (🎨)
- 财务小慧 (💰)
- 客服小暖 (🎧)

---

### 第二步：更新 OpenClaw 配置

#### 1. 编辑配置文件
```bash
openclaw config edit
```
或手动编辑：
```bash
nano /Users/jie/.openclaw/openclaw.json
```

#### 2. 填入 App ID 和 Secret

找到 `channels.feishu.accounts` 部分，替换占位符：

```json
"feishu": {
  "accounts": {
    "product-manager": {
      "appId": "cli_a93fb74e66381bc6",
      "appSecret": "你的产品小助手 Secret"
    },
    "backend-engineer": {
      "appId": "cli_backend_xxx",
      "appSecret": "你的后端老张 Secret"
    },
    "frontend-engineer": {
      "appId": "cli_frontend_xxx",
      "appSecret": "你的前端小美 Secret"
    },
    "finance-assistant": {
      "appId": "cli_finance_xxx",
      "appSecret": "你的财务小慧 Secret"
    },
    "customer-service": {
      "appId": "cli_customer_xxx",
      "appSecret": "你的客服小暖 Secret"
    }
  }
}
```

#### 3. 保存并重启
```bash
openclaw gateway restart
```

---

### 第三步：创建飞书群聊

#### 1. 创建群聊
1. 打开飞书
2. 点击 **创建群聊**
3. 群名称：**一人公司 🏢**
4. 群头像：选一个公司相关的

#### 2. 邀请 5 个 Bot
在群设置中：
- 点击 **添加成员**
- 搜索并添加：
  - 产品小助手
  - 后端老张
  - 前端小美
  - 财务小慧
  - 客服小暖

#### 3. 获取群聊 ID
发送一条消息到群里，然后查看日志：
```bash
openclaw logs --follow | grep feishu
```
找到类似：
```
[feishu] incoming message: chat_id=oc_xxxxx
```

---

### 第四步：配置广播组

#### 1. 更新广播配置
编辑 `/Users/jie/.openclaw/openclaw.json`：

```json
"broadcast": {
  "strategy": "parallel",
  "feishu:oc_xxxxx": ["product-manager", "backend-engineer", "frontend-engineer", "finance-assistant", "customer-service"]
}
```

将 `oc_xxxxx` 替换为实际的群聊 ID。

#### 2. 重启 Gateway
```bash
openclaw gateway restart
```

---

## 💬 使用示例

### 在群里发送：
```
我们要做一个新的用户系统
```

### 期望回复（5 个 Bot 同时回复）：

**📊 产品小助手：**
> 建议先明确目标用户和使用场景，核心功能是注册登录还是包含会员体系？

**⚙️ 后端老张：**
> 数据库用 PostgreSQL 吧，用户表设计要考虑扩展性，我来搞表结构。

**🎨 前端小美：**
> 前端用 React + TypeScript，登录注册页面要适配移动端哦。

**💰 财务小慧：**
> 这个项目的预算多少？开发成本记得记录一下~

**🎧 客服小暖：**
> 大家好！有任何使用问题随时找我，我会第一时间解答~

---

## 🔧 配置检查

### 查看状态
```bash
openclaw status
```

### 查看日志
```bash
openclaw logs --follow | grep feishu
```

### 测试 Bot
在群里 @每个 Bot 测试：
```
@产品小助手 你好
@后端老张 你好
@前端小美 你好
@财务小慧 你好
@客服小暖 你好
```

---

## 📊 Token 统计

财务小慧每天 9:00 发送昨日 Token 消耗报告到 QQ 623397674。

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

---

## ⚠️ 注意事项

1. **每个 Bot 需要独立飞书应用** - 不能共用 App ID
2. **权限配置** - 确保每个 Bot 都有消息和群聊权限
3. **WebSocket 模式** - 推荐，无需公网回调地址
4. **广播组消耗** - 5 个 Bot 同时回复会消耗 5 倍 Token
5. **群聊 ID 格式** - 飞书群聊 ID 以 `oc_` 开头

---

## 🔍 调试

### 查看 Bot 连接状态
```bash
openclaw status
```

### 查看各 Agent 会话
```bash
openclaw sessions list
```

### 查看飞书渠道状态
```bash
openclaw channels list
```

---

## ✅ 快速检查清单

- [ ] 创建 5 个飞书应用
- [ ] 获取 5 个 App ID 和 Secret
- [ ] 配置每个应用的权限和事件订阅
- [ ] 更新 openclaw.json 配置
- [ ] 创建飞书群聊
- [ ] 邀请 5 个 Bot 进群
- [ ] 获取群聊 ID
- [ ] 配置 broadcast
- [ ] 重启 Gateway
- [ ] 测试群聊消息

---
_创建时间：2026-03-15_
