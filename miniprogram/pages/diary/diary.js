const storage = require('../../utils/storage');
const util = require('../../utils/util');
const Audio = require('../../utils/audio');

Page({
  data: {
    records: [],
  },

  onShow() {
    Audio.whoosh();
    this.loadRecords();
  },

  async loadRecords() {
    wx.showLoading({ title: '加载中...' });

    const records = await storage.getRecords();

    const fileList = records.filter(r => r.photoFileID).map(r => r.photoFileID);
    if (fileList.length > 0) {
      try {
        const res = await wx.cloud.getTempFileURL({ fileList });
        const urlMap = {};
        (res.fileList || []).forEach(f => { urlMap[f.fileID] = f.tempFileURL; });

        records.forEach(r => {
          r.photoUrl = urlMap[r.photoFileID] || '';
          r.dateStr = util.formatDate(r.date);
          r.dataText = util.formatRecordData(r);
        });
      } catch (e) { console.error('getTempFileURL error:', e); }
    } else {
      records.forEach(r => {
        r.dateStr = util.formatDate(r.date);
        r.dataText = util.formatRecordData(r);
      });
    }

    wx.hideLoading();
    this.setData({ records });
  },

  goBack() {
    Audio.click();
    wx.navigateBack();
  },

  onShareAppMessage() {
    return { title: '运动小英雄 - 看看我的运动日记！', path: '/pages/index/index' };
  },
});