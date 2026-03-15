# 多 Agent 角色配置说明

## 🎯 角色列表

| 角色 | Agent ID | QQ Bot | 职责 | Emoji |
|------|----------|--------|------|-------|
| 产品小助手 | `product-manager` | 1903516201 | 需求分析、PRD、产品规划 | 📊 |
| 后端老张 | `backend-engineer` | 1903517106 | API 设计、数据库、架构 | ⚙️ |
| 前端小美 | `frontend-engineer` | 1903517154 | UI 开发、组件、性能优化 | 🎨 |
| 财务小慧 | `finance-assistant` | 1903516313 | 账务、预算、报表 | 💰 |
| 客服小暖 | `customer-service` | 1903488919 | 用户支持、问题解答 | 🎧 |

## 📋 每个角色的职责

### 📊 产品小助手
**能做的事：**
- 需求分析与拆解
- 撰写 PRD 文档
- 用户故事地图
- 竞品分析
- 数据指标设计（OKR、北极星指标）
- 原型设计建议

**典型问题：**
- "帮我写一个用户登录功能的 PRD"
- "分析一下这个需求的优先级"
- "设计一个电商 APP 的核心指标"

### ⚙️ 后端老张
**能做的事：**
- API 设计（REST/gRPC/GraphQL）
- 数据库设计与优化
- 微服务架构
- 缓存策略
- 消息队列
- 容器化与编排
- CI/CD 流水线

**典型问题：**
- "设计一个用户系统的数据库表结构"
- "这个接口的 QPS 预期是 1000，怎么优化？"
- "帮我写一个 Go 的 HTTP 服务框架"

### 🎨 前端小美
**能做的事：**
- React/Vue组件开发
- TypeScript 类型设计
- CSS/Tailwind样式
- 状态管理
- 性能优化（LCP/CLS/INP）
- PWA 和离线能力

**典型问题：**
- "帮我写一个 React 的表单组件"
- "这个页面在移动端怎么适配？"
- "优化一下这个页面的加载速度"

### 💰 财务小慧
**能做的事：**
- 日常账务处理
- 预算编制与跟踪
- 财务报表
- 税务申报提醒
- 成本分析与控制
- 发票与报销管理

**典型问题：**
- "帮我记录一笔 500 元的办公支出"
- "这个月的预算还剩多少？"
- "生成一个简化的利润表"

### 🎧 客服小暖
**能做的事：**
- 常见问题解答
- 问题诊断与排查
- 投诉处理与安抚
- 用户引导与培训
- 反馈收集

**典型问题：**
- "用户说登录不上，怎么回复？"
- "帮我写一个产品使用指南"
- "处理一个用户投诉"

## 🧪 测试方法

### 1. 重启 Gateway
```bash
openclaw gateway restart
```

### 2. 验证配置
```bash
openclaw status
```

### 3. 测试每个角色
用对应的 QQ 账号发送消息，验证是否由正确的 Agent 回复：

- **产品小助手** (QQ: 1903516201)
  ```
  帮我写一个用户注册功能的需求文档
  ```

- **后端老张** (QQ: 1903517106)
  ```
  设计一个用户表的数据库结构
  ```

- **前端小美** (QQ: 1903517154)
  ```
  帮我写一个登录页面的 React 组件
  ```

- **财务小慧** (QQ: 1903516313)
  ```
  记录一笔 1000 元的收入
  ```

- **客服小暖** (QQ: 1903488919)
  ```
  用户说忘记密码了，怎么回复？
  ```

## 📁 工作区结构

```
~/.openclaw/workspace-agents/
├── product-manager/
│   ├── SOUL.md
│   ├── IDENTITY.md
│   ├── USER.md
│   ├── AGENTS.md
│   └── memory/
├── backend-engineer/
├── frontend-engineer/
├── finance-assistant/
└── customer-service/
```

每个 Agent 有独立的：
- 角色定义（SOUL.md）
- 身份信息（IDENTITY.md）
- 用户信息（USER.md）
- 工作规范（AGENTS.md）
- 记忆系统（memory/）

## ⚙️ 配置说明

### openclaw.json 关键配置

**Agents 定义：**
```json
"agents": {
  "list": [
    {
      "id": "product-manager",
      "name": "产品小助手",
      "workspace": "/Users/jie/.openclaw/workspace-agents/product-manager"
    }
  ]
}
```

**Bindings 路由：**
```json
"bindings": [
  {
    "match": { "channel": "qqbot", "accountId": "product-manager" },
    "agentId": "product-manager"
  }
]
```

**QQBot 多账户：**
```json
"channels": {
  "qqbot": {
    "accounts": {
      "product-manager": {
        "appId": "1903516201",
        "clientSecret": "iMp46vWu54ua3HH3"
      }
    }
  }
}
```

## 🔄 日常维护

### 添加新角色
1. 创建 workspace 目录
2. 复制 SOUL.md 等配置文件
3. 修改角色定义
4. 更新 openclaw.json

### 查看 Agent 状态
```bash
openclaw sessions list
```

### 清理记忆
```bash
# 删除某个 Agent 的记忆
rm -rf ~/.openclaw/workspace-agents/<agent-id>/memory/*
```

## 📝 注意事项

1. **每个 QQ 账号的 OpenID 是独立的** - 不能用机器人 A 的 OpenID 给机器人 B 发消息
2. **配置修改后需要重启 Gateway** - `openclaw gateway restart`
3. **每个 Agent 有独立的记忆** - 不会共享上下文
4. **WebChat 默认连接到选中的 Agent** - 可以在 Control UI 中切换

---
_创建时间：2026-03-15_
