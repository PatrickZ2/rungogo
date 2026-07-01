const storage = require('../../utils/storage');
const Audio = require('../../utils/audio');

Page({
  data: {
    avatarUrl: '',
    nickname: '',
    tempFilePath: '',
  },

  chooseAvatar() {
    Audio.click();
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this.setData({ avatarUrl: tempFilePath, tempFilePath });
      },
    });
  },

  onNickInput(e) {
    this.setData({ nickname: e.detail.value });
  },

  async finishSetup() {
    const { avatarUrl, nickname } = this.data;
    if (!nickname.trim()) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '保存中...' });

    try {
      let avatarFileID = '';
      if (avatarUrl) {
        avatarFileID = await storage.uploadFile(avatarUrl, 'avatars');
      }

      await storage.saveUser({
        nickname: nickname.trim(),
        avatarFileID,
        joinDate: new Date().toISOString(),
        streak: 0,
      });

      Audio.success();
      wx.hideLoading();
      wx.reLaunch({ url: '/pages/main/main' });
    } catch (e) {
      wx.hideLoading();
      wx.showToast({ title: '保存失败，请重试', icon: 'none' });
      console.error('finishSetup error:', e);
    }
  },

  onShareAppMessage() {
    return { title: '运动小英雄 - 加入我的冒险吧！', path: '/pages/index/index' };
  },
});