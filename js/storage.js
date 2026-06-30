const Storage = (() => {
  const KEYS = { USER:'rungogo_user', RECORDS:'rungogo_records', BADGES:'rungogo_badges' };
  const SPORT_TYPES = [
    {id:'football', name:'\u8db3\u7403', icon:'\u26bd', unit:'\u5206\u949f', unitLabel:'\u8fd0\u52a8\u65f6\u957f', dataField:'duration'},
    {id:'basketball', name:'\u7bee\u7403', icon:'\uD83C\uDFC0', unit:'\u5206\u949f', unitLabel:'\u8fd0\u52a8\u65f6\u957f', dataField:'duration'},
    {id:'rope', name:'\u8df3\u7ef3', icon:'\uD83C\uDFC3', unit:'\u6b21', unitLabel:'\u8df3\u7ef3\u6b21\u6570', dataField:'count'},
    {id:'running', name:'\u8dd1\u6b65', icon:'\uD83C\uDFC3\u200d\u2642\uFE0F', unit:'km', unitLabel:'\u8dd1\u6b65\u8ddd\u79bb', dataField:'distance', extra:{unit:'\u5206\u949f',label:'\u7528\u65f6',field:'duration'}},
    {id:'swimming', name:'\u6e38\u6cf3', icon:'\uD83C\uDFCA', unit:'\u7c73', unitLabel:'\u6e38\u6cf3\u8ddd\u79bb', dataField:'distance'},
    {id:'pushup', name:'\u4f8f\u5367\u6491', icon:'\uD83D\uDCAA', unit:'\u4e2a', unitLabel:'\u5b8c\u6210\u4e2a\u6570', dataField:'count'},
    {id:'situp', name:'\u4ef5\u5367\u8d77\u5750', icon:'\uD83E\uDDB8', unit:'\u4e2a', unitLabel:'\u5b8c\u6210\u4e2a\u6570', dataField:'count'},
    {id:'cycling', name:'\u9a91\u8f66', icon:'\uD83D\uDEB4', unit:'km', unitLabel:'\u9a91\u884c\u8ddd\u79bb', dataField:'distance'},
    {id:'custom', name:'\u81ea\u5b9a\u4e49', icon:'\uD83C\uDF1F', unit:'', unitLabel:'\u8bf7\u8f93\u5165\u6570\u636e', dataField:'custom'}
  ];
  const PLANETS = [
    {id:'football', name:'\u8db3\u7403\u661f', icon:'\u26bd', color:'#00B894'},
    {id:'basketball', name:'\u7bee\u7403\u661f', icon:'\uD83C\uDFC0', color:'#E17055'},
    {id:'rope', name:'\u8df3\u8dc3\u661f', icon:'\uD83C\uDFC3', color:'#6C5CE7'},
    {id:'running', name:'\u8dd1\u6b65\u661f', icon:'\uD83C\uDFC3\u200d\u2642\uFE0F', color:'#0984E3'},
    {id:'swimming', name:'\u6e38\u6cf3\u661f', icon:'\uD83C\uDFCA', color:'#00CEC9'},
    {id:'strength', name:'\u529b\u91cf\u661f', icon:'\uD83D\uDCAA', color:'#FDCB6E'}
  ];
  const BADGE_DEFS = [
    {id:'first_checkin', icon:'\uD83C\uDF47', name:'\u521d\u6b21\u51fa\u53d1', desc:'\u5b8c\u6210\u7b2c\u4e00\u6b21\u6253\u5361', condition:(records)=>records.length>=1},
    {id:'streak_3', icon:'\uD83D\uDD25', name:'\u4e09\u5929\u5c0f\u706b', desc:'\u8fde\u7eed\u6253\u5361 3 \u5929', condition:(_,user)=>user.streak>=3},
    {id:'streak_7', icon:'\uD83D\uDD25', name:'\u4e00\u5468\u706b\u7130', desc:'\u8fde\u7eed\u6253\u5361 7 \u5929', condition:(_,user)=>user.streak>=7},
    {id:'streak_30', icon:'\uD83C\uDF0B', name:'\u6708\u5ea6\u5f3a\u8005', desc:'\u8fde\u7eed\u6253\u5361 30 \u5929', condition:(_,user)=>user.streak>=30},
    {id:'sport_5', icon:'\uD83C\uDF1F', name:'\u5168\u80fd\u65b0\u661f', desc:'\u5b8c\u6210 5 \u79cd\u4e0d\u540c\u8fd0\u52a8', condition:(records)=>new Set(records.map(r=>r.sportId)).size>=5},
    {id:'total_20', icon:'\uD83C\uDFC6', name:'\u8fd0\u52a8\u4e4b\u661f', desc:'\u7d2f\u8ba1\u6253\u5361 20 \u6b21', condition:(records)=>records.length>=20},
    {id:'total_50', icon:'\uD83C\uDF51', name:'\u8d85\u7ea7\u82f1\u96c4', desc:'\u7d2f\u8ba1\u6253\u5361 50 \u6b21', condition:(records)=>records.length>=50}
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
