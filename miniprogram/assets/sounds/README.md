# 音效资源文件说明

## 需要放入此目录的音效文件

请将以下 **6 个 MP3 文件** 放入本目录 (`miniprogram/assets/sounds/`)：

| 文件名 | 用途 | 建议时长 | 推荐风格 |
|--------|------|---------|---------|
| `click.mp3` | 通用按钮点击 | 0.1-0.2s | 清脆短促的"咔嗒"声 |
| `pop.mp3` | 选中/弹出/确认 | 0.15-0.3s | 轻弹"波普"声 |
| `success.mp3` | 打卡成功庆祝 ⭐ | 0.5-1s | 欢快上升音阶 |
| `badge.mp3` | 解锁勋章 ⭐ | 0.8-1.5s | 金色光芒/钟声感 |
| `whoosh.mp3` | 页面转场/开始冒险 | 0.4-0.8s | 轻柔风声/魔法声 |
| `shutter.mp3` | 照片上传快门声 | 0.2-0.3s | 相机"咔嚓"声 |

### 可选（背景音乐）
| 文件名 | 用途 |
|--------|------|
| `bgm.mp3` | 循环播放的轻音乐（建议 30-60 秒循环） |

---

## 免费音效资源推荐

### Pixabay (免费商用)
- 网址：https://pixabay.com/sound-effects/
- 搜索关键词：`game success`, `pop`, `click`, `celebration`

### Mixkit (免费商用)
- 网址：https://mixkit.co/free-sound-effects/
- 分类：Game / UI / Notification

### Freesound
- 网址：https://freesound.org/
- 注意：部分需署名或 CC 协议，注意查看授权

### 推荐具体搜索词
- `cartoon pop`
- `game success fanfare`
- `UI click`
- `camera shutter`
- `magical whoosh`
- `achievement unlock`
- `children game positive`

---

## 技术要求

- **格式**：MP3
- **采样率**：44100Hz 或 22050Hz
- **声道**：单声道 (mono) 更省空间
- **比特率**：128kbps 以下
- **单个文件大小**：< 100KB（总大小 < 500KB）
- **音量**：不要太大，避免刺耳

---

## 如果暂时没有音频文件

AudioManager 已做容错处理——**没有音频文件时不会报错**，只是静默运行。
可以先完成其他功能，后续补充音频资源即可。
