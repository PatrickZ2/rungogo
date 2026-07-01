/**
 * 运动小英雄 — 统一音频管理器
 * 单例模式，全局音效控制
 */
const Audio = {
  _ctx: {},
  _bgm: null,
  _enabled: true,
  _bgmEnabled: false,
  _loaded: false,

  // 音效资源映射
  SOUNDS: {
    click: '/assets/sounds/click.mp3',
    pop: '/assets/sounds/pop.mp3',
    success: '/assets/sounds/success.mp3',
    badge: '/assets/sounds/badge.mp3',
    whoosh: '/assets/sounds/whoosh.mp3',
    shutter: '/assets/sounds/shutter.mp3',
  },

  /**
   * 初始化：预加载所有音效（app.onLaunch 调用）
   */
  init() {
    if (this._loaded) return;
    
    Object.keys(this.SOUNDS).forEach(key => {
      const ctx = wx.createInnerAudioContext();
      ctx.src = this.SOUNDS[key];
      ctx.volume = 0.8;
      // 预加载但不自动播放
      this._ctx[key] = ctx;
    });

    // BGM 实例（按需加载）
    this._bgm = wx.createInnerAudioContext();
    this._bgm.src = '/assets/sounds/bgm.mp3';
    this._bgm.loop = true;
    this._bgm.volume = 0.25;

    this._loaded = true;
    console.log('[AudioManager] 初始化完成');
  },

  /**
   * 播放指定音效
   * @param {string} name - 音效名称 (click/pop/success/badge/whoosh/shutter)
   * @param {object} opts - { volume, vibrate }
   */
  play(name, opts = {}) {
    if (!this._enabled) return;
    const ctx = this._ctx[name];
    if (!ctx) return;

    if (opts.volume !== undefined) ctx.volume = opts.volume;

    try {
      ctx.stop();
      setTimeout(() => { ctx.play(); }, 30);
    } catch (e) {
      console.warn(`[Audio] 播放失败: ${name}`, e);
      // 静默失败，不影响功能
    }

    // 可选振动反馈
    if (opts.vibrate) {
      try {
        wx.vibrateShort({ type: typeof opts.vibrate === 'string' ? opts.vibrate : 'medium' });
      } catch (_) {}
    }
  },

  /** 播放带振动的音效（重要操作用） */
  playWithVibrate(name, vibeType = 'medium') {
    this.play(name, { vibrate: vibeType });
  },

  /** 快捷方法 */
  click() { this.play('click'); },
  pop() { this.play('pop'); },
  success() { this.playWithVibrate('success', 'heavy'); },
  badgeUnlock() { this.playWithVibrate('badge', 'heavy'); },
  whoosh() { this.play('whoosh'); },
  shutter() { this.play('shutter'); },

  /**
   * BGM 控制
   */
  playBgm() {
    if (!this._enabled || !this._bgmEnabled || !this._bgm) return;
    try {
      this._bgm.play();
    } catch (e) {}
  },

  stopBgm() {
    if (!this._bgm) return;
    try {
      this._bgm.stop();
    } catch (e) {}
  },

  toggleBgm(enable) {
    this._bgmEnabled = enable;
    if (enable) this.playBgm();
    else this.stopBgm();
    wx.setStorageSync('_bgm_enabled', enable);
  },

  isBgmEnabled() {
    return this._bgmEnabled;
  },

  /**
   * 全局音效开关
   */
  toggle() {
    this._enabled = !this._enabled;
    if (!this._enabled) this.stopBgm();
    wx.setStorageSync('_audio_enabled', this._enabled);
    return this._enabled;
  },

  isEnabled() {
    return this._enabled;
  },

  /**
   * 从本地存储恢复设置
   */
  restoreSettings() {
    const audioOn = wx.getStorageSync('_audio_enabled');
    const bgmOn = wx.getStorageSync('_bgm_enabled');
    if (audioOn === false) this._enabled = false;
    if (bgmOn === true) this._bgmEnabled = true;
  },
};

module.exports = Audio;
