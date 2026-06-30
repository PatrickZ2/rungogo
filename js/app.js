const App = (() => {
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
    if(!nick){alert('\u8bf7\u8f93\u5165\u6635\u79f0\uff01');return}
    const user=Storage.getUser(); user.nickname=nick;
    if(!user.joinDate)user.joinDate=new Date().toISOString();
    Storage.saveUser(user); goToPage('page-main'); renderMainPage();
  }
  function renderMainPage(){
    const user=Storage.getUser(); const records=Storage.getRecords();
    document.getElementById('top-nickname').textContent=user?user.nickname:'\u82f1\u96c4';
    document.getElementById('streak-days').textContent=user?user.streak:0;
    if(user&&user.avatarDataURL)Avatar.renderSavedAvatar('top-avatar',40);
    const grid=document.getElementById('planet-grid'); grid.innerHTML='';
    Storage.PLANETS.forEach(planet=>{
      const pr=records.filter(r=>{if(planet.id==='strength')return['pushup','situp'].includes(r.sportId);return r.sportId===planet.id});
      const count=pr.length; const pct=Math.min(100,count/10*100);
      const card=document.createElement('div');
      card.className='planet-card'+(count>0?'':' locked');
      card.onclick=()=>showPlanetDetail(planet.id);
      card.innerHTML='<span class="planet-icon">'+planet.icon+'</span><div class="planet-name">'+planet.name+'</div><div class="planet-stats">\u6253\u5361 '+count+' \u6b21</div><div class="planet-progress"><div class="planet-progress-bar" style="width:'+pct+'%"></div></div>'+(count===0?'<span class="planet-lock-badge">\uD83D\uDD12</span>':'');
      grid.appendChild(card);
    });
  }
  function showPlanetDetail(planetId){
    const planet=Storage.PLANETS.find(p=>p.id===planetId); if(!planet)return;
    const records=Storage.getRecords();
    const pr=records.filter(r=>{if(planetId==='strength')return['pushup','situp'].includes(r.sportId);return r.sportId===planetId});
    let html='<div style="font-size:64px;text-align:center;margin-bottom:12px;">'+planet.icon+'</div><h2 style="text-align:center;">'+planet.name+'</h2><p style="text-align:center;color:#636E72;">\u6253\u5361\u6b21\u6570\uff1a'+pr.length+'</p>';
    if(pr.length===0)html+='<p style="text-align:center;color:#B2BEC3;">\u8fd8\u6ca1\u6709\u6253\u5361\u8bb0\u5f55\u54e6\uff01</p>';
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
    document.getElementById('data-input-label').textContent='\u8f93\u5165'+sport.name+'\u7684'+sport.unitLabel+'\uff1a';
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
    const msgs={football:['\u592a\u68d2\u4e86 \u8db3\u7403\u5c0f\u5c06\uff01','\u4f20\u7403\u5c04\u95e8 \u4f60\u662f\u6700\u68d2\u7684'],basketball:['\u7bee\u7403\u9ad8\u624b\uff01','\u4e09\u5206\u7403\u51c6\u5fc3\u6ee1\u5206'],rope:['\u8df3\u7ef3\u5c0f\u98de\u4eba\uff01','\u7ef3\u5b50\u6346\u5f97\u50cf\u98ce'],running:['\u8dd1\u6b65\u5c0f\u98de\u4fe0\uff01','\u575a\u6301\u5c31\u662f\u80dc\u5229']};
    const arr=msgs[sportId]; if(arr)return arr[Math.floor(Math.random()*arr.length)];
    return '\u592a\u68d2\u4e86 \u7ee7\u7eed\u52a0\u6cb9\uff01';
  }
  function renderDiary(){
    const records=Storage.getRecords(); const list=document.getElementById('diary-list'); const empty=document.getElementById('diary-empty');
    if(records.length===0){list.innerHTML='';empty.style.display='block';return}
    empty.style.display='none';
    list.innerHTML=records.slice().reverse().map(r=>{
      const sport=Storage.SPORT_TYPES.find(s=>s.id===r.sportId);
      const photo=r.photo?'<img class="diary-photo" src="'+r.photo+'">':'<div class="diary-photo" style="display:flex;align-items:center;justify-content:center;font-size:32px;background:#F0F0F0;">'+(sport?sport.icon:'\uD83D\uDCDD')+'</div>';
      return '<div class="diary-entry">'+photo+'<div class="diary-info"><div class="diary-date">\uD83D\uDCC5 '+new Date(r.date).toLocaleDateString('zh-CN')+'</div><div class="diary-sport">'+(sport?sport.icon:'')+' '+(r.sportName||'\u8fd0\u52a8')+'</div><div class="diary-data">'+(r.data?r.data.value+r.data.unit:'')+(r.extra?r.extra.value+r.extra.unit:'')+'</div>'+(r.note?'<div class="diary-note">\u201c'+r.note+'\u201d</div>':'')+'</div></div>';
    }).join('');
  }
  function renderBadges(){
    const unlocked=Storage.getUnlockedBadges(); const grid=document.getElementById('badges-grid'); grid.innerHTML='';
    Storage.BADGE_DEFS.forEach(def=>{
      const ok=unlocked.includes(def.id);
      const card=document.createElement('div'); card.className='badge-card'+(ok?'':' locked');
      card.innerHTML='<span class="badge-icon">'+(ok?def.icon:'\uD83D\uDD12')+'</span><div class="badge-name">'+(ok?def.name:'???')+'</div><div class="badge-desc">'+(ok?def.desc:'\u672a\u89e3\u9501')+'</div>';
      grid.appendChild(card);
    });
  }
  function renderProfile(){
    const user=Storage.getUser(); const records=Storage.getRecords(); if(!user)return;
    if(user.avatarDataURL)Avatar.renderSavedAvatar('profile-avatar',120);
    document.getElementById('profile-nickname').textContent=user.nickname;
    document.getElementById('profile-join-date').textContent='\u52a0\u5165\u65f6\u95f4\uff1a'+new Date(user.joinDate).toLocaleDateString('zh-CN');
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
      if(count>0)bar.title=day+': '+count+'\u6b21\u6253\u5361';
      chart.appendChild(bar);
    });
  }
  function closeModal(modalId){document.getElementById(modalId).style.display='none';if(modalId==='modal-success')goToPage('page-main')}
  function exportData(){
    const data=Storage.exportAll();
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob); const a=document.createElement('a');
    a.href=url; a.download='\u8fd0\u52a8\u5c0f\u82f1\u96c4_'+new Date().toISOString().slice(0,10)+'.json';
    a.click(); URL.revokeObjectURL(url); alert('\u6570\u636e\u5df2\u5bfc\u51fa\uff01');
  }
  function resetData(){if(confirm('\u786e\u5b9a\u8981\u6e05\u9664\u6240\u6709\u6570\u636e\u5417\uff1f')){Storage.resetAll();location.reload()}}
  function showTab(tab){document.querySelectorAll('.nav-btn').forEach((btn,i)=>{btn.classList.toggle('active',i===(tab==='map'?0:-1))})}
  document.addEventListener('DOMContentLoaded',()=>{const di=document.getElementById('data-value');if(di)di.addEventListener('input',updateCheckinSubmitBtn);init()});
  if(document.readyState!=='loading')init();
  return {goToPage,finishSetup,previewCheckinPhoto,submitCheckin,closeModal,exportData,resetData,showTab};
})();
