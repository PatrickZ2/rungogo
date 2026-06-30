import os

base = r"E:\codingxing\rungogo"
os.makedirs(os.path.join(base, "css"), exist_ok=True)
os.makedirs(os.path.join(base, "js"), exist_ok=True)

# ===== style.css (pure ASCII) =====
css = """/* Sports Hero CSS */
:root {
  --primary: #6C5CE7; --primary-light: #A29BFE;
  --accent: #FF6B6B; --success: #00D2D3;
  --bg-light: #F8F9FA; --text-dark: #2D3436;
  --card-bg: #FFFFFF;
  --shadow: 0 4px 15px rgba(0,0,0,0.1);
  --radius: 16px; --radius-sm: 10px;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Segoe UI','Microsoft YaHei',sans-serif; background:var(--bg-light); color:var(--text-dark); min-height:100vh; overflow-x:hidden; }
.page { display:none; min-height:100vh; animation:fadeIn 0.4s ease; }
.page.active { display:block; }
@keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.container { max-width:480px; margin:0 auto; padding:20px 16px 100px; }

/* splash */
#page-splash {
  background:linear-gradient(135deg,#6C5CE7 0%,#A29BFE 50%,#74B9FF 100%);
  display:flex; align-items:center; justify-content:center; min-height:100vh;
  position:relative; overflow:hidden;
}
.splash-container { text-align:center; z-index:2; animation:bounceIn 1s ease; }
@keyframes bonceIn { 0%{transform:scale(0.3);opacity:0} 50%{transform:scale(1.05)} 70%{transform:scale(0.95)} 100%{transform:scale(1);opacity:1} }
.splash-mascot { font-size:100px; animation:float 3s ease-in-out infinite; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.2)); }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
.splash-title { font-size:42px; color:white; text-shadow:0 4px 8px rgba(0,0,0,0.2); margin:20px 0 10px; }
.splash-subtitle { font-size:18px; color:rgba(255,255,255,0.9); margin-bottom:40px; }
.splash-stars { position:absolute; inset:0; z-index:1; }
.star { position:absolute; width:4px; height:4px; background:white; border-radius:50%; animation:twinkle 2s ease-in-out infinite; }
@keyframes twinkle { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }

/* buttons */
.btn { border:none; border-radius:var(--radius-sm); padding:12px 24px; font-size:16px; font-weight:600; cursor:pointer; transition:all 0.3s ease; display:inline-flex; align-items:center; gap:6px; }
.btn:hover { transform:translateY(-2px); box-shadow:var(--shadow); }
.btn-primary { background:linear-gradient(135deg,var(--primary),var(--primary-light)); color:white; }
.btn-secondary { background:var(--bg-light); color:var(--primary); border:2px solid var(--primary-light); }
.btn-accent { background:linear-gradient(135deg,var(--accent),#FF8E8E); color:white; }
.btn-danger { background:#FF6B6B; color:white; }
.btn-sm { padding:8px 14px; font-size:14px; }
.btn-lg { padding:16px 36px; font-size:18px; border-radius:var(--radius); }
.btn-block { width:100%; justify-content:center; }
.btn:disabled { opacity:0.5; cursor:not-allowed; transform:none !important; }
.btn-back { background:none; border:none; font-size:16px; color:var(--primary); cursor:pointer; margin-bottom:12px; padding:8px 0; }

/* avatar setup */
.avatar-setup { display:flex; flex-direction:column; align-items:center; gap:20px; padding:20px 0; }
.avatar-preview { width:200px; height:200px; border-radius:50%; overflow:hidden; border:5px solid var(--primary-light); background:linear-gradient(135deg,#DFE6E9,#B2BEC3); display:flex; align-items:center; justify-content:center; cursor:pointer; }
.avatar-placeholder { text-align:center; color:var(--text-dark); opacity:0.6; }
.avatar-placeholder span { font-size:48px; display:block; }
.avatar-placeholder small { font-size:14px; }
.nickname-input { width:100%; max-width:300px; }
.nickname-input label { display:block; margin-bottom:8px; font-weight:600; }
.nickname-input input { width:100%; padding:14px; border:2px solid #DFE6E9; border-radius:var(--radius-sm); font-size:16px; }
.nickname-input input:focus { outline:none; border-color:var(--primary); }

/* top bar */
.top-bar { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:white; box-shadow:0 2px 10px rgba(0,0,0,0.05); position:sticky; top:0; z-index:100; }
.user-info { display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:600; font-size:15px; }
.top-avatar-canvas { border-radius:50%; border:2px solid var(--primary-light); }
.stats-chip { background:linear-gradient(135deg,#FF6B6B,#EE5A24); color:white; padding:6px 14px; border-radius:20px; font-size:14px; }

/* planet grid */
.planet-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
.planet-card { background:var(--card-bg); border-radius:var(--radius); padding:20px; text-align:center; box-shadow:var(--shadow); cursor:pointer; transition:all 0.3s ease; position:relative; overflow:hidden; }
.planet-card:hover { transform:translateY(-5px) scale(1.02); }
.planet-card.locked { filter:grayscale(0.8); opacity:0.7; }
.planet-icon { font-size:56px; display:block; margin-bottom:8px; animation:float 3s ease-in-out infinite; }
.planet-name { font-weight:700; font-size:16px; margin-bottom:4px; }
.planet-stats { font-size:13px; color:#636E72; }
.planet-progress { margin-top:10px; height:6px; background:#DFE6E9; border-radius:3px; overflow:hidden; }
.planet-progress-bar { height:100%; background:linear-gradient(90deg,var(--primary),var(--success)); border-radius:3px; transition:width 0.5s ease; }

/* bottom nav */
.bottom-nav { position:fixed; bottom:0; left:0; right:0; display:flex; justify-content:space-around; padding:10px 0; background:white; box-shadow:0 -2px 10px rgba(0,0,0,0.05); z-index:100; max-width:480px; margin:0 auto; }
.nav-btn { background:none; border:none; font-size:14px; padding:8px 12px; cursor:pointer; border-radius:var(--radius-sm); transition:all 0.3s; color:#636E72; }
.nav-btn.active { background:var(--primary); color:white; }

/* checkin page */
.photo-upload-area { width:100%; height:200px; border:3px dashed var(--primary-light); border-radius:var(--radius); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; cursor:pointer; transition:all 0.3s; color:var(--primary); font-size:16px; }
.photo-upload-area:hover { background:rgba(108,92,231,0.05); border-color:var(--primary); }
.upload-icon { font-size:48px; }
.photo-preview { width:100%; height:200px; object-fit:cover; border-radius:var(--radius); }
.sport-options { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.sport-option { padding:14px 8px; border:2px solid #DFE6E9; border-radius:var(--radius-sm); text-align:center; cursor:pointer; transition:all 0.3s; font-size:14px; }
.sport-option:hover { border-color:var(--primary-light); }
.sport-option.selected { border-color:var(--primary); background:rgba(108,92,231,0.1); }
.sport-icon { font-size:32px; display:block; margin-bottom:4px; }
.data-input-group { display:flex; align-items:center; gap:10px; }
.data-input-group input { flex:1; padding:14px; border:2px solid #DFE6E9; border-radius:var(--radius-sm); font-size:18px; text-align:center; }
.data-input-group input:focus { outline:none; border-color:var(--primary); }
.data-unit { font-size:16px; font-weight:600; color:var(--primary); min-width:40px; }
.checkin-note label { display:block; margin-bottom:8px; font-weight:600; }
.checkin-note textarea { width:100%; padding:14px; border:2px solid #DFE6E9; border-radius:var(--radius-sm); font-size:15px; resize:vertical; min-height:80px; font-family:inherit; }
.checkin-note textarea:focus { outline:none; border-color:var(--primary); }

/* diary */
.diary-list { display:flex; flex-direction:column; gap:16px; }
.diary-entry { background:var(--card-bg); border-radius:var(--radius); padding:16px; box-shadow:var(--shadow); display:flex; gap:14px; animation:slideIn 0.4s ease; }
@keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
.diary-photo { width:80px; height:80px; object-fit:cover; border-radius:var(--radius-sm); flex-shrink:0; }
.diary-info { flex:1; }
.diary-date { font-size:13px; color:#636E72; margin-bottom:4px; }
.diary-sport { font-weight:700; font-size:16px; margin-bottom:4px; }
.diary-data { font-size:14px; color:var(--primary); font-weight:600; }
.empty-state { text-align:center; padding:60px 20px; color:#636E72; }
.empty-icon { font-size:64px; display:block; margin-bottom:16px; }

/* badges */
.badges-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
.badge-card { background:var(--card-bg); border-radius:var(--radius); padding:20px 10px; text-align:center; box-shadow:var(--shadow); transition:all 0.3s; }
.badge-card:hover { transform:scale(1.05); }
.badge-card.locked { filter:grayscale(1); opacity:0.4; }
.badge-icon { font-size:48px; display:block; margin-bottom:8px; }

/* profile */
.profile-card { text-align:center; padding:30px 20px; background:linear-gradient(135deg,var(--primary),var(--primary-light)); border-radius:var(--radius); color:white; margin-bottom:24px; }
.profile-card canvas { border-radius:50%; border:4px solid white; margin-bottom:12px; }
.profile-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:24px; }
.stat-card { background:var(--card-bg); border-radius:var(--radius-sm); padding:16px; text-align:center; box-shadow:var(--shadow); }
.stat-number { display:block; font-size:28px; font-weight:800; color:var(--primary); }
.stat-label { font-size:13px; color:#636E72; }
.report-chart { display:flex; align-items:flex-end; gap:6px; height:150px; padding:10px; background:var(--card-bg); border-radius:var(--radius-sm); box-shadow:var(--shadow); }
.chart-bar { flex:1; background:linear-gradient(0deg,var(--primary),var(--primary-light)); border-radius:4px 4px 0 0; min-height:4px; position:relative; transition:height 0.5s ease; }
.chart-bar-label { position:absolute; bottom:-20px; left:50%; transform:translateX(-50%); font-size:10px; color:#636E72; white-space:nowrap; }

/* modals */
.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:999; animation:fadeIn 0.3s ease; }
.modal-content { background:white; border-radius:var(--radius); padding:30px; max-width:360px; width:90%; text-align:center; position:relative; animation:popIn 0.4s ease; }
@keyframes popIn { 0%{transform:scale(0.5);opacity:0} 80%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
.modal-close { position:absolute; top:12px; right:16px; background:none; border:none; font-size:24px; cursor:pointer; color:#636E72; }
.success-animation { font-size:72px; animation:celebrate 1s ease infinite; }
@keyframes celebrate { 0%,100%{transform:scale(1) rotate(0deg)} 25%{transform:scale(1.2) rotate(-5deg)} 75%{transform:scale(1.2) rotate(5deg)} }
.badge-unlock { margin-top:16px; padding:12px; background:linear-gradient(135deg,#FECA57,#FF9F43); border-radius:var(--radius-sm); color:white; }

/* particles */
.particles-container { position:fixed; inset:0; pointer-events:none; z-index:1000; }
.particle { position:absolute; width:8px; height:8px; border-radius:50%; animation:particleFly 1s ease-out forwards; }
@keyframes particleFly { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(0)} }

/* responsive */
@media (max-width:400px) {
  .splash-title { font-size:32px; }
  .planet-grid { grid-template-columns:1fr; }
  .sport-options { grid-template-columns:repeat(2,1fr); }
  .badges-grid { grid-template-columns:repeat(2,1fr); }
}
"""
with open(os.path.join(base, "css", "style.css"), "w", encoding="utf-8") as f:
    f.write(css)
print("CSS done")
