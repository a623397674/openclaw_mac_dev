# 🏢 一人公司 - 最终方案

## ✅ 推荐方案：公司小秘（协调员）

创建一个专门的 **公司小秘** Agent，在群聊中自动汇总各部门意见。

---

## 📋 配置说明

### 新增 Agent

| 项目 | 配置 |
|------|------|
| **名称** | 公司小秘 (CEO Assistant) |
| **Agent ID** | `coordinator` |
| **工作区** | `/Users/jie/.openclaw/workspace-agents/coordinator` |
| **QQ 账号** | 复用客服小暖 (1903488919) 或其他 |
| **Emoji** | 🏢 |

### 角色定位

公司小秘是一人公司的 CEO 助理，负责：
- 协调各部门（产品/技术/财务/客服）意见
- 在群聊中提供多角度专业建议
- 保持回复简洁高效（每角色 1-2 句话）

---

## 💬 使用示例

### 在群里发送：
```
我们要做一个新的用户系统
```

### 公司小秘回复：
```
🏢 一人公司意见汇总：

📊 产品：建议先明确目标用户和使用场景，核心功能是注册登录还是包含会员体系？
⚙️ 技术：数据库用 PostgreSQL 吧，用户表设计要考虑扩展性，我来搞表结构。
💰 财务：这个项目的预算多少？开发成本记得记录一下~
🎧 客服：上线后用户问题我来处理，需要提前准备 FAQ 吗？

💡 综合建议：先开个小会确定需求范围，我帮大家安排？
```

---

## 🚀 启用步骤

### 方案 A：群聊广播模式（推荐）

1. **创建 QQ 群**
   - 群名称：一人公司 🏢
   - 邀请：公司小秘（用客服小暖的 QQ: 1903488919）

2. **获取群 OpenID**
   ```bash
   openclaw logs --follow | grep qqbot
   ```
   发送一条消息到群里，找到 `group_openid=xxxxx`

3. **更新配置**
   编辑 `/Users/jie/.openclaw/openclaw.json`：
   ```json
   {
     "broadcast": {
       "strategy": "parallel",
       "GROUP_OPENID": ["coordinator"]
     }
   }
   ```
   将 `GROUP_OPENID` 替换为实际的群 ID

4. **重启 Gateway**
   ```bash
   openclaw gateway restart
   ```

### 方案 B：私聊指定模式

如果群聊广播不可用，可以私聊公司小秘，用前缀触发：

```
#群聊 我们要做一个新的用户系统
```

公司小秘检测到 `#群聊` 前缀时，使用多角色回复模式。

---

## 📊 完整 Agent 列表

| 角色 | Agent ID | QQ Bot | 职责 |
|------|----------|--------|------|
| 📊 产品小助手 | `product-manager` | 1903516201 | 需求分析、产品规划 |
| ⚙️ 后端老张 | `backend-engineer` | 1903517106 | API 设计、数据库、架构 |
| 🎨 前端小美 | `frontend-engineer` | 1903517154 | UI 开发、组件、性能优化 |
| 💰 财务小慧 | `finance-assistant` | 1903516313 | 账务、预算、**Token 统计** |
| 🎧 客服小暖 | `customer-service` | 1903488919 | 用户支持、问题解答 |
| 🏢 公司小秘 | `coordinator` | (复用) | **群聊多角色协调** ⭐ |

---

## 🎭 各角色单独咨询

也可以单独 @或私聊每个角色：

**产品小助手** (QQ: 1903516201)
```
帮我写一个用户注册功能的需求文档
```

**后端老张** (QQ: 1903517106)
```
设计一个用户表的数据库结构
```

**前端小美** (QQ: 1903517154)
```
帮我写一个登录页面的 React 组件
```

**财务小慧** (QQ: 1903516313)
```
记录一笔 1000 元的收入
```

**客服小暖** (QQ: 1903488919)
```
用户说忘记密码了，怎么回复？
```

**公司小秘** (群聊)
```
我们要做一个新的用户系统
```
→ 自动汇总所有部门意见

---

## 📁 配置文件

| 文件 | 用途 |
|------|------|
| `/Users/jie/.openclaw/openclaw.json` | 主配置（已添加 coordinator） |
| `/Users/jie/.openclaw/workspace-agents/coordinator/SOUL.md` | 公司小秘角色定义 |
| `/Users/jie/.openclaw/workspace-agents/SINGLE-BOT-MULTI-ROLE.md` | 单 Bot 多角色方案说明 |
| `/Users/jie/.openclaw/workspace-agents/GROUP-CHAT-GUIDE.md` | 群聊配置指南 |

---

## 🧪 测试命令

```bash
# 查看配置
openclaw status

# 查看 Agent 列表
openclaw sessions list

# 重启 Gateway
openclaw gateway restart

# 查看日志
openclaw logs --follow | grep qqbot
```

---

## ⚠️ 注意事项

1. **群 OpenID 不是群号** - 需要从日志中获取
2. **广播组功能实验性** - QQBot 支持可能有限
3. **Token 消耗** - 多角色回复消耗更多 Token（约 2-3 倍）
4. **财务日报** - 每天 9:00 发送到 QQ 623397674

---

## ✅ 立即开始

**最简单的方式：**

1. 用客服小暖 (QQ: 1903488919) 创建一个群
2. 给群起名"一人公司 🏢"
3. 在群里发消息测试

公司小秘会自动以多角色模式回复！

---
_创建时间：2026-03-15_
