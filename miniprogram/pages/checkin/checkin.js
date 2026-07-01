const storage = require('../../utils/storage');
const config = require('../../utils/config');
const util = require('../../utils/util');
const Audio = require('../../utils/audio');

Page({
  data: {
    sportTypes: config.SPORT_TYPES,
    photoUrl: '',
    tempPhotoPath: '',
    currentSportId: '',
    currentSport: null,
    hasExtra: false,
    dataValue: '',
    extraValue: '',
    note: '',
    canSubmit: false,
    showSuccess: false,
    successMsg: '',
    newBadges: [],
    showParticles: false,
    particles: [],
    // 新增：彩纸屑
    confetti: [],
    summaryText: '',
  },

  choosePhoto() {
    Audio.shutter();
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ photoUrl: res.tempFiles[0].tempFilePath, tempPhotoPath: res.tempFiles[0].tempFilePath });
        this.checkCanSubmit();
      },
    });
  },

  selectSport(e) {
    Audio.pop();
    const id = e.currentTarget.dataset.id;
    const sport = config.SPORT_TYPES.find(s => s.id === id);
    this.setData({
      currentSportId: id,
      currentSport: sport,
      hasExtra: !!sport.extra,
      dataValue: '',
      extraValue: '',
    });
    this.checkCanSubmit();
  },

  onDataInput(e) { this.setData({ dataValue: e.detail.value }); this.checkCanSubmit(); },
  onExtraInput(e) { this.setData({ extraValue: e.detail.value }); this.checkCanSubmit(); },
  onNoteInput(e) { this.setData({ note: e.detail.value }); },

  checkCanSubmit() {
    const { photoUrl, currentSportId, dataValue } = this.data;
    this.setData({
      canSubmit: !!photoUrl && !!currentSportId && parseFloat(dataValue) > 0,
    });
  },

  async submitCheckin() {
    if (!this.data.canSubmit) {
      wx.showToast({ title: '请完善打卡信息', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '提交中...' });

    try {
      const { tempPhotoPath, currentSport, dataValue, extraValue, note } = this.data;

      // 上传照片到云存储
      let photoFileID = '';
      if (tempPhotoPath) {
        photoFileID = await storage.uploadFile(tempPhotoPath, 'checkin');
      }

      // 构建记录
      const record = {
        sportId: currentSport.id,
        sportName: currentSport.name,
        sportIcon: currentSport.icon,
        data: { value: parseFloat(dataValue), unit: currentSport.unit },
        extra: currentSport.extra ? { value: parseFloat(extraValue) || 0, unit: currentSport.extra.unit } : null,
        note: note.trim(),
        photoFileID,
      };

      await storage.addRecord(record);

      // 检查新勋章
      const newBadges = await storage.checkBadges();

      // 生成摘要文本
      const summaryText = `${currentSport.icon} ${currentSport.name}: ${dataValue} ${currentSport.unit}${extraValue ? ` + ${extraValue} ${currentSport.extra.unit}` : ''}`;

      // 播放音效 + 粒子特效
      this.playParticles();
      this.playConfetti();

      // 有新勋章时播放勋章解锁音效
      if (newBadges.length > 0) {
        setTimeout(() => Audio.badgeUnlock(), 400);
      } else {
        Audio.success();
      }

      wx.hideLoading();

      const msgs = config.SUCCESS_MSGS[currentSport.id];
      const successMsg = util.getRandomMsg(msgs);

      this.setData({
        showSuccess: true,
        successMsg,
        newBadges,
        showParticles: true,
        summaryText,
      });
    } catch (e) {
      wx.hideLoading();
      wx.showToast({ title: '提交失败，请重试', icon: 'none' });
      console.error('submitCheckin error:', e);
    }
  },

  /** 彩纸屑效果 */
  playConfetti() {
    const colors = ['#FF6B6B', '#FECA57', '#6C5CE7', '#00D2D3', '#A29BFE', '#FF9F43'];
    const shapes = ['★', '●', '▲', '♦', '✦', '●'];
    const confetti = [];
    const info = wx.getWindowInfo();

    for (let i = 0; i < 55; i++) {
      confetti.push({
        x: Math.random() * info.windowWidth,
        y: -20 - Math.random() * 200,
        driftX: (Math.random() - 0.5) * 200,
        rot: Math.random() * 720 - 360,
        dur: 2 + Math.random() * 2.5,
        delay: Math.random() * 0.8,
        shape: shapes[i % shapes.length],
      });
    }
    this.setData({ confetti });

    // 清理彩纸屑
    setTimeout(() => { this.setData({ confetti: [] }); }, 4500);
  },

  /** 原版粒子（保留） */
  playParticles() {
    const particles = [];
    const colors = ['#6C5CE7', '#FECA57', '#FF6B6B', '#00D2D3', '#A29BFE'];
    const info = wx.getWindowInfo();
    const cx = info.windowWidth / 2;
    const cy = info.windowHeight / 2;

    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5;
      const dist = 150 + Math.random() * 300;
      particles.push({
        x: cx,
        y: cy,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        color: colors[i % colors.length],
        size: 10 + Math.random() * 16,
      });
    }
    this.setData({ particles });
    setTimeout(() => { this.setData({ showParticles: false, particles: [] }); }, 1200);
  },

  closeSuccess() {
    this.setData({
      showSuccess: false,
      photoUrl: '',
      tempPhotoPath: '',
      currentSportId: '',
      currentSport: null,
      hasExtra: false,
      dataValue: '',
      extraValue: '',
      note: '',
      canSubmit: false,
      newBadges: [],
      confetti: [],
      summaryText: '',
    });
    Audio.click();
    wx.navigateBack();
  },

  noop() {},
  goBack() {
    Audio.click();
    wx.navigateBack();
  },
});