const Avatar = (() => {
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
