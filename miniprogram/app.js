const Audio = require('./utils/audio');

App({
  onLaunch() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      return;
    }
    wx.cloud.init({
      env: 'cloudbase-d8gr2pm2i44594ce3',
      traceUser: true,
    });

    // 初始化音效管理器
    Audio.init();
    Audio.restoreSettings();

    // 获取用户 openId（用于数据隔离）
    this.getOpenId();
  },

  globalData: {
    userInfo: null,
    openId: null,
  },

  async getOpenId() {
    try {
      const res = await wx.cloud.callFunction({ name: 'getOpenId' });
      this.globalData.openId = res.result.openid;
      console.log('openId:', this.globalData.openId);
    } catch (err) {
      console.error('获取 openId 失败:', err);
    }
  },
});
