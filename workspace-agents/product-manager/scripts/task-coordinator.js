#!/usr/bin/env node

/**
 * 一人公司任务协调脚本
 * 产品小助手使用此脚本分发任务给其他 Bot
 */

const BOT_CONFIG = {
  'product-manager': { name: '产品小助手', qq: '1903516201', emoji: '📊' },
  'backend-engineer': { name: '后端老张', qq: '1903517106', emoji: '⚙️' },
  'frontend-engineer': { name: '前端小美', qq: '1903517154', emoji: '🎨' },
  'finance-assistant': { name: '财务小慧', qq: '1903516313', emoji: '💰' },
  'customer-service': { name: '客服小暖', qq: '1903488919', emoji: '🎧' }
};

/**
 * 任务类型识别
 */
function identifyTaskType(message) {
  const keywords = {
    'product': ['需求', '产品', '功能', '用户', 'PRD', '规划'],
    'backend': ['数据库', 'API', '后端', '服务器', '架构', '性能'],
    'frontend': ['前端', '界面', 'UI', '页面', '组件', 'React', 'Vue'],
    'finance': ['预算', '成本', '财务', '钱', '支出', '收入', '记账'],
    'support': ['客服', '用户问题', '投诉', '反馈', '帮助']
  };
  
  const scores = {};
  for (const [type, words] of Object.entries(keywords)) {
    scores[type] = words.filter(w => message.includes(w)).length;
  }
  
  // 返回得分最高的类型
  const maxType = Object.entries(scores).reduce((a, b) => 
    scores[a[0]] > scores[b[0]] ? a : b
  )[0];
  
  return scores[maxType] > 0 ? maxType : 'product';
}

/**
 * 获取需要协同的 Bot
 */
function getCollaborators(taskType) {
  const mapping = {
    'product': ['product-manager'],
    'backend': ['product-manager', 'backend-engineer'],
    'frontend': ['product-manager', 'frontend-engineer'],
    'finance': ['product-manager', 'finance-assistant'],
    'support': ['product-manager', 'customer-service'],
    'complex': ['product-manager', 'backend-engineer', 'frontend-engineer', 'finance-assistant', 'customer-service']
  };
  
  return mapping[taskType] || ['product-manager'];
}

/**
 * 生成任务分发消息
 */
function generateTaskMessage(taskType, originalMessage, collaborators) {
  const taskDescriptions = {
    'product': '请分析这个产品需求，给出专业建议。',
    'backend': '请从技术架构角度评估这个需求，给出实现方案。',
    'frontend': '请从前端/UI 角度评估这个需求，给出实现建议。',
    'finance': '请评估这个需求的成本和预算，给出财务建议。',
    'support': '请从客服角度评估这个需求，考虑用户支持问题。'
  };
  
  return `【任务分发】
类型：${taskType}
原始需求：${originalMessage}
请${taskDescriptions[taskType]}
请在 1 分钟内回复。`;
}

/**
 * 汇总各 Bot 回复
 */
function summarizeResponses(responses) {
  let summary = '';
  
  for (const [botId, response] of Object.entries(responses)) {
    const bot = BOT_CONFIG[botId];
    summary += `${bot.emoji} ${bot.name}：${response}\n\n`;
  }
  
  return summary;
}

/**
 * 主函数 - 处理任务
 */
async function handleTask(message) {
  console.log('⏱️ 任务开始处理：', message);
  const startTime = Date.now();
  
  // 1. 识别任务类型
  const taskType = identifyTaskType(message);
  console.log('📋 任务类型：', taskType);
  
  // 2. 获取协同 Bot
  const collaborators = getCollaborators(taskType);
  console.log('🤝 协同 Bot：', collaborators);
  
  // 3. 发送确认消息（30 秒内）
  console.log('✅ 发送确认：收到！我来帮你处理这个需求。预计 3 分钟内给你完整方案。');
  
  // 4. 分发任务给各 Bot（模拟）
  const responses = {};
  for (const botId of collaborators) {
    console.log(`📤 分发任务给 ${BOT_CONFIG[botId].name}...`);
    // 实际场景：调用 sessions_send 或其他 Bot 通信机制
    responses[botId] = `[${BOT_CONFIG[botId].name}的专业回复]`;
  }
  
  // 5. 汇总回复（2-3 分钟）
  const summary = summarizeResponses(responses);
  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log(`✅ 任务完成，耗时：${elapsedTime}秒`);
  console.log('\n📊 汇总回复：\n', summary);
  
  return {
    taskType,
    collaborators,
    summary,
    elapsedTime
  };
}

// CLI 入口
if (require.main === module) {
  const message = process.argv.slice(2).join(' ');
  if (!message) {
    console.log('用法：node task-coordinator.js <任务描述>');
    process.exit(1);
  }
  
  handleTask(message);
}

module.exports = { handleTask, identifyTaskType, getCollaborators };
