/* Abhyasa app logic. Content lives in js/content.js. */
const APP_VERSION="1.8.0";   // bump with tools/bump_version.py for every release
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
const fresh=()=>({v:SCHEMA,on:false,name:"",paths:[],tags:{},kit:[],anchors:{},goal:7,days:{},journey:null,chap:{},chapters:[],charms:[],deck:"",closed:"",tick:"",check:{d:"",energy:"ok",sore:[],where:"normal"},log:[],time:30,prog:Object.fromEntries(ORDER.map(p=>[p,{m:0,xp:0}])),hist:{},dismiss:{},learn:{},lore:"",intro:[],tips:[],learned:[],reviews:{},wfocus:{w:"",pid:""},seg:{},custom:{},dayCtx:{d:""},plan:{d:"",items:[],swaps:0,closed:false},view:"today",streak:0,best:0,last:"",shieldUsed:{w:"",n:0},seen:0,total:0,syn:[]});
let S;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!S.prog)S=fresh();else S=migrate(Object.assign(fresh(),S));
try{injectCustom()}catch(e){}
function migrate(o){
 // Add one step per schema change, e.g. if(o.v<2){ ...convert...; o.v=2 }
 if((o.v||1)<2){ORDER.forEach(p=>{if(!o.prog[p])o.prog[p]={m:0,xp:0}});o.hist=o.hist||{};o.dismiss=o.dismiss||{};if(o.paths.length>5)o.paths=o.paths.slice(0,5)}
 ORDER.forEach(p=>{if(!o.prog[p])o.prog[p]={m:0,xp:0}});
 o.learn=o.learn||{};o.learned=o.learned||[];o.reviews=o.reviews||{};o.wfocus=o.wfocus||{w:"",pid:""};o.intro=o.intro||[];o.tips=o.tips||[];o.lore=o.lore||"";o.custom=o.custom||{};o.dayCtx=o.dayCtx||{d:""};
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
 const used=items.filter(x=>x.kind==="task").reduce((a,x)=>a+x.m,0),rem=Math.max(0,S.time-used),wf=focusPid(),wsum=ps.reduce((a,p)=>a+(p===wf?1.6:1),0);
 ps.forEach(pid=>{
  const pr=S.prog[pid];
  if(pr.m<5&&pr.xp>=NEED[pr.m]&&!items.some(x=>x.kind==="trial"&&x.pid===pid&&!x.done))items.push({id:uid(),kind:"trial",pid,t:trialText(pid),m:0,done:false});
  const hasA=items.some(x=>x.kind==="anchor"&&x.pid===pid),share=rem*(pid===wf?1.6:1)/wsum,cap=hasA?Math.min(15,share):share,maxN=hasA?1:2;
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
function closeLayer(){const s=$(".scrim");if(s){if(s.querySelector(".tool"))stopTool();s.remove()}if(PL){clearTimeout(PL.t);const dk=PL.deck,af=PL.after;PL=null;if(dk){S.deck=td();save();render()}if(af){af();return}}if(queue.length)nextModal()}

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
 if(it.pid&&PATHS[it.pid])TANIM={pid:it.pid,f:todayFrac(it.pid)};it.done=true;activity();if(it.kind==="task"){const L=L_(it.t);L.dn++;L.dw[new Date().getDay()]++}burst(ev,it.kind==="bridge"?"var(--gold)":PATHS[it.pid].c);
 S.log.push({id:it.id,d:td(),t:it.t,load:it.load||[],pid:it.pid||"bridge",m:it.m||0,own:!!it.own});S.log=S.log.filter(l=>diff(l.d,td())<=60);
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


/* ================= weekly review ================= */
const monOf=d=>addD(d,-((new Date(d+"T12:00:00").getDay()+6)%7));
function focusPid(){const f=S.wfocus;return f&&f.w===monOf(td())&&S.paths.includes(f.pid)?f.pid:""}
const logMin=l=>{if(l.m)return l.m;const P=PATHS[l.pid];const x=P&&P.pool.find(y=>y.t===l.t);if(x)return x.m;const a=ACTS.find(y=>y.n===l.t);return a?a.m:10};
function weekStats(mon){const days=Array.from({length:7},(_,i)=>addD(mon,i)),by={},per=days.map(()=>0),own=[];let tot=0;
 S.log.filter(l=>days.includes(l.d)&&l.pid!=="bridge").forEach(l=>{const m=logMin(l);by[l.pid]=(by[l.pid]||0)+m;per[days.indexOf(l.d)]+=m;tot+=m;if(l.own&&!own.some(o=>o.t===l.t))own.push({t:l.t,pid:l.pid})});
 const act=days.filter(d=>S.days[d]&&S.days[d].a).length,best=per.indexOf(Math.max(...per));
 return{mon,days,by,per,tot,act,best:per[best]?best:-1,own,moods:days.map(d=>S.days[d]&&S.days[d].mood)}}
function reviewWeek(){const t=td(),dow=new Date(t+"T12:00:00").getDay(),thisMon=monOf(t),lastMon=addD(thisMon,-7);
 if(dow===0)return S.reviews[thisMon]&&S.reviews[thisMon].done?"":thisMon;
 if((dow===1||dow===2)&&!(S.reviews[lastMon]&&S.reviews[lastMon].done)&&S.log.some(l=>l.d>=lastMon&&l.d<thisMon))return lastMon;return""}
const rng7=mon=>`${mon.slice(8)}.${mon.slice(5,7)} – ${addD(mon,6).slice(8)}.${addD(mon,6).slice(5,7)}`;
function reviewCard(){const w=reviewWeek();if(!w)return"";const W=weekStats(w);
 return `<button class="revcard" data-review="${w}"><span class="revi">${ic("path")}</span><span><b>Your week in review</b><small>${rng7(w)} · ${W.act} active days · ${W.tot} min. Two minutes, five cards.</small></span></button>`}
function guideComment(W){const n=W.act;return n>=5?"Five days or more. This is what steady practice looks like.":n>=3?"A steady week. Next week, try adding one more day.":n>=1?"Some weeks are harder. Showing up at all keeps the lamp lit.":"A quiet week. Start small tomorrow: one task is enough."}
let RV=null;
function playReview(mon){const W=weekStats(mon),ps=sel(),top=Object.keys(W.by).sort((a,b)=>W.by[b]-W.by[a])[0]||ps[0]||companionPid(td()),L=["Mo","Tu","We","Th","Fr","Sa","Su"],nextMon=addD(mon,7)>td()?addD(mon,7):monOf(td());
 const prev=weekStats(addD(mon,-7));RV={mon,worth:Object.assign({},(S.reviews[mon]||{}).worth||{}),focus:(S.wfocus.w===nextMon&&S.wfocus.pid)||top,nextMon};
 const max=Math.max(1,...ps.map(p=>W.by[p]||0));
 const moods=`<div class="week">${W.days.map((d,i)=>{const m=W.moods[i],a=S.days[d]&&S.days[d].a;return `<span class="wd${a?" done":d>td()?" future":" miss"}"><i>${m?`<span class="mdot m-${m}" style="width:18px;height:18px"></span>`:a?DIYA:""}</i><small>${L[i]}</small></span>`}).join("")}</div>`;
 const diffTxt=prev.tot?(W.tot>=prev.tot?`${W.tot-prev.tot} min more than the week before.`:`${prev.tot-W.tot} min less than the week before.`):"Your first full week.";
 const cards=[
  {kick:`Week of ${rng7(mon)}`,html:`<div class="rv-big"><div><b>${W.act}</b><small>of 7 days active</small></div><div><b>${W.tot}</b><small>minutes of practice</small></div></div>${moods}<p class="sub" style="text-align:center">Dots show how each day felt when you closed it.</p>`,cap:diffTxt},
  {kick:"Where your time went",html:`<div class="rvbars">${ps.map(p=>{const v=W.by[p]||0;return `<div class="rvb" style="--c:${PATHS[p].c}"><span>${PATHS[p].name}</span><i><b style="width:${v/max*100}%"></b></i><em>${v} min</em></div>`}).join("")}</div>`,cap:ps.filter(p=>!W.by[p]).length?`Nothing on ${ps.filter(p=>!W.by[p]).map(p=>PATHS[p].name).join(" and ")} this week.`:"Every path got some time this week."},
  {kick:"Best day and a word from your guide",html:`<div class="dk-start"><div style="display:flex;justify-content:center">${medal(top,"lg")}</div><p class="gq">“${guideComment(W)}”</p><small class="mute">${PATHS[top].hero}</small></div>`,cap:W.best>=0?`Your best day was <b>${DAYS[new Date(W.days[W.best]+"T12:00:00").getDay()]}</b>, with ${W.per[W.best]} min.`:"No practice logged yet this week."}];
 if(W.own.length)cards.push({kick:"Your own tasks",html:`<p class="sub">Was each one worth your time? “No” means Abhyasa won’t suggest it again.</p><div class="worthl">${W.own.map((o,i)=>`<div class="worth"><span><b>${esc(o.t)}</b><small>${PATHS[o.pid]?PATHS[o.pid].name:""}</small></span><span class="wbtn"><button class="mini" data-worth="${i}:1" aria-pressed="${RV.worth[o.t]===1}">Yes</button><button class="mini" data-worth="${i}:0" aria-pressed="${RV.worth[o.t]===0}">No</button></span></div>`).join("")}</div>`,cap:""});
 cards.push({kick:"Next week’s focus",html:`<p class="sub">Pick one path to lean into. It gets more of your daily time next week.</p><div class="cchips" id="rvfocus">${ps.map(p=>`<button class="chip" data-rvfocus="${p}" aria-pressed="${RV.focus===p}">${PATHS[p].name}</button>`).join("")}</div><button class="cta" style="width:100%;margin-top:16px" data-rvdone="1">Finish review</button>`,cap:""});
 RV.own=W.own;openPlayer({label:"Weekly review",title:"Your week",sub:rng7(mon),cast:[top],cards,auto:false});
 const nx=$('.story .row [data-pnext]');if(nx)nx.dataset.rv="1";
}
function finishReview(){const r=RV;if(!r)return;
 r.own.forEach(o=>{const v=r.worth[o.t];if(v===0){const L=L_(o.t);L.never=true;if(S.custom[o.pid])S.custom[o.pid]=S.custom[o.pid].filter(c=>c.t!==o.t)}});injectCustom();
 const W=weekStats(r.mon);S.reviews[r.mon]={done:true,act:W.act,tot:W.tot,by:W.by,worth:r.worth,focus:r.focus};
 S.wfocus={w:r.nextMon,pid:r.focus};const k=Object.keys(S.reviews).sort();while(k.length>12)delete S.reviews[k.shift()];
 RV=null;closeLayer();replan();toast(`Review saved. ${PATHS[r.focus].name} is your focus for the week.`)}
function reviewHistory(){const k=Object.keys(S.reviews).filter(w=>S.reviews[w].done).sort().reverse().slice(0,4),cur=monOf(td()),W=weekStats(cur);
 return `<button class="revcard" data-review="${cur}"><span class="revi">${ic("path")}</span><span><b>This week so far</b><small>${W.act} active days · ${W.tot} min. Tap to review now.</small></span></button>
 ${k.length?k.map(w=>{const R=S.reviews[w];return `<div class="lrow"><span><b>${rng7(w)}</b><small>${R.act} days · ${R.tot} min${R.focus&&PATHS[R.focus]?` · then focused on ${PATHS[R.focus].name}`:""}</small></span></div>`}).join(""):`<p class="sub">Past reviews appear here.</p>`}`}


/* ================= focus mode ================= */
let FM=null,FMT=null,WL=null;
async function wakeOn(){try{if("wakeLock" in navigator){WL=await navigator.wakeLock.request("screen")}}catch(e){WL=null}}
function wakeOff(){try{WL&&WL.release()}catch(e){}WL=null}
document.addEventListener("visibilitychange",()=>{if(FM&&FM.running&&document.visibilityState==="visible")wakeOn()});
function focusStart(id){const it=S.plan.items.find(x=>x.id===id);if(!it||it.done)return;const x=poolItem(it),P=PATHS[it.pid];closeLayer();stopTool();
 const steps=x?x.g:[it.kind==="anchor"?"Do your routine session":"Do your task","Notice how it feels","Finish calmly"];
 FM={id,total:Math.max(60,it.m*60),acc:0,t0:Date.now(),running:true,steps,ck:steps.map(()=>false),line:0,over:false};
 const tool=x&&x.tool&&x.tool.type!=="timer"?toolView(it):"",C=2*Math.PI*92;
 const host=document.createElement("div");host.id="fm";host.style.setProperty("--c",P.c);host.setAttribute("role","dialog");host.setAttribute("aria-label","Focus mode: "+it.t);
 host.innerHTML=`<div class="fm-top"><button class="ex-b" data-fm="close" aria-label="Leave focus mode">×</button><span class="fm-k">${P.name} · with ${P.hero}</span><span class="fm-sp"></span></div>
 <div class="fm-body"><div class="fm-ring"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" stroke-opacity=".15" stroke-width="8"/><circle id="fmarc" cx="100" cy="100" r="92" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-dasharray="0 ${C.toFixed(1)}" transform="rotate(-90 100 100)"/></svg><span class="fm-face">${portrait(CHAR[it.pid])}</span></div>
 <div class="fm-time" id="fmtime">${fmtT(FM.total*1000)}</div><div class="fm-sub" id="fmsub">remaining</div>
 <h2 class="fm-t">${esc(it.t)}</h2><p class="fm-line" id="fmline">“${GUIDE_LINES[it.pid][0]}”</p>
 <ol class="fm-steps" id="fmsteps">${steps.map((g,i)=>`<li><button data-fm="step|${i}"><span class="fck">${ic("check")}</span><span>${g}</span></button></li>`).join("")}</ol>${tool}</div>
 <div class="fm-bar" id="fmbar"></div>`;
 document.body.appendChild(host);document.documentElement.classList.add("exlock");paint();fmBar();fmPaint();wakeOn();clearInterval(FMT);FMT=setInterval(fmTick,250)}
const fmLeft=()=>FM.total*1000-(FM.acc+(FM.running?Date.now()-FM.t0:0));
function fmTick(){if(!FM)return;const left=fmLeft();if(left<=0&&!FM.over){FM.over=true;FM.acc=FM.total*1000;FM.running=false;beep(660,.3);setTimeout(()=>beep(880,.5),350);wakeOff();fmBar()}
 const el=Math.floor((FM.acc+(FM.running?Date.now()-FM.t0:0))/45000)%5;if(el!==FM.line){FM.line=el;const it=S.plan.items.find(x=>x.id===FM.id),L=$("#fmline");if(it&&L){L.classList.remove("fade");void L.offsetWidth;L.classList.add("fade");L.textContent=`“${GUIDE_LINES[it.pid][el]}”`}}
 fmPaint()}
function fmPaint(){if(!FM)return;const left=Math.max(0,fmLeft()),f=1-left/(FM.total*1000),C=2*Math.PI*92,a=$("#fmarc"),t=$("#fmtime"),s2=$("#fmsub");if(a)a.setAttribute("stroke-dasharray",`${(f*C).toFixed(1)} ${C.toFixed(1)}`);if(t)t.textContent=FM.over?"Done":fmtT(left);if(s2)s2.textContent=FM.over?"Time’s up. Well practised.":FM.running?"remaining":"paused";
 const st=$("#fmsteps");if(st){const cur=FM.ck.indexOf(false);[...st.children].forEach((li,i)=>{li.className=FM.ck[i]?"ok":i===cur?"cur":""})}}
function fmBar(){const b=$("#fmbar");if(!b)return;b.innerHTML=FM.over?`<button class="cta alt" data-fm="more">+5 min</button><button class="cta fmdone" data-fm="done">Mark done</button>`
 :`<button class="cta alt" data-fm="pause">${FM.running?"Pause":"Resume"}</button><button class="cta fmdone" data-fm="done">Finish</button>`}
function fmClose(){clearInterval(FMT);FMT=null;stopTool();wakeOff();const h=$("#fm");if(h)h.remove();if(!$("#ex"))document.documentElement.classList.remove("exlock");FM=null}
function fmCmd(v,ev){if(!FM)return;
 if(v==="close"){fmClose();return}
 if(v==="pause"){if(FM.running){FM.acc+=Date.now()-FM.t0;FM.running=false;wakeOff()}else{FM.t0=Date.now();FM.running=true;wakeOn()}fmBar();fmPaint();return}
 if(v==="more"){FM.total=Math.round(FM.acc/1000)+300;FM.over=false;FM.t0=Date.now();FM.running=true;wakeOn();fmBar();fmPaint();return}
 if(v==="done"){const id=FM.id;fmClose();complete(id,ev);return}
 if(v.startsWith("step|")){const i=+v.split("|")[1];FM.ck[i]=!FM.ck[i];if(FM.ck[i])beep(1180,.05,.12);fmPaint()}}


/* ================= explainer pack ================= */
function playPack(id,after){const L=LEARN.find(x=>x.id===id);if(!L)return;
 const cards=L.cards.map(c=>({kick:c.kick,svg:c.bg?sceneInner({bg:c.bg,chars:c.chars||[]}):"",html:c.bg?"":`<div class="lp-ico">${ic(c.ico||L.ico)}</div>`,cap:c.cap}));
 cards[cards.length-1].html=(cards[cards.length-1].html||"")+"";
 openPlayer({label:L.t,title:L.t,sub:L.sub,cast:[],cards,auto:false,after:()=>{if(!S.learned.includes(id)){S.learned.push(id);save();toast(`“${L.t}” done`)}render();if(after)after()}})}
function learnHub(){const n=S.learned.filter(id=>LEARN.some(x=>x.id===id)).length;
 sheet("var(--gold)",`<div class="kick">Learn</div><h2>Start here</h2><p class="sub">Short swipe guides to the app and the stories behind it. Each takes about two minutes. ${n} of ${LEARN.length} done.</p>
 <div class="lhub">${LEARN.map(L=>{const d=S.learned.includes(L.id);return `<button class="lh${d?" done":""}" data-pack="${L.id}"><span class="lhi">${ic(d?"check":L.ico)}</span><span><b>${L.t}</b><small>${L.sub} · ${L.cards.length} cards</small></span></button>`}).join("")}
 <button class="lh" data-who="1"><span class="lhi">${ic("hero")}</span><span><b>Who’s who</b><small>Gods, heroes and sages in one line each</small></span></button>
 <button class="lh" data-gloss="1"><span class="lhi">${ic("learn")}</span><span><b>Glossary</b><small>Every term used in the app</small></span></button></div>`)}
function whoSheet(){sheet("var(--gold)",`<div class="kick">Learn</div><h2>Who’s who</h2><p class="sub">The figures you’ll meet in Abhyasa. Tap a guide to learn more.</p>
 ${WHO.map(([h,L])=>`<div class="ptitle">${h}</div><div class="whol">${L.map(([n,d,t,pid])=>pid?`<button class="who" data-person="${CHAR[pid]}" style="--c:${PATHS[pid].c}">${medal(pid,"xs")}<span><b>${n} <span class="dev">${d}</span></b><small>${t}</small></span></button>`:`<div class="who"><span class="wdot"></span><span><b>${n} <span class="dev">${d}</span></b><small>${t}</small></span></div>`).join("")}</div>`).join("")}`)}
function glossSheet(){sheet("var(--gold)",`<div class="kick">Learn</div><h2>Glossary</h2>${GLOSSARY.map(([h,L])=>`<div class="ptitle">${h}</div>${L.map(([t,d])=>`<div class="gl"><b>${t}</b><span>${d}</span></div>`).join("")}`).join("")}`)}
const learnLeft=()=>LEARN.filter(x=>!S.learned.includes(x.id)).length;

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
 if(TANIM){const el=document.querySelector(`.tr-p[data-p="${TANIM.pid}"]`);if(el){const C=+el.style.getPropertyValue("--C"),to=el.getAttribute("stroke-dashoffset");el.style.transition="none";el.setAttribute("stroke-dashoffset",(C*(1-TANIM.f)).toFixed(1));el.getBoundingClientRect();el.style.transition="stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1)";el.setAttribute("stroke-dashoffset",to)}TANIM=null}
 if(lastView!==v){lastView=v;app.classList.remove("enter");void app.offsetWidth;app.classList.add("enter")}
 save();
 if(S.deck!==td()&&!$(".scrim")&&!queue.length)setTimeout(()=>{if(S.on&&S.deck!==td()&&!$(".scrim"))openDeck()},300);
}
function header(title,sub){return `<header class="bar"><div class="wrap"><div class="hgreet">${sub?`<small>${sub}</small>`:""}<b>${title||"Abhyasa"}</b></div><button class="spill" data-streak="1" aria-label="${S.streak} day streak. Open streak details">${DIYA}${S.streak}</button></div></header>`}
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
 return `<button class="ringi${full?" full":""}" data-ring="${pid}" data-skill="${pid}:${Math.min(pr.m,4)}" style="--c:${P.c}" aria-label="${P.name}: ${max?"mastered":full?"trial ready":Math.round(f*100)+"% to "+P.skills[pr.m].n}"><span class="rw"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="none" stroke="var(--surface2)" stroke-width="5"/><circle class="rp" cx="32" cy="32" r="28" fill="none" stroke="${full?"var(--gold)":P.c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${(f*RC).toFixed(1)} ${RC.toFixed(1)}"/></svg>${medal(pid,"sm")}${pid===focusPid()?`<span class="wfb" title="This week’s focus">★</span>`:""}</span><b>${P.name}</b><small>${max?"Mastered":full?"Trial ready":`${RANKS[Math.min(pr.m,5)][0]} · ${pr.m}/5`}</small></button>`}).join("")}</div>`}
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
const TREEC={body:"#ff8a65",flex:"#5ec8dc",bonds:"#5cd6a2",love:"#f490a6",learn:"#8db2ff",focus:"#b39cff",music:"#ee93dc",calm:"#b4dc72"},TGOLD="#f5c76a";
function treeSvg(){TPOS={};
 const L=sel(),n=L.length,CX=200,CY=220,base=Object.fromEntries(L.map((p,i)=>[p,-90+i*360/Math.max(1,n)]));
 const pos=(p,j)=>{const a=(base[p]+j*7)*Math.PI/180,r=58+j*30;return[CX+r*Math.cos(a),CY+r*Math.sin(a)]};
 const tip=(p,r)=>{const a=(base[p]+30)*Math.PI/180;return[CX+r*Math.cos(a),CY+r*Math.sin(a)]};
 const f1=v=>v.toFixed(1),line=pts=>"M"+pts.map(q=>f1(q[0])+" "+f1(q[1])).join(" L");
 let g=`<defs><radialGradient id="tbg" cx="50%" cy="48%" r="50%"><stop offset="0" stop-color="#26305e"/><stop offset=".6" stop-color="#151a38"/><stop offset="1" stop-color="#0b0e20"/></radialGradient>
 <filter id="tglow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <filter id="tglow2" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7"/></filter>
 <clipPath id="mc"><circle cx="60" cy="60" r="57"/></clipPath></defs>
 <rect x="-60" y="-60" width="520" height="560" fill="url(#tbg)"/>`;
 let seed=11;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
 for(let i=0;i<70;i++){const x=rnd()*460-30,y=rnd()*500-30,r=rnd()*1.3+.3;g+=`<circle class="${i%4?"":"twk"}" style="animation-delay:${f1(rnd()*4)}s" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#fff" opacity="${f1(rnd()*.5+.15)}"/>`}
 // bridges
 SYN.filter(x=>x.p.length===2&&x.p.every(p=>S.paths.includes(p))).forEach(b=>{const[a,c]=b.p,q1=pos(a,b.req-1),q2=pos(c,b.req-1),un=S.syn.includes(b.id);
  const mx=(q1[0]+q2[0])/2,my=(q1[1]+q2[1])/2,k=-.55,cx=mx+(CX-mx)*k,cy=my+(CY-my)*k,mid=[(q1[0]+2*cx+q2[0])/4,(q1[1]+2*cy+q2[1])/4],d=`M${f1(q1[0])} ${f1(q1[1])} Q${f1(cx)} ${f1(cy)} ${f1(q2[0])} ${f1(q2[1])}`;
  g+=un?`<path d="${d}" fill="none" stroke="${TGOLD}" stroke-width="5" opacity=".35" filter="url(#tglow2)"/><path d="${d}" fill="none" stroke="${TGOLD}" stroke-width="2"/><path class="flow" d="${d}" fill="none" stroke="#fff" stroke-width="1.4" stroke-dasharray="2 12" opacity=".8"/>`
   :`<path d="${d}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.2" stroke-dasharray="3 6"/>`;
  TPOS["syn|"+b.id]=mid;g+=`<g class="tn" data-x="syn|${b.id}" tabindex="0" role="button" aria-label="Bridge ${b.n}${un?", open":", locked"}"><circle cx="${f1(mid[0])}" cy="${f1(mid[1])}" r="18" fill="transparent"/>${un?`<rect x="${f1(mid[0]-11)}" y="${f1(mid[1]-11)}" width="22" height="22" rx="3" transform="rotate(45 ${f1(mid[0])} ${f1(mid[1])})" fill="${TGOLD}" opacity=".45" filter="url(#tglow2)"/>`:""}<rect x="${f1(mid[0]-8)}" y="${f1(mid[1]-8)}" width="16" height="16" rx="2.5" transform="rotate(45 ${f1(mid[0])} ${f1(mid[1])})" fill="${un?TGOLD:"#1b2146"}" stroke="${un?"#fff3d0":"#ffffff55"}" stroke-width="1.4"/>
  <text x="${f1(mid[0])}" y="${f1(mid[1]+24)}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${un?TGOLD:"#ffffff80"}" font-family="Inter,sans-serif" stroke="#0e1229" stroke-width="3.5" paint-order="stroke">${b.n}</text></g>`});
 // branches
 L.forEach((p,pi)=>{const P=PATHS[p],c=TREEC[p]||"#fff",pr=S.prog[p],pts=[[CX,CY],...[0,1,2,3,4].map(j=>pos(p,j))],un=Math.min(pr.m,5);
  g+=`<path d="${line(pts)}" fill="none" stroke="#fff" stroke-opacity=".1" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="${line(pts)}" fill="none" stroke="${c}" stroke-opacity=".3" stroke-width="1.5" stroke-dasharray="2 5" stroke-linecap="round"/>`;
  const part=pts.slice(0,un+1+(pr.m<5&&pr.xp>0?0:0));
  if(un>0){g+=`<path d="${line(part)}" fill="none" stroke="${c}" stroke-width="7" opacity=".45" stroke-linecap="round" stroke-linejoin="round" filter="url(#tglow2)"/><path d="${line(part)}" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path class="flow" d="${line(part)}" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 14" stroke-linecap="round" opacity=".85"/>`}
  for(let j=0;j<5;j++){const[x,y]=pos(p,j),sk=P.skills[j],X=f1(x),Y=f1(y);TPOS[`skill|${p}|${j}`]=[x,y];let nd=`<g class="tn pop" style="animation-delay:${(.15+j*.09+pi*.06).toFixed(2)}s" data-x="skill|${p}|${j}" tabindex="0" role="button" aria-label="${P.name} skill ${j+1}: ${sk.n}${j<pr.m?", earned":j===pr.m?", next":", locked"}"><circle cx="${X}" cy="${Y}" r="19" fill="transparent"/>`;
   if(j<pr.m)nd+=`<circle cx="${X}" cy="${Y}" r="15" fill="${c}" opacity=".5" filter="url(#tglow2)"/><circle cx="${X}" cy="${Y}" r="12" fill="${c}" stroke="#fff" stroke-width="1.6"/><text x="${X}" y="${f1(y+4.5)}" text-anchor="middle" font-size="12" font-family="Tiro Devanagari Hindi,serif" fill="#10142c">${sk.d.slice(0,1)}</text>`;
   else if(j===pr.m){const fr=Math.min(1,pr.xp/NEED[j]),Cc=2*Math.PI*14;nd+=`<circle class="pulse" cx="${X}" cy="${Y}" r="13" fill="none" stroke="${c}" stroke-width="2"/><circle cx="${X}" cy="${Y}" r="14" fill="#141a3a" stroke="#ffffff30" stroke-width="3"/><circle cx="${X}" cy="${Y}" r="14" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${f1(fr*Cc)} ${f1(Cc)}" transform="rotate(-90 ${X} ${Y})" filter="url(#tglow)"/><text x="${X}" y="${f1(y+4.5)}" text-anchor="middle" font-size="12" font-family="Tiro Devanagari Hindi,serif" fill="${c}">${sk.d.slice(0,1)}</text>`}
   else nd+=`<circle cx="${X}" cy="${Y}" r="6.5" fill="#141a3a" stroke="${c}" stroke-opacity=".45" stroke-width="1.6"/>`;
   g+=nd+`</g>`;
   if(j===pr.m&&j<5){const a=(base[p]+j*7)*Math.PI/180,lx=x+24*Math.cos(a+Math.PI/2),ly=y+24*Math.sin(a+Math.PI/2);g+=`<text x="${f1(lx)}" y="${f1(ly+4)}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${c}" font-family="Inter,sans-serif" stroke="#0e1229" stroke-width="3.5" paint-order="stroke">${sk.n}</text>`}}
  const ar=(base[p]+30)*Math.PI/180,px=CX+212*Math.cos(ar),py=CY+212*Math.sin(ar),ca=Math.cos(ar),anc=Math.abs(ca)<.35?"middle":ca>0?"end":"start",lx=anc==="middle"?px:anc==="end"?px+20:px-20;
  TPOS["path|"+p]=[px,py];g+=`<g class="tn" data-x="path|${p}" tabindex="0" role="button" aria-label="${P.name} with ${P.hero}"><circle cx="${f1(px)}" cy="${f1(py)}" r="21" fill="${c}" opacity=".35" filter="url(#tglow2)"/><g transform="translate(${f1(px-18)} ${f1(py-18)}) scale(.3)"><circle cx="60" cy="60" r="60" fill="#f4efe3" stroke="${c}" stroke-width="7"/><g clip-path="url(#mc)">${portraitG(CHAR[p])}</g></g>
  <text x="${f1(lx)}" y="${f1(py+(Math.sin(ar)<-.3?-26:34))}" text-anchor="${anc}" font-family="Literata,serif" font-weight="600" font-size="13" fill="${c}" stroke="#0e1229" stroke-width="4" paint-order="stroke">${P.name}</text></g>`});
 // mandala
 const sgOn=["body","bonds","music"].every(p=>S.paths.includes(p)),sgUn=S.syn.includes("sangam");
 let petals="";for(let i=0;i<12;i++){petals+=`<path d="M0 -40 C7 -30 7 -24 0 -18 C-7 -24 -7 -30 0 -40Z" transform="rotate(${i*30})" fill="${TGOLD}" fill-opacity="${sgUn?.7:.22}" stroke="${TGOLD}" stroke-opacity=".7" stroke-width=".8"/>`}
 TPOS.center=[CX,CY];g+=`<g class="tn" data-x="center" tabindex="0" role="button" aria-label="Your rank"><circle cx="${CX}" cy="${CY}" r="46" fill="${TGOLD}" opacity="${sgUn?.35:.14}" filter="url(#tglow2)"/><g transform="translate(${CX} ${CY})"><g class="spin">${petals}<circle r="44" fill="none" stroke="${TGOLD}" stroke-opacity=".5" stroke-dasharray="1 4"/></g><circle r="22" fill="#0f1430" stroke="${TGOLD}" stroke-width="1.6"/></g>
 <text x="${CX}" y="${CY+3}" text-anchor="middle" font-family="Tiro Devanagari Hindi,serif" font-size="14" fill="${TGOLD}">${RANKS[stage()][1]}</text><text x="${CX}" y="${CY+14}" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" fill="#ffffffa0">${msTotal()} trials</text></g>`;
 TREE_G=g;return `<div class="treebox night" data-x="open"><span class="exhint">Tap to explore ⤢</span><svg class="tree" viewBox="-48 -38 496 520" role="img" aria-label="Skill tree">${g}</svg><div class="tlegend"><span><i class="lk"></i>Earned</span><span><i class="nx"></i>Next</span><span><i class="lc"></i>Locked</span><span><i class="br"></i>Bridge</span></div></div>`;
}

/* ================= skill tree explorer (pan, zoom, tap nodes) ================= */
let TPOS={},TREE_G="",EX=null;const VB0={x:-48,y:-38,w:496,h:520};
function exOpen(key){treeSvg();const host=document.createElement("div");host.id="ex";host.setAttribute("role","dialog");host.setAttribute("aria-label","Skill tree explorer");
 host.innerHTML=`<div class="ex-top"><button class="ex-b" data-ex="close" aria-label="Close">×</button><span>Skill tree</span><span class="ex-zoom"><button class="ex-b" data-ex="out" aria-label="Zoom out">−</button><button class="ex-b" data-ex="in" aria-label="Zoom in">+</button><button class="ex-b wide" data-ex="all">Overview</button></span></div>
 <div class="ex-stage"><svg id="exsvg" viewBox="${VB0.x} ${VB0.y} ${VB0.w} ${VB0.h}" preserveAspectRatio="xMidYMid meet">${TREE_G}<g id="exsel" opacity="0"><circle r="24" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 5" class="exrot"/><circle r="30" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="1"/></g></svg></div><div class="ex-panel" id="expanel"></div>`;
 document.body.appendChild(host);document.documentElement.classList.add("exlock");
 EX={vb:{...VB0},anim:null,sel:null,ptr:new Map(),moved:0};exBind();exSelect(key||exDefault(),true)}
function exClose(){const h=$("#ex");if(h)h.remove();document.documentElement.classList.remove("exlock");EX=null}
function exDefault(){const p=sel()[0];if(!p)return"center";return `skill|${p}|${Math.min(S.prog[p].m,4)}`}
function exAspect(){const st=$("#ex .ex-stage");return st?st.clientHeight/Math.max(1,st.clientWidth):1}
function exApply(){const v=EX.vb,el=$("#exsvg");if(el)el.setAttribute("viewBox",`${v.x.toFixed(1)} ${v.y.toFixed(1)} ${v.w.toFixed(1)} ${v.h.toFixed(1)}`)}
function exTo(cx,cy,w,instant){const a=exAspect(),h=w*a,to={x:cx-w/2,y:cy-h/2,w,h},from={...EX.vb};cancelAnimationFrame(EX.anim);
 if(instant||matchMedia("(prefers-reduced-motion: reduce)").matches){EX.vb=to;exApply();return}
 const t0=performance.now(),D=480,ease=t=>1-Math.pow(1-t,3);const step=now=>{const k=ease(Math.min(1,(now-t0)/D));EX.vb={x:from.x+(to.x-from.x)*k,y:from.y+(to.y-from.y)*k,w:from.w+(to.w-from.w)*k,h:from.h+(to.h-from.h)*k};exApply();if(k<1)EX.anim=requestAnimationFrame(step)};EX.anim=requestAnimationFrame(step)}
function exOverview(){const a=exAspect(),w=Math.max(440,460/a);exTo(VB0.x+VB0.w/2,VB0.y+VB0.h/2,w);EX.sel=null;$("#exsel").setAttribute("opacity","0");exPanel(null)}
function exZoom(f,cx,cy){const v=EX.vb,nw=Math.max(120,Math.min(900,v.w*f));cx=cx??v.x+v.w/2;cy=cy??v.y+v.h/2;const nh=nw*exAspect(),kx=(cx-v.x)/v.w,ky=(cy-v.y)/v.h;cancelAnimationFrame(EX.anim);EX.vb={x:cx-kx*nw,y:cy-ky*nh,w:nw,h:nh};exApply()}
function exSelect(key,first){if(!EX)return;const pos=TPOS[key];if(!pos)return;EX.sel=key;const r=$("#exsel");r.setAttribute("transform",`translate(${pos[0].toFixed(1)} ${pos[1].toFixed(1)})`);r.setAttribute("opacity","1");
 const zoomW=key==="center"?300:key.startsWith("path")?260:230;if(first)exTo(...pos,VB0.w,true);exTo(pos[0],pos[1],zoomW);exPanel(key)}
function paceOf(pid){let m=0;S.log.forEach(l=>{if(l.pid===pid&&diff(l.d,td())<14&&diff(l.d,td())>=0)m+=logMin(l)});return m/14*mult(pid)}
function etaText(pid,k){const pr=S.prog[pid];if(k<pr.m)return"";let rem=Math.max(0,NEED[pr.m]-pr.xp);for(let i=pr.m+1;i<=k;i++)rem+=NEED[i];const pace=paceOf(pid);
 if(!rem)return"Your trial is ready now.";const d=pace>0?Math.ceil(rem/pace):0;
 return `${rem} more growth${k>pr.m?` and ${k-pr.m+1} trials`:" to the trial"}. ${d?`About ${d<14?d+" days":Math.round(d/7)+" weeks"} at your pace over the last two weeks.`:"Practise this path to see an estimate."}`}
function exPanel(key){const el=$("#expanel");if(!el)return;if(!key){el.innerHTML=`<div class="exp-h"><b>Your constellation</b></div><p class="exp-s">Tap any star to explore it. Drag to move, pinch or use + and − to zoom.</p><div class="exp-legend"><span><i class="lk"></i>Earned</span><span><i class="nx"></i>Next</span><span><i class="lc"></i>Locked</span><span><i class="br"></i>Bridge</span></div>`;return}
 const [type,a,b]=key.split("|"),L=sel();
 if(type==="skill"){const pid=a,k=+b,P=PATHS[pid],sk=P.skills[k],pr=S.prog[pid],c=TREEC[pid],on=has(pid,k),nx=k===pr.m,full=nx&&pr.xp>=NEED[k];
  const state=on?`<span class="exst on" style="--c:${c}">Earned</span>`:nx?`<span class="exst nx" style="--c:${c}">${full?"Trial ready":"In progress"}</span>`:`<span class="exst">Locked</span>`;
  const eta=on?"":etaText(pid,k),prog=nx?`<div class="exbar" style="--c:${c}"><i style="width:${Math.min(100,pr.xp/NEED[k]*100)}%"></i></div><p class="exp-m">${Math.min(pr.xp,NEED[k])} of ${NEED[k]} growth · ${eta}</p>`:eta?`<p class="exp-m">${eta}</p>`:"";
  el.innerHTML=`<div class="exp-k" style="color:${c}">${P.name} · skill ${k+1} of 5 · with ${P.hero}</div><div class="exp-h"><b>${sk.n}</b><span class="dev">${sk.d}</span>${state}</div>${EN[sk.n]?`<p class="exp-en">${EN[sk.n]}</p>`:""}
  <p class="exp-s">${sk.s}</p>${prog}
  <div class="exgrid"><div><small>Effect</small>${PERK[sk.perk](P.name)}</div><div><small>${on?"Trial passed":"Trial"}</small>${trialFor(pid,k)}</div>${sk.item?`<div><small>Gift</small>${sk.itemName||sk.n}</div>`:""}${!on&&!nx?`<div><small>Unlocks after</small>${P.skills[k-1].n}</div>`:""}</div>
  <div class="exnav"><button class="ex-b" data-ex="prev" ${k===0?"disabled":""} aria-label="Previous skill">‹</button><button class="ex-b" data-ex="next" ${k===4?"disabled":""} aria-label="Next skill">›</button>${L.length>1?`<button class="ex-b wide" data-ex="branch">⇄ Next branch</button>`:""}${full?`<button class="ex-b wide pri" data-trial="${pid}">I passed</button>`:""}</div>`;return}
 if(type==="syn"){const sy=SYN.find(x=>x.id===a),un=S.syn.includes(a);
  el.innerHTML=`<div class="exp-k" style="color:${TGOLD}">Bridge · ${sy.p.map(p=>PATHS[p].name).join(" + ")}</div><div class="exp-h"><b>${sy.n}</b><span class="dev">${sy.d}</span><span class="exst ${un?"on":""}" style="--c:${TGOLD}">${un?"Open":"Locked"}</span></div>${EN[sy.n]?`<p class="exp-en">${EN[sy.n]}</p>`:""}<p class="exp-s">${sy.s}</p>
  <div class="exgrid"><div><small>Opens when</small>${sy.p.map(p=>`${PATHS[p].name}: ${Math.min(S.prog[p].m,sy.req)}/${sy.req} trials`).join("<br>")}</div><div><small>Effect</small>+10% growth and a daily shared task</div></div>
  <div class="exnav"><button class="ex-b wide pri" data-story="${a}">${un?"Watch the story":"Preview the story"}</button></div>`;return}
 if(type==="path"){const pid=a,P=PATHS[pid],pr=S.prog[pid],g=CHAR[pid],c=TREEC[pid];
  el.innerHTML=`<div class="exp-k" style="color:${c}">${REALMS.find(r=>r.id===P.realm).n} · ${P.about}</div><div class="exp-h">${medal(pid,"sm")}<b>${P.name}</b><span class="exst on" style="--c:${c}">${pr.m}/5</span></div><p class="exp-s">${PEOPLE[g].bio}</p>
  <div class="exnav"><button class="ex-b wide" data-ex="go|skill|${pid}|${Math.min(pr.m,4)}">Go to next skill</button><button class="ex-b wide" data-intro="${pid}">Meet ${PEOPLE[g].n}</button></div>`;return}
 if(type==="center"){const st=stage(),n=L.length,need=(st+1)*n-msTotal();
  el.innerHTML=`<div class="exp-k" style="color:${TGOLD}">The centre of your constellation</div><div class="exp-h"><b>${RANKS[st][0]}</b><span class="dev">${RANKS[st][1]}</span><span class="exst on" style="--c:${TGOLD}">${msTotal()} trials</span></div><p class="exp-en">${EN[RANKS[st][0]]}</p><p class="exp-s">${st>=5?"You have reached the highest rank.":`${need} more trial${need===1?"":"s"} across your paths to become ${RANKS[st+1][0]}.`}</p>
  <div class="exnav">${L.map(p=>`<button class="ex-b wide" data-ex="go|path|${p}" style="color:${TREEC[p]}">${PATHS[p].name}</button>`).join("")}</div>`}}
function exNav(cmd){if(!EX)return;const k=EX.sel||exDefault(),[t,p,j]=k.split("|"),L=sel();
 if(cmd==="prev"&&t==="skill")exSelect(`skill|${p}|${Math.max(0,+j-1)}`);
 if(cmd==="next"&&t==="skill")exSelect(`skill|${p}|${Math.min(4,+j+1)}`);
 if(cmd==="branch"){const cur=t==="skill"||t==="path"?p:L[0],np=L[(L.indexOf(cur)+1)%L.length];exSelect(`skill|${np}|${Math.min(S.prog[np].m,4)}`)}}
function exBind(){const st=$("#ex .ex-stage"),svg=$("#exsvg");
 const toSvg=(cx,cy)=>{const r=svg.getBoundingClientRect(),v=EX.vb,sc=Math.max(v.w/r.width,v.h/r.height),ox=(r.width-v.w/sc)/2,oy=(r.height-v.h/sc)/2;return[v.x+(cx-r.left-ox)*sc,v.y+(cy-r.top-oy)*sc,sc]};
 st.addEventListener("pointerdown",e=>{EX.ptr.set(e.pointerId,[e.clientX,e.clientY]);EX.moved=0;cancelAnimationFrame(EX.anim);if(EX.ptr.size===2){const[a,b]=[...EX.ptr.values()];EX.pd=Math.hypot(a[0]-b[0],a[1]-b[1])}});
 st.addEventListener("pointermove",e=>{if(!EX.ptr.has(e.pointerId))return;const prev=EX.ptr.get(e.pointerId);EX.ptr.set(e.pointerId,[e.clientX,e.clientY]);
  if(EX.ptr.size===1){const[,,sc]=toSvg(0,0),dx=e.clientX-prev[0],dy=e.clientY-prev[1];EX.moved+=Math.abs(dx)+Math.abs(dy);EX.vb.x-=dx*sc;EX.vb.y-=dy*sc;exApply()}
  else if(EX.ptr.size===2){const[a,b]=[...EX.ptr.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(EX.pd){const[mx,my]=toSvg((a[0]+b[0])/2,(a[1]+b[1])/2);exZoom(EX.pd/d,mx,my)}EX.pd=d;EX.moved+=10}});
 const up=e=>{EX&&EX.ptr.delete(e.pointerId);if(EX&&EX.ptr.size<2)EX.pd=null};st.addEventListener("pointerup",up);st.addEventListener("pointercancel",up);
 st.addEventListener("click",e=>{if(EX.moved>18){e.stopPropagation();e.preventDefault();return}
  if(e.target.closest("[data-x]"))return;const[sx,sy,sc]=toSvg(e.clientX,e.clientY);let best=null,bd=Infinity;
  Object.entries(TPOS).forEach(([k,q])=>{const d=Math.hypot(q[0]-sx,q[1]-sy);if(d<bd){bd=d;best=k}});
  if(best&&bd/sc<=34){e.stopPropagation();exSelect(best)}},true);
 st.addEventListener("wheel",e=>{e.preventDefault();const[mx,my]=toSvg(e.clientX,e.clientY);exZoom(e.deltaY>0?1.12:.89,mx,my)},{passive:false});
 document.addEventListener("keydown",exKeys)}
function exKeys(e){if(!EX){document.removeEventListener("keydown",exKeys);return}if(e.key==="Escape")exClose();if(e.key==="ArrowLeft")exNav("prev");if(e.key==="ArrowRight")exNav("next");if(e.key==="Tab"&&e.shiftKey===false&&e.target===document.body){e.preventDefault();exNav("branch")}}

function storiesList(){const L=SYN.filter(x=>x.p.every(p=>S.paths.includes(p)));if(!L.length)return `<p class="sub">Choose two or more paths to unlock stories.</p>`;
 return `<div class="stories">${L.map(x=>{const on=S.syn.includes(x.id);return `<button class="storyc${on?"":" off"}" data-story="${x.id}"><span class="pair">${x.p.map(p=>medal(p,"sm")).join("")}</span><div><b>${x.n}</b><small>${on?"Unlocked · tap to watch":`Opens when ${x.p.map(p=>PATHS[p].name).join(" and ")} pass ${x.req} trials · preview`}</small></div><span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></button>`}).join("")}</div>`}

/* ================= layout v2: Today ================= */
let TANIM=null;
const seg=(k,opts)=>{S.seg=S.seg||{};const cur=S.seg[k]||opts[0][0];return `<div class="segc" role="tablist">${opts.map(([v,l])=>`<button role="tab" aria-selected="${cur===v}" data-seg="${k}:${v}">${l}</button>`).join("")}</div>`};
const segOf=(k,d)=>(S.seg&&S.seg[k])||d;
function todayMins(pid){const it=S.plan.items.filter(x=>(x.kind==="task"||x.kind==="anchor")&&x.pid===pid);return{done:it.filter(x=>x.done).reduce((a,x)=>a+x.m,0),plan:it.reduce((a,x)=>a+x.m,0)}}
const todayFrac=pid=>{const m=todayMins(pid);return m.plan?Math.min(1,m.done/m.plan):0};
function activityRings(){const ps=sel(),n=ps.length,sw=n<=3?13:n===4?11:9,gap=3,R0=70;let svg="",leg="",tD=0,tP=0;
 ps.forEach((pid,i)=>{const r=R0-i*(sw+gap),C=2*Math.PI*r,m=todayMins(pid),f=m.plan?Math.min(1,m.done/m.plan):0;tD+=m.done;tP+=m.plan;const P=PATHS[pid];
  svg+=`<circle cx="80" cy="80" r="${r}" fill="none" stroke="${P.c}" stroke-opacity=".16" stroke-width="${sw}"/><circle class="tr-p" data-p="${pid}" cx="80" cy="80" r="${r}" fill="none" stroke="${P.c}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C*(1-f)).toFixed(1)}" style="--C:${C.toFixed(1)}" transform="rotate(-90 80 80)"/>`;
  leg+=`<div class="lg" style="--c:${P.c}"><span class="dot"></span><span>${P.name}</span><em>${m.done}<small>/${m.plan} min</small></em></div>`});
 const tasks=S.plan.items.filter(x=>x.kind==="task"||x.kind==="anchor"),dn=tasks.filter(x=>x.done).length;
 return `<button class="today-rings" data-seg-go="journey:paths" aria-label="Today: ${tD} of ${tP} minutes done"><svg viewBox="0 0 160 160" class="trs">${svg}</svg><span class="tr-side"><span class="tr-big"><b>${tD}</b><small>/ ${tP} min today</small></span>${leg}<span class="tr-meta">${dn} of ${tasks.length} tasks${tP&&tD>=tP?" · all rings closed 🎉":""}</span></span></button>`}
function stripCards(){const t=td(),out=[],c=checkToday(),cal=todayCal(),qt=QUOTES[dayNum(t)%QUOTES.length];
 const card=(cls,attr,icon,k,b,sm,extra)=>`<div class="sc2 ${cls}"><button class="sc2b" ${attr}>${icon}<span><small>${k}</small><b>${b}</b>${sm?`<em>${sm}</em>`:""}</span></button>${extra||""}</div>`;
 const late=new Date().getHours()>=17&&S.closed!==t&&S.days[t]&&S.days[t].a;
 if(late)out.push(card("eve",'data-eve="1"',`<span class="sci">${ic("moon")}</span>`,"Evening","Close your day","Your companion sets out tonight"));
 const w=reviewWeek();if(w){const W=weekStats(w);out.push(card("gold",`data-review="${w}"`,`<span class="sci gold">${ic("path")}</span>`,"Weekly review","Your week in review",`${W.act} days · ${W.tot} min`))}
 if(c.d!==t)out.push(card("",'data-checkin="1"',`<span class="sci">${ic("sun")}</span>`,"Check-in","How are you today?","Three taps fit your plan"));
 const pid=companionPid(t);if(pid){const g=CHAR[pid],J=S.journey,trav=J&&J.d===t&&!J.back,C=CHAPTERS[g][trav?J.ch:nextCh(g)],ret=J&&J.back&&J.ret===t;
  out.push(card("",ret?`data-chap="${J.g}:${J.ch}"`:S.days[t]&&S.days[t].a&&S.closed!==t?'data-eve="1"':`data-person="${g}"`,medal(pid,"sm"),`Companion · ${PEOPLE[g].n}`,ret?`Back from ${CHAPTERS[J.g][J.ch].dest}`:trav?`On the way to ${C.dest}`:`Waiting to travel to ${C.dest}`,ret?"Watch the chapter again":trav?"Back tomorrow morning":"One task, then close your day"))}
 const n=nudges()[0];if(n)out.push(card("",`data-nudge-act="${n.pid}:${n.act}"`,medal(n.pid,"sm"),n.t,n.act==="add"?`Add ${PATHS[n.pid].name}?`:`Pause ${PATHS[n.pid].name}?`,n.s.split(". ")[0]+".",`<button class="scx" data-nudge-x="${n.k}" aria-label="Not now">×</button>`));
 if(S.lore!=="well"&&learnLeft()){const nx=LEARN.find(x=>!S.learned.includes(x.id));out.splice(Math.min(out.length,1),0,card("gold",'data-learn="1"',`<span class="sci gold">${ic("learn")}</span>`,"New to these stories?","Start here",`Next: ${nx.t}`))}
 out.push(card("",'data-today-cal="1"',`<span class="sci gold">${ic("calm")}</span>`,cal.fest?"Today’s festival":"Story for today",cal.n,cal.t));
 if(c.d===t)out.push(card("",'data-checkin="1"',`<span class="sci">${ic("sun")}</span>`,"Check-in",`${E_L[c.energy]} energy`,`${c.sore.length?"Sore "+c.sore.map(k=>SORE_L[k]).join(", "):"No soreness"} · tap to change`));
 out.push(`<div class="sc2 quote2"><span><small>Thought for today</small><b>“${qt[0]}”</b><em>${qt[1]}</em></span></div>`);
 return `<div class="strip" role="list">${out.join("")}</div>`}
function taskRow(it){const d=new Date(),chk=`<button class="check" data-done="${it.id}" aria-label="${it.done?"Undo":"Mark done"}: ${esc(it.t)}">${ic("check")}</button>`;
 if(it.kind==="trial"){const P=PATHS[it.pid],k=it.done?it.k:S.prog[it.pid].m,sn=P.skills[k]?P.skills[k].n:"";return `<div class="trow trial" style="--c:${P.c}"><span class="trialicon">${ic(it.done?"check":"trial")}</span><button class="tx" data-trial-info="${it.pid}"><span class="tag">${P.name} trial · ${it.done?"earned":"unlocks"} ${sn}</span><b>${it.t}</b></button>${it.done?"":`<button class="mini pri" data-trial="${it.pid}">Passed</button>`}</div>`}
 if(it.kind==="bridge"){const sy=SYN.find(x=>x.id===it.sid);return `<div class="trow${it.done?" done":""}" style="--c:var(--gold)">${chk}<div class="tx"><b>${it.t}</b><small><span class="duo" style="--a:${PATHS[sy.p[0]].c};--b:${PATHS[sy.p[1]].c}"></span>Bridge · ${sy.n}</small></div></div>`}
 const P=PATHS[it.pid],g=it.done?it.g:Math.round(Math.max(5,it.m)*mult(it.pid)),x=poolItem(it);
 return `<div class="trow${it.done?" done":""}${it.kind==="anchor"?" anchor":""}" style="--c:${P.c}">${chk}<button class="tx" data-task="${it.id}"><b>${esc(it.t)}</b><small><span class="dot"></span>${it.kind==="anchor"?"Your routine · ":""}${P.name} · ${it.m} min · +${g}${x&&x.tool&&!it.done?` · ${TOOLNAME[x.tool.type]}`:""}</small>${!it.done&&it.why?`<span class="why">${it.why}</span>`:""}</button>${!it.done&&it.kind==="task"?`<button class="swap" data-swap="${it.id}" aria-label="Swap this task">${ic("swap")}</button>`:""}</div>`}
function taskSheet(id){const it=S.plan.items.find(x=>x.id===id);if(!it)return;const P=PATHS[it.pid],x=poolItem(it);
 sheet(P.c,`<div class="kick">${P.name} · ${it.m} min · with ${P.hero}</div><h2>${esc(it.t)}</h2>${it.why?`<p class="why" style="margin:6px 0 0">${it.why}</p>`:""}
 ${x?guideView(it):`<p class="sub" style="margin-top:12px">${it.kind==="anchor"?"Part of your weekly routine.":"Your own task."}</p>`}
 ${it.done?"":`<button class="cta fmgo" style="width:100%;margin-top:16px" data-focus="${it.id}">${ic("sun")} Start focus mode · ${it.m} min</button>`}
 <div class="row" style="margin-top:10px">${it.kind==="task"&&!it.done?`<button class="cta alt" data-swap="${it.id}">Swap</button>`:""}<button class="cta alt" data-done="${it.id}">${it.done?"Undo":"Mark done"}</button></div>`)}
function checkSheet(){if(!CI)CI=JSON.parse(JSON.stringify(checkToday()));const chip=(g,v,l,on)=>`<button class="chip" data-ci="${g}:${v}" aria-pressed="${on}">${l}</button>`;
 sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Check-in</div><h2>How are you today?</h2><p class="sub">Your tasks adjust to fit.</p>
 <div class="cirow"><span>Energy</span><div class="cchips">${["low","ok","high"].map(v=>chip("energy",v,E_L[v],CI.energy===v)).join("")}</div></div>
 <div class="cirow"><span>Sore</span><div class="cchips">${chip("sore","none","None",!CI.sore.length)}${Object.keys(SORE).map(k=>chip("sore",k,SORE_L[k][0].toUpperCase()+SORE_L[k].slice(1),CI.sore.includes(k))).join("")}</div></div>
 <div class="cirow"><span>Today</span><div class="cchips">${Object.keys(W_L).map(v=>chip("where",v,W_L[v],CI.where===v)).join("")}</div></div>
 <button class="cta" style="width:100%;margin-top:18px" data-ci="apply">Fit my plan</button>`)}
function todayView(){
 const d=new Date(),h=d.getHours(),hi=h<5?"Still up":h<12?"Good morning":h<17?"Good afternoon":"Good evening";
 const items=S.plan.items,tl=TIMES.find(t=>t[0]===S.time)||TIMES[1],t=td(),dd=S.days[t];
 const eve=S.closed===t?`<div class="evedone">Day closed${dd&&dd.mood?` · ${MOODS.find(m=>m[0]===dd.mood)[1].toLowerCase()}`:""}</div>`:`<button class="evebar" data-eve="1">${ic("moon")}<span>Close your day</span></button>`;
 return header(`${hi}${S.name?", "+esc(S.name):""}`,d.toLocaleDateString("en-GB",{weekday:"long"})+", "+t.split("-").reverse().join("."))+tipCard()+`<div class="wrap">
 ${activityRings()}${stripCards()}
 <div class="thead" style="margin-top:18px"><h2>Today’s practice</h2><button class="chip" data-time-cycle="1" aria-label="Time for new tasks: ${tl[1]}. Tap to change">${tl[1]}</button></div>
 <div class="tlist">${items.map(taskRow).join("")}</div>
 <div class="tfoot"><button class="linkbtn" data-other="">+ I did something else</button>${eve}</div></div>`}

/* ================= layout v2: Journey ================= */
function dayMinsBy(d){const by={};S.log.filter(l=>l.d===d&&l.pid!=="bridge").forEach(l=>{by[l.pid]=(by[l.pid]||0)+logMin(l)});return by}
function pathCard(pid){const P=PATHS[pid],pr=S.prog[pid],max=pr.m>=5,need=NEED[Math.min(pr.m,4)],f=max?1:Math.min(1,pr.xp/need),full=!max&&pr.xp>=need,C=2*Math.PI*26;
 const days=Array.from({length:7},(_,i)=>addD(td(),i-6)),vals=days.map(d=>dayMinsBy(d)[pid]||0),mx=Math.max(20,...vals),wk=vals.reduce((a,b)=>a+b,0);
 return `<button class="pc2${full?" full":""}" data-pdetail="${pid}" style="--c:${P.c}"><span class="lvr"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="var(--surface2)" stroke-width="5"/><circle cx="32" cy="32" r="26" fill="none" stroke="${full?"var(--gold)":P.c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${(f*C).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 32 32)"/></svg>${medal(pid,"sm")}${pid===focusPid()?`<span class="wfb">★</span>`:""}</span>
 <span class="pcm"><b>${P.name}</b><small>${RANKS[Math.min(pr.m,5)][0]} · skill ${Math.min(pr.m+1,5)} of 5</small><em>${max?"Mastered":full?"Trial ready":`${Math.min(pr.xp,need)}/${need} to ${P.skills[pr.m].n}`}</em></span>
 <span class="spark" aria-label="${wk} minutes in the last 7 days">${vals.map(v=>`<i style="height:${Math.max(3,v/mx*34)}px;opacity:${v?1:.25}"></i>`).join("")}<small>${wk} min · 7d</small></span></button>`}
function pathDetail(pid){const P=PATHS[pid],g=CHAR[pid],pp=PEOPLE[g],pr=S.prog[pid],full=pr.m<5&&pr.xp>=NEED[pr.m];
 sheet(P.c,`<div style="display:flex;gap:14px;align-items:center">${medal(pid,"lg")}<div><div class="kick">${REALMS.find(r=>r.id===P.realm).n} · with ${pp.n}</div><h2>${P.name}</h2><small class="mute">${RANKS[Math.min(pr.m,5)][0]} · ${EN[RANKS[Math.min(pr.m,5)][0]]}</small></div></div>
 ${pr.m<5?`<div class="track" style="--c:${full?"var(--gold)":P.c};margin:14px 0 4px"><i style="width:${Math.min(100,pr.xp/NEED[pr.m]*100)}%"></i></div><p class="sub">${full?`Trial ready: ${trialText(pid)}`:`${Math.min(pr.xp,NEED[pr.m])} of ${NEED[pr.m]} growth to ${P.skills[pr.m].n}`}</p>`:""}
 ${full?`<button class="cta" style="width:100%;margin-bottom:12px" data-trial="${pid}">I passed the trial</button>`:""}
 <div class="skills">${P.skills.map((sk,k)=>{const on=has(pid,k);return `<button class="skill${on?"":" off"}" style="--c:${P.c}" data-skill="${pid}:${k}"><span class="ic">${on?sk.d.slice(0,1):k+1}</span><div><b>${sk.n}<span class="dev">${sk.d}</span></b><small class="enm">${EN[sk.n]||""}</small><small>${on?PERK[sk.perk](P.name):k===pr.m?"Next":"Locked"}</small></div></button>`}).join("")}</div>
 <div class="row" style="margin-top:14px"><button class="cta alt" data-intro="${pid}">Meet ${pp.n}</button><button class="cta alt" data-path-pause="${pid}">Pause path</button></div>`)}
function focusManage(){sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Your focus</div><h2>${sel().length} of ${MAXP} paths</h2><p class="sub">Tap a path to read about it, add it or pause it. Paused paths keep their progress.</p>
 ${REALMS.map(R=>`<div class="realm"><div class="rh"><b>${R.n}</b><span class="dev">${R.d}</span><small>${R.s} · ${R.about}</small></div><div class="rpaths">${ORDER.filter(p=>PATHS[p].realm===R.id).map(p=>{const on=S.paths.includes(p),pr=S.prog[p];return `<button class="rpath${on?" on":""}" data-pathsheet="${p}" style="--c:${PATHS[p].c}">${medal(p,"xs")}<span><b>${PATHS[p].name}</b><small>${on?"Active":pr.m||pr.xp?`Paused · ${pr.m}/5`:"Not started"}</small></span></button>`}).join("")}${SOON.filter(x=>x[2]===R.id).map(([n,h])=>`<div class="rpath soonp"><span class="medal xs" style="--c:var(--faint)"></span><span><b>${n}</b><small>Soon · ${h}</small></span></div>`).join("")}</div></div>`).join("")}`)}
function journeyView(){const sg=segOf("journey","paths");let body="";
 if(sg==="paths")body=`${nudges().map(nudgeCard).join("")}<div class="pclist">${sel().map(pathCard).join("")}</div><button class="cta alt" style="width:100%;margin-top:12px" data-focus-manage="1">Manage focus · ${sel().length} of ${MAXP}</button>`;
 if(sg==="tree")body=`${treeSvg()}<div class="block"><h2>Bridges and stories</h2><p class="sub">When two paths both pass 2 trials, their guides’ story unlocks.</p>${storiesList()}</div>`;
 if(sg==="cal"){const t=td(),r=ritu(t),cal=todayCal(),up=upcoming(4);body=`<div class="season"><span class="chip2">Season</span><h3>${r.n} ritu<span class="dev">${r.d}</span></h3><p>${r.s}</p></div>
 <button class="calcard" data-today-cal="1"><small class="mute" style="font-size:12px;font-weight:600">${cal.fest?"Today in the Indian calendar":"A story for today"}</small><b>${cal.n}</b><span>Try today: ${cal.t}</span></button>
 <div class="block"><h2>Coming up</h2><div class="upl">${up.map(k=>`<button class="upi" data-fest="${k}"><span class="ud"><b>${+k.slice(8)}</b><small>${MONS[+k.slice(5,7)-1]}</small></span><span><b>${FEST[k].n}</b><small>${inDays(k)}${FEST[k].approx?" · date approximate":""}</small></span></button>`).join("")}</div></div>
 <div class="block"><h2>Yatra log</h2><p class="sub">Each closed day sends your companion one step further</p>${sel().map(pid=>{const g=CHAR[pid],n=CHAPTERS[g].length,k=S.chap[g]||0,got=S.chapters.filter(c=>c.g===g);return `<div class="ylog" style="--c:${PATHS[pid].c}">${medal(pid,"sm")}<div><b>${PEOPLE[g].n}</b><small>${k>=n?`All ${n} chapters done.`:`Next: ${CHAPTERS[g][k%n].dest} · ${Math.min(k,n)} of ${n}`}</small><div class="ychips">${CHAPTERS[g].map((c,i)=>{const h=got.some(x=>x.ch===i);return `<button class="ych${h?" on":""}" ${h?`data-chap="${g}:${i}"`:"disabled"} aria-label="Chapter ${i+1}: ${c.dest}">${i+1}</button>`}).join("")}</div></div></div>`}).join("")}</div>`}
 return header("Journey")+tipCard()+`<div class="wrap">${seg("journey",[["paths","Paths"],["tree","Tree"],["cal","Calendar"]])}<div class="segbody">${body}</div></div>`}

/* ================= layout v2: Hero ================= */
function weekChart(){const days=Array.from({length:7},(_,i)=>addD(td(),i-6)),ps=sel(),data=days.map(dayMinsBy),tots=data.map(o=>Object.values(o).reduce((a,b)=>a+b,0)),mx=Math.max(30,...tots),H=120,L=["Su","Mo","Tu","We","Th","Fr","Sa"];
 let g="";days.forEach((d,i)=>{let y=H;const x=14+i*42;ps.forEach(p=>{const v=data[i][p]||0,h=v/mx*H;if(h>0){y-=h;g+=`<rect x="${x}" y="${y.toFixed(1)}" width="26" height="${h.toFixed(1)}" rx="3" fill="${PATHS[p].c}"/>`}});
  g+=`<text x="${x+13}" y="${H+16}" text-anchor="middle" font-size="11" fill="${d===td()?"var(--ink)":"var(--mute)"}" font-weight="${d===td()?600:400}" font-family="Inter,sans-serif">${L[new Date(d+"T12:00:00").getDay()]}</text>${tots[i]?`<text x="${x+13}" y="${(y-5).toFixed(1)}" text-anchor="middle" font-size="10" fill="var(--mute)" font-family="Inter,sans-serif">${tots[i]}</text>`:""}`});
 return `<div class="cardx"><div class="cx-h"><b>Last 7 days</b><small>${tots.reduce((a,b)=>a+b,0)} min</small></div><svg viewBox="0 0 300 ${H+24}" class="wchart" role="img" aria-label="Minutes per day for the last 7 days">${g}</svg><div class="lgrow">${ps.map(p=>`<span style="--c:${PATHS[p].c}"><span class="dot"></span>${PATHS[p].name}</span>`).join("")}</div></div>`}
function heatmap(){const t=td(),start=addD(monOf(t),-28),cells=[];for(let i=0;i<35;i++){const d=addD(start,i),m=Object.values(dayMinsBy(d)).reduce((a,b)=>a+b,0),a=S.days[d]&&S.days[d].a,lv=d>t?-1:m>=60?4:m>=30?3:m>0||a?2:0;cells.push(`<i class="h${lv}${d===t?" now":""}" title="${d.split("-").reverse().join(".")}: ${m} min"></i>`)}
 const act=Object.keys(S.days).filter(d=>d>=start&&d<=t&&S.days[d].a).length;
 return `<div class="cardx"><div class="cx-h"><b>Last 5 weeks</b><small>${act} active days</small></div><div class="hm-l">${["M","T","W","T","F","S","S"].map(x=>`<small>${x}</small>`).join("")}</div><div class="hm">${cells.join("")}</div><div class="hm-k"><small>Less</small><i class="h0"></i><i class="h2"></i><i class="h3"></i><i class="h4"></i><small>More</small></div></div>`}
function heroView(){const sg=segOf("hero","hero");let body="";
 const st=stage(),n=sel().length,need=(st+1)*n-msTotal(),pct=st>=5?100:Math.round((msTotal()-st*n)/n*100);
 if(sg==="hero")body=`<div class="stage"><button class="avbtn" data-talk="1" aria-label="Tap your hero">${TALK?`<span class="bubble"><small>${TALK[0]} says</small>${TALK[1]}</span>`:""}${avatar(st)}</button><div class="rank">${RANKS[st][0]}<span class="dev">${RANKS[st][1]}</span><small class="rankEn">${EN[RANKS[st][0]]}</small></div>
  <div class="track"><i style="width:${pct}%"></i></div><small>${st>=5?"The highest rank":`${need} more trial${need===1?"":"s"} to ${RANKS[st+1][0]}`}</small></div>
  <div class="stat3" style="margin-top:12px"><button class="stat" data-streak="1"><b>${S.streak}</b><small>Day streak</small></button><div class="stat"><b>${S.goal}</b><small>Streak goal</small></div><div class="stat"><b>${S.best}</b><small>Best streak</small></div></div>
  <div class="cardx" style="margin-top:12px"><div class="cx-h"><b>Balance</b><small>Strongest path per realm</small></div>${realmWheel()}</div>`;
 if(sg==="stats"){const closed=Object.values(S.days).filter(x=>x.mood).length;body=`${weekChart()}${heatmap()}<div class="stat3"><div class="stat"><b>${S.total}</b><small>Total growth</small></div><div class="stat"><b>${msTotal()}</b><small>Trials passed</small></div><div class="stat"><b>${closed}</b><small>Days closed</small></div></div>
  <div class="block"><h2>Weekly reviews</h2>${reviewHistory()}</div><div class="block"><h2>What Abhyasa has learned</h2>${learnedView()}</div>`}
 if(sg==="coll"){const items=[];sel().forEach(pid=>PATHS[pid].skills.forEach((s2,k)=>{if(s2.item)items.push({pid,s2,k})}));const total=sel().reduce((a,p)=>a+CHAPTERS[CHAR[p]].length,0);
  body=`<div class="block" style="margin-top:4px"><h2>Your guides</h2><div class="guides" style="margin-top:10px">${sel().map(pid=>{const c=CHAR[pid];return `<button class="gd" data-person="${c}" style="--c:${PATHS[pid].c}">${medal(pid,"lg")}<b>${PEOPLE[c].n}</b><small>${PATHS[pid].name}</small></button>`}).join("")}</div></div>
  <div class="block"><h2>Arsenal</h2><div class="items" style="margin-top:10px">${items.map(({pid,s2,k})=>{const on=has(pid,k),P=PATHS[pid];return `<div class="item${on?"":" off"}" style="--c:${P.c}"><i>${ic(on?s2.item:"lock")}</i><b>${s2.itemName||s2.n}</b><small>${on?P.hero:`${P.name} trial ${k+1}`}</small></div>`}).join("")}</div></div>
  <div class="block"><h2>Charms</h2><p class="sub">${S.charms.length} of ${total} found on your companions’ journeys</p>${S.charms.length?`<div class="charms">${S.charms.map(c=>`<div class="charm">${charmSvg(c.g,36)}<b>${c.n}</b><small>${PEOPLE[c.g].n}</small></div>`).join("")}</div>`:""}</div>`}
 if(sg==="more")body=`<button class="revcard" data-learn="1" style="margin-top:4px"><span class="revi">${ic("learn")}</span><span><b>Learn</b><small>The app and the stories behind it · ${LEARN.length-learnLeft()} of ${LEARN.length} guides done</small></span></button><div class="block"><h2>Stories and glossary</h2>${glossaryView()}</div><div class="block"><h2>App</h2>${appCard()}</div>
  <div class="links"><button class="mini" data-act="routine">Edit kit and routine</button><button class="mini" data-act="redo">Retake the questionnaire</button><button class="mini" data-act="reset">Reset everything</button></div><p class="sub" style="text-align:center;margin-bottom:30px">Abhyasa ${APP_VERSION}</p>`;
 return header("Hero")+tipCard()+`<div class="wrap">${seg("hero",[["hero","Hero"],["stats","Stats"],["coll","Collection"],["more","More"]])}<div class="segbody">${body}</div></div>`}

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
 S.seen=Math.max(S.seen,stage());S.on=true;S.view="today";S.plan={d:td(),items:S.plan.d===td()?S.plan.items.filter(x=>x.done):[],swaps:0,closed:false};S.plan.items=buildPlan(S.plan.items);if(!redo)S.deck=td();Q=null;save();render();if(S.lore==="new")setTimeout(()=>playPack("tour",()=>playIntro(sel())),400);else if(wantIntros())setTimeout(()=>playIntro(sel()),400);window.scrollTo(0,0);
 toast(redo?"Your plan is updated":"Your first tasks are ready");
 try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
}
function loadSample(){
 S=fresh();Object.assign(S,{paths:["body","bonds","music"],tags:{body:["strength","climb","swim"],bonds:["parents","abroad","roots"],music:["guitar"]},kit:["gym","pool","wall","park","bands","mat"],anchors:{gym:[1,4],climb:[3],swim:[6],family:[0]},time:45,goal:7});
 for(let i=4;i>=1;i--){S.days[addD(td(),-i)]={a:1,mood:["good","okay","bright","good"][i-1]}}S.streak=4;S.best=6;S.last=yday();
 S.chap={hanuman:4,rama:2,narada:1};S.chapters=[{g:"hanuman",ch:0},{g:"hanuman",ch:1},{g:"rama",ch:0},{g:"hanuman",ch:2},{g:"narada",ch:0},{g:"rama",ch:1},{g:"hanuman",ch:3}];
 S.charms=S.chapters.map(c=>({n:CHAPTERS[c.g][c.ch].charm[0],g:c.g}));
 for(let i=1;i<=14;i++)S.hist[addD(td(),-i)]={body:[2,2],bonds:[1,1],music:[1,i%5?1:0]};S.journey={d:yday(),g:"hanuman",ch:4,back:false};
 [[1,"body","Gym: push day",40],[1,"music","Strumming patterns",20],[2,"bonds","Call your parents",15],[2,"body","Shoulder care",10],[3,"body","Bouldering",75],[3,"music","Football with friends",0],[4,"bonds","Cook a dish from home",45],[4,"music","One-minute chord changes",15],[5,"body","Swim drills",25],[7,"body","Gym: leg day",45],[8,"bonds","Video-call a friend",30]].forEach(([i,p,t,m],k)=>S.log.push({id:"s"+k,d:addD(td(),-i),t:t==="Football with friends"?"Jam with a friend":t,pid:p,m:m||30,load:[],own:t==="Football with friends"}));
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
 window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(reg=>{
  if(reg.waiting&&navigator.serviceWorker.controller)showUpdate(reg);
  reg.addEventListener("updatefound",()=>{const nw=reg.installing;if(nw)nw.addEventListener("statechange",()=>{if(nw.state==="installed"&&navigator.serviceWorker.controller)showUpdate(reg)})});
  setInterval(()=>reg.update(),30*60*1000);
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")reg.update().catch(()=>{})});
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
 const t=e.target.closest("[data-learn],[data-pack],[data-who],[data-gloss],[data-focus],[data-fm],[data-x],[data-ex],[data-seg],[data-seg-go],[data-task],[data-checkin],[data-pdetail],[data-focus-manage],[data-review],[data-worth],[data-rvfocus],[data-rvdone],[data-qlore],[data-intro],[data-tip],[data-tips-off],[data-lore],[data-why],[data-other],[data-oth],[data-oth-go],[data-unnever],[data-uncustom],[data-pathsheet],[data-path-add],[data-path-pause],[data-nudge-act],[data-nudge-x],[data-pnext],[data-pprev],[data-streak],[data-goal],[data-eve],[data-mood],[data-eve-close],[data-chap],[data-today-cal],[data-fest],[data-time-cycle],[data-qgoal],[data-ring],[data-story],[data-snext],[data-sprev],[data-guide-next],[data-person],[data-talk],[data-close],[data-view],[data-time],[data-done],[data-swap],[data-open],[data-ci],[data-tgo],[data-treset],[data-tadj],[data-ttap],[data-trial],[data-trial-info],[data-pass],[data-skill],[data-syn],[data-tree-open],[data-act],[data-q],[data-qpath],[data-qlvl],[data-qtag],[data-qtime],[data-qkit],[data-qday]");
 if(!t)return;const d=t.dataset;
 if(d.close!==undefined){if(t.classList.contains("scrim")&&e.target!==t)return;closeLayer();return}
 if(d.view){exClose();fmClose();stopTool();OPEN=null;S.view=d.view;render();window.scrollTo(0,0);return}
 if(d.treeOpen){stopTool();OPEN=null;S.view="journey";render();window.scrollTo(0,0);return}
 if(d.time){setTime(+d.time);return}
 if(d.done){if(t.closest(".sheet"))closeLayer();complete(d.done,e);return}
 if(d.learn){learnHub();return}
 if(d.pack){closeLayer();playPack(d.pack,()=>learnHub());return}
 if(d.who){whoSheet();return}
 if(d.gloss){glossSheet();return}
 if(d.focus){focusStart(d.focus);return}
 if(d.fm){fmCmd(d.fm,e);return}
 if(d.x){const v=d.x;if(!EX){exOpen(v==="open"?null:v);if(v==="open")setTimeout(()=>EX&&exOverview(),520)}else if(v!=="open")exSelect(v);return}
 if(d.ex){const v=d.ex;if(v==="close")exClose();else if(v==="in")exZoom(.75);else if(v==="out")exZoom(1.33);else if(v==="all")exOverview();else if(v.startsWith("go|"))exSelect(v.slice(3));else exNav(v);return}
 if(d.seg){const[k,v]=d.seg.split(":");S.seg=S.seg||{};S.seg[k]=v;render();window.scrollTo(0,0);return}
 if(d.segGo){const[k,v]=d.segGo.split(":");S.seg=S.seg||{};S.seg[k]=v;S.view=k;render();window.scrollTo(0,0);return}
 if(d.task){taskSheet(d.task);return}
 if(d.checkin){CI=null;checkSheet();return}
 if(d.pdetail){pathDetail(d.pdetail);return}
 if(d.focusManage){focusManage();return}
 if(d.review){playReview(d.review);return}
 if(d.worth){const[i,v]=d.worth.split(":");const o=RV&&RV.own[+i];if(!o)return;RV.worth[o.t]=+v;t.parentNode.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b===t?"true":"false"));return}
 if(d.rvfocus){if(!RV)return;RV.focus=d.rvfocus;document.querySelectorAll("#rvfocus .chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.rvfocus===RV.focus?"true":"false"));return}
 if(d.rvdone){finishReview();return}
 if(d.qlore){Q.lore=d.qlore;quiz();return}
 if(d.intro){closeLayer();S.intro=S.intro.filter(g=>g!==CHAR[d.intro]);playIntro([d.intro]);return}
 if(d.tip){S.tips.push(d.tip);save();render();return}
 if(d.tipsOff){Object.keys(TIPS).forEach(v=>TIPS[v].forEach(t=>{const k=v+":"+t[0];if(!S.tips.includes(k))S.tips.push(k)}));save();render();toast("Tips off");return}
 if(d.lore){S.lore=d.lore;save();render();return}
 if(d.swap){if(t.closest(".sheet")){const sc=$(".scrim");if(sc&&sc.querySelector(".tool"))stopTool()}swapSheet(d.swap);return}
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
  if(v==="apply"){S.check=Object.assign({},CI,{d:td()});CIedit=false;CI=null;closeLayer();replan("Plan fitted to how you are today");return}
  const[g,x]=v.split(":");if(g==="sore"){if(x==="none")CI.sore=[];else{const i=CI.sore.indexOf(x);i<0?CI.sore.push(x):CI.sore.splice(i,1)}}else CI[g]=x;checkSheet();return}
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
