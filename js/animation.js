const Animation = (() => {
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
