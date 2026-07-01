/**
 * 格式化记录数据展示
 */
function formatRecordData(r) {
  let s = '';
  if (r.data) s += `${r.data.value}${r.data.unit} `;
  if (r.extra) s += `${r.extra.value}${r.extra.unit}`;
  return s.trim();
}

/**
 * 获取随机成功话术
 */
function getRandomMsg(arr) {
  return arr ? arr[Math.floor(Math.random() * arr.length)] : '太棒了，继续加油！🎉';
}

/**
 * 格式化日期
 */
function formatDate(isoStr) {
  const d = new Date(isoStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return `${m}月${day}日 ${weekDays[d.getDay()]}`;
}

/**
 * 简单日期
 */
function shortDate(isoStr) {
  const d = new Date(isoStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

module.exports = { formatRecordData, getRandomMsg, formatDate, shortDate };
