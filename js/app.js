/* Abhyasa app logic. Content lives in js/content.js. */
const APP_VERSION="1.3.0";   // bump with tools/bump_version.py for every release
const SCHEMA=2;              // bump when the saved data shape changes, and add a step to migrate()
/* ================= icons ================= */
const ICO={
 body:'<circle cx="8" cy="8" r="4.5"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M11.3 11.3l8.7 8.7"/>',
 bonds:'<path d="M7 3c8 2.5 8 15.5 0 18"/><path d="M7 3v18"/><path d="M4 12h15m-3-3 3 3-3 3"/>',
 music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
 spirit:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',craft:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h5"/>',
 check:'<path d="m5 12 4.5 4.5L19 7"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',path:'<path d="M6 21c0-5 12-4 12-9S6 7 6 3"/><circle cx="6" cy="3" r="1.5"/><circle cx="6" cy="21" r="1.5"/>',hero:'<circle cx="12" cy="6.5" r="3.5"/><path d="M5 21c.8-5.5 4-7.5 7-7.5s6.2 2 7 7.5"/>',moon:'<path d="M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z"/>',swap:'<path d="M4 8h13l-3-3M20 16H7l3 3"/>',back:'<path d="m15 5-7 7 7 7"/>',
 tree:'<circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="3.5" r="1.8"/><circle cx="4.5" cy="17" r="1.8"/><circle cx="19.5" cy="17" r="1.8"/><path d="M12 5.5v4.3M10.2 13.3l-4 2.6M13.8 13.3l4 2.6"/>',
 trial:'<path d="M3 7h18M5 4h14M6 7v13M18 7v13M10 7v4h4V7"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 Weapon:'<circle cx="8" cy="8" r="4.5"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M11.3 11.3l8.7 8.7"/>',Bow:'<path d="M7 3c8 2.5 8 15.5 0 18"/><path d="M7 3v18"/>',Armlets:'<ellipse cx="12" cy="12" rx="8" ry="4"/><path d="M4 12v2c0 2 3.6 4 8 4s8-2 8-4v-2"/>',
 Quiver:'<path d="M8 21 14 5M11 21l6-16M7 7l3-4 2 4M13 7l3-4 2 4"/>',Instrument:'<path d="M5 19 18 6"/><circle cx="6.5" cy="17.5" r="3"/><circle cx="18" cy="6" r="2"/>',Mala:'<circle cx="12" cy="11" r="7" stroke-dasharray="1 3.2"/><path d="M12 18v3"/>'
};
const DIYA=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c2.2 3 4 4.6 4 7.2a4 4 0 0 1-8 0c0-2.6 1.8-4.2 4-7.2z" fill="#f0a334"/><path d="M12 7c1 1.4 1.8 2.2 1.8 3.4a1.8 1.8 0 0 1-3.6 0C10.2 9.2 11 8.4 12 7z" fill="#fff1c2"/><path d="M2.5 14.5h19c-1 3.5-4.8 6-9.5 6s-8.5-2.5-9.5-6z" fill="#b9622b"/></svg>`;
Object.assign(ICO,{
 flex:'<circle cx="12" cy="5" r="2"/><path d="M12 7v6M6 11l6 2 6-2M8 20l4-7 4 7"/>',
 love:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
 learn:'<path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z"/>',
 focus:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
 calm:'<path d="m12 3 2.2 5.6 5.8.5-4.4 3.8 1.4 5.8L12 15.6 7 18.7l1.4-5.8L4 9.1l5.8-.5z"/>',
 Pot:'<path d="M8 8h8l1 3c1 4-2 8-5 8s-6-4-5-8zM10 8V5h4v3M16 10l3-2"/>',
 Garland:'<path d="M5 5c0 8 3 13 7 13s7-5 7-13" stroke-dasharray="1 3.2"/><circle cx="12" cy="19" r="2"/>',
 Ring:'<circle cx="12" cy="14" r="6"/><path d="m10 6 2-3 2 3-2 2z"/>',
 Book:'<path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z"/>',
 Swan:'<path d="M5 15c2 4 12 4 14 0-3 1-6 1-8-1 0-3 3-4 3-7a2 2 0 0 0-4 0"/><path d="M8 7H6"/>',
 Shell:'<path d="M12 3c4 3 6 7 4 12-2 4-6 6-8 3-2-2 0-5 2-5s3 2 2 3"/>',
 Star:'<path d="m12 3 2.2 5.6 5.8.5-4.4 3.8 1.4 5.8L12 15.6 7 18.7l1.4-5.8L4 9.1l5.8-.5z"/>'});
const ic=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[k]||ICO.calm}</svg>`;
const HE=g=>PEOPLE[g].pr==="she"?"she":"he",HIM=g=>PEOPLE[g].pr==="she"?"her":"him",HIS=g=>PEOPLE[g].pr==="she"?"her":"his",CAP=w=>w[0].toUpperCase()+w.slice(1);

/* ================= state ================= */
const KEY="abhyasa.v3",$=s=>document.querySelector(s);
const fresh=()=>({v:SCHEMA,on:false,name:"",paths:[],tags:{},kit:[],anchors:{},goal:7,days:{},journey:null,chap:{},chapters:[],charms:[],deck:"",closed:"",tick:"",check:{d:"",energy:"ok",sore:[],where:"normal"},log:[],time:30,prog:Object.fromEntries(ORDER.map(p=>[p,{m:0,xp:0}])),hist:{},dismiss:{},learn:{},lore:"",intro:[],tips:[],custom:{},dayCtx:{d:""},plan:{d:"",items:[],swaps:0,closed:false},view:"today",streak:0,best:0,last:"",shieldUsed:{w:"",n:0},seen:0,total:0,syn:[]});
let S;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!S.prog)S=fresh();else S=migrate(Object.assign(fresh(),S));
try{injectCustom()}catch(e){}
function migrate(o){
 // Add one step per schema change, e.g. if(o.v<2){ ...convert...; o.v=2 }
 if((o.v||1)<2){ORDER.forEach(p=>{if(!o.prog[p])o.prog[p]={m:0,xp:0}});o.hist=o.hist||{};o.dismiss=o.dismiss||{};if(o.paths.length>5)o.paths=o.paths.slice(0,5)}
 ORDER.forEach(p=>{if(!o.prog[p])o.prog[p]={m:0,xp:0}});
 o.learn=o.learn||{};o.intro=o.intro||[];o.tips=o.tips||[];o.lore=o.lore||"";o.custom=o.custom||{};o.dayCtx=o.dayCtx||{d:""};
 o.v=SCHEMA;return o;
}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const td=()=>new Date().toLocaleDateString("en-CA");
const diff=(a,b)=>Math.round((Date.parse(b+"T00:00:00Z")-Date.parse(a+"T00:00:00Z"))/864e5);
const weekKey=()=>{const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));return d.toLocaleDateString("en-CA")};
const sel=()=>ORDER.filter(p=>S.paths.includes(p));
const has=(pid,k)=>S.paths.includes(pid)&&S.prog[pid].m>k;
const countPerk=(perk,pid)=>sel().reduce((a,p)=>a+(pid&&p!==pid?0:PATHS[p].skills.filter((s,k)=>s.perk===perk&&has(p,k)).length),0);
const mult=pid=>1+.1*countPerk("xp",pid)+.05*countPerk("all")+.1*S.syn.filter(id=>SYN.find(s=>s.id===id).p.includes(pid)).length;
const shieldsAllowed=()=>countPerk("shield")+countPerk("swap");
const stage=()=>{const p=sel();return p.length?Math.min(5,Math.floor(p.reduce((a,k)=>a+S.prog[k].m,0)/p.length)):0};
const msTotal=()=>sel().reduce((a,k)=>a+S.prog[k].m,0);
const synOpen=()=>SYN.filter(s=>S.syn.includes(s.id)&&s.p.every(p=>S.paths.includes(p)));
const trialFor=(pid,k)=>{const t=PATHS[pid].trials[k],tg=S.tags[pid]||[];for(const g of tg)if(t[g])return t[g];return t.def};
const trialText=pid=>trialFor(pid,S.prog[pid].m);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

(function(){
 if(!S.last)return;const g=diff(S.last,td());if(g<=1)return;
 const wk=weekKey();if(S.shieldUsed.w!==wk)S.shieldUsed={w:wk,n:0};
 if(g===2&&S.shieldUsed.n<shieldsAllowed()){S.shieldUsed.n++;const y=new Date();y.setDate(y.getDate()-1);S.last=y.toLocaleDateString("en-CA");setTimeout(()=>toast("A streak shield saved your streak"),700)}
 else S.streak=0;save();
})();

const addD=(s,n)=>{const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return d.toLocaleDateString("en-CA")};
const yday=()=>addD(td(),-1);
const dayNum=s=>Math.floor(Date.parse(s+"T00:00:00Z")/864e5);
function ritu(s){const md=s.slice(5);let r=RITU[5];RITU.forEach(x=>{if(md>=x.from)r=x});return r}
function todayCal(){const f=FEST[td()];return f?Object.assign({fest:true},f):Object.assign({fest:false},ANEC[dayNum(td())%ANEC.length])}
const upcoming=n=>Object.keys(FEST).filter(k=>k>td()).sort().slice(0,n);
const inDays=k=>{const n=diff(td(),k);return n===1?"tomorrow":`in ${n} days`};

const nextCh=g=>(S.chap[g]||0)%CHAPTERS[g].length;
function companionPid(s){const p=sel();return p.length?p[dayNum(s||td())%p.length]:null}

/* ================= daily plan ================= */
function rng(str){let h=2166136261;for(const c of str){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return((h>>>0)%10007)/10007}}
let uidN=0;const uid=()=>Date.now().toString(36)+(uidN++);
const SORE={upper:["push","pull"],legs:["legs"],grip:["grip"]},SORE_L={upper:"upper body",legs:"legs",grip:"grip"};
const DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const hhmm=d=>String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
const checkToday=()=>S.check&&S.check.d===td()?S.check:{d:"",energy:"ok",sore:[],where:"normal"};
function ragaNow(h){return h<5?"Late night: try Raga Malkauns":h<11?"Morning: try Raga Bhairav or Ahir Bhairav":h<16?"Afternoon: try Raga Bhimpalasi":h<21?"Evening: try Raga Yaman":"Night: try Raga Darbari Kanada"}
function anchorsToday(c){const dow=new Date().getDay();c=c||checkToday();return ACTS.filter(a=>S.paths.includes(a.pid)&&(S.anchors[a.id]||[]).includes(dow)&&!(c.where!=="normal"&&["gym","wall","pool"].includes(a.place))&&!(c.where==="travel"&&a.id==="guitar"))}
function ctx(){
 const now=new Date(),c=checkToday(),ist=new Date(now.getTime()+now.getTimezoneOffset()*60000+330*60000);
 const y=new Date();y.setDate(y.getDate()-1);const yd=y.toLocaleDateString("en-CA"),recent=[];
 (S.log||[]).filter(l=>l.d===yd||l.d===td()).forEach(l=>l.load.forEach(x=>recent.push([x,l.t])));
 anchorsToday(c).forEach(a=>a.load.forEach(x=>recent.push([x,a.n])));
 return{h:now.getHours(),dow:now.getDay(),c,ist,ih:ist.getHours(),yd,recent};
}
const srcOf=(C,loads)=>{const f=C.recent.find(a=>loads.includes(a[0]));return f?f[1].toLowerCase():"recent training"};
/* ---- learning (on this device only) ---- */
const L_=t=>S.learn[t]=S.learn[t]||{sh:0,dn:0,sw:0,dw:[0,0,0,0,0,0,0]};
const dctx=()=>S.dayCtx&&S.dayCtx.d===td()?S.dayCtx:(S.dayCtx={d:td(),short:false,tired:false,noPlace:[],noNeed:[]});
function injectCustom(){ORDER.forEach(pid=>{const P=PATHS[pid];P.pool=P.pool.filter(x=>!x.custom);(S.custom[pid]||[]).forEach(c=>P.pool.push(X(c.t,c.m,{custom:true,g:["Your own task, saved from a day you did something else"]})))})}
function fit(x,pid,C){
 const L=S.learn[x.t];if(L&&L.never)return false;if(L&&L.space&&L.space>td())return false;
 const D=dctx();if(D.noPlace.includes(x.place)&&x.place!=="any")return false;if(x.needs.some(n=>D.noNeed.includes(n)))return false;
 if(D.tired&&x.en>=3)return false;
 if(!x.needs.every(k=>S.kit.includes(k)))return false;
 const w=C.c.where;
 if(w==="travel"&&(x.needs.length||!["any","out"].includes(x.place)))return false;
 if(w==="travel"&&pid==="music"&&x.tags.every(g=>g==="guitar"||g==="keys"))return false;
 if(w==="home"&&!["any","home","out"].includes(x.place))return false;
 if(C.c.energy==="low"&&x.en>=3)return false;
 const sore=C.c.sore.flatMap(k=>SORE[k]);
 return !x.load.some(l=>sore.includes(l));
}
function score(x,pid,C,r){
 let s=r()*1.2;const why=[],tags=S.tags[pid]||[],rl=C.recent.map(a=>a[0]),heavy=rl.filter(l=>l!=="mobility"&&l!=="cardio");
 if(x.tags.some(g=>tags.includes(g)))s+=2;
 if(x.load.some(l=>heavy.includes(l)))s-=2.5;
 if((rl.includes("pull")||rl.includes("grip"))&&x.load.includes("push")&&!rl.includes("push")){s+=3;why.push(`Balances the pulling from ${srcOf(C,["pull","grip"])}`)}
 if(heavy.length&&x.load.length===1&&x.load[0]==="mobility"){const hit=x.rec?x.rec.filter(l=>heavy.includes(l)):heavy;if(hit.length){s+=x.rec?2:1;why.push(`Recovery after ${srcOf(C,hit)}`)}}
 if(C.c.sore.length&&x.load.includes("mobility")){s+=2;why.unshift(`Gentle on your sore ${C.c.sore.map(k=>SORE_L[k]).join(" and ")}`)}
 const last=(S.log||[]).filter(l=>l.t===x.t).map(l=>l.d).sort().pop();
 if(last===C.yd)s-=1.5;else if(!last||diff(last,td())>3)s+=.5;
 if(C.c.energy==="high"&&x.en===3){s+=1;why.push("You have energy today")}
 if(C.c.energy==="low"&&x.en===1){s+=1;why.push("Low energy, so a light one")}
 if((C.dow===0||C.dow===6)&&x.m>=30){s+=1;why.push("Weekend: room for something longer")}
 if(C.h>=21){if(x.en>=3)s-=2;if(x.quiet||x.load.includes("mobility")){s+=1.5;why.push("It’s late, so a calm one")}}
 if(x.call&&tags.includes("abroad")){if(C.ih>=18&&C.ih<=22){s+=2.5;why.unshift(`It’s ${hhmm(C.ist)} in India, a good time to call`)}else if(C.ih>=23||C.ih<7)s-=3}
 if(C.c.where==="travel"&&x.travel){s+=3;why.push("Made for travel days")}
 if(x.raga)why.push(ragaNow(C.h));
 const L=S.learn[x.t],D=dctx();
 if(L&&L.sh>=3){const rt=L.dn/L.sh;s+=2*(rt-.5);if(rt>=.7&&L.dn>=3)why.push("You usually finish this one");if(L.sw>=3&&L.sw>L.dn)s-=1.5}
 if(L&&L.dw[C.dow]>=2){s+=.8;why.push(`You often do this on ${DAYS[C.dow]}s`)}
 if(D.short)s-=x.m/12;
 if(D.tired&&x.en===1){s+=1;why.push("Lighter, since you’re tired")}
 if(x.custom){s+=.5;why.push("Your own task")}
 return{s,why:why[0]||""};
}
function ranked(pid,C,seed,exclude){
 const P=PATHS[pid],tier=Math.min(4,S.prog[pid].m),r=rng(seed),tags=S.tags[pid]||[];
 const famCall=anchorsToday(C.c).some(a=>a.id==="family");
 let c=P.pool.map((x,i)=>({x,i})).filter(({x})=>tier>=x.lo&&tier<=x.hi&&fit(x,pid,C)&&!exclude.includes(x.t)&&!(famCall&&x.call));
 const f=c.filter(({x})=>x.tags.includes("any")||x.tags.some(g=>tags.includes(g)));if(f.length>=2)c=f;
 return c.map(o=>Object.assign(o,score(o.x,pid,C,r))).sort((a,b)=>b.s-a.s);
}
const mkT=(pid,o)=>({id:uid(),kind:"task",pid,ref:o.i,t:o.x.t,m:o.x.m,load:o.x.load,why:o.why,done:false});
function buildPlan(keep){
 const ps=sel(),C=ctx(),items=keep.slice();
 anchorsToday(C.c).forEach(a=>{if(items.some(x=>x.kind==="anchor"&&x.aid===a.id))return;const sr=C.c.sore.filter(k=>a.load.some(l=>SORE[k].includes(l)));
  items.push({id:uid(),kind:"anchor",aid:a.id,pid:a.pid,t:a.n,m:a.m,load:a.load,done:false,why:sr.length?`Your ${SORE_L[sr[0]]} is sore: go light, or skip it today`:""})});
 const used=items.filter(x=>x.kind==="task").reduce((a,x)=>a+x.m,0),share=Math.max(0,S.time-used)/ps.length;
 ps.forEach(pid=>{
  const pr=S.prog[pid];
  if(pr.m<5&&pr.xp>=NEED[pr.m]&&!items.some(x=>x.kind==="trial"&&x.pid===pid&&!x.done))items.push({id:uid(),kind:"trial",pid,t:trialText(pid),m:0,done:false});
  const hasA=items.some(x=>x.kind==="anchor"&&x.pid===pid),cap=hasA?Math.min(15,share):share,maxN=hasA?1:2;
  const list=ranked(pid,C,td()+pid+S.time+items.length+JSON.stringify(C.c),items.map(x=>x.t));
  let left=cap,n=items.filter(x=>x.kind==="task"&&x.pid===pid).length;
  for(const o of list){if(n>=maxN)break;if(o.x.m<=left+3){items.push(mkT(pid,o));left-=o.x.m;n++}}
  if(!n){const o=list.slice().sort((a,b)=>a.x.m-b.x.m)[0];if(o)items.push(mkT(pid,o))}
 });
 synOpen().forEach(s=>{if(!items.some(x=>x.kind==="bridge"&&x.sid===s.id))items.push({id:uid(),kind:"bridge",sid:s.id,t:s.q,m:15,done:false})});
 const rank={trial:0,anchor:1,task:2,bridge:3};
 return items.sort((a,b)=>rank[a.kind]-rank[b.kind]||ps.indexOf(a.pid)-ps.indexOf(b.pid));
}
function ensurePlan(){if(S.plan.d!==td()){recordHist();S.plan={d:td(),items:[],swaps:0,closed:false};S.plan.items=buildPlan([]);S.plan.items.forEach(x=>{if(x.kind==="task")L_(x.t).sh++})}}

/* ================= tools ================= */
let TOOL=null,AC=null,tick=null,metro=null,OPEN=null;
function beep(f,d,v){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;d=d||.06;o.frequency.value=f||880;o.connect(g);g.connect(AC.destination);g.gain.setValueAtTime(v||.25,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.start(t);o.stop(t+d+.02)}catch(e){}}
const poolItem=it=>{if(!it||it.kind!=="task"||it.ref===undefined)return null;const P=PATHS[it.pid].pool,x=P[it.ref];return x&&x.t===it.t?x:P.find(y=>y.t===it.t)||null};
const fmtT=ms=>{const s=Math.max(0,Math.ceil(ms/1000));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")};
const BPH=c=>[["Breathe in",c.in,1],["Hold",c.hold,1],["Breathe out",c.out,.55]].filter(p=>p[1]>0);
const TOOLNAME={metronome:"metronome",timer:"timer",intervals:"interval timer",breath:"breath guide",counter:"counter"};
function toolState(c){const T={type:c.type,c,running:false,done:false,bpm:c.bpm||60,count:0,beat:0,round:1,phase:0,cycles:0,hit:false};T.remain=c.type==="timer"?c.sec*1000:c.type==="intervals"?c.work*1000:c.type==="breath"?c.in*1000:0;return T}
function stopTool(){if(TOOL)TOOL.running=false;clearInterval(tick);clearInterval(metro);tick=metro=null}
function useTool(id){const it=S.plan.items.find(x=>x.id===id),x=poolItem(it);if(!x||!x.tool)return null;if(!TOOL||TOOL.id!==id){stopTool();TOOL=Object.assign(toolState(x.tool),{id})}return TOOL}
function startTick(){let last=Date.now();clearInterval(tick);tick=setInterval(()=>{const T=TOOL,now=Date.now(),dt=now-last;last=now;if(!T||!T.running)return;T.remain-=dt;
 if(T.remain<=0){
  if(T.type==="timer"){T.remain=0;T.running=false;T.done=true;beep(660,.25);setTimeout(()=>beep(880,.4),320);clearInterval(tick)}
  else if(T.type==="intervals"){if(T.phase===0){if(T.round>=T.c.rounds){T.remain=0;T.running=false;T.done=true;beep(990,.5);clearInterval(tick)}else if(T.c.rest>0){T.phase=1;T.remain+=T.c.rest*1000;beep(440,.2)}else{T.round++;T.remain+=T.c.work*1000;beep(880,.2)}}else{T.phase=0;T.round++;T.remain+=T.c.work*1000;beep(880,.2)}}
  else if(T.type==="breath"){const ph=BPH(T.c);T.phase=(T.phase+1)%ph.length;if(T.phase===0)T.cycles++;T.remain+=ph[T.phase][1]*1000;beep(T.phase===0?620:460,.08,.1)}
 }
 paint()},100)}
function startMetro(){clearInterval(metro);const T=TOOL;T.beat=0;const b=()=>{beep(T.beat%4===0?1320:880,.03,.3);T.beat++;paint()};b();metro=setInterval(b,60000/T.bpm)}
function toolGo(id){const T=useTool(id);if(!T)return;
 if(T.running){T.running=false;clearInterval(tick);clearInterval(metro);paint();return}
 beep(20,.01,.0001);if(T.done)Object.assign(T,toolState(T.c),{id});T.running=true;
 if(T.type==="metronome")startMetro();else startTick();paint()}
function toolReset(id){const T=useTool(id);if(!T)return;stopTool();Object.assign(T,toolState(T.c),{id});paint()}
function toolAdj(id,d){const T=useTool(id);if(!T)return;T.bpm=Math.max(30,Math.min(220,T.bpm+d));if(T.running)startMetro();paint()}
function toolTap(id){const T=useTool(id);if(!T)return;T.count+=T.c.step||1;if(T.count>=T.c.target&&!T.hit){T.hit=true;beep(990,.35);toast("Target reached")}paint()}
const ivSub=T=>T.done?"Done":`${T.phase===0?"Work":"Rest"} · round ${T.round} of ${T.c.rounds}`;
const brSub=T=>`${T.c.in} in${T.c.hold?` · ${T.c.hold} hold`:""} · ${T.c.out} out · ${T.cycles} cycles`;
function toolView(it){
 const c=poolItem(it).tool,T=TOOL&&TOOL.id===it.id?TOOL:toolState(c),id=it.id;
 const go=`<button class="mini pri" data-tgo="${id}" data-r="go">${T.running?(c.type==="metronome"?"Stop":"Pause"):T.done?"Again":"Start"}</button>`,rs=`<button class="mini" data-treset="${id}">Reset</button>`;
 let h="";
 if(c.type==="metronome")h=`<div class="tl-main"><button data-tadj="${id}:-5" aria-label="Slower">−</button><div class="tl-big"><b data-r="bpm">${T.bpm}</b><small>bpm</small></div><button data-tadj="${id}:5" aria-label="Faster">+</button></div><div class="tl-beat" data-r="beat"><i></i><i></i><i></i><i></i></div><div class="tl-row">${go}</div>`;
 else if(c.type==="timer")h=`<div class="tl-big"><b data-r="time">${fmtT(T.remain)}</b><small>${c.label||"Timer"}</small></div><div class="tl-row">${go}${rs}</div>`;
 else if(c.type==="intervals")h=`<div class="tl-big"><b data-r="time">${fmtT(T.remain)}</b><small data-r="sub">${ivSub(T)}</small></div><div class="tl-row">${go}${rs}</div>`;
 else if(c.type==="breath")h=`<div class="tl-breath"><span data-r="circle"></span></div><div class="tl-big"><b data-r="phase" style="font-size:22px">Ready</b><small data-r="sub">${brSub(T)}</small></div><div class="tl-row">${go}${rs}</div>`;
 else if(c.type==="counter")h=`<div class="tl-big"><b data-r="count">${T.count}</b><small>of ${c.target} ${c.label||""}</small></div><div class="tl-row"><button class="mini pri" data-ttap="${id}">+${c.step||1}</button>${rs}</div>`;
 return `<div class="tool" id="tl-${id}">${h}</div>`;
}
function paint(){const T=TOOL;if(!T)return;const el=document.getElementById("tl-"+T.id);if(!el)return;const q=r=>el.querySelector(`[data-r="${r}"]`);
 const go=q("go");if(go)go.textContent=T.running?(T.type==="metronome"?"Stop":"Pause"):T.done?"Again":"Start";
 if(T.type==="metronome"){q("bpm").textContent=T.bpm;[...q("beat").children].forEach((d,i)=>d.classList.toggle("on",T.running&&(T.beat-1)%4===i))}
 if(T.type==="timer"||T.type==="intervals")q("time").textContent=fmtT(T.remain);
 if(T.type==="intervals")q("sub").textContent=ivSub(T);
 if(T.type==="counter")q("count").textContent=T.count;
 if(T.type==="breath"){const ph=BPH(T.c)[T.phase];q("phase").textContent=T.running?`${ph[0]} · ${Math.ceil(T.remain/1000)}`:"Ready";q("sub").textContent=brSub(T);
  const ci=q("circle"),key=T.running?T.phase+":"+T.cycles:"idle";if(ci.dataset.k!==key){ci.dataset.k=key;ci.style.transition=T.running?`transform ${Math.max(.2,T.remain/1000)}s ease-in-out`:"transform .3s";ci.style.transform=`scale(${T.running?ph[2]:.55})`}}
}
function guideView(it){const x=poolItem(it);if(!x)return"";
 let h=`<ol>${x.g.map(g=>`<li>${g}</li>`).join("")}</ol>`;
 if(x.songs){const lv=Math.min(3,S.prog.music.m);h+=`<div class="songs"><small>Songs often learned at your level</small>${SONGS[lv].map(([a,b])=>`<div class="song"><b>${a}</b><span>${b}</span></div>`).join("")}<small>Search “song name chords” for the chart.</small></div>`}
 if(x.raga)h+=`<p class="raga">${ragaNow(new Date().getHours())}.</p>`;
 if(x.tool)h+=toolView(it);
 return `<div class="guide">${h}</div>`}

/* ================= feedback ================= */
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("show"),2600)}
function popAt(txt,c,ev){if(!ev||!ev.clientX)return;const e=document.createElement("div");e.className="pop";e.style.setProperty("--c",c);e.textContent=txt;e.style.left=(ev.clientX-10)+"px";e.style.top=(ev.clientY-24)+"px";document.body.appendChild(e);setTimeout(()=>e.remove(),900)}
const queue=[];
function pushModal(h){queue.push(h);if(!$(".scrim"))nextModal()}
function nextModal(){const h=queue.shift();if(h)openLayer(`<div class="scrim center" data-close="1"><div class="modal" role="dialog" aria-modal="true">${h}<button class="cta" style="width:100%" data-close="1">Continue</button></div></div>`)}
function openLayer(h){const s=$(".scrim");if(s)s.remove();document.body.insertAdjacentHTML("beforeend",h)}
function closeLayer(){const s=$(".scrim");if(s)s.remove();if(PL){clearTimeout(PL.t);const dk=PL.deck,af=PL.after;PL=null;if(dk){S.deck=td();save();render()}if(af){af();return}}if(queue.length)nextModal()}

/* ================= actions ================= */
const GOALS=[7,14,30,50,100,365];
function activity(){const t=td();S.days[t]=S.days[t]||{};S.days[t].a=1;
 if(S.last!==t){S.streak=(S.last&&diff(S.last,t)===1)?S.streak+1:1;S.last=t;S.best=Math.max(S.best,S.streak);
  if(S.streak===S.goal){const nx=GOALS.filter(g=>g>S.goal).slice(0,3);S.goal=nx[0]||S.goal*2;pushModal(`<div class="flame big" style="margin:0 auto">${DIYA}</div><div class="kick">Goal reached</div><h2>${S.streak} day streak</h2><p>You kept your word to yourself. Your next goal is ${S.goal} days, or pick another.</p><div class="goalopts">${nx.map(g=>`<button class="chip" data-goal="${g}" aria-pressed="${g===S.goal}">${g} days</button>`).join("")}</div>`)}
  else if([3,7,14,30,50,100,365].includes(S.streak))pushModal(`<div class="flame big" style="margin:0 auto">${DIYA}</div><div class="kick">Streak</div><h2>${S.streak} days in a row</h2><p>${S.goal-S.streak} more to reach your goal of ${S.goal}. Keep the lamp lit.</p>`)}}
let anim=null;
function grow(pid,amount){const pr=S.prog[pid],from=pr.m<5?Math.min(1,pr.xp/NEED[pr.m]):1;pr.xp+=amount;S.total+=amount;anim=anim||{};anim[pid]=from;
 if(pr.m<5&&pr.xp>=NEED[pr.m]&&!S.plan.items.some(x=>x.kind==="trial"&&x.pid===pid&&!x.done)){S.plan.items.unshift({id:uid(),kind:"trial",pid,t:trialText(pid),m:0,done:false});setTimeout(()=>toast(`${PATHS[pid].name} meter is full. Your trial is ready.`),900)}}
function complete(id,ev){
 const it=S.plan.items.find(x=>x.id===id);if(!it||it.kind==="trial")return;
 if(it.done){it.done=false;const back=(pid,a)=>{S.prog[pid].xp=Math.max(0,S.prog[pid].xp-a);S.total=Math.max(0,S.total-a)};if(it.kind==="bridge")SYN.find(s=>s.id===it.sid).p.forEach(p=>back(p,it.g));else back(it.pid,it.g);S.log=S.log.filter(l=>l.id!==it.id);if(it.kind==="task"&&S.learn[it.t]){const L=S.learn[it.t];L.dn=Math.max(0,L.dn-1);L.dw[new Date().getDay()]=Math.max(0,L.dw[new Date().getDay()]-1)}save();render();return}
 it.done=true;activity();if(it.kind==="task"){const L=L_(it.t);L.dn++;L.dw[new Date().getDay()]++}burst(ev,it.kind==="bridge"?"var(--gold)":PATHS[it.pid].c);
 S.log.push({id:it.id,d:td(),t:it.t,load:it.load||[],pid:it.pid||"bridge"});S.log=S.log.filter(l=>diff(l.d,td())<=30);
 if(it.kind==="bridge"){const s=SYN.find(x=>x.id===it.sid);it.g=8;s.p.forEach(p=>grow(p,Math.round(8*mult(p))));popAt("+ growth","var(--gold)",ev)}
 else{const g=Math.round(Math.max(5,it.m)*mult(it.pid));it.g=g;grow(it.pid,g);popAt("+"+g,PATHS[it.pid].c,ev)}
 if(TOOL&&TOOL.id===it.id)stopTool();if(OPEN===it.id)OPEN=null;
 const left=S.plan.items.filter(x=>(x.kind==="task"||x.kind==="anchor")&&!x.done).length;
 if(!left&&!S.plan.closed){S.plan.closed=true;setTimeout(()=>toast("Today’s practice is done. Rest well."),1000)}
 save();render();
}
const REASONS=[["time","No time today","Shorter tasks for the rest of today"],["place","Can’t do it here","Skips this place or kit today"],["tired","Too tired","Lighter tasks today"],["nope","Not for me","Never suggested again"],["recent","Did it recently","Spaced out more"]];
function swapSheet(id){const it=S.plan.items.find(x=>x.id===id);if(!it||it.done)return;const P=PATHS[it.pid];
 sheet(P.c,`<div class="kick">Swap</div><h2 style="font-size:22px">${esc(it.t)}</h2><p class="sub">Why doesn’t it fit today? One tap. Abhyasa learns from it.</p>
 <div class="reasons">${REASONS.map(([k,l,h])=>`<button class="reason" data-why="${id}:${k}"><b>${l}</b><small>${h}</small></button>`).join("")}</div>
 <button class="cta alt" style="width:100%;margin-top:12px" data-other="${id}">I did something else instead</button>`)}
function swap(id,why){
 const it=S.plan.items.find(x=>x.id===id);if(!it||it.done)return;const x=poolItem(it),L=L_(it.t),D=dctx();L.sw++;
 let note="";
 if(why==="time"){D.short=true;note="Shorter tasks for the rest of today."}
 if(why==="place"&&x){if(x.place!=="any")D.noPlace.push(x.place);x.needs.forEach(n=>D.noNeed.push(n));note="Skipping that today."}
 if(why==="tired"){D.tired=true;note="Lighter tasks today."}
 if(why==="nope"){L.never=true;note="Won’t suggest it again. Undo on the Hero tab."}
 if(why==="recent"){L.space=addD(td(),4);note="Spaced out for a few days."}
 const list=ranked(it.pid,ctx(),td()+"swap"+S.plan.swaps,S.plan.items.map(y=>y.t)).filter(o=>why==="time"?o.x.m<it.m||o.x.m<=10:Math.abs(o.x.m-it.m)<=20);
 closeLayer();
 if(why==="time"||why==="tired"){S.plan.items.forEach(y=>{if(y.kind!=="task"||y.done||y.id===id)return;const yx=poolItem(y);if((why==="tired"&&yx&&yx.en>=3)||(why==="time"&&y.m>20)){const alt=ranked(y.pid,ctx(),td()+"adj"+y.id,S.plan.items.map(z=>z.t)).find(o=>why==="time"?o.x.m<y.m:o.x.en<3);if(alt){L_(alt.x.t).sh++;Object.assign(y,{t:alt.x.t,m:alt.x.m,ref:alt.i,load:alt.x.load,why:alt.why})}}})}
 if(!list.length){save();render();toast(`${note} No other ${PATHS[it.pid].name} task fits right now. Try “I did something else”.`);return}
 const o=list[0];if(TOOL&&TOOL.id===it.id)stopTool();if(OPEN===it.id)OPEN=null;L_(o.x.t).sh++;
 Object.assign(it,{t:o.x.t,m:o.x.m,ref:o.i,load:o.x.load,why:o.why});S.plan.swaps++;save();render();toast(`Swapped. ${note}`);
}
const DURS=[10,20,30,45,60];let OTH=null;
function otherSheet(replaceId){const ps=sel();OTH=OTH&&OTH.r===replaceId?OTH:{r:replaceId||"",pid:replaceId?(S.plan.items.find(x=>x.id===replaceId)||{}).pid||ps[0]:ps[0],m:20,t:"",save:false};
 const P=PATHS[OTH.pid];
 sheet(P.c,`<div class="kick">Your own task</div><h2>What did you do?</h2><p class="sub">Anything meaningful counts and keeps your streak, as long as it grows one of your paths.</p>
 <div class="qlabel">Path</div><div class="cchips">${ps.map(p=>`<button class="chip" data-oth="pid:${p}" aria-pressed="${OTH.pid===p}">${PATHS[p].name}</button>`).join("")}</div>
 <div class="qlabel">How long</div><div class="cchips">${DURS.map(m=>`<button class="chip" data-oth="m:${m}" aria-pressed="${OTH.m===m}">${m} min</button>`).join("")}</div>
 <label class="qlabel" for="othname" style="display:block">What was it? (optional)</label><input class="name" id="othname" maxlength="60" placeholder="For example: played football with friends" value="${esc(OTH.t)}" style="font-size:16px">
 <button class="savebox" data-oth="save:1" aria-pressed="${OTH.save}"><span class="tick">${ic("check")}</span>Suggest this to me again sometimes</button>
 <button class="cta" style="width:100%;margin-top:12px" data-oth-go="1">Log it</button>`);
 const i=$("#othname");if(i)i.addEventListener("input",e=>OTH.t=e.target.value)}
function logOther(ev){const o=OTH;if(!o)return;const pid=o.pid,t=(o.t||"").trim().slice(0,60)||`Own ${PATHS[pid].name} practice`;
 if(o.r){const old=S.plan.items.find(x=>x.id===o.r);if(old&&!old.done){L_(old.t).sw++;S.plan.items=S.plan.items.filter(x=>x.id!==o.r)}}
 if(o.save&&o.t.trim()){S.custom[pid]=S.custom[pid]||[];if(!S.custom[pid].some(c=>c.t===t))S.custom[pid].push({t,m:o.m});injectCustom()}
 const it={id:uid(),kind:"task",pid,t,m:o.m,load:[],why:"",done:false,own:true};const ref=PATHS[pid].pool.findIndex(x=>x.t===t);if(ref>=0)it.ref=ref;
 S.plan.items.push(it);OTH=null;closeLayer();complete(it.id,ev)}
function replan(msg){stopTool();OPEN=null;const keep=S.plan.items.filter(x=>x.done||x.kind==="trial");S.plan.items=buildPlan(keep);save();render();if(msg)toast(msg)}
function setTime(v){S.time=v;replan(`Plan updated for ${TIMES.find(t=>t[0]===v)[1]}`)}
function passTrial(pid){
 const pr=S.prog[pid],before=stage(),k=pr.m,P=PATHS[pid],sk=P.skills[k];
 pr.xp=Math.max(0,pr.xp-NEED[k]);pr.m++;activity();
 const it=S.plan.items.find(x=>x.kind==="trial"&&x.pid===pid&&!x.done);if(it){it.done=true;it.k=k}
 closeLayer();
 pushModal(`<div class="seal" style="--c:${P.c}">${sk.d.slice(0,1)}</div><div class="kick">${P.name} · New skill</div><h2>${sk.n}<span class="dev">${sk.d}</span></h2>${enLine(sk.n)}<p>${sk.s}</p><div class="box" style="text-align:left"><small>Effect</small>${PERK[sk.perk](P.name)}${sk.item?`<small style="margin-top:6px">Gift</small>${sk.itemName||sk.n} joins your hero`:""}</div>`);
 SYN.forEach(s=>{if(S.syn.includes(s.id)||!s.p.every(p=>S.paths.includes(p)))return;if(s.p.every(p=>S.prog[p].m>=s.req)){S.syn.push(s.id);pushModal(`<div class="evo" style="gap:0">${s.p.map(p=>medal(p,"lg")).join("")}</div><div class="kick">Bridge opened</div><h2>${s.n}<span class="dev">${s.d}</span></h2>${enLine(s.n)}<p>${s.p.map(p=>PATHS[p].name).join(" and ")} now help each other: +10% growth and a shared daily task.</p><button class="cta alt" style="width:100%;margin-bottom:10px" data-story="${s.id}">Watch their story</button>`)}});
 const after=stage();if(after>S.seen){S.seen=after;pushModal(`<div class="evo">${avatar(before)}${avatar(after)}</div><div class="kick">Your hero grows</div><h2>${RANKS[after][0]}<span class="dev">${RANKS[after][1]}</span></h2>${enLine(RANKS[after][0])}<p>You started as a simple seeker. Look how far you have come.</p>`)}
 S.plan.items=buildPlan(S.plan.items.filter(x=>x.done||x.kind==="trial"));
 save();render();
}

/* ================= art ================= */
const K="#1d1f26";
/* ================= art: rotating irezumi line scenes ================= */
const ART='fill="none" stroke="var(--art)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
function wv(y,h,n,w,a){a=a||ART;w=w||400;const seg=(w+20)/n;let d=`M-10 ${y}`;for(let i=0;i<n;i++){const x=i*seg-10;d+=` C${x+seg*.1} ${y-h} ${x+seg*.75} ${y-h*1.1} ${x+seg*.62} ${y-h*.45} C${x+seg*.55} ${y-h*.15} ${x+seg*.8} ${y-h*.05} ${x+seg} ${y}`}let c=`<path d="${d}" ${a}/>`;for(let i=0;i<n;i++){const x=i*seg-10;c+=`<path d="M${x+seg*.22} ${y-h*.3} q${seg*.16} ${-h*.5} ${seg*.34} ${-h*.12}" ${a}/>`}return c}
function cld(x,y,s,fill){fill=fill||"var(--bg)";const B=[[0,0,1],[-1.15,.35,.72],[1.15,.35,.78],[-.45,-.55,.7],[.6,-.5,.62]],r=13*s;let c="";B.forEach(([a,b,f])=>c+=`<circle cx="${x+a*r}" cy="${y+b*r}" r="${r*f}" fill="${fill}" stroke="var(--art)" stroke-width="2"/>`);B.forEach(([a,b,f])=>c+=`<circle cx="${x+a*r}" cy="${y+b*r}" r="${Math.max(0,r*f-1.8)}" fill="${fill}"/>`);return c+`<path d="M${x-5*s} ${y+2*s} q${5*s} ${-8*s} ${10*s} 0 q${-4*s} ${4*s} ${-7*s} 0" ${ART}/>`}
const lotus=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 C-6 -10 -6 -22 0 -30 C6 -22 6 -10 0 0Z M0 0 C-10 -6 -20 -8 -26 -2 C-18 4 -8 4 0 0Z M0 0 C10 -6 20 -8 26 -2 C18 4 8 4 0 0Z M0 0 C-14 -14 -16 -24 -12 -28 C-6 -22 -2 -12 0 0Z M0 0 C14 -14 16 -24 12 -28 C6 -22 2 -12 0 0Z" ${ART}/></g>`;
const hanumanSil=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" stroke="var(--art)" stroke-linecap="round" fill="none"><path d="M0 2 q-22 -24 -8 -36 q9 -5 7 6" stroke-width="3"/><path d="M0 2 L-18 -3M0 2 L-13 14" stroke-width="4.5"/><path d="M0 2 L24 -12" stroke-width="9"/><path d="M21 -10 L44 -23M16 -6 L34 2" stroke-width="4"/><circle cx="31" cy="-17" r="6" fill="var(--art)" stroke="none"/></g>`;
const ray=(cx,cy,r1,r2,n)=>Array.from({length:n},(_,i)=>{const a=i*2*Math.PI/n;return `<path d="M${cx+r1*Math.cos(a)} ${cy+r1*Math.sin(a)} L${cx+r2*Math.cos(a)} ${cy+r2*Math.sin(a)}" ${ART}/>`}).join("");
const BGS={
 leap:()=>`<circle cx="300" cy="150" r="52" ${ART}/><circle cx="300" cy="150" r="64" ${ART} stroke-dasharray="3 9"/>`+cld(80,110,1.4)+cld(210,60,.8)+hanumanSil(150,360,2.4)+wv(520,40,4)+wv(570,34,5)+wv(620,30,5)+wv(675,26,6)+wv(730,22,7),
 setu:()=>`<path d="M300 90 a40 40 0 1 0 36 56 a32 32 0 1 1 -36 -56z" ${ART}/>`+cld(170,120,1.1)+`<path d="M60 180 Q140 300 60 430" ${ART} stroke-width="4"/><path d="M60 180 V430" ${ART} stroke-width="1.2"/>`+Array.from({length:9},(_,i)=>{const x=30+i*44,y=540+Math.sin(i*1.2)*8;return `<ellipse cx="${x}" cy="${y}" rx="20" ry="11" ${ART}/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="12" font-family="Tiro Devanagari Hindi,serif" fill="var(--art)">राम</text>`}).join("")+wv(600,26,5)+wv(650,24,6)+wv(700,20,6)+wv(745,18,7),
 narada:()=>`<circle cx="300" cy="130" r="44" ${ART}/>`+cld(90,250,1.7)+cld(320,420,1.3)+cld(160,660,1.9)+`<path d="M70 600 L330 190" ${ART} stroke-width="7"/><path d="M76 592 L324 198" ${ART} stroke-width="1.2"/><circle cx="76" cy="592" r="30" fill="var(--bg)" stroke="var(--art)" stroke-width="2.5"/><circle cx="324" cy="196" r="18" fill="var(--bg)" stroke="var(--art)" stroke-width="2.5"/>`+[[60,140],[200,330],[260,520],[330,600],[120,450]].map(([x,y])=>`<path d="M${x+6} ${y} v-22" ${ART}/><circle cx="${x}" cy="${y}" r="7" fill="var(--art)"/>`).join(""),
 manthan:()=>cld(80,110,1)+cld(320,90,1.2)+`<path d="M200 170 C180 230 150 330 110 560 L290 560 C250 330 220 230 200 170Z" ${ART}/>`+[0,1,2,3].map(i=>{const d=`M80 ${300+i*60} C150 ${270+i*60} 250 ${340+i*60} 320 ${300+i*60}`;return `<path d="${d}" fill="none" stroke="var(--art)" stroke-width="13" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--bg)" stroke-width="8" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--art)" stroke-width="1.4" stroke-dasharray="2 8"/>`}).join("")+`<circle cx="70" cy="292" r="15" fill="var(--bg)" stroke="var(--art)" stroke-width="2"/><circle cx="66" cy="288" r="2.5" fill="var(--art)"/><ellipse cx="200" cy="592" rx="120" ry="34" ${ART}/>`+[0,1,2,3,4].map(i=>`<path d="M${122+i*40} 572 l12 18 l-12 18" ${ART}/>`).join("")+wv(650,30,5)+wv(705,24,6),
 ganga:()=>`<path d="M170 70 a30 30 0 1 0 60 0" ${ART}/>`+[0,1,2,3,4,5].map(i=>`<path d="M${150+i*20} 110 C${120+i*25} 200 ${220+i*10} 300 ${150+i*22} 420" ${ART}/>`).join("")+[0,1,2,3,4,5,6].map(i=>`<path d="M${130+i*24} 420 C${126+i*24} 470 ${140+i*24} 520 ${132+i*24} 580" ${ART} stroke-width="1.5"/>`).join("")+cld(70,200,1.3)+cld(330,250,1.1)+wv(620,24,5)+wv(670,20,6)+lotus(80,700,1.6)+lotus(320,710,1.3)+lotus(200,735,1),
 matsya:()=>cld(90,80,1.4)+cld(300,120,1.6)+Array.from({length:14},(_,i)=>`<path d="M${20+i*28} ${170+(i%3)*18} l-10 26" ${ART} stroke-width="1.4"/>`).join("")+`<path d="M20 330 L110 330 L95 352 L35 352Z" ${ART}/><path d="M60 330 V290 L88 310 L60 312" ${ART}/><path d="M80 352 Q90 420 100 450" ${ART} stroke-width="1.4"/><path d="M60 470 C120 380 280 380 330 450 C280 520 120 540 60 470Z" ${ART} stroke-width="2.5"/><path d="M330 450 L380 410 L370 455 L385 500Z" ${ART}/><circle cx="105" cy="455" r="6" ${ART}/><path d="M100 432 l-4 -20" ${ART}/>`+[0,1,2,3,4].map(i=>`<path d="M${150+i*30} 420 q12 30 0 60" ${ART} stroke-width="1.4"/>`).join("")+wv(530,34,4)+wv(590,30,5)+wv(650,26,5)+wv(710,22,6),
 chariot:()=>`<path d="M320 80 c-20 0 -34 16 -28 34 c6 18 30 22 40 6 c8 -12 0 -28 -12 -26 c-10 2 -12 14 -4 18" ${ART}/>`+[0,1,2,3,4,5].map(i=>`<path d="M${10+i*30} ${170+i*40} l150 -60" ${ART} stroke-width="1.4"/><path d="M${160+i*30} ${110+i*40} l-12 -1 m12 1 l-8 9" ${ART} stroke-width="1.4"/>`).join("")+`<path d="M250 640 V180" ${ART} stroke-width="3"/><path d="M250 180 L350 210 L250 240Z" ${ART}/><circle cx="284" cy="210" r="9" ${ART}/><circle cx="130" cy="580" r="92" ${ART} stroke-width="3"/><circle cx="130" cy="580" r="16" ${ART}/>`+Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return `<path d="M${130+16*Math.cos(a)} ${580+16*Math.sin(a)} L${130+92*Math.cos(a)} ${580+92*Math.sin(a)}" ${ART}/>`}).join("")+wv(720,16,6),
 yajna:()=>`<circle cx="200" cy="130" r="40" ${ART}/>`+ray(200,130,52,72,12)+cld(90,300,1.2)+cld(320,330,1)+`<path d="M200 480 C170 440 230 410 200 370 C170 330 230 300 200 260" ${ART} stroke-width="1.5"/><path d="M215 470 C250 430 190 400 225 360" ${ART} stroke-width="1.2"/><path d="M115 600 L285 600 L300 620 L100 620Z" ${ART}/><path d="M100 620 L300 620 L270 660 L130 660Z" ${ART} stroke-width="2.5"/><path d="M200 600 C160 560 170 520 190 490 C190 520 205 530 210 500 C225 530 240 560 200 600Z" ${ART} stroke-width="2.5"/><path d="M160 600 C140 575 150 550 165 535 C168 560 178 565 180 590" ${ART}/><path d="M240 600 C260 575 250 550 235 535 C232 560 222 565 220 590" ${ART}/>`+lotus(60,725,1.2)+lotus(340,725,1.2)
};
const BG_ORDER=["leap","setu","narada","manthan","ganga","matsya","chariot","yajna"];
let bgCur="";
function setBg(k){if(k===bgCur)return;bgCur=k;const host=$("#bg");if(!host)return;const d=document.createElement("div");d.className="bgl";d.innerHTML=`<svg viewBox="0 0 400 760" preserveAspectRatio="xMidYMid slice">${BGS[k]()}</svg>`;host.appendChild(d);requestAnimationFrame(()=>requestAnimationFrame(()=>d.classList.add("on")));[...host.children].slice(0,-1).forEach(o=>{o.classList.remove("on");setTimeout(()=>o.remove(),1300)})}
const doyNow=()=>{const d=new Date();return Math.floor((d-new Date(d.getFullYear(),0,0))/864e5)};
function pageScene(){if(!S.on)return BG_ORDER[((Q?Q.i:0)*3+1)%8];return S.view==="journey"?"manthan":S.view==="hero"?BG_ORDER[(doyNow()+4)%8]:BG_ORDER[doyNow()%8]}

/* ================= characters ================= */
function portraitG(id){
 const O=`stroke="${K}" stroke-width="2.6" stroke-linejoin="round"`,O2=`stroke="${K}" stroke-width="2"`,eyes=y=>`<path d="M50 ${y} q3 2.5 6 0M64 ${y} q3 2.5 6 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>`;
 if(id==="hanuman")return `<path d="M101 118 L97 64" stroke="${K}" stroke-width="8" stroke-linecap="round"/><path d="M101 118 L97 64" stroke="#8a5424" stroke-width="3.5" stroke-linecap="round"/><circle cx="96" cy="52" r="13" fill="#d9a441" ${O}/><circle cx="96" cy="52" r="4.5" fill="#d0492e" ${O2}/>
 <path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#e5762f" ${O}/><path d="M38 97 Q60 109 82 97" fill="none" stroke="#d9a441" stroke-width="4"/>
 <circle cx="33" cy="60" r="9" fill="#c9652c" ${O}/><circle cx="87" cy="60" r="9" fill="#c9652c" ${O}/>
 <circle cx="60" cy="60" r="27" fill="#d9773a" ${O}/><path d="M60 41 C44 41 38 55 42 68 C46 82 74 82 78 68 C82 55 76 41 60 41Z" fill="#f2c79a" ${O2}/>
 <ellipse cx="60" cy="74" rx="13" ry="9.5" fill="#f7dcbb" ${O2}/><path d="M54 77 q6 4 12 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/>${eyes(58)}<path d="M60 45 v7" stroke="#d0492e" stroke-width="3" stroke-linecap="round"/>
 <path d="M36 40 L42 22 L51 32 L60 12 L69 32 L78 22 L84 40Z" fill="#d9a441" ${O}/><circle cx="60" cy="30" r="3" fill="#d0492e"/>`;
 if(id==="patanjali"){const hood=[-48,-24,0,24,48].map(a=>`<g transform="rotate(${a} 60 72)"><ellipse cx="60" cy="24" rx="11" ry="16" fill="#4f8a5c" ${O}/><circle cx="56" cy="19" r="1.6" fill="${K}"/><circle cx="64" cy="19" r="1.6" fill="${K}"/></g>`).join("");
  return `${hood}<path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#e5762f" ${O}/><rect x="53" y="80" width="14" height="14" fill="#a8744c" ${O2}/><circle cx="60" cy="62" r="24" fill="#c98b5e" ${O}/>
  <path d="M38 66 Q60 104 82 66 Q74 84 60 86 Q46 84 38 66Z" fill="#e8e2d4" ${O2}/><path d="M36 58 C36 38 84 38 84 58 C78 47 42 47 36 58Z" fill="${K}"/><circle cx="60" cy="34" r="9" fill="${K}"/>
  ${eyes(61)}<path d="M57 44 v9M63 44 v9" stroke="#f3ead6" stroke-width="2"/><path d="M60 46 v6" stroke="#d0492e" stroke-width="1.6"/><path d="M52 122 L60 100 L68 122Z" fill="#c98b5e" ${O2}/>`}
 if(id==="savitri")return `<path d="M30 72 C28 30 92 30 90 72 L96 116 L24 116Z" fill="${K}"/><path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#c0392b" ${O}/><path d="M28 104 Q60 118 92 104" fill="none" stroke="#d9a441" stroke-width="4"/>
  <rect x="53" y="80" width="14" height="14" fill="#b07a52" ${O2}/><circle cx="60" cy="62" r="24" fill="#c98b5e" ${O}/><path d="M36 60 C36 38 84 38 84 60 C78 46 42 46 36 60Z" fill="${K}"/>
  <path d="M60 40 v9" stroke="#d0492e" stroke-width="2.4" stroke-linecap="round"/><circle cx="60" cy="53" r="2.4" fill="#d0492e"/>${eyes(62)}<path d="M55 72 q5 3 10 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/>
  <circle cx="35" cy="72" r="3.5" fill="#d9a441" ${O2}/><circle cx="85" cy="72" r="3.5" fill="#d9a441" ${O2}/><circle cx="53" cy="68" r="2.2" fill="none" stroke="#d9a441" stroke-width="1.4"/>${[0,1,2,3].map(i=>`<circle cx="${33+i*2}" cy="${44+i*6}" r="2.6" fill="#f3ead6" stroke="${K}" stroke-width=".8"/>`).join("")}`;
 if(id==="saraswati")return `<path d="M108 114 L18 14" stroke="${K}" stroke-width="8" stroke-linecap="round"/><path d="M108 114 L18 14" stroke="#a86f35" stroke-width="3.5" stroke-linecap="round"/><circle cx="102" cy="106" r="15" fill="#a86f35" ${O}/><circle cx="21" cy="18" r="9" fill="#a86f35" ${O}/>
  <path d="M30 72 C28 32 92 32 90 72 L94 112 L26 112Z" fill="${K}"/><path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#f6f1e4" ${O}/><path d="M28 104 Q60 118 92 104" fill="none" stroke="#d9a441" stroke-width="4"/>
  ${Array.from({length:9},(_,i)=>{const t=i/8;return `<circle cx="${42+36*t}" cy="${94+14*Math.sin(Math.PI*t)}" r="2.6" fill="#f3ead6" stroke="${K}" stroke-width="1"/>`}).join("")}
  <rect x="53" y="80" width="14" height="14" fill="#c08b62" ${O2}/><circle cx="60" cy="62" r="24" fill="#e0b48e" ${O}/><path d="M36 60 C36 38 84 38 84 60 C78 46 42 46 36 60Z" fill="${K}"/>
  <path d="M40 46 L44 26 L52 34 L60 18 L68 34 L76 26 L80 46Z" fill="#d9a441" ${O}/><circle cx="60" cy="36" r="3" fill="#f3ead6" ${O2}/><circle cx="60" cy="53" r="2.2" fill="#d0492e"/>${eyes(62)}<path d="M55 72 q5 3 10 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/>
  <circle cx="35" cy="72" r="3.5" fill="#d9a441" ${O2}/><circle cx="85" cy="72" r="3.5" fill="#d9a441" ${O2}/>`;
 if(id==="arjuna")return `<path d="M96 10 Q124 66 96 122" fill="none" stroke="${K}" stroke-width="8" stroke-linecap="round"/><path d="M96 10 Q124 66 96 122" fill="none" stroke="#d9a441" stroke-width="3.5" stroke-linecap="round"/><path d="M96 10 V122" stroke="#f3ead6" stroke-width="1.4"/>
  <path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#5b4a8f" ${O}/><path d="M24 112 Q30 98 44 96 M96 112 Q90 98 76 96" fill="none" stroke="#d9a441" stroke-width="5" stroke-linecap="round"/><path d="M44 104 H76" stroke="#d9a441" stroke-width="3"/>
  <rect x="53" y="80" width="14" height="14" fill="#9a6440" ${O2}/><path d="M34 62 C34 42 86 42 86 62 L86 76 C80 66 40 66 34 76Z" fill="${K}"/><circle cx="60" cy="62" r="24" fill="#b87a50" ${O}/>
  <path d="M42 46 L42 24 Q60 8 78 24 L78 46Z" fill="#d9a441" ${O}/><path d="M42 38 H78" stroke="${K}" stroke-width="1.5"/><circle cx="60" cy="30" r="4" fill="#4f86a8" ${O2}/>
  ${eyes(61)}<path d="M51 70 q9 -4 18 0" fill="none" stroke="${K}" stroke-width="2.4" stroke-linecap="round"/><path d="M56 75 q4 2 8 0" fill="none" stroke="${K}" stroke-width="1.6" stroke-linecap="round"/><path d="M60 48 v5" stroke="#d0492e" stroke-width="2.4" stroke-linecap="round"/>`;
 if(id==="dhruva")return `<path d="M60 4 l3.5 8 8.5 .8 -6.5 5.6 2 8.4 -7.5 -4.5 -7.5 4.5 2 -8.4 -6.5 -5.6 8.5 -.8z" fill="#d9a441" ${O2}/>
  <path d="M24 124 Q28 100 60 98 Q92 100 96 124Z" fill="#e9b445" ${O}/><rect x="54" y="84" width="12" height="14" fill="#b98560" ${O2}/><circle cx="60" cy="68" r="21" fill="#d9a27a" ${O}/>
  <path d="M39 66 C39 48 81 48 81 66 C75 56 45 56 39 66Z" fill="${K}"/><circle cx="60" cy="44" r="8" fill="${K}"/>${eyes(68)}<path d="M56 77 q4 2.5 8 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><path d="M60 54 v6" stroke="#d0492e" stroke-width="2" stroke-linecap="round"/><path d="M53 124 L60 104 L67 124Z" fill="#d9a27a" ${O2}/>`;
 if(id==="rama")return `<path d="M24 12 Q-4 66 24 120" fill="none" stroke="${K}" stroke-width="8" stroke-linecap="round"/><path d="M24 12 Q-4 66 24 120" fill="none" stroke="#d9a441" stroke-width="3.5" stroke-linecap="round"/><path d="M24 12 V120" stroke="#f3ead6" stroke-width="1.4"/>
 <g transform="rotate(20 96 70)"><rect x="88" y="40" width="16" height="56" rx="3" fill="#8a5a2b" ${O}/><path d="M92 40 l-2 -14M96 40 v-15M100 40 l2 -14" stroke="${K}" stroke-width="2"/></g>
 <path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#e9b445" ${O}/><path d="M34 99 L86 124" stroke="#d0492e" stroke-width="6"/>
 <rect x="53" y="80" width="14" height="14" fill="#3e6f8f" ${O2}/>
 <path d="M33 60 C33 42 87 42 87 60 L87 76 C80 66 40 66 33 76Z" fill="${K}"/>
 <circle cx="60" cy="62" r="24" fill="#4f86a8" ${O}/>
 <path d="M40 46 L42 20 Q60 4 78 20 L80 46Z" fill="#d9a441" ${O}/><path d="M42 36 H78M44 27 H76" stroke="${K}" stroke-width="1.5"/><circle cx="60" cy="41" r="3.2" fill="#d0492e" ${O2}/>
 ${eyes(61)}<path d="M55 72 q5 3 10 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><path d="M55 47 Q60 56 65 47" fill="none" stroke="#f3ead6" stroke-width="2.4"/><path d="M60 48 v6" stroke="#d0492e" stroke-width="2"/>
 <circle cx="36" cy="70" r="3.5" fill="#d9a441" ${O2}/><circle cx="84" cy="70" r="3.5" fill="#d9a441" ${O2}/>`;
 const beads=Array.from({length:9},(_,i)=>{const t=i/8;return `<circle cx="${42+36*t}" cy="${94+14*Math.sin(Math.PI*t)}" r="2.6" fill="#4f8a3c" stroke="${K}" stroke-width="1"/>`}).join("");
 return `<path d="M12 114 L102 12" stroke="${K}" stroke-width="8" stroke-linecap="round"/><path d="M12 114 L102 12" stroke="#a86f35" stroke-width="3.5" stroke-linecap="round"/><circle cx="18" cy="106" r="15" fill="#a86f35" ${O}/><circle cx="99" cy="16" r="9" fill="#a86f35" ${O}/>
 <path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#f3ead6" ${O}/><path d="M30 101 L78 124" stroke="#e5762f" stroke-width="7"/>${beads}
 <rect x="53" y="80" width="14" height="14" fill="#b98560" ${O2}/>
 <circle cx="60" cy="62" r="24" fill="#d9a27a" ${O}/>
 <path d="M36 58 C36 38 84 38 84 58 C78 47 42 47 36 58Z" fill="${K}"/><circle cx="60" cy="30" r="10" fill="${K}"/><path d="M52 31 h16" stroke="#e9b445" stroke-width="2.5"/>
 ${eyes(62)}<path d="M55 72 q5 3 10 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><path d="M57 44 v10M63 44 v10" stroke="#f3ead6" stroke-width="2"/><path d="M60 46 v7" stroke="#d0492e" stroke-width="1.6"/>`;
}
const portrait=id=>`<svg viewBox="0 0 120 120" aria-hidden="true">${portraitG(id)}</svg>`;
const medal=(pid,cls)=>`<span class="medal ${cls||""}" style="--c:${PATHS[pid].c}">${portrait(CHAR[pid])}</span>`;

/* ================= story films ================= */
const A2='fill="none" stroke="var(--art)" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
const notes=(x,y)=>`<g class="float">${[[0,0],[22,-16],[44,4]].map(([a,b])=>`<path d="M${x+a+5} ${y+b} v-16" stroke="${K}" stroke-width="2"/><circle cx="${x+a}" cy="${y+b}" r="5" fill="#a24b74" stroke="${K}" stroke-width="1.5"/>`).join("")}</g>`;
const diya=(x,y)=>`<path d="M${x-12} ${y} q12 12 24 0z" fill="#b5652e" stroke="${K}" stroke-width="1.6"/><path class="flick" d="M${x} ${y-2} c-5 -6 -3 -12 0 -16 c3 4 5 10 0 16z" fill="#e9a13b" stroke="${K}" stroke-width="1.2"/>`;
function storyBg(k){
 let s=`<rect width="360" height="220" fill="var(--surface2)"/>`;const W=(y,h,n)=>wv(y,h,n,360,A2);
 if(k==="hills")s+=`<circle cx="300" cy="50" r="18" ${A2}/><path d="M-10 205 Q60 110 130 170 Q190 90 260 160 Q310 120 370 170" ${A2}/><path d="M-10 215 Q80 160 160 200 Q260 150 370 205" ${A2}/>`;
 if(k==="glow")s+=[34,60,86,112].map(r=>`<circle cx="180" cy="110" r="${r}" fill="none" stroke="#d9a441" stroke-opacity="${(.55-r/260).toFixed(2)}" stroke-width="2"/>`).join("");
 if(k==="bridge")s+=W(200,16,5)+Array.from({length:7},(_,i)=>`<ellipse cx="${20+i*54}" cy="186" rx="18" ry="8" ${A2}/>`).join("");
 if(k==="clouds")s+=`<circle cx="306" cy="46" r="20" ${A2}/><g opacity=".5">${cld(60,50,.9,"var(--surface2)")+cld(250,170,1.1,"var(--surface2)")+cld(90,180,.8,"var(--surface2)")}</g>`;
 if(k==="melt")s+=`<path class="melt" d="M110 140 C110 110 250 110 250 140 C250 160 230 170 226 190 C222 170 205 170 200 196 C195 172 170 170 164 188 C158 168 130 165 110 140Z" fill="#b8a98f" stroke="${K}" stroke-width="2"/><path d="M130 130 L230 118" stroke="${K}" stroke-width="5" stroke-linecap="round"/><path d="M130 130 L230 118" stroke="#a86f35" stroke-width="2.5" stroke-linecap="round"/><circle cx="136" cy="128" r="9" fill="#a86f35" stroke="${K}" stroke-width="2"/>`;
 if(k==="river")s+=`<path d="M40 150 L80 110 L120 150Z" ${A2}/><path d="M50 150 V180 H110 V150" ${A2}/><path d="M290 160 V110 M270 130 Q290 90 310 130" ${A2}/>`+W(200,12,6);
 if(k==="scroll")s+=`<rect x="110" y="40" width="140" height="140" rx="6" ${A2}/>`+[0,1,2,3,4,5,6].map(i=>`<path d="M126 ${64+i*16} H${234-(i%3)*18}" ${A2}/>`).join("");
 if(k==="lamps")s+=`<path d="M60 60 L80 30 L100 60 M140 60 L160 22 L180 60 M220 60 L240 30 L260 60" ${A2}/>`+[30,90,150,210,270,330].map(x=>diya(x,200)).join("");
 if(k==="sea")s+=`<circle cx="290" cy="56" r="22" ${A2}/><circle cx="290" cy="56" r="30" ${A2} stroke-dasharray="2 6"/>`+W(165,22,4)+W(192,18,5)+W(214,14,6);
 if(k==="forest")s+=[30,80,130,235,290,340].map((x,i)=>{const t=i%2?24:0;return `<path d="M${x} 214 V${168-t}" ${A2}/><path d="M${x-24} ${176-t} L${x} ${116-t} L${x+24} ${176-t}Z" ${A2}/><path d="M${x-18} ${150-t} L${x} ${104-t} L${x+18} ${150-t}" ${A2}/>`}).join("");
 if(k==="city")s+=[[40,96],[92,64],[150,84],[212,52],[270,78],[322,98]].map(([x,y])=>`<path d="M${x-20} 214 V${y+30} L${x} ${y} L${x+20} ${y+30} V214" ${A2}/><path d="M${x} ${y} v-14 l10 5 l-10 4" ${A2}/>`).join("");
 if(k==="stars")s+=[[50,40],[110,74],[200,30],[260,64],[320,118],[36,126],[150,140],[300,30]].map(([x,y])=>`<path d="M${x} ${y-5}v10M${x-5} ${y}h10" ${A2}/>`).join("")+`<path d="M180 14 l4 10 l10 1 l-8 7 l3 10 l-9 -6 l-9 6 l3 -10 l-8 -7 l10 -1z" fill="#d9a441" stroke="${K}" stroke-width="1.2"/>`;
 if(k==="rivers")s+=[0,1,2].map(i=>`<path d="M${30+i*150} 10 C${60+i*120} 80 ${150+i*20} 120 180 210" fill="none" stroke="${["#e5762f","#3f8f6a","#a24b74"][i]}" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>`).join("");
 return s;
}
let PL=null,ST=null;
const sceneInner=sc=>`${storyBg(sc.bg)}${sc.props||""}${(sc.notes||[]).map(([x,y])=>notes(x,y)).join("")}${(sc.chars||[]).map(([id,x,y,k,an])=>`<g transform="translate(${x} ${y}) scale(${k})"><g class="${an||""}">${portraitG(id)}</g></g>`).join("")}`;
function openPlayer(o){
 stopTool();PL=Object.assign({i:0,t:null,swiped:false},o);
 openLayer(`<div class="scrim center" data-close="1"><div class="story" role="dialog" aria-modal="true" aria-label="${esc(o.label||"Story")}"><div class="segs">${o.cards.map(()=>`<i><b></b></i>`).join("")}</div>
 <div class="shead"><span class="pair">${(o.cast||[]).map(p=>medal(p,"xs")).join("")}</span><div><b>${o.title}</b><small>${o.sub||""}</small></div><button class="xbtn" data-close="1" aria-label="Close">×</button></div>
 <div class="cards" data-pnext="1">${o.cards.map((c,i)=>`<div class="card2" data-i="${i}">${c.kick?`<div class="kick2">${c.kick}</div>`:""}${c.svg?`<svg class="sstage" viewBox="0 0 360 220" role="img" aria-label="Story picture"><g class="sc">${c.svg}</g></svg>`:""}${c.html||""}${c.cap?`<p class="cap">${c.cap}</p>`:""}</div>`).join("")}</div>
 <div class="row"><button class="mini" data-pprev="1">Back</button><button class="mini pri" data-pnext="1">Next</button></div></div></div>`);
 const box=$(".story .cards");let x0=null;
 box.addEventListener("pointerdown",e=>{x0=e.clientX});
 box.addEventListener("pointerup",e=>{if(x0===null)return;const dx=e.clientX-x0;x0=null;if(Math.abs(dx)>40){PL.swiped=true;showCard(PL.i+(dx<0?1:-1))}});
 showCard(0);
}
function showCard(i){
 if(!PL)return;clearTimeout(PL.t);const n=PL.cards.length;i=Math.max(0,i);
 if(i>=n){closeLayer();return}
 PL.i=i;const box=$(".story");if(!box)return;
 box.querySelectorAll(".card2").forEach(c=>{const on=+c.dataset.i===i;c.classList.toggle("on",on);const g=c.querySelector(".sc");if(g)g.classList.toggle("on",on)});
 box.querySelectorAll(".segs i").forEach((sg,k)=>{sg.className=k<i?"done":k===i?(PL.auto?"now":"done"):""});
 box.querySelector('.row [data-pnext]').textContent=i<n-1?"Next":PL.deck?"Start my day":"Close";
 if(PL.auto&&i<n-1)PL.t=setTimeout(()=>showCard(i+1),6000);
}
function playStory(id){
 const st=STORIES[id],sy=SYN.find(x=>x.id===id),open=S.syn.includes(id),cast=st.cast;
 const end={bg:"glow",chars:cast.map((p,i)=>[CHAR[p],cast.length===2?(i?200:40):[10,120,230][i],60,cast.length===2?.95:.8,"rise"])};
 const cards=st.scenes.map(sc=>({svg:sceneInner(sc),cap:sc.cap}));
 cards.push({svg:sceneInner(end),cap:`<b>${open?"Bridge open":"This bridge opens later"}: ${sy.n}.</b> ${sy.p.map(p=>PATHS[p].name).join(" + ")} help each other: +10% growth and a daily task, “${sy.q.toLowerCase()}”.`});
 openPlayer({label:sy.n,title:`${sy.n} <span class="dev" style="color:var(--mute);font-size:15px">${sy.d}</span>`,sub:st.note,cast,cards,auto:true});
}
function charmSvg(g,size){const c=PATHS[PEOPLE[g].pid].c;return `<svg viewBox="0 0 60 72" width="${size}" height="${Math.round(size*1.2)}" aria-hidden="true"><path d="M30 2 v12" stroke="var(--mute)" stroke-width="2"/><circle cx="30" cy="16" r="3" fill="var(--mute)"/><circle cx="30" cy="44" r="25" style="fill:${c}" stroke="${K}" stroke-width="2.4"/><circle cx="30" cy="44" r="18" fill="none" stroke="#f3ead6" stroke-width="1.6" stroke-dasharray="2 3"/><path d="M30 30 C26 38 26 44 30 52 C34 44 34 38 30 30Z M18 44 C24 40 28 40 30 44 C28 48 24 48 18 44Z M42 44 C36 40 32 40 30 44 C32 48 36 48 42 44Z" fill="#f3ead6" stroke="${K}" stroke-width="1.2"/></svg>`}
function playChapter(g,ch){const C=CHAPTERS[g][ch],pp=PEOPLE[g];
 const cards=C.scenes.map(sc=>({svg:sceneInner(sc),cap:sc.cap}));cards.push({html:`<div class="dk-charm">${charmSvg(g,90)}<b>${C.charm[0]}</b><p>${C.charm[1]}</p></div>`,cap:`${pp.n} brought this charm back from ${C.dest}.`});
 openPlayer({label:C.dest,title:`${pp.n} · ${C.dest}`,sub:`Journey chapter ${ch+1} of ${CHAPTERS[g].length}`,cast:[pp.pid],cards,auto:true})}

/* ================= day rollover and journey ================= */
function dayTick(){
 const t=td();if(S.tick===t)return;S.tick=t;const y=yday();
 if(S.days[y]&&S.days[y].a&&!(S.journey&&S.journey.d===y)){const pid=companionPid(y);if(pid){const g=CHAR[pid];S.journey={d:y,g,ch:nextCh(g),back:false,auto:true}}}
 const J=S.journey;
 if(J&&!J.back&&J.d<t){J.back=true;J.ret=t;const C=CHAPTERS[J.g][J.ch];if(!S.charms.some(c=>c.n===C.charm[0]))S.charms.push({n:C.charm[0],g:J.g,d:t});S.chap[J.g]=(S.chap[J.g]||0)+1;S.chapters.push({g:J.g,ch:J.ch,d:t})}
 save();
}
function weekStrip(){const t=td(),d=new Date(t+"T12:00:00"),mon=addD(t,-((d.getDay()+6)%7)),L=["Mo","Tu","We","Th","Fr","Sa","Su"];
 return `<div class="week">${L.map((l,i)=>{const x=addD(mon,i),a=S.days[x]&&S.days[x].a,cls=x===t?(a?"done today":"today"):x>t?"future":(a?"done":"miss");return `<span class="wd ${cls}"><i>${a?DIYA:""}</i><small>${l}</small></span>`}).join("")}</div>`}
const goalLine=()=>S.streak>=S.goal?`Goal of ${S.goal} days reached`:`${S.goal-S.streak} more day${S.goal-S.streak===1?"":"s"} to reach your goal of ${S.goal}`;
function streakSheet(){const sh=shieldsAllowed(),used=S.shieldUsed.w===weekKey()?S.shieldUsed.n:0;
 sheet("var(--gold)",`<div class="sk-top"><div class="flame big">${DIYA}</div><div><b class="sk-n">${S.streak}</b><span>day streak · best ${S.best}</span></div></div>${weekStrip()}
 <div class="box"><small>Your goal</small>${goalLine()}<div class="track" style="--c:var(--gold)"><i style="width:${Math.min(100,S.streak/S.goal*100)}%"></i></div></div>
 <div class="box"><small>Streak shields</small>${sh?`${Math.max(0,sh-used)} of ${sh} left this week. Each covers one missed day.`:"Earn shields from skills like Smarana, Maitri and Tala."}</div>
 <p class="sub">One task a day keeps your lamp lit.</p><button class="cta" style="width:100%" data-close="1">Keep going</button>`)}
const MOODS=[["heavy","Heavy"],["okay","Okay"],["good","Good"],["bright","Bright"]];
const REPLY={heavy:["Some days are heavy. You still showed up, and that counts.","Rest is part of the path. Tomorrow is a new step."],okay:["An ordinary day, kept honestly. That is how practice grows.","Steady is enough. Steady wins."],good:["Good. Notice what made today work, and do it again.","Small steps, well taken."],bright:["Hold on to this feeling. You earned it.","A bright day. Share some of that light tomorrow."]};
let EV=null;
function eveSheet(){EV=EV||{mood:null,note:""};const t=td(),pid=companionPid(t),g=CHAR[pid],C=CHAPTERS[g][nextCh(g)],any=S.days[t]&&S.days[t].a;
 sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Sandhya · close your day</div><h2>How was today?</h2><div class="moods">${MOODS.map(([k,l])=>`<button class="mood" data-mood="${k}" aria-pressed="${EV.mood===k}"><span class="mdot m-${k}"></span>${l}</button>`).join("")}</div>
 <label class="qlabel" for="evenote" style="display:block">One line about today (optional)</label><input class="name" id="evenote" maxlength="140" placeholder="What went well, or what you learned" value="${esc(EV.note)}" style="font-size:16px">
 <div class="box" style="margin-top:14px;display:flex;gap:12px;align-items:center">${medal(pid,"sm")}<span>${any?`Close your day and ${PEOPLE[g].n} sets out for ${C.dest} tonight.`:`Finish one task first, and ${PEOPLE[g].n} can set out for ${C.dest} tonight.`}</span></div>
 <button class="cta" style="width:100%" data-eve-close="1" ${EV.mood?"":"disabled"}>${EV.mood?"Close my day":"Pick how today felt"}</button>`);
 const i=$("#evenote");if(i)i.addEventListener("input",e=>EV.note=e.target.value)}
function eveClose(){const t=td(),d=S.days[t]=S.days[t]||{},pid=companionPid(t),g=CHAR[pid];d.mood=EV.mood;d.note=(EV.note||"").trim().slice(0,140);S.closed=t;
 if(d.a&&!(S.journey&&S.journey.d===t))S.journey={d:t,g,ch:nextCh(g),back:false};
 const C=CHAPTERS[g][S.journey&&S.journey.d===t?S.journey.ch:nextCh(g)],L=REPLY[d.mood];EV=null;$(".scrim")&&$(".scrim").remove();save();render();
 pushModal(`<div style="display:flex;justify-content:center">${medal(pid,"lg")}</div><div class="kick" style="margin-top:8px;color:${PATHS[pid].c}">${PEOPLE[g].n}</div><h2 style="font-size:21px;line-height:1.35">“${L[dayNum(t)%L.length]}”</h2><p>${d.a?`${CAP(HE(g))} sets out for ${C.dest} tonight. Come back tomorrow morning to hear what happened.`:`Rest well. Tomorrow, one task is enough to send ${HIM(g)} on ${HIS(g)} way.`}</p>`)}
function openDeck(){
 const t=td(),pid=companionPid(t);if(!pid)return;const g=CHAR[pid],J=S.journey,cards=[],r=ritu(t),cal=todayCal(),L=GUIDE_LINES[pid];
 const hi=new Date().getHours()<12?"Good morning":"Welcome back";
 cards.push({html:`<div class="dk-streak"><div class="flame">${DIYA}</div><b>${S.streak}</b><span>${S.streak?`day streak`:"Light your lamp today"}</span>${weekStrip()}<small>${goalLine()}</small></div>`,cap:`${hi}${S.name?", "+esc(S.name):""}. ${S.streak?"Keep the lamp lit: one task is enough.":"One task today starts your streak."}`});
 if(J&&J.back&&J.ret===t){const C=CHAPTERS[J.g][J.ch],pp=PEOPLE[J.g];C.scenes.forEach(sc=>cards.push({kick:`While you slept · ${pp.n} reached ${C.dest}`,svg:sceneInner(sc),cap:sc.cap}));cards.push({kick:"New charm",html:`<div class="dk-charm">${charmSvg(J.g,90)}<b>${C.charm[0]}</b><p>${C.charm[1]}</p></div>`,cap:`${pp.n} brought this back from ${C.dest}. Find it on your Hero page.`})}
 else{const C=CHAPTERS[g][nextCh(g)];cards.push({kick:"Today’s companion",svg:sceneInner({bg:"glow",chars:[[g,120,50,1,"float"]]}),cap:`${PEOPLE[g].n} is ready to travel to ${C.dest}. Do one task and close your day, and ${HE(g)} sets out tonight.`})}
 cards.push({html:`<div class="dk-cal"><span class="chip2">${r.n} ritu · ${r.m}</span><small>${cal.fest?"Today in the Indian calendar":"A story for today"}</small><h3>${cal.n}${cal.d?`<span class="dev">${cal.d}</span>`:""}</h3><p>${cal.s}</p><div class="box"><small>Try today</small>${cal.t}</div>${cal.src?`<span class="src">${cal.src}</span>`:""}${cal.approx?`<span class="src">Date approximate</span>`:""}</div>`,cap:""});
 cards.push({html:`<div class="dk-start"><div style="display:flex;justify-content:center">${medal(pid,"lg")}</div><p class="gq">“${L[dayNum(t)%L.length]}”</p><small class="mute">${PATHS[pid].hero} walks with you today</small></div>`,cap:""});
 openPlayer({label:"Your morning",title:"Your morning",sub:new Date().toLocaleDateString("en-GB",{weekday:"long"})+", "+t.split("-").reverse().join("."),cast:[pid],cards,auto:false,deck:true});
}
function calSheet(k){const f=k?FEST[k]:todayCal(),r=ritu(k||td());
 sheet("var(--gold)",`<div class="kick">${k?`${k.slice(8)}.${k.slice(5,7)} · ${inDays(k)}`:(f.fest?"Today in the Indian calendar":"A story for today")}</div><h2>${f.n}${f.d?`<span class="dev">${f.d}</span>`:""}</h2><p class="story">${f.s}</p><div class="box"><small>Try ${k?"that day":"today"}</small>${f.t}</div>${f.src?`<p class="sub">${f.src}</p>`:""}${f.approx?`<p class="sub">Date approximate. Check a panchang before planning.</p>`:""}<p class="sub">${r.n} ritu · ${r.m}</p><button class="cta" style="width:100%" data-close="1">Close</button>`)}
function burst(ev,c){if(!ev||!ev.clientX||matchMedia("(prefers-reduced-motion: reduce)").matches)return;for(let i=0;i<10;i++){const e=document.createElement("i");e.className="petal";const a=i/10*Math.PI*2+Math.random()*.4,d=30+Math.random()*24;e.style.cssText=`left:${ev.clientX}px;top:${ev.clientY}px;--c:${c};--x:${(Math.cos(a)*d).toFixed(1)}px;--y:${(Math.sin(a)*d).toFixed(1)}px`;document.body.appendChild(e);setTimeout(()=>e.remove(),800)}}

function avatar(st){
 const pr=k=>S.paths.includes(k)?S.prog[k].m:0;
 const sk="#c48459",skd="#a0663f",sh=24+Math.min(5,pr("body"))*1.6;
 const dhoti=st>=1?"#f3ead6":"#d8d1c2",O=`stroke="${K}" stroke-width="3" stroke-linejoin="round"`,O2=`stroke="${K}" stroke-width="2"`;
 let s="";
 if(st>=5)for(let i=0;i<24;i++){const a=i*15*Math.PI/180,r1=60,r2=74;s+=`<path d="M${100+r1*Math.cos(a-.11)} ${66+r1*Math.sin(a-.11)} L${100+r2*Math.cos(a)} ${66+r2*Math.sin(a)} L${100+r1*Math.cos(a+.11)} ${66+r1*Math.sin(a+.11)}Z" fill="#d0492e" ${O2}/>`}
 if(st>=4)s+=`<circle cx="100" cy="66" r="62" fill="#d9a441" ${O}/><circle cx="100" cy="66" r="50" fill="var(--surface)" ${O}/>`;
 s+=`<ellipse cx="100" cy="226" rx="58" ry="7" fill="${K}" opacity=".18"/>`;
 if(pr("bonds")>=4)s+=`<g transform="rotate(-18 60 110)"><rect x="50" y="70" width="20" height="70" rx="4" fill="#8a5a2b" ${O}/><path d="M54 70 l-4 -18 M60 70 l0 -20 M66 70 l4 -18" stroke="${K}" stroke-width="2.5"/><path d="M47 52 l3 -6 3 6 M57 50 l3 -6 3 6 M67 52 l3 -6 3 6" fill="#d0492e" ${O2}/></g>`;
 if(pr("music")>=2)s+=`<line x1="62" y1="36" x2="150" y2="196" stroke="${K}" stroke-width="9" stroke-linecap="round"/><line x1="62" y1="36" x2="150" y2="196" stroke="#a86f35" stroke-width="4" stroke-linecap="round"/><circle cx="66" cy="44" r="12" fill="#a86f35" ${O}/><circle cx="146" cy="188" r="15" fill="#a86f35" ${O}/>`;
 if(pr("bonds")>=2)s+=`<path d="M150 40 Q118 120 150 200" stroke="${K}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M150 40 Q118 120 150 200" stroke="#d9a441" stroke-width="4" fill="none" stroke-linecap="round"/><line x1="150" y1="40" x2="150" y2="200" stroke="#f3ead6" stroke-width="1.4"/>`;
 s+=`<rect x="85" y="168" width="12" height="55" rx="6" fill="${sk}" ${O}/><rect x="103" y="168" width="12" height="55" rx="6" fill="${sk}" ${O}/>`;
 const dl=st>=2?206:182;
 s+=`<path d="M${100-sh+6} 126 L${100+sh-6} 126 L${100+sh+2} ${dl} Q100 ${dl-12} ${100-sh-2} ${dl} Z" fill="${dhoti}" ${O}/>`;
 if(st>=2)s+=`<path d="M${100+sh} ${dl-4} Q100 ${dl-16} ${100-sh} ${dl-4}" stroke="#d0492e" stroke-width="4" fill="none"/>`;
 const arm=a=>`<path d="${a}" stroke="${K}" stroke-width="16" stroke-linecap="round" fill="none"/><path d="${a}" stroke="${sk}" stroke-width="10" stroke-linecap="round" fill="none"/>`;
 s+=arm(`M${100-sh} 88 Q${100-sh-13} 116 ${100-sh-6} 150`)+arm(`M${100+sh} 88 Q${100+sh+13} 116 ${100+sh+6} 150`);
 s+=`<path d="M${100-sh} 84 Q100 76 ${100+sh} 84 L${100+sh-8} 130 L${100-sh+8} 130 Z" fill="${sk}" ${O}/>`;
 if(pr("body")>=4)s+=`<rect x="${100-sh-15}" y="103" width="13" height="7" rx="2" fill="#d9a441" ${O2}/><rect x="${100+sh+2}" y="103" width="13" height="7" rx="2" fill="#d9a441" ${O2}/>`;
 if(st>=1)s+=`<path d="M${100-sh+5} 84 L${100+sh-7} 128" stroke="${K}" stroke-width="13" stroke-linecap="round"/><path d="M${100-sh+5} 84 L${100+sh-7} 128" stroke="#d0492e" stroke-width="8" stroke-linecap="round"/>`;
 if(st>=2||pr("music")>=4){const mc=pr("music")>=4?"#4f8a3c":"#5a2f16";for(let i=0;i<=8;i++){const t=i/8;s+=`<circle cx="${86+28*t}" cy="${86+20*Math.sin(Math.PI*t)}" r="2.7" fill="${mc}" stroke="${K}" stroke-width="1"/>`}}
 s+=`<rect x="94" y="66" width="12" height="18" rx="3" fill="${skd}" ${O}/><circle cx="100" cy="54" r="19" fill="${sk}" ${O}/>`;
 s+=st>=1?`<path d="M81 52 Q82 33 100 33 Q118 33 119 52 Q112 42 100 42 Q88 42 81 52Z" fill="${K}"/><circle cx="100" cy="29" r="${st>=3?9:7}" fill="${K}"/>`:`<path d="M81 52 Q82 34 100 34 Q118 34 119 52 Q110 44 100 45 Q90 44 81 52Z" fill="${K}"/>`;
 s+=`<path d="M91 56 q3 2.5 6 0M103 56 q3 2.5 6 0" stroke="${K}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
 if(st>=2)s+=`<path d="M100 40 v8" stroke="${st>=4?"#d0492e":"#d9a441"}" stroke-width="3" stroke-linecap="round"/>`;
 if(st>=4)s+=`<path d="M82 38 L86 22 L93 32 L100 16 L107 32 L114 22 L118 38 Z" fill="#d9a441" ${O}/><circle cx="100" cy="30" r="2.8" fill="#d0492e"/>`;
 s+=`<circle cx="${100-sh-6}" cy="151" r="6" fill="${sk}" ${O}/><circle cx="${100+sh+6}" cy="151" r="6" fill="${sk}" ${O}/>`;
 if(pr("body")>=2)s+=`<line x1="${100+sh+6}" y1="160" x2="${100+sh+12}" y2="96" stroke="${K}" stroke-width="9" stroke-linecap="round"/><line x1="${100+sh+6}" y1="160" x2="${100+sh+12}" y2="96" stroke="#8a5424" stroke-width="4" stroke-linecap="round"/><circle cx="${100+sh+13}" cy="86" r="14" fill="#d9a441" ${O}/><circle cx="${100+sh+13}" cy="86" r="5" fill="#d0492e" ${O2}/>`;
 return `<svg viewBox="-10 -10 220 250" role="img" aria-label="Your hero at rank ${RANKS[st][0]}">${s}</svg>`;
}


/* ================= focus: choose up to 5, readiness nudges ================= */
const MAXP=5;
function recordHist(){const P=S.plan;if(!P||!P.d||P.d===td()||S.hist[P.d])return;const h={};P.items.forEach(x=>{if(x.kind!=="task"&&x.kind!=="anchor")return;const a=h[x.pid]=h[x.pid]||[0,0];a[0]++;if(x.done)a[1]++});S.hist[P.d]=h;const k=Object.keys(S.hist).sort();while(k.length>60)delete S.hist[k.shift()]}
function rate(pid,days){let s=0,d=0;Object.keys(S.hist).forEach(k=>{const h=S.hist[k][pid];if(h&&diff(k,td())<=days){s+=h[0];d+=h[1]}});return{s,d,r:s?d/s:0}}
function nudges(){const out=[],act=sel();
 act.forEach(pid=>{const pr=S.prog[pid],P=PATHS[pid];
  if(pr.m>=5){out.push({k:"mastered-"+pid,pid,t:`${P.hero}’s path is yours`,s:`Every ${P.name} skill is earned. Pause it to free a slot for something new? Your skills stay.`,act:"pause"});return}
  const r21=rate(pid,21),r14=rate(pid,14);
  if(pr.m>=3&&r21.s>=10&&r21.r>=.7){const rel=(RELATED[pid]||[]).find(x=>!S.paths.includes(x));if(rel&&act.length<MAXP)out.push({k:"expand-"+rel,pid:rel,t:"Ready to expand?",s:`Your ${P.name} is strong. ${PATHS[rel].name} with ${PATHS[rel].hero} builds on what you already do.`,act:"add"})}
  if(r14.s>=6&&r14.r<.3)out.push({k:"stall-"+pid,pid,t:`${P.name} feels heavy lately`,s:`Few ${P.name} tasks done in two weeks. Pause it for now? Your progress stays.`,act:"pause"});
 });
 const tot=act.reduce((a,p)=>{const r=rate(p,21);a.s+=r.s;a.d+=r.d;return a},{s:0,d:0});
 if(tot.s>=20&&tot.d/tot.s>=.8&&act.length<MAXP){const used=new Set(act.map(p=>PATHS[p].realm)),R=REALMS.find(r=>!used.has(r.id)&&ORDER.some(p=>PATHS[p].realm===r.id));if(R){const p=ORDER.find(x=>PATHS[x].realm===R.id&&!S.paths.includes(x));out.push({k:"challenge-"+p,pid:p,t:"A new challenge?",s:`You’ve been consistent. Nothing in ${R.n} yet: try ${PATHS[p].name} with ${PATHS[p].hero}.`,act:"add"})}}
 return out.filter(n=>!(S.dismiss[n.k]&&diff(S.dismiss[n.k],td())<14));
}
const nudgeCard=n=>`<div class="nudge" style="--c:${PATHS[n.pid].c}">${medal(n.pid,"sm")}<div class="ntext"><b>${n.t}</b><small>${n.s}</small><div class="nacts"><button class="mini pri" data-nudge-act="${n.pid}:${n.act}">${n.act==="add"?`Add ${PATHS[n.pid].name}`:"Pause it"}</button><button class="mini" data-nudge-x="${n.k}">Not now</button></div></div></div>`;
function focusSection(){
 return `<div class="block"><h2>Your focus</h2><p class="sub">${sel().length} of ${MAXP} paths active. Tap a path to add or pause it. Paused paths keep their progress.</p>${nudges().map(nudgeCard).join("")}
 ${REALMS.map(R=>`<div class="realm"><div class="rh"><b>${R.n}</b><span class="dev">${R.d}</span><small>${R.s} · ${R.about}</small></div><div class="rpaths">${ORDER.filter(p=>PATHS[p].realm===R.id).map(p=>{const on=S.paths.includes(p),pr=S.prog[p];return `<button class="rpath${on?" on":""}" data-pathsheet="${p}" style="--c:${PATHS[p].c}">${medal(p,"xs")}<span><b>${PATHS[p].name}</b><small>${on?"Active":pr.m||pr.xp?`Paused · ${pr.m}/5`:"Not started"} · ${PATHS[p].hero}</small></span></button>`}).join("")}${SOON.filter(x=>x[2]===R.id).map(([n,h])=>`<div class="rpath soonp"><span class="medal xs" style="--c:var(--faint)"></span><span><b>${n}</b><small>Coming soon · ${h}</small></span></div>`).join("")}</div></div>`).join("")}</div>`;
}
function pathSheet(pid){const P=PATHS[pid],g=CHAR[pid],pp=PEOPLE[g],R=REALMS.find(r=>r.id===P.realm),on=S.paths.includes(pid),pr=S.prog[pid],fresh=!pr.m&&!pr.xp&&!pr.set;
 sheet(P.c,`<div style="display:flex;gap:14px;align-items:center">${medal(pid,"lg")}<div><div class="kick">${R.n} · ${R.s}</div><h2>${P.name}</h2><small class="mute">with ${pp.n} <span class="dev">${pp.d}</span></small></div></div>
 <p class="story">${pp.bio}</p><div class="box"><small>This path covers</small>${P.about}</div>
 ${fresh?"":`<div class="box"><small>Your progress</small>${RANKS[Math.min(pr.m,5)][0]} · ${pr.m} of 5 skills</div>`}
 ${on?`<button class="cta alt" style="width:100%" data-path-pause="${pid}">Pause this path</button>`
  :S.paths.length>=MAXP?`<p class="sub">You already have ${MAXP} paths. Pause one to make room.</p>`
  :fresh?`<div class="qlabel">${P.q}</div><div class="steps">${P.levels.map((l,k)=>`<button class="lvl" style="--c:${P.c}" data-path-add="${pid}:${k}"><span class="bars">${[0,1,2,3].map(b=>`<i class="${b<=k?"on":""}" style="height:${6+b*4.5}px"></i>`).join("")}</span>${l}</button>`).join("")}</div>`
  :`<button class="cta" style="width:100%" data-path-add="${pid}:-1">Add to my focus</button>`}`)}
function addPath(pid,k){if(S.paths.includes(pid))return;if(S.paths.length>=MAXP){toast(`You have ${MAXP} paths. Pause one first.`);return}
 if(k>=0)S.prog[pid]={m:k,xp:0,set:true};S.paths=ORDER.filter(p=>p===pid||S.paths.includes(p));closeLayer();replan();
 const g=CHAR[pid],pp=PEOPLE[g];if(wantIntros()&&!S.intro.includes(g)){playIntro([pid]);return}pushModal(`<div style="display:flex;justify-content:center">${medal(pid,"lg")}</div><div class="kick" style="color:${PATHS[pid].c}">New path · ${PATHS[pid].name}</div><h2>Meet ${pp.n}<span class="dev">${pp.d}</span></h2><p>${pp.bio}</p><p style="font-family:var(--f-head);color:var(--ink)">“${GUIDE_LINES[pid][0]}”</p>`)}
function pausePath(pid){if(S.paths.length<=1){toast("Keep at least one path active");return}S.paths=S.paths.filter(p=>p!==pid);closeLayer();replan();toast(`${PATHS[pid].name} paused. Your progress is saved.`)}
function realmWheel(){const cx=150,cy=118,R=86,n=REALMS.length,pt=(i,f)=>{const a=(-90+i*360/n)*Math.PI/180;return[cx+R*f*Math.cos(a),cy+R*f*Math.sin(a)]};
 const val=REALMS.map(r=>{let b=0;ORDER.filter(p=>PATHS[p].realm===r.id).forEach(p=>{const pr=S.prog[p];b=Math.max(b,pr.m>=5?5:pr.m+Math.min(1,pr.xp/NEED[pr.m]))});return Math.max(.04,b/5)});
 let g="";[.2,.4,.6,.8,1].forEach(f=>{g+=`<polygon points="${REALMS.map((_,i)=>pt(i,f).join(",")).join(" ")}" fill="none" stroke="var(--line)" stroke-width="1"/>`});
 REALMS.forEach((_,i)=>{const[x,y]=pt(i,1);g+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--line)"/>`});
 g+=`<polygon points="${val.map((v,i)=>pt(i,v).join(",")).join(" ")}" fill="color-mix(in srgb,var(--gold) 25%,transparent)" stroke="var(--gold)" stroke-width="2.5" stroke-linejoin="round"/>`;
 REALMS.forEach((r,i)=>{const[x,y]=pt(i,1.24),[vx,vy]=pt(i,val[i]);g+=`<circle cx="${vx}" cy="${vy}" r="4" fill="var(--gold)"/><text x="${x}" y="${y}" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="var(--ink)">${r.n}</text><text x="${x}" y="${y+14}" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="var(--mute)">${r.s}</text>`});
 return `<svg class="wheel" viewBox="0 0 300 250" role="img" aria-label="Balance across the five realms: ${REALMS.map((r,i)=>`${r.n} ${Math.round(val[i]*100)}%`).join(", ")}">${g}</svg>`}

function learnedView(){const E=Object.entries(S.learn),fav=E.filter(([,l])=>l.sh>=3&&l.dn/l.sh>=.7&&!l.never).sort((a,b)=>b[1].dn-a[1].dn).slice(0,5),nev=E.filter(([,l])=>l.never),own=ORDER.flatMap(p=>(S.custom[p]||[]).map(c=>[p,c]));
 if(!fav.length&&!nev.length&&!own.length)return `<p class="sub">Nothing yet. Each task you finish or swap teaches it what fits you. Everything stays on this phone.</p>`;
 const row=(t,small,btn)=>`<div class="lrow"><span><b>${esc(t)}</b><small>${small}</small></span>${btn||""}</div>`;
 return `${fav.length?`<div class="ptitle">You usually finish</div>${fav.map(([t,l])=>row(t,`${l.dn} of ${l.sh} times`)).join("")}`:""}
 ${own.length?`<div class="ptitle">Your own tasks</div>${own.map(([p,c],i)=>row(c.t,`${PATHS[p].name} · ${c.m} min`,`<button class="mini" data-uncustom="${p}:${(S.custom[p]||[]).indexOf(c)}">Remove</button>`)).join("")}`:""}
 ${nev.length?`<div class="ptitle">Never suggested</div>${nev.map(([t])=>row(t,"You chose “Not for me”",`<button class="mini" data-unnever="${esc(t)}">Bring back</button>`)).join("")}`:""}`}

/* ================= starter pack ================= */
const enLine=n=>EN[n]?`<p class="en">${EN[n]}</p>`:"";
const wantIntros=()=>S.lore!=="well";
function playIntro(pids,done){pids=pids.filter(p=>!S.intro.includes(CHAR[p]));if(!pids.length){if(done)done();return}
 const pid=pids[0],g=CHAR[pid],I=GUIDE_INTRO[g],pp=PEOPLE[g],P=PATHS[pid];S.intro.push(g);save();
 const cards=[
  {kick:`Meet your guide · ${P.name}`,svg:sceneInner({bg:"glow",chars:[[g,120,50,1,"rise"]]}),cap:`<b>${pp.n} <span class="dev" style="color:var(--mute)">${pp.d}</span></b><br>${I.who}`},
  {kick:"A famous moment",svg:sceneInner({bg:I.bg,chars:[[g,120,55,.9,"float"]]}),cap:I.moment},
  {kick:`What ${pp.n} teaches you`,html:`<div class="dk-start"><div style="display:flex;justify-content:center">${medal(pid,"lg")}</div><p class="gq">“${GUIDE_LINES[pid][0]}”</p></div>`,cap:`${I.teach}<br><small class="mute">From the ${I.src}. Abhyasa uses these as stories to learn from. You don’t need to be religious to walk this path.</small>`}];
 openPlayer({label:`Meet ${pp.n}`,title:`Meet ${pp.n}`,sub:`Guide for ${P.name}`,cast:[pid],cards,auto:false,after:()=>playIntro(pids.slice(1),done)});
}
function tipCard(){const L=TIPS[S.view]||[],t=L.find(x=>!S.tips.includes(S.view+":"+x[0]));if(!t)return"";const n=L.indexOf(t)+1;
 return `<div class="wrap"><div class="tip1" role="note"><span class="tipi">${ic("sun")}</span><div><small>Tip ${n} of ${L.length}</small><p>${t[1]}</p><div class="nacts"><button class="mini pri" data-tip="${S.view}:${t[0]}">Got it</button><button class="mini" data-tips-off="1">Skip all tips</button></div></div></div></div>`}
function glossaryView(){return `<div class="cchips" style="margin:6px 0 12px">${[["well","I know these stories"],["some","A little"],["new","New to me"]].map(([k,l])=>`<button class="chip" data-lore="${k}" aria-pressed="${S.lore===k}">${l}</button>`).join("")}</div>
 <p class="sub">${S.lore==="well"?"Guide intros are off.":"New guides introduce themselves with 3 short cards."}</p>
 ${GLOSSARY.map(([h,L])=>`<details class="gloss"><summary>${h}</summary>${L.map(([t,d])=>`<div class="gl"><b>${t}</b><span>${d}</span></div>`).join("")}</details>`).join("")}`}

/* ================= views ================= */
let lastView="",GI=0,GANIM=false,TALK=null;
function render(){
 if(!S.on){quiz();return}
 dayTick();ensurePlan();
 if(!["today","journey","hero"].includes(S.view))S.view="today";
 const v=S.view,app=$("#app");
 app.innerHTML=(v==="hero"?heroView():v==="journey"?journeyView():todayView())+tabs();
 paint();setBg(pageScene());
 if(anim){const a=anim;anim=null;Object.keys(a).forEach(pid=>{const el=document.querySelector(`.ringi[data-ring="${pid}"] .rp`);if(!el)return;const to=el.getAttribute("stroke-dasharray");el.style.transition="none";el.style.strokeDasharray=`${(a[pid]*RC).toFixed(1)} ${RC.toFixed(1)}`;el.getBoundingClientRect();el.style.transition="";el.style.strokeDasharray=to})}
 if(lastView!==v){lastView=v;app.classList.remove("enter");void app.offsetWidth;app.classList.add("enter")}
 save();
 if(S.deck!==td()&&!$(".scrim")&&!queue.length)setTimeout(()=>{if(S.on&&S.deck!==td()&&!$(".scrim"))openDeck()},300);
}
function header(){return `<header class="bar"><div class="wrap"><span class="mark">Abhyasa<span class="dev">अभ्यास</span></span><button class="spill" data-streak="1" aria-label="${S.streak} day streak. Open streak details">${DIYA}${S.streak}</button></div></header>`}
function tabs(){return `<nav class="tabs" aria-label="Main"><div class="wrap">${[["today","Today","sun"],["journey","Journey","path"],["hero","Hero","hero"]].map(([k,l,i])=>`<button data-view="${k}" ${S.view===k?'aria-current="page"':""}>${ic(i)}<span>${l}</span></button>`).join("")}</div></nav>`}
let CI=null,CIedit=false;
const E_L={low:"Low",ok:"OK",high:"High"},W_L={normal:"Normal day",home:"Home only",travel:"Travelling"};
function checkCard(){
 const c=checkToday(),done=c.d===td();
 if(done&&!CIedit)return `<div class="cisum"><span>${E_L[c.energy]} energy · ${c.sore.length?"sore "+c.sore.map(k=>SORE_L[k]).join(", "):"no soreness"} · ${W_L[c.where].toLowerCase()}</span><button class="linkbtn" data-ci="edit">Change</button></div>`;
 if(!CI)CI=JSON.parse(JSON.stringify(c));
 const chip=(g,v,l,on)=>`<button class="chip" data-ci="${g}:${v}" aria-pressed="${on}">${l}</button>`;
 return `<div class="checkin"><h3>How are you today?</h3><p class="sub">Three taps. Your tasks adjust to fit.</p>
 <div class="cirow"><span>Energy</span><div class="cchips">${["low","ok","high"].map(v=>chip("energy",v,E_L[v],CI.energy===v)).join("")}</div></div>
 <div class="cirow"><span>Sore</span><div class="cchips">${chip("sore","none","None",!CI.sore.length)}${Object.keys(SORE).map(k=>chip("sore",k,SORE_L[k][0].toUpperCase()+SORE_L[k].slice(1),CI.sore.includes(k))).join("")}</div></div>
 <div class="cirow"><span>Today</span><div class="cchips">${Object.keys(W_L).map(v=>chip("where",v,W_L[v],CI.where===v)).join("")}</div></div>
 <button class="cta" style="width:100%;margin-top:14px" data-ci="apply">Fit my plan</button></div>`;
}
const RC=2*Math.PI*28;
function rings(){return `<div class="rings">${sel().map(pid=>{const P=PATHS[pid],pr=S.prog[pid],max=pr.m>=5,need=NEED[Math.min(pr.m,4)],f=max?1:Math.min(1,pr.xp/need),full=!max&&pr.xp>=need;
 return `<button class="ringi${full?" full":""}" data-ring="${pid}" data-skill="${pid}:${Math.min(pr.m,4)}" style="--c:${P.c}" aria-label="${P.name}: ${max?"mastered":full?"trial ready":Math.round(f*100)+"% to "+P.skills[pr.m].n}"><span class="rw"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="none" stroke="var(--surface2)" stroke-width="5"/><circle class="rp" cx="32" cy="32" r="28" fill="none" stroke="${full?"var(--gold)":P.c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${(f*RC).toFixed(1)} ${RC.toFixed(1)}"/></svg>${medal(pid,"sm")}</span><b>${P.name}</b><small>${max?"Mastered":full?"Trial ready":`${RANKS[Math.min(pr.m,5)][0]} · ${pr.m}/5`}</small></button>`}).join("")}</div>`}
function companionCard(){const t=td(),pid=companionPid(t);if(!pid)return"";const g=CHAR[pid],pp=PEOPLE[g],J=S.journey,trav=J&&J.d===t&&!J.back,C=CHAPTERS[g][trav?J.ch:nextCh(g)];
 const tasks=S.plan.items.filter(x=>x.kind==="task"||x.kind==="anchor"),done=tasks.filter(x=>x.done).length,any=S.days[t]&&S.days[t].a;
 let st,body,btn="";
 if(trav){st="travel";body=`On the way to ${C.dest}. Back tomorrow morning.`}
 else if(any&&S.closed!==t){st="ready";body=`Ready to set out for ${C.dest}. Close your day to send ${HIM(g)} off.`;btn=`<button class="mini pri" data-eve="1">Close my day</button>`}
 else{st="wait";body=`Waiting to travel to ${C.dest}. One task today, and ${HE(g)} can go tonight.`}
 const ret=J&&J.back&&J.ret===t?`<button class="retline" data-chap="${J.g}:${J.ch}">Last night ${PEOPLE[J.g].n} reached ${CHAPTERS[J.g][J.ch].dest}. Watch again</button>`:"";
 return `<div class="comp ${st}" style="--c:${PATHS[pid].c}"><div class="cmain"><span class="cav">${medal(pid)}</span><div class="ctext"><small>Today’s companion · ${pp.n}</small><b>${body}</b><div class="track"><i style="width:${tasks.length?done/tasks.length*100:0}%"></i></div><span class="cmeta">${done} of ${tasks.length} tasks · chapter ${CHAPTERS[g].indexOf(C)+1} of ${CHAPTERS[g].length}</span></div></div>${btn?`<div class="cact">${btn}</div>`:""}${ret}</div>`}
function eveCard(){const t=td(),d=S.days[t];if(S.closed===t)return `<div class="evedone">Day closed${d&&d.mood?` · ${MOODS.find(m=>m[0]===d.mood)[1].toLowerCase()}`:""}${d&&d.note?` · “${esc(d.note)}”`:""}</div>`;
 return `<button class="evecard${new Date().getHours()>=17?" late":""}" data-eve="1"><span class="moon">${ic("moon")}</span><span><b>Close your day</b><small>How it felt, and one line. Your companion sets out tonight.</small></span></button>`}
function todayView(){
 const d=new Date(),h=d.getHours(),hi=h<5?"Still up":h<12?"Good morning":h<17?"Good afternoon":"Good evening";
 const qt=QUOTES[dayNum(td())%QUOTES.length],cal=todayCal(),r=ritu(td());
 const dateStr=d.toLocaleDateString("en-GB",{weekday:"long"})+", "+td().split("-").reverse().join(".");
 const items=S.plan.items,tasks=items.filter(x=>x.kind==="task"||x.kind==="anchor"),mins=items.filter(x=>x.kind==="task").reduce((a,x)=>a+x.m,0);
 const chk=it=>`<button class="check" data-done="${it.id}" aria-label="${it.done?"Undo":"Mark done"}: ${esc(it.t)}">${ic("check")}</button>`,why=it=>it.why?`<span class="why">${it.why}</span>`:"";
 const rows=items.map(it=>{
  if(it.kind==="trial"){const P=PATHS[it.pid],k=it.done?it.k:S.prog[it.pid].m,sn=P.skills[k]?P.skills[k].n:"";return `<div class="task trial" style="--c:${P.c}"><span class="trialicon">${ic(it.done?"check":"trial")}</span><div class="tx"><span class="tag">${P.name} trial · ${it.done?"passed, earned":"unlocks"} ${sn}</span><b>${it.t}</b><small>${it.done?"Well done.":"Do it for real, whenever you’re ready"}</small></div>${it.done?"":`<div class="acts"><button class="mini pri" data-trial="${it.pid}">I passed</button><button class="mini" data-trial-info="${it.pid}">What is this?</button></div>`}</div>`}
  if(it.kind==="bridge"){const s=SYN.find(x=>x.id===it.sid);return `<div class="task${it.done?" done":""}" style="--c:var(--gold)">${chk(it)}<div class="tx"><b>${it.t}</b><small><span class="duo" style="--a:${PATHS[s.p[0]].c};--b:${PATHS[s.p[1]].c}"></span>Bridge · ${s.n} · bonus</small></div></div>`}
  const P=PATHS[it.pid],g=it.done?it.g:Math.round(Math.max(5,it.m)*mult(it.pid));
  if(it.kind==="anchor")return `<div class="task anchor${it.done?" done":""}" style="--c:${P.c}">${chk(it)}<div class="tx"><span class="atag">Your ${DAYS[d.getDay()]} routine</span><b>${it.t}</b><small><span class="dot"></span>${P.name} · ${it.m} min · +${g}</small>${why(it)}</div></div>`;
  const x=poolItem(it),open=OPEN===it.id&&!it.done;
  return `<div class="task${it.done?" done":""}" style="--c:${P.c}">${chk(it)}<button class="tx" data-open="${it.id}" aria-expanded="${open}"><b>${esc(it.t)}</b><small><span class="dot"></span>${P.name} · ${it.m} min · +${g}${it.own?" · your own":""}</small>${it.done?"":why(it)}${it.done?"":`<span class="more">${open?"Hide guide":x&&x.tool?"Guide and "+TOOLNAME[x.tool.type]:"Guide"}</span>`}</button>${it.done?"":`<button class="swap" data-swap="${it.id}" aria-label="Swap this task">${ic("swap")}</button>`}${open?guideView(it):""}</div>`}).join("");
 const tl=TIMES.find(t=>t[0]===S.time)||TIMES[1];
 return header()+tipCard()+`<section class="hero"><div class="wrap">
  <div class="date">${dateStr}</div><h1 class="hello">${hi}${S.name?", "+esc(S.name):""}.</h1>
  <blockquote class="quote">${qt[0]}<cite>${qt[1]}</cite></blockquote>
  <button class="calchip" data-today-cal="1"><span class="dot" style="--c:var(--gold)"></span>${r.n} ritu · ${cal.fest?cal.n:"Story: "+cal.n}</button></div></section>
 <div class="wrap">${rings()}${companionCard()}${(()=>{const n=nudges()[0];return n?nudgeCard(n):""})()}${checkCard()}
  <div class="block" style="margin-top:8px"><div class="thead"><h2>Today’s practice</h2><button class="chip" data-time-cycle="1" aria-label="Time for new tasks: ${tl[1]}. Tap to change">${tl[1]}</button></div><p class="sub">About ${mins} min of new practice${tasks.some(x=>x.kind==="anchor")?" plus your routine":""}. Tap a task for its guide.</p><div class="tasks">${rows}</div><button class="otherbtn" data-other="">+ I did something else</button></div>
  ${eveCard()}
 </div>`;
}
function treeSvg(){
 const L=sel(),C=[200,212],ANG=Object.fromEntries(L.map((p,i)=>[p,-90+i*360/L.length])),pos=(p,j,r)=>{const a=ANG[p]*Math.PI/180,rr=r??(62+j*29);return[C[0]+rr*Math.cos(a),C[1]+rr*Math.sin(a)]};
 let s=`<defs><clipPath id="mc"><circle cx="60" cy="60" r="57"/></clipPath></defs>`;
 SYN.filter(x=>x.p.length===2).forEach(b=>{
  if(!b.p.every(p=>S.paths.includes(p)))return;
  const a1=ANG[b.p[0]],a2=ANG[b.p[1]];let mid=(a1+a2)/2;if(Math.abs(a1-a2)>180)mid+=180;
  const m=[C[0]+112*Math.cos(mid*Math.PI/180),C[1]+112*Math.sin(mid*Math.PI/180)],un=S.syn.includes(b.id);
  b.p.forEach(p=>{const q=pos(p,b.req-1),met=S.prog[p].m>=b.req;s+=`<path d="M${q[0]} ${q[1]} Q${(q[0]+m[0])/2+(C[0]-(q[0]+m[0])/2)*.25} ${(q[1]+m[1])/2+(C[1]-(q[1]+m[1])/2)*.25} ${m[0]} ${m[1]}" fill="none" stroke="${met?PATHS[p].c:"var(--faint)"}" stroke-width="${met?2.5:1.5}" ${met?"":'stroke-dasharray="4 5"'}/>`});
  s+=`<g class="tn" data-syn="${b.id}" tabindex="0" role="button" aria-label="Bridge ${b.n}"><circle cx="${m[0]}" cy="${m[1]}" r="20" fill="transparent"/><rect x="${m[0]-9}" y="${m[1]-9}" width="18" height="18" rx="3" transform="rotate(45 ${m[0]} ${m[1]})" fill="${un?"var(--gold)":"var(--surface)"}" stroke="${un?"var(--gold)":"var(--faint)"}" stroke-width="1.8"/><text x="${m[0]}" y="${m[1]+28}" text-anchor="middle" font-size="12" font-weight="500" fill="${un?"var(--gold)":"var(--mute)"}" stroke="var(--surface)" stroke-width="4" paint-order="stroke" font-family="Inter,sans-serif">${b.n}</text></g>`;
 });
 L.forEach(p=>{
  const on=S.paths.includes(p),P=PATHS[p],pr=S.prog[p],end=pos(p,4);
  s+=`<line x1="${C[0]}" y1="${C[1]}" x2="${end[0]}" y2="${end[1]}" stroke="var(--line)" stroke-width="2" ${on?"":'stroke-dasharray="3 6"'}/>`;
  if(!on){const t=pos(p,0,200);s+=`<text x="${t[0]}" y="${t[1]+4}" text-anchor="middle" font-size="12" fill="var(--faint)" font-family="Inter,sans-serif">${P.name} · not chosen</text>`;return}
  if(pr.m>0){const u=pos(p,Math.min(pr.m,5)-1);s+=`<line x1="${C[0]}" y1="${C[1]}" x2="${u[0]}" y2="${u[1]}" stroke="${P.c}" stroke-width="3.5" stroke-linecap="round"/>`}
  for(let j=0;j<5;j++){const[x,y]=pos(p,j);let n=`<g class="tn pop" style="animation-delay:${(j*.08+L.indexOf(p)*.05).toFixed(2)}s" data-skill="${p}:${j}" tabindex="0" role="button" aria-label="${P.name} skill ${j+1}: ${P.skills[j].n}"><circle cx="${x}" cy="${y}" r="16" fill="transparent"/>`;
   if(j<pr.m)n+=`<circle cx="${x}" cy="${y}" r="11" fill="${P.c}"/><path d="M${x-4} ${y} l3 3 l5 -6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
   else if(j===pr.m){const f=(75.4*Math.min(1,pr.xp/NEED[j])).toFixed(1);n+=`<circle class="pulse" cx="${x}" cy="${y}" r="12" fill="none" stroke="${P.c}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="12" fill="var(--surface)" stroke="var(--line)" stroke-width="3"/><circle cx="${x}" cy="${y}" r="12" fill="none" stroke="${P.c}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${f} 75.4" transform="rotate(-90 ${x} ${y})"/><circle cx="${x}" cy="${y}" r="4" fill="${P.c}"/>`}
   else n+=`<circle cx="${x}" cy="${y}" r="7" fill="var(--surface)" stroke="var(--faint)" stroke-width="1.8"/>`;
   s+=n+`</g>`}
  const t=pos(p,0,198),cos=Math.cos(ANG[p]*Math.PI/180),mp=pos(p,0,228);
  s+=`<g transform="translate(${mp[0]-15} ${mp[1]-15}) scale(.25)"><circle cx="60" cy="60" r="60" fill="var(--surface)" stroke="${P.c}" stroke-width="6"/><g clip-path="url(#mc)">${portraitG(CHAR[p])}</g></g>`;
  s+=`<text x="${t[0]}" y="${t[1]+(ANG[p]<0?-2:14)}" text-anchor="${Math.abs(cos)<.3?"middle":cos>0?"end":"start"}" font-family="Literata,serif" font-weight="600" font-size="16" fill="${P.c}" stroke="var(--surface)" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${P.name}<tspan font-family="Inter,sans-serif" font-weight="400" font-size="12" fill="var(--mute)"> · ${P.hero}</tspan></text>`;
 });
 const sgOn=["body","bonds","music"].every(p=>S.paths.includes(p)),sgUn=S.syn.includes("sangam");
 s+=`<g class="tn" ${sgOn?'data-syn="sangam" tabindex="0" role="button" aria-label="Triveni Sangam"':""}><circle cx="${C[0]}" cy="${C[1]}" r="31" fill="${sgUn?"var(--gold)":"var(--surface)"}" stroke="${sgUn?"var(--gold)":"var(--line)"}" stroke-width="2"/><text x="${C[0]}" y="${C[1]+5}" text-anchor="middle" font-family="Tiro Devanagari Hindi,serif" font-size="16" fill="${sgUn?"var(--surface)":"var(--ink)"}">${RANKS[stage()][1]}</text><text x="${C[0]}" y="${C[1]+19}" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" fill="${sgUn?"var(--surface)":"var(--mute)"}">${msTotal()} trials</text></g>`;
 return `<div class="treebox"><svg class="tree" viewBox="-25 -45 450 500">${s}</svg></div>`;
}
function storiesList(){const L=SYN.filter(x=>x.p.every(p=>S.paths.includes(p)));if(!L.length)return `<p class="sub">Choose two or more paths to unlock stories.</p>`;
 return `<div class="stories">${L.map(x=>{const on=S.syn.includes(x.id);return `<button class="storyc${on?"":" off"}" data-story="${x.id}"><span class="pair">${x.p.map(p=>medal(p,"sm")).join("")}</span><div><b>${x.n}</b><small>${on?"Unlocked · tap to watch":`Opens when ${x.p.map(p=>PATHS[p].name).join(" and ")} pass ${x.req} trials · preview`}</small></div><span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></button>`}).join("")}</div>`}
function journeyView(){const t=td(),r=ritu(t),cal=todayCal(),up=upcoming(4);
 return header()+tipCard()+`<div class="wrap"><h1 class="ptitle1">Journey</h1>
 ${focusSection()}
 <div class="season"><span class="chip2">Season</span><h3>${r.n} ritu<span class="dev">${r.d}</span></h3><p>${r.s}</p></div>
 <button class="calcard" data-today-cal="1"><small class="mute" style="font-size:12px;font-weight:600">${cal.fest?"Today in the Indian calendar":"A story for today"}</small><b>${cal.n}</b><span>Try today: ${cal.t}</span></button>
 <div class="block"><h2>Coming up</h2><div class="upl">${up.map(k=>`<button class="upi" data-fest="${k}"><span class="ud"><b>${+k.slice(8)}</b><small>${MONS[+k.slice(5,7)-1]}</small></span><span><b>${FEST[k].n}</b><small>${inDays(k)}${FEST[k].approx?" · date approximate":""}</small></span></button>`).join("")}</div></div>
 <div class="block"><h2>Yatra log</h2><p class="sub">Each closed day sends your companion one step further</p>${sel().map(pid=>{const g=CHAR[pid],n=CHAPTERS[g].length,k=S.chap[g]||0,got=S.chapters.filter(c=>c.g===g);return `<div class="ylog" style="--c:${PATHS[pid].c}">${medal(pid,"sm")}<div><b>${PEOPLE[g].n}</b><small>${k>=n?`All ${n} chapters done. The road starts again.`:`Next: ${CHAPTERS[g][k%n].dest} · ${Math.min(k,n)} of ${n} done`}</small><div class="ychips">${CHAPTERS[g].map((c,i)=>{const has=got.some(x=>x.ch===i);return `<button class="ych${has?" on":""}" ${has?`data-chap="${g}:${i}"`:"disabled"} aria-label="Chapter ${i+1}: ${c.dest}${has?"":" (locked)"}">${i+1}</button>`}).join("")}</div></div></div>`}).join("")}</div>
 <div class="block"><h2>Skill tree</h2><p class="sub">Tap any node. Bridges open when two paths both pass 2 trials.</p>${treeSvg()}</div>
 <div class="block"><h2>Stories</h2><p class="sub">When two paths meet, their guides’ story unlocks</p>${storiesList()}</div>
 <div class="block soon"><h2>Sangha</h2><p class="sub">Coming later: learn from people walking the same paths, and from their mistakes.</p></div>
 <div style="height:20px"></div></div>`}
function heroView(){
 const st=stage(),n=sel().length,need=(st+1)*n-msTotal(),pct=st>=5?100:Math.round((msTotal()-st*n)/n*100);
 const items=[];sel().forEach(pid=>PATHS[pid].skills.forEach((s,k)=>{if(s.item)items.push({pid,s,k})}));
 const closedDays=Object.values(S.days).filter(x=>x.mood).length,total=sel().reduce((a,p)=>a+CHAPTERS[CHAR[p]].length,0);
 return header()+tipCard()+`<div class="wrap">
 <div class="stage"><button class="avbtn" data-talk="1" aria-label="Tap your hero">${TALK?`<span class="bubble"><small>${TALK[0]} says</small>${TALK[1]}</span>`:""}${avatar(st)}</button><div class="rank">${RANKS[st][0]}<span class="dev">${RANKS[st][1]}</span><small class="rankEn">${EN[RANKS[st][0]]}</small></div>
  <div class="track"><i style="width:${pct}%"></i></div><small>${st>=5?"The highest rank":`${need} more trial${need===1?"":"s"} to ${RANKS[st+1][0]}`}</small></div>
 <div class="block"><div class="stat3"><button class="stat" data-streak="1" style="border:1px solid var(--line)"><b>${S.streak}</b><small>Day streak</small></button><div class="stat"><b>${S.goal}</b><small>Streak goal</small></div><div class="stat"><b>${S.best}</b><small>Best streak</small></div></div></div>
 <div class="block"><h2>Balance</h2><p class="sub">Your strongest path in each realm of life</p>${realmWheel()}</div>
 <div class="block"><h2>Charms</h2><p class="sub">Brought back from your companions’ journeys · ${S.charms.length} of ${total} found</p>${S.charms.length?`<div class="charms">${S.charms.map(c=>`<div class="charm">${charmSvg(c.g,36)}<b>${c.n}</b><small>${PEOPLE[c.g].n}</small></div>`).join("")}</div>`:`<p class="sub">Close your first day to send a companion on a journey.</p>`}</div>
 <div class="block"><h2>Your guides</h2><div class="guides" style="margin-top:12px">${sel().map(pid=>{const c=CHAR[pid],pp=PEOPLE[c];return `<button class="gd" data-person="${c}" style="--c:${PATHS[pid].c}">${medal(pid,"lg")}<b>${pp.n}</b><small>${PATHS[pid].name}</small></button>`}).join("")}</div></div>
 <div class="block"><h2>Arsenal</h2><p class="sub">Gifts from your guides, earned at milestones</p><div class="items">${items.map(({pid,s,k})=>{const on=has(pid,k),P=PATHS[pid];return `<div class="item${on?"":" off"}" style="--c:${P.c}"><i>${ic(on?s.item:"lock")}</i><b>${s.itemName||s.n}</b><small>${on?`${s.item} · ${P.hero}`:`${P.name} trial ${k+1}`}</small></div>`}).join("")}</div></div>
 <div class="block"><h2>Skills</h2>${sel().map(pid=>{const P=PATHS[pid];return `<div class="ptitle" style="--c:${P.c}"><span class="dot"></span>${P.name} with ${P.hero}</div><div class="skills">${P.skills.map((s,k)=>{const on=has(pid,k);return `<button class="skill${on?"":" off"}" style="--c:${P.c}" data-skill="${pid}:${k}"><span class="ic">${on?s.d.slice(0,1):k+1}</span><div><b>${s.n}<span class="dev">${s.d}</span></b><small class="enm">${EN[s.n]||""}</small><small>${on?PERK[s.perk](P.name):`Unlocks after ${P.name} trial ${k+1}`}</small></div></button>`}).join("")}</div>`}).join("")}</div>
 <div class="block"><h2>Record</h2><div class="stats" style="margin-top:12px"><div class="stat"><b>${S.total}</b><small>Total growth</small></div><div class="stat"><b>${msTotal()}</b><small>Trials passed</small></div><div class="stat"><b>${closedDays}</b><small>Days closed</small></div></div></div>
 <div class="block"><h2>Stories and glossary</h2>${glossaryView()}</div>
 <div class="block"><h2>What Abhyasa has learned</h2>${learnedView()}</div>
 <div class="block"><h2>App</h2>${appCard()}</div>
 <div class="links"><button class="mini" data-act="routine">Edit kit and routine</button><button class="mini" data-act="redo">Retake the questionnaire</button><button class="mini" data-act="reset">Reset everything</button></div>
 <p class="sub" style="text-align:center;margin-bottom:30px">Abhyasa ${APP_VERSION}</p></div>`;
}

/* ================= questionnaire ================= */
let Q=null;
const KIT_FOR={gym:"gym",climb:"wall",swim:"pool"};
function newQ(){return{i:S.paths.length?1:0,name:S.name||"",paths:[...S.paths],level:Object.fromEntries(S.paths.map(p=>[p,Math.min(3,S.prog[p].m)])),tags:JSON.parse(JSON.stringify(S.tags||{})),kit:[...(S.kit||[])],anchors:JSON.parse(JSON.stringify(S.anchors||{})),time:S.time||30,goal:S.goal||7,lore:S.lore||""}}
function qSteps(){const st=["welcome","name","paths","lore"];ORDER.filter(p=>Q.paths.includes(p)).forEach(p=>st.push("p:"+p));if(Q.paths.includes("body")||Q.paths.includes("flex"))st.push("kit");st.push("routine","time","goal","reveal");return st}
function quiz(){
 if(!Q)Q=newQ();
 const steps=qSteps();Q.i=Math.min(Q.i,steps.length-1);const step=steps[Q.i],pct=Math.round(Q.i/(steps.length-1)*100);
 if(step==="welcome"){setBg(pageScene());$("#app").innerHTML=`<div class="quiz"><div class="wrap"><div class="welcome"><div class="big">अभ्यास</div><h1>Abhyasa</h1><p>Steady practice over a long time. A few quick questions, then your paths open, starting from where you are today.</p></div><div class="qfoot" style="flex-direction:column"><button class="cta" data-q="next">Start</button><button class="cta alt" data-q="sample">Try a sample profile</button></div></div></div>`;return}
 let body="",foot="";
 if(step==="name"){body=`<h1>What should we call you?</h1><p class="lead">Used only to greet you. You can skip this.</p><input class="name" id="qname" autocomplete="given-name" placeholder="Your first name" value="${esc(Q.name)}">`;foot=`<button class="cta alt" data-q="skip">Skip</button><button class="cta" data-q="next">Continue</button>`}
 else if(step==="paths"){const ok=Q.paths.length>0;body=`<h1>Choose up to 5 things to grow</h1><p class="lead">Pick what matters most in your life right now. Each path has a guide from Indian stories. You can change this any time.</p>
 ${REALMS.map(R=>`<div class="qrealm"><div class="rh"><b>${R.n}</b><span class="dev">${R.d}</span><small>${R.s} · ${R.about}</small></div><div class="opts">${ORDER.filter(p=>PATHS[p].realm===R.id).map(p=>{const P=PATHS[p];return `<button class="opt" data-qpath="${p}" aria-pressed="${Q.paths.includes(p)}" style="--c:${P.c}"><span class="pi">${ic(p)}</span><div><b>${P.name}</b><small>${P.about} · with ${P.hero}</small></div><span class="tick">${ic("check")}</span></button>`}).join("")}${SOON.filter(x=>x[2]===R.id).map(([n,h])=>`<div class="opt" style="opacity:.5"><span class="pi" style="--c:var(--faint)">${ic("calm")}</span><div><b>${n}</b><small>Coming soon · with ${h}</small></div></div>`).join("")}</div></div>`).join("")}`;foot=`<button class="cta" data-q="next" ${ok?"":"disabled"}>${ok?`Continue with ${Q.paths.length} of ${MAXP}`:"Pick at least one"}</button>`}
 else if(step.startsWith("p:")){const pid=step.slice(2),P=PATHS[pid],lv=Q.level[pid],tg=Q.tags[pid]||[],ok=lv!==undefined;
  body=`<div class="sub" style="color:${P.c};font-weight:600;margin:0 0 4px">${P.name}</div><h1>${P.q}</h1><p class="lead">Be honest. Your tasks start here, not where you wish you were.</p>
  <div class="steps">${P.levels.map((l,k)=>`<button class="lvl" style="--c:${P.c}" data-qlvl="${pid}:${k}" aria-pressed="${lv===k}"><span class="bars">${[0,1,2,3].map(b=>`<i class="${b<=k?"on":""}" style="height:${6+b*4.5}px"></i>`).join("")}</span>${l}</button>`).join("")}</div>
  <div class="qlabel">Focus on (pick any)</div><div class="chips" style="--c:${P.c}">${P.tags.map(([k,l])=>`<button class="chip" data-qtag="${pid}:${k}" aria-pressed="${tg.includes(k)}">${l}</button>`).join("")}</div>`;
  foot=`<button class="cta" data-q="next" ${ok?"":"disabled"}>${ok?"Continue":"Pick where you are"}</button>`}
 else if(step==="kit"){body=`<h1>What can you use?</h1><p class="lead">Tasks only suggest what you can really do. Bodyweight tasks need nothing.</p><div class="cchips">${KIT.map(([k,l])=>`<button class="chip" data-qkit="${k}" aria-pressed="${Q.kit.includes(k)}">${l}</button>`).join("")}</div>`;foot=`<button class="cta" data-q="next">Continue</button>`}
 else if(step==="routine"){const acts=ACTS.filter(a=>Q.paths.includes(a.pid));body=`<h1>What do you already do each week?</h1><p class="lead">Tap the days. These count as tasks, and new tasks are planned around them.</p><div class="rtable">${acts.map(a=>`<div class="rrow"><div class="rname"><span class="dot" style="--c:${PATHS[a.pid].c}"></span>${a.n}<small>about ${a.m} min</small></div><div class="rdays">${[1,2,3,4,5,6,0].map(d=>`<button class="day" data-qday="${a.id}:${d}" aria-pressed="${(Q.anchors[a.id]||[]).includes(d)}" aria-label="${a.n} on ${DAYS[d]}">${DAYS[d].slice(0,2)}</button>`).join("")}</div></div>`).join("")}</div>`;foot=`<button class="cta" data-q="next">Continue</button>`}
 else if(step==="time"){body=`<h1>How much time for new practice each day?</h1><p class="lead">On top of your routine. You can change it any day.</p><div class="opts">${[[15,"15 min","A small daily spark"],[30,"30 min","Steady growth"],[45,"45 min","Serious practice"],[75,"60+ min","Deep commitment"]].map(([v,l,d])=>`<button class="opt" data-qtime="${v}" aria-pressed="${Q.time===v}" style="--c:var(--ink)"><div><b>${l}</b><small>${d}</small></div><span class="tick">${ic("check")}</span></button>`).join("")}</div>`;foot=`<button class="cta" data-q="next">Continue</button>`}
 else if(step==="lore"){body=`<h1>How well do you know these stories?</h1><p class="lead">Each path has a guide from Indian stories: the Ramayana, Mahabharata and Puranas. You don’t need to be religious or know them already.</p><div class="opts">${[["well","I know them well","Skip the introductions"],["some","A little","Short intros for each guide"],["new","They’re new to me","Short intros, plus explainers along the way"]].map(([v,l,d])=>`<button class="opt" data-qlore="${v}" aria-pressed="${Q.lore===v}" style="--c:var(--ink)"><div><b>${l}</b><small>${d}</small></div><span class="tick">${ic("check")}</span></button>`).join("")}</div>`;foot=`<button class="cta" data-q="next" ${Q.lore?"":"disabled"}>${Q.lore?"Continue":"Pick one"}</button>`}
 else if(step==="goal"){body=`<div class="flame big" style="margin:0 0 8px">${DIYA}</div><h1>Commit to a daily streak</h1><p class="lead">One task a day keeps your lamp lit. Choosing your own goal makes it easier to keep.</p><div class="opts">${[[7,"7 days","A good start"],[14,"14 days","Getting serious"],[30,"30 days","A real habit"],[50,"50 days","Fully committed"]].map(([v,l,d])=>`<button class="opt" data-qgoal="${v}" aria-pressed="${Q.goal===v}" style="--c:var(--ink)"><div><b>${l}</b><small>${d}</small></div><span class="tick">${ic("check")}</span></button>`).join("")}</div>`;foot=`<button class="cta" data-q="next">Commit to my goal</button>`}
 else if(step==="reveal"){const ps=ORDER.filter(p=>Q.paths.includes(p)),wk=ACTS.filter(a=>ps.includes(a.pid)&&(Q.anchors[a.id]||[]).length).map(a=>`${a.n}: ${[1,2,3,4,5,6,0].filter(d=>Q.anchors[a.id].includes(d)).map(d=>DAYS[d].slice(0,3)).join(", ")}`);
  body=`<div style="width:130px;margin:0 auto">${avatar(0)}</div><h1 style="text-align:center">Your paths are open</h1><p class="lead" style="text-align:center">Daily tasks fill your meters. Each trial earns a skill, and some bring weapons and gifts.</p>
  <div class="reveal">${ps.map(p=>{const P=PATHS[p],k=Q.level[p]||0;return `<div class="rv" style="--c:${P.c}"><span class="pi">${ic(p)}</span><div><b>${P.name} with ${P.hero}</b><small>${k?`Starting at ${RANKS[k][0]}: ${k} skill${k>1?"s":""} already earned`:"Starting at the first step"}</small></div></div>`}).join("")}</div>
  ${wk.length?`<p class="sub" style="margin-top:14px">Your week: ${wk.join(" · ")}</p>`:""}`;
  foot=`<button class="cta" data-q="go">Begin</button>`}
 $("#app").innerHTML=`<div class="quiz"><div class="wrap"><div class="qtop"><button class="back" data-q="back" aria-label="Back">${ic("back")}</button><div class="prog"><i style="width:${pct}%"></i></div></div><div class="qbody">${body}</div><div class="qfoot">${foot}</div></div></div>`;
 const inp=$("#qname");if(inp)inp.addEventListener("input",e=>Q.name=e.target.value);
 setBg(pageScene());lastView="quiz"+Q.i;const app=$("#app");app.classList.remove("enter");void app.offsetWidth;app.classList.add("enter");
}
function finishQuiz(){
 const redo=S.paths.length>0;
 S.name=Q.name.trim().slice(0,30);S.paths=ORDER.filter(p=>Q.paths.includes(p));S.tags=Q.tags;S.time=Q.time;S.kit=Q.kit;S.anchors=Q.anchors;S.goal=Q.goal||7;S.lore=Q.lore||"some";const before=[...S.intro];
 S.paths.forEach(p=>{const k=Q.level[p]||0;if(S.prog[p].m<k)S.prog[p]={m:k,xp:0}});
 S.syn=S.syn.filter(id=>SYN.find(s=>s.id===id).p.every(p=>S.paths.includes(p)));
 SYN.forEach(s=>{if(!S.syn.includes(s.id)&&s.p.every(p=>S.paths.includes(p)&&S.prog[p].m>=s.req))S.syn.push(s.id)});
 S.seen=Math.max(S.seen,stage());S.on=true;S.view="today";S.plan={d:td(),items:S.plan.d===td()?S.plan.items.filter(x=>x.done):[],swaps:0,closed:false};S.plan.items=buildPlan(S.plan.items);if(!redo)S.deck=td();Q=null;save();render();if(wantIntros())setTimeout(()=>playIntro(sel()),400);window.scrollTo(0,0);
 toast(redo?"Your plan is updated":"Your first tasks are ready");
 try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
}
function loadSample(){
 S=fresh();Object.assign(S,{paths:["body","bonds","music"],tags:{body:["strength","climb","swim"],bonds:["parents","abroad","roots"],music:["guitar"]},kit:["gym","pool","wall","park","bands","mat"],anchors:{gym:[1,4],climb:[3],swim:[6],family:[0]},time:45,goal:7});
 for(let i=4;i>=1;i--){S.days[addD(td(),-i)]={a:1,mood:["good","okay","bright","good"][i-1]}}S.streak=4;S.best=6;S.last=yday();
 S.chap={hanuman:4,rama:2,narada:1};S.chapters=[{g:"hanuman",ch:0},{g:"hanuman",ch:1},{g:"rama",ch:0},{g:"hanuman",ch:2},{g:"narada",ch:0},{g:"rama",ch:1},{g:"hanuman",ch:3}];
 S.charms=S.chapters.map(c=>({n:CHAPTERS[c.g][c.ch].charm[0],g:c.g}));
 for(let i=1;i<=14;i++)S.hist[addD(td(),-i)]={body:[2,2],bonds:[1,1],music:[1,i%5?1:0]};S.journey={d:yday(),g:"hanuman",ch:4,back:false};
 S.prog.body={m:2,xp:60};S.prog.bonds={m:2,xp:30};S.prog.music={m:1,xp:40};S.syn=[];
 SYN.forEach(s=>{if(s.p.every(p=>S.prog[p].m>=s.req))S.syn.push(s.id)});
 S.seen=stage();S.on=true;Q=null;save();render();window.scrollTo(0,0);toast("Sample profile loaded. Edit it from your hero page.");
}

/* ================= sheets ================= */
function sheet(c,h){openLayer(`<div class="scrim" data-close="1"><div class="sheet" style="--c:${c}" role="dialog" aria-modal="true">${h}</div></div>`)}
function skillSheet(pid,k){const P=PATHS[pid],s=P.skills[k],on=has(pid,k),pr=S.prog[pid];
 sheet(P.c,`<div class="kick">${P.name} with ${P.hero} · skill ${k+1} of 5</div><h2>${s.n}<span class="dev">${s.d}</span></h2>${enLine(s.n)}<p class="story">${s.s}</p>
 <div class="box"><small>Effect</small>${PERK[s.perk](P.name)}${s.item?`<small style="margin-top:6px">Gift</small>${s.itemName||s.n} (${s.item.toLowerCase()})`:""}</div>
 <div class="box"><small>Trial to earn it</small>${trialFor(pid,k)}</div>
 <div class="box">${on?"Earned.":k===pr.m?`In progress: ${Math.min(pr.xp,NEED[k])} of ${NEED[k]} growth.`:"Locked."}</div>
 <button class="cta" style="width:100%" data-close="1">Close</button>`)}
function synSheet(id){const s=SYN.find(x=>x.id===id),un=S.syn.includes(id);
 sheet("var(--gold)",`<div class="kick">Bridge · ${s.p.map(p=>PATHS[p].name).join(" + ")}</div><h2>${s.n}<span class="dev">${s.d}</span></h2>${enLine(s.n)}<p class="story">${s.s}</p>
 <div class="box"><small>Opens when</small>${s.p.map(p=>`${PATHS[p].name}: ${Math.min(S.prog[p].m,s.req)} of ${s.req} trials`).join("<br>")}</div>
 <div class="box"><small>Effect</small>+10% growth on ${s.p.map(p=>PATHS[p].name).join(" and ")}, plus a daily bridge task: ${s.q.toLowerCase()}</div>
 <div class="box">${un?"Open.":"Locked."}</div><div class="row"><button class="cta alt" data-close="1">Close</button><button class="cta" data-story="${id}">${un?"Watch the story":"Preview the story"}</button></div>`)}
function trialSheet(pid,confirm){const P=PATHS[pid],k=S.prog[pid].m,s=P.skills[k];
 sheet(P.c,confirm?`<div class="kick">Confirm</div><h2>Did you pass?</h2><div class="box">${trialText(pid)}</div><p class="mute">This unlocks ${s.n}${EN[s.n]?` (${EN[s.n].toLowerCase()})`:""} and cannot be undone. Only you know if it’s true.</p><div class="row"><button class="cta alt" data-close="1">Not yet</button><button class="cta" data-pass="${pid}">Yes, I passed</button></div>`
 :`<div class="kick">${P.name} trial ${k+1}</div><h2>${s.n}<span class="dev">${s.d}</span></h2>${enLine(s.n)}<p class="story">${s.s}</p><div class="box"><small>The test</small>${trialText(pid)}</div><p class="mute">Your meter is full, so you’re ready. Do this in real life, then mark it here. Daily tasks still add growth while you prepare.</p><button class="cta" style="width:100%" data-close="1">Got it</button>`)}


/* ================= app shell: install, backup, updates ================= */
let DPROMPT=null;
const isStandalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();DPROMPT=e;if(S.on&&S.view==="hero")render()});
window.addEventListener("appinstalled",()=>{DPROMPT=null;toast("Abhyasa is installed");if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()});
function appCard(){
 const inst=isStandalone()?`<div class="box"><small>Installed</small>You are using Abhyasa as an app.</div>`
  :DPROMPT?`<button class="cta" style="width:100%;margin-bottom:10px" data-act="install">Install Abhyasa</button>`
  :isIOS()?`<div class="box"><small>Install on iPhone</small>Tap the Share button in Safari, then “Add to Home Screen”.</div>`
  :`<div class="box"><small>Install</small>Open your browser menu and choose “Install app” or “Add to Home screen”.</div>`;
 return `${inst}<div class="box"><small>Your data</small>Progress is saved on this device only. Make a backup before changing phones or clearing your browser.</div>
 <div class="row" style="margin-bottom:6px"><button class="cta alt" data-act="export">Save a backup</button><button class="cta alt" data-act="import">Restore a backup</button></div>
 <input type="file" id="importf" accept="application/json,.json" hidden>`;
}
function exportData(){try{const blob=new Blob([JSON.stringify({app:"abhyasa",version:APP_VERSION,date:td(),state:S},null,1)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`abhyasa-backup-${td()}.json`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);toast("Backup saved to your downloads")}catch(e){toast("Couldn’t save the backup on this device")}}
let PENDING=null;
function importFile(f){const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);if(o.app!=="abhyasa"||!o.state||!o.state.prog)throw 0;PENDING=o;
 sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Restore</div><h2>Replace your progress?</h2><p class="sub">This backup is from ${String(o.date||"").split("-").reverse().join(".")} (version ${esc(o.version||"?")}). Your current progress on this device will be replaced.</p><div class="row"><button class="cta alt" data-close="1">Cancel</button><button class="cta" data-act="import-ok">Restore</button></div>`)}catch(e){toast("That file isn’t an Abhyasa backup")}};r.readAsText(f)}
function showUpdate(reg){if($("#upd"))return;document.body.insertAdjacentHTML("beforeend",`<div id="upd" class="upd" role="status"><span>A new version of Abhyasa is ready.</span><button class="mini pri" id="updbtn">Update</button></div>`);$("#updbtn").onclick=()=>{if(reg.waiting)reg.waiting.postMessage("skip-waiting");else location.reload()}}
if("serviceWorker" in navigator&&/^https?:$/.test(location.protocol)){
 window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").then(reg=>{
  if(reg.waiting&&navigator.serviceWorker.controller)showUpdate(reg);
  reg.addEventListener("updatefound",()=>{const nw=reg.installing;if(nw)nw.addEventListener("statechange",()=>{if(nw.state==="installed"&&navigator.serviceWorker.controller)showUpdate(reg)})});
  setInterval(()=>reg.update(),60*60*1000);
 }).catch(()=>{})});
 let reloading=false;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(reloading)return;reloading=true;location.reload()});
}
document.addEventListener("change",e=>{if(e.target.id==="importf"&&e.target.files[0])importFile(e.target.files[0])});

/* ================= lock zoom (iOS ignores user-scalable=no in Safari) ================= */
["gesturestart","gesturechange","gestureend"].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));
document.addEventListener("touchmove",e=>{if(e.touches&&e.touches.length>1)e.preventDefault()},{passive:false});
let lastTouchEnd=0;document.addEventListener("touchend",e=>{const n=Date.now();if(n-lastTouchEnd<300&&!e.target.closest("input,textarea"))e.preventDefault();lastTouchEnd=n},{passive:false});

/* ================= events ================= */
let resetArm=0;
document.addEventListener("click",e=>{
 const t=e.target.closest("[data-qlore],[data-intro],[data-tip],[data-tips-off],[data-lore],[data-why],[data-other],[data-oth],[data-oth-go],[data-unnever],[data-uncustom],[data-pathsheet],[data-path-add],[data-path-pause],[data-nudge-act],[data-nudge-x],[data-pnext],[data-pprev],[data-streak],[data-goal],[data-eve],[data-mood],[data-eve-close],[data-chap],[data-today-cal],[data-fest],[data-time-cycle],[data-qgoal],[data-ring],[data-story],[data-snext],[data-sprev],[data-guide-next],[data-person],[data-talk],[data-close],[data-view],[data-time],[data-done],[data-swap],[data-open],[data-ci],[data-tgo],[data-treset],[data-tadj],[data-ttap],[data-trial],[data-trial-info],[data-pass],[data-skill],[data-syn],[data-tree-open],[data-act],[data-q],[data-qpath],[data-qlvl],[data-qtag],[data-qtime],[data-qkit],[data-qday]");
 if(!t)return;const d=t.dataset;
 if(d.close!==undefined){if(t.classList.contains("scrim")&&e.target!==t)return;closeLayer();return}
 if(d.view){stopTool();OPEN=null;S.view=d.view;render();window.scrollTo(0,0);return}
 if(d.treeOpen){stopTool();OPEN=null;S.view="journey";render();window.scrollTo(0,0);return}
 if(d.time){setTime(+d.time);return}
 if(d.done){complete(d.done,e);return}
 if(d.qlore){Q.lore=d.qlore;quiz();return}
 if(d.intro){closeLayer();S.intro=S.intro.filter(g=>g!==CHAR[d.intro]);playIntro([d.intro]);return}
 if(d.tip){S.tips.push(d.tip);save();render();return}
 if(d.tipsOff){Object.keys(TIPS).forEach(v=>TIPS[v].forEach(t=>{const k=v+":"+t[0];if(!S.tips.includes(k))S.tips.push(k)}));save();render();toast("Tips off");return}
 if(d.lore){S.lore=d.lore;save();render();return}
 if(d.swap){swapSheet(d.swap);return}
 if(d.why){const[i,w]=d.why.split(":");swap(i,w);return}
 if(d.other!==undefined){OTH=null;otherSheet(d.other);return}
 if(d.oth){const[k,v]=d.oth.split(":");const n=$("#othname");if(n)OTH.t=n.value;if(k==="pid")OTH.pid=v;if(k==="m")OTH.m=+v;if(k==="save")OTH.save=!OTH.save;otherSheet(OTH.r);return}
 if(d.othGo){const n=$("#othname");if(n)OTH.t=n.value;logOther(e);return}
 if(d.unnever){if(S.learn[d.unnever])S.learn[d.unnever].never=false;save();render();toast("It can be suggested again");return}
 if(d.uncustom){const[p,i]=d.uncustom.split(":");(S.custom[p]||[]).splice(+i,1);injectCustom();save();render();toast("Removed");return}
 if(d.open){if(OPEN===d.open){OPEN=null;if(TOOL&&TOOL.id===d.open)stopTool()}else{if(TOOL&&TOOL.id!==d.open)stopTool();OPEN=d.open}render();return}
 if(d.tgo){toolGo(d.tgo);return}
 if(d.treset){toolReset(d.treset);return}
 if(d.tadj){const[i,v]=d.tadj.split(":");toolAdj(i,+v);return}
 if(d.ttap){toolTap(d.ttap);return}
 if(d.ci){const v=d.ci;
  if(v==="edit"){CIedit=true;CI=null;render();return}
  if(v==="apply"){S.check=Object.assign({},CI,{d:td()});CIedit=false;CI=null;replan("Plan fitted to how you are today");return}
  const[g,x]=v.split(":");if(g==="sore"){if(x==="none")CI.sore=[];else{const i=CI.sore.indexOf(x);i<0?CI.sore.push(x):CI.sore.splice(i,1)}}else CI[g]=x;render();return}
 if(d.pathsheet){pathSheet(d.pathsheet);return}
 if(d.pathAdd){const[p,k]=d.pathAdd.split(":");addPath(p,+k);return}
 if(d.pathPause){pausePath(d.pathPause);return}
 if(d.nudgeAct){const[p,a]=d.nudgeAct.split(":");if(a==="pause")pausePath(p);else pathSheet(p);return}
 if(d.nudgeX){S.dismiss[d.nudgeX]=td();save();render();return}
 if(d.pnext){if(PL&&PL.swiped){PL.swiped=false;return}if(PL)showCard(PL.i+1);return}
 if(d.pprev){if(PL)showCard(PL.i-1);return}
 if(d.streak){streakSheet();return}
 if(d.goal){S.goal=+d.goal;save();closeLayer();render();toast(`New goal: ${S.goal} days`);return}
 if(d.eve){eveSheet();return}
 if(d.mood){EV=EV||{mood:null,note:""};const n=$("#evenote");if(n)EV.note=n.value;EV.mood=d.mood;eveSheet();return}
 if(d.eveClose){if(EV&&EV.mood){const n=$("#evenote");if(n)EV.note=n.value;eveClose()}return}
 if(d.chap){const[g,c]=d.chap.split(":");playChapter(g,+c);return}
 if(d.todayCal!==undefined){calSheet();return}
 if(d.fest){calSheet(d.fest);return}
 if(d.timeCycle){const i=TIMES.findIndex(t=>t[0]===S.time);setTime(TIMES[(i+1)%TIMES.length][0]);return}
 if(d.qgoal){Q.goal=+d.qgoal;quiz();return}
 if(d.story){const sc=$(".scrim");if(sc)sc.remove();playStory(d.story);return}
 if(d.guideNext){GI++;GANIM=true;render();return}
 if(d.person){const c=PEOPLE[d.person],P=PATHS[c.pid],I=GUIDE_INTRO[d.person];sheet(P.c,`<div style="display:flex;gap:14px;align-items:center">${medal(c.pid,"lg")}<div><div class="kick">${P.name} guide</div><h2>${c.n}<span class="dev">${c.d}</span></h2></div></div><p class="story">${c.bio}</p><div class="box"><small>Says today</small>“${GUIDE_LINES[c.pid][doyNow()%5]}”</div><div class="row"><button class="cta alt" data-close="1">Close</button><button class="cta" data-intro="${c.pid}">Watch intro</button></div>`);return}
 if(d.talk){const ps=sel();if(!ps.length)return;const pid=ps[Math.floor(Math.random()*ps.length)],L=GUIDE_LINES[pid];TALK=[PATHS[pid].hero,L[Math.floor(Math.random()*L.length)]];render();clearTimeout(window._tk);window._tk=setTimeout(()=>{TALK=null;if(S.view==="hero")render()},4500);return}
 if(d.trial){trialSheet(d.trial,true);return}
 if(d.trialInfo){trialSheet(d.trialInfo,false);return}
 if(d.pass){passTrial(d.pass);return}
 if(d.skill){const[p,k]=d.skill.split(":");skillSheet(p,+k);return}
 if(d.syn){synSheet(d.syn);return}
 if(d.act==="install"){if(DPROMPT){DPROMPT.prompt();DPROMPT.userChoice.finally(()=>{DPROMPT=null;render()})}return}
 if(d.act==="export"){exportData();return}
 if(d.act==="import"){const f=$("#importf");if(f){f.value="";f.click()}return}
 if(d.act==="import-ok"){if(PENDING){stopTool();S=migrate(Object.assign(fresh(),PENDING.state));PENDING=null;save();closeLayer();render();toast("Backup restored")}return}
 if(d.act==="redo"){stopTool();S.on=false;Q=null;quiz();window.scrollTo(0,0);return}
 if(d.act==="routine"){stopTool();S.on=false;Q=newQ();Q.i=qSteps().indexOf(Q.paths.includes("body")||Q.paths.includes("flex")?"kit":"routine");quiz();window.scrollTo(0,0);return}
 if(d.act==="reset"){if(!resetArm){resetArm=1;t.textContent="Tap again to erase everything";setTimeout(()=>{resetArm=0;if(t.isConnected)t.textContent="Reset everything"},3000);return}stopTool();S=fresh();Q=null;save();render();return}
 if(d.q){const n=qSteps().length;
  if(d.q==="sample"){loadSample();return}
  if(d.q==="next"||d.q==="skip"){if(d.q==="skip")Q.name="";Q.i=Math.min(n-1,Q.i+1)}
  else if(d.q==="back"){if(Q.i<=1&&S.paths.length){S.on=true;Q=null;render();return}Q.i=Math.max(0,Q.i-1)}
  else if(d.q==="go"){finishQuiz();return}
  quiz();window.scrollTo(0,0);return}
 if(d.qpath){const i=Q.paths.indexOf(d.qpath);if(i<0){if(Q.paths.length>=MAXP){toast(`Choose up to ${MAXP}. Untick one first.`);return}Q.paths.push(d.qpath)}else Q.paths.splice(i,1);quiz();return}
 if(d.qlvl){const[p,k]=d.qlvl.split(":");Q.level[p]=+k;quiz();return}
 if(d.qtag){const[p,k]=d.qtag.split(":");const a=Q.tags[p]=Q.tags[p]||[];const i=a.indexOf(k);i<0?a.push(k):a.splice(i,1);quiz();return}
 if(d.qtime){Q.time=+d.qtime;quiz();return}
 if(d.qkit){const i=Q.kit.indexOf(d.qkit);i<0?Q.kit.push(d.qkit):Q.kit.splice(i,1);quiz();return}
 if(d.qday){const[a,x]=d.qday.split(":");const arr=Q.anchors[a]=Q.anchors[a]||[],dd=+x,i=arr.indexOf(dd);if(i<0){arr.push(dd);if(KIT_FOR[a]&&!Q.kit.includes(KIT_FOR[a]))Q.kit.push(KIT_FOR[a])}else arr.splice(i,1);quiz();return}
});
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"&&$(".scrim"))closeLayer();
 if((e.key==="Enter"||e.key===" ")&&e.target.matches&&e.target.matches("g.tn")){e.preventDefault();e.target.dispatchEvent(new MouseEvent("click",{bubbles:true}))}
 if(e.key==="Enter"&&e.target.id==="qname"){Q.i++;quiz()}
});
window.addEventListener("focus",()=>{if(S.on&&S.plan.d!==td())render()});
render();
