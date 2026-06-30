// gen.js - 用 Node.js 重新生成所有前端文件（彻底清除 Unicode 零宽字符）
const fs = require('fs');
const path = require('path');

const base = 'E:\\codingxing\\rungogo';
const cssDir = path.join(base, 'css');
const jsDir = path.join(base, 'js');
[cssDir, jsDir].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

// ===== CSS (纯 ASCII，无中文) =====
const css = `/* Sports Hero CSS */
:root {
  --primary: #6C5CE7; --primary-light: #A29BFE;
  --accent: #FF6B6B; --success: #00D2D3;
  --bg-dark: #2C3E50; --bg-light: #F8F9FA;
  --text-dark: #2D3436; --card-bg: #FFFFFF;
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
@keyframes bounceIn { 0%{transform:scale(0.3);opacity:0} 50%{transform:scale(1.05)} 70%{transform:scale(0.95)} 100%{transform:scale(1);opacity:1} }
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
`;

fs.writeFileSync(path.join(cssDir, 'style.css'), css, 'utf8');
console.log('CSS written');

// ===== JS: storage.js =====
const jsStorage = `const Storage = (() => {
  const KEYS = { USER:'rungogo_user', RECORDS:'rungogo_records', BADGES:'rungogo_badges' };
  const SPORT_TYPES = [
    {id:'football', name:'\\u8db3\\u7403', icon:'\\u26bd', unit:'\\u5206\\u949f', unitLabel:'\\u8fd0\\u52a8\\u65f6\\u957f', dataField:'duration'},
    {id:'basketball', name:'\\u7bee\\u7403', icon:'\\uD83C\\uDFC0', unit:'\\u5206\\u949f', unitLabel:'\\u8fd0\\u52a8\\u65f6\\u957f', dataField:'duration'},
    {id:'rope', name:'\\u8df3\\u7ef3', icon:'\\uD83C\\uDFC3', unit:'\\u6b21', unitLabel:'\\u8df3\\u7ef3\\u6b21\\u6570', dataField:'count'},
    {id:'running', name:'\\u8dd1\\u6b65', icon:'\\uD83C\\uDFC3\\u200d\\u2642\\uFE0F', unit:'km', unitLabel:'\\u8dd1\\u6b65\\u8ddd\\u79bb', dataField:'distance', extra:{unit:'\\u5206\\u949f',label:'\\u7528\\u65f6',field:'duration'}},
    {id:'swimming', name:'\\u6e38\\u6cf3', icon:'\\uD83C\\uDFCA', unit:'\\u7c73', unitLabel:'\\u6e38\\u6cf3\\u8ddd\\u79bb', dataField:'distance'},
    {id:'pushup', name:'\\u4f8f\\u5367\\u6491', icon:'\\uD83D\\uDCAA', unit:'\\u4e2a', unitLabel:'\\u5b8c\\u6210\\u4e2a\\u6570', dataField:'count'},
    {id:'situp', name:'\\u4ef5\\u5367\\u8d77\\u5750', icon:'\\uD83E\\uDDB8', unit:'\\u4e2a', unitLabel:'\\u5b8c\\u6210\\u4e2a\\u6570', dataField:'count'},
    {id:'cycling', name:'\\u9a91\\u8f66', icon:'\\uD83D\\uDEB4', unit:'km', unitLabel:'\\u9a91\\u884c\\u8ddd\\u79bb', dataField:'distance'},
    {id:'custom', name:'\\u81ea\\u5b9a\\u4e49', icon:'\\uD83C\\uDF1F', unit:'', unitLabel:'\\u8bf7\\u8f93\\u5165\\u6570\\u636e', dataField:'custom'}
  ];
  const PLANETS = [
    {id:'football', name:'\\u8db3\\u7403\\u661f', icon:'\\u26bd', color:'#00B894'},
    {id:'basketball', name:'\\u7bee\\u7403\\u661f', icon:'\\uD83C\\uDFC0', color:'#E17055'},
    {id:'rope', name:'\\u8df3\\u8dc3\\u661f', icon:'\\uD83C\\uDFC3', color:'#6C5CE7'},
    {id:'running', name:'\\u8dd1\\u6b65\\u661f', icon:'\\uD83C\\uDFC3\\u200d\\u2642\\uFE0F', color:'#0984E3'},
    {id:'swimming', name:'\\u6e38\\u6cf3\\u661f', icon:'\\uD83C\\uDFCA', color:'#00CEC9'},
    {id:'strength', name:'\\u529b\\u91cf\\u661f', icon:'\\uD83D\\uDCAA', color:'#FDCB6E'}
  ];
  const BADGE_DEFS = [
    {id:'first_checkin', icon:'\\uD83C\\uDF47', name:'\\u521d\\u6b21\\u51fa\\u53d1', desc:'\\u5b8c\\u6210\\u7b2c\\u4e00\\u6b21\\u6253\\u5361', condition:(records)=>records.length>=1},
    {id:'streak_3', icon:'\\uD83D\\uDD25', name:'\\u4e09\\u5929\\u5c0f\\u706b', desc:'\\u8fde\\u7eed\\u6253\\u5361 3 \\u5929', condition:(_,user)=>user.streak>=3},
    {id:'streak_7', icon:'\\uD83D\\uDD25', name:'\\u4e00\\u5468\\u706b\\u7130', desc:'\\u8fde\\u7eed\\u6253\\u5361 7 \\u5929', condition:(_,user)=>user.streak>=7},
    {id:'streak_30', icon:'\\uD83C\\uDF0B', name:'\\u6708\\u5ea6\\u5f3a\\u8005', desc:'\\u8fde\\u7eed\\u6253\\u5361 30 \\u5929', condition:(_,user)=>user.streak>=30},
    {id:'sport_5', icon:'\\uD83C\\uDF1F', name:'\\u5168\\u80fd\\u65b0\\u661f', desc:'\\u5b8c\\u6210 5 \\u79cd\\u4e0d\\u540c\\u8fd0\\u52a8', condition:(records)=>new Set(records.map(r=>r.sportId)).size>=5},
    {id:'total_20', icon:'\\uD83C\\uDFC6', name:'\\u8fd0\\u52a8\\u4e4b\\u661f', desc:'\\u7d2f\\u8ba1\\u6253\\u5361 20 \\u6b21', condition:(records)=>records.length>=20},
    {id:'total_50', icon:'\\uD83C\\uDF51', name:'\\u8d85\\u7ea7\\u82f1\\u96c4', desc:'\\u7d2f\\u8ba1\\u6253\\u5361 50 \\u6b21', condition:(records)=>records.length>=50}
  ];
  function get(key){ try{return JSON.parse(localStorage.getItem(key))}catch(e){return null} }
  function set(key,val){ localStorage.setItem(key,JSON.stringify(val)) }
  function getUser(){ return get(KEYS.USER)||null }
  function saveUser(user){ set(KEYS.USER,user) }
  function getRecords(){ return get(KEYS.RECORDS)||[] }
  function addRecord(record){
    const records=getRecords();
    record.id=Date.now().toString();
    record.date=new Date().toISOString();
    records.push(record);
    set(KEYS.RECORDS,records);
    updateStreak();
    return record;
  }
  function updateStreak(){
    const user=getUser(); if(!user)return;
    const records=getRecords();
    if(records.length===0){user.streak=0;saveUser(user);return}
    const dates=[...new Set(records.map(r=>r.date.slice(0,10)))].sort();
    let streak=0;
    const today=new Date().toISOString().slice(0,10);
    const yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
    if(dates.includes(today)||dates.includes(yesterday)){
      streak=1;
      for(let i=dates.length-2;i>=0;i--){
        const cur=new Date(dates[i+1]); const prev=new Date(dates[i]);
        if((cur-prev)/86400000===1)streak++; else break;
      }
    }
    user.streak=streak; saveUser(user);
  }
  function getUnlockedBadges(){ return get(KEYS.BADGES)||[] }
  function checkBadges(){
    const records=getRecords(); const user=getUser();
    const unlocked=getUnlockedBadges(); const newly=[];
    BADGE_DEFS.forEach(def=>{
      if(!unlocked.includes(def.id)&&def.condition(records,user||{})){
        unlocked.push(def.id); newly.push(def);
      }
    });
    set(KEYS.BADGES,unlocked); return newly;
  }
  function initIfNew(){ if(!getUser()) saveUser({nickname:'',avatarDataURL:null,joinDate:new Date().toISOString(),streak:0}) }
  function resetAll(){ Object.values(KEYS).forEach(k=>localStorage.removeItem(k)) }
  function exportAll(){ return {user:getUser(),records:getRecords(),badges:getUnlockedBadges(),exportDate:new Date().toISOString()} }
  return {SPORT_TYPES,PLANETS,BADGE_DEFS,KEYS,get,set,getUser,saveUser,getRecords,addRecord,getUnlockedBadges,checkBadges,updateStreak,initIfNew,resetAll,exportAll};
})();
`;

fs.writeFileSync(path.join(jsDir, 'storage.js'), jsStorage, 'utf8');
console.log('storage.js written');

// ===== JS: avatar.js =====
const jsAvatar = `const Avatar = (() => {
  function handleUpload(event){
    const file=event.target.files[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=(e)=>{
      const img=new Image();
      img.onload=()=>{
        drawAvatar(img,'avatar-canvas',true);
        document.getElementById('avatar-canvas').style.display='block';
        document.getElementById('avatar-placeholder').style.display='none';
        const dataURL=document.getElementById('avatar-canvas').toDataURL('image/png');
        const user=Storage.getUser();
        user.avatarDataURL=dataURL;
        Storage.saveUser(user);
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  }
  function handleCheckinPhoto(event){
    const file=event.target.files[0]; if(!file)return Promise.resolve(null);
    return new Promise((resolve)=>{
      const reader=new FileReader();
      reader.onload=(e)=>{
        const img=new Image();
        img.onload=()=>{
          const canvas=document.createElement('canvas');
          canvas.width=400; canvas.height=400*(img.height/img.width);
          canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
          resolve(canvas.toDataURL('image/jpeg',0.7));
        };
        img.src=e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
  function drawAvatar(imgOrDataURL,canvasId,isCircle){
    const canvas=document.getElementById(canvasId); if(!canvas)return;
    const ctx=canvas.getContext('2d'); const size=canvas.width;
    ctx.clearRect(0,0,size,size);
    if(isCircle!==false){
      ctx.beginPath(); ctx.arc(size/2,size/2,size/2,0,Math.PI*2); ctx.closePath(); ctx.clip();
    }
    if(typeof imgOrDataURL==='string'){
      const img=new Image();
      img.onload=()=>drawCentered(ctx,img,size);
      img.src=imgOrDataURL; return;
    }
    drawCentered(ctx,imgOrDataURL,size);
  }
  function drawCentered(ctx,img,size){
    const ratio=Math.max(size/img.width,size/img.height);
    const w=img.width*ratio; const h=img.height*ratio;
    const x=(size-w)/2; const y=(size-h)/2;
    ctx.drawImage(img,x,y,w,h);
  }
  function renderSavedAvatar(canvasId,size){
    const user=Storage.getUser(); if(!user||!user.avatarDataURL)return;
    const canvas=document.getElementById(canvasId); if(!canvas)return;
    if(size){canvas.width=size;canvas.height=size}
    drawAvatar(user.avatarDataURL,canvasId,true);
  }
  return {handleUpload,handleCheckinPhoto,drawAvatar,renderSavedAvatar};
})();
`;

fs.writeFileSync(path.join(jsDir, 'avatar.js'), jsAvatar, 'utf8');
console.log('avatar.js written');

// ===== JS: animation.js =====
const jsAnimation = `const Animation = (() => {
  function celebrate(count,colors){
    count=count||30; colors=colors||['#6C5CE7','#FECA57','#FF6B6B','#00D2D3','#A29BFE'];
    let container=document.querySelector('.particles-container');
    if(!container){container=document.createElement('div');container.className='particles-container';document.body.appendChild(container)}
    container.innerHTML='';
    const cx=window.innerWidth/2; const cy=window.innerHeight/2;
    for(let i=0;i<count;i++){
      const p=document.createElement('div'); p.className='particle';
      const angle=(Math.PI*2*i)/count+(Math.random()-0.5)*0.5;
      const dist=100+Math.random()*200;
      const dx=Math.cos(angle)*dist; const dy=Math.sin(angle)*dist;
      p.style.left=cx+'px'; p.style.top=cy+'px';
      p.style.setProperty('--dx',dx+'px'); p.style.setProperty('--dy',dy+'px');
      p.style.background=colors[i%colors.length];
      p.style.width=(6+Math.random()*8)+'px'; p.style.height=(6+Math.random()*8)+'px';
      container.appendChild(p);
    }
    setTimeout(()=>{container.innerHTML=''},1200);
  }
  function playCheckinSuccess(){ celebrate(40); }
  function animateNumber(elementId,target,duration){
    duration=duration||800;
    const el=document.getElementById(elementId); if(!el)return;
    const start=0; const startTime=performance.now();
    function update(now){
      const elapsed=now-startTime; const progress=Math.min(elapsed/duration,1);
      const eased=1-Math.pow(1-progress,3);
      el.textContent=Math.floor(start+(target-start)*eased);
      if(progress<1)requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  return {celebrate,playCheckinSuccess,animateNumber};
})();
`;

fs.writeFileSync(path.join(jsDir, 'animation.js'), jsAnimation, 'utf8');
console.log('animation.js written');

// ===== JS: app.js =====
const jsApp = `const App = (() => {
  let currentSport=null;
  function init(){
    Storage.initIfNew(); initSplashStars();
    const user=Storage.getUser();
    if(!user||!user.nickname){goToPage('page-splash')}else{goToPage('page-main');renderMainPage()}
    initSportOptions();
  }
  function initSplashStars(){
    const c=document.getElementById('splash-stars'); if(!c)return;
    for(let i=0;i<50;i++){const s=document.createElement('div');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.animationDelay=(Math.random()*3)+'s';c.appendChild(s)}
  }
  function goToPage(pageId){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    const t=document.getElementById(pageId); if(!t)return;
    t.classList.add('active');
    switch(pageId){
      case'page-main':renderMainPage();break;
      case'page-diary':renderDiary();break;
      case'page-achievements':renderBadges();break;
      case'page-profile':renderProfile();break;
      case'page-avatar-setup':resetAvatarSetup();break;
    }
  }
  function resetAvatarSetup(){
    const user=Storage.getUser();
    if(user&&user.avatarDataURL){
      document.getElementById('avatar-placeholder').style.display='none';
      document.getElementById('avatar-canvas').style.display='block';
      Avatar.drawAvatar(user.avatarDataURL,'avatar-canvas',true);
    }
    if(user&&user.nickname)document.getElementById('nickname-input').value=user.nickname;
  }
  function finishSetup(){
    const nick=document.getElementById('nickname-input').value.trim();
    if(!nick){alert('\\u8bf7\\u8f93\\u5165\\u6635\\u79f0\\uff01');return}
    const user=Storage.getUser(); user.nickname=nick;
    if(!user.joinDate)user.joinDate=new Date().toISOString();
    Storage.saveUser(user); goToPage('page-main'); renderMainPage();
  }
  function renderMainPage(){
    const user=Storage.getUser(); const records=Storage.getRecords();
    document.getElementById('top-nickname').textContent=user?user.nickname:'\\u82f1\\u96c4';
    document.getElementById('streak-days').textContent=user?user.streak:0;
    if(user&&user.avatarDataURL)Avatar.renderSavedAvatar('top-avatar',40);
    const grid=document.getElementById('planet-grid'); grid.innerHTML='';
    Storage.PLANETS.forEach(planet=>{
      const pr=records.filter(r=>{if(planet.id==='strength')return['pushup','situp'].includes(r.sportId);return r.sportId===planet.id});
      const count=pr.length; const pct=Math.min(100,count/10*100);
      const card=document.createElement('div');
      card.className='planet-card'+(count>0?'':' locked');
      card.onclick=()=>showPlanetDetail(planet.id);
      card.innerHTML='<span class="planet-icon">'+planet.icon+'</span><div class="planet-name">'+planet.name+'</div><div class="planet-stats">\\u6253\\u5361 '+count+' \\u6b21</div><div class="planet-progress"><div class="planet-progress-bar" style="width:'+pct+'%"></div></div>'+(count===0?'<span class="planet-lock-badge">\\uD83D\\uDD12</span>':'');
      grid.appendChild(card);
    });
  }
  function showPlanetDetail(planetId){
    const planet=Storage.PLANETS.find(p=>p.id===planetId); if(!planet)return;
    const records=Storage.getRecords();
    const pr=records.filter(r=>{if(planetId==='strength')return['pushup','situp'].includes(r.sportId);return r.sportId===planetId});
    let html='<div style="font-size:64px;text-align:center;margin-bottom:12px;">'+planet.icon+'</div><h2 style="text-align:center;">'+planet.name+'</h2><p style="text-align:center;color:#636E72;">\\u6253\\u5361\\u6b21\\u6570\\uff1a'+pr.length+'</p>';
    if(pr.length===0)html+='<p style="text-align:center;color:#B2BEC3;">\\u8fd8\\u6ca1\\u6709\\u6253\\u5361\\u8bb0\\u5f55\\u54e6\\uff01</p>';
    html+='<div style="max-height:300px;overflow-y:auto;">';
    pr.slice().reverse().forEach(r=>{
      const sport=Storage.SPORT_TYPES.find(s=>s.id===r.sportId);
      html+='<div style="padding:10px;border-bottom:1px solid #F0F0F0;"><div style="font-size:13px;color:#636E72;">'+new Date(r.date).toLocaleDateString('zh-CN')+'</div><div style="font-weight:600;">'+(sport?sport.icon+' '+sport.name:'?')+'</div><div style="color:#6C5CE7;font-size:14px;">'+(r.data?r.data.value+r.data.unit:'')+(r.extra?r.extra.value+r.extra.unit:'')+'</div></div>';
    });
    html+='</div>';
    document.getElementById('planet-detail').innerHTML=html;
    document.getElementById('modal-planet').style.display='flex';
  }
  function initSportOptions(){
    const c=document.getElementById('sport-options'); if(!c)return; c.innerHTML='';
    Storage.SPORT_TYPES.forEach(sport=>{
      const opt=document.createElement('div'); opt.className='sport-option'; opt.dataset.sportId=sport.id;
      opt.innerHTML='<span class="sport-icon">'+sport.icon+'</span>'+sport.name;
      opt.onclick=()=>selectSport(sport,opt); c.appendChild(opt);
    });
  }
  function selectSport(sport,element){
    document.querySelectorAll('.sport-option').forEach(el=>el.classList.remove('selected'));
    element.classList.add('selected'); currentSport=sport;
    document.getElementById('checkin-data-input').style.display='block';
    document.getElementById('data-input-label').textContent='\\u8f93\\u5165'+sport.name+'\\u7684'+sport.unitLabel+'\\uff1a';
    document.getElementById('data-unit').textContent=sport.unit;
    const extra=document.getElementById('data-input-extra');
    if(sport.extra){extra.style.display='flex';document.getElementById('data-unit-extra').textContent=sport.extra.unit}else{extra.style.display='none'}
    updateCheckinSubmitBtn();
  }
  function previewCheckinPhoto(event){
    const file=event.target.files[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=(e)=>{
      const p=document.getElementById('checkin-photo-preview');
      p.src=e.target.result; p.style.display='block';
      document.getElementById('photo-upload-area').style.display='none';
    };
    reader.readAsDataURL(file); updateCheckinSubmitBtn();
  }
  function updateCheckinSubmitBtn(){
    const btn=document.getElementById('checkin-submit');
    const hasPhoto=document.getElementById('checkin-photo-preview').style.display!=='none';
    const hasSport=currentSport!==null;
    const hasData=parseFloat(document.getElementById('data-value').value)>0;
    btn.disabled=!(hasPhoto&&hasSport&&hasData);
  }
  async function submitCheckin(){
    const file=document.getElementById('checkin-photo-input').files[0];
    let photoDataURL=null;
    if(file)photoDataURL=await Avatar.handleCheckinPhoto({target:{files:[file]}});
    const record={
      sportId:currentSport.id, sportName:currentSport.name, sportIcon:currentSport.icon,
      data:{value:parseFloat(document.getElementById('data-value').value),unit:currentSport.unit},
      extra:currentSport.extra?{value:parseFloat(document.getElementById('data-value-extra').value),unit:currentSport.extra.unit}:null,
      note:document.getElementById('checkin-note').value.trim(), photo:photoDataURL
    };
    Storage.addRecord(record);
    const newBadges=Storage.checkBadges();
    Animation.playCheckinSuccess();
    document.getElementById('success-msg').textContent=getSuccessMessage(currentSport.id);
    if(newBadges.length>0){
      document.getElementById('badge-unlock').style.display='block';
      document.getElementById('badge-icon').textContent=newBadges[0].icon+' '+newBadges[0].name;
    }else{document.getElementById('badge-unlock').style.display='none'}
    document.getElementById('modal-success').style.display='flex';
    resetCheckinForm();
  }
  function resetCheckinForm(){
    document.getElementById('checkin-photo-input').value='';
    document.getElementById('checkin-photo-preview').style.display='none';
    document.getElementById('photo-upload-area').style.display='flex';
    document.getElementById('data-value').value='';
    document.getElementById('data-value-extra').value='';
    document.getElementById('checkin-note').value='';
    document.querySelectorAll('.sport-option').forEach(el=>el.classList.remove('selected'));
    document.getElementById('checkin-data-input').style.display='none';
    document.getElementById('checkin-submit').disabled=true;
    currentSport=null;
  }
  function getSuccessMessage(sportId){
    const msgs={football:['\\u592a\\u68d2\\u4e86 \\u8db3\\u7403\\u5c0f\\u5c06\\uff01','\\u4f20\\u7403\\u5c04\\u95e8 \\u4f60\\u662f\\u6700\\u68d2\\u7684'],basketball:['\\u7bee\\u7403\\u9ad8\\u624b\\uff01','\\u4e09\\u5206\\u7403\\u51c6\\u5fc3\\u6ee1\\u5206'],rope:['\\u8df3\\u7ef3\\u5c0f\\u98de\\u4eba\\uff01','\\u7ef3\\u5b50\\u6346\\u5f97\\u50cf\\u98ce'],running:['\\u8dd1\\u6b65\\u5c0f\\u98de\\u4fe0\\uff01','\\u575a\\u6301\\u5c31\\u662f\\u80dc\\u5229']};
    const arr=msgs[sportId]; if(arr)return arr[Math.floor(Math.random()*arr.length)];
    return '\\u592a\\u68d2\\u4e86 \\u7ee7\\u7eed\\u52a0\\u6cb9\\uff01';
  }
  function renderDiary(){
    const records=Storage.getRecords(); const list=document.getElementById('diary-list'); const empty=document.getElementById('diary-empty');
    if(records.length===0){list.innerHTML='';empty.style.display='block';return}
    empty.style.display='none';
    list.innerHTML=records.slice().reverse().map(r=>{
      const sport=Storage.SPORT_TYPES.find(s=>s.id===r.sportId);
      const photo=r.photo?'<img class="diary-photo" src="'+r.photo+'">':'<div class="diary-photo" style="display:flex;align-items:center;justify-content:center;font-size:32px;background:#F0F0F0;">'+(sport?sport.icon:'\\uD83D\\uDCDD')+'</div>';
      return '<div class="diary-entry">'+photo+'<div class="diary-info"><div class="diary-date">\\uD83D\\uDCC5 '+new Date(r.date).toLocaleDateString('zh-CN')+'</div><div class="diary-sport">'+(sport?sport.icon:'')+' '+(r.sportName||'\\u8fd0\\u52a8')+'</div><div class="diary-data">'+(r.data?r.data.value+r.data.unit:'')+(r.extra?r.extra.value+r.extra.unit:'')+'</div>'+(r.note?'<div class="diary-note">\\u201c'+r.note+'\\u201d</div>':'')+'</div></div>';
    }).join('');
  }
  function renderBadges(){
    const unlocked=Storage.getUnlockedBadges(); const grid=document.getElementById('badges-grid'); grid.innerHTML='';
    Storage.BADGE_DEFS.forEach(def=>{
      const ok=unlocked.includes(def.id);
      const card=document.createElement('div'); card.className='badge-card'+(ok?'':' locked');
      card.innerHTML='<span class="badge-icon">'+(ok?def.icon:'\\uD83D\\uDD12')+'</span><div class="badge-name">'+(ok?def.name:'???')+'</div><div class="badge-desc">'+(ok?def.desc:'\\u672a\\u89e3\\u9501')+'</div>';
      grid.appendChild(card);
    });
  }
  function renderProfile(){
    const user=Storage.getUser(); const records=Storage.getRecords(); if(!user)return;
    if(user.avatarDataURL)Avatar.renderSavedAvatar('profile-avatar',120);
    document.getElementById('profile-nickname').textContent=user.nickname;
    document.getElementById('profile-join-date').textContent='\\u52a0\\u5165\\u65f6\\u95f4\\uff1a'+new Date(user.joinDate).toLocaleDateString('zh-CN');
    Animation.animateNumber('stat-total',records.length);
    Animation.animateNumber('stat-streak',user.streak||0);
    Animation.animateNumber('stat-sports',new Set(records.map(r=>r.sportId)).size);
    renderWeeklyChart(records);
  }
  function renderWeeklyChart(records){
    const chart=document.getElementById('report-chart'); chart.innerHTML='';
    const days=[]; for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(d.toISOString().slice(0,10))}
    const maxCount=5;
    days.forEach(day=>{
      const count=records.filter(r=>r.date.slice(0,10)===day).length;
      const bar=document.createElement('div'); bar.className='chart-bar';
      bar.style.height=Math.max(4,count/maxCount*120)+'px';
      bar.innerHTML='<span class="chart-bar-label">'+parseInt(day.slice(5,7))+'/'+parseInt(day.slice(8,10))+'</span>';
      if(count>0)bar.title=day+': '+count+'\\u6b21\\u6253\\u5361';
      chart.appendChild(bar);
    });
  }
  function closeModal(modalId){document.getElementById(modalId).style.display='none';if(modalId==='modal-success')goToPage('page-main')}
  function exportData(){
    const data=Storage.exportAll();
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob); const a=document.createElement('a');
    a.href=url; a.download='\\u8fd0\\u52a8\\u5c0f\\u82f1\\u96c4_'+new Date().toISOString().slice(0,10)+'.json';
    a.click(); URL.revokeObjectURL(url); alert('\\u6570\\u636e\\u5df2\\u5bfc\\u51fa\\uff01');
  }
  function resetData(){if(confirm('\\u786e\\u5b9a\\u8981\\u6e05\\u9664\\u6240\\u6709\\u6570\\u636e\\u5417\\uff1f')){Storage.resetAll();location.reload()}}
  function showTab(tab){document.querySelectorAll('.nav-btn').forEach((btn,i)=>{btn.classList.toggle('active',i===(tab==='map'?0:-1))})}
  document.addEventListener('DOMContentLoaded',()=>{const di=document.getElementById('data-value');if(di)di.addEventListener('input',updateCheckinSubmitBtn);init()});
  if(document.readyState!=='loading')init();
  return {goToPage,finishSetup,previewCheckinPhoto,submitCheckin,closeModal,exportData,resetData,showTab};
})();
`;

fs.writeFileSync(path.join(jsDir, 'app.js'), jsApp, 'utf8');
console.log('app.js written');

// ===== index.html =====
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>\\u8fd0\\u52a8\\u5c0f\\u82f1\\u96c4</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="page-splash" class="page active">
    <div class="splash-container">
      <div class="splash-mascot">\\uD83C\\uDFC3</div>
      <h1 class="splash-title">\\u8fd0\\u52a8\\u5c0f\\u82f1\\u96c4</h1>
      <p class="splash-subtitle">\\u6bcf\\u5929\\u8fd0\\u52a8\\uff0c\\u70b9\\u4eae\\u661f\\u7403\\uff01</p>
      <button class="btn btn-primary btn-lg" onclick="App.goToPage('page-avatar-setup')">\\u5f00\\u59cb\\u5192\\u9669 \\u2728</button>
    </div>
    <div class="splash-stars" id="splash-stars"></div>
  </div>

  <div id="page-avatar-setup" class="page">
    <div class="container">
      <h2 class="page-title">\\uD83C\\uDFA8 \\u521b\\u5efa\\u4f60\\u7684\\u82f1\\u96c4\\u5f62\\u8c61</h2>
      <div class="avatar-setup">
        <div class="avatar-preview" id="avatar-preview">
          <div class="avatar-placeholder" id="avatar-placeholder"><span>\\uD83D\\uDCF7</span><small>\\u70b9\\u51fb\\u4e0a\\u4f20\\u7167\\u7247</small></div>
          <canvas id="avatar-canvas" width="200" height="200" style="display:none;"></canvas>
        </div>
        <input type="file" id="avatar-input" accept="image/*" style="display:none" onchange="Avatar.handleUpload(event)">
        <div class="avatar-actions"><button class="btn btn-secondary" onclick="document.getElementById('avatar-input').click()">\\uD83D\\uDCF7 \\u4e0a\\u4f20\\u7167\\u7247</button></div>
        <div class="nickname-input"><label>\\u4f60\\u7684\\u82f1\\u96c4\\u540d\\u5b57\\uff1a</label><input type="text" id="nickname-input" placeholder="\\u8bf7\\u8f93\\u5165\\u6635\\u79f0" maxlength="10"></div>
        <button class="btn btn-primary btn-lg" onclick="App.finishSetup()">\\u8fdb\\u5165\\u8fd0\\u52a8\\u661f\\u7403 \\uD83D\\uDE80</button>
      </div>
    </div>
  </div>

  <div id="page-main" class="page">
    <header class="top-bar">
      <div class="user-info" onclick="App.goToPage('page-profile')">
        <canvas id="top-avatar" width="40" height="40" class="top-avatar-canvas"></canvas>
        <span id="top-nickname">\\u82f1\\u96c4</span>
      </div>
      <div class="stats-chip"><span>\\uD83D\\uDD25 \\u8fde\\u7eed <strong id="streak-days">0</strong> \\u5929</span></div>
      <button class="btn btn-sm btn-accent" onclick="App.goToPage('page-checkin')">+ \\u6253\\u5361</button>
    </header>
    <div class="container map-container">
      <h2 class="section-title">\\uD83C\\uDF1F \\u8fd0\\u52a8\\u661f\\u7403\\u5730\\u56fe</h2>
      <div class="planet-grid" id="planet-grid"></div>
    </div>
    <nav class="bottom-nav">
      <button class="nav-btn active" onclick="App.showTab('map')">\\uD83D\\uDDFA\\uFE0F \\u661f\\u7403</button>
      <button class="nav-btn" onclick="App.goToPage('page-diary')">\\uD83D\\uDCDA \\u65e5\\u8bb0</button>
      <button class="nav-btn" onclick="App.goToPage('page-achievements')">\\uD83C\\uDFC6 \\u52cb\\u7ae0</button>
      <button class="nav-btn" onclick="App.goToPage('page-profile')">\\uD83D\\uDC64 \\u6211\\u7684</button>
    </nav>
  </div>

  <div id="page-checkin" class="page">
    <div class="container">
      <button class="btn-back" onclick="App.goToPage('page-main')">\\u2190 \\u8fd4\\u56de</button>
      <h2 class="page-title">\\uD83D\\uDCF8 \\u4eca\\u65e5\\u8fd0\\u52a8\\u6253\\u5361</h2>
      <div class="checkin-photo" id="checkin-photo-area">
        <div class="photo-upload-area" id="photo-upload-area" onclick="document.getElementById('checkin-photo-input').click()"><span class="upload-icon">\\uD83D\\uDCF7</span><span>\\u70b9\\u51fb\\u4e0a\\u4f20\\u8fd0\\u52a8\\u7167\\u7247</span></div>
        <img id="checkin-photo-preview" class="photo-preview" style="display:none">
        <input type="file" id="checkin-photo-input" accept="image/*" style="display:none" onchange="App.previewCheckinPhoto(event)">
      </div>
      <div class="checkin-sport-select">
        <h3>\\u9009\\u62e9\\u8fd0\\u52a8\\u7c7b\\u578b\\uff1a</h3>
        <div class="sport-options" id="sport-options"></div>
      </div>
      <div class="checkin-data-input" id="checkin-data-input" style="display:none">
        <h3 id="data-input-label">\\u8f93\\u5165\\u8fd0\\u52a8\\u6570\\u636e\\uff1a</h3>
        <div class="data-input-group"><input type="number" id="data-value" placeholder="\\u8bf7\\u8f93\\u5165\\u6570\\u503c" min="0" step="any"><span class="data-unit" id="data-unit"></span></div>
        <div class="data-input-extra" id="data-input-extra" style="display:none"><input type="number" id="data-value-extra" placeholder="\\u8bf7\\u8f93\\u5165\\u989d\\u5916\\u6570\\u503c" min="0" step="any"><span class="data-unit" id="data-unit-extra"></span></div>
      </div>
      <div class="checkin-note"><label>\\u8fd0\\u52a8\\u611f\\u60f3\\uff08\\u53ef\\u9009\\uff09\\uff1a</label><textarea id="checkin-note" placeholder="\\u4eca\\u5929\\u8fd0\\u52a8\\u611f\\u89c9\\u600e\\u4e48\\u6837\\uff1f" maxlength="100"></textarea></div>
      <button class="btn btn-primary btn-lg btn-block" id="checkin-submit" onclick="App.submitCheckin()" disabled>\\uD83C\\uDF89 \\u5b8c\\u6210\\u6253\\u5361</button>
    </div>
  </div>

  <div id="page-diary" class="page">
    <div class="container">
      <button class="btn-back" onclick="App.goToPage('page-main')">\\u2190 \\u8fd4\\u56de</button>
      <h2 class="page-title">\\uD83D\\uDCDA \\u8fd0\\u52a8\\u65e5\\u8bb0</h2>
      <div class="diary-list" id="diary-list"></div>
      <div class="empty-state" id="diary-empty" style="display:none"><span class="empty-icon">\\uD83D\\uDCDD</span><p>\\u8fd8\\u6ca1\\u6709\\u8fd0\\u52a8\\u8bb0\\u5f55\\u54e6\\uff5e<br>\\u5feb\\u53bb\\u6253\\u5361\\u5427\\uff01</p></div>
    </div>
  </div>

  <div id="page-achievements" class="page">
    <div class="container">
      <button class="btn-back" onclick="App.goToPage('page-main')">\\u2190 \\u8fd4\\u56de</button>
      <h2 class="page-title">\\uD83C\\uDFC6 \\u6211\\u7684\\u52cb\\u7ae0\\u5899</h2>
      <div class="badges-grid" id="badges-grid"></div>
    </div>
  </div>

  <div id="page-profile" class="page">
    <div class="container">
      <button class="btn-back" onclick="App.goToPage('page-main')">\\u2190 \\u8fd4\\u56de</button>
      <h2 class="page-title">\\uD83D\\uDC64 \\u6211\\u7684\\u8fd0\\u52a8\\u4e2d\\u5fc3</h2>
      <div class="profile-card">
        <canvas id="profile-avatar" width="120" height="120"></canvas>
        <h3 id="profile-nickname">\\u82f1\\u96c4</h3>
        <p class="profile-join-date" id="profile-join-date"></p>
      </div>
      <div class="profile-stats">
        <div class="stat-card"><span class="stat-number" id="stat-total">0</span><span class="stat-label">\\u603b\\u6253\\u5361</span></div>
        <div class="stat-card"><span class="stat-number" id="stat-streak">0</span><span class="stat-label">\\u8fde\\u7eed\\u5929\\u6570</span></div>
        <div class="stat-card"><span class="stat-number" id="stat-sports">0</span><span class="stat-label">\\u8fd0\\u52a8\\u79cd\\u7c7b</span></div>
      </div>
      <div class="profile-section"><h3>\\uD83D\\uDCCA \\u8fd0\\u52a8\\u62a5\\u544a</h3><div class="report-chart" id="report-chart"></div></div>
      <div class="profile-actions">
        <button class="btn btn-secondary" onclick="App.exportData()">\\uD83D\\uDCDE \\u5bfc\\u51fa\\u6570\\u636e</button>
        <button class="btn btn-danger" onclick="App.resetData()">\\uD83D\\uDdbc\\uFE0F \\u91cd\\u7f6e\\u6570\\u636e</button>
      </div>
    </div>
  </div>

  <div class="modal-overlay" id="modal-success" style="display:none">
    <div class="modal-content modal-success">
      <div class="success-animation" id="success-animation">\\uD83C\\uDF89</div>
      <h2>\\u6253\\u5361\\u6210\\u529f\\uff01</h2>
      <p id="success-msg">\\u592a\\u68d2\\u4e86\\uff0c\\u7ee7\\u7eed\\u52a0\\u6cb9\\uff01</p>
      <div class="badge-unlock" id="badge-unlock" style="display:none"><p>\\uD83C\\uDFC6 \\u89e3\\u9501\\u65b0\\u52cb\\u7ae0\\uff01</p><span id="badge-icon">\\uD83C\\uDF47</span></div>
      <button class="btn btn-primary" onclick="App.closeModal('modal-success')">\\u592a\\u597d\\u4e86 \\u2728</button>
    </div>
  </div>

  <div class="modal-overlay" id="modal-planet" style="display:none">
    <div class="modal-content modal-planet">
      <button class="modal-close" onclick="App.closeModal('modal-planet')">\\u2715</button>
      <div class="planet-detail" id="planet-detail"></div>
    </div>
  </div>

  <script src="js/storage.js"></script>
  <script src="js/avatar.js"></script>
  <script src="js/animation.js"></script>
  <script src="js/app.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(base, 'index.html'), html, 'utf8');
console.log('index.html written');
console.log('ALL DONE');
