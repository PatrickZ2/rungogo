// 运动类型配置
const SPORT_TYPES = [
  { id: 'football',  name: '足球', icon: '⚽', unit: '分钟', unitLabel: '运动时长', dataField: 'duration' },
  { id: 'basketball', name: '篮球', icon: '🏀', unit: '分钟', unitLabel: '运动时长', dataField: 'duration' },
  { id: 'rope',      name: '跳绳', icon: '🏃', unit: '次',   unitLabel: '跳绳次数', dataField: 'count' },
  { id: 'running',   name: '跑步', icon: '🏃', unit: 'km',  unitLabel: '跑步距离', dataField: 'distance', extra: { unit: '分钟', label: '用时', field: 'duration' } },
  { id: 'swimming',  name: '游泳', icon: '🏊', unit: '米',   unitLabel: '游泳距离', dataField: 'distance' },
  { id: 'pushup',    name: '俯卧撑', icon: '💪', unit: '个', unitLabel: '完成个数', dataField: 'count' },
  { id: 'situp',     name: '仰卧起坐', icon: '🧘', unit: '个', unitLabel: '完成个数', dataField: 'count' },
  { id: 'cycling',   name: '骑车', icon: '🚴', unit: 'km',  unitLabel: '骑行距离', dataField: 'distance' },
  { id: 'custom',    name: '自定义', icon: '🌟', unit: '',   unitLabel: '请输入数据', dataField: 'custom' },
];

// 星球配置
const PLANETS = [
  { id: 'football',   name: '足球星', icon: '⚽', color: '#00B894' },
  { id: 'basketball', name: '篮球星', icon: '🏀', color: '#E17055' },
  { id: 'rope',       name: '跳跃星', icon: '🏃', color: '#6C5CE7' },
  { id: 'running',    name: '跑步星', icon: '🏃', color: '#0984E3' },
  { id: 'swimming',   name: '游泳星', icon: '🏊', color: '#00CEC9' },
  { id: 'strength',   name: '力量星', icon: '💪', color: '#FDCB6E' },
];

// 勋章配置
const BADGE_DEFS = [
  { id: 'first_checkin', icon: '🥇', name: '初次出发', desc: '完成第一次打卡', condition: (records) => records.length >= 1 },
  { id: 'streak_3',      icon: '🔥', name: '三天小火', desc: '连续打卡 3 天', condition: (_, user) => (user.streak || 0) >= 3 },
  { id: 'streak_7',      icon: '🔥', name: '一周火焰', desc: '连续打卡 7 天', condition: (_, user) => (user.streak || 0) >= 7 },
  { id: 'streak_30',     icon: '🌋', name: '月度强者', desc: '连续打卡 30 天', condition: (_, user) => (user.streak || 0) >= 30 },
  { id: 'sport_5',       icon: '🌟', name: '全能新星', desc: '完成 5 种不同运动', condition: (records) => new Set(records.map(r => r.sportId)).size >= 5 },
  { id: 'count_10_ball', icon: '⚽', name: '足球小将', desc: '足球打卡 10 次', condition: (records) => records.filter(r => r.sportId === 'football').length >= 10 },
  { id: 'count_10_run',  icon: '🏃', name: '跑步达人', desc: '跑步打卡 10 次', condition: (records) => records.filter(r => r.sportId === 'running').length >= 10 },
  { id: 'total_20',      icon: '🏆', name: '运动之星', desc: '累计打卡 20 次', condition: (records) => records.length >= 20 },
  { id: 'total_50',      icon: '👑', name: '超级英雄', desc: '累计打卡 50 次', condition: (records) => records.length >= 50 },
];

// 打卡成功话术
const SUCCESS_MSGS = {
  football:  ['太棒了！足球小将！⚽', '传球射门，你是最棒的！', '球场上的闪电侠！'],
  basketball: ['篮球高手！🏀 继续加油！', '三分球准心满分！', '篮下无敌！'],
  rope:       ['跳绳小飞人！🏃 跳得真快！', '绳子挥得像风一样！'],
  running:    ['跑步小飞侠！🏃 风一样的少年！', '坚持就是胜利！', '跑出精彩！'],
  swimming:   ['游泳健将！🏊 在水中自由翱翔！'],
  pushup:     ['力量在增长！💪 你越来越强了！'],
  situp:      ['腹肌在召唤！🧘 加油！'],
  cycling:    ['骑行快乐！🚴 下一站更精彩！'],
  custom:     ['运动快乐！🌟 每一种运动都很棒！'],
};

module.exports = { SPORT_TYPES, PLANETS, BADGE_DEFS, SUCCESS_MSGS };
