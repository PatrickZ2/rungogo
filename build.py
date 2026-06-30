import os

base = r'E:\codingxing\rungogo'

# 读取 CSS
with open(os.path.join(base, 'css', 'style.css'), 'r', encoding='utf-8') as f:
    css = f.read()

# 读取 JS files
with open(os.path.join(base, 'js', 'storage.js'), 'r', encoding='utf-8') as f:
    js_storage = f.read()
with open(os.path.join(base, 'js', 'avatar.js'), 'r', encoding='utf-8') as f:
    js_avatar = f.read()
with open(os.path.join(base, 'js', 'animation.js'), 'r', encoding='utf-8') as f:
    js_animation = f.read()
with open(os.path.join(base, 'js', 'app.js'), 'r', encoding='utf-8') as f:
    js_app = f.read()

# 内联 HTML
html = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>运动小英雄</title>
  <style>
''' + css + '''
  </style>
</head>
<body>
  <!-- 启动页 -->
  <div id="page-splash" class="page active">
    <div class="splash-container">
      <div class="splash-mascot">🏃</div>
      <h1 class="splash-title">运动小英雄</h1>
      <p class="splash-subtitle">每天运动，点亮星球！</p>
      <button class="btn btn-primary btn-lg" onclick="App.goToPage('page-avatar-setup')">开始冒险 ✨</button>
    </div>
    <div class="splash-stars" id="splash-stars"></div>
  </div>

  <!-- 头像设置页 -->
  <div id="page-avatar-setup" class="page">
    <div class="container">
      <h2 class="page-title">🎨 创建你的英雄形象</h2>
      <div class="avatar-setup">
        <div class="avatar-preview" id="avatar-preview">
          <div class="avatar-placeholder" id="avatar-placeholder"><span>📷</span><small>点击上传照片</small></div>
          <canvas id="avatar-canvas" width="200" height="200" style="display:none;"></canvas>
        </div>
        <input type="file" id="avatar-input" accept="image/*" style="display:none" onchange="Avatar.handleUpload(event)">
        <div class="avatar-actions">
          <button class="btn btn-secondary" onclick="document.getElementById('avatar-input').click()">📷 上传照片</button>
        </div>
        <div class="nickname-input">
          <label>你的英雄名字：</label>
          <input type="text" id="nickname-input" placeholder="请输入昵称" maxlength="10">
        </div>
        <button class="btn btn-primary btn-lg" onclick="App.finishSetup()">进入运动星球 🚀</button>
      </div>
    </div>
  </div>

  <!-- 主页面 -->
  <div id="page-main" class="page">
    <header class="top-bar">
      <div class="user-info" onclick="App.goToPage('page-profile')">
        <canvas id="top-avatar" width="40" height="40" class="top-avatar-canvas"></canvas>
        <span id="top-nickname">英雄</span>
      </div>
      <div class="stats-chip"><span>🔥 连续 <strong id="streak-days">0</strong> 天</span></div>
      <button class="btn btn-sm btn-accent" onclick="App.goToPage('page-checkin')">+ 打卡</button>
    </header>
    <div class="container map-container">
      <h2 class="section-title">🌟 运动星球地图</h2>
      <div class="planet-grid" id="planet-grid"></div>
    </div>
    <nav class="bottom-nav">
      <button class="nav-btn active" onclick="App.showTab('map')">🗺️ 星球</button>
      <button class="nav-btn" onclick="App.goToPage('page-diary')">📖 日记</button>
      <button class="nav-btn" onclick="App.goToPage('page-achievements')">🏆 勋章</button>
      <button class="nav-btn" onclick="App.goToPage('page-profile')">👤 我的</button>
    </nav>
  </div>

  <!-- 打卡页 -->
  <div id="page-checkin" class="page">
    <div class="container">
      <button class="btn-back" onclick="App.goToPage('page-main')">← 返回</button>
      <h2 class="page-title">📸 今日运动打卡</h2>
      <div class="checkin-photo" id="checkin-photo-area">
        <div class="photo-upload-area" id="photo-upload-area" onclick="document.getElementById('checkin-photo-input').click()">
          <span class="upload-icon">📷</span><span>点击上传运动照片</span>
        </div>
        <img id="checkin-photo-preview" class="photo-preview" style="display:none">
        <input type="file" id="checkin-photo-input" accept="image/*" style="display:none" onchange="App.previewCheckinPhoto(event)">
      </div>
      <div class="checkin-sport-select">
        <h3>选择运动类型：</h3>
        <div class="sport-options" id="sport-options"></div>
      </div>
      <div class="checkin-data-input" id="checkin-data-input" style="display:none">
        <h3 id="data-input-label">输入运动数据：</h3>
        <div class="data-input-group">
          <input type="number" id="data-value" placeholder="请输入数值" min="0" step="any">
          <span class="data-unit" id="data-unit"></span>
        </div>
        <div class="data-input-extra" id="data-input-extra" style="display:none">
          <input type="number" id="data-value-extra" placeholder="请输入额外数值" min="0" step="any">
          <span class="data-unit" id="data-unit-extra"></span>
        </div>
      </div>
      <div class="checkin-note">
        <label>运动感想（可选）：</label>
        <textarea id="checkin-note" placeholder="今天运动感觉怎么样？" maxlength="100"></textarea>
      </div>
      <button class="btn btn-primary btn-lg btn-block" id="checkin-submit" onclick="App.submitCheckin()" disabled>🎉 完成打卡</button>
    </div>
  </div>

  <!-- 日记页 -->
  <div id="page-diary" class="page">
    <div class="container">
      <button class="btn-back" onclick="App.goToPage('page-main')">← 返回</button>
      <h2 class="page-title">📖 运动日记</h2>
      <div class="diary-list" id="diary-list"></div>
      <div class="empty-state" id="diary-empty" style="display:none"><span class="empty-icon">📝</span><p>还没有运动记录哦～<br>快去打卡吧！</p></div>
    </div>
  </div>

  <!-- 勋章页 -->
  <div id="page-achievements" class="page">
    <div class="container">
      <button class="btn-back" onclick="App.goToPage('page-main')">← 返回</button>
      <h2 class="page-title">🏆 我的勋章墙</h2>
      <div class="badges-grid" id="badges-grid"></div>
    </div>
  </div>

  <!-- 个人中心 -->
  <div id="page-profile" class="page">
    <div class="container">
      <button class="btn-back" onclick="App.goToPage('page-main')">← 返回</button>
      <h2 class="page-title">👤 我的运动中心</h2>
      <div class="profile-card">
        <canvas id="profile-avatar" width="120" height="120"></canvas>
        <h3 id="profile-nickname">英雄</h3>
        <p class="profile-join-date" id="profile-join-date"></p>
      </div>
      <div class="profile-stats">
        <div class="stat-card"><span class="stat-number" id="stat-total">0</span><span class="stat-label">总打卡</span></div>
        <div class="stat-card"><span class="stat-number" id="stat-streak">0</span><span class="stat-label">连续天数</span></div>
        <div class="stat-card"><span class="stat-number" id="stat-sports">0</span><span class="stat-label">运动种类</span></div>
      </div>
      <div class="profile-section">
        <h3>📊 运动报告</h3>
        <div class="report-chart" id="report-chart"></div>
      </div>
      <div class="profile-actions">
        <button class="btn btn-secondary" onclick="App.exportData()">📤 导出数据</button>
        <button class="btn btn-danger" onclick="App.resetData()">🗑️ 重置数据</button>
      </div>
    </div>
  </div>

  <!-- 成功弹窗 -->
  <div class="modal-overlay" id="modal-success" style="display:none">
    <div class="modal-content modal-success">
      <div class="success-animation" id="success-animation">🎉</div>
      <h2>打卡成功！</h2>
      <p id="success-msg">太棒了，继续加油！</p>
      <div class="badge-unlock" id="badge-unlock" style="display:none"><p>🏆 解锁新勋章！</p><span id="badge-icon">🥇</span></div>
      <button class="btn btn-primary" onclick="App.closeModal('modal-success')">太好了 ✨</button>
    </div>
  </div>

  <!-- 星球详情弹窗 -->
  <div class="modal-overlay" id="modal-planet" style="display:none">
    <div class="modal-content modal-planet">
      <button class="modal-close" onclick="App.closeModal('modal-planet')">✕</button>
      <div class="planet-detail" id="planet-detail"></div>
    </div>
  </div>

  <script>
''' + js_storage + '\n' + js_avatar + '\n' + js_animation + '\n' + js_app + '''
  </script>
</body>
</html>'''

out_path = os.path.join(base, 'index-standalone.html')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html)

size = os.path.getsize(out_path)
print(f'单文件已生成：{out_path}')
print(f'文件大小：{size/1024:.1f} KB')
