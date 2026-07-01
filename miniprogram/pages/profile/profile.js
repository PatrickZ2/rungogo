const storage = require('../../utils/storage');
const util = require('../../utils/util');
const Audio = require('../../utils/audio');

Page({
  data: {
    avatarUrl: '',
    nickname: '英雄',
    joinDate: '',
    totalChekins: 0,
    streak: 0,
    sportKinds: 0,
    chartData: [],
    // 音效开关状态
    audioEnabled: true,
  },

  onShow() {
    this.loadData();
    this.setData({ audioEnabled: Audio.isEnabled() });
  },

  async loadData() {
    const user = await storage.getUser();
    const records = await storage.getRecords();

    let avatarUrl = '';
    if (user && user.avatarFileID) {
      try {
        const res = await wx.cloud.getTempFileURL({ fileList: [user.avatarFileID] });
        if (res.fileList && res.fileList[0]) {
          avatarUrl = res.fileList[0].tempFileURL;
        }
      } catch (e) { console.error(e); }
    }

    this.setData({
      avatarUrl,
      nickname: user ? user.nickname : '英雄',
      joinDate: user && user.joinDate ? util.shortDate(user.joinDate) : '',
      totalChekins: records.length,
      streak: user ? (user.streak || 0) : 0,
      sportKinds: new Set(records.map(r => r.sportId)).size,
      chartData: this.buildChart(records),
    });
  },

  buildChart(records) {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }

    const maxCount = 5;
    return days.map(day => {
      const count = records.filter(r => r.date.slice(0, 10) === day).length;
      return {
        day,
        label: `${parseInt(day.slice(5, 7))}/${parseInt(day.slice(8, 10))}`,
        count,
        height: Math.max(4, (count / maxCount) * 200),
      };
    });
  },

  toggleAudio() {
    Audio.click();
    const enabled = Audio.toggle();
    this.setData({ audioEnabled: enabled });
    if (enabled) Audio.pop(); // 开启时播放一个音效让用户感知
  },

  async exportData() {
    Audio.click();
    wx.showLoading({ title: '导出中...' });
    const data = await storage.exportAll();

    wx.hideLoading();
    wx.setClipboardData({
      data: JSON.stringify(data, null, 2),
      success: () => {
        wx.showModal({
          title: '导出成功',
          content: '数据已复制到剪贴板，请粘贴到备忘录或其他应用中保存。',
          showCancel: false,
        });
      },
    });
  },

  async resetData() {
    const res = await wx.showModal({
      title: '确认重置',
      content: '确定要清除所有数据吗？这会删除你的所有打卡记录和头像！',
      confirmColor: '#FF6B6B',
    });
    if (!res.confirm) return;

    wx.showLoading({ title: '重置中...' });
    try {
      await storage.resetAll();
      wx.hideLoading();
      wx.reLaunch({ url: '/pages/index/index' });
    } catch (e) {
      wx.hideLoading();
      wx.showToast({ title: '重置失败', icon: 'none' });
    }
  },

  goBack() {
    Audio.click();
    wx.navigateBack();
  },
});