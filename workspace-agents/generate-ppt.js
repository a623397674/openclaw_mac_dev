const PptxGenJS = require('pptxgenjs');
const path = require('path');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';

const colors = {
  primary: '1E40AF',
  accent: 'D97706',
  dark: '1F2937',
  gray: '6B7280',
  lightGray: 'F3F4F6',
  white: 'FFFFFF',
  product: '047857',
  backend: 'B45309',
  frontend: 'BE185D',
  finance: '6D28D9',
  service: 'B91C1C'
};

// ============ 第 1 页：封面 ============
let slide = pptx.addSlide();
slide.background = { color: colors.white };

// 顶部色带 - 用文本框模拟
slide.addText('', { x: 0, y: 0, w: 10, h: 0.8, fill: { color: colors.primary } });

slide.addText('一人公司', {
  x: 0, y: 2, w: 10, h: 1.5,
  fontSize: 64, color: colors.primary, bold: true, align: 'center',
  fontFace: 'Microsoft YaHei'
});

slide.addText('AI 驱动的高效团队', {
  x: 0, y: 3.3, w: 10, h: 0.8,
  fontSize: 28, color: colors.gray, align: 'center',
  fontFace: 'Microsoft YaHei'
});

slide.addText('3 分钟响应 · 5 个专业角色 · 24/7 在线', {
  x: 0, y: 4, w: 10, h: 0.6,
  fontSize: 20, color: colors.accent, align: 'center', bold: true,
  fontFace: 'Microsoft YaHei'
});

slide.addText('', { x: 0, y: 5.2, w: 10, h: 0.3, fill: { color: colors.lightGray } });
slide.addText('2026 年 3 月', {
  x: 0, y: 5.25, w: 10, h: 0.2,
  fontSize: 14, color: colors.gray, align: 'center'
});

// ============ 第 2 页：目录 ============
slide = pptx.addSlide();
slide.background = { color: colors.white };

slide.addText('目录', {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 40, color: colors.primary, bold: true,
  fontFace: 'Microsoft YaHei'
});

slide.addText('━━━', {
  x: 0.5, y: 1.35, w: 1.5, h: 0.2,
  fontSize: 30, color: colors.accent, align: 'center'
});

const toc = [
  { num: '01', title: '团队概述', desc: '核心优势与定位' },
  { num: '02', title: '团队成员', desc: '5 个专业角色' },
  { num: '03', title: '工作流程', desc: '3 分钟响应机制' },
  { num: '04', title: '服务承诺', desc: '我们的保证' }
];

toc.forEach((item, i) => {
  const y = 2 + i * 1.2;
  slide.addText(item.num, {
    x: 0.5, y: y, w: 0.8, h: 0.8,
    fontSize: 18, color: colors.white, bold: true, align: 'center', valign: 'middle',
    fill: { color: i % 2 === 0 ? colors.primary : colors.accent }
  });
  slide.addText(item.title, {
    x: 1.5, y: y + 0.1, w: 3, h: 0.5,
    fontSize: 24, color: colors.dark, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  slide.addText(item.desc, {
    x: 1.5, y: y + 0.55, w: 3, h: 0.35,
    fontSize: 16, color: colors.gray,
    fontFace: 'Microsoft YaHei'
  });
});

// ============ 第 3 页：团队概述 ============
slide = pptx.addSlide();
slide.background = { color: colors.white };

slide.addText('团队概述', {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 40, color: colors.primary, bold: true,
  fontFace: 'Microsoft YaHei'
});

slide.addText('━━━', {
  x: 0.5, y: 1.35, w: 1.5, h: 0.2,
  fontSize: 30, color: colors.accent, align: 'center'
});

slide.addText('我们是一支由 AI 驱动的精英团队，\n5 个专业角色协同工作，3 分钟内响应您的需求。', {
  x: 0.5, y: 1.8, w: 9, h: 1,
  fontSize: 22, color: colors.dark, lineSpacing: 40,
  fontFace: 'Microsoft YaHei'
});

const advantages = [
  { icon: '⚡', title: '极速响应', desc: '3 分钟内给出完整方案' },
  { icon: '🎯', title: '专业分工', desc: '5 个角色各司其职' },
  { icon: '🤖', title: 'AI 驱动', desc: '24/7 全天候在线' },
  { icon: '💰', title: '透明计费', desc: 'Token 消耗每日报告' }
];

advantages.forEach((item, i) => {
  const x = 0.5 + i * 2.35;
  const y = 3.3;
  slide.addText('┌────────────┐', {
    x: x, y: y, w: 2.2, h: 0.5,
    fontSize: 14, color: colors.primary, align: 'center'
  });
  slide.addText('│            │', {
    x: x, y: y + 0.4, w: 2.2, h: 0.5,
    fontSize: 14, color: colors.primary, align: 'center'
  });
  slide.addText('└────────────┘', {
    x: x, y: y + 0.8, w: 2.2, h: 0.5,
    fontSize: 14, color: colors.primary, align: 'center'
  });
  slide.addText(item.icon, {
    x: x + 0.15, y: y + 0.15, w: 0.6, h: 0.6,
    fontSize: 36
  });
  slide.addText(item.title, {
    x: x + 0.85, y: y + 0.2, w: 1.2, h: 0.5,
    fontSize: 18, color: colors.primary, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  slide.addText(item.desc, {
    x: x + 0.85, y: y + 0.7, w: 1.2, h: 0.8,
    fontSize: 14, color: colors.gray,
    fontFace: 'Microsoft YaHei'
  });
});

// 角色页面生成函数
function createRoleSlide(name, emoji, subtitle, duties, qq, time, color) {
  const s = pptx.addSlide();
  s.background = { color: colors.white };
  
  // 左侧色条
  s.addText('', { x: 0, y: 0, w: 0.3, h: 5.5, fill: { color: color } });
  
  s.addText(emoji + ' ' + name, {
    x: 0.6, y: 0.5, w: 9, h: 0.8,
    fontSize: 40, color: color, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  s.addText('━━━', {
    x: 0.6, y: 1.35, w: 1.5, h: 0.2,
    fontSize: 30, color: color, align: 'center'
  });
  
  s.addText(subtitle, {
    x: 0.6, y: 1.8, w: 4, h: 0.5,
    fontSize: 20, color: colors.gray,
    fontFace: 'Microsoft YaHei'
  });
  
  s.addText('主要职责', {
    x: 0.6, y: 2.5, w: 4, h: 0.4,
    fontSize: 18, color: colors.dark, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  duties.forEach((item, i) => {
    s.addText('• ' + item, {
      x: 0.8, y: 3 + i * 0.5, w: 3.8, h: 0.45,
      fontSize: 16, color: colors.dark,
      fontFace: 'Microsoft YaHei'
    });
  });
  
  // 右侧联系方式框
  s.addText('┌──────────────────┐', {
    x: 5.5, y: 2.5, w: 4, h: 0.5,
    fontSize: 14, color: color, align: 'center', fill: { color: color }
  });
  s.addText('│                  │', {
    x: 5.5, y: 2.9, w: 4, h: 0.5,
    fontSize: 14, color: color, align: 'center', fill: { color: color }
  });
  s.addText('│                  │', {
    x: 5.5, y: 3.3, w: 4, h: 0.5,
    fontSize: 14, color: color, align: 'center', fill: { color: color }
  });
  s.addText('│                  │', {
    x: 5.5, y: 3.7, w: 4, h: 0.5,
    fontSize: 14, color: color, align: 'center', fill: { color: color }
  });
  s.addText('└──────────────────┘', {
    x: 5.5, y: 4.1, w: 4, h: 0.5,
    fontSize: 14, color: color, align: 'center', fill: { color: color }
  });
  
  s.addText('联系方式', {
    x: 5.7, y: 2.65, w: 3.6, h: 0.4,
    fontSize: 18, color: colors.white, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  s.addText('QQ: ' + qq, {
    x: 5.7, y: 3.25, w: 3.6, h: 0.6,
    fontSize: 28, color: colors.white, bold: true, align: 'center',
    fontFace: 'Microsoft YaHei'
  });
  
  s.addText(time, {
    x: 5.7, y: 4.25, w: 3.6, h: 0.5,
    fontSize: 36, color: colors.white, bold: true, align: 'center',
    fontFace: 'Microsoft YaHei'
  });
}

createRoleSlide('产品小助手', '📊', '统一入口 · 任务协调', ['需求分析与拆解', '产品规划与 PRD 撰写', '任务协调与分发', '跨部门沟通协作'], '1903516201', '< 30 秒', colors.product);
createRoleSlide('后端老张', '⚙️', '技术架构 · 后端开发', ['API 设计与开发', '数据库设计与优化', '微服务架构', '性能与安全'], '1903517106', '< 1 分钟', colors.backend);
createRoleSlide('前端小美', '🎨', 'UI 开发 · 用户体验', ['React/Vue组件开发', 'UI/UX 设计与实现', '性能优化', '跨端适配'], '1903517154', '< 1 分钟', colors.frontend);
createRoleSlide('财务小慧', '💰', '账务管理 · Token 统计', ['日常账务处理', '预算编制与跟踪', 'Token 消耗统计', '财务报表'], '1903516313', '< 1 分钟', colors.finance);
createRoleSlide('客服小暖', '🎧', '用户支持 · 问题解答', ['常见问题解答', '问题诊断与排查', '投诉处理', '用户反馈收集'], '1903488919', '< 1 分钟', colors.service);

// ============ 第 9 页：工作流程 ============
slide = pptx.addSlide();
slide.background = { color: colors.white };

slide.addText('工作流程', {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 40, color: colors.primary, bold: true,
  fontFace: 'Microsoft YaHei'
});

slide.addText('━━━', {
  x: 0.5, y: 1.35, w: 1.5, h: 0.2,
  fontSize: 30, color: colors.accent, align: 'center'
});

const steps = [
  { icon: '📩', title: '用户私聊', desc: '产品小助手', time: '0 秒' },
  { icon: '🔍', title: '分析任务', desc: '识别类型', time: '30 秒' },
  { icon: '🤝', title: '分发协同', desc: '各 Bot 处理', time: '1 分钟' },
  { icon: '✅', title: '汇总回复', desc: '统一方案', time: '3 分钟' }
];

// 时间轴线
slide.addText('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', {
  x: 0.8, y: 3.45, w: 8.4, h: 0.2,
  fontSize: 18, color: colors.primary, align: 'center'
});

steps.forEach((step, i) => {
  const x = 1 + i * 2.2;
  
  slide.addText('●', {
    x: x - 0.15, y: 3.4, w: 0.4, h: 0.3,
    fontSize: 24, color: colors.primary, align: 'center'
  });
  
  slide.addText(step.icon, {
    x: x - 0.35, y: 2.3, w: 0.7, h: 0.7,
    fontSize: 40
  });
  
  slide.addText(step.title, {
    x: x - 0.6, y: 3.9, w: 1.2, h: 0.4,
    fontSize: 16, color: colors.primary, bold: true, align: 'center',
    fontFace: 'Microsoft YaHei'
  });
  
  slide.addText(step.desc, {
    x: x - 0.6, y: 4.35, w: 1.2, h: 0.3,
    fontSize: 13, color: colors.gray, align: 'center',
    fontFace: 'Microsoft YaHei'
  });
  
  slide.addText(step.time, {
    x: x - 0.6, y: 4.7, w: 1.2, h: 0.35,
    fontSize: 16, color: colors.accent, bold: true, align: 'center',
    fontFace: 'Microsoft YaHei'
  });
});

// ============ 第 10 页：服务承诺 ============
slide = pptx.addSlide();
slide.background = { color: colors.primary };

slide.addText('服务承诺', {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 40, color: colors.white, bold: true,
  fontFace: 'Microsoft YaHei'
});

slide.addText('━━━', {
  x: 0.5, y: 1.35, w: 1.5, h: 0.2,
  fontSize: 30, color: colors.white, align: 'center'
});

const promises = [
  { icon: '⏱️', title: '3 分钟响应', desc: '复杂任务先确认，3 分钟内给完整方案' },
  { icon: '🎯', title: '专业分工', desc: '5 个角色各司其职，专业高效' },
  { icon: '🔒', title: '数据安全', desc: '私聊模式，数据严格保密' },
  { icon: '💰', title: '透明计费', desc: 'Token 消耗每日报告，清晰透明' }
];

promises.forEach((item, i) => {
  const x = 0.5 + (i % 2) * 4.7;
  const y = 1.9 + Math.floor(i / 2) * 1.7;
  
  slide.addText('◤        ◥', {
    x: x, y: y, w: 0.8, h: 0.8,
    fontSize: 20, color: colors.white, align: 'center', fill: { color: colors.white, transparency: 80 }
  });
  
  slide.addText(item.icon, {
    x: x + 0.1, y: y + 0.1, w: 0.6, h: 0.6,
    fontSize: 28
  });
  
  slide.addText(item.title, {
    x: x + 1, y: y + 0.15, w: 3.5, h: 0.45,
    fontSize: 20, color: colors.white, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  slide.addText(item.desc, {
    x: x + 1, y: y + 0.6, w: 3.5, h: 0.7,
    fontSize: 15, color: 'E0E7FF',
    fontFace: 'Microsoft YaHei'
  });
});

// ============ 第 11 页：结束页 ============
slide = pptx.addSlide();
slide.background = { color: colors.white };

slide.addText('立即开始', {
  x: 0, y: 1.5, w: 10, h: 1.2,
  fontSize: 56, color: colors.primary, bold: true, align: 'center',
  fontFace: 'Microsoft YaHei'
});

slide.addText('添加产品小助手 QQ，开始您的第一个任务！', {
  x: 0, y: 2.7, w: 10, h: 0.8,
  fontSize: 24, color: colors.gray, align: 'center',
  fontFace: 'Microsoft YaHei'
});

slide.addText('┌──────────────────────┐', {
  x: 2.5, y: 3.5, w: 5, h: 0.7,
  fontSize: 16, color: colors.primary, align: 'center'
});
slide.addText('│                      │', {
  x: 2.5, y: 4.1, w: 5, h: 0.7,
  fontSize: 16, color: colors.primary, align: 'center'
});
slide.addText('└──────────────────────┘', {
  x: 2.5, y: 4.7, w: 5, h: 0.7,
  fontSize: 16, color: colors.primary, align: 'center'
});

slide.addText('1903516201', {
  x: 2.5, y: 3.65, w: 5, h: 1,
  fontSize: 44, color: colors.white, bold: true, align: 'center', valign: 'middle',
  fontFace: 'Microsoft YaHei', fill: { color: colors.primary }
});

slide.addText('2026 年 3 月 15 日 · 一人公司', {
  x: 0, y: 5.2, w: 10, h: 0.3,
  fontSize: 14, color: colors.gray, align: 'center'
});

const outputPath = path.join(__dirname, '一人公司团队介绍.pptx');
pptx.writeFile({ fileName: outputPath }).then(() => {
  console.log('✅ PPT 生成成功：', outputPath);
}).catch(err => {
  console.error('❌ PPT 生成失败：', err);
  process.exit(1);
});
