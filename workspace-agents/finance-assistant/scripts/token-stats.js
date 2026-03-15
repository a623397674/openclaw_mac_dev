#!/usr/bin/env node

/**
 * Token 消耗统计脚本
 * 读取各 Agent 的 session 数据，生成昨日消耗报告
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Agent 列表
const AGENTS = [
  { id: 'product-manager', name: '产品小助手', emoji: '📊' },
  { id: 'backend-engineer', name: '后端老张', emoji: '⚙️' },
  { id: 'frontend-engineer', name: '前端小美', emoji: '🎨' },
  { id: 'finance-assistant', name: '财务小慧', emoji: '💰' },
  { id: 'customer-service', name: '客服小暖', emoji: '🎧' }
];

// 模型价格（每 1000 tokens，人民币）
const MODEL_PRICES = {
  'qwen3.5-plus': { input: 0.002, output: 0.006 },
  'qwen3-max': { input: 0.04, output: 0.12 },
  'default': { input: 0.002, output: 0.006 }
};

// 基础路径
const BASE_PATH = '/Users/jie/.openclaw';
const AGENTS_PATH = path.join(BASE_PATH, 'agents');

/**
 * 读取 Agent 的 session 数据
 */
function readAgentSessions(agentId) {
  const sessionsPath = path.join(AGENTS_PATH, agentId, 'sessions', 'sessions.json');
  
  if (!fs.existsSync(sessionsPath)) {
    return { totalTokens: 0, inputTokens: 0, outputTokens: 0 };
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
    let totalInput = 0;
    let totalOutput = 0;
    
    // 遍历所有 session
    if (Array.isArray(data)) {
      for (const session of data) {
        if (session.usage) {
          totalInput += session.usage.inputTokens || 0;
          totalOutput += session.usage.outputTokens || 0;
        }
        // 有些格式是 tokens 字段
        if (session.tokens) {
          totalInput += session.tokens.input || 0;
          totalOutput += session.tokens.output || 0;
        }
      }
    }
    
    return {
      totalTokens: totalInput + totalOutput,
      inputTokens: totalInput,
      outputTokens: totalOutput
    };
  } catch (err) {
    console.error(`读取 ${agentId} sessions 失败:`, err.message);
    return { totalTokens: 0, inputTokens: 0, outputTokens: 0 };
  }
}

/**
 * 计算成本
 */
function calculateCost(inputTokens, outputTokens, modelId = 'default') {
  const prices = MODEL_PRICES[modelId] || MODEL_PRICES['default'];
  const inputCost = (inputTokens / 1000) * prices.input;
  const outputCost = (outputTokens / 1000) * prices.output;
  return inputCost + outputCost;
}

/**
 * 生成报告
 */
function generateReport() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split('T')[0];
  
  const results = [];
  let grandTotal = 0;
  let grandCost = 0;
  
  for (const agent of AGENTS) {
    const stats = readAgentSessions(agent.id);
    const cost = calculateCost(stats.inputTokens, stats.outputTokens);
    
    results.push({
      ...agent,
      ...stats,
      cost
    });
    
    grandTotal += stats.totalTokens;
    grandCost += cost;
  }
  
  // 生成报告文本
  let report = `📊 Token 消耗日报 (${dateStr})\n`;
  report += '━'.repeat(30) + '\n';
  
  for (const r of results) {
    report += `${r.emoji} ${r.name}：${r.totalTokens.toLocaleString()} tokens (¥${r.cost.toFixed(2)})\n`;
  }
  
  report += '━'.repeat(30) + '\n';
  report += `合计：${grandTotal.toLocaleString()} tokens (¥${grandCost.toFixed(2)})\n`;
  
  return {
    date: dateStr,
    text: report,
    totalTokens: grandTotal,
    totalCost: grandCost,
    details: results
  };
}

/**
 * 发送 QQ 消息
 */
function sendQQMessage(targetId, message) {
  try {
    // 使用 openclaw CLI 发送消息
    const cmd = `openclaw message send --channel "qqbot" --target "qqbot:c2c:${targetId}" --message "${message.replace(/"/g, '\\"')}"`;
    execSync(cmd, { stdio: 'pipe' });
    console.log('消息发送成功');
  } catch (err) {
    console.error('发送消息失败:', err.message);
    process.exit(1);
  }
}

// 主程序
function main() {
  const report = generateReport();
  
  console.log(report.text);
  
  // 发送给用户
  const targetQQ = '623397674';
  console.log(`\n发送报告到 QQ: ${targetQQ}`);
  sendQQMessage(targetQQ, report.text);
  
  // 保存报告到文件
  const reportPath = path.join(BASE_PATH, 'workspace-agents', 'finance-assistant', 'memory', `token-report-${report.date}.md`);
  const memoryDir = path.dirname(reportPath);
  
  if (!fs.existsSync(memoryDir)) {
    fs.mkdirSync(memoryDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, `# Token 消耗日报 (${report.date})\n\n${report.text}\n\n## 详细数据\n\n${JSON.stringify(report.details, null, 2)}\n`);
  console.log(`报告已保存：${reportPath}`);
}

main();
