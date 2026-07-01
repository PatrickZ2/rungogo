const Audio = require('../../utils/audio');
const storage = require('../../utils/storage');

Page({
  data: {
    stars: [],
    shootingStars: [],
  },

  onLoad() {
    // 生成星空数据
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
      });
    }

    // 生成流星数据（3 颗）
    const shootingStars = [];
    for (let i = 0; i < 3; i++) {
      shootingStars.push({
        x: Math.random() * 60,
        y: Math.random() * 30,
        delay: 2 + Math.random() * 6,
      });
    }

    this.setData({ stars, shootingStars });
  },

  async startAdventure() {
    Audio.whoosh();

    const app = getApp();
    if (!app.globalData.openId) {
      try {
        const res = await wx.cloud.callFunction({ name: 'getOpenId' });
        app.globalData.openId = res.result.openid;
      } catch (e) {
        console.error('getOpenId error:', e);
        wx.showToast({ title: '网络不佳，请重试', icon: 'none' });
        return;
      }
    }

    // 检查用户是否已设置过
    const user = await storage.getUser();
    if (user && user.nickname) {
      wx.reLaunch({ url: '/pages/main/main' });
    } else {
      wx.navigateTo({ url: '/pages/setup/setup' });
    }
  },
});