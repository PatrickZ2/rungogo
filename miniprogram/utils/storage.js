const db = wx.cloud.database();
const _ = db.command;

const COLLECTION = {
  USERS: 'users',
  RECORDS: 'records',
  BADGES: 'badges',
};

/**
 * 获取用户数据
 */
async function getUser() {
  const openId = getApp().globalData.openId;
  if (!openId) return null;
  try {
    const res = await db.collection(COLLECTION.USERS).where({ _openid: openId }).get();
    return res.data.length > 0 ? res.data[0] : null;
  } catch (e) {
    console.error('getUser error:', e);
    return null;
  }
}

/**
 * 保存用户数据
 */
async function saveUser(userData) {
  const openId = getApp().globalData.openId;
  try {
    const existing = await db.collection(COLLECTION.USERS).where({ _openid: openId }).get();
    if (existing.data.length > 0) {
      await db.collection(COLLECTION.USERS).doc(existing.data[0]._id).update({ data: userData });
    } else {
      await db.collection(COLLECTION.USERS).add({ data: { ...userData, _openid: openId } });
    }
  } catch (e) {
    console.error('saveUser error:', e);
  }
}

/**
 * 获取打卡记录
 */
async function getRecords(limit = 500) {
  const openId = getApp().globalData.openId;
  if (!openId) return [];
  try {
    const res = await db.collection(COLLECTION.RECORDS)
      .where({ _openid: openId })
      .orderBy('date', 'desc')
      .limit(limit)
      .get();
    return res.data;
  } catch (e) {
    console.error('getRecords error:', e);
    return [];
  }
}

/**
 * 添加打卡记录（成功后自动更新连续天数）
 */
async function addRecord(record) {
  const openId = getApp().globalData.openId;
  record._openid = openId;
  record.date = record.date || new Date().toISOString();
  record.createdAt = new Date().toISOString();

  try {
    const res = await db.collection(COLLECTION.RECORDS).add({ data: record });
    record._id = res._id;
    await updateStreak();
    return record;
  } catch (e) {
    console.error('addRecord error:', e);
    throw e;
  }
}

/**
 * 更新连续打卡天数
 */
async function updateStreak() {
  const user = await getUser();
  if (!user) return;
  const records = await getRecords();
  if (records.length === 0) {
    user.streak = 0;
    await saveUser({ streak: 0 });
    return;
  }

  const dates = [...new Set(records.map(r => r.date.slice(0, 10)))].sort();
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (dates.includes(today) || dates.includes(yesterday)) {
    streak = 1;
    for (let i = dates.length - 2; i >= 0; i--) {
      const cur = new Date(dates[i + 1]);
      const prev = new Date(dates[i]);
      if ((cur - prev) / 86400000 === 1) streak++;
      else break;
    }
  }
  user.streak = streak;
  await saveUser({ streak });
}

/**
 * 获取已解锁勋章
 */
async function getUnlockedBadges() {
  const openId = getApp().globalData.openId;
  try {
    const res = await db.collection(COLLECTION.BADGES).where({ _openid: openId }).get();
    return res.data.map(b => b.badgeId);
  } catch (e) {
    return [];
  }
}

/**
 * 检查并解锁新勋章
 */
async function checkBadges() {
  const BADGE_DEFS = require('./config').BADGE_DEFS;
  const records = await getRecords();
  const user = await getUser();
  const unlocked = await getUnlockedBadges();
  const newlyUnlocked = [];
  const openId = getApp().globalData.openId;

  for (const def of BADGE_DEFS) {
    if (!unlocked.includes(def.id)) {
      if (def.condition(records, user || {})) {
        unlocked.push(def.id);
        newlyUnlocked.push(def);
        await db.collection(COLLECTION.BADGES).add({
          data: { _openid: openId, badgeId: def.id, unlockedAt: new Date().toISOString() }
        });
      }
    }
  }
  return newlyUnlocked;
}

/**
 * 上传文件到云存储
 */
async function uploadFile(filePath, folder = 'photos') {
  try {
    const cloudPath = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
    const res = await wx.cloud.uploadFile({ cloudPath, filePath });
    return res.fileID;
  } catch (e) {
    console.error('uploadFile error:', e);
    return null;
  }
}

/**
 * 导出所有数据
 */
async function exportAll() {
  const user = await getUser();
  const records = await getRecords();
  const badges = await getUnlockedBadges();
  return { user, records, badges, exportDate: new Date().toISOString() };
}

/**
 * 重置数据
 */
async function resetAll() {
  const openId = getApp().globalData.openId;
  try {
    // 删除用户
    const usersRes = await db.collection(COLLECTION.USERS).where({ _openid: openId }).get();
    for (const u of usersRes.data) {
      await db.collection(COLLECTION.USERS).doc(u._id).remove();
    }
    // 删除记录
    const recordsRes = await db.collection(COLLECTION.RECORDS).where({ _openid: openId }).get();
    for (const r of recordsRes.data) {
      await db.collection(COLLECTION.RECORDS).doc(r._id).remove();
    }
    // 删除勋章
    const badgesRes = await db.collection(COLLECTION.BADGES).where({ _openid: openId }).get();
    for (const b of badgesRes.data) {
      await db.collection(COLLECTION.BADGES).doc(b._id).remove();
    }
  } catch (e) {
    console.error('resetAll error:', e);
  }
}

module.exports = {
  getUser,
  saveUser,
  getRecords,
  addRecord,
  updateStreak,
  getUnlockedBadges,
  checkBadges,
  uploadFile,
  exportAll,
  resetAll,
};
