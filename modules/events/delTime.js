module.exports.config= {
  name:"delTime",
  eventType:["log:unsubscribe"],
  version:"beta",credits:"uzairrajput",
  description:"Automatically delete data time join user when exit"};

 const fs=require("fs");
 var path=__dirname+"/../commands/hethong/timeJoin.json";
module.exports.run=async function({event:e}){const{threadID:t,logMessageData:l}=e, {writeFileSync:w,readFileSync:r}=fs,{stringify:s,parse:p}=JSON;var v=l.leftParticipantFbId;let a=p(r(path));a[v+t] = "";w(path,s(a,null,2));}
