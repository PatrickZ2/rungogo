const storage = require('../../utils/storage');
const config = require('../../utils/config');
const util = require('../../utils/util');
const Audio = require('../../utils/audio');

Page({
  data: {
    nickname: '英雄',
    avatarUrl: '',
    streak: 0,
    streakChanged: false,
    planets: [],
    showPlanetModal: false,
    currentPlanet: {},
    planetRecords: [],
  },

  _prevStreak: -1,

  onShow() {
    this._setTopBarPadding();
    this.loadData();
  },

  _setTopBarPadding() {
    try {
      const btn = wx.getMenuButtonBoundingClientRect();
      const sys = wx.getSystemInfoSync();
      this.setData({
        topBarStyle: `padding-top: ${btn.top}px; min-height: ${btn.bottom + 8}px;`,
      });
    } catch(e) { /* fallback to CSS */ }
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
      } catch (e) { console.error('getTempFileURL error:', e); }
    }

    const currentStreak = user ? (user.streak || 0) : 0;
    const streakChanged = this._prevStreak >= 0 && currentStreak !== this._prevStreak;

    this.setData({
      nickname: user ? user.nickname : '英雄',
      avatarUrl,
      streak: currentStreak,
      streakChanged,
      planets: this.buildPlanets(records),
    });

    this._prevStreak = currentStreak;

    // 连续天数变化时播放小成就音
    if (streakChanged && currentStreak > this._prevStreak) {
      Audio.pop();
    }
  },

  buildPlanets(records) {
    const glowColors = ['#6C5CE7', '#00D2D3', '#FECA57', '#FF6B6B', '#A29BFE'];
    return config.PLANETS.map((planet, idx) => {
      const planetRecords = records.filter(r => {
        if (planet.id === 'strength') return ['pushup', 'situp'].includes(r.sportId);
        return r.sportId === planet.id;
      });
      const count = planetRecords.length;
      return {
        ...planet,
        count,
        pct: Math.min(100, (count / 10) * 100),
        locked: count === 0,
        glowColor: glowColors[idx % glowColors.length],
      };
    });
  },

  showPlanetDetail(e) {
    Audio.pop();
    const id = e.currentTarget.dataset.id;
    const planet = config.PLANETS.find(p => p.id === id);
    if (!planet) return;

    storage.getRecords().then(recs => {
      const freshRecords = recs.filter(r => {
        if (id === 'strength') return ['pushup', 'situp'].includes(r.sportId);
        return r.sportId === id;
      });

      const planetRecords = freshRecords.slice().reverse().map(r => ({
        ...r,
        dateStr: util.formatDate(r.date),
        dataText: util.formatRecordData(r),
      }));

      this.setData({
        showPlanetModal: true,
        currentPlanet: { ...planet, count: freshRecords.length },
        planetRecords,
      });
    });
  },

  closePlanetModal() {
    this.setData({ showPlanetModal: false });
  },

  noop() {},

  // 底部导航跳转
  goCheckin() {
    Audio.click();
    wx.navigateTo({ url: '/pages/checkin/checkin' });
  },
  goDiary() {
    Audio.click();
    wx.navigateTo({ url: '/pages/diary/diary' });
  },
  goBadge() {
    Audio.click();
    wx.navigateTo({ url: '/pages/badge/badge' });
  },
  goProfile() {
    Audio.click();
    wx.navigateTo({ url: '/pages/profile/profile' });
  },
  stayHere() {},
});