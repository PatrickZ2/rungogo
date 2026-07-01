const storage = require('../../utils/storage');
const config = require('../../utils/config');
const Audio = require('../../utils/audio');

// 为每个勋章分配发光色相值
const BADGE_GLOW_HUES = [45, 200, 280, 15, 340, 160];

Page({
  data: {
    badges: [],
    // 勋章仪式相关
    showCeremony: false,
    ceremonyBadge: null,
    orbitStars: [],
  },

  onShow() {
    this.loadBadges();
    // 检查是否有新解锁的勋章需要展示仪式
    this.checkNewBadgeCeremony();
  },

  async loadBadges() {
    const unlockedIds = await storage.getUnlockedBadges();

    const badges = config.BADGE_DEFS.map((def, idx) => ({
      ...def,
      unlocked: unlockedIds.includes(def.id),
      glowHue: BADGE_GLOW_HUES[idx % BADGE_GLOW_HUES.length],
    }));

    this.setData({ badges });
  },

  onBadgeTap(e) {
    const item = e.currentTarget.dataset.item;
    if (item.unlocked) {
      Audio.pop();
      // 可以在这里添加点击已解锁勋章的详情展示
    } else {
      // 未解锁：轻微低沉反馈
      try { wx.vibrateShort({ type: 'light' }); } catch (_) {}
    }
  },

  /** 检查是否有新解锁的勋章，触发仪式动画 */
  async checkNewBadgeCeremony() {
    // 从缓存中获取上次查看时的已解锁列表
    const lastSeen = wx.getStorageSync('_last_seen_badges') || [];
    const unlockedIds = await storage.getUnlockedBadges();

    // 找出新增的勋章
    const newIds = unlockedIds.filter(id => !lastSeen.includes(id));
    if (newIds.length > 0) {
      // 取第一个新解锁的勋章展示仪式
      const newBadge = config.BADGE_DEFS.find(b => b.id === newIds[0]);
      if (newBadge) {
        this.showBadgeCeremony(newBadge);
      }
    }

    // 更新缓存
    wx.setStorageSync('_last_seen_badges', unlockedIds);
  },

  /** 展示勋章解锁仪式 */
  showBadgeCeremony(badge) {
    // 生成环绕星星
    const stars = ['⭐', '✨', '🌟', '💫', '⭐', '✨'];
    const orbitStars = [];
    for (let i = 0; i < 6; i++) {
      orbitStars.push({
        icon: stars[i],
        r: 100 + i * 12,
        d: i * 0.4,
        t: 3 + Math.random() * 2,
      });
    }

    this.setData({
      showCeremony: true,
      ceremonyBadge: badge,
      orbitStars,
    });
    Audio.badgeUnlock();
  },

  closeCeremony() {
    this.setData({ showCeremony: false, ceremonyBadge: null, orbitStars: [] });
    Audio.success();
  },

  goBack() {
    Audio.click();
    wx.navigateBack();
  },
});