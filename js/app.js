/* Abhyasa app logic. Content lives in js/content.js. */
const APP_VERSION="1.34.0";   // bump with tools/bump_version.py for every release
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
 Star:'<path d="m12 3 2.2 5.6 5.8.5-4.4 3.8 1.4 5.8L12 15.6 7 18.7l1.4-5.8L4 9.1l5.8-.5z"/>',
 friend:'<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c.5-4 2.5-6 5-6s3.5 1 4 2c.5-1 1.5-2 4-2s4.5 2 5 6"/>',
 money:'<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
 courage:'<path d="M12 3v18M7 6c0 3 2 4 5 4s5-1 5-4M5 4v3M19 4v3"/>',
 wisdom:'<path d="M12 3c2 2.5 3 4 3 6a3 3 0 0 1-6 0c0-2 1-3.5 3-6z"/><path d="M6 21h12M8 17h8l-1 4H9z"/>',
 Chakra:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5M4 12h5M15 12h5"/>',
 Flute:'<path d="M3 17 19 5"/><circle cx="9" cy="12.5" r=".8"/><circle cx="12" cy="10.2" r=".8"/><circle cx="15" cy="8" r=".8"/>',
 Lotus:'<path d="M12 19c-3-3-3-8 0-12 3 4 3 9 0 12zM12 19c-4 0-7-3-8-6 3 0 6 2 8 6zM12 19c4 0 7-3 8-6-3 0-6 2-8 6z"/>',
 Trident:'<path d="M12 21V5M7 4c0 4 2 6 5 6s5-2 5-6M12 2v3"/>',
 Lion:'<circle cx="12" cy="12" r="8" stroke-dasharray="2 2"/><circle cx="12" cy="12" r="4.5"/><path d="M10.5 12h.01M13.5 12h.01"/>',
 Lamp:'<path d="M12 3c2 2.5 3 4 3 6a3 3 0 0 1-6 0c0-2 1-3.5 3-6z"/><path d="M5 15h14c-1 3-3.5 5-7 5s-6-2-7-5z"/>',
 Scroll:'<path d="M7 4h11v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h12M7 4a2 2 0 0 0-2 2v11"/><path d="M9 8h6M9 11h6"/>',
 making:'<path d="M14 6l4 4-9 9H5v-4z"/><path d="M12 8l4 4M16 4l4 4"/>',
 art:'<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>',
 gratitude:'<path d="M12 21c-5-3-8-6-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4-3 7-8 10z"/><path d="M9 11h6"/>',
 Vajra:'<path d="M12 3v18M8 5c1 3 1 4 4 5 3-1 3-2 4-5M8 19c1-3 1-4 4-5 3 1 3 2 4 5"/>',
 Chariot:'<path d="M3 14h14l3-5H8"/><circle cx="7" cy="17" r="3"/><circle cx="16" cy="17" r="3"/>',
 Stylus:'<path d="M5 19 17 7l2 2L7 21H5z"/><path d="M15 5l4 4"/>',
 Basket:'<path d="M4 10h16l-2 9H6z"/><path d="M8 10l4-6 4 6"/><circle cx="10" cy="14" r="1"/><circle cx="14" cy="14" r="1"/>'});
const ic=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[k]||ICO.calm}</svg>`;
const HE=g=>PEOPLE[g].pr==="she"?"she":"he",HIM=g=>PEOPLE[g].pr==="she"?"her":"him",HIS=g=>PEOPLE[g].pr==="she"?"her":"his",CAP=w=>w[0].toUpperCase()+w.slice(1);

/* ================= state ================= */
const KEY="abhyasa.v3",$=s=>document.querySelector(s);
const fresh=()=>({v:SCHEMA,on:false,name:"",paths:[],tags:{},kit:[],anchors:{},goal:7,days:{},journey:null,chap:{},chapters:[],charms:[],deck:"",closed:"",tick:"",check:{d:"",energy:"ok",sore:[],where:"normal"},log:[],time:30,prog:Object.fromEntries(ORDER.map(p=>[p,{m:0,xp:0}])),hist:{},dismiss:{},learn:{},lore:"",cal:"indian",epic:null,gear:{},ink:[],hideInk:false,enemies:[],enLog:{},rest:[],fch:null,fchDone:[],ident:{},pvals:[],pshare:false,hall:[],rk:0,story:{done:[],cur:null,refl:{},nt:-1},storyInit:1,intro:[],tips:[],learned:[],trialLog:[],lastBackup:"",shown:{},reviews:{},wfocus:{w:"",pid:""},seg:{},custom:{},dayCtx:{d:""},plan:{d:"",items:[],swaps:0,closed:false},view:"today",streak:0,best:0,last:"",shieldUsed:{w:"",n:0},seen:0,total:0,syn:[]});
let S;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!S.prog)S=fresh();else S=migrate(Object.assign(fresh(),S),S);
function applyMentors(){S.mentor=S.mentor||{};Object.keys(CHAR0).forEach(p=>{let g=S.mentor[p]||CHAR0[p];if(!PEOPLE[g])g=CHAR0[p];CHAR[p]=g;PATHS[p].hero=PEOPLE[g].n;PATHS[p].heroDev=PEOPLE[g].d;GUIDE_LINES[p]=MLINES[g]||GL0[p]})}
applyMentors();
try{injectCustom()}catch(e){}
function migrate(o,raw){raw=raw||o;
 // Add one step per schema change, e.g. if(o.v<2){ ...convert...; o.v=2 }
 if((o.v||1)<2){ORDER.forEach(p=>{if(!o.prog[p])o.prog[p]={m:0,xp:0}});o.hist=o.hist||{};o.dismiss=o.dismiss||{};if(o.paths.length>5)o.paths=o.paths.slice(0,5)}
 ORDER.forEach(p=>{if(!o.prog[p])o.prog[p]={m:0,xp:0}});
 o.learn=o.learn||{};o.shown=o.shown||{};o.learned=o.learned||[];o.trialLog=o.trialLog||[];o.reviews=o.reviews||{};o.wfocus=o.wfocus||{w:"",pid:""};o.intro=o.intro||[];o.tips=o.tips||[];o.lore=o.lore||"";o.cal=o.cal||"indian";if(o.epic&&!o.epic.goal)o.epic=null;if(!raw.storyInit){o.storyInit=1;const t=ORDER.reduce((a,k)=>a+(o.prog[k]?o.prog[k].m:0),0);let r=0;ARC_GATE.forEach((g,k)=>{if(t>=g)r=k});o.story={done:Array.from({length:r},(_,k)=>k),cur:null,refl:{},nt:-1,grand:r}}
 if(!o.rkInit){o.rkInit=1;const t=ORDER.reduce((a,k)=>a+(o.prog[k]?o.prog[k].m:0),0);let r=0;ARC_GATE.forEach((g,k)=>{if(t>=g)r=k});o.rk=r}o.custom=o.custom||{};o.dayCtx=o.dayCtx||{d:""};
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
const stage=()=>LOOK[lifeRank()];
const msTotal=()=>sel().reduce((a,k)=>a+S.prog[k].m,0);
const synOpen=()=>SYN.filter(s=>S.syn.includes(s.id)&&s.p.every(p=>S.paths.includes(p)));
const trialFor=(pid,k)=>{const t=PATHS[pid].trials[k],tg=S.tags[pid]||[];for(const g of tg)if(t[g])return t[g];return t.def};
const trialText=pid=>trialFor(pid,S.prog[pid].m);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

(function(){
 if(!S.last)return;const g=diff(S.last,td());if(g<=1)return;
 const R=(S.rest||[]).map(r=>r.d);let miss=0;{const a=new Date(S.last+"T12:00:00");for(let i=1;i<g;i++){const d=new Date(a);d.setDate(a.getDate()+i);if(!R.includes(d.toLocaleDateString("en-CA")))miss++}}
 if(miss===0){const y=new Date();y.setDate(y.getDate()-1);S.last=y.toLocaleDateString("en-CA");save();return}
 const wk=weekKey();if(S.shieldUsed.w!==wk)S.shieldUsed={w:wk,n:0};
 if(miss===1&&S.shieldUsed.n<shieldsAllowed()){S.shieldUsed.n++;const y=new Date();y.setDate(y.getDate()-1);S.last=y.toLocaleDateString("en-CA");setTimeout(()=>toast("A streak shield saved your streak"),700)}
 else S.streak=0;save();
})();

const addD=(s,n)=>{const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return d.toLocaleDateString("en-CA")};
const yday=()=>addD(td(),-1);
const dayNum=s=>Math.floor(Date.parse(s+"T00:00:00Z")/864e5);
const SOUTH=(()=>{try{return /^(Australia|Antarctica|Pacific\/Auckland|America\/(Sao_Paulo|Argentina|Santiago|Montevideo|Asuncion)|Africa\/(Johannesburg|Maputo|Harare|Windhoek))/.test(Intl.DateTimeFormat().resolvedOptions().timeZone)}catch(e){return false}})();
const calMode=()=>S.cal||"indian";
function ritu(s){const m=calMode();if(m==="none")return null;let md=s.slice(5);
 if(m==="seasons"){if(SOUTH)md=String((+md.slice(0,2)+5)%12+1).padStart(2,"0")+md.slice(2);let r=SEASONS[3];SEASONS.forEach(x=>{if(md>=x.from)r=x});return r}
 let r=RITU[5];RITU.forEach(x=>{if(md>=x.from)r=x});return r}
const rituL=r=>r?(r.d?`${r.n} ritu · ${r.m}`:r.n):"";
function todayCal(){const f=calMode()==="indian"&&FEST[td()];return f?Object.assign({fest:true},f):Object.assign({fest:false},ANEC[dayNum(td())%ANEC.length])}
const upcoming=n=>calMode()!=="indian"?[]:Object.keys(FEST).filter(k=>k>td()).sort().slice(0,n);
const inDays=k=>{const n=diff(td(),k);return n===1?"tomorrow":`in ${n} days`};

const nextCh=g=>(S.chap[g]||0)%CHAPTERS[g].length;
function companionPid(s){const p=(!s||s===td())?todayPs():sel();return p.length?p[dayNum(s||td())%p.length]:null}

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
 if(kitBlocked(x,pid))return false;
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
 const last=(S.log||[]).filter(l=>l.t===x.t).map(l=>l.d).sort().pop(),sh=(S.shown[x.t]||[]).filter(d=>d<td()&&diff(d,td())<=7);
 if(last===C.yd||sh.includes(C.yd))s-=1.5;else if(!last||diff(last,td())>3)s+=.5;
 s-=1.1*sh.length;if(x.m<=5&&sh.length)s-=1;if(!sh.length&&!last)s+=.6;
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
 {const z=styleScore(x,pid);s+=z.s;if(z.why)why.push(z.why)}
 return{s,why:why[0]||""};
}
function ranked(pid,C,seed,exclude){
 const P=PATHS[pid],dd=(S.diff||{})[pid]||0,tier=Math.max(0,Math.min(4,S.prog[pid].m+(dd>=2?1:dd<=-2?-1:0))),r=rng(seed),tags=S.tags[pid]||[];
 const famCall=anchorsToday(C.c).some(a=>a.id==="family");
 let c=P.pool.map((x,i)=>({x,i})).filter(({x})=>tier>=x.lo&&tier<=x.hi&&fit(x,pid,C)&&!exclude.includes(x.t)&&!(famCall&&x.call)&&!(x.m<=5&&(S.shown[x.t]||[]).some(d=>d<td()&&diff(d,td())<=3)));
 const f=c.filter(({x})=>x.tags.includes("any")||x.tags.some(g=>tags.includes(g)));if(f.length>=2)c=f;
 return c.map(o=>Object.assign(o,score(o.x,pid,C,r))).sort((a,b)=>b.s-a.s);
}
const mkT=(pid,o)=>({id:uid(),kind:"task",pid,ref:o.i,t:o.x.t,m:o.x.m,load:o.x.load,why:o.why,done:false});
function buildPlan(keep){
 const ps=sel(),lead=todayPs(),C=ctx(),items=keep.slice();
 anchorsToday(C.c).forEach(a=>{if(items.some(x=>x.kind==="anchor"&&x.aid===a.id))return;const sr=C.c.sore.filter(k=>a.load.some(l=>SORE[k].includes(l)));
  items.push({id:uid(),kind:"anchor",aid:a.id,pid:a.pid,t:a.n,m:a.m,load:a.load,done:false,why:sr.length?`Your ${SORE_L[sr[0]]} is sore: go light, or skip it today`:""})});
 const used=items.filter(x=>x.kind==="task").reduce((a,x)=>a+x.m,0),rem=Math.max(0,S.time-used),wf=focusPid(),ep=(STORY_ON&&S.epic&&S.epic.goal&&!(S.epic.cur>=S.epic.ms[6]))?(S.epic.goal.combo?(SYN.find(x=>x.id===S.epic.goal.combo)||{p:[]}).p:[S.epic.goal.pid]):[],wt=p=>(p===wf?1.6:1)*(ep.includes(p)?1.3:1)*(ps.length>DAYMAX&&lead.includes(p)?1.8:1),wsum=ps.reduce((a,p)=>a+wt(p),0);
 ps.forEach(pid=>{
  const pr=S.prog[pid];
  if(pr.m<5&&pr.xp>=NEED[pr.m]&&!items.some(x=>x.kind==="trial"&&x.pid===pid&&!x.done))items.push({id:uid(),kind:"trial",pid,t:trialText(pid),m:0,done:false});
  const bz=busyToday(C.c),hasA=items.some(x=>x.kind==="anchor"&&x.pid===pid),share=rem*wt(pid)/wsum,cap=bz?5:hasA?Math.min(15,share):share,maxN=bz||hasA?1:(ps.length>DAYMAX&&!lead.includes(pid))?1:2;
  const list=ranked(pid,C,td()+pid+S.time+items.length+JSON.stringify(C.c),items.map(x=>x.t));
  let left=cap,n=items.filter(x=>x.kind==="task"&&x.pid===pid).length;
  for(const o of list){if(n>=maxN)break;if(o.x.m<=left+3){items.push(mkT(pid,o));left-=o.x.m;n++}}
  if(!n){const o=list.slice().sort((a,b)=>a.x.m-b.x.m)[0];if(o)items.push(mkT(pid,o))}
 });
 if(!busyToday(C.c))synOpen().forEach(s=>{if(!items.some(x=>x.kind==="bridge"&&x.sid===s.id))items.push({id:uid(),kind:"bridge",sid:s.id,t:s.q,m:15,done:false})});
 const rank={trial:0,anchor:1,task:2,bridge:3};
 return items.sort((a,b)=>rank[a.kind]-rank[b.kind]||ps.indexOf(a.pid)-ps.indexOf(b.pid));
}
function ensurePlan(){if(S.plan.d!==td()){recordHist();S.plan={d:td(),items:[],swaps:0,closed:false};S.plan.items=buildPlan([]);S.plan.items.forEach(x=>{if(x.kind==="task"){L_(x.t).sh++;const a=S.shown[x.t]=(S.shown[x.t]||[]).filter(d=>diff(d,td())<=14);if(!a.includes(td()))a.push(td())}})}}

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
function closeLayer(){sayStop();const s=$(".scrim");if(s){if(s.querySelector(".tool"))stopTool();s.remove();if(LASTF&&LASTF.isConnected&&!queue.length)try{LASTF.focus({preventScroll:true})}catch(e){}}if(PL){clearTimeout(PL.t);const dk=PL.deck,af=PL.after;PL=null;if(dk){S.deck=td();save();render()}if(af){af();return}}if(queue.length)nextModal()}

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
 S.log.push({id:it.id,d:td(),h:new Date().getHours(),t:it.t,load:it.load||[],pid:it.pid||"bridge",m:it.m||0,own:!!it.own});S.log=S.log.filter(l=>diff(l.d,td())<=60);
 if(it.kind==="bridge"){const s=SYN.find(x=>x.id===it.sid);it.g=8;s.p.forEach(p=>grow(p,Math.round(8*mult(p))));popAt("+ growth","var(--gold)",ev)}
 else{const g=Math.round(Math.max(5,it.m)*mult(it.pid));it.g=g;S.awT=S.awT&&S.awT.d===td()?S.awT:{d:td(),p:[]};if(it.pid&&PATHS[it.pid]&&!S.awT.p.includes(it.pid)){S.awT.p.push(it.pid);const _p=it.pid;setTimeout(()=>toast(`Your inner ${PATHS[_p].hero} ${AWVERB[Math.min(5,S.prog[_p].m)]}`),1100)}if(it.kind==="task")setTimeout(()=>askFeel(it),2600);grow(it.pid,g);popAt("+"+g,PATHS[it.pid].c,ev)}
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

function checkDiff(before){const after=S.plan.items.filter(x=>!x.done&&(x.kind==="task"||x.kind==="anchor")),bt=before.map(x=>x.t),at=after.map(x=>x.t);
 const gone=before.filter(x=>!at.includes(x.t)),added=after.filter(x=>!bt.includes(x.t)),flag=after.filter(x=>x.kind==="anchor"&&x.why&&/sore/.test(x.why));
 const c=checkToday(),summ=`${E_L[c.energy]} energy · ${c.sore.length?"sore "+c.sore.map(k=>SORE_L[k]).join(", "):"no soreness"} · ${W_L[c.where].toLowerCase()}`;
 if(!gone.length&&!added.length&&!flag.length){toast("Your plan already fits how you are today");return}
 const row=(x,sign)=>`<div class="cdr ${sign==="+"?"add":"rem"}" style="--c:${PATHS[x.pid]?PATHS[x.pid].c:"var(--gold)"}"><span class="cds">${sign==="+"?"+":"−"}</span><span><b>${esc(x.t)}</b>${sign==="+"&&x.why?`<small>${x.why}</small>`:""}</span></div>`;
 sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Plan fitted · ${summ}</div><h2>Here’s what changed</h2>
 ${gone.length?`<div class="qlabel">Taken out</div>${gone.map(x=>row(x,"−")).join("")}`:""}${added.length?`<div class="qlabel">Added</div>${added.map(x=>row(x,"+")).join("")}`:""}
 ${flag.length?`<div class="qlabel">Careful today</div>${flag.map(x=>`<div class="cdr warn"><span class="cds">!</span><span><b>${esc(x.t)}</b><small>${x.why}</small></span></div>`).join("")}`:""}
 <button class="cta" style="width:100%;margin-top:16px" data-close="1">Got it</button>`)}
function replan(msg){stopTool();OPEN=null;const keep=S.plan.items.filter(x=>x.done||x.kind==="trial");S.plan.items=buildPlan(keep);save();render();if(msg)toast(msg)}
function setTime(v){S.time=v;replan(`Plan updated for ${TIMES.find(t=>t[0]===v)[1]}`)}
function passTrial(pid,feel){
 const pr=S.prog[pid],before=stage(),k=pr.m,P=PATHS[pid],sk=P.skills[k];
 pr.xp=Math.max(0,pr.xp-NEED[k]);pr.m++;activity();
 const it=S.plan.items.find(x=>x.kind==="trial"&&x.pid===pid&&!x.done);if(it){it.done=true;it.k=k}
 closeLayer();
 beep(523,.15);setTimeout(()=>beep(659,.15),150);setTimeout(()=>beep(784,.35),300);
 pushModal(`<div class="unlock">${unlockArt(pid,sk)}</div><div class="kick">${P.name} · Skill unlocked</div><h2>${sk.n}<span class="dev">${sk.d}</span></h2><p class="aw-line">Your inner ${P.hero} is now <b>${AWAKE[Math.min(5,k+1)]}</b></p>${enLine(sk.n)}<p>${skS(pid,sk,k)}</p>${feel?`<p class="cer-r">“${FEEL_REPLY[feel]}” <small>${P.hero}</small></p>`:""}<div class="box" style="text-align:left"><small>Effect</small>${PERK[sk.perk](P.name)}${sk.item?`<small style="margin-top:6px">Gift</small>${sk.itemName||sk.n} joins your hero`:""}</div>`);
 SYN.forEach(s=>{if(S.syn.includes(s.id)||!s.p.every(p=>S.paths.includes(p)))return;if(s.p.every(p=>S.prog[p].m>=s.req)){S.syn.push(s.id);pushModal(`<div class="evo" style="gap:0">${s.p.map(p=>medal(p,"lg")).join("")}</div><div class="kick">Bridge opened</div><h2>${s.n}<span class="dev">${s.d}</span></h2>${enLine(s.n)}<p>${s.p.map(p=>PATHS[p].name).join(" and ")} now help each other: +10% growth and a shared daily task.</p><button class="cta alt" style="width:100%;margin-bottom:10px" data-story="${s.id}">Watch their story</button>`)}});
 {const a2=STORY_ON?stAvail():-1;if(a2>=0&&SS().nt!==a2){SS().nt=a2;setTimeout(()=>toast(`A story trial is ready: ${STRIALS[a2].n}. Find it in Journey → Story`),1600)}}
 S.plan.items=buildPlan(S.plan.items.filter(x=>x.done||x.kind==="trial"));
 save();render();
}


/* ================= trial ceremony ================= */
const FEEL=[["hard","Hard won"],["steady","Steady"],["easy","Easier than expected"]],HELP=[["practice","Daily practice"],["rest","Rest and recovery"],["people","People around me"],["focus","Focus"],["guide","The guides and tasks"]];
const FEEL_REPLY={hard:"Hard-won strength is the kind that stays with you.",steady:"Steady is how every great journey is walked.",easy:"Easy now, because you prepared. Choose a bigger test next time."};
let CER=null;
function ceremony(pid,step){const P=PATHS[pid],k=S.prog[pid].m,sk=P.skills[k],g=CHAR[pid],pp=PEOPLE[g];if(!CER||CER.pid!==pid)CER={pid,feel:"",help:[],note:""};
 if(step===0)sheet(P.c,`<div class="cer-h">${medal(pid,"lg")}<div><div class="kick">${P.name} trial ${k+1} of 5</div><h2>${trialText(pid)}</h2></div></div>
 <p class="cer-q">${pp.n} asks: before you claim <b>${sk.n}</b>, look back for a moment.</p>
 <div class="qlabel">How did it feel?</div><div class="cchips">${FEEL.map(([v,l])=>`<button class="chip" data-cer="feel:${v}" aria-pressed="${CER.feel===v}">${l}</button>`).join("")}</div>
 <div class="qlabel">What got you here?</div><div class="cchips">${HELP.map(([v,l])=>`<button class="chip" data-cer="help:${v}" aria-pressed="${CER.help.includes(v)}">${l}</button>`).join("")}</div>
 <label class="qlabel" for="cernote" style="display:block">One thing you learned (optional)</label><input class="name" id="cernote" maxlength="120" placeholder="For example: rest days made me stronger" value="${esc(CER.note)}" style="font-size:16px">
 <div class="row" style="margin-top:16px"><button class="cta alt" data-close="1">Not yet</button><button class="cta" data-cer="next" ${CER.feel?"":"disabled"}>${CER.feel?"Continue":"Pick how it felt"}</button></div>`);
 else sheet(P.c,`<div class="cer-h">${medal(pid,"lg")}<div><div class="kick">Your word</div><h2>Did you truly pass?</h2></div></div><div class="box"><small>The trial</small>${trialText(pid)}</div>
 <p class="cer-q">There is no one checking. Like Rama, keep your word, even to yourself. Passing unlocks <b>${sk.n}</b>${EN[sk.n]?`, ${EN[sk.n].toLowerCase()}`:""}, and can’t be undone.</p>
 <div class="row"><button class="cta alt" data-cer="back">Not yet</button><button class="cta" data-cer="pass">Yes, I passed</button></div>`);
 const n=$("#cernote");if(n)n.addEventListener("input",e=>CER.note=e.target.value)}
function cerCmd(v){if(!CER)return;const n=$("#cernote");if(n)CER.note=n.value;const[k,x]=v.split(":");
 if(k==="feel"){CER.feel=x;ceremony(CER.pid,0);return}
 if(k==="help"){const i=CER.help.indexOf(x);i<0?CER.help.push(x):CER.help.splice(i,1);ceremony(CER.pid,0);return}
 if(k==="next"){if(CER.feel)ceremony(CER.pid,1);return}
 if(k==="back"){ceremony(CER.pid,0);return}
 if(k==="pass"){const c=CER;S.trialLog.push({pid:c.pid,k:S.prog[c.pid].m,d:td(),feel:c.feel,help:c.help,note:(c.note||"").trim().slice(0,120)});CER=null;passTrial(c.pid,c.feel)}}
function unlockArt(pid,sk){const c=TREEC[pid]||"#f5c76a";let rays="";for(let i=0;i<16;i++){const a=i*22.5;rays+=`<path d="M0 -46 L4 -88 L-4 -88Z" transform="rotate(${a})" fill="${c}" opacity=".55"/>`}
 return `<svg class="unl" viewBox="-100 -100 200 200" aria-hidden="true"><g class="unl-rays">${rays}</g><circle class="unl-ring" r="52" fill="none" stroke="${c}" stroke-width="3"/><circle class="unl-seal" r="40" fill="${c}"/><text class="unl-seal" y="14" text-anchor="middle" font-size="40" font-family="Tiro Devanagari Hindi,serif" fill="#14182e">${sk.d.slice(0,1)}</text></svg>`}

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
 // ===== wave-1 alternate mentors (v1.21) =====
 const body=(robe,trim)=>`<path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="${robe}" ${O}/>${trim||""}`,neck=c=>`<rect x="53" y="80" width="14" height="14" fill="${c}" ${O2}/>`,face=c=>`<circle cx="60" cy="62" r="24" fill="${c}" ${O}/>`,smile=`<path d="M55 72 q5 3 10 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/>`,crown=(c)=>`<path d="M40 44 L44 28 L52 36 L60 22 L68 36 L76 28 L80 44Z" fill="${c||"#d9a441"}" ${O}/><circle cx="60" cy="34" r="2.6" fill="#d0492e"/>`;
 // ===== wave-2a mentors (v1.28) =====
 const beard=c=>`<path d="M38 66 Q40 100 60 106 Q80 100 82 66 Q72 80 60 80 Q48 80 38 66Z" fill="${c}" ${O}/>`,jata=c=>`<path d="M36 56 C30 28 90 28 84 56 C78 44 42 44 36 56Z" fill="${c}" ${O}/><ellipse cx="60" cy="26" rx="13" ry="11" fill="${c}" ${O}/>`;
 // ===== inner enemies (v1.29) =====
 const brow=`<path d="M47 55 l9 3M73 55 l-9 3" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/>`,stache=`<path d="M48 70 q12 -6 24 0 q-6 4 -12 2 q-6 2 -12 -2z" fill="${K}"/>`;
 if(id==="ravana")return `${[[-34,.62],[34,.62],[-58,.5],[58,.5]].map(([dx,k])=>`<g transform="translate(${60+dx} ${58}) scale(${k}) translate(-60 -62)"><circle cx="60" cy="62" r="24" fill="#8a5a3a" ${O}/><path d="M40 44 L44 28 L52 36 L60 22 L68 36 L76 28 L80 44Z" fill="#d9a441" ${O}/>${brow}${eyes(62)}</g>`).join("")}
  ${body("#6b1f2a",`<path d="M30 100 Q60 114 90 100" fill="none" stroke="#d9a441" stroke-width="4"/>`)}${neck("#7a4a2c")}${face("#9a6440")}<path d="M38 46 L42 22 L51 34 L60 12 L69 34 L78 22 L82 46Z" fill="#d9a441" ${O}/><circle cx="60" cy="30" r="3.4" fill="#4f8a3c"/>${brow}${eyes(62)}${stache}`;
 if(id==="hiranyakashipu")return `${body("#d9a441",`<path d="M30 100 Q60 114 90 100" fill="none" stroke="#8a3324" stroke-width="5"/>`)}${neck("#a06a44")}<path d="M34 62 C34 42 86 42 86 62 L86 78 C80 66 40 66 34 78Z" fill="${K}"/>${face("#c48459")}
  <path d="M38 46 L42 26 L51 36 L60 16 L69 36 L78 26 L82 46Z" fill="#f2c94c" ${O}/><circle cx="60" cy="33" r="3" fill="#d0492e"/><path d="M45 52 l11 5M75 52 l-11 5" stroke="${K}" stroke-width="3" stroke-linecap="round"/>${eyes(62)}<path d="M52 74 q8 -5 16 0" fill="none" stroke="${K}" stroke-width="2.4" stroke-linecap="round"/>`;
 if(id==="shakuni")return `<g transform="translate(96 98) rotate(12)"><rect x="-10" y="-10" width="13" height="13" rx="2" fill="#f3ead6" ${O2}/><rect x="2" y="-4" width="13" height="13" rx="2" fill="#f3ead6" ${O2}/>${[[-6,-6],[-1,-1],[6,0],[11,5],[6,5],[11,0]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.3" fill="${K}"/>`).join("")}</g>
  ${body("#3f6b5a",`<path d="M34 98 Q60 108 86 98" fill="none" stroke="#d9a441" stroke-width="3"/>`)}${neck("#a8714a")}<ellipse cx="60" cy="64" rx="20" ry="25" fill="#c48459" ${O}/><path d="M36 50 Q60 22 84 50 Q60 40 36 50Z" fill="#8a3324" ${O}/><circle cx="60" cy="38" r="3" fill="#d9a441"/>
  <path d="M48 57 l8 2M72 57 l-8 2" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/>${eyes(63)}<path d="M53 75 q7 3 14 -2" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><path d="M57 82 q3 8 6 0" fill="${K}"/>`;
 if(id==="dhritarashtra")return `<path d="M100 122 V40" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M100 122 V40" stroke="#8a5424" stroke-width="3" stroke-linecap="round"/><circle cx="100" cy="38" r="6" fill="#d9a441" ${O2}/>
  ${body("#5b4a8f",`<path d="M30 100 Q60 114 90 100" fill="none" stroke="#d9a441" stroke-width="4"/>`)}${neck("#b07a52")}${face("#c48459")}${beard("#e9e4da")}${crown()}<path d="M44 60 h32" stroke="#f3ead6" stroke-width="7" stroke-linecap="round"/><path d="M44 60 h32" stroke="${K}" stroke-width="1.5"/>`;
 if(id==="mahishasura")return `<path d="M40 40 C20 34 14 18 22 10 C26 24 34 30 46 32Z" fill="#e9e4da" ${O}/><path d="M80 40 C100 34 106 18 98 10 C94 24 86 30 74 32Z" fill="#e9e4da" ${O}/>
  ${body("#3a2a1e",`<path d="M30 100 Q60 114 90 100" fill="none" stroke="#b0182f" stroke-width="5"/>`)}${neck("#4a3a2e")}${face("#5a4434")}<path d="M38 48 C38 32 82 32 82 48 Z" fill="#9aa0ad" ${O}/>${brow}<circle cx="53" cy="62" r="2.4" fill="#d0492e"/><circle cx="67" cy="62" r="2.4" fill="#d0492e"/>
  <ellipse cx="60" cy="74" rx="9" ry="6" fill="#6e5544" ${O2}/><circle cx="56" cy="74" r="1.4" fill="${K}"/><circle cx="64" cy="74" r="1.4" fill="${K}"/>`;
 if(id==="duryodhana")return `<path d="M100 122 L94 52" stroke="${K}" stroke-width="10" stroke-linecap="round"/><path d="M100 122 L94 52" stroke="#6b4423" stroke-width="5" stroke-linecap="round"/><circle cx="93" cy="40" r="16" fill="#d9a441" ${O}/><circle cx="93" cy="40" r="5" fill="#d0492e" ${O2}/>
  ${body("#b0182f",`<path d="M30 100 Q60 114 90 100" fill="none" stroke="#d9a441" stroke-width="5"/>`)}${neck("#a06a44")}<path d="M34 62 C34 42 86 42 86 62 L86 76 C80 66 40 66 34 76Z" fill="${K}"/>${face("#b87a50")}${crown()}${brow}${eyes(62)}<path d="M52 73 q8 -3 16 1" fill="none" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/>`;
 if(id==="sita")return `<path d="M30 72 C28 30 92 30 90 72 L96 116 L24 116Z" fill="${K}"/>${body("#e9b445",`<path d="M28 104 Q60 118 92 104" fill="none" stroke="#c0392b" stroke-width="5"/>`)}${neck("#b98257")}${face("#d39a6a")}<path d="M36 60 C36 38 84 38 84 60 C78 46 42 46 36 60Z" fill="${K}"/>
  <path d="M48 40 L52 30 L60 36 L68 30 L72 40Z" fill="#d9a441" ${O2}/><circle cx="60" cy="53" r="2.6" fill="#d0492e"/>${eyes(62)}${smile}<circle cx="35" cy="72" r="3.5" fill="#d9a441" ${O2}/><circle cx="85" cy="72" r="3.5" fill="#d9a441" ${O2}/>
  <path d="M102 118 q-2 -20 4 -34 M102 118 q-8 -16 -6 -30 M102 118 q6 -12 12 -22" fill="none" stroke="#4f8a3c" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="44" r="4" fill="#f3ead6" ${O2}/>`;
 if(id==="markandeya")return `<g transform="translate(98 84)">${[0,1,2,3,4,5,6,7].map(i=>`<circle cx="${(10*Math.cos(i*.8)).toFixed(1)}" cy="${(14*Math.sin(i*.8)).toFixed(1)}" r="3" fill="#5a2f16" stroke="${K}" stroke-width="1"/>`).join("")}</g>
  ${body("#e5762f",`<path d="M34 98 Q60 112 86 98" fill="none" stroke="#5a2f16" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round"/>`)}${neck("#a8714a")}${face("#c48459")}<path d="M38 52 C38 38 82 38 82 52 C76 44 44 44 38 52Z" fill="${K}"/><circle cx="60" cy="34" r="8" fill="${K}"/>
  <path d="M48 50 h24M48 54 h24" stroke="#f3ead6" stroke-width="2"/><circle cx="60" cy="52" r="2" fill="#d0492e"/>${eyes(62)}${smile}`;
 if(id==="buddha")return `<circle cx="60" cy="60" r="44" fill="#f2c94c" opacity=".35"/>
  ${body("#d9772f",`<path d="M34 96 L84 124" stroke="#b85a1f" stroke-width="7"/>`)}${neck("#c89464")}<path d="M34 62 q-6 10 0 22 M86 62 q6 10 0 22" fill="none" stroke="${K}" stroke-width="3"/><circle cx="60" cy="62" r="24" fill="#e0ad7c" ${O}/>
  <path d="M38 54 C38 30 82 30 82 54 C76 42 44 42 38 54Z" fill="#1d2a44" ${O2}/>${[44,52,60,68,76].map(x=>`<circle cx="${x}" cy="${44-Math.abs(x-60)/4}" r="3" fill="#1d2a44"/>`).join("")}<ellipse cx="60" cy="30" rx="8" ry="7" fill="#1d2a44" ${O2}/>
  <circle cx="60" cy="52" r="1.8" fill="#d0492e"/><path d="M50 62 q3 -2 6 0M64 62 q3 -2 6 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>${smile}`;
 if(id==="radha")return `<path d="M30 72 C28 30 92 30 90 72 L96 116 L24 116Z" fill="${K}"/>${body("#c2185b",`<path d="M26 102 Q60 120 94 102" fill="none" stroke="#d9a441" stroke-width="4"/><path d="M20 96 Q40 80 60 92" fill="none" stroke="#f3a6c8" stroke-width="6"/>`)}${neck("#c7936a")}${face("#e0a97a")}
  <path d="M36 60 C36 38 84 38 84 60 C78 46 42 46 36 60Z" fill="${K}"/><path d="M44 42 Q60 34 76 42" fill="none" stroke="#d9a441" stroke-width="2.5"/><circle cx="60" cy="40" r="3" fill="#d9a441" ${O2}/><circle cx="60" cy="53" r="2.4" fill="#d0492e"/>${eyes(62)}${smile}
  ${[0,1,2,3,4].map(i=>`<circle cx="${30+i*2}" cy="${46+i*6}" r="3" fill="${i%2?"#f2c94c":"#e8892b"}" stroke="${K}" stroke-width=".8"/>`).join("")}<circle cx="36" cy="74" r="3.5" fill="#d9a441" ${O2}/><circle cx="84" cy="74" r="3.5" fill="#d9a441" ${O2}/>`;
 if(id==="vishwamitra")return `<circle cx="96" cy="30" r="14" fill="#f2a43a" ${O2}/>${[0,1,2,3,4,5,6,7].map(i=>`<path d="M96 30 L${(96+22*Math.cos(i*.785)).toFixed(1)} ${(30+22*Math.sin(i*.785)).toFixed(1)}" stroke="#f2a43a" stroke-width="2.5"/>`).join("")}
  ${body("#b8642a")}${neck("#a06a44")}${face("#b87a50")}${beard("#e9e4da")}${jata("#6b5a4a")}<path d="M46 48 h28M46 52 h28" stroke="#f3ead6" stroke-width="2"/><circle cx="60" cy="50" r="2" fill="#d0492e"/>
  <path d="M50 60 q3 -2 6 0M64 60 q3 -2 6 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/><path d="M48 54 l8 -2M72 54 l-8 -2" stroke="${K}" stroke-width="2.2"/>`;
 if(id==="karna")return `<circle cx="60" cy="58" r="46" fill="#f2c94c" opacity=".4"/><path d="M98 12 Q122 66 98 120" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M98 12 Q122 66 98 120" fill="none" stroke="#8a5424" stroke-width="3" stroke-linecap="round"/><path d="M98 12 V120" stroke="#f3ead6" stroke-width="1.2"/>
  ${body("#d9a441",`<path d="M30 100 Q60 90 90 100 M32 110 Q60 100 88 110" fill="none" stroke="#a8641e" stroke-width="2.5"/><circle cx="60" cy="104" r="6" fill="#d0492e" ${O2}/>`)}${neck("#c4864f")}
  <path d="M34 62 C34 42 86 42 86 62 L86 76 C80 66 40 66 34 76Z" fill="${K}"/>${face("#d39a6a")}${crown()}${eyes(62)}${smile}<circle cx="36" cy="74" r="5" fill="#d9a441" ${O2}/><circle cx="84" cy="74" r="5" fill="#d9a441" ${O2}/>`;
 if(id==="bharata")return `<g transform="translate(92 92) rotate(-10)"><path d="M-8 0 q0 -14 8 -16 q8 2 8 16 q0 10 -8 12 q-8 -2 -8 -12z" fill="#8a5424" ${O2}/><path d="M6 6 q0 -14 8 -16 q8 2 8 16 q0 10 -8 12 q-8 -2 -8 -12z" fill="#a06a3a" ${O2}/><circle cx="0" cy="-8" r="2" fill="#d9a441"/><circle cx="14" cy="-2" r="2" fill="#d9a441"/></g>
  ${body("#9a7b4f",`<path d="M34 99 L86 124" stroke="#6b5a3a" stroke-width="5"/>`)}${neck("#4a7da0")}<path d="M33 60 C33 42 87 42 87 60 L87 76 C80 66 40 66 33 76Z" fill="${K}"/>${face("#5d8fb5")}${jata("#2a2a2a")}${eyes(62)}${smile}<path d="M60 47 v6" stroke="#d0492e" stroke-width="2.4" stroke-linecap="round"/>`;
 if(id==="nala")return `<g transform="translate(96 96)"><ellipse rx="16" ry="11" fill="#9aa0ad" ${O}/><path d="M-9 -2 h18 M-6 4 h12" stroke="${K}" stroke-width="1.6"/></g><path d="M80 112 q8 -4 16 0 q8 4 16 0" fill="none" stroke="#4f86a8" stroke-width="3"/>
  ${body("#6b4a2b",`<path d="M38 98 Q60 108 82 98" fill="none" stroke="#d9a441" stroke-width="3"/>`)}<circle cx="33" cy="60" r="9" fill="#7a5233" ${O}/><circle cx="87" cy="60" r="9" fill="#7a5233" ${O}/><circle cx="60" cy="60" r="27" fill="#8a5c38" ${O}/>
  <path d="M60 41 C44 41 38 55 42 68 C46 82 74 82 78 68 C82 55 76 41 60 41Z" fill="#e2b98c" ${O2}/><ellipse cx="60" cy="74" rx="13" ry="9.5" fill="#efcfa8" ${O2}/><path d="M54 77 q6 4 12 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/>${eyes(58)}<path d="M40 40 h40" stroke="#d0492e" stroke-width="4"/>`;
 if(id==="vyasa")return `<g transform="translate(94 96) rotate(-12)"><rect x="-14" y="-6" width="28" height="7" rx="2" fill="#e9d7a6" ${O2}/><rect x="-14" y="1" width="28" height="7" rx="2" fill="#ddc690" ${O2}/><path d="M0 -10 v22" stroke="#d0492e" stroke-width="2.4"/></g>
  ${body("#e9ddc6")}${neck("#5a4030")}${face("#6e4b33")}${beard("#bfb8ae")}${jata("#3a3028")}<path d="M46 48 h28M46 52 h28" stroke="#f3ead6" stroke-width="2"/>${eyes(60)}`;
 if(id==="sudama")return `<g transform="translate(96 98)"><path d="M-12 -4 q12 -10 24 0 q2 12 -12 14 q-14 -2 -12 -14z" fill="#e9ddc6" ${O2}/><path d="M-4 -10 l4 -6 l4 6" fill="none" stroke="${K}" stroke-width="2"/>${[-5,0,5].map(x=>`<circle cx="${x}" cy="-3" r="1.6" fill="#f3ead6" stroke="${K}" stroke-width=".6"/>`).join("")}</g>
  ${body("#f3ead6",`<path d="M34 99 L86 124" stroke="#c9bfa8" stroke-width="5"/>`)}${neck("#9a6c48")}<circle cx="60" cy="62" r="22" fill="#b07a50" ${O}/><path d="M58 40 q2 -10 6 -8" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>
  <path d="M48 50 h24" stroke="#f3ead6" stroke-width="2"/>${eyes(62)}${smile}`;
 if(id==="tumburu")return `<path d="M100 120 L100 38" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M100 120 L100 38" stroke="#a86f35" stroke-width="3" stroke-linecap="round"/><circle cx="100" cy="110" r="13" fill="#a86f35" ${O}/><circle cx="100" cy="40" r="7" fill="#a86f35" ${O2}/><path d="M96 40 V108M104 40V108" stroke="#f3ead6" stroke-width="1"/>
  ${body("#6c55b0",`<path d="M30 100 Q60 114 90 100" fill="none" stroke="#d9a441" stroke-width="4"/>`)}${neck("#c08a60")}<path d="M34 62 C34 42 86 42 86 62 L86 76 C80 66 40 66 34 76Z" fill="${K}"/>${face("#d39a6a")}${crown("#d9a441")}${eyes(62)}<path d="M54 71 q6 6 12 0" fill="#7a2a2a" stroke="${K}" stroke-width="1.6"/>
  <path d="M18 34 q4 -6 8 0 v10 a3 3 0 1 1 -2 -3" fill="none" stroke="#6c55b0" stroke-width="2.4"/><path d="M28 18 v10 a3 3 0 1 1 -2 -3" fill="none" stroke="#6c55b0" stroke-width="2.4"/>`;
 if(id==="vasishtha")return `${[[18,16],[30,10],[42,14],[50,24],[64,22],[76,14],[88,18]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i===3?3:2.4}" fill="#d9a441"/>`).join("")}<circle cx="54" cy="28" r="1.4" fill="#d9a441"/>
  <g transform="translate(98 100)"><path d="M-9 -4 q9 18 18 0z" fill="#8a5424" ${O2}/><path d="M-3 -6 q3 -6 6 0" fill="none" stroke="${K}" stroke-width="2"/><path d="M8 -2 l7 -5" stroke="${K}" stroke-width="3" stroke-linecap="round"/></g>
  ${body("#f3ead6",`<path d="M26 104 Q60 120 94 104" fill="none" stroke="#5a2f16" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round"/>`)}${neck("#a8714a")}${face("#c48459")}${beard("#f3ead6")}${jata("#e9e4da")}<path d="M46 48 h28M46 52 h28" stroke="#d9a441" stroke-width="2"/>${eyes(60)}`;
 if(id==="bhima")return `<path d="M100 122 L94 52" stroke="${K}" stroke-width="10" stroke-linecap="round"/><path d="M100 122 L94 52" stroke="#6b4423" stroke-width="5" stroke-linecap="round"/><circle cx="93" cy="40" r="17" fill="#9aa0ad" ${O}/><circle cx="93" cy="40" r="6" fill="#d9a441" ${O2}/>
  <path d="M6 124 Q14 90 60 88 Q106 90 114 124Z" fill="#8a3324" ${O}/><path d="M30 96 Q60 110 90 96" fill="none" stroke="#d9a441" stroke-width="5"/>${neck("#93603a")}
  <path d="M32 62 C32 40 88 40 88 62 L88 72 C82 60 38 60 32 72Z" fill="${K}"/>${face("#a8693f")}<path d="M38 46 H82 V40 H38Z" fill="#d9a441" ${O2}/>
  ${eyes(61)}<path d="M46 70 q14 -6 28 0 q-6 4 -14 2 q-8 2 -14 -2z" fill="${K}"/><path d="M60 47 v5" stroke="#d0492e" stroke-width="2.6" stroke-linecap="round"/>`;
 if(id==="shiva")return `<path d="M22 70 q-10 -30 8 -40" fill="none" stroke="#4f8a5c" stroke-width="6" stroke-linecap="round"/>
  ${body("#e9ddc6",`<path d="M26 104 Q60 120 94 104" fill="none" stroke="#5a2f16" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round"/><path d="M30 98 Q44 112 60 106 Q76 112 90 98" fill="none" stroke="#4f8a5c" stroke-width="6" stroke-linecap="round"/><circle cx="90" cy="98" r="5" fill="#4f8a5c" ${O2}/>`)}${neck("#5d86ad")}
  <path d="M38 52 C30 18 90 18 82 52 C76 40 44 40 38 52Z" fill="#3a2a1e" ${O}/><ellipse cx="60" cy="20" rx="14" ry="12" fill="#3a2a1e" ${O}/><path d="M66 14 a8 8 0 1 0 6 12 a6 6 0 1 1 -6 -12z" fill="#f3ead6" ${O2}/>
  ${face("#6f9fc8")}<path d="M48 50 h24" stroke="#f3ead6" stroke-width="2.2"/><path d="M48 54 h24" stroke="#f3ead6" stroke-width="2.2"/><ellipse cx="60" cy="45" rx="2" ry="3.4" fill="#d0492e"/>
  <path d="M50 62 q3 -2 6 0M64 62 q3 -2 6 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/>${smile}`;
 if(id==="ganesha")return `<path d="M98 116 L104 70" stroke="${K}" stroke-width="5" stroke-linecap="round"/><path d="M98 116 L104 70" stroke="#f3ead6" stroke-width="2" stroke-linecap="round"/>
  ${body("#e5762f",`<path d="M34 100 Q60 114 86 100" fill="none" stroke="#d9a441" stroke-width="4"/>`)}
  <path d="M30 50 C6 46 8 86 34 80 C40 70 40 58 30 50Z" fill="#e7a78c" ${O}/><path d="M90 50 C114 46 112 86 86 80 C80 70 80 58 90 50Z" fill="#e7a78c" ${O}/>
  <circle cx="60" cy="60" r="25" fill="#f0b79c" ${O}/><path d="M60 66 C60 84 50 92 44 100 C40 106 46 110 50 104" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round"/><path d="M60 66 C60 84 50 92 44 100 C40 106 46 110 50 104" fill="none" stroke="#f0b79c" stroke-width="7" stroke-linecap="round"/>
  <path d="M68 74 l10 6" stroke="${K}" stroke-width="6" stroke-linecap="round"/><path d="M68 74 l10 6" stroke="#fbfaf5" stroke-width="3" stroke-linecap="round"/>
  ${eyes(58)}${crown()}<path d="M60 44 v6" stroke="#d0492e" stroke-width="2.6" stroke-linecap="round"/>`;
 if(id==="ekalavya")return `<path d="M98 12 Q118 66 98 120" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M98 12 Q118 66 98 120" fill="none" stroke="#8a5424" stroke-width="3" stroke-linecap="round"/><path d="M98 12 V120" stroke="#f3ead6" stroke-width="1.2"/>
  ${body("#6b7b3a",`<path d="M30 100 L50 124 M90 100 L70 124" stroke="#a8641e" stroke-width="3"/>`)}${neck("#7a4a2c")}
  <path d="M34 64 C30 38 90 38 86 64 L88 80 C80 66 40 66 32 80Z" fill="${K}"/>${face("#8a5a3a")}<path d="M36 48 H84" stroke="#d0492e" stroke-width="4"/>
  <path d="M78 46 Q90 24 86 8 Q80 26 74 44Z" fill="#f3ead6" ${O2}/><path d="M78 44 Q86 26 84 12" stroke="${K}" stroke-width="1"/>
  ${eyes(62)}${smile}`;
 if(id==="lakshmana")return `<path d="M96 12 Q124 66 96 120" fill="none" stroke="${K}" stroke-width="8" stroke-linecap="round"/><path d="M96 12 Q124 66 96 120" fill="none" stroke="#d9a441" stroke-width="3.5" stroke-linecap="round"/><path d="M96 12 V120" stroke="#f3ead6" stroke-width="1.4"/>
  <g transform="rotate(-20 24 70)"><rect x="16" y="40" width="16" height="56" rx="3" fill="#8a5a2b" ${O}/><path d="M20 40 l-2 -14M24 40 v-15M28 40 l2 -14" stroke="${K}" stroke-width="2"/></g>
  ${body("#2f7d6d",`<path d="M86 99 L34 124" stroke="#d9a441" stroke-width="6"/>`)}${neck("#b3784a")}
  <path d="M33 60 C33 42 87 42 87 60 L87 76 C80 66 40 66 33 76Z" fill="${K}"/>${face("#d39a6a")}${crown()}${eyes(62)}${smile}<path d="M60 47 v6" stroke="#d0492e" stroke-width="2.4" stroke-linecap="round"/>`;
 if(id==="parvati")return `<path d="M30 72 C28 30 92 30 90 72 L96 116 L24 116Z" fill="${K}"/>${body("#3f8a5c",`<path d="M28 104 Q60 118 92 104" fill="none" stroke="#d9a441" stroke-width="4"/>`)}
  ${neck("#b07a52")}${face("#c98a5e")}<path d="M36 60 C36 38 84 38 84 60 C78 46 42 46 36 60Z" fill="${K}"/><path d="M48 40 L52 30 L60 36 L68 30 L72 40Z" fill="#d9a441" ${O2}/>
  <circle cx="60" cy="53" r="2.6" fill="#d0492e"/>${eyes(62)}${smile}<circle cx="35" cy="72" r="3.5" fill="#d9a441" ${O2}/><circle cx="85" cy="72" r="3.5" fill="#d9a441" ${O2}/>
  <g transform="translate(100 98)"><path d="M0 0 q-8 -6 -5 -16 q5 5 5 16z M0 0 q8 -6 5 -16 q-5 5 -5 16z M0 0 q-2 -12 0 -20 q2 8 0 20z" fill="#ec7f90" ${O2}/></g>`;
 if(id==="kubera")return `<g transform="translate(96 96)"><path d="M-14 -6 q14 -10 28 0 l-2 22 h-24z" fill="#d9a441" ${O}/><path d="M-10 -6 q10 -14 20 0" fill="none" stroke="${K}" stroke-width="2"/><circle cx="-4" cy="-12" r="3.5" fill="#4f86a8" ${O2}/><circle cx="5" cy="-13" r="3.5" fill="#d0492e" ${O2}/></g>
  <path d="M8 124 Q12 86 60 86 Q108 86 112 124Z" fill="#e9b445" ${O}/><ellipse cx="60" cy="118" rx="26" ry="14" fill="#f2c94c" ${O2}/>${neck("#b97a50")}
  <circle cx="60" cy="62" r="26" fill="#c48459" ${O}/>${crown()}${eyes(62)}<path d="M50 72 q10 7 20 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/><circle cx="44" cy="70" r="3" fill="#e7a78c" opacity=".7"/><circle cx="76" cy="70" r="3" fill="#e7a78c" opacity=".7"/>`;
 if(id==="abhimanyu")return `<g transform="translate(96 92)"><circle r="20" fill="none" stroke="${K}" stroke-width="7"/><circle r="20" fill="none" stroke="#8a5424" stroke-width="3.5"/>${[0,45,90,135].map(a=>`<path d="M0 -20 V20" transform="rotate(${a})" stroke="#8a5424" stroke-width="2.6"/>`).join("")}<circle r="4" fill="#d9a441" ${O2}/></g>
  ${body("#b0182f",`<path d="M30 100 Q60 114 90 100" fill="none" stroke="#d9a441" stroke-width="4"/>`)}${neck("#a06a44")}
  <path d="M34 62 C34 42 86 42 86 62 L86 76 C80 66 40 66 34 76Z" fill="${K}"/>${face("#b87a50")}
  <path d="M38 50 C38 26 82 26 82 50 Z" fill="#9aa0ad" ${O}/><path d="M60 26 V14" stroke="#d0492e" stroke-width="4" stroke-linecap="round"/>${eyes(62)}${smile}`;
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
 if(id==="krishna")return `<path d="M104 20 L14 110" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M104 20 L14 110" stroke="#c89b4a" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#f2c230" ${O}/><path d="M30 101 L86 124" stroke="#d0492e" stroke-width="5"/>${Array.from({length:9},(_,i)=>{const t=i/8;return `<circle cx="${42+36*t}" cy="${94+14*Math.sin(Math.PI*t)}" r="3" fill="${["#e0322e","#f2c230","#f3ead6"][i%3]}" stroke="${K}" stroke-width="1"/>`}).join("")}
  <rect x="53" y="80" width="14" height="14" fill="#3a5e95" ${O2}/><path d="M33 62 C33 40 87 40 87 62 L88 78 C80 68 40 68 32 78Z" fill="${K}"/><circle cx="60" cy="62" r="24" fill="#4a78b4" ${O}/>
  <path d="M40 46 L44 28 Q60 18 76 28 L80 46Z" fill="#d9a441" ${O}/><path d="M68 22 C74 6 90 4 92 14 C88 22 78 26 68 22Z" fill="#2b8063" ${O2}/><ellipse cx="81" cy="15" rx="5" ry="4" fill="#3f6fb8" stroke="${K}" stroke-width="1.2"/><circle cx="81" cy="15" r="1.8" fill="#f2c230"/>
  ${eyes(61)}<path d="M54 71 q6 4 12 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><path d="M55 47 Q60 55 65 47" fill="none" stroke="#f3ead6" stroke-width="2.2"/><circle cx="60" cy="52" r="1.8" fill="#d0492e"/>
  <circle cx="36" cy="70" r="3.5" fill="#d9a441" ${O2}/><circle cx="84" cy="70" r="3.5" fill="#d9a441" ${O2}/>`;
 if(id==="lakshmi")return `<path d="M30 72 C28 30 92 30 90 72 L95 114 L25 114Z" fill="${K}"/><path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#d63d5e" ${O}/><path d="M26 106 Q60 120 94 106" fill="none" stroke="#e8b33a" stroke-width="5"/>
  <path d="M96 100 C90 92 90 82 96 76 C102 82 102 92 96 100Z M96 100 C88 100 84 94 82 90 C88 90 93 94 96 100Z M96 100 C104 100 108 94 110 90 C104 90 99 94 96 100Z" fill="#f2a6b8" ${O2}/>
  <rect x="53" y="80" width="14" height="14" fill="#c08b62" ${O2}/><circle cx="60" cy="62" r="24" fill="#e2b48c" ${O}/><path d="M36 60 C36 38 84 38 84 60 C78 46 42 46 36 60Z" fill="${K}"/>
  <path d="M38 46 L42 22 L50 32 L60 12 L70 32 L78 22 L82 46Z" fill="#e8b33a" ${O}/><circle cx="60" cy="30" r="3.2" fill="#d0492e" ${O2}/><circle cx="48" cy="36" r="2" fill="#3f8f6a"/><circle cx="72" cy="36" r="2" fill="#3f8f6a"/>
  <circle cx="60" cy="53" r="2.4" fill="#d0492e"/>${eyes(62)}<path d="M55 72 q5 3 10 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><circle cx="35" cy="72" r="4" fill="#e8b33a" ${O2}/><circle cx="85" cy="72" r="4" fill="#e8b33a" ${O2}/>
  ${[0,1,2].map(i=>`<circle cx="${22+i*6}" cy="${112-i*7}" r="3.4" fill="#e8b33a" stroke="${K}" stroke-width="1"/>`).join("")}`;
 if(id==="durga")return `<path d="M100 6 V118" stroke="${K}" stroke-width="6" stroke-linecap="round"/><path d="M100 6 V118" stroke="#c9c2b0" stroke-width="2.5"/><path d="M90 8 C90 20 94 24 100 24 C106 24 110 20 110 8" fill="none" stroke="${K}" stroke-width="3.5"/><path d="M90 8 C90 20 94 24 100 24 C106 24 110 20 110 8" fill="none" stroke="#c9c2b0" stroke-width="1.6"/>
  <path d="M18 100 Q8 84 14 70 M102 100 Q112 84 106 70" stroke="#e0a07a" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M18 100 Q8 84 14 70 M102 100 Q112 84 106 70" stroke="${K}" stroke-width="9" stroke-linecap="round" fill="none" opacity=".25"/>
  <path d="M28 74 C26 30 94 30 92 74 L98 116 L22 116Z" fill="${K}"/><path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#b0182f" ${O}/><path d="M26 104 Q60 120 94 104" fill="none" stroke="#e8b33a" stroke-width="4"/>
  <rect x="53" y="80" width="14" height="14" fill="#c48a64" ${O2}/><circle cx="60" cy="62" r="24" fill="#e0a07a" ${O}/><path d="M36 60 C36 38 84 38 84 60 C78 46 42 46 36 60Z" fill="${K}"/>
  <path d="M38 46 L40 18 L50 30 L60 8 L70 30 L80 18 L82 46Z" fill="#e8b33a" ${O}/><circle cx="60" cy="28" r="3.6" fill="#b0182f" ${O2}/>
  <circle cx="60" cy="50" r="2.8" fill="#b0182f"/><path d="M56 46 v-2M64 46 v-2" stroke="#b0182f" stroke-width="2"/><path d="M49 60 q4 -2 8 0M63 60 q4 -2 8 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/><circle cx="53" cy="62" r="1.6" fill="${K}"/><circle cx="67" cy="62" r="1.6" fill="${K}"/>
  <path d="M55 72 q5 2 10 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><circle cx="35" cy="72" r="4" fill="#e8b33a" ${O2}/><circle cx="85" cy="72" r="4" fill="#e8b33a" ${O2}/>`;
 if(id==="nachiketa")return `<path d="M24 124 Q28 102 60 100 Q92 102 96 124Z" fill="#f3ead6" ${O}/><path d="M38 104 L76 124" stroke="#e8b33a" stroke-width="2.4"/>
  <path d="M90 108 c-6 -8 -4 -16 0 -22 c4 6 6 14 0 22z" fill="#f0a334" stroke="${K}" stroke-width="1.6"/><path d="M80 110 h20 c-2 6 -6 9 -10 9 s-8 -3 -10 -9z" fill="#b9622b" stroke="${K}" stroke-width="1.6"/>
  <rect x="54" y="86" width="12" height="14" fill="#a8744c" ${O2}/><circle cx="60" cy="68" r="21" fill="#c98b5e" ${O}/><path d="M39 64 C39 46 81 46 81 64 C75 54 45 54 39 64Z" fill="${K}"/><path d="M60 47 C58 40 62 36 60 30" stroke="${K}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M51 67 q3 -2 6 0M63 67 q3 -2 6 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/><circle cx="54" cy="69" r="1.5" fill="${K}"/><circle cx="66" cy="69" r="1.5" fill="${K}"/><path d="M56 78 q4 1.5 8 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><path d="M57 52 h6" stroke="#f3ead6" stroke-width="2"/>`;
 if(id==="vishwakarma")return `<path d="M100 120 L100 50" stroke="${K}" stroke-width="6" stroke-linecap="round"/><path d="M100 120 L100 50" stroke="#8a5424" stroke-width="2.6"/><rect x="88" y="36" width="24" height="14" rx="2" fill="#9aa3ad" ${O2}/>
  <path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#c9a227" ${O}/><path d="M34 99 L86 124" stroke="#8a5424" stroke-width="5"/>
  <rect x="53" y="80" width="14" height="14" fill="#b98560" ${O2}/><circle cx="60" cy="60" r="24" fill="#d9a27a" ${O}/>
  <path d="M38 66 Q60 112 82 66 Q76 88 60 90 Q44 88 38 66Z" fill="#f1ece0" ${O2}/><path d="M50 74 q10 -4 20 0" fill="none" stroke="#f1ece0" stroke-width="5" stroke-linecap="round"/>
  <path d="M38 44 L42 22 L51 32 L60 14 L69 32 L78 22 L82 44Z" fill="#d9a441" ${O}/><circle cx="60" cy="30" r="3" fill="#3f6fb8" ${O2}/>
  ${eyes(60)}<path d="M50 54 q4 -3 8 0M62 54 q4 -3 8 0" fill="none" stroke="#f1ece0" stroke-width="2.2" stroke-linecap="round"/><path d="M57 46 v8M63 46 v8" stroke="#f3ead6" stroke-width="1.8"/>`;
 if(id==="valmiki")return `<rect x="84" y="66" width="30" height="40" rx="3" fill="#e6c98f" ${O2} transform="rotate(10 99 86)"/><path d="M90 78 h18M90 85 h18M90 92 h14" stroke="#8a5424" stroke-width="1.5" transform="rotate(10 99 86)"/>
  <path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#e8dcc0" ${O}/><path d="M30 101 L78 124" stroke="#c4472d" stroke-width="5"/>
  <rect x="53" y="80" width="14" height="14" fill="#a8744c" ${O2}/><circle cx="60" cy="60" r="23" fill="#c98b5e" ${O}/>
  <path d="M38 64 Q60 116 82 64 Q76 88 60 92 Q44 88 38 64Z" fill="#f1ece0" ${O2}/>
  <path d="M37 56 C37 34 83 34 83 56 C77 44 43 44 37 56Z" fill="#f1ece0" ${O2}/><circle cx="60" cy="32" r="10" fill="#f1ece0" ${O2}/>
  <path d="M51 60 q3 2.5 6 0M63 60 q3 2.5 6 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/><path d="M56 44 h8M56 48 h8M56 52 h8" stroke="#f3ead6" stroke-width="1.6"/><circle cx="60" cy="51" r="1.4" fill="#d0492e"/>`;
 if(id==="shabari")return `<path d="M80 112 h30 l-4 12 h-22z" fill="#a8743a" ${O2}/>${[0,1,2,3,4].map(i=>`<circle cx="${84+i*5}" cy="${108-(i%2)*3}" r="3.5" fill="#b0182f" stroke="${K}" stroke-width="1"/>`).join("")}
  <path d="M28 70 C26 30 94 30 92 70 L96 112 L24 112Z" fill="#cfc8bb" ${O}/><path d="M14 124 Q20 94 60 92 Q100 94 106 124Z" fill="#8a6b4a" ${O}/><path d="M26 104 Q60 118 94 104" fill="none" stroke="#c9a227" stroke-width="3"/>
  <rect x="53" y="80" width="14" height="14" fill="#9b6a44" ${O2}/><circle cx="60" cy="62" r="23" fill="#b57a50" ${O}/><path d="M37 60 C37 40 83 40 83 60 C77 48 43 48 37 60Z" fill="#d9d3c6" ${O2}/>
  <path d="M50 64 q3 2.5 6 0M64 64 q3 2.5 6 0" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round"/><path d="M48 58 q4 -2 8 0M64 58 q4 -2 8 0" fill="none" stroke="#7a5236" stroke-width="1.2"/><path d="M53 74 q7 5 14 0" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/><circle cx="60" cy="53" r="1.8" fill="#d0492e"/>`;
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
const medalA=(pid,cls)=>medal(pid,(cls||"")+" aw"+Math.min(5,S.prog[pid].m));
const medalG=(g,cls)=>`<span class="medal ${cls||""}" style="--c:${PATHS[PEOPLE[g].pid].c}">${portrait(g)}</span>`;
const awLine=pid=>`Your inner ${PATHS[pid].hero} · ${AWAKE[Math.min(5,S.prog[pid].m)]}`;

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
 <div class="shead"><span class="pair">${(o.cast||[]).map(p=>medal(p,"xs")).join("")}</span><div><b>${o.title}</b><small>${o.sub||""}</small></div>${canSay()?`<button class="xbtn say${SAY?" on":""}" data-say="1" aria-label="Read aloud">${ic("sound")}</button>`:""}<button class="xbtn" data-close="1" aria-label="Close">×</button></div>
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
 if(SAY)sayCard();
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
 cards.push({html:`<div class="dk-cal">${r?`<span class="chip2">${rituL(r)}</span>`:""}<small>${cal.fest?"Today in the Indian calendar":"A story for today"}</small><h3>${cal.n}${cal.d?`<span class="dev">${cal.d}</span>`:""}</h3><p>${cal.s}</p><div class="box"><small>Try today</small>${cal.t}</div>${cal.src?`<span class="src">${cal.src}</span>`:""}${cal.approx?`<span class="src">Date approximate</span>`:""}</div>`,cap:""});
 {const il=todayPs().filter(idOf);if(il.length)cards.push({kick:"Who you are becoming",html:`<ul class="lifel big">${il.map(p=>`<li style="--c:${PATHS[p].c}">${medalA(p,"sm")}<span>I am becoming ${esc(idOf(p))}.</span></li>`).join("")}</ul>`,cap:"Today’s tasks are small steps toward these."})}

 cards.push({html:`<div class="dk-start"><div style="display:flex;justify-content:center">${medal(pid,"lg")}</div><p class="gq">“${L[dayNum(t)%L.length]}”</p><small class="mute">${PATHS[pid].hero} walks with you today</small></div>`,cap:""});
 openPlayer({label:"Your morning",title:"Your morning",sub:new Date().toLocaleDateString("en-GB",{weekday:"long"})+", "+t.split("-").reverse().join("."),cast:[pid],cards,auto:false,deck:true});
}

/* ================= epics v2 (v1.17): a time-boxed campaign for one concrete goal ================= */
let EP=null,EPCHK=false;
const allTrials=()=>ORDER.reduce((a,k)=>a+(S.prog[k]?S.prog[k].m:0),0);
const STORY_ON=false; // Story (epics, story trials, Sankalpa) is in the backlog; data is kept
const lifeRank=()=>STORY_ON?Math.min(gateRank(),stDone()):gateRank();
const LOOK=[0,1,2,3,4,4,5];
const roundTo=(v,s)=>Math.round(v/s)*s,fmtN=v=>(+v.toFixed(2)).toString();
const msOf=(base,tgt,st)=>Array.from({length:7},(_,k)=>k===6?tgt:Math.max(base+st,roundTo(base+(tgt-base)*(k+1)/7,st)));
const arcStage=()=>S.epic?Math.min(6,S.epic.ms.filter(v=>S.epic.cur>=v).length):0;
const epicDone=()=>S.epic&&S.epic.cur>=S.epic.ms[6];
const headsCut=()=>S.epic?(epicDone()?10:Math.min(9,S.epic.ms.filter(v=>S.epic.cur>=v).length+(S.epic.wins||0))):0;
const foeName=()=>{const f=(S.epic.foes||[]).map(k=>(FOES.find(x=>x[0]===k)||[0,0,""])[2]).filter(Boolean);return `${EPICS[S.epic.id].foe} of ${f.length?f.length>1?f.slice(0,-1).join(", ")+" and "+f[f.length-1]:f[0]:"old habits"}`};
const TPL=g=>g.combo?ECOMBO[g.combo]:EGOALS[g.pid][g.ti||0];
const goalText=g=>TPL(g).t.replace("{n}",fmtN(g.n));
const comboOf=id=>SYN.find(x=>x.id===id);
const tiFor=pid=>((S.hall||[]).filter(h=>h.pid===pid).length+(S.epicN||0))%EGOALS[pid].length;
const destText=()=>S.epic?goalText(S.epic.goal).toLowerCase():"";
const daysLeft=()=>S.epic?diff(td(),S.epic.end):0;
const sizeFor=pid=>{const m=S.prog[pid].m;return m<=1?0:m<=3?1:2};
const bestEpicFor=pid=>{let b="ramayana";Object.entries(EPICS).forEach(([k,E])=>{if(!E.soon&&E.best.includes(pid))b=k});return b};
function goalSuggest(){const ps=sel();if(!ps.length)return [];const mins={};ps.forEach(p=>mins[p]=0);
 for(let i=0;i<14;i++){const by=dayMinsBy(addD(td(),-i));ps.forEach(p=>mins[p]+=by[p]||0)}
 const byAct=[...ps].sort((a,b)=>mins[b]-mins[a]),top=byAct[0],low=byAct[byAct.length-1];
 const out=[{why:"Build on momentum",note:`${PATHS[top].name} is your most active path lately`,pid:top,ti:tiFor(top),size:sizeFor(top)}];
 if(low!==top)out.push({why:"Lift what’s lagging",note:`${PATHS[low].name} has had the least time`,pid:low,ti:tiFor(low),size:sizeFor(low)});
 const cb=SYN.filter(x=>ECOMBO[x.id]&&x.p.length===2&&x.p.every(p=>ps.includes(p))).sort((a,b)=>(S.syn.includes(b.id)?1:0)-(S.syn.includes(a.id)?1:0))[0];
 const mid=byAct.find(p=>p!==top&&p!==low);const up=Math.min(2,sizeFor(top)+1);
 if(cb)out.push({why:"Combine two paths",note:`Grows ${cb.p.map(p=>PATHS[p].name).join(" and ")} together`,pid:cb.p[0],combo:cb.id,size:Math.min(...cb.p.map(sizeFor))});
 else if(up>sizeFor(top))out.push({why:"Stretch yourself",note:`A bigger ${PATHS[top].name} goal`,pid:top,ti:tiFor(top),size:up});else if(mid)out.push({why:"Something new",note:`Give ${PATHS[mid].name} a clear target`,pid:mid,ti:tiFor(mid),size:sizeFor(mid)});
 return out.slice(0,3)}
function headsSvg(big){const n=10,cut=headsCut(),w=big?220:150,h=big?34:22,r=big?8:5.2;let g="";
 for(let i=0;i<n;i++){const x=r+2+i*((w-2*r-4)/(n-1)),y=h/2+(Math.abs(i-4.5)/4.5)*(big?6:4)-(big?2:1),dead=i<cut;
  g+=dead?`<g opacity=".35"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="none" stroke="var(--mute)" stroke-width="1.5"/><path d="M${(x-r).toFixed(1)} ${(y+r).toFixed(1)}L${(x+r).toFixed(1)} ${(y-r).toFixed(1)}" stroke="var(--mute)" stroke-width="1.5"/></g>`
  :`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#b5442c" stroke="${K}" stroke-width="1.5"/><path d="M${(x-r*.6).toFixed(1)} ${(y-r*.7).toFixed(1)}l${(r*.3).toFixed(1)} -${(r*.7).toFixed(1)} l${(r*.3).toFixed(1)} ${(r*.4).toFixed(1)} l${(r*.3).toFixed(1)} -${(r*.4).toFixed(1)} l${(r*.3).toFixed(1)} ${(r*.7).toFixed(1)}z" fill="#d9a441" stroke="${K}" stroke-width="1"/>`}
 return `<svg class="heads" viewBox="0 -6 ${w} ${h+6}" width="${w}" height="${h+6}" aria-label="${n-cut} of ${n} heads left">${g}</svg>`}
function goalCard(s,i){const G=TPL(s),n=G.n[s.size],E=EPICS[bestEpicFor(s.pid)];
 return `<button class="gcard" data-ep="pick:${i}" style="--c:${PATHS[s.pid].c}"><small>${s.why}</small><b>${G.t.replace("{n}",fmtN(n))}</b><span>${s.combo?comboOf(s.combo).p.map(p=>medal(p,"xs")).join(""):medal(s.pid,"xs")}${s.combo?comboOf(s.combo).p.map(p=>PATHS[p].name).join(" + "):PATHS[s.pid].name} · ${GSIZE[s.size]} · ${G.w[s.size]} weeks</span><em>${s.note}</em></button>`}
function epicBody(){
 if(!S.epic){const sg=goalSuggest();EP=EP&&EP.list?EP:{list:sg};EP.list=sg;
  return `<div class="ep-why sk"><h3>Sankalpa <span class="dev">सङ्कल्प</span></h3><p>A <b>Sankalpa</b> is a vow: one clear goal with a deadline. It is optional. Your daily tasks help, and the goal is split into 7 milestones.</p></div>
  <div class="block"><h2>Suggested for you</h2><p class="sub">Based on your paths, your level and the last 14 days.</p>${sg.map(goalCard).join("")}
  <button class="cta alt" style="width:100%;margin-top:4px" data-ep="own">Pick my own goal</button></div>${(S.hall||[]).length?`<div class="block"><h2>Past vows</h2>${hallView()}</div>`:""}`}
 const i=arcStage(),g=S.epic.goal,G=TPL(g),dl=daysLeft(),cur=S.epic.cur,pc=Math.min(100,Math.round((cur-g.base)/Math.max(1e-9,g.n-g.base)*100));
 if(epicDone())return `<div class="ep-why"><h3>Vow kept 🎉</h3><p>${CAP(destText())}.</p><button class="cta" style="width:100%" data-ep="finish">Add to past vows and take a new one</button></div>`;
 const miss=dl<0?`<div class="ep-miss"><b>The deadline has passed</b><p>No shame in that. Most goals take longer than planned. What would you like to do?</p><button class="cta" style="width:100%" data-ep="miss">Decide what’s next</button></div>`:"";
 return `${miss}<div class="ep-goal" style="--c:${PATHS[g.pid].c}"><small>Sankalpa · milestone ${i} of 7</small><b>${CAP(destText())}</b>
  <span class="eb-bar"><i style="width:${pc}%"></i></span><span class="eb-row"><em>${fmtN(cur)} of ${fmtN(g.n)} ${G.u}</em><em>${dl>0?`${dl} days left`:dl===0?"Deadline today":`${-dl} days past the deadline`}</em></span>
  <button class="cta" style="width:100%;margin-top:10px" data-ep="log">Update progress</button></div>
 <div class="foe">${headsSvg(true)}<div><b>${foeName()}</b><small>${10-headsCut()} of 10 heads left. A head falls at each milestone, and each week you beat your obstacles.</small></div></div>
 <ol class="books">${S.epic.ms.map((v,k)=>`<li class="${cur>=v?"done":k===i?"now":""}"><span class="bn">${cur>=v?"✓":k+1}</span><span class="bt"><b>${k===6?"Goal":`Milestone ${k+1}`}</b><small>${fmtN(v)} ${G.u}${k===6?` by ${S.epic.end.split("-").reverse().join(".")}`:""}</small></span></li>`).join("")}</ol>
 <button class="linkbtn" data-ep="close">End this vow</button>`}
function toHall(won,why){S.hall=S.hall||[];S.hall.push({id:S.epic.id,pid:S.epic.goal.pid,combo:S.epic.goal.combo||"",goal:goalText(S.epic.goal),cur:S.epic.cur,u:TPL(S.epic.goal).u,start:S.epic.start,end:td(),won:!!won,why:why||[]});S.epic=null;EP=null;save()}
function missSheet(){EP=EP&&EP.miss?EP:{miss:true,why:[]};const ext=S.epic.ext;
 sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Sankalpa · Deadline passed</div><h2>${CAP(destText())}</h2><p class="sub">You reached ${fmtN(S.epic.cur)} of ${fmtN(S.epic.goal.n)} ${TPL(S.epic.goal).u}. That still counts. What got in the way?</p>
 <div class="cchips">${MISSWHY.map(([k,l])=>`<button class="chip" data-ep="why:${k}" aria-pressed="${EP.why.includes(k)}">${l}</button>`).join("")}</div>
 ${ext?"":`<div class="qlabel">Keep going</div><div class="row"><button class="cta alt" data-ep="ext:2">Extend 2 weeks</button><button class="cta alt" data-ep="ext:4">Extend 4 weeks</button></div>`}
 <div class="qlabel">Or</div><button class="cta" style="width:100%" data-ep="missclose">Close it and keep the lessons</button>
 <p class="sub" style="margin-top:10px">Your rank, gear and trials stay either way.${ext?" You have already extended this epic once.":""}</p>`)}
function hallView(){const H=(S.hall||[]).slice().reverse();if(!H.length)return `<p class="sub">Kept and closed vows appear here.</p>`;
 return `<div class="hall">${H.map(h=>`<div class="hall-i${h.won?" won":""}" style="--c:${PATHS[h.pid]?PATHS[h.pid].c:"var(--gold)"}"><span class="hall-m">${h.won?"★":"◐"}</span><span><b>${esc(h.goal)}</b><small>Sankalpa · ${h.start.split("-").reverse().join(".")} – ${h.end.split("-").reverse().join(".")}</small><em>${h.won?"Goal reached":`Reached ${fmtN(h.cur||0)} ${h.u||""}${h.why&&h.why.length?" · "+h.why.map(k=>(MISSWHY.find(x=>x[0]===k)||[0,""])[1].toLowerCase()).join(", "):""}`}</em></span></div>`).join("")}</div>`}
function goalSheet(){const g=EP.g,G=TPL(g);
 sheet(PATHS[g.pid].c,`<div class="kick" style="color:${PATHS[g.pid].c}">${g.combo?comboOf(g.combo).p.map(p=>PATHS[p].name).join(" + "):PATHS[g.pid].name} · Sankalpa</div><h2>${G.t.replace("{n}",fmtN(g.n))}</h2>
 <div class="qlabel">Goal</div><div class="stepr"><button class="mini" data-ep="n:-">−</button><b>${fmtN(g.n)} ${G.u}</b><button class="mini" data-ep="n:+">+</button></div>
 <div class="qlabel">Where you are now</div><div class="stepr"><button class="mini" data-ep="b:-">−</button><b>${fmtN(g.base)} ${G.u}</b><button class="mini" data-ep="b:+">+</button></div>
 <div class="qlabel">Deadline</div><div class="cchips">${[4,8,12].map(w=>`<button class="chip" data-ep="w:${w}" aria-pressed="${g.w===w}">${w} weeks</button>`).join("")}</div>
 <div class="qlabel">What stands in your way? Up to 3</div><div class="cchips">${FOES.map(([k,l])=>`<button class="chip" data-ep="foe:${k}" aria-pressed="${g.foes.includes(k)}">${l}</button>`).join("")}</div>
 <p class="sub" style="margin-top:12px">Your goal is split into 7 milestones. Your obstacles become a 10-headed Ravana: a head falls at each milestone and each good week.</p>
 <button class="cta" style="width:100%" data-ep="begin" ${g.n>g.base?"":"disabled"}>Take this vow</button>`)}
function ownSheet(){const ps=sel(),cbs=SYN.filter(x=>ECOMBO[x.id]&&x.p.every(p=>ps.includes(p)));
 const row=(p,ti)=>{const G=EGOALS[p][ti],z=sizeFor(p);return `<button class="gcard" data-ep="ownp:${p}:${ti}" style="--c:${PATHS[p].c}"><b>${G.t.replace("{n}",fmtN(G.n[z]))}</b><span>${medal(p,"xs")}${PATHS[p].name} · ${GSIZE[z]}</span></button>`};
 sheet("var(--gold)",`<div class="kick" style="color:var(--gold)">Pick my own goal</div><h2>Choose a goal</h2><p class="sub">Sizes fit your level. You can change the number on the next screen.</p>
 ${cbs.length?`<div class="qlabel">Combine two paths</div>${cbs.map(x=>{const z=Math.min(...x.p.map(sizeFor)),G=ECOMBO[x.id];return `<button class="gcard" data-ep="ownc:${x.id}" style="--c:${PATHS[x.p[0]].c}"><b>${G.t.replace("{n}",fmtN(G.n[z]))}</b><span>${x.p.map(p=>medal(p,"xs")).join("")}${x.p.map(p=>PATHS[p].name).join(" + ")} · ${GSIZE[z]}</span></button>`}).join("")}`:""}
 ${ps.map(p=>`<div class="qlabel">${PATHS[p].name}</div>${EGOALS[p].map((_,ti)=>row(p,ti)).join("")}`).join("")}
 <details class="morep"><summary>Other paths</summary>${ORDER.filter(p=>!ps.includes(p)).map(p=>`<div class="qlabel">${PATHS[p].name}</div>${EGOALS[p].map((_,ti)=>row(p,ti)).join("")}`).join("")}</details>`)}
function logSheet(){const g=S.epic.goal,G=TPL(g),v=EP.v,nx=S.epic.ms.find(x=>x>v);
 sheet(PATHS[g.pid].c,`<div class="kick" style="color:${PATHS[g.pid].c}">Update progress</div><h2>${CAP(destText())}</h2><p class="sub">Where are you now?</p>
 <div class="stepr big"><button class="mini" data-ep="v:-">−</button><b>${fmtN(v)} ${G.u}</b><button class="mini" data-ep="v:+">+</button></div>
 <p class="sub" style="text-align:center">${nx!==undefined?`Next milestone: ${fmtN(nx)} ${G.u}`:"That reaches your goal"}</p>
 <button class="cta" style="width:100%" data-ep="save">Save</button>`)}
function startGoal(x){const G=TPL(x);EP={g:{pid:x.pid,ti:x.ti||0,combo:x.combo||"",size:x.size,n:G.n[x.size],base:0,w:G.w[x.size],foes:[]}};goalSheet()}
function playStage(i,after){const E=EPICS[S.epic.id],st=E.stages[i],pid=S.epic.goal.pid,g=CHAR[pid];
 const sub=x=>x.replace("{G}",PEOPLE[g].n).replace("{FOE}",foeName()).replace("{DEST}",destText());
 const cards=st.scenes.map((sc,k)=>{const w=sc.who.map(x=>x==="G"?g:x).filter((x,j,a)=>a.indexOf(x)===j);return {kick:k?"":`Book ${i+1} · ${st.n}`,svg:sceneInner({bg:sc.bg,chars:w.length>1?two(w[0],w[1]):one(w[0],k?"float":"rise")}),cap:sub(sc.cap)}});
 const G=TPL(S.epic.goal),nx=S.epic.ms[i];
 cards.push({kick:"Your goal",html:`<div class="dk-charm"><div class="flame big" style="margin:0 auto">${DIYA}</div><b>${CAP(destText())}</b><p>${i<6?`Next milestone: ${fmtN(nx)} ${G.u}. That opens Book ${i+2}.`:`Last step: ${fmtN(S.epic.goal.n)} ${G.u}.`}</p>${headsSvg(true)}</div>`,cap:`${10-headsCut()} heads of ${foeName()} remain. ${daysLeft()} days left.`});
 openPlayer({label:`Book ${i+1}`,title:E.n,sub:`Book ${i+1} of 7 · ${st.n}`,cast:[pid],cards,auto:false,after})}
function playWin(){const E=EPICS[S.epic.id],g=S.epic.goal,c=CHAR[g.pid];
 openPlayer({label:"Vow kept",title:"Sankalpa",sub:"Goal reached",cast:[g.pid],auto:false,cards:[
  {kick:"Goal reached",svg:sceneInner({bg:"lamps",chars:two("rama",c)}),cap:`${CAP(destText())}. Your vow is kept, and Ravana falls.`},
  {kick:"",html:`<div class="dk-charm"><div class="flame big" style="margin:0 auto">${DIYA}</div><b>Vow kept</b><p>${(S.hall||[]).some(h=>h.won)?"":"You earned the <b>Ayodhya diya</b>, a companion for your hero. "}Your rank, gear and trials stay with you. When you are ready, pick your next goal.</p></div>`,cap:""}]})}
function epicCheck(){if(!STORY_ON||!S.epic||EPCHK)return;EPCHK=true;setTimeout(()=>{EPCHK=false;if(!S.on||!S.epic||$(".scrim")||queue.length)return;
 if(epicDone()&&!S.epic.won){S.epic.won=td();save();playWin();render();return}
 const i=arcStage();if(i>(S.epic.seen??-1)){S.epic.seen=i;save();if(i)toast(`Milestone ${i} of 7 reached. A head of Ravana falls`)}
 if(daysLeft()<0&&!epicDone()&&!S.epic.missAsk){S.epic.missAsk=td();save();EP=null;missSheet()}},700)}
/* ================= story trials (v1.19): the Ramayana is your rank ================= */
let TR=null;
const SS=()=>{S.story=S.story||{done:[],cur:null,refl:{},nt:-1};return S.story};
const gateRank=()=>{const t=allTrials();let i=0;ARC_GATE.forEach((g,k)=>{if(t>=g)i=k});return i};
const stDone=()=>{const d=SS().done;let k=0;while(d.includes(k))k++;return k};
const stGate=i=>i<6?ARC_GATE[i+1]:FINALE_GATE;
const stAvail=()=>{const i=stDone();return i<7&&!SS().cur&&allTrials()>=stGate(i)?i:-1};
const stOpts=i=>{const T=STRIALS[i];if(T.fixed==="foes")return FOES.map(([k,l])=>[k,`Free of: ${l.toLowerCase()}`,""]);if(T.fixed)return T.fixed.map(([k,l])=>[k,l,""]);return sel().map(p=>[p,PH[p][T.ph],p])};
const stLabel=(i,k)=>{const o=stOpts(i).find(x=>x[0]===k);return o?o[1]:(PH[k]?PH[k][STRIALS[i].ph]:k)};
const stProg=()=>{const c=SS().cur;if(!c)return 0;return c.ticks.length};
const stNeed=i=>STRIALS[i].kind==="once"?1:STRIALS[i].days;
const stReady=()=>{const c=SS().cur;return c&&stProg()>=stNeed(c.i)};
const stToday=()=>{const c=SS().cur;return c&&c.ticks.includes(td())};
function stCheck(){const c=SS().cur;if(!c||!c.strict||STRIALS[c.i].kind!=="daily"||stReady())return;
 for(let d=c.start;d<td();d=addD(d,1))if(!c.ticks.includes(d)){c.start=td();c.ticks=[];save();setTimeout(()=>toast("A day was missed. Strict mode: your trial starts again today"),600);return}}
function playBook(i,after){const st=EPICS.ramayana.stages[i],pid=companionPid()||sel()[0],g=CHAR[pid];
 const cards=st.scenes.map((sc,k)=>{const w=sc.who.map(x=>x==="G"?g:x).filter((x,j,a)=>a.indexOf(x)===j);return {kick:k?"":`Book ${i+1} · ${st.n}`,svg:sceneInner({bg:sc.bg,chars:w.length>1?two(w[0],w[1]):one(w[0],k?"float":"rise")}),cap:sc.cap.replace("{G}",PEOPLE[g].n)}});
 cards.push({kick:"Your title",html:`<div class="dk-charm"><div class="flame big" style="margin:0 auto">${DIYA}</div><b>${ARC_RANK[i][0]} <span class="dev">${ARC_RANK[i][1]}</span></b><p>${EN[ARC_RANK[i][0]]}.</p></div>`,cap:i<7&&STRIALS[i]?`Next story trial: ${STRIALS[i].n}. It opens after ${stGate(i)} path trials.`:""});
 openPlayer({label:`Book ${i+1}`,title:"Ramayana",sub:`Book ${i+1} of 7 · ${st.n}`,cast:[pid],cards,auto:false,after})}
function playTrialStory(i){const T=STRIALS[i],pid=companionPid()||sel()[0],g=CHAR[pid];
 openPlayer({label:T.n,title:T.n,sub:`Story trial · Book ${i+1}`,cast:[pid],auto:false,cards:T.story.map((sc,k)=>{const w=sc.who.map(x=>x==="G"?g:x).filter((x,j,a)=>a.indexOf(x)===j);return {kick:k?"":"Story trial",svg:sceneInner({bg:sc.bg,chars:w.length>1?two(w[0],w[1]):one(w[0],k?"float":"rise")}),cap:sc.cap}})})}
function dots(n,f){return `<div class="stdots">${Array.from({length:n},(_,k)=>`<i class="${k<f?"on":""}"></i>`).join("")}</div>`}
function stSheet(){const c=SS().cur,i=c?c.i:stAvail();if(i<0)return;const T=STRIALS[i],next=ARC_RANK[Math.min(6,i+1)];
 let h=`<div class="kick" style="color:var(--gold)">Story trial · Book ${i+1} of 7</div><h2>${T.n}<span class="dev">${T.d}</span></h2><p class="sub">${T.theme}</p>
 <button class="cta alt" style="width:100%" data-st="story">Watch the story</button>`;
 if(!c){TR=TR&&TR.i===i?TR:{i,opts:[],strict:false};
  h+=`<div class="box"><small>${PATHS[sel()[0]]?PATHS[sel()[0]].hero:"Your guide"}’s advice</small><ul class="tips">${T.tips.map(t=>`<li>${t}</li>`).join("")}</ul></div>
  <div class="qlabel">Choose how you will do it</div><p class="sub" style="margin-top:-4px">Pick 1. Pick 2 to earn a bonus gift: ${STGIFT[i]}.</p>
  <div class="cchips">${stOpts(i).map(([k,l,p])=>`<button class="chip stopt" data-st="opt:${k}" aria-pressed="${TR.opts.includes(k)}">${p?medal(p,"xs"):""}${l}</button>`).join("")}</div>
  ${T.kind==="daily"?`<div class="qlabel">Mode</div><div class="cchips"><button class="chip" data-st="strict:0" aria-pressed="${!TR.strict}">Gentle: missed days are fine</button><button class="chip" data-st="strict:1" aria-pressed="${TR.strict}">Strict: a missed day restarts it</button></div>`:""}
  <button class="cta" style="width:100%;margin-top:14px" data-st="begin" ${TR.opts.length?"":"disabled"}>Begin the trial</button>
  <p class="sub" style="text-align:center;margin-top:8px">Pass it to become ${next[0]}.</p>`}
 else if(stReady()){TR=TR&&TR.refl?TR:{refl:true,hard:"",lessons:[],note:""};
  h+=`<div class="box"><small>Trial complete</small>${dots(stNeed(i),stProg())}You did it. Before you claim your title, look back for a moment.</div>
  <div class="qlabel">How hard was it?</div><div class="cchips">${HARD.map(([k,l])=>`<button class="chip" data-st="hard:${k}" aria-pressed="${TR.hard===k}">${l}</button>`).join("")}</div>
  <div class="qlabel">What did you learn?</div><div class="cchips">${LESSON.map(([k,l])=>`<button class="chip" data-st="les:${k}" aria-pressed="${TR.lessons.includes(k)}">${l}</button>`).join("")}</div>
  <div class="qlabel">One line for later (optional)</div><input id="stnote" class="name" style="font-size:16px" maxlength="120" placeholder="What will you remember?" value="${esc(TR.note)}">
  <button class="cta" style="width:100%;margin-top:14px" data-st="complete">Complete the trial</button>`}
 else{const k=T.kind,n=stNeed(i),f=stProg(),done=stToday();
  h+=`<div class="box"><small>Your way</small>${c.opts.map(o=>stLabel(i,o)).join(" + ")}${c.opts.length>1?` <span class="mute">· bonus gift</span>`:""}</div>
  ${k==="once"?"":`${dots(n,f)}<p class="sub" style="text-align:center">${f} of ${n} ${k==="count"?"done":"days"}${c.strict?" · strict":""}</p>`}
  ${k==="daily"?(done?`<div class="box" style="text-align:center"><b>Done for today ✓</b><br><span class="mute">Come back tomorrow.</span></div>`:`<button class="cta" style="width:100%" data-st="tick">I kept it today</button>`):`<button class="cta" style="width:100%" data-st="tick">${k==="count"?"I did one":"I did it"}</button>`}
  ${TR&&TR.help?`<div class="box"><small>On a hard day</small>${T.smaller}</div>`:`<button class="linkbtn" data-st="help">Struggling today?</button>`}
  <div class="box"><small>Advice</small><ul class="tips">${T.tips.map(t=>`<li>${t}</li>`).join("")}</ul></div>
  <div class="row"><button class="cta alt" data-st="share">Tell someone</button><button class="cta alt" data-st="quit">Stop this trial</button></div>`}
 const y=$(".sheet")?$(".sheet").scrollTop:0;sheet("var(--gold)",h);if(TR&&TR.keep&&$(".sheet")){$(".sheet").scrollTop=y;TR.keep=false}}
function stStepRow(){const c=SS().cur;if(!c||stReady())return "";const T=STRIALS[c.i],done=T.kind==="daily"?stToday():false;
 return `<button class="ststep${done?" done":""}" data-st="open"><span class="sti">${done?"✓":DIYA}</span><span><small>Story trial · ${T.n}${T.kind==="daily"?` · day ${Math.min(stNeed(c.i),stProg()+(done?0:1))} of ${stNeed(c.i)}`:""}</small><b>${c.opts.map(o=>stLabel(c.i,o)).join(" + ")}</b></span></button>`}
function stCard(){const i=stDone(),c=SS().cur,a=stAvail();
 if(c){const T=STRIALS[c.i];return `<button class="stcard on" data-st="open"><small>Story trial in progress · Book ${c.i+1}</small><b>${T.n}</b>${T.kind==="once"?"":dots(stNeed(c.i),stProg())}<em>${stReady()?"Complete. Tap to claim your title":T.theme}</em></button>`}
 if(a>=0){const T=STRIALS[a];return `<button class="stcard ready" data-st="open"><small>Your story trial is ready · Book ${a+1}</small><b>${T.n}</b><em>${T.theme} Pass it to become ${ARC_RANK[Math.min(6,a+1)][0]}.</em></button>`}
 if(i>=7)return `<div class="stcard"><small>Ramayana complete</small><b>All 7 story trials passed</b><em>Season 2, the Mahabharata, is coming. Your daily path goes on.</em></div>`;
 const need=stGate(i)-allTrials();return `<div class="stcard lock"><small>Next story trial · Book ${i+1}</small><b>${STRIALS[i].n}</b><em>Opens after ${need} more path trial${need===1?"":"s"}. Path trials come when a path’s meter is full.</em></div>`}
function storyBody(){const R=lifeRank(),E=EPICS.ramayana,st=E.stages[R];
 const learn=S.lore!=="well"&&learnLeft()?(()=>{const nx=LEARN.find(x=>!S.learned.includes(x.id));return `<button class="revcard" data-learn="1"><span class="revi">${ic("learn")}</span><span><b>New to these stories? Start here</b><small>Next: ${nx.t}</small></span></button>`})():"";
 return `${learn}<p class="ep-note">Your growth, told as the Ramayana. Path trials open story trials. Pass a story trial to reach the next book and title.</p>
 <div class="ep-goal"><small>Ramayana · Book ${R+1} of 7</small><b>${st.n}<span class="dev">${st.sa}</span></b><span class="eb-row"><em>Your title: ${ARC_RANK[R][0]} · ${EN[ARC_RANK[R][0]]}</em></span></div>
 ${stCard()}
 <ol class="books">${E.stages.map((b,k)=>`<li class="${k<R?"done":k===R?"now":""}"><span class="bn">${k<R?"✓":k+1}</span><span class="bt"><b>${b.n}</b><small>${ARC_RANK[k][0]} · ${k<R?"Done":k===R?"You are here":`Story trial: ${STRIALS[k-1].n}`}</small></span>${k<=R?`<button class="mini" data-st="book:${k}">Watch</button>`:""}</li>`).join("")}</ol>
 <div class="block"><h2>Sankalpa</h2>${epicBody()}</div>${yatraLog()}`}
function stComplete(){const c=SS().cur,i=c.i,note=($("#stnote")||{}).value||"";const st=SS();
 st.refl[i]={hard:TR.hard,lessons:TR.lessons,note:note.trim().slice(0,120),opts:c.opts,d:td()};st.done.push(i);st.cur=null;TR=null;
 const bonus=c.opts.length>1;if(bonus&&!S.charms.some(x=>x.n===STGIFT[i]))S.charms.push({n:STGIFT[i],g:STGUIDE[i],d:td()});
 S.rk=lifeRank();S.seen=stage();save();closeLayer();render();
 if(i<6)playBook(i+1,()=>{if(bonus)toast(`Bonus gift: ${STGIFT[i]}. Find it in Collection`)});
 else pushModal(`<div class="flame big" style="margin:0 auto">${DIYA}</div><div class="kick">Ramayana complete</div><h2>All 7 story trials passed</h2><p>You walked the whole Ramayana. Season 2, the Mahabharata, is coming. Your daily path goes on.</p>`)}
function stShare(){const c=SS().cur,T=STRIALS[c.i],txt=`I’m taking a challenge: ${T.theme} My way: ${c.opts.map(o=>stLabel(c.i,o)).join(" + ")}. Ask me how it’s going!`;
 if(navigator.share){navigator.share({text:txt}).catch(()=>{});return}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(()=>toast("Copied. Paste it in a message")).catch(()=>toast(txt));else toast(txt)}
/* ================= tattoos (v1.22): marks of the mentors you walk with ================= */
// Each symbol is drawn around (0,0) in about a 16px box. f: filled shapes, s: strokes
const INKSYM={
 hanuman:{n:"Gada and sun",f:["M-3 -4a3.4 3.4 0 1 0 6 0a3.4 3.4 0 1 0 -6 0"],s:["M0 -1V7","M-6 -8l-2 -2M6 -8l2 -2M0 -10v-3"]},
 bhima:{n:"Mace and wind",f:["M-4 -3a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"],s:["M0 1V8","M-8 4q3 -3 6 0","M2 6q3 -3 6 0"]},
 patanjali:{n:"Coiled serpent",f:["M4 -7a2 2 0 1 0 0.1 0"],s:["M-6 6q6 -14 10 -9q3 4 -5 6q-6 2 -1 6q4 2 7 -1"]},
 shiva:{n:"Crescent and third eye",f:["M-2 -8a6 6 0 1 0 6 8a5 5 0 1 1 -6 -8z","M3 4a1.5 2.6 0 1 0 0.1 0"],s:[]},
 rama:{n:"Bow and arrow",f:[],s:["M-5 -8q10 8 0 16","M-5 -8v16","M-7 0h14","M5 -2l2 2l-2 2"]},
 lakshmana:{n:"Three arrows",f:[],s:["M-4 7v-14","M0 7v-14","M4 7v-14","M-6 -5l2 -3l2 3M-2 -5l2 -3l2 3M2 -5l2 -3l2 3"]},
 savitri:{n:"Banyan leaf",f:["M0 -8q8 4 0 14q-8 -10 0 -14z"],s:["M0 -6v12"]},
 parvati:{n:"Mountain and lotus",f:["M-8 6l5 -9l3 4l3 -6l5 11z"],s:["M-3 -6q3 -4 6 0"]},
 saraswati:{n:"Lotus",f:["M0 4q-7 -3 -6 -10q4 2 6 10z","M0 4q7 -3 6 -10q-4 2 -6 10z","M0 4q-2 -8 0 -12q2 4 0 12z"],s:["M-7 6h14"]},
 ganesha:{n:"Modak",f:["M0 -8q7 8 6 12q-6 4 -12 0q-1 -4 6 -12z"],s:["M-3 -3l1 7M0 -5v9M3 -3l-1 7"]},
 arjuna:{n:"The bird’s eye",f:["M0 0a2 2 0 1 0 0.1 0"],s:["M-7 0q7 -8 14 0q-7 8 -14 0","M-10 9l6 -5"]},
 ekalavya:{n:"Feather",f:["M3 -9q-10 6 -6 16q8 -6 6 -16z"],s:["M-4 9l6 -15"]},
 narada:{n:"Veena",f:["M-6 6a3 3 0 1 0 0.1 0","M5 -5a2.5 2.5 0 1 0 0.1 0"],s:["M-4 4l8 -8"]},
 dhruva:{n:"Pole star",f:["M0 -9l2.2 6.8l6.8 2.2l-6.8 2.2l-2.2 6.8l-2.2 -6.8l-6.8 -2.2l6.8 -2.2z"],s:[]},
 krishna:{n:"Peacock feather",f:["M0 -2a2.4 3 0 1 0 0.1 0"],s:["M0 -9q8 6 0 12q-8 -6 0 -12","M0 3v7"]},
 lakshmi:{n:"Kalasha",f:["M-6 0q0 8 6 8q6 0 6 -8z"],s:["M-4 0v-3h8v3","M-4 -3q-2 -4 0 -6M4 -3q2 -4 0 -6M0 -3v-6"]},
 kubera:{n:"Coins",f:["M-6 4a6 2.4 0 1 0 12 0a6 2.4 0 1 0 -12 0","M-6 -1a6 2.4 0 1 0 12 0a6 2.4 0 1 0 -12 0"],s:["M-6 -6a6 2.4 0 1 0 12 0a6 2.4 0 1 0 -12 0"]},
 durga:{n:"Trishula",f:[],s:["M0 9v-17","M-6 -6q0 6 6 6q6 0 6 -6","M-6 -6v-3M6 -6v-3M0 -8v-2"]},
 abhimanyu:{n:"Chariot wheel",f:["M0 0a2 2 0 1 0 0.1 0"],s:["M-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0","M0 -7v14M-7 0h14M-5 -5l10 10M5 -5l-10 10"]},
 nachiketa:{n:"Sacred flame",f:["M0 -9q7 7 4 12q-4 4 -8 0q-3 -5 4 -12z"],s:["M-6 8h12"]},
 vishwakarma:{n:"Vajra",f:["M0 0a2 2 0 1 0 0.1 0"],s:["M0 -9v18","M-4 -7q4 -4 8 0M-4 7q4 4 8 0"]},
 valmiki:{n:"Stylus and leaf",f:["M-6 6q2 -8 10 -10q-2 8 -10 10z"],s:["M-8 8l14 -14"]},
 shabari:{n:"Berries",f:["M-3 3a3 3 0 1 0 0.1 0","M3 3a3 3 0 1 0 0.1 0"],s:["M-3 0q3 -6 0 -9M3 0q-1 -5 3 -8"]}};
Object.assign(INKSYM,{
 sita:{n:"Blade of grass",f:[],s:["M0 9q-1 -10 3 -18","M0 9q-4 -8 -7 -12","M0 9q4 -6 8 -9","M-8 9h16"]},
 markandeya:{n:"Rudraksha",f:["M0 0a3 3 0 1 0 0.1 0"],s:["M-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0","M0 -7v-3M0 7v3"]},
 buddha:{n:"Bodhi leaf",f:["M0 9q-9 -6 -7 -12q2 -5 7 -2q5 -3 7 2q2 6 -7 12z"],s:["M0 9v-12"]},
 radha:{n:"Anklet bells",f:["M-6 4a2.2 2.2 0 1 0 0.1 0","M0 6a2.2 2.2 0 1 0 0.1 0","M6 4a2.2 2.2 0 1 0 0.1 0"],s:["M-9 0q9 6 18 0"]},
 vishwamitra:{n:"Rising sun",f:["M-6 4a6 6 0 0 1 12 0z"],s:["M-9 6h18","M0 -6v-3M-6 -3l-2 -2M6 -3l2 -2"]},
 karna:{n:"Sun earrings",f:["M-4 -2a4 4 0 1 0 8 0a4 4 0 1 0 -8 0","M0 4l-2 5h4z"],s:["M-8 -2h-2M8 -2h2M0 -8v-2"]},
 bharata:{n:"Rama’s sandals",f:["M-6 -6q4 -3 4 6q0 6 -4 6q-3 -6 0 -12z","M6 -6q-4 -3 -4 6q0 6 4 6q3 -6 0 -12z"],s:[]},
 nala:{n:"Floating stone",f:["M-6 -1a6 4 0 1 0 12 0a6 4 0 1 0 -12 0"],s:["M-9 6q3 -3 6 0q3 3 6 0q3 -3 6 0"]},
 vyasa:{n:"Four Vedas",f:[],s:["M-7 -7h14","M-7 -2h14","M-7 3h14","M-7 8h14"]},
 sudama:{n:"Handful of rice",f:["M-7 0q7 9 14 0z"],s:["M-3 -2v-1M0 -3v-1M3 -2v-1"]},
 tumburu:{n:"Celestial notes",f:["M-5 5a2.5 2 0 1 0 0.1 0","M4 2a2.5 2 0 1 0 0.1 0"],s:["M-2.5 5v-12l9 -3v12"]},
 vasishtha:{n:"Seven sages and Arundhati",f:["M-7 -4a1.4 1.4 0 1 0 0.1 0","M-3 -6a1.4 1.4 0 1 0 0.1 0","M1 -5a1.4 1.4 0 1 0 0.1 0","M4 -1a1.4 1.4 0 1 0 0.1 0","M8 0a1.4 1.4 0 1 0 0.1 0","M7 5a1.4 1.4 0 1 0 0.1 0","M3 5a1.4 1.4 0 1 0 0.1 0"],s:["M5 0a0.6 0.6 0 1 0 0.1 0"]}});

// Body spots in order of earning: [x, y, rotation] relative to body width sh
const INKSPOT=[sh=>[100+sh+9,108,10],sh=>[100-sh-9,108,-10],sh=>[100+sh+8,134,6],sh=>[100-sh-8,134,-6],sh=>[100,100,0],sh=>[100,77,0],sh=>[100+sh-7,92,0],sh=>[100-sh+7,92,0],sh=>[100,119,0],sh=>[100-sh-6,146,0],sh=>[100+sh+6,146,0],sh=>[100-sh/2+1,110,0],sh=>[100+sh/2-1,110,0],sh=>[91,214,0],sh=>[109,214,0],sh=>[100-sh-9,121,-8]];
const INK="#24305e";
function inkSvg(g,full,x,y,r,k){const Y=INKSYM[g];if(!Y)return "";k=k||.8;
 const fs=Y.f.map(d=>full?`<path d="${d}" fill="${INK}" stroke="${INK}" stroke-width="1"/>`:`<path d="${d}" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="2 1.4"/>`).join(""),ss=Y.s.map(d=>`<path d="${d}" fill="none" stroke="${INK}" stroke-width="${full?1.6:1.2}" stroke-linecap="round" ${full?"":`stroke-dasharray="2 1.4"`}/>`).join("");
 return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${k})" opacity="${full?.88:.6}">${fs}${ss}</g>`}
function inkCheck(){S.ink=S.ink||[];const news=[];
 ORDER.forEach(p=>{const m=S.prog[p]?S.prog[p].m:0,g=CHAR[p];if(m<2||!INKSYM[g])return;let e=S.ink.find(x=>x.pid===p&&x.g===g);
  if(!e&&(m>=5||!S.ink.some(x=>x.pid===p))){e={pid:p,g,full:m>=5,spot:S.ink.length%INKSPOT.length,d:td()};S.ink.push(e);news.push([e,false])}
  else if(e&&m>=5&&!e.full){e.full=true;news.push([e,true])}});
 return news}
function inkLayer(sh){if(S.hideInk||!S.ink)return "";return S.ink.map(e=>{const[x,y,r]=INKSPOT[e.spot](sh);return inkSvg(e.g,e.full,x,y,r,e.spot>=13?.6:.8)}).join("")}
function inkAnnounce(news){if(news.length>2){pushModal(`<div style="width:150px;margin:0 auto">${avatar(stage())}</div><div class="kick">Marks of your mentors</div><h2>${news.length} marks appear</h2><p>Every mentor who is awake in you leaves a mark on your hero: an outline first, fully inked when they are one with you. See them all on your gear screen.</p><button class="cta" style="width:100%" data-herosheet="1">See my marks</button>`);return}
 news.forEach(([e,filled])=>{filled=filled||e.full;const Y=INKSYM[e.g],pp=PEOPLE[e.g];
 pushModal(`<div style="width:150px;margin:0 auto">${avatar(stage())}</div><div class="kick">${filled?"Your mark is complete":"A new mark appears"}</div><h2>${pp.n}’s ${Y.n.toLowerCase()}</h2><p>${filled?`Your inner ${pp.n} is one with you. The mark is fully inked, and it stays for life.`:`Your inner ${pp.n} is awake. The outline of ${HIS(e.g)} mark appears on your hero. It fills in when ${HE(e.g)} is one with you.`}</p>`)})}
/* ================= identity lines + Life card (v1.23) ================= */
let IDX=null;
const idOf=pid=>(S.ident||{})[pid]||"";
const idText=pid=>idOf(pid)?`I am becoming ${idOf(pid)}.`:"";
function identSheet(pid){const P=PATHS[pid],g=CHAR[pid],sug=IDLINES[g]||[];IDX=IDX&&IDX.pid===pid?IDX:{pid,v:idOf(pid)};
 sheet(P.c,`<div class="kick" style="color:${P.c}">${P.name} · your inner ${P.hero}</div><h2>Who are you becoming?</h2><p class="sub">One line that describes the person this path is shaping. You will see it each morning and in your weekly review.</p>
 <div class="idbox"><span>I am becoming</span><input id="idin" class="name" maxlength="90" value="${esc(IDX.v)}" placeholder="${esc(sug[0]||"…")}" style="font-size:16px"></div>
 <div class="qlabel">Ideas from ${P.hero}</div><div class="mlist">${sug.map((t,i)=>`<button class="idsug${IDX.v===t?" on":""}" data-idsug="${i}">I am becoming ${t}.</button>`).join("")}</div>
 <div class="row" style="margin-top:14px">${idOf(pid)?`<button class="cta alt" data-idclear="1">Remove</button>`:""}<button class="cta" data-idsave="1">Save</button></div>`)}
function lifeCard(){const ps=sel(),L=ps.filter(idOf);
 const pv=(S.pvals||[]);
 return `<div class="lifec"><div class="kick" style="color:var(--gold)">The life I’m building</div>
 ${L.length?`<ul class="lifel">${L.map(p=>`<li style="--c:${PATHS[p].c}">${medalA(p,"xs")}<span>I am becoming ${esc(idOf(p))}.</span></li>`).join("")}</ul>`:`<p class="sub">Add an “I am becoming…” line to your paths, and your life card appears here.</p>`}
 ${ps.filter(p=>!idOf(p)).length?`<div class="cchips" style="margin:8px 0 0">${ps.filter(p=>!idOf(p)).map(p=>`<button class="chip" data-ident="${p}">+ ${PATHS[p].name}</button>`).join("")}</div>`:""}
 <p class="lifew">Walking with ${ps.map(p=>PATHS[p].hero).join(", ")}</p>
 <div class="lifep"><small>In a partner I value <span class="mute">· private unless you share it</span></small>${pv.length?`<b>${pv.map(esc).join(" · ")}</b>`:`<span class="mute">Not set</span>`}<button class="mini" data-pvals="1">${pv.length?"Edit":"Add"}</button></div>
 ${L.length?`<button class="cta alt" style="width:100%;margin-top:10px" data-lifeshare="1">Share my life card</button>`:""}</div>`}
let PVX=null;
function pvalSheet(){PVX=PVX||{v:[...(S.pvals||[])],share:!!S.pshare};const opts=[...new Set([...sel().map(p=>PVALUE[p]),...PVALUE_ALL])];
 sheet("var(--gold)",`<div class="kick" style="color:var(--gold)">Private</div><h2>In a partner, I value…</h2><p class="sub">Pick up to 4. It helps you stay clear about the life you are building and who would add to it. It stays on this phone.</p>
 <div class="cchips">${opts.map(o=>`<button class="chip" data-pv="${esc(o)}" aria-pressed="${PVX.v.includes(o)}">${o}</button>`).join("")}</div>
 <div class="cchips" style="margin-top:12px"><button class="chip" data-pvshare="1" aria-pressed="${PVX.share}">Include it when I share my life card</button></div>
 <button class="cta" style="width:100%;margin-top:14px" data-pvsave="1">Save</button>`)}
function lifeShare(){const ps=sel().filter(idOf),W=600,lines=ps.map(p=>`I am becoming ${idOf(p)}.`),pv=S.pshare&&(S.pvals||[]).length?`In a partner I value: ${(S.pvals||[]).join(", ")}.`:"";
 const txt=`The life I’m building\n${lines.join("\n")}\nWalking with ${sel().map(p=>PATHS[p].hero).join(", ")}.${pv?"\n"+pv:""}\n— made with Abhyasa`;
 const wrap=(t,n)=>{const w=t.split(" "),o=[];let c="";w.forEach(x=>{if((c+" "+x).trim().length>n){o.push(c.trim());c=x}else c+=" "+x});if(c.trim())o.push(c.trim());return o};
 let y=150,body="";ps.forEach(p=>{body+=`<g transform="translate(40 ${y-32}) scale(.42)"><circle cx="60" cy="60" r="60" fill="#fff" stroke="${PATHS[p].c}" stroke-width="6"/>${portraitG(CHAR[p])}</g>`;wrap(`I am becoming ${idOf(p)}.`,34).forEach((l,i)=>{body+=`<text x="105" y="${y+i*30}" font-family="Georgia,serif" font-size="24" fill="#1d1f26">${esc(l)}</text>`});y+=Math.max(70,wrap(`I am becoming ${idOf(p)}.`,34).length*30+26)});
 if(pv){wrap(pv,44).forEach((l,i)=>{body+=`<text x="40" y="${y+10+i*28}" font-family="Helvetica,Arial,sans-serif" font-size="20" fill="#6b5a3a">${esc(l)}</text>`});y+=wrap(pv,44).length*28+20}
 const H=y+80,svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#f6ecd6"/><rect x="14" y="14" width="${W-28}" height="${H-28}" rx="24" fill="none" stroke="#86611b" stroke-width="3"/><text x="40" y="80" font-family="Georgia,serif" font-size="34" font-weight="bold" fill="#1d1f26">The life I’m building</text>${body}<text x="40" y="${H-40}" font-family="Helvetica,Arial,sans-serif" font-size="18" fill="#86611b">Walking with ${esc(sel().map(p=>PATHS[p].hero).join(", "))} · Abhyasa</text></svg>`;
 const fallback=()=>{if(navigator.share)navigator.share({text:txt}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(txt).then(()=>toast("Copied your life card")).catch(()=>toast("Could not share here"))};
 try{const img=new Image();img.onload=()=>{try{const c=document.createElement("canvas");c.width=W*2;c.height=H*2;const x=c.getContext("2d");x.scale(2,2);x.drawImage(img,0,0);c.toBlob(b=>{try{const f=new File([b],"my-life-card.png",{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f],text:txt}).catch(()=>{});else fallback()}catch(e){fallback()}},"image/png")}catch(e){fallback()}};img.onerror=fallback;img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)}catch(e){fallback()}}
/* ================= smarter routines (v1.24) ================= */
const LIFE=()=>S.life||{};
const busyToday=c=>{c=c||checkToday();if(c.d===td()&&c.busy!==undefined)return !!c.busy;return (LIFE().busy||[]).includes(new Date().getDay())};
function kitBlocked(x,pid){const seen=S.kitSeen||[];for(const p of Object.keys(KITP))for(const it of KITP[p]){const re=it[2];if(re&&seen.includes(it[0])&&!S.kit.includes(it[0])&&re.test(x.t))return true}return false}
function progT(t){const f=(S.pg||{})[t];if(!f||f===1)return t;return t.replace(/(\d+(?:\.\d+)?)(\s*)(sec|seconds|second|min|minutes|reps|push-ups|squats|lunges|km|metres|meters|pages|words|breaths|rounds)\b/gi,(m,n,s,u)=>{let v=+n*f;v=/km/i.test(u)?Math.max(.5,Math.round(v*2)/2):Math.max(1,Math.round(v));return v+s+u})}
const idFreq=pid=>{const t=idOf(pid);if(!t)return 0;const m=t.match(/(\d+)\s*(?:times|days|x)\s*(?:a|per)\s*week/i);if(m)return Math.min(7,+m[1]);if(/every (day|morning|evening|night)|daily/i.test(t))return 7;return 0};
const weekDaysDone=pid=>{const mon=monOf(td());return new Set(S.log.filter(l=>l.pid===pid&&l.d>=mon).map(l=>l.d)).size};
const behindFreq=pid=>{const f=idFreq(pid);if(!f)return false;const el=(new Date().getDay()+6)%7+1;return weekDaysDone(pid)<Math.ceil(f*el/7)};
function prefH(pid){const L=S.log.filter(l=>l.pid===pid&&l.h!==undefined).slice(-20);if(L.length>=3)return L.reduce((a,l)=>a+l.h,0)/L.length;const b=LIFE().best;return b?BEST_H[b]:null}
function timeSort(items){const h=new Date().getHours(),rank={trial:0,anchor:1,task:2,bridge:3};
 return items.slice().sort((a,b)=>(a.done-b.done)||(rank[a.kind]-rank[b.kind])||(a.kind==="task"&&b.kind==="task"?((x=>x===null?6:Math.abs(x-h))(prefH(a.pid))-(x=>x===null?6:Math.abs(x-h))(prefH(b.pid))):0))}
function styleScore(x,pid){const st=MSTYLE[CHAR[pid]];let s=0,why="";if(st){if(st.re.test(x.t)){s+=.8;why=`${PATHS[pid].hero}’s style`}if(st.len==="long"&&x.m>=20)s+=.4;if(st.len==="short"&&x.m<=10)s+=.4}
 const d=(S.diff||{})[pid]||0;if(d>=2&&x.en>=2)s+=.6;if(d<=-2&&x.en===1)s+=.6;
 const L=LIFE();if(L.live==="kids"&&/kid|child|family|together/i.test(x.t))s+=.6;if(L.space==="small"&&/jump|burpee|skipping|sprint/i.test(x.t))s-=2;if(L.work==="remote"&&/posture|desk|walk/i.test(x.t)){const h=new Date().getHours();if(h>=11&&h<=15)s+=.6}
 if(busyToday())s-=x.m/4;
 return{s,why}}
function askFeel(it){if(!it||it.kind!=="task")return;const L=L_(it.t);if((L.tfn||0)>=3)return;L.tfn=(L.tfn||0)+1;const old=$("#fbar");if(old)old.remove();
 document.body.insertAdjacentHTML("beforeend",`<div id="fbar" class="fbar" role="group" aria-label="How was that task?"><span>How was it?</span><button data-tf="${it.id}:easy">Too easy</button><button data-tf="${it.id}:right">Right</button><button data-tf="${it.id}:hard">Too hard</button></div>`);
 clearTimeout(askFeel.t);askFeel.t=setTimeout(()=>{const b=$("#fbar");if(b)b.remove()},8000)}
function tfApply(id,v){const it=S.plan.items.find(x=>x.id===id)||{};const b=$("#fbar");if(b)b.remove();if(!it.t)return;
 S.diff=S.diff||{};S.pg=S.pg||{};const p=it.pid,d=S.diff[p]||0;S.diff[p]=v==="easy"?Math.min(3,d+1):v==="hard"?Math.max(-3,d-1):d>0?d-1:d<0?d+1:0;
 const num=/\d/.test(it.t);if(num&&v==="easy")S.pg[it.t]=Math.min(3,(S.pg[it.t]||1)*1.25);if(num&&v==="hard")S.pg[it.t]=Math.max(.5,(S.pg[it.t]||1)*.8);
 save();toast(v==="easy"?(num?"Noted. Next time it grows a step":"Noted. Harder tasks are coming"):v==="hard"?(num?"Noted. Next time it eases off":"Noted. Gentler tasks for now"):"Good. Keep that pace")}
let FX=null;
function fitBody(o,pre){const ps=o.paths;return `${LIFEQ.map(([k,l,opts])=>`<div class="qlabel">${l}</div><div class="cchips">${opts.map(([v,t])=>`<button class="chip" data-${pre}life="${k}:${v}" aria-pressed="${o.life[k]===v}">${t}</button>`).join("")}</div>`).join("")}
 <div class="qlabel">My busiest days <span class="mute">· shorter tasks on these days</span></div><div class="cchips">${[1,2,3,4,5,6,0].map(dw=>`<button class="chip" data-${pre}busy="${dw}" aria-pressed="${(o.life.busy||[]).includes(dw)}">${DAYS[dw].slice(0,3)}</button>`).join("")}</div>
 ${ps.filter(p=>KITP[p]).map(p=>`<div class="qlabel">${PATHS[p].name}: what do you have?</div><div class="cchips">${KITP[p].map(([k,l])=>`<button class="chip" data-${pre}kit="${k}" aria-pressed="${o.kit.includes(k)}">${l}</button>`).join("")}</div>`).join("")}`}
function fitSheet(){FX=FX||{life:JSON.parse(JSON.stringify(S.life||{})),kit:[...S.kit],paths:sel()};FX.life.busy=FX.life.busy||[];
 const y=$(".sheet")?$(".sheet").scrollTop:0;sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Fit your tasks</div><h2>Your life and your kit</h2><p class="sub">A few taps, so Abhyasa only suggests what fits your day. Everything stays on this phone.</p>${fitBody(FX,"f")}<button class="cta" style="width:100%;margin-top:16px" data-fsave="1">Save</button>`);if($(".sheet"))$(".sheet").scrollTop=y}
/* ================= one question a day after a fast start (v1.25) ================= */
const OQ=[
 {k:"mentor",t:"Who will awaken in you?",s:"Pick the mentor for each path",ok:()=>sel().some(p=>MENTORS[p])},
 {k:"fit",t:"Fit tasks to your life",s:"Your kit, your space, your busy days",ok:()=>!S.fitDone},
 {k:"routine",t:"What do you already do each week?",s:"Your routine counts as practice",ok:()=>ACTS.some(a=>S.paths.includes(a.pid))},
 {k:"ident",t:"Who are you becoming?",s:"One line for one path",ok:()=>sel().some(p=>!idOf(p))},
 {k:"tags",t:"What do you focus on?",s:"Tasks match what you care about",ok:()=>sel().some(p=>PATHS[p].tags&&PATHS[p].tags.length)},
 {k:"enemy",t:"What holds you back most?",s:"Name one of the six inner enemies",ok:()=>!(S.enemies||[]).length},
 {k:"lore",t:"How well do you know these stories?",s:"So explanations fit you",ok:()=>true}];
function onbNext(){const O=S.onb;if(!O||diff(O.start,td())<1||O.skip===td()||O.lastDone===td())return null;return OQ.find(q=>!O.asked.includes(q.k)&&q.ok())||null}
function onbDone(k){const O=S.onb;if(O&&!O.asked.includes(k)){O.asked.push(k);O.lastDone=td()}}
let OX=null;
function onbOpen(k){
 if(k==="mentor"){const ps=sel().filter(p=>MENTORS[p]);sheet("var(--gold)",`<div class="kick" style="color:var(--gold)">One question</div><h2>Who will awaken in you?</h2><p class="sub">Each path has a mentor. Tap to switch, or keep the default.</p>${ps.map(p=>`<div class="qlabel">${PATHS[p].name}</div><div class="mlist">${MENTORS[p].map(g=>mCard(p,g,CHAR[p]===g,`data-omsel="${p}:${g}"`)).join("")}</div>`).join("")}<button class="cta" style="width:100%;margin-top:14px" data-odone="mentor">Done</button>`);return}
 if(k==="fit"){FX=null;fitSheet();return}
 if(k==="routine"){OX=OX||{a:JSON.parse(JSON.stringify(S.anchors||{}))};const acts=ACTS.filter(a=>S.paths.includes(a.pid));
  const y=$(".sheet")?$(".sheet").scrollTop:0;sheet("var(--gold)",`<div class="kick" style="color:var(--gold)">One question</div><h2>What do you already do each week?</h2><p class="sub">Tap the days. These count as practice, and new tasks are planned around them.</p><div class="rtable">${acts.map(a=>`<div class="rrow"><div class="rname"><span class="dot" style="--c:${PATHS[a.pid].c}"></span>${a.n}<small>about ${a.m} min</small></div><div class="rdays">${[1,2,3,4,5,6,0].map(d=>`<button class="day" data-oday="${a.id}:${d}" aria-pressed="${(OX.a[a.id]||[]).includes(d)}">${DAYS[d].slice(0,2)}</button>`).join("")}</div></div>`).join("")}</div><button class="cta" style="width:100%;margin-top:14px" data-osave="routine">Save</button>`);if($(".sheet"))$(".sheet").scrollTop=y;return}
 if(k==="ident"){const p=sel().find(x=>!idOf(x));IDX=null;identSheet(p);return}
 if(k==="tags"){OX=OX||{t:JSON.parse(JSON.stringify(S.tags||{}))};const ps=sel().filter(p=>PATHS[p].tags&&PATHS[p].tags.length);
  const y=$(".sheet")?$(".sheet").scrollTop:0;sheet("var(--gold)",`<div class="kick" style="color:var(--gold)">One question</div><h2>What do you focus on?</h2><p class="sub">Pick any. Tasks will match.</p>${ps.map(p=>`<div class="qlabel">${PATHS[p].name}</div><div class="cchips">${PATHS[p].tags.map(([t,l])=>`<button class="chip" data-otag="${p}:${t}" aria-pressed="${(OX.t[p]||[]).includes(t)}">${l}</button>`).join("")}</div>`).join("")}<button class="cta" style="width:100%;margin-top:14px" data-osave="tags">Save</button>`);if($(".sheet"))$(".sheet").scrollTop=y;return}
 if(k==="enemy"){EPK=null;enemyPick();return}
 if(k==="lore"){sheet("var(--gold)",`<div class="kick" style="color:var(--gold)">One question</div><h2>How well do you know these stories?</h2><p class="sub">The Ramayana, Mahabharata and Puranas. You don’t need to be religious.</p><div class="mlist">${[["well","I know them well","Fewer explanations"],["some","A little","Short intros"],["new","They’re new to me","Intros and explainers along the way"]].map(([v,l,d])=>`<button class="idsug" data-olore="${v}"><b>${l}</b><br><span class="mute">${d}</span></button>`).join("")}</div>`)}}
function todayHead(){const all=sel(),ps=todayPs(),n=all.length,sw=n<=3?9:6,gap=1.5,R0=30;let svg="",tD=0,tP=0;
 all.forEach(pid=>{const m=todayMins(pid);tD+=m.done;tP+=m.plan});
 if(n>5){const C=2*Math.PI*R0,f=tP?Math.min(1,tD/tP):0;svg=`<circle cx="36" cy="36" r="${R0}" fill="none" stroke="var(--gold)" stroke-opacity=".18" stroke-width="10"/><circle cx="36" cy="36" r="${R0}" fill="none" stroke="var(--gold)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C*(1-f)).toFixed(1)}" transform="rotate(-90 36 36)"/>`}
 else all.forEach((pid,i)=>{const r=R0-i*(sw+gap),C=2*Math.PI*r,m=todayMins(pid),f=m.plan?Math.min(1,m.done/m.plan):0,P=PATHS[pid];
  svg+=`<circle cx="36" cy="36" r="${r}" fill="none" stroke="${P.c}" stroke-opacity=".16" stroke-width="${sw}"/><circle class="tr-p" data-p="${pid}" cx="36" cy="36" r="${r}" fill="none" stroke="${P.c}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C*(1-f)).toFixed(1)}" style="--C:${C.toFixed(1)}" transform="rotate(-90 36 36)"/>`});
 const tasks=S.plan.items.filter(x=>x.kind==="task"||x.kind==="anchor"),dn=tasks.filter(x=>x.done).length,many=sel().length>DAYMAX;
 return `<div class="thd"><button class="thd-r" data-seg-go="journey:paths" aria-label="Today: ${tD} of ${tP} minutes done"><svg viewBox="0 0 72 72">${svg}</svg><span class="thd-t"><b>${tD}<small> / ${tP} min</small></b><small>${dn} of ${tasks.length} tasks${tP&&tD>=tP?" · all closed 🎉":""}</small></span></button>
 </div>`}
/* ================= minimal UI: settings hub + avatar zoom (v1.26) ================= */
Object.assign(ICO,{calendar:`<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>`,gear:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>`,
 zoom:`<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>`,minus:`<path d="M5 12h14"/>`,plus:`<path d="M12 5v14M5 12h14"/>`,x:`<path d="M6 6l12 12M18 6L6 18"/>`,
 user:`<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>`,data:`<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>`,help:`<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>`,book:`<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>`,warn:`<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17h.01"/>`});
const srow=(icon,title,sub,attr,cls)=>`<button class="srow${cls?" "+cls:""}" ${attr}><span class="sri">${ic(icon)}</span><span><b>${title}</b>${sub?`<small>${sub}</small>`:""}</span><span class="srar">›</span></button>`;
function settingsSheet(){const y=$(".sheet")?$(".sheet").scrollTop:0;
 sheet("var(--ink)",`<div class="setg" data-set="1"><h2>Settings</h2><p class="sub">Abhyasa has no account. Everything is saved on this phone only.</p>
 <div class="sgrp"><div class="sgh"><span class="sri">${ic("user")}</span><span><b>You</b><small>Paths, life, routine and setup</small></span></div>${srow("user","Paths and focus",`${sel().length} of ${MAXP} paths`,'data-focus-manage="1"')}${srow("sun","Your life and kit","Space, busy days, equipment",'data-fit="1"')}${srow("path","Weekly routine","What you already do",'data-act="routine"')}${srow("moon","Rest days",(S.rest||[]).filter(r=>r.d>=td()).length?`${(S.rest||[]).filter(r=>r.d>=td()).length} planned`:"Plan a day off without losing your streak",'data-rest="1"')}${srow("hero","Retake setup","Answer all questions again",'data-act="redo"')}${srow("warn","Your inner enemies",myEnemies().length?myEnemies().map(e=>e.antN).join(", "):"Not chosen yet",'data-enpick="1"')}</div>
 <div class="sgrp"><div class="sgh"><span class="sri">${ic("book")}</span><span><b>Stories and calendar</b><small>Learn, glossary and what you see</small></span></div>${srow("learn","Learn","The app and the stories behind it",'data-learn="1"')}${srow("book","Glossary","Every term used in the app",'data-gloss="1"')}
  <div class="sin"><b>How well you know the stories</b><div class="cchips">${[["well","Well"],["some","A little"],["new","New to me"]].map(([k,l])=>`<button class="chip" data-lore="${k}" aria-pressed="${S.lore===k}">${l}</button>`).join("")}</div></div>
  <div class="sin"><b>Calendar</b><div class="cchips">${[["indian","Indian festivals"],["seasons","Seasons"],["none","None"]].map(([k,l])=>`<button class="chip" data-calmode="${k}" aria-pressed="${calMode()===k}">${l}</button>`).join("")}</div></div></div>
 <div class="sgrp"><div class="sgh"><span class="sri">${ic("data")}</span><span><b>Your data</b><small>Saved only on this phone</small></span></div>${srow("data","Save a backup",S.lastBackup?`Last: ${S.lastBackup.split("-").reverse().join(".")}`:"Never backed up",'data-act="export"')}${srow("data","Restore a backup","From a file you saved",'data-act="import"')}<input type="file" id="importf" accept="application/json,.json" hidden></div>
 <div class="sgrp"><div class="sgh"><span class="sri">${ic("bell")}</span><span><b>Reminders</b><small>Alerts from your phone’s calendar</small></span></div>${srow("bell","Add reminders to your calendar",S.remind?"Made · tap to make a new file":"Morning, evening and weekly alerts",'data-remind="1"')}</div>
 <div class="sgrp"><div class="sgh"><span class="sri">${ic("help")}</span><span><b>Help</b><small>Feedback, tips and install</small></span></div>${srow("love","Send feedback","Ideas, bugs or stories",'data-feedback="1"')}${srow("help","Show tips again","",'data-tips-on="1"')}${isStandalone()?"":srow("sun","Install Abhyasa",isIOS()?"Share → Add to Home Screen":"Add it to your home screen",DPROMPT?'data-act="install"':'data-noop="1"')}</div>
 <div class="sgrp danger"><div class="sgh"><span class="sri">${ic("warn")}</span><span><b>Start over</b><small>The “log out” for this phone</small></span></div><button class="srow danger" data-act="reset"><span class="sri">${ic("warn")}</span><span><b>Reset everything</b><small>Erases all progress on this phone. Tap twice.</small></span></button></div>
 <p class="sub" style="text-align:center;margin:14px 0 4px">Abhyasa ${APP_VERSION}</p></div>`);
 if($(".sheet"))$(".sheet").scrollTop=y}
let ZV=null;
function zoomOpen(){const st=stage(),sh=24+Math.min(5,S.prog.body?S.prog.body.m:0)*1.6;ZV={x:-10,y:-10,w:220,h:250,sh,gear:true,st};
 const marks=(S.ink||[]).filter(()=>!S.hideInk);
 document.body.insertAdjacentHTML("beforeend",`<div class="zoomv" role="dialog" aria-label="Your hero, zoomed"><div class="zbar"><b>Your hero</b><button class="zb" data-zm="x" aria-label="Close">${ic("x")}</button></div>
 <div class="zstage" id="zstage">${avatar(st)}</div>
 <div class="zctl"><button class="zb" data-zm="out" aria-label="Zoom out">${ic("minus")}</button><button class="zb" data-zm="fit">Full view</button><button class="zb" data-zm="in" aria-label="Zoom in">${ic("plus")}</button><button class="zb" data-zm="gear" id="zgear" aria-pressed="false">Hide gear</button></div>
 ${marks.length?`<div class="zmarks">${marks.map((e,i)=>`<button class="zmk" data-zm="m${i}"><svg viewBox="-12 -12 24 24">${inkSvg(e.g,e.full,0,0,0,1)}</svg>${PEOPLE[e.g].n}</button>`).join("")}</div>`:`<p class="zhint">Your mentors’ marks appear here as they awaken in you.</p>`}
 <p class="zhint">Pinch or use + and −. Drag to move.</p></div>`);
 zApply();zBind()}
function zApply(){const s=$("#zstage svg");if(s&&ZV)s.setAttribute("viewBox",`${ZV.x.toFixed(1)} ${ZV.y.toFixed(1)} ${ZV.w.toFixed(1)} ${ZV.h.toFixed(1)}`)}
function zScale(f,cx,cy){if(!ZV)return;const nw=Math.max(30,Math.min(220,ZV.w*f)),k=nw/ZV.w;cx=cx??ZV.x+ZV.w/2;cy=cy??ZV.y+ZV.h/2;ZV.x=cx-(cx-ZV.x)*k;ZV.y=cy-(cy-ZV.y)*k;ZV.w=nw;ZV.h=nw*250/220;zApply()}
function zGear(on){ZV.gear=on;const z=$("#zstage");if(z)z.innerHTML=avatar(ZV.st,on?undefined:{});const b=$("#zgear");if(b){b.textContent=on?"Hide gear":"Show gear";b.setAttribute("aria-pressed",String(!on))}zApply()}
function zFocus(e){if(ZV.gear)zGear(false);const[x,y]=INKSPOT[e.spot](ZV.sh);ZV.w=80;ZV.h=56*250/220;ZV.x=x-ZV.w/2;ZV.y=y-ZV.h/2;zApply()}
function zBind(){const el=$("#zstage");if(!el)return;const P=new Map();let d0=0,w0=0;
 el.addEventListener("pointerdown",e=>{el.setPointerCapture(e.pointerId);P.set(e.pointerId,{x:e.clientX,y:e.clientY});if(P.size===2){const[a,b]=[...P.values()];d0=Math.hypot(a.x-b.x,a.y-b.y);w0=ZV.w}});
 el.addEventListener("pointermove",e=>{if(!P.has(e.pointerId)||!ZV)return;const prev=P.get(e.pointerId),r=el.getBoundingClientRect();P.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(P.size===2){const[a,b]=[...P.values()],d=Math.hypot(a.x-b.x,a.y-b.y);if(d0){const f=w0*d0/d/ZV.w;zScale(f)}}
  else{ZV.x-=(e.clientX-prev.x)*ZV.w/r.width;ZV.y-=(e.clientY-prev.y)*ZV.h/r.height;zApply()}});
 const up=e=>{P.delete(e.pointerId);if(P.size<2)d0=0};el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up)}
/* ================= the six inner enemies (v1.29) ================= */
const EN_=k=>ENEMIES.find(e=>e.k===k);
const myEnemies=()=>(S.enemies||[]).map(EN_).filter(Boolean);
const enName=e=>`${e.antN} · ${e.en.toLowerCase()}`;
function enWeeks(k){const L=S.enLog||{};return Object.keys(L).sort().slice(-8).map(w=>L[w][k]||"")}
let EPK=null;
function enemyPick(){EPK=EPK||[...(S.enemies||[])];const y=$(".sheet")?$(".sheet").scrollTop:0;
 sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">The six inner enemies · षड्रिपु</div><h2>What holds you back most?</h2><p class="sub">Indian thought names six inner enemies. Each is shown through a great figure undone by that one weakness. Pick up to 2. You can change them any time.</p>
 <div class="mlist">${ENEMIES.map(e=>`<button class="encard${EPK.includes(e.k)?" on":""}" data-enp="${e.k}" aria-pressed="${EPK.includes(e.k)}"><span class="medal md" style="--c:#6b1f2a">${portrait(e.ant)}</span><span><b>${e.n} <span class="dev">${e.d}</span> · ${e.en}</b><em>As ${e.antN}</em><small>${e.signs.join(" · ")}</small></span><i>${EPK.includes(e.k)?"✓":""}</i></button>`).join("")}</div>
 <button class="cta" style="width:100%;margin-top:14px" data-ensave="1">${EPK.length?"Save":"Skip for now"}</button>`);if($(".sheet"))$(".sheet").scrollTop=y}
function enemySheet(k){const e=EN_(k);if(!e)return;const W=enWeeks(k),won=W.filter(x=>x==="won").length,help=e.help.map(g=>PEOPLE[g]).filter(Boolean);
 sheet("var(--ink)",`<div style="display:flex;gap:14px;align-items:center"><span class="medal lg" style="--c:#6b1f2a">${portrait(e.ant)}</span><div><div class="kick" style="color:var(--mute)">Inner enemy · ${e.n} <span class="dev">${e.d}</span></div><h2>${e.antN}</h2><small class="mute">${e.en}</small></div></div>
 <p class="story">${e.story}</p>
 <div class="box"><small>How it shows up today</small>${e.signs.join(" · ")}</div>
 <div class="box"><small>Your weeks against ${e.antN}</small><div class="enw">${W.length?W.map(x=>`<i class="${x}" title="${x||"no answer"}"></i>`).join(""):`<span class="mute">Your weekly review asks about this.</span>`}</div>${W.length?`${won} of ${W.length} weeks won`:""}</div>
 <div class="box"><small>What helps</small><ul class="tips">${e.tips.map(t=>`<li>${t}</li>`).join("")}</ul></div>
 <div class="qlabel">Mentors who stand against ${e.antN}</div><div class="enh">${help.map(p=>`<span>${medalG(Object.keys(PEOPLE).find(g=>PEOPLE[g]===p),"xs")}${p.n}</span>`).join("")}</div>
 <button class="cta alt" style="width:100%;margin-top:14px" data-enpick="1">Change my inner enemies</button>`)}
function enemyBlock(){const E=myEnemies();return `<div class="block"><h2>Inner enemies</h2>${E.length?`<div class="enl">${E.map(e=>{const W=enWeeks(e.k);return `<button class="enrow" data-enemy="${e.k}"><span class="medal sm" style="--c:#6b1f2a">${portrait(e.ant)}</span><span><b>${e.antN}</b><small>${e.n} · ${e.en}${W.length?` · ${W.filter(x=>x==="won").length} of ${W.length} weeks won`:""}</small></span><span class="srar">›</span></button>`}).join("")}</div>`:`<p class="sub">Name what holds you back, and your weekly review will check in on it.</p>`}<button class="cta alt" style="width:100%;margin-top:8px" data-enpick="1">${E.length?"Change":"Choose your inner enemies"}</button></div>`}
// Skill stories were written for each path's first mentor. With another mentor, credit the story and add their own voice.
function skS(pid,sk,k){const g=CHAR[pid],g0=CHAR0[pid];if(g===g0||!sk)return sk?sk.s:"";const L=MLINES[g]||[];return `${sk.s} <span class="mute">(From ${PEOPLE[g0].n}’s story.)</span>${L.length?`<span class="skv"><b>Your inner ${PEOPLE[g].n}:</b> “${L[k%L.length]}”</span>`:""}`}
/* ================= comeback + rest days (v1.30) ================= */
const REASONS_R=[["rest","Just rest"],["travel","Travelling"],["sick","Unwell"],["family","Family day"],["busy","Too much work"]];
const isRest=d=>(S.rest||[]).some(r=>r.d===d);
const restOf=d=>(S.rest||[]).find(r=>r.d===d);
const restsInWeek=d=>{const m=monOf(d),e=addD(m,6);return (S.rest||[]).filter(r=>r.d>=m&&r.d<=e).length};
let RS=null;
function restSheet(){RS=RS||{days:(S.rest||[]).filter(r=>r.d>=td()).map(r=>r.d),why:"rest"};const ds=Array.from({length:7},(_,i)=>addD(td(),i));
 const y=$(".sheet")?$(".sheet").scrollTop:0;sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Rest days</div><h2>Plan a rest day</h2><p class="sub">Rest is part of practice. On a planned rest day nothing is required, and your streak is safe. Up to 2 per week.</p>
 <div class="qlabel">Which days?</div><div class="cchips">${ds.map((d,i)=>`<button class="chip" data-rday="${d}" aria-pressed="${RS.days.includes(d)}">${i===0?"Today":i===1?"Tomorrow":DAYS[new Date(d+"T12:00:00").getDay()].slice(0,3)+" "+d.slice(8)}</button>`).join("")}</div>
 <div class="qlabel">Why? (optional)</div><div class="cchips">${REASONS_R.map(([k,l])=>`<button class="chip" data-rwhy="${k}" aria-pressed="${RS.why===k}">${l}</button>`).join("")}</div>
 <button class="cta" style="width:100%;margin-top:14px" data-rsave="1">Save</button>`);if($(".sheet"))$(".sheet").scrollTop=y}
function restBanner(){const r=restOf(td());if(!r)return "";const L=(REASONS_R.find(x=>x[0]===r.why)||[0,"Rest"])[1];return `<div class="restb"><b>Rest day · ${L}</b><span>Nothing is required today, and your streak is safe. If you feel like it, one small task still counts.</span></div>`}
function comebackCheck(){if(!S.on||!S.last)return;const g=diff(S.last,td());if(g<3||S.cbk===td())return;let miss=0;for(let d=addD(S.last,1);d<td();d=addD(d,1))if(!isRest(d))miss++;if(miss<2)return;
 S.cbk=td();save();const pid=companionPid()||sel()[0];if(!pid)return;const g0=CHAR[pid],pp=PEOPLE[g0];
 const lines=[`Rama spent fourteen years in the forest. ${miss} days is nothing.`,`Even Vishwamitra began again many times. Today is one of those times.`,`I am still here. One small task, and we walk again.`,`The river does not stop because a stone fell in. Neither do you.`];
 pushModal(`<div style="display:flex;justify-content:center">${medal(pid,"lg")}</div><div class="kick" style="color:${PATHS[pid].c}">${pp.n} · welcome back</div><h2>“${lines[dayNum(td())%lines.length]}”</h2><p>You were away for ${miss} days. Nothing is lost: your paths, gear, marks and story are all here. Today’s plan is lighter, so one task is enough to light the lamp again.</p><button class="cta" style="width:100%" data-cbgo="1">Start small</button>`)}
/* ================= festival challenges + reminders + read aloud (v1.31) ================= */
Object.assign(ICO,{sound:`<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>`,bell:`<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>`});
function fchOpen(){if(calMode()!=="indian")return null;const done=S.fchDone||[];for(const k of Object.keys(FEST).sort()){const df=diff(td(),k);if(df<-1||df>3)continue;const c=FCH.find(x=>x.re.test(FEST[k].n));if(c&&!done.includes(c.k+k.slice(0,4))&&!(S.fch&&S.fch.k===c.k))return{c,date:k}}return null}
const fchCur=()=>S.fch?FCH.find(x=>x.k===S.fch.k):null;
const fchDone=()=>S.fch&&S.fch.ticks.length>=fchCur().days;
function fchSheet(){const a=S.fch?{c:fchCur(),date:S.fch.fest}:fchOpen();if(!a)return;const c=a.c,F=FEST[a.date]||{n:""},cur=S.fch&&S.fch.k===c.k?S.fch:null,n=cur?cur.ticks.length:0;
 sheet("var(--gold)",`<div class="kick" style="color:var(--gold)">Festival challenge · ${F.n}</div><h2>${c.n}<span class="dev">${c.d}</span></h2><p class="story">${c.s}</p>
 ${cur?`${dots(c.days,n)}<p class="sub" style="text-align:center">${n} of ${c.days} days</p>`:`<p class="sub">${c.days} days. Today’s step shows on your Today page. Reward: ${c.charm}.</p>`}
 <ol class="fsteps">${c.steps.map((t,i)=>`<li class="${i<n?"done":i===n&&cur?"now":""}">${t}</li>`).join("")}</ol>
 ${cur?(fchDone()?`<button class="cta" style="width:100%" data-fch="claim">Claim your ${c.charm}</button>`:cur.ticks.includes(td())?`<div class="box" style="text-align:center"><b>Done for today ✓</b></div>`:`<button class="cta" style="width:100%" data-fch="tick">I did today’s step</button>`)+`<button class="linkbtn" data-fch="quit">Stop this challenge</button>`:`<button class="cta" style="width:100%" data-fch="begin:${a.date}">Begin the challenge</button>`}`)}
function fchRow(){const c=fchCur();if(!c||fchDone())return "";const n=S.fch.ticks.length,dn=S.fch.ticks.includes(td());return `<button class="ststep${dn?" done":""}" data-fch="open"><span class="sti">${dn?"✓":DIYA}</span><span><small>${c.n} · day ${Math.min(c.days,n+(dn?0:1))} of ${c.days}</small><b>${c.steps[Math.min(c.days-1,n-(dn?1:0))]}</b></span></button>`}
// ---- calendar reminders (.ics): reminders without a server ----
let RM=null;
function remindSheet(){RM=RM||Object.assign({morning:"08:00",evening:"21:00",review:true,routine:true,trial:true},S.remind||{});
 const chips=(k,opts)=>opts.map(v=>`<button class="chip" data-rm="${k}:${v}" aria-pressed="${RM[k]===v}">${v==="off"?"Off":v}</button>`).join("");
 const acts=ACTS.filter(a=>S.paths.includes(a.pid)&&(S.anchors[a.id]||[]).length);
 const y=$(".sheet")?$(".sheet").scrollTop:0;sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Reminders</div><h2>Add reminders to your calendar</h2><p class="sub">Abhyasa makes a calendar file with gentle alerts. Open it and choose “Add all”. Your phone does the reminding, so it works even when the app is closed.</p>
 <div class="qlabel">Morning practice</div><div class="cchips">${chips("morning",["off","07:00","08:00","09:00"])}</div>
 <div class="qlabel">Close your day</div><div class="cchips">${chips("evening",["off","20:00","21:00","22:00"])}</div>
 <div class="cchips" style="margin-top:12px"><button class="chip" data-rm="review:t" aria-pressed="${RM.review}">Weekly review, Sunday 19:00</button>${acts.length?`<button class="chip" data-rm="routine:t" aria-pressed="${RM.routine}">My routine (${acts.length})</button>`:""}${SS().cur?`<button class="chip" data-rm="trial:t" aria-pressed="${RM.trial}">Story trial days</button>`:""}</div>
 <button class="cta" style="width:100%;margin-top:16px" data-rmgo="1">Make my calendar file</button><p class="sub" style="text-align:center;margin-top:8px">To change them later, delete the events in your calendar and make a new file.</p>`);if($(".sheet"))$(".sheet").scrollTop=y}
function icsMake(){const pad=n=>String(n).padStart(2,"0"),now=new Date(),stamp=now.toISOString().replace(/[-:]/g,"").slice(0,15)+"Z",dt=(d,hm)=>d.replace(/-/g,"")+"T"+hm.replace(":","")+"00";
 const ev=[],url=location.href.split("#")[0],add=(sum,desc,d,hm,rule,mins)=>{const E=x=>x.replace(/\\/g,"\\\\").replace(/[,;]/g,m=>"\\"+m);sum=E(sum);desc=E(desc);ev.push(["BEGIN:VEVENT",`UID:abhyasa-${ev.length}-${now.getTime()}@abhyasa`,`DTSTAMP:${stamp}`,`DTSTART:${dt(d,hm)}`,`DURATION:PT${mins||10}M`,rule?`RRULE:${rule}`:"",`SUMMARY:${sum}`,`DESCRIPTION:${desc}`,`URL:${url}`,"BEGIN:VALARM","TRIGGER:PT0M","ACTION:DISPLAY",`DESCRIPTION:${sum}`,"END:VALARM","END:VEVENT"].filter(Boolean).join("\r\n"))};
 const t=td(),pid=sel()[0],hero=pid?PATHS[pid].hero:"Your mentor";
 if(RM.morning!=="off")add(`Abhyasa · your practice`,`${hero} is waiting. One small task keeps the lamp lit.`,addD(t,1),RM.morning,"FREQ=DAILY",10);
 if(RM.evening!=="off")add(`Abhyasa · close your day`,`Two taps to close the day and send your companion on their journey.`,t,RM.evening,"FREQ=DAILY",5);
 if(RM.review){const sun=addD(t,(7-new Date().getDay())%7||7);add(`Abhyasa · weekly review`,`Look back at your week, and pick next week’s focus.`,sun,"19:00","FREQ=WEEKLY;BYDAY=SU",15)}
 if(RM.routine){const BD=["SU","MO","TU","WE","TH","FR","SA"];ACTS.filter(a=>S.paths.includes(a.pid)&&(S.anchors[a.id]||[]).length).forEach(a=>{const days=S.anchors[a.id];const first=Array.from({length:7},(_,i)=>addD(t,i+1)).find(d=>days.includes(new Date(d+"T12:00:00").getDay()));if(first)add(`Abhyasa · ${a.n}`,`Part of your weekly routine.`,first,"18:00","FREQ=WEEKLY;BYDAY="+days.map(x=>BD[x]).join(","),a.m)})}
 const c=SS().cur;if(RM.trial&&c&&STRIALS[c.i].kind==="daily"){const left=stNeed(c.i)-stProg();if(left>0)add(`Abhyasa · ${STRIALS[c.i].n}`,`Today’s step: ${c.opts.map(o=>stLabel(c.i,o)).join(" + ")}`,addD(t,1),RM.morning!=="off"?RM.morning:"08:00",`FREQ=DAILY;COUNT=${left}`,10)}
 return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Abhyasa//Reminders//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH",...ev,"END:VCALENDAR"].join("\r\n")}
function icsExport(){const ics=icsMake(),name="abhyasa-reminders.ics";S.remind=Object.assign({},RM);save();
 try{const f=new File([ics],name,{type:"text/calendar"});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:"Abhyasa reminders"}).then(()=>toast("Open it in Calendar and choose Add all")).catch(()=>{});return}}catch(e){}
 try{const a=document.createElement("a");a.href="data:text/calendar;charset=utf-8,"+encodeURIComponent(ics);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>a.remove(),1000);toast("Calendar file made. Open it and choose Add all")}catch(e){toast("Could not make the file on this device")}}
// ---- read aloud (uses the phone's own voice) ----
let SAY=false;
const canSay=()=>"speechSynthesis" in window;
function sayText(t){if(!canSay())return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/\s+/g," ").trim());const v=speechSynthesis.getVoices();u.voice=v.find(x=>/en[-_]IN/i.test(x.lang))||v.find(x=>/en[-_]GB/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}
const sayStop=()=>{try{if(canSay())speechSynthesis.cancel()}catch(e){}};
function sayCard(){const c=PL&&$(`.story .card2[data-i="${PL.i}"]`);if(c)sayText(c.innerText)}
/* ================= calm home: bubbles + Calendar tab (v1.32) ================= */
function bubbles(){const t=td(),out=[],c=checkToday(),b=(cls,attr,icon,label,x)=>`<span class="bub ${cls}"><button ${attr}>${icon}<span>${label}</span></button>${x||""}</span>`;
 const q=onbNext();if(q)out.push(b("gold",`data-oq="${q.k}"`,ic("learn"),q.t,`<button class="bubx" data-oqx="1" aria-label="Later">×</button>`));
 const w=reviewWeek();if(w)out.push(b("gold",`data-review="${w}"`,ic("path"),"Your week in review"));
 if(new Date().getHours()>=17&&S.closed!==t&&S.days[t]&&S.days[t].a)out.push(b("",'data-eve="1"',ic("moon"),"Close your day"));
 if(c.d!==t)out.push(b("",'data-checkin="1"',ic("sun"),"How are you today?"));
 const J=S.journey;if(J&&J.back&&J.ret===t)out.push(b("gold",`data-chap="${J.g}:${J.ch}"`,portraitMini(J.g),`${PEOPLE[J.g].n} is back`));
 const sc=STORY_ON&&SS().cur;if(sc){const T=STRIALS[sc.i];out.push(b("gold",'data-st="open"',DIYA,stReady()?"Claim your title":`${T.n} · ${T.kind==="once"?"to do":`${stProg()}/${stNeed(sc.i)}`}${T.kind==="daily"&&stToday()?" ✓":""}`))}
 const fc=fchCur();if(fc)out.push(b("gold",'data-fch="open"',DIYA,fchDone()?`Claim your ${fc.charm}`:`${fc.n} · ${S.fch.ticks.length}/${fc.days}${S.fch.ticks.includes(t)?" ✓":""}`));
 if(STORY_ON&&S.epic){const G=TPL(S.epic.goal);out.push(b("",'data-epic="1"',ic("path"),epicDone()?"Vow kept 🎉":`Vow · ${fmtN(S.epic.cur)}/${fmtN(S.epic.goal.n)} ${G.u}`))}
 if(backupDue())out.push(b("",'data-act="export"',ic("data"),"Back up your progress"));
 return out.length?`<div class="bubs" role="list">${out.join("")}</div>`:""}
const portraitMini=g=>`<span class="pmini">${portrait(g)}</span>`;
function calView(){const t=td(),r=ritu(t),cal=todayCal(),up=upcoming(6),fo=fchOpen(),fc=fchCur();
 const nextCh=Object.keys(FEST).sort().filter(k=>k>t).map(k=>({k,c:FCH.find(x=>x.re.test(FEST[k].n))})).filter(x=>x.c).slice(0,3);
 return header("Calendar")+`<div class="wrap">
 ${monthGrid()}
 <button class="calcard" data-today-cal="1"><small class="mute" style="font-size:12px;font-weight:600">${cal.fest?"Today in the Indian calendar":"A story for today"}</small><b>${cal.n}</b><span>Try today: ${cal.t}</span></button>
 ${calMode()==="indian"?`<div class="block"><h2>Festival challenges</h2>${fc?`<button class="stcard on" data-fch="open"><small>In progress</small><b>${fc.n}</b>${dots(fc.days,S.fch.ticks.length)}<em>${fchDone()?`Complete. Claim your ${fc.charm}`:fc.s}</em></button>`:fo?`<button class="stcard ready" data-fch="open"><small>Open now · ${FEST[fo.date].n}</small><b>${fo.c.n}</b><em>${fo.c.s}</em></button>`:""}
  ${nextCh.length?`<div class="upl">${nextCh.map(x=>`<button class="upi" data-fest="${x.k}"><span class="ud"><b>${+x.k.slice(8)}</b><small>${MONS[+x.k.slice(5,7)-1]}</small></span><span><b>${x.c.n}</b><small>${FEST[x.k].n} · opens 3 days before</small></span></button>`).join("")}</div>`:`<p class="sub">Challenges open around festivals.</p>`}</div>`:""}
 ${up.length?`<div class="block"><h2>Coming up</h2><div class="upl">${up.map(k=>`<button class="upi" data-fest="${k}"><span class="ud"><b>${+k.slice(8)}</b><small>${MONS[+k.slice(5,7)-1]}</small></span><span><b>${FEST[k].n}</b><small>${inDays(k)}${FEST[k].approx?" · date approximate":""}</small></span></button>`).join("")}</div></div>`:""}
 <p class="sub" style="text-align:center;margin:18px 0 30px">Tap any day to see your practice. Change what the calendar shows in Settings.</p></div>`}
function yatraLog(){return `<div class="block"><h2>Companion journeys</h2><p class="sub">Each closed day sends your companion one step further</p>${sel().map(pid=>{const g=CHAR[pid],n=CHAPTERS[g].length,k=S.chap[g]||0,got=S.chapters.filter(c=>c.g===g);return `<div class="ylog" style="--c:${PATHS[pid].c}">${medal(pid,"sm")}<div><b>${PEOPLE[g].n}</b><small>${k>=n?`All ${n} chapters done.`:`Next: ${CHAPTERS[g][k%n].dest} · ${Math.min(k,n)} of ${n}`}</small><div class="ychips">${CHAPTERS[g].map((c,i)=>{const h=got.some(x=>x.ch===i);return `<button class="ych${h?" on":""}" ${h?`data-chap="${g}:${i}"`:"disabled"} aria-label="Chapter ${i+1}: ${c.dest}">${i+1}</button>`}).join("")}</div></div></div>`}).join("")}</div>`}
/* ================= R1: path rings, day timeline, tip popup (v1.33) ================= */
const SLOTS_D=[["morning","Morning","until 12:00",5,12],["afternoon","Afternoon","12:00–17:00",12,17],["evening","Evening","after 17:00",17,24]];
const slotNow=()=>{const h=new Date().getHours();return h<12?"morning":h<17?"afternoon":"evening"};
const slotOfH=h=>h<12?"morning":h<17?"afternoon":"evening";
function slotFor(it,i){if(it.slot)return it.slot;const x=poolItem(it);
 if(it.kind==="trial")return slotNow();if(it.kind==="bridge")return "evening";if(it.kind==="anchor")return "evening";
 if(x){if(x.call)return "evening";if(x.en>=3)return "morning";if(x.quiet||(x.load.length===1&&x.load[0]==="mobility"))return "evening"}
 if(["calm","gratitude","wisdom"].includes(it.pid))return i%2?"morning":"evening";
 const ph=prefH(it.pid);if(ph!==null)return slotOfH(ph);return ["morning","afternoon","evening"][i%3]}
function dayTimeline(items){const now=slotNow(),order=["morning","afternoon","evening"];items.forEach((it,i)=>{if(!it.slot)it.slot=slotFor(it,i)});
 return `<div class="dtl">${SLOTS_D.map(([k,l,sub])=>{const L=items.filter(x=>x.slot===k);if(!L.length)return "";const past=order.indexOf(k)<order.indexOf(now),dn=L.filter(x=>x.done).length;
  return `<div class="tl-sec${k===now?" now":""}${past?" past":""}"><div class="tl-h"><span class="tl-dot">${ic(k==="morning"?"sun":k==="afternoon"?"calm":"moon")}</span><b>${l}</b><small>${sub}${k===now?" · now":""}</small><em>${dn}/${L.length}</em></div><div class="tlist">${L.map(taskRow).join("")}</div></div>`}).join("")}</div>`}
function pathRings(){const ps=sel(),lead=companionPid(),t=td();let tD=0,tP=0;
 const rings=ps.map(pid=>{const m=todayMins(pid),f=m.plan?Math.min(1,m.done/m.plan):0,P=PATHS[pid],C=2*Math.PI*29;tD+=m.done;tP+=m.plan;
  return `<button class="pr" data-pdetail="${pid}" style="--c:${P.c}" aria-label="${P.name}: ${m.done} of ${m.plan} minutes"><span class="pr-r"><svg viewBox="0 0 68 68"><circle cx="34" cy="34" r="29" fill="none" stroke="${P.c}" stroke-opacity=".18" stroke-width="5"/><circle class="tr-p" data-p="${pid}" cx="34" cy="34" r="29" fill="none" stroke="${P.c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C*(1-f)).toFixed(1)}" style="--C:${C.toFixed(1)}" transform="rotate(-90 34 34)"/></svg>${medalA(pid,"pr-m")}${f>=1&&m.plan?`<i class="pr-ok">✓</i>`:""}</span><b>${P.name}</b><small>${m.done}/${m.plan} min</small></button>`}).join("");
 const L=lead?GUIDE_LINES[lead]:null,line=L?L[dayNum(t)%L.length]:"",tasks=S.plan.items.filter(x=>x.kind==="task"||x.kind==="anchor"),dn=tasks.filter(x=>x.done).length;
 return `<div class="prw"><div class="prh"><b>${tD}<small> / ${tP} min today</small></b><small>${dn} of ${tasks.length} tasks${tP&&tD>=tP?" · all rings closed 🎉":""}</small></div><div class="prs">${rings}</div>${lead?`<p class="prq">“${line}” <span>${PATHS[lead].hero}</span></p>`:""}</div>`}
function tipFloat(){const old=$(".tipf");if(old)old.remove();if(S.tipD===td()||!S.on)return;const L=TIPS[S.view]||[],t=L.find(x=>!S.tips.includes(S.view+":"+x[0]));if(!t)return;
 document.body.insertAdjacentHTML("beforeend",`<div class="tipf" role="note"><span class="tipi">${ic("sun")}</span><div><p>${t[1]}</p><div class="nacts"><button class="mini pri" data-tip="${S.view}:${t[0]}">Got it</button><button class="mini" data-tips-off="1">No more tips</button></div></div></div>`)}
/* ================= Calendar: month view with your practice + festivals (v1.34) ================= */
let CALM=null;
function monthGrid(){const t=td();CALM=CALM||{y:+t.slice(0,4),m:+t.slice(5,7)-1};const y=CALM.y,m=CALM.m,first=new Date(y,m,1),dim=new Date(y,m+1,0).getDate(),lead=(first.getDay()+6)%7,ind=calMode()==="indian";
 const ds=n=>`${y}-${String(m+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`;let cells="";for(let i=0;i<lead;i++)cells+=`<span class="cg-e"></span>`;
 let act=0;for(let n=1;n<=dim;n++){const d=ds(n),a=S.days[d]&&S.days[d].a,f=ind&&FEST[d],r=isRest(d);if(a)act++;
  cells+=`<button class="cg-d${d===t?" today":""}${a?" act":""}${d>t?" fut":""}" data-cday="${d}" aria-label="${n} ${MONS[m]}${a?", practised":""}${f?", "+f.n:""}${r?", rest day":""}"><b>${n}</b><span class="cg-m">${a?`<i class="cg-a"></i>`:""}${f?`<i class="cg-f"></i>`:""}${r?`<i class="cg-r"></i>`:""}</span></button>`}
 return `<div class="cgrid"><div class="cg-h"><button class="zb" data-cmon="-1" aria-label="Previous month">‹</button><b>${["January","February","March","April","May","June","July","August","September","October","November","December"][m]} ${y}</b><button class="zb" data-cmon="1" aria-label="Next month">›</button></div>
 <div class="cg-w">${["M","T","W","T","F","S","S"].map(x=>`<small>${x}</small>`).join("")}</div><div class="cg-g">${cells}</div>
 <div class="cg-k"><span><i class="cg-a"></i>Practised (${act})</span>${ind?`<span><i class="cg-f"></i>Festival</span>`:""}<span><i class="cg-r"></i>Rest day</span></div></div>`}
function daySheet(d){const t=td(),L=S.log.filter(l=>l.d===d),mins=L.reduce((a,l)=>a+logMin(l),0),f=calMode()==="indian"&&FEST[d],r=restOf(d),dd=S.days[d]||{},byP={};L.forEach(l=>{if(PATHS[l.pid])byP[l.pid]=(byP[l.pid]||0)+logMin(l)});
 const nice=new Date(d+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
 sheet("var(--gold)",`<div class="kick" style="color:var(--gold)">${d===t?"Today":d>t?inDays(d):"Your day"}</div><h2>${nice}</h2>
 ${d<=t?(L.length?`<div class="box"><small>Your practice</small><b>${mins} min</b> · ${L.length} task${L.length===1?"":"s"}${dd.mood?` · felt ${(MOODS.find(x=>x[0]===dd.mood)||[0,""])[1].toLowerCase()}`:""}<div class="cchips" style="margin-top:6px">${Object.entries(byP).map(([p,v])=>`<span class="chip" style="cursor:default">${PATHS[p].name} · ${v} min</span>`).join("")}</div>${dd.note?`<p class="sub" style="margin:6px 0 0">“${esc(dd.note)}”</p>`:""}</div>`:`<div class="box"><small>Your practice</small>${d===t?"Nothing yet today.":"No practice logged."}</div>`):""}
 ${r?`<div class="box"><small>Rest day</small>${(REASONS_R.find(x=>x[0]===r.why)||[0,"Rest"])[1]}</div>`:""}
 ${f?`<div class="box"><small>${f.approx?"Festival (date approximate)":"Festival"}</small><b>${f.n}</b> <span class="dev">${f.d||""}</span><p class="story" style="margin:6px 0">${f.s}</p><small>Try</small>${f.t}</div>`:""}
 ${d>=t&&!r?`<button class="cta alt" style="width:100%;margin-top:10px" data-rest="1">Plan this as a rest day</button>`:""}`)}
function calSheet(k){const f=k?FEST[k]:todayCal(),r=ritu(k||td());
 sheet("var(--gold)",`<div class="kick">${k?`${k.slice(8)}.${k.slice(5,7)} · ${inDays(k)}`:(f.fest?"Today in the Indian calendar":"A story for today")}</div><h2>${f.n}${f.d?`<span class="dev">${f.d}</span>`:""}</h2><p class="story">${f.s}</p><div class="box"><small>Try ${k?"that day":"today"}</small>${f.t}</div>${f.src?`<p class="sub">${f.src}</p>`:""}${f.approx?`<p class="sub">Date approximate. Check a panchang before planning.</p>`:""}${r?`<p class="sub">${rituL(r)}</p>`:""}<button class="cta" style="width:100%" data-close="1">Close</button>`)}
function burst(ev,c){if(!ev||!ev.clientX||matchMedia("(prefers-reduced-motion: reduce)").matches)return;for(let i=0;i<10;i++){const e=document.createElement("i");e.className="petal";const a=i/10*Math.PI*2+Math.random()*.4,d=30+Math.random()*24;e.style.cssText=`left:${ev.clientX}px;top:${ev.clientY}px;--c:${c};--x:${(Math.cos(a)*d).toFixed(1)}px;--y:${(Math.sin(a)*d).toFixed(1)}px`;document.body.appendChild(e);setTimeout(()=>e.remove(),800)}}

/* ================= hero gear (v1.16): every skill gift becomes an item ================= */
const SLOTS=[["hand","Hand"],["back","Back"],["neck","Neck"],["arms","Arms"],["waist","Waist"],["head","Head"],["aura","Aura"],["comp","Companion"]];
const GEAR=[
 // [id, name, path, skill level (m>=), slot]   rank items use path "" and level = hero rank
 ["gada","Gada","body",2,"hand"],["kankan","Swarna kankan","body",4,"arms"],
 ["rudraksha","Rudraksha mala","flex",2,"neck"],["kamandalu","Kamandalu","flex",4,"hand"],
 ["kodanda","Kodanda bow","bonds",2,"hand"],["tunir","Tunir quiver","bonds",4,"back"],
 ["garland","Forest garland","love",2,"neck"],["ring","Wedding ring","love",4,"arms"],
 ["book","Palm-leaf book","learn",2,"hand"],["swan","Swan feather","learn",4,"head"],
 ["gandiva","Gandiva","focus",2,"hand"],["conch","Devadatta conch","focus",4,"waist"],
 ["veena","Veena","music",2,"back"],["tulsi","Tulsi mala","music",4,"neck"],
 ["japa","Japa mala","calm",2,"neck"],["star","Pole star","calm",4,"aura"],
 ["chakra","Sudarshana chakra","friend",2,"hand"],["bansuri","Bansuri","friend",4,"waist"],
 ["kalasha","Golden kalasha","money",2,"hand"],["lotus","Lakshmi’s lotus","money",4,"head"],
 ["trishula","Trishula","courage",2,"hand"],["lion","Lion of Durga","courage",4,"comp"],
 ["deepa","Lamp of knowledge","wisdom",2,"hand"],["scroll","Katha scroll","wisdom",4,"back"],
 ["vajra","Indra’s vajra","making",2,"hand"],["pushpaka","Pushpaka vimana","making",4,"comp"],
 ["stylus","Valmiki’s stylus","art",2,"hand"],["manuscript","Ramayana manuscript","art",4,"back"],
 ["basket","Shabari’s basket","gratitude",2,"hand"],["ashram","Ashram lamp","gratitude",4,"hand"],
 ["crown","Golden crown","",4,"head"],["diya","Ayodhya diya","epic",1,"comp"],["halo","Sun halo","",4,"aura"],["rays","Rays of Surya","",5,"aura"]];
const gearOwned=g=>g[2]==="epic"?((S.hall||[]).filter(h=>h.won).length+(S.epic&&S.epic.won?1:0))>=g[3]:g[2]?(S.prog[g[2]]&&S.prog[g[2]].m>=g[3]):stage()>=g[3];
const gearIn=slot=>GEAR.filter(g=>g[4]===slot&&gearOwned(g));
function gearOn(slot){S.gear=S.gear||{};const own=gearIn(slot);if(Object.prototype.hasOwnProperty.call(S.gear,slot)){const id=S.gear[slot];return own.some(g=>g[0]===id)?id:""}
 if(!own.length)return "";const act=own.filter(g=>!g[2]||S.paths.includes(g[2]));const L=(act.length?act:own);return L[L.length-1][0]}
const GOLD="#d9a441",RED="#d0492e",WOOD="#8a5424";
function gearSvg(id,c){const{sh,O,O2,hx,hy,lx}=c,ln=(x1,y1,x2,y2,col,w)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${K}" stroke-width="${w+5}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
 const beads=(col,n,r)=>{let s="";for(let i=0;i<=n;i++){const t=i/n;s+=`<circle cx="${(100-sh+8+2*(sh-8)*t).toFixed(1)}" cy="${(86+26*Math.sin(Math.PI*t)).toFixed(1)}" r="${r}" fill="${col}" stroke="${K}" stroke-width="1"/>`}return s};
 switch(id){
 case "gada":return ln(hx,hy+9,hx+6,96,WOOD,4)+`<circle cx="${hx+7}" cy="86" r="14" fill="${GOLD}" ${O}/><circle cx="${hx+7}" cy="86" r="5" fill="${RED}" ${O2}/>`;
 case "kankan":return `<rect x="${100-sh-15}" y="103" width="13" height="7" rx="2" fill="${GOLD}" ${O2}/><rect x="${100+sh+2}" y="103" width="13" height="7" rx="2" fill="${GOLD}" ${O2}/>`;
 case "rudraksha":return beads("#5a2f16",8,2.7);
 case "tulsi":return beads("#4f8a3c",8,2.7);
 case "japa":return beads("#c9a07a",10,2.4)+`<path d="M100 112 l-3 10 h6z" fill="${RED}" ${O2}/>`;
 case "garland":{let s="";for(let i=0;i<=8;i++){const t=i/8;s+=`<circle cx="${(100-sh+6+2*(sh-6)*t).toFixed(1)}" cy="${(86+34*Math.sin(Math.PI*t)).toFixed(1)}" r="4.3" fill="${i%2?"#e8892b":"#f2c94c"}" stroke="${K}" stroke-width="1.2"/>`}return s}
 case "kamandalu":return `<path d="M${hx-3} ${hy-2} q3 -10 6 0" stroke="${K}" stroke-width="3" fill="none"/><ellipse cx="${hx}" cy="${hy+12}" rx="11" ry="10" fill="${WOOD}" ${O}/><path d="M${hx+10} ${hy+10} l9 -6" stroke="${K}" stroke-width="4" stroke-linecap="round"/>`;
 case "kodanda":return `<path d="M${hx+12} 40 Q${hx-20} 120 ${hx+12} 200" stroke="${K}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M${hx+12} 40 Q${hx-20} 120 ${hx+12} 200" stroke="${GOLD}" stroke-width="4" fill="none" stroke-linecap="round"/><line x1="${hx+12}" y1="40" x2="${hx+12}" y2="200" stroke="#f3ead6" stroke-width="1.4"/>`;
 case "gandiva":return `<path d="M${hx+14} 30 Q${hx-24} 120 ${hx+14} 210" stroke="${K}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M${hx+14} 30 Q${hx-24} 120 ${hx+14} 210" stroke="#3c6ab0" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="${hx-8}" cy="120" r="4" fill="${GOLD}" ${O2}/><line x1="${hx+14}" y1="30" x2="${hx+14}" y2="210" stroke="#f3ead6" stroke-width="1.4"/>`;
 case "tunir":return `<g transform="rotate(-18 60 110)"><rect x="50" y="70" width="20" height="70" rx="4" fill="#8a5a2b" ${O}/><path d="M54 70 l-4 -18 M60 70 l0 -20 M66 70 l4 -18" stroke="${K}" stroke-width="2.5"/><path d="M47 52 l3 -6 3 6 M57 50 l3 -6 3 6 M67 52 l3 -6 3 6" fill="${RED}" ${O2}/></g>`;
 case "veena":return `<line x1="62" y1="36" x2="150" y2="196" stroke="${K}" stroke-width="9" stroke-linecap="round"/><line x1="62" y1="36" x2="150" y2="196" stroke="#a86f35" stroke-width="4" stroke-linecap="round"/><circle cx="66" cy="44" r="12" fill="#a86f35" ${O}/><circle cx="146" cy="188" r="15" fill="#a86f35" ${O}/>`;
 case "scroll":return `<g transform="rotate(-28 64 100)"><rect x="40" y="88" width="48" height="16" rx="3" fill="#e9d7a6" ${O}/><circle cx="40" cy="96" r="9" fill="#c9a07a" ${O2}/><circle cx="88" cy="96" r="9" fill="#c9a07a" ${O2}/><line x1="64" y1="88" x2="64" y2="104" stroke="${RED}" stroke-width="3"/></g>`;
 case "manuscript":return `<g transform="rotate(22 140 100)"><rect x="118" y="70" width="44" height="9" rx="3" fill="#e9d7a6" ${O2}/><rect x="118" y="79" width="44" height="9" rx="3" fill="#ddc690" ${O2}/><rect x="118" y="88" width="44" height="9" rx="3" fill="#e9d7a6" ${O2}/><line x1="140" y1="66" x2="140" y2="100" stroke="${RED}" stroke-width="3"/></g>`;
 case "ring":return `<circle cx="${lx}" cy="${hy+1}" r="4" fill="none" stroke="${K}" stroke-width="4"/><circle cx="${lx}" cy="${hy+1}" r="4" fill="none" stroke="${GOLD}" stroke-width="2.2"/><circle cx="${lx}" cy="${hy-3}" r="2" fill="${RED}"/>`;
 case "book":return `<rect x="${hx-13}" y="${hy-18}" width="24" height="17" rx="2" fill="#e9d7a6" ${O2}/><path d="M${hx-9} ${hy-12} h16 M${hx-9} ${hy-7} h16" stroke="${K}" stroke-width="1.3"/><line x1="${hx-1}" y1="${hy-21}" x2="${hx-1}" y2="${hy+2}" stroke="${RED}" stroke-width="2"/>`;
 case "swan":return `<path d="M109 34 Q122 22 128 2 Q116 10 106 30Z" fill="#fbfaf5" ${O2}/><path d="M108 32 Q118 18 126 6" stroke="${K}" stroke-width="1"/>`;
 case "conch":return `<g transform="translate(${100-sh+4} 136) rotate(-20)"><ellipse rx="10" ry="7" fill="#fbfaf5" ${O2}/><path d="M-6 0 q4 -5 8 0 q-3 3 -5 0" stroke="${K}" stroke-width="1.2" fill="none"/><path d="M9 -2 l6 -3 v6z" fill="#fbfaf5" ${O2}/></g>`;
 case "star":return `<g transform="translate(100 2)"><path d="M0 -13 L3.5 -3.5 L13 0 L3.5 3.5 L0 13 L-3.5 3.5 L-13 0 L-3.5 -3.5Z" fill="${GOLD}" ${O2}/></g><circle cx="58" cy="30" r="2.5" fill="${GOLD}"/><circle cx="146" cy="24" r="3" fill="${GOLD}"/><circle cx="154" cy="60" r="2" fill="${GOLD}"/><circle cx="46" cy="66" r="2" fill="${GOLD}"/>`;
 case "chakra":{let sp="";for(let i=0;i<8;i++){const a=i*Math.PI/4;sp+=`<line x1="${hx+4}" y1="${hy-30}" x2="${(hx+4+12*Math.cos(a)).toFixed(1)}" y2="${(hy-30+12*Math.sin(a)).toFixed(1)}" stroke="${K}" stroke-width="1.5"/>`}return `<line x1="${hx+1}" y1="${hy-6}" x2="${hx+3}" y2="${hy-22}" stroke="${K}" stroke-width="3"/><circle cx="${hx+4}" cy="${hy-30}" r="13" fill="${GOLD}" ${O2}/>${sp}<circle cx="${hx+4}" cy="${hy-30}" r="4" fill="${RED}" ${O2}/>`}
 case "bansuri":return ln(100-sh+2,142,100+sh-2,122,WOOD,4)+`<circle cx="${100-sh+14}" cy="137" r="1.4" fill="${K}"/><circle cx="${100-sh+22}" cy="134" r="1.4" fill="${K}"/><path d="M${100+sh-8} 124 l6 -9 l3 7z" fill="#3c6ab0" ${O2}/>`;
 case "kalasha":return `<ellipse cx="${hx}" cy="${hy+12}" rx="12" ry="11" fill="${GOLD}" ${O}/><rect x="${hx-6}" y="${hy-4}" width="12" height="6" fill="${GOLD}" ${O2}/><path d="M${hx-10} ${hy-4} q-4 -8 2 -10 M${hx+10} ${hy-4} q4 -8 -2 -10 M${hx} ${hy-4} v-10" stroke="#4f8a3c" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="${hx}" cy="${hy-12}" r="5" fill="${WOOD}" ${O2}/>`;
 case "lotus":return `<g transform="translate(116 34)"><path d="M0 0 q-7 -6 -4 -14 q4 4 4 14z M0 0 q7 -6 4 -14 q-4 4 -4 14z M0 0 q-2 -10 0 -16 q2 6 0 16z" fill="#ec7f90" ${O2}/></g>`;
 case "trishula":return ln(hx+4,hy+16,hx+4,48,WOOD,4)+`<path d="M${hx-10} 52 q0 -14 4 -22 M${hx+18} 52 q0 -14 -4 -22 M${hx-10} 52 q14 8 28 0 M${hx+4} 52 v-30" stroke="${K}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${hx-10} 52 q0 -14 4 -22 M${hx+18} 52 q0 -14 -4 -22 M${hx-10} 52 q14 8 28 0 M${hx+4} 52 v-30" stroke="#c9ccd6" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 case "deepa":return `<path d="M${hx-12} ${hy-8} q12 14 24 0 z" fill="${GOLD}" ${O2}/><path d="M${hx+2} ${hy-10} q-6 -8 0 -18 q6 10 0 18z" fill="#f2a43a" stroke="${RED}" stroke-width="1.4"/>`;
 case "ashram":return `<line x1="${hx}" y1="${hy-2}" x2="${hx}" y2="${hy+16}" stroke="${K}" stroke-width="2"/><path d="M${hx-11} ${hy+16} q11 14 22 0 z" fill="#c48459" ${O2}/><path d="M${hx} ${hy+14} q-5 -7 0 -14 q5 7 0 14z" fill="#f2a43a" stroke="${RED}" stroke-width="1.3"/>`;
 case "vajra":return ln(hx+3,hy+8,hx+3,hy-46,GOLD,4)+`<path d="M${hx-6} ${hy-38} q9 -16 18 0 M${hx-6} ${hy} q9 16 18 0" stroke="${K}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${hx-6} ${hy-38} q9 -16 18 0 M${hx-6} ${hy} q9 16 18 0" stroke="${GOLD}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="${hx+3}" cy="${hy-19}" r="4" fill="${RED}" ${O2}/>`;
 case "stylus":return ln(hx-2,hy+2,hx+16,hy-40,"#c9ccd6",2.5)+`<path d="M${hx+16} ${hy-40} l3 -8" stroke="${K}" stroke-width="2"/>`;
 case "basket":{const y=hy+6;return `<path d="M${hx-10} ${y-2} q10 -14 20 0" stroke="${K}" stroke-width="2.5" fill="none"/><path d="M${hx-14} ${y} h28 l-4 16 h-20z" fill="#c9a07a" ${O2}/><path d="M${hx-12} ${y+5} h24 M${hx-10} ${y+10} h20" stroke="${K}" stroke-width="1"/><circle cx="${hx-6}" cy="${y-2}" r="3" fill="${RED}" stroke="${K}" stroke-width="1"/><circle cx="${hx+1}" cy="${y-4}" r="3" fill="#a8263a" stroke="${K}" stroke-width="1"/><circle cx="${hx+7}" cy="${y-2}" r="3" fill="${RED}" stroke="${K}" stroke-width="1"/>`}
 case "lion":return `<g transform="translate(20 168)"><ellipse cx="14" cy="40" rx="22" ry="16" fill="${GOLD}" ${O}/><circle cx="0" cy="18" r="17" fill="#a8641e" ${O}/><circle cx="0" cy="20" r="10" fill="${GOLD}" ${O2}/><circle cx="-4" cy="18" r="1.6" fill="${K}"/><circle cx="4" cy="18" r="1.6" fill="${K}"/><path d="M-3 24 q3 3 6 0" stroke="${K}" stroke-width="1.5" fill="none"/><path d="M34 34 q10 -10 4 -20" stroke="${K}" stroke-width="3" fill="none"/></g>`;
 case "pushpaka":return `<g transform="translate(6 6)"><path d="M0 30 h44 l-6 10 h-32z" fill="${GOLD}" ${O2}/><path d="M8 30 v-12 l14 -10 l14 10 v12" fill="#f3ead6" ${O2}/><path d="M22 8 v-6" stroke="${RED}" stroke-width="2"/><path d="M0 32 q-10 -8 -6 -16 q6 6 10 12 M44 32 q10 -8 6 -16 q-6 6 -10 12" fill="#fbfaf5" ${O2}/></g>`;
 case "diya":return `<g transform="translate(26 36)"><circle r="20" fill="#f2c94c" opacity=".25"/><path d="M-13 2 q13 15 26 0z" fill="${GOLD}" ${O2}/><path d="M0 0 q-7 -9 0 -20 q7 11 0 20z" fill="#f2a43a" stroke="${RED}" stroke-width="1.5"/></g>`;
 case "crown":return `<path d="M82 38 L86 22 L93 32 L100 16 L107 32 L114 22 L118 38 Z" fill="${GOLD}" ${O}/><circle cx="100" cy="30" r="2.8" fill="${RED}"/>`;
 case "halo":return `<circle cx="100" cy="66" r="62" fill="${GOLD}" ${O}/><circle cx="100" cy="66" r="50" fill="var(--surface)" ${O}/>`;
 case "rays":{let s="";for(let i=0;i<24;i++){const a=i*15*Math.PI/180,r1=60,r2=74;s+=`<path d="M${100+r1*Math.cos(a-.11)} ${66+r1*Math.sin(a-.11)} L${100+r2*Math.cos(a)} ${66+r2*Math.sin(a)} L${100+r1*Math.cos(a+.11)} ${66+r1*Math.sin(a+.11)}Z" fill="${RED}" ${O2}/>`}return s+gearSvg("halo",c)}}
 return ""}
function avatar(st,only){
 const pr=k=>S.prog[k]?S.prog[k].m:0,G=only||Object.fromEntries(SLOTS.map(([k])=>[k,gearOn(k)]));
 const sk="#c48459",skd="#a0663f",sh=24+Math.min(5,pr("body"))*1.6;
 const dhoti=st>=1?"#f3ead6":"#d8d1c2",O=`stroke="${K}" stroke-width="3" stroke-linejoin="round"`,O2=`stroke="${K}" stroke-width="2"`;
 const c={sh,O,O2,hx:100+sh+6,hy:151,lx:100-sh-6},I=k=>G[k]?gearSvg(G[k],c):"";
 let s=I("aura");
 s+=`<ellipse cx="100" cy="226" rx="58" ry="7" fill="${K}" opacity=".18"/>`;
 s+=I("back");
 s+=`<rect x="85" y="168" width="12" height="55" rx="6" fill="${sk}" ${O}/><rect x="103" y="168" width="12" height="55" rx="6" fill="${sk}" ${O}/>`;
 const dl=st>=2?206:182;
 s+=`<path d="M${100-sh+6} 126 L${100+sh-6} 126 L${100+sh+2} ${dl} Q100 ${dl-12} ${100-sh-2} ${dl} Z" fill="${dhoti}" ${O}/>`;
 if(st>=2)s+=`<path d="M${100+sh} ${dl-4} Q100 ${dl-16} ${100-sh} ${dl-4}" stroke="${RED}" stroke-width="4" fill="none"/>`;
 const arm=a=>`<path d="${a}" stroke="${K}" stroke-width="16" stroke-linecap="round" fill="none"/><path d="${a}" stroke="${sk}" stroke-width="10" stroke-linecap="round" fill="none"/>`;
 s+=arm(`M${100-sh} 88 Q${100-sh-13} 116 ${100-sh-6} 150`)+arm(`M${100+sh} 88 Q${100+sh+13} 116 ${100+sh+6} 150`);
 s+=`<path d="M${100-sh} 84 Q100 76 ${100+sh} 84 L${100+sh-8} 130 L${100-sh+8} 130 Z" fill="${sk}" ${O}/>`;
 s+=`<rect x="94" y="66" width="12" height="18" rx="3" fill="${skd}" ${O}/>`+inkLayer(sh);
 if(st>=1)s+=`<path d="M${100-sh+5} 84 L${100+sh-7} 128" stroke="${K}" stroke-width="13" stroke-linecap="round"/><path d="M${100-sh+5} 84 L${100+sh-7} 128" stroke="${RED}" stroke-width="8" stroke-linecap="round"/>`;
 s+=I("waist")+I("arms")+I("neck");
 s+=`<circle cx="100" cy="54" r="19" fill="${sk}" ${O}/>`;
 s+=st>=1?`<path d="M81 52 Q82 33 100 33 Q118 33 119 52 Q112 42 100 42 Q88 42 81 52Z" fill="${K}"/><circle cx="100" cy="29" r="${st>=3?9:7}" fill="${K}"/>`:`<path d="M81 52 Q82 34 100 34 Q118 34 119 52 Q110 44 100 45 Q90 44 81 52Z" fill="${K}"/>`;
 s+=`<path d="M91 56 q3 2.5 6 0M103 56 q3 2.5 6 0" stroke="${K}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
 if(st>=2)s+=`<path d="M100 40 v8" stroke="${st>=4?RED:GOLD}" stroke-width="3" stroke-linecap="round"/>`;
 s+=I("head");
 s+=`<circle cx="${100-sh-6}" cy="151" r="6" fill="${sk}" ${O}/><circle cx="${100+sh+6}" cy="151" r="6" fill="${sk}" ${O}/>`;
 s+=I("hand")+I("comp");
 return `<svg viewBox="-10 -10 220 250" role="img" aria-label="Your hero at rank ${RANKS[st][0]}">${s}</svg>`;
}
function itemIcon(id){const c={sh:28,O:`stroke="${K}" stroke-width="3"`,O2:`stroke="${K}" stroke-width="2"`,hx:134,hy:151,lx:66};const g=GEAR.find(x=>x[0]===id);
 const box={hand:"84 10 90 220",back:"30 20 150 200",neck:"60 70 80 60",arms:"50 85 100 70",waist:"55 110 90 50",head:"75 -10 60 60",aura:"30 -10 140 150",comp:"0 0 80 230"}[g[4]];
 const vb=id==="ring"?"52 135 28 28":id==="lion"?"-4 160 70 70":id==="pushpaka"?"-8 0 70 52":id==="diya"?"2 12 48 48":box;
 return `<svg viewBox="${vb}" class="gico" aria-hidden="true"><g>${gearSvg(id,c)}</g></svg>`}
let HS=null;
function heroSheet(keep){const st=stage(),ps=sel();if(!HS||!keep){const pid=ps.length?ps[Math.floor(Math.random()*ps.length)]:null;HS={pid,line:pid?GUIDE_LINES[pid][Math.floor(Math.random()*GUIDE_LINES[pid].length)]:""}}
 const prev=$(".sheet")?$(".sheet").scrollTop:0,owned=GEAR.filter(gearOwned).length;
 const rk=ARC_RANK[lifeRank()];
 sheet("var(--gold)",`<button class="hs-av" data-zoom="1" aria-label="Zoom into your hero">${avatar(st)}<span class="hs-z">${ic("zoom")} Zoom in</span></button><div class="rank" style="text-align:center">${rk[0]}<span class="dev">${rk[1]}</span></div>
 ${HS.pid?`<div class="box hs-say"><small>${PATHS[HS.pid].hero} says</small>“${HS.line}”</div>`:""}
 <h2 style="margin-top:14px">Your gear</h2><p class="sub">${owned} of ${GEAR.length} gifts earned. Each path gives a gift at skills 2 and 4. Tap to equip or take off.</p>
 ${SLOTS.map(([k,l])=>{const own=gearIn(k),on=gearOn(k),next=GEAR.filter(g=>g[4]===k&&!gearOwned(g)&&(!g[2]||S.paths.includes(g[2])))[0];
  return `<div class="slot"><div class="slh"><b>${l}</b><small>${on?GEAR.find(g=>g[0]===on)[1]:"Empty"}</small></div>
  ${own.length?`<div class="slitems">${own.map(g=>`<button class="gitem" data-gear="${k}:${g[0]}" aria-pressed="${on===g[0]}">${itemIcon(g[0])}<span>${g[1]}</span><small>${g[2]==="epic"?"Epic gift":g[2]?PATHS[g[2]].hero:"Rank gift"}</small></button>`).join("")}${on?`<button class="gitem off" data-gear="${k}:">${""}<span>Take off</span></button>`:""}</div>`:""}
  ${next?`<p class="slnext">${own.length?"Next: ":"Earn "}${next[1]} · ${next[2]?`${PATHS[next[2]].name} skill ${next[3]}`:`reach ${RANKS[next[3]][0]}`}</p>`:own.length?"":`<p class="slnext">Add more paths to earn gifts here.</p>`}</div>`}).join("")}
 <h2 style="margin-top:16px">Your marks</h2><p class="sub">Each mentor leaves a mark: an outline when they are awake in you, fully inked when they are one with you. Marks stay for life.</p>
 ${(S.ink||[]).length?`<div class="inkl">${S.ink.map(e=>`<div class="inki"><svg viewBox="-12 -12 24 24" aria-hidden="true">${inkSvg(e.g,e.full,0,0,0,1)}</svg><span><b>${PEOPLE[e.g].n}</b><small>${INKSYM[e.g].n} · ${e.full?"complete":"outline"}</small></span></div>`).join("")}</div>`:`<p class="slnext">Your first mark appears when a mentor is awake in you (skill 2 on any path).</p>`}
 <div class="cchips" style="margin-top:8px"><button class="chip" data-inktog="1" aria-pressed="${!S.hideInk}">Show marks on my hero</button></div>
 <button class="cta" style="width:100%;margin-top:14px" data-close="1">Done</button>`);
 document.querySelectorAll(".gico").forEach(v=>{try{const r=v.firstChild.getBBox(),m=Math.max(r.width,r.height)+8;if(m>8)v.setAttribute("viewBox",`${(r.x+r.width/2-m/2).toFixed(1)} ${(r.y+r.height/2-m/2).toFixed(1)} ${m.toFixed(1)} ${m.toFixed(1)}`)}catch(e){}});
 if(keep&&$(".sheet"))$(".sheet").scrollTop=prev}


/* ================= focus: choose up to 5, readiness nudges ================= */
const MAXP=8,DAYMAX=4;
const sinceP=pid=>{const L=S.log.filter(l=>l.pid===pid);if(!L.length)return 99;return diff(L.reduce((a,l)=>l.d>a?l.d:a,"0000"),td())};
function pickWhy(pid){const w=[];if(focusPid()===pid)w.push("Week focus");if(S.epic&&S.epic.goal&&(S.epic.goal.pid===pid||(S.epic.goal.combo&&(SYN.find(x=>x.id===S.epic.goal.combo)||{p:[]}).p.includes(pid))))w.push("Sankalpa");const c=S.story&&S.story.cur;if(c&&c.opts.includes(pid))w.push("Story trial");const pr=S.prog[pid];if(pr.m<5&&pr.xp>=NEED[pr.m])w.push("Trial ready");if(behindFreq(pid))w.push(`Your line: ${idFreq(pid)}× a week`);const d=sinceP(pid);if(d>=7&&d<99)w.push(`${d} days since last practice`);return w}
function autoPick(){const c=sel();if(c.length<=DAYMAX)return c;const sc=p=>{const w=pickWhy(p),d=sinceP(p);return (w.includes("Week focus")?3:0)+(w.includes("Sankalpa")?3:0)+(w.includes("Story trial")?2:0)+(w.includes("Trial ready")?1:0)+(w.some(x=>x.startsWith("Your line"))?2:0)+(d>=7?2.5:0)+Math.min(d,14)/7};
 const top=[...c].sort((a,b)=>sc(b)-sc(a)||c.indexOf(a)-c.indexOf(b)).slice(0,DAYMAX);return c.filter(p=>top.includes(p))}
function todayPs(){const c=sel(),P=S.dayPick;if(P&&P.d===td()){const p=P.p.filter(x=>c.includes(x));if(p.length)return p}return autoPick()}
let DP=null;
function dayPickSheet(keep){const c=sel();DP=keep&&DP?DP:todayPs().slice();
 sheet("var(--gold)",`<div class="kick" style="color:var(--gold)">Today</div><h2>Who leads today?</h2><p class="sub">Every path gets a task each day. Pick up to ${DAYMAX} mentors to lead: they get your longer, deeper tasks and today’s story.</p>
 <div class="dpl">${c.map(p=>{const on=DP.includes(p),w=pickWhy(p),d=sinceP(p);return `<button class="dpi${on?" on":""}" data-dp="${p}" aria-pressed="${on}" style="--c:${PATHS[p].c}">${medal(p,"sm")}<span><b>${PATHS[p].hero}</b><small>${PATHS[p].name} · ${d>=99?"not practised yet":d===0?"practised today":d===1?"practised yesterday":`${d} days ago`}</small>${w.length?`<em>${w.join(" · ")}</em>`:""}</span><i>${on?"✓":""}</i></button>`}).join("")}</div>
 <button class="cta" style="width:100%;margin-top:12px" data-dp-ok="1" ${DP.length?"":"disabled"}>Lead with ${DP.length} mentor${DP.length===1?"":"s"} today</button>
 <button class="linkbtn" data-dp-auto="1">Let Abhyasa choose</button>`)}
function mentorRow(){if(sel().length<=DAYMAX)return "";const p=todayPs();return `<button class="mrow" data-daypick="1"><span class="mrow-m">${p.map(x=>medalA(x,"xs")).join("")}</span><span><small>Today’s mentors · ${p.length} of ${sel().length}</small><b>${p.map(x=>PATHS[x].hero).join(", ")}</b></span><em>Change</em></button>`}
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
 {const il=ps.filter(idOf),prevI=(S.reviews[mon]||{}).ident||{};RV.ident=Object.assign({},prevI);if(il.length)cards.push({kick:"Did you live like this?",html:`<div class="rvid">${il.map(p=>`<div class="rvi" style="--c:${PATHS[p].c}"><p>I am becoming ${esc(idOf(p))}.</p><div class="cchips" id="rvi-${p}">${[["yes","Yes"],["partly","Partly"],["not","Not yet"]].map(([k,l])=>`<button class="chip" data-rvid="${p}:${k}" aria-pressed="${prevI[p]===k}">${l}</button>`).join("")}</div></div>`).join("")}</div>`,cap:"Honest answers help you see what to lean into next week."})}
 {const E=myEnemies(),pv=(S.enLog||{})[mon]||{};RV.en=Object.assign({},pv);if(E.length)cards.push({kick:"Your inner enemies",html:`<div class="rvid">${E.map(e=>`<div class="rvi" style="--c:#6b1f2a"><p style="display:flex;align-items:center;gap:8px"><span class="medal xs" style="--c:#6b1f2a">${portrait(e.ant)}</span>Did ${e.antN} win this week? <span class="mute">(${e.en.toLowerCase()})</span></p><div class="cchips" id="rve-${e.k}">${[["won","No, I won"],["close","It was close"],["lost","Yes, it won"]].map(([k,l])=>`<button class="chip" data-rven="${e.k}:${k}" aria-pressed="${pv[e.k]===k}">${l}</button>`).join("")}</div></div>`).join("")}</div>`,cap:"Every honest answer weakens it."})}
 if(STORY_ON&&S.epic&&!epicDone()){const prevF=(S.reviews[mon]||{}).foe||"";RV.foe=prevF;cards.push({kick:"Your obstacles",html:`<div class="foe" style="margin-top:0">${headsSvg(true)}<div><b>${foeName()}</b></div></div><p class="sub">Did you beat them this week? An honest “yes” cuts off one head.</p><div class="cchips" id="rvfoe">${[["win","Yes, I beat them"],["mostly","Mostly"],["lost","They won this week"]].map(([k,l])=>`<button class="chip" data-rvfoe="${k}" aria-pressed="${prevF===k}">${l}</button>`).join("")}</div>`,cap:""})}
 cards.push({kick:"Next week’s focus",html:`<p class="sub">Pick one path to lean into. It gets more of your daily time next week.</p><div class="cchips" id="rvfocus">${ps.map(p=>`<button class="chip" data-rvfocus="${p}" aria-pressed="${RV.focus===p}">${PATHS[p].name}</button>`).join("")}</div><button class="cta" style="width:100%;margin-top:16px" data-rvdone="1">Finish review</button>`,cap:""});
 RV.own=W.own;openPlayer({label:"Weekly review",title:"Your week",sub:rng7(mon),cast:[top],cards,auto:false});
 const nx=$('.story .row [data-pnext]');if(nx)nx.dataset.rv="1";
}
function finishReview(){const r=RV;if(!r)return;
 r.own.forEach(o=>{const v=r.worth[o.t];if(v===0){const L=L_(o.t);L.never=true;if(S.custom[o.pid])S.custom[o.pid]=S.custom[o.pid].filter(c=>c.t!==o.t)}});injectCustom();
 const W=weekStats(r.mon),pf=(S.reviews[r.mon]||{}).foe||"";let headMsg="";
 if(S.epic&&r.foe==="win"&&pf!=="win"){S.epic.wins=(S.epic.wins||0)+1;headMsg=` A head of ${EPICS[S.epic.id].foe} falls.`}else if(S.epic&&pf==="win"&&r.foe&&r.foe!=="win")S.epic.wins=Math.max(0,(S.epic.wins||0)-1);
 if(r.en&&Object.keys(r.en).length){S.enLog=S.enLog||{};S.enLog[r.mon]=r.en}S.reviews[r.mon]={done:true,act:W.act,tot:W.tot,by:W.by,worth:r.worth,focus:r.focus,foe:r.foe||"",ident:r.ident||{}};
 S.wfocus={w:r.nextMon,pid:r.focus};const k=Object.keys(S.reviews).sort();while(k.length>12)delete S.reviews[k.shift()];
 RV=null;closeLayer();replan();toast(`Review saved. ${PATHS[r.focus].name} is your focus for the week.${headMsg}`)}
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



/* ================= feedback ================= */
const FBK=[["idea","Idea"],["bug","Something broke"],["story","Story or content"],["like","Something I like"]];let FB=null;
function feedbackSheet(){FB=FB||{k:"idea",t:""};sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Feedback</div><h2>Tell us what you think</h2><p class="sub">It goes straight to the person building Abhyasa. Nothing is sent automatically.</p>
 <div class="cchips">${FBK.map(([k,l])=>`<button class="chip" data-fbk="${k}" aria-pressed="${FB.k===k}">${l}</button>`).join("")}</div>
 <label class="qlabel" for="fbtext" style="display:block">Your message</label><textarea class="name" id="fbtext" rows="5" maxlength="2000" placeholder="What happened, or what would make it better?" style="font-size:16px;resize:vertical">${esc(FB.t)}</textarea>
 <p class="sub" style="margin-top:8px">The app version and your device type are added so problems are easier to fix. Your progress is not included.</p>
 <div class="row" style="flex-wrap:wrap"><button class="cta" data-fbsend="share">Share</button>${FEEDBACK_EMAIL?`<button class="cta alt" data-fbsend="mail">Email</button>`:""}<button class="cta alt" data-fbsend="copy">Copy</button></div>`);
 const t=$("#fbtext");if(t){t.addEventListener("input",e=>FB.t=e.target.value);t.focus()}}
function fbText(){const ua=navigator.userAgent,dev=/iPhone|iPad/.test(ua)?"iPhone/iPad":/Android/.test(ua)?"Android":"Desktop";return `Abhyasa feedback (${FBK.find(x=>x[0]===FB.k)[1]})\n\n${FB.t.trim()}\n\n— Version ${APP_VERSION} · ${dev} · ${isStandalone()?"installed":"browser"} · ${td()}`}
function fbSend(how){const t=$("#fbtext");if(t)FB.t=t.value;if(!FB.t.trim()){toast("Write a message first");return}const txt=fbText();
 if(how==="share"){if(navigator.share){navigator.share({title:"Abhyasa feedback",text:txt}).then(()=>{FB=null;closeLayer();toast("Thank you")}).catch(()=>{});return}how="copy"}
 if(how==="mail"){location.href=`mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent("Abhyasa feedback")}&body=${encodeURIComponent(txt)}`;return}
 if(how==="copy"){const ok=()=>{toast("Copied. Paste it in a message to the builder");FB=null;closeLayer()};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok).catch(()=>{if(t){t.value=txt;t.select()}toast("Select the text and copy it")});else{if(t){t.value=txt;t.select()}toast("Select the text and copy it")}}}
const backupDue=()=>{const act=Object.keys(S.days).filter(d=>S.days[d].a).length;return act>=3&&(!S.lastBackup||diff(S.lastBackup,td())>=7)};

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
function tipCard(){return "";if(S.tipD===td())return"";const L=TIPS[S.view]||[],t=L.find(x=>!S.tips.includes(S.view+":"+x[0]));if(!t)return"";const n=L.indexOf(t)+1;
 return `<div class="wrap"><div class="tip1" role="note"><span class="tipi">${ic("sun")}</span><div><small>Tip ${n} of ${L.length}</small><p>${t[1]}</p><div class="nacts"><button class="mini pri" data-tip="${S.view}:${t[0]}">Got it</button><button class="mini" data-tips-off="1">Skip all tips</button></div></div></div></div>`}
function glossaryView(){return `<div class="cchips" style="margin:6px 0 12px">${[["well","I know these stories"],["some","A little"],["new","New to me"]].map(([k,l])=>`<button class="chip" data-lore="${k}" aria-pressed="${S.lore===k}">${l}</button>`).join("")}</div>
 <p class="sub">${S.lore==="well"?"Guide intros are off.":"New guides introduce themselves with 3 short cards."}</p>
 ${GLOSSARY.map(([h,L])=>`<details class="gloss"><summary>${h}</summary>${L.map(([t,d])=>`<div class="gl"><b>${t}</b><span>${d}</span></div>`).join("")}</details>`).join("")}`}

/* ================= views ================= */
let lastView="",GI=0,GANIM=false,TALK=null;
function render(){
 if(!S.on){quiz();return}
 dayTick();stCheck();ensurePlan();{const nw=inkCheck();if(nw.length){save();inkAnnounce(nw)}}
 SYN.forEach(sy=>{if(S.syn.includes(sy.id)||!sy.p.every(p=>S.paths.includes(p)&&S.prog[p].m>=sy.req))return;S.syn.push(sy.id);pushModal(`<div class="evo" style="gap:0">${sy.p.map(p=>medal(p,"lg")).join("")}</div><div class="kick">Bridge opened</div><h2>${sy.n}<span class="dev">${sy.d}</span></h2>${enLine(sy.n)}<p>${sy.p.map(p=>PATHS[p].name).join(" and ")} now help each other: +10% growth and a shared daily task.</p><button class="cta alt" style="width:100%;margin-bottom:10px" data-story="${sy.id}">Watch their story</button>`)});
 if(!["today","journey","cal","hero"].includes(S.view))S.view="today";
 const v=S.view,app=$("#app");
 app.innerHTML=(v==="hero"?heroView():v==="journey"?journeyView():v==="cal"?calView():todayView())+tabs();
 paint();setBg(pageScene());
 if(anim){const a=anim;anim=null;Object.keys(a).forEach(pid=>{const el=document.querySelector(`.ringi[data-ring="${pid}"] .rp`);if(!el)return;const to=el.getAttribute("stroke-dasharray");el.style.transition="none";el.style.strokeDasharray=`${(a[pid]*RC).toFixed(1)} ${RC.toFixed(1)}`;el.getBoundingClientRect();el.style.transition="";el.style.strokeDasharray=to})}
 if(TANIM){const el=document.querySelector(`.tr-p[data-p="${TANIM.pid}"]`);if(el){const C=+el.style.getPropertyValue("--C"),to=el.getAttribute("stroke-dashoffset");el.style.transition="none";el.setAttribute("stroke-dashoffset",(C*(1-TANIM.f)).toFixed(1));el.getBoundingClientRect();el.style.transition="stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1)";el.setAttribute("stroke-dashoffset",to)}TANIM=null}
 if(lastView!==v){lastView=v;app.classList.remove("enter");void app.offsetWidth;app.classList.add("enter")}
 save();
 if(S.deck!==td()&&!$(".scrim")&&!queue.length)setTimeout(()=>{if(S.on&&S.deck!==td()&&!$(".scrim"))openDeck()},300);
 else epicCheck();
 setTimeout(tipFloat,400);
 if(v==="today"&&!$(".scrim")&&!queue.length)comebackCheck();
}
function header(title,sub){return `<header class="bar"><div class="wrap"><div class="hgreet">${sub?`<small>${sub}</small>`:""}<b>${title||"Abhyasa"}</b></div><button class="spill" data-streak="1" aria-label="${S.streak} day streak. Open streak details">${DIYA}${S.streak}</button><button class="ibtn" data-settings="1" aria-label="Settings">${ic("gear")}</button></div></header>`}
function tabs(){return `<nav class="tabs" aria-label="Main"><div class="wrap">${[["today","Today","sun"],["journey","Journey","path"],["cal","Calendar","calendar"],["hero","Hero","hero"]].map(([k,l,i])=>`<button data-view="${k}" ${S.view===k?'aria-current="page"':""}>${ic(i)}<span>${l}</span>${STORY_ON&&k==="journey"&&stAvail()>=0&&!SS().cur?`<i class="tdot" aria-label="Story trial ready"></i>`:""}</button>`).join("")}</div></nav>`}
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
 <div class="cirow"><span>Day</span><div class="cchips">${chip("busy","0","Normal day",!(CI.busy===undefined?busyToday():CI.busy))}${chip("busy","1","Busy day",!!(CI.busy===undefined?busyToday():CI.busy))}</div></div>
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
const TREEC={making:"#c9a07a",art:"#ff6fa8",gratitude:"#d7a3c9",friend:"#ffb347",money:"#e6c44a",courage:"#ff6b7f",wisdom:"#9fb8d6",body:"#ff8a65",flex:"#5ec8dc",bonds:"#5cd6a2",love:"#f490a6",learn:"#8db2ff",focus:"#b39cff",music:"#ee93dc",calm:"#b4dc72"},TGOLD="#f5c76a";
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
 <text x="${CX}" y="${CY+3}" text-anchor="middle" font-family="Tiro Devanagari Hindi,serif" font-size="14" fill="${TGOLD}">${ARC_RANK[lifeRank()][1]}</text><text x="${CX}" y="${CY+14}" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" fill="#ffffffa0">${allTrials()} trials</text></g>`;
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
  <p class="exp-s">${skS(pid,sk,k)}</p>${prog}
  <div class="exgrid"><div><small>Effect</small>${PERK[sk.perk](P.name)}</div><div><small>${on?"Trial passed":"Trial"}</small>${trialFor(pid,k)}</div>${sk.item?`<div><small>Gift</small>${sk.itemName||sk.n}</div>`:""}${!on&&!nx?`<div><small>Unlocks after</small>${P.skills[k-1].n}</div>`:""}</div>
  <div class="exnav"><button class="ex-b" data-ex="prev" ${k===0?"disabled":""} aria-label="Previous skill">‹</button><button class="ex-b" data-ex="next" ${k===4?"disabled":""} aria-label="Next skill">›</button>${L.length>1?`<button class="ex-b wide" data-ex="branch">⇄ Next branch</button>`:""}${full?`<button class="ex-b wide pri" data-trial="${pid}">I passed</button>`:""}</div>`;return}
 if(type==="syn"){const sy=SYN.find(x=>x.id===a),un=S.syn.includes(a);
  el.innerHTML=`<div class="exp-k" style="color:${TGOLD}">Bridge · ${sy.p.map(p=>PATHS[p].name).join(" + ")}</div><div class="exp-h"><b>${sy.n}</b><span class="dev">${sy.d}</span><span class="exst ${un?"on":""}" style="--c:${TGOLD}">${un?"Open":"Locked"}</span></div>${EN[sy.n]?`<p class="exp-en">${EN[sy.n]}</p>`:""}<p class="exp-s">${sy.s}</p>
  <div class="exgrid"><div><small>Opens when</small>${sy.p.map(p=>`${PATHS[p].name}: ${Math.min(S.prog[p].m,sy.req)}/${sy.req} trials`).join("<br>")}</div><div><small>Effect</small>+10% growth and a daily shared task</div></div>
  <div class="exnav"><button class="ex-b wide pri" data-story="${a}">${un?"Watch the story":"Preview the story"}</button></div>`;return}
 if(type==="path"){const pid=a,P=PATHS[pid],pr=S.prog[pid],g=CHAR[pid],c=TREEC[pid];
  el.innerHTML=`<div class="exp-k" style="color:${c}">${REALMS.find(r=>r.id===P.realm).n} · ${P.about}</div><div class="exp-h">${medal(pid,"sm")}<b>${P.name}</b><span class="exst on" style="--c:${c}">${pr.m}/5</span></div><p class="exp-s">${PEOPLE[g].bio}</p>
  <div class="exnav"><button class="ex-b wide" data-ex="go|skill|${pid}|${Math.min(pr.m,4)}">Go to next skill</button><button class="ex-b wide" data-intro="${pid}">Meet ${PEOPLE[g].n}</button></div>`;return}
 if(type==="center"){const R=lifeRank(),need=R>=6?0:ARC_GATE[R+1]-allTrials(),RK=ARC_RANK;
  el.innerHTML=`<div class="exp-k" style="color:${TGOLD}">The centre of your constellation</div><div class="exp-h"><b>${RK[R][0]}</b><span class="dev">${RK[R][1]}</span><span class="exst on" style="--c:${TGOLD}">${allTrials()} trials</span></div><p class="exp-en">${EN[RK[R][0]]}</p><p class="exp-s">${R>=6?"You have reached the highest title.":`${need} more trial${need===1?"":"s"} across your paths to become ${RK[R+1][0]}.`}</p>
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

function storiesList(){const L=SYN.filter(x=>x.p.every(p=>S.paths.includes(p)));if(!L.length)return `<p class="sub">${sel().length<2?"Choose two or more paths to unlock stories.":"No bridges between your current paths yet. Bridges exist between Strength, Family and Music, and more are coming."}</p>`;
 return `<div class="stories">${L.map(x=>{const on=S.syn.includes(x.id);return `<button class="storyc${on?"":" off"}" data-story="${x.id}"><span class="pair">${x.p.map(p=>medal(p,"sm")).join("")}</span><div><b>${x.n}</b><small>${on?"Unlocked · tap to watch":`Opens when ${x.p.map(p=>PATHS[p].name).join(" and ")} pass ${x.req} trials · preview`}</small></div><span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></button>`}).join("")}</div>`}

/* ================= layout v2: Today ================= */
let TANIM=null;
const seg=(k,opts)=>{S.seg=S.seg||{};const cur=S.seg[k]||opts[0][0];return `<div class="segc" role="tablist">${opts.map(([v,l])=>`<button role="tab" aria-selected="${cur===v}" data-seg="${k}:${v}">${l}</button>`).join("")}</div>`};
const segOf=(k,d)=>(S.seg&&S.seg[k])||d;
function todayMins(pid){const it=S.plan.items.filter(x=>(x.kind==="task"||x.kind==="anchor")&&x.pid===pid);return{done:it.filter(x=>x.done).reduce((a,x)=>a+x.m,0),plan:it.reduce((a,x)=>a+x.m,0)}}
const todayFrac=pid=>{const m=todayMins(pid);return m.plan?Math.min(1,m.done/m.plan):0};
function activityRings(){const ps=todayPs(),n=ps.length,sw=n<=3?13:n===4?11:9,gap=3,R0=70;let svg="",leg="",tD=0,tP=0;
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
 if(backupDue())out.push(card("",'data-act="export"',`<span class="sci">${ic("learn")}</span>`,"Keep your progress safe","Back up now",S.lastBackup?`Last backup ${diff(S.lastBackup,td())} days ago`:"Your progress lives only on this phone"));
 const pid=companionPid(t);if(pid){const g=CHAR[pid],J=S.journey,trav=J&&J.d===t&&!J.back,C=CHAPTERS[g][trav?J.ch:nextCh(g)],ret=J&&J.back&&J.ret===t;
  out.push(card("",ret?`data-chap="${J.g}:${J.ch}"`:S.days[t]&&S.days[t].a&&S.closed!==t?'data-eve="1"':`data-person="${g}"`,medal(pid,"sm"),`Companion · ${PEOPLE[g].n}`,ret?`Back from ${CHAPTERS[J.g][J.ch].dest}`:trav?`On the way to ${C.dest}`:`Waiting to travel to ${C.dest}`,ret?"Watch the chapter again":trav?"Back tomorrow morning":"One task, then close your day"))}
 const n=nudges()[0];if(n)out.push(card("",`data-nudge-act="${n.pid}:${n.act}"`,medal(n.pid,"sm"),n.t,n.act==="add"?`Add ${PATHS[n.pid].name}?`:`Pause ${PATHS[n.pid].name}?`,n.s.split(". ")[0]+".",`<button class="scx" data-nudge-x="${n.k}" aria-label="Not now">×</button>`));
 if(S.lore!=="well"&&learnLeft()){const nx=LEARN.find(x=>!S.learned.includes(x.id));out.splice(Math.min(out.length,1),0,card("gold",'data-learn="1"',`<span class="sci gold">${ic("learn")}</span>`,"New to these stories?","Start here",`Next: ${nx.t}`))}
 out.push(card("",'data-today-cal="1"',`<span class="sci gold">${ic("calm")}</span>`,cal.fest?"Today’s festival":"Story for today",cal.n,cal.t));
 if(c.d===t)out.push(card("",'data-checkin="1"',`<span class="sci">${ic("sun")}</span>`,"Check-in",`${E_L[c.energy]} energy`,`${c.sore.length?"Sore "+c.sore.map(k=>SORE_L[k]).join(", "):"No soreness"} · tap to change`));
 {const f=fchOpen(),fc=fchCur();if(fc&&fchDone())out.unshift(card("gold",'data-fch="open"',`<span class="sci gold">${DIYA}</span>`,"Festival challenge complete",`Claim your ${fc.charm}`,fc.n));else if(f)out.unshift(card("gold",'data-fch="open"',`<span class="sci gold">${DIYA}</span>`,`Festival challenge · ${FEST[f.date].n}`,f.c.n,`${f.c.days} days · ${inDays(f.date)==="in 0 days"?"today":diff(td(),f.date)<0?"started yesterday":diff(td(),f.date)===0?"today":inDays(f.date)}`))}
 {const a=stAvail(),c=SS().cur;if(c&&stReady())out.unshift(card("gold",'data-st="open"',`<span class="sci gold">${DIYA}</span>`,"Story trial complete","Claim your title",STRIALS[c.i].n));else if(a>=0)out.unshift(card("gold",'data-st="open"',`<span class="sci gold">${DIYA}</span>`,`Story trial ready · Book ${a+1}`,STRIALS[a].n,`Pass it to become ${ARC_RANK[Math.min(6,a+1)][0]}`))}
 if(S.epic){const E=EPICS[S.epic.id],i=arcStage(),G=TPL(S.epic.goal);out.push(card("gold",'data-epic="1"',`<span class="sci gold">${ic("path")}</span>`,`Sankalpa · milestone ${i} of 7`,CAP(destText()),`${fmtN(S.epic.cur)} of ${fmtN(S.epic.goal.n)} ${G.u} · ${Math.max(0,daysLeft())} days left`))}
 else out.push(card("",'data-epic-setup="1"',`<span class="sci gold">${ic("path")}</span>`,"Optional · Sankalpa","Have a goal? Take a vow","3 goals suggested for you"));
 if(!S.fitDone&&!S.onb&&sel().length)out.push(card("",'data-fit="1"',`<span class="sci">${ic("sun")}</span>`,"New · 1 minute","Fit tasks to your life","Your kit, your space, your busy days"));
 {const q=onbNext();if(q)out.unshift(card("gold",`data-oq="${q.k}"`,`<span class="sci gold">${ic("learn")}</span>`,"One question · 30 sec",q.t,q.s,`<button class="scx" data-oqx="1" aria-label="Later">×</button>`))}
 if(out.length>=3)return `<div class="strip" role="list">${out.slice(0,4).join("")}</div>`;
 out.push(`<div class="sc2 quote2"><span><small>Thought for today</small><b>“${qt[0]}”</b><em>${qt[1]}</em></span></div>`);
 return `<div class="strip" role="list">${out.join("")}</div>`}
function taskRow(it){const d=new Date(),chk=`<button class="check" data-done="${it.id}" aria-label="${it.done?"Undo":"Mark done"}: ${esc(it.t)}">${ic("check")}</button>`;
 if(it.kind==="trial"){const P=PATHS[it.pid],k=it.done?it.k:S.prog[it.pid].m,sn=P.skills[k]?P.skills[k].n:"";return `<div class="trow trial" style="--c:${P.c}"><span class="trialicon">${ic(it.done?"check":"trial")}</span><button class="tx" data-trial-info="${it.pid}"><span class="tag">${P.name} trial · ${it.done?"earned":"unlocks"} ${sn}</span><b>${it.t}</b></button>${it.done?"":`<button class="mini pri" data-trial="${it.pid}">Passed</button>`}</div>`}
 if(it.kind==="bridge"){const sy=SYN.find(x=>x.id===it.sid);return `<div class="trow${it.done?" done":""}" style="--c:var(--gold)">${chk}<div class="tx"><b>${it.t}</b><small><span class="duo" style="--a:${PATHS[sy.p[0]].c};--b:${PATHS[sy.p[1]].c}"></span>Bridge · ${sy.n}</small></div></div>`}
 const P=PATHS[it.pid],g=it.done?it.g:Math.round(Math.max(5,it.m)*mult(it.pid)),x=poolItem(it);
 return `<div class="trow${it.done?" done":""}${it.kind==="anchor"?" anchor":""}" style="--c:${P.c}">${chk}<button class="tx" data-task="${it.id}"><b>${esc(progT(it.t))}</b><small><span class="dot"></span>${it.kind==="anchor"?"Your routine · ":""}${P.name} · ${it.m} min · +${g}${x&&x.tool&&!it.done?` · ${TOOLNAME[x.tool.type]}`:""}</small>${!it.done&&it.why?`<span class="why">${it.why}</span>`:""}</button>${!it.done&&it.kind==="task"?`<button class="swap" data-swap="${it.id}" aria-label="Swap this task">${ic("swap")}</button>`:""}</div>`}
function taskSheet(id){const it=S.plan.items.find(x=>x.id===id);if(!it)return;const P=PATHS[it.pid],x=poolItem(it);
 sheet(P.c,`<div class="kick">${P.name} · ${it.m} min · with ${P.hero}</div><h2>${esc(progT(it.t))}</h2><div class="cchips slotc">${SLOTS_D.map(([k,l])=>`<button class="chip" data-slot="${it.id}:${k}" aria-pressed="${it.slot===k}">${l}</button>`).join("")}</div>${it.why?`<p class="why" style="margin:6px 0 0">${it.why}</p>`:""}
 ${x?guideView(it):`<p class="sub" style="margin-top:12px">${it.kind==="anchor"?"Part of your weekly routine.":"Your own task."}</p>`}
 ${it.done?"":`<button class="cta fmgo" style="width:100%;margin-top:16px" data-focus="${it.id}">${ic("sun")} Start focus mode · ${it.m} min</button>`}
 <div class="row" style="margin-top:10px">${it.kind==="task"&&!it.done?`<button class="cta alt" data-swap="${it.id}">Swap</button>`:""}<button class="cta alt" data-done="${it.id}">${it.done?"Undo":"Mark done"}</button></div>`)}
function checkSheet(){if(!CI)CI=JSON.parse(JSON.stringify(checkToday()));const chip=(g,v,l,on)=>`<button class="chip" data-ci="${g}:${v}" aria-pressed="${on}">${l}</button>`;
 sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Check-in</div><h2>How are you today?</h2><p class="sub">Your tasks adjust to fit.</p>
 <div class="cirow"><span>Energy</span><div class="cchips">${["low","ok","high"].map(v=>chip("energy",v,E_L[v],CI.energy===v)).join("")}</div></div>
 <div class="cirow"><span>Sore</span><div class="cchips">${chip("sore","none","None",!CI.sore.length)}${Object.keys(SORE).map(k=>chip("sore",k,SORE_L[k][0].toUpperCase()+SORE_L[k].slice(1),CI.sore.includes(k))).join("")}</div></div>
 <div class="cirow"><span>Today</span><div class="cchips">${Object.keys(W_L).map(v=>chip("where",v,W_L[v],CI.where===v)).join("")}</div></div>
 <div class="cirow"><span>Day</span><div class="cchips">${chip("busy","0","Normal day",!(CI.busy===undefined?busyToday():CI.busy))}${chip("busy","1","Busy day",!!(CI.busy===undefined?busyToday():CI.busy))}</div></div>
 <button class="cta" style="width:100%;margin-top:18px" data-ci="apply">Fit my plan</button>`)}
function todayView(){
 const d=new Date(),h=d.getHours(),hi=h<5?"Still up":h<12?"Good morning":h<17?"Good afternoon":"Good evening";
 const items=S.plan.items,tl=TIMES.find(t=>t[0]===S.time)||TIMES[1],t=td(),dd=S.days[t];
 const eve=S.closed===t?`<div class="evedone">Day closed${dd&&dd.mood?` · ${MOODS.find(m=>m[0]===dd.mood)[1].toLowerCase()}`:""}</div>`:`<button class="evebar" data-eve="1">${ic("moon")}<span>Close your day</span></button>`;
 return header(`${hi}${S.name?", "+esc(S.name):""}`,d.toLocaleDateString("en-GB",{weekday:"long"})+", "+t.split("-").reverse().join("."))+tipCard()+`<div class="wrap">
 ${pathRings()}${bubbles()}
 <div class="thead" style="margin-top:18px"><h2>Today’s practice</h2><button class="chip" data-time-cycle="1" aria-label="Time for new tasks: ${tl[1]}. Tap to change">${tl[1]}</button></div>
 ${restBanner()}${busyToday()?`<div class="busyn">Busy day: one short task per mentor. Your streak is safe with just one.</div>`:""}${dayTimeline(timeSort(items))}
 <div class="tfoot"><button class="linkbtn" data-other="">+ I did something else</button>${eve}</div><button class="linkbtn restl" data-rest="1">${isRest(addD(td(),1))?"Tomorrow is a rest day · change":"Plan a rest day"}</button></div>`}

/* ================= layout v2: Journey ================= */
function dayMinsBy(d){const by={};S.log.filter(l=>l.d===d&&l.pid!=="bridge").forEach(l=>{by[l.pid]=(by[l.pid]||0)+logMin(l)});return by}
function pathCard(pid){const P=PATHS[pid],pr=S.prog[pid],max=pr.m>=5,need=NEED[Math.min(pr.m,4)],f=max?1:Math.min(1,pr.xp/need),full=!max&&pr.xp>=need,C=2*Math.PI*26;
 const days=Array.from({length:7},(_,i)=>addD(td(),i-6)),vals=days.map(d=>dayMinsBy(d)[pid]||0),mx=Math.max(20,...vals),wk=vals.reduce((a,b)=>a+b,0);
 return `<button class="pc2${full?" full":""}" data-pdetail="${pid}" style="--c:${P.c}"><span class="lvr"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="var(--surface2)" stroke-width="5"/><circle cx="32" cy="32" r="26" fill="none" stroke="${full?"var(--gold)":P.c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${(f*C).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 32 32)"/></svg>${medalA(pid,"sm")}${pid===focusPid()?`<span class="wfb">★</span>`:""}</span>
 <span class="pcm"><b>${P.name}</b><small>${awLine(pid)}</small><em>${max?"Mastered":full?"Trial ready":`${Math.min(pr.xp,need)}/${need} to ${P.skills[pr.m].n}`}</em></span>
 <span class="spark" aria-label="${wk} minutes in the last 7 days">${vals.map(v=>`<i style="height:${Math.max(3,v/mx*34)}px;opacity:${v?1:.25}"></i>`).join("")}<small>${wk} min · 7d</small></span></button>`}
function mCard(pid,g,on,attr){const I=MINFO[g]||["","",""],G=GUIDE_INTRO[g]||{};return `<button class="mcard${on?" on":""}" ${attr} aria-pressed="${on}" style="--c:${PATHS[pid].c}">${medalG(g,"md")}<span><b>${PEOPLE[g].n}<span class="dev">${PEOPLE[g].d}</span></b><em>${I[0]}</em><small>${I[1]}</small><small class="best">Best if ${I[2]}.</small></span><i>${on?"✓":""}</i></button>`}
function mentorSheet(pid){const P=PATHS[pid],cur=CHAR[pid];
 sheet(P.c,`<div class="kick" style="color:${P.c}">${P.name}</div><h2>Who will awaken in you?</h2><p class="sub">Each mentor brings a different style to your tasks and advice. Your progress stays with the path.</p>
 <div class="mlist">${MENTORS[pid].map(g=>mCard(pid,g,g===cur,`data-msel="${pid}:${g}"`)+`<p class="mmom">${(GUIDE_INTRO[g]||{}).moment||""}</p>`).join("")}</div>`)}
function pathDetail(pid){const P=PATHS[pid],g=CHAR[pid],pp=PEOPLE[g],pr=S.prog[pid],full=pr.m<5&&pr.xp>=NEED[pr.m];
 sheet(P.c,`<div style="display:flex;gap:14px;align-items:center">${medalA(pid,"lg")}<div><div class="kick">${REALMS.find(r=>r.id===P.realm).n} · with ${pp.n}</div><h2>${P.name}</h2><small class="mute">${awLine(pid)}</small></div></div>
 <div class="awbar">${AWAKE.map((a,k)=>`<i class="${k<=Math.min(5,pr.m)?"on":""}" title="${a}"></i>`).join("")}</div>
 <div class="box mbox"><small>Your inner mentor</small><b>${pp.n}</b> · ${MINFO[g]?MINFO[g][0]:""}${MENTORS[pid]?`<button class="mini" data-mentor="${pid}">Change</button>`:""}</div>
 <button class="idrow" data-ident="${pid}"><small>Who you are becoming</small>${idOf(pid)?`<b>I am becoming ${esc(idOf(pid))}.</b>`:`<span class="mute">Add your “I am becoming…” line</span>`}</button>
 ${pr.m<5?`<div class="track" style="--c:${full?"var(--gold)":P.c};margin:14px 0 4px"><i style="width:${Math.min(100,pr.xp/NEED[pr.m]*100)}%"></i></div><p class="sub">${full?`Trial ready: ${trialText(pid)}`:`${Math.min(pr.xp,NEED[pr.m])} of ${NEED[pr.m]} growth to ${P.skills[pr.m].n}`}</p>`:""}
 ${full?`<button class="cta" style="width:100%;margin-bottom:12px" data-trial="${pid}">I passed the trial</button>`:""}
 <div class="skills">${P.skills.map((sk,k)=>{const on=has(pid,k);return `<button class="skill${on?"":" off"}" style="--c:${P.c}" data-skill="${pid}:${k}"><span class="ic">${on?sk.d.slice(0,1):k+1}</span><div><b>${sk.n}<span class="dev">${sk.d}</span></b><small class="enm">${EN[sk.n]||""}</small><small>${on?PERK[sk.perk](P.name):k===pr.m?"Next":"Locked"}</small></div></button>`}).join("")}</div>
 <div class="row" style="margin-top:14px"><button class="cta alt" data-intro="${pid}">Meet ${pp.n}</button><button class="cta alt" data-path-pause="${pid}">Pause path</button></div>`)}
function focusManage(){sheet("var(--ink)",`<div class="kick" style="color:var(--mute)">Your focus</div><h2>${sel().length} of ${MAXP} paths</h2><p class="sub">Tap a path to read about it, add it or pause it. Paused paths keep their progress.</p>
 ${REALMS.map(R=>`<div class="realm"><div class="rh"><b>${R.n}</b><span class="dev">${R.d}</span><small>${R.s} · ${R.about}</small></div><div class="rpaths">${ORDER.filter(p=>PATHS[p].realm===R.id).map(p=>{const on=S.paths.includes(p),pr=S.prog[p];return `<button class="rpath${on?" on":""}" data-pathsheet="${p}" style="--c:${PATHS[p].c}">${medal(p,"xs")}<span><b>${PATHS[p].name}</b><small>${on?"Active":pr.m||pr.xp?`Paused · ${pr.m}/5`:"Not started"}</small></span></button>`}).join("")}${SOON.filter(x=>x[2]===R.id).map(([n,h])=>`<div class="rpath soonp"><span class="medal xs" style="--c:var(--faint)"></span><span><b>${n}</b><small>Soon · ${h}</small></span></div>`).join("")}</div></div>`).join("")}`)}
function journeyView(){let sg=segOf("journey","tree");if(sg==="cal"||(sg==="epic"&&!STORY_ON))sg="tree";let body="";
 if(sg==="paths")body=`${nudges().map(nudgeCard).join("")}<div class="pclist">${sel().map(pathCard).join("")}</div><button class="cta alt" style="width:100%;margin-top:12px" data-focus-manage="1">Manage focus · ${sel().length} of ${MAXP}</button>${STORY_ON?"":yatraLog()}`;
 if(sg==="epic")body=storyBody();
 if(sg==="tree")body=`${treeSvg()}<div class="block"><h2>Bridges and stories</h2><p class="sub">When two paths both pass 2 trials, their guides’ story unlocks.</p>${storiesList()}</div>`;
 if(sg==="cal"){const t=td(),r=ritu(t),cal=todayCal(),up=upcoming(4);body=`${r?`<div class="season"><span class="chip2">Season</span><h3>${r.d?`${r.n} ritu<span class="dev">${r.d}</span>`:r.n}</h3><p>${r.s}</p></div>`:""}
 <button class="calcard" data-today-cal="1"><small class="mute" style="font-size:12px;font-weight:600">${cal.fest?"Today in the Indian calendar":"A story for today"}</small><b>${cal.n}</b><span>Try today: ${cal.t}</span></button>
 ${up.length?`<div class="block"><h2>Coming up</h2><div class="upl">${up.map(k=>`<button class="upi" data-fest="${k}"><span class="ud"><b>${+k.slice(8)}</b><small>${MONS[+k.slice(5,7)-1]}</small></span><span><b>${FEST[k].n}</b><small>${inDays(k)}${FEST[k].approx?" · date approximate":""}</small></span></button>`).join("")}</div></div>`:""}
 <div class="block"><h2>Yatra log</h2><p class="sub">Each closed day sends your companion one step further</p>${sel().map(pid=>{const g=CHAR[pid],n=CHAPTERS[g].length,k=S.chap[g]||0,got=S.chapters.filter(c=>c.g===g);return `<div class="ylog" style="--c:${PATHS[pid].c}">${medal(pid,"sm")}<div><b>${PEOPLE[g].n}</b><small>${k>=n?`All ${n} chapters done.`:`Next: ${CHAPTERS[g][k%n].dest} · ${Math.min(k,n)} of ${n}`}</small><div class="ychips">${CHAPTERS[g].map((c,i)=>{const h=got.some(x=>x.ch===i);return `<button class="ych${h?" on":""}" ${h?`data-chap="${g}:${i}"`:"disabled"} aria-label="Chapter ${i+1}: ${c.dest}">${i+1}</button>`}).join("")}</div></div></div>`}).join("")}</div>`}
 return header("Journey")+tipCard()+`<div class="wrap">${seg("journey",STORY_ON?[["tree","Tree"],["paths","Paths"],["epic","Story"]]:[["tree","Tree"],["paths","Paths"]])}<div class="segbody">${body}</div></div>`}

/* ================= layout v2: Hero ================= */
function weekChart(){const days=Array.from({length:7},(_,i)=>addD(td(),i-6)),ps=sel(),data=days.map(dayMinsBy),tots=data.map(o=>Object.values(o).reduce((a,b)=>a+b,0)),mx=Math.max(30,...tots),H=120,L=["Su","Mo","Tu","We","Th","Fr","Sa"];
 let g="";days.forEach((d,i)=>{let y=H;const x=14+i*42;ps.forEach(p=>{const v=data[i][p]||0,h=v/mx*H;if(h>0){y-=h;g+=`<rect x="${x}" y="${y.toFixed(1)}" width="26" height="${h.toFixed(1)}" rx="3" fill="${PATHS[p].c}"/>`}});
  g+=`<text x="${x+13}" y="${H+16}" text-anchor="middle" font-size="11" fill="${d===td()?"var(--ink)":"var(--mute)"}" font-weight="${d===td()?600:400}" font-family="Inter,sans-serif">${L[new Date(d+"T12:00:00").getDay()]}</text>${tots[i]?`<text x="${x+13}" y="${(y-5).toFixed(1)}" text-anchor="middle" font-size="10" fill="var(--mute)" font-family="Inter,sans-serif">${tots[i]}</text>`:""}`});
 return `<div class="cardx"><div class="cx-h"><b>Last 7 days</b><small>${tots.reduce((a,b)=>a+b,0)} min</small></div><svg viewBox="0 0 300 ${H+24}" class="wchart" role="img" aria-label="Minutes per day for the last 7 days">${g}</svg><div class="lgrow">${ps.map(p=>`<span style="--c:${PATHS[p].c}"><span class="dot"></span>${PATHS[p].name}</span>`).join("")}</div></div>`}
function heatmap(){const t=td(),start=addD(monOf(t),-28),cells=[];for(let i=0;i<35;i++){const d=addD(start,i),m=Object.values(dayMinsBy(d)).reduce((a,b)=>a+b,0),a=S.days[d]&&S.days[d].a,lv=d>t?-1:m>=60?4:m>=30?3:m>0||a?2:0;cells.push(`<i class="h${lv}${d===t?" now":""}" title="${d.split("-").reverse().join(".")}: ${m} min"></i>`)}
 const act=Object.keys(S.days).filter(d=>d>=start&&d<=t&&S.days[d].a).length;
 return `<div class="cardx"><div class="cx-h"><b>Last 5 weeks</b><small>${act} active days</small></div><div class="hm-l">${["M","T","W","T","F","S","S"].map(x=>`<small>${x}</small>`).join("")}</div><div class="hm">${cells.join("")}</div><div class="hm-k"><small>Less</small><i class="h0"></i><i class="h2"></i><i class="h3"></i><i class="h4"></i><small>More</small></div></div>`}
function heroView(){let sg=segOf("hero","hero");if(sg==="more")sg="hero";let body="";
 const st=stage(),n=sel().length,need=(st+1)*n-msTotal(),pct=st>=5?100:Math.round((msTotal()-st*n)/n*100);
 if(sg==="hero")body=`<div class="stage"><button class="avbtn" data-herosheet="1" aria-label="Open your hero and gear">${avatar(st)}<span class="avtap">Tap to see your gear</span></button><button class="zfab" data-zoom="1" aria-label="Zoom into your hero">${ic("zoom")}</button>${(()=>{const i=lifeRank(),t=allTrials(),nx=ARC_GATE[i+1],nd=i>=6?0:nx-t,pc=i>=6?100:Math.round((t-ARC_GATE[i])/(nx-ARC_GATE[i])*100);const sa=stAvail(),sc=SS().cur;return `<div class="rank">${ARC_RANK[i][0]}<span class="dev">${ARC_RANK[i][1]}</span><small class="rankEn">${EN[ARC_RANK[i][0]]} · ${t} trial${t===1?"":"s"} passed</small></div>
  <div class="track"><i style="width:${STORY_ON&&(sc||sa>=0)?100:Math.max(0,Math.min(100,pc))}%"></i></div><small>${i>=6?"The highest title":STORY_ON&&sc?`Story trial in progress: ${STRIALS[sc.i].n}`:STORY_ON&&sa>=0?`Your story trial is ready: ${STRIALS[sa].n}`:`${Math.max(0,nd)} more path trial${nd===1?"":"s"} to become ${ARC_RANK[i+1][0]}`}</small>`})()}</div>
  ${lifeCard()}<div class="stat3" style="margin-top:12px"><button class="stat" data-streak="1"><b>${S.streak}</b><small>Day streak</small></button><div class="stat"><b>${S.goal}</b><small>Streak goal</small></div><div class="stat"><b>${S.best}</b><small>Best streak</small></div></div>
  <div class="cardx" style="margin-top:12px"><div class="cx-h"><b>Balance</b><small>Strongest path per realm</small></div>${realmWheel()}</div>`;
 if(sg==="stats"){const closed=Object.values(S.days).filter(x=>x.mood).length;body=`${weekChart()}${heatmap()}<div class="stat3"><div class="stat"><b>${S.total}</b><small>Total growth</small></div><div class="stat"><b>${msTotal()}</b><small>Trials passed</small></div><div class="stat"><b>${closed}</b><small>Days closed</small></div></div>
  <div class="block"><h2>Weekly reviews</h2>${reviewHistory()}</div><div class="block"><h2>What Abhyasa has learned</h2>${learnedView()}</div>`}
 if(sg==="coll"){const items=[];sel().forEach(pid=>PATHS[pid].skills.forEach((s2,k)=>{if(s2.item)items.push({pid,s2,k})}));const total=sel().reduce((a,p)=>a+CHAPTERS[CHAR[p]].length,0);
  body=`<div class="block" style="margin-top:4px"><h2>Your guides</h2><div class="guides" style="margin-top:10px">${sel().map(pid=>{const c=CHAR[pid];return `<button class="gd" data-person="${c}" style="--c:${PATHS[pid].c}">${medal(pid,"lg")}<b>${PEOPLE[c].n}</b><small>${PATHS[pid].name}</small></button>`}).join("")}</div></div>
  ${enemyBlock()}<div class="block"><h2>Past vows</h2>${hallView()}</div>
  <div class="block"><h2>Arsenal</h2><div class="items" style="margin-top:10px">${items.map(({pid,s2,k})=>{const on=has(pid,k),P=PATHS[pid];return `<div class="item${on?"":" off"}" style="--c:${P.c}"><i>${ic(on?s2.item:"lock")}</i><b>${s2.itemName||s2.n}</b><small>${on?P.hero:`${P.name} trial ${k+1}`}</small></div>`}).join("")}</div></div>
  <div class="block"><h2>Charms</h2><p class="sub">${S.charms.length} of ${total} found on your companions’ journeys</p>${S.charms.length?`<div class="charms">${S.charms.map(c=>`<div class="charm">${charmSvg(c.g,36)}<b>${c.n}</b><small>${PEOPLE[c.g].n}</small></div>`).join("")}</div>`:""}</div>`}
 if(sg==="more")body=`<button class="revcard" data-learn="1" style="margin-top:4px"><span class="revi">${ic("learn")}</span><span><b>Learn</b><small>The app and the stories behind it · ${LEARN.length-learnLeft()} of ${LEARN.length} guides done</small></span></button><div class="block"><h2>Stories and glossary</h2>${glossaryView()}</div><button class="revcard" data-feedback="1"><span class="revi">${ic("love")}</span><span><b>Send feedback</b><small>Ideas, bugs or stories. It helps shape Abhyasa.</small></span></button><div class="block"><h2>Calendar</h2><p class="sub">What shows on your Calendar tab and morning cards. The story for each day stays in every option.</p><div class="cchips">${[["indian","Indian festivals and ritus"],["seasons","Spring, summer, autumn, winter"],["none","No calendar"]].map(([k,l])=>`<button class="chip" data-calmode="${k}" aria-pressed="${calMode()===k}">${l}</button>`).join("")}</div></div><div class="block"><h2>App</h2>${appCard()}${S.lastBackup?`<p class="sub">Last backup: ${S.lastBackup.split("-").reverse().join(".")}</p>`:""}</div>
  <div class="links"><button class="mini" data-fit="1">Your life and kit</button><button class="mini" data-act="routine">Edit routine</button><button class="mini" data-act="redo">Retake the questionnaire</button><button class="mini" data-act="reset">Reset everything</button></div><p class="sub" style="text-align:center;margin-bottom:30px">Abhyasa ${APP_VERSION}</p>`;
 return header("Hero")+tipCard()+`<div class="wrap">${seg("hero",[["hero","Hero"],["stats","Stats"],["coll","Collection"]])}<div class="segbody">${body}</div></div>`}

/* ================= questionnaire ================= */
let Q=null;
const KIT_FOR={gym:"gym",climb:"wall",swim:"pool"};
function newQ(){return{full:S.paths.length>0,life:Object.assign({busy:[]},JSON.parse(JSON.stringify(S.life||{}))),mentor:Object.assign({},S.mentor||{}),i:S.paths.length?1:0,name:S.name||"",paths:[...S.paths],level:Object.fromEntries(S.paths.map(p=>[p,Math.min(3,S.prog[p].m)])),tags:JSON.parse(JSON.stringify(S.tags||{})),kit:[...(S.kit||[])],anchors:JSON.parse(JSON.stringify(S.anchors||{})),time:S.time||30,goal:S.goal||7,lore:S.lore||""}}
function qSteps(){if(!Q.full)return["welcome","paths","levels","reveal"];const st=["welcome","name","paths","lore"];ORDER.filter(p=>Q.paths.includes(p)).forEach(p=>st.push("p:"+p));st.push("fit","routine","time","goal","reveal");return st}
function quiz(){
 if(!Q)Q=newQ();
 const steps=qSteps();Q.i=Math.min(Q.i,steps.length-1);const step=steps[Q.i],pct=Math.round(Q.i/(steps.length-1)*100);
 if(step==="welcome"){setBg(pageScene());$("#app").innerHTML=`<div class="quiz"><div class="wrap"><div class="welcome"><div class="big">अभ्यास</div><h1>Abhyasa</h1><p>Steady practice over a long time. Three quick steps, about a minute, and your first tasks are ready.</p>${Q.full?"":`<input class="name" id="qname" autocomplete="given-name" placeholder="Your first name (optional)" value="${esc(Q.name)}" style="margin-top:14px">`}</div><div class="qfoot" style="flex-direction:column"><button class="cta" data-q="next">Start</button></div></div></div>`;const wi=$("#qname");if(wi)wi.addEventListener("input",e=>Q.name=e.target.value);return}
 let body="",foot="";
 if(step==="name"){body=`<h1>What should we call you?</h1><p class="lead">Used only to greet you. You can skip this.</p><input class="name" id="qname" autocomplete="given-name" placeholder="Your first name" value="${esc(Q.name)}">`;foot=`<button class="cta alt" data-q="skip">Skip</button><button class="cta" data-q="next">Continue</button>`}
 else if(step==="paths"){const ok=Q.paths.length>0;body=`<h1>${Q.full?"Choose up to 8 things to grow":"What do you want to grow?"}</h1><p class="lead">${Q.full?"Pick what matters most in your life right now. Each path has a guide from Indian stories. Each day you walk with up to 4 of them, and you can change this any time.":"Start with 3. Fewer paths means faster growth, and you can add more any time. Each path has a mentor from Indian stories."}</p>
 ${REALMS.map(R=>`<div class="qrealm"><div class="rh"><b>${R.n}</b><span class="dev">${R.d}</span><small>${R.s} · ${R.about}</small></div><div class="opts">${ORDER.filter(p=>PATHS[p].realm===R.id).map(p=>{const P=PATHS[p];return `<button class="opt" data-qpath="${p}" aria-pressed="${Q.paths.includes(p)}" style="--c:${P.c}"><span class="pi">${ic(p)}</span><div><b>${P.name}</b><small>${P.about} · with ${P.hero}</small></div><span class="tick">${ic("check")}</span></button>`}).join("")}${SOON.filter(x=>x[2]===R.id).map(([n,h])=>`<div class="opt" style="opacity:.5"><span class="pi" style="--c:var(--faint)">${ic("calm")}</span><div><b>${n}</b><small>Coming soon · with ${h}</small></div></div>`).join("")}</div></div>`).join("")}`;foot=`${!Q.full&&Q.paths.length>3?`<p class="sub" style="width:100%;text-align:center;margin:0 0 6px">${Q.paths.length} paths: growth on each will be slower. 3 is a good start.</p>`:""}<button class="cta" data-q="next" ${ok?"":"disabled"}>${ok?`Continue with ${Q.paths.length} path${Q.paths.length===1?"":"s"}`:"Pick at least one"}</button>`}
 else if(step==="levels"){const ps=ORDER.filter(p=>Q.paths.includes(p));ps.forEach(p=>{if(Q.level[p]===undefined)Q.level[p]=0});
  body=`<h1>Where are you now?</h1><p class="lead">Be honest. Your first tasks start here.</p><div class="lvrows">${ps.map(p=>{const P=PATHS[p],lv=Q.level[p];return `<div class="lvrow" style="--c:${P.c}"><div class="lvh">${medal(p,"xs")}<b>${P.name}</b><small>with ${P.hero}</small></div><div class="lvbtns">${["Starting","A little","Regular","Strong"].map((l,k)=>`<button class="lvb" data-qlvl="${p}:${k}" aria-pressed="${lv===k}">${l}</button>`).join("")}</div><small class="lvd">${P.levels[lv]||""}</small></div>`}).join("")}</div>`;
  foot=`<button class="cta" data-q="next">Continue</button>`}
 else if(step.startsWith("p:")){const pid=step.slice(2),P=PATHS[pid],lv=Q.level[pid],tg=Q.tags[pid]||[],ok=lv!==undefined;
  body=`<div class="sub" style="color:${P.c};font-weight:600;margin:0 0 4px">${P.name}</div><h1>${P.q}</h1><p class="lead">Be honest. Your tasks start here, not where you wish you were.</p>
  <div class="steps">${P.levels.map((l,k)=>`<button class="lvl" style="--c:${P.c}" data-qlvl="${pid}:${k}" aria-pressed="${lv===k}"><span class="bars">${[0,1,2,3].map(b=>`<i class="${b<=k?"on":""}" style="height:${6+b*4.5}px"></i>`).join("")}</span>${l}</button>`).join("")}</div>
  <div class="qlabel">Focus on (pick any)</div><div class="chips" style="--c:${P.c}">${P.tags.map(([k,l])=>`<button class="chip" data-qtag="${pid}:${k}" aria-pressed="${tg.includes(k)}">${l}</button>`).join("")}</div>
  ${MENTORS[pid]?`<div class="qlabel">Who will awaken in you?</div><div class="mlist">${MENTORS[pid].map(g=>mCard(pid,g,(Q.mentor[pid]||CHAR0[pid])===g,`data-qmentor="${pid}:${g}"`)).join("")}</div>`:`<div class="qlabel">Your inner mentor</div><div class="mlist">${mCard(pid,CHAR0[pid],true,"disabled")}</div>`}`;
  foot=`<button class="cta" data-q="next" ${ok?"":"disabled"}>${ok?"Continue":"Pick where you are"}</button>`}
 else if(step==="fit"||step==="kit"){Q.life.busy=Q.life.busy||[];body=`<h1>Your life and your kit</h1><p class="lead">So your tasks fit your real day. Skip anything you like.</p>${fitBody({life:Q.life,kit:Q.kit,paths:ORDER.filter(p=>Q.paths.includes(p))},"q")}`;foot=`<button class="cta" data-q="next">Continue</button>`}
 else if(step==="routine"){const acts=ACTS.filter(a=>Q.paths.includes(a.pid));body=`<h1>What do you already do each week?</h1><p class="lead">Tap the days. These count as tasks, and new tasks are planned around them.</p><div class="rtable">${acts.map(a=>`<div class="rrow"><div class="rname"><span class="dot" style="--c:${PATHS[a.pid].c}"></span>${a.n}<small>about ${a.m} min</small></div><div class="rdays">${[1,2,3,4,5,6,0].map(d=>`<button class="day" data-qday="${a.id}:${d}" aria-pressed="${(Q.anchors[a.id]||[]).includes(d)}" aria-label="${a.n} on ${DAYS[d]}">${DAYS[d].slice(0,2)}</button>`).join("")}</div></div>`).join("")}</div>`;foot=`<button class="cta" data-q="next">Continue</button>`}
 else if(step==="time"){body=`<h1>How much time for new practice each day?</h1><p class="lead">On top of your routine. You can change it any day.</p><div class="opts">${[[15,"15 min","A small daily spark"],[30,"30 min","Steady growth"],[45,"45 min","Serious practice"],[75,"60+ min","Deep commitment"]].map(([v,l,d])=>`<button class="opt" data-qtime="${v}" aria-pressed="${Q.time===v}" style="--c:var(--ink)"><div><b>${l}</b><small>${d}</small></div><span class="tick">${ic("check")}</span></button>`).join("")}</div>`;foot=`<button class="cta" data-q="next">Continue</button>`}
 else if(step==="lore"){body=`<h1>How well do you know these stories?</h1><p class="lead">Each path has a guide from Indian stories: the Ramayana, Mahabharata and Puranas. You don’t need to be religious or know them already.</p><div class="opts">${[["well","I know them well","Skip the introductions"],["some","A little","Short intros for each guide"],["new","They’re new to me","Short intros, plus explainers along the way"]].map(([v,l,d])=>`<button class="opt" data-qlore="${v}" aria-pressed="${Q.lore===v}" style="--c:var(--ink)"><div><b>${l}</b><small>${d}</small></div><span class="tick">${ic("check")}</span></button>`).join("")}</div>`;foot=`<button class="cta" data-q="next" ${Q.lore?"":"disabled"}>${Q.lore?"Continue":"Pick one"}</button>`}
 else if(step==="goal"){body=`<div class="flame big" style="margin:0 0 8px">${DIYA}</div><h1>Commit to a daily streak</h1><p class="lead">One task a day keeps your lamp lit. Choosing your own goal makes it easier to keep.</p><div class="opts">${[[7,"7 days","A good start"],[14,"14 days","Getting serious"],[30,"30 days","A real habit"],[50,"50 days","Fully committed"]].map(([v,l,d])=>`<button class="opt" data-qgoal="${v}" aria-pressed="${Q.goal===v}" style="--c:var(--ink)"><div><b>${l}</b><small>${d}</small></div><span class="tick">${ic("check")}</span></button>`).join("")}</div>`;foot=`<button class="cta" data-q="next">Commit to my goal</button>`}
 else if(step==="reveal"){const ps=ORDER.filter(p=>Q.paths.includes(p)),wk=ACTS.filter(a=>ps.includes(a.pid)&&(Q.anchors[a.id]||[]).length).map(a=>`${a.n}: ${[1,2,3,4,5,6,0].filter(d=>Q.anchors[a.id].includes(d)).map(d=>DAYS[d].slice(0,3)).join(", ")}`);
  body=`<div style="width:130px;margin:0 auto">${avatar(0)}</div><h1 style="text-align:center">Your paths are open</h1><p class="lead" style="text-align:center">${Q.full?"Daily tasks fill your meters. Each trial earns a skill, and some bring weapons and gifts.":"Your first tasks are ready. Each day one small question helps Abhyasa fit you better."}</p>
  <div class="reveal">${ps.map(p=>{const P=PATHS[p],k=Q.level[p]||0;return `<div class="rv" style="--c:${P.c}"><span class="pi">${ic(p)}</span><div><b>${P.name} with ${P.hero}</b><small>${k?`Starting at ${RANKS[k][0]}: ${k} skill${k>1?"s":""} already earned`:"Starting at the first step"}</small></div></div>`}).join("")}</div>
  ${wk.length?`<p class="sub" style="margin-top:14px">Your week: ${wk.join(" · ")}</p>`:""}`;
  foot=`<button class="cta" data-q="go">Begin</button>`}
 $("#app").innerHTML=`<div class="quiz"><div class="wrap"><div class="qtop"><button class="back" data-q="back" aria-label="Back">${ic("back")}</button><div class="prog"><i style="width:${pct}%"></i></div></div><div class="qbody">${body}</div><div class="qfoot">${foot}</div></div></div>`;
 const inp=$("#qname");if(inp)inp.addEventListener("input",e=>Q.name=e.target.value);
 setBg(pageScene());lastView="quiz"+Q.i;const app=$("#app");app.classList.remove("enter");void app.offsetWidth;app.classList.add("enter");
}
function finishQuiz(){
 const redo=S.paths.length>0;
 if(!Q.full){Q.lore=Q.lore||"some";S.onb=S.onb||{start:td(),asked:[],skip:""}}S.name=Q.name.trim().slice(0,30);S.paths=ORDER.filter(p=>Q.paths.includes(p));S.mentor=Object.assign({},S.mentor||{},Q.mentor||{});applyMentors();if(Q.full){S.life=Q.life||S.life;S.kitSeen=[...new Set([...(S.kitSeen||[]),...S.paths.flatMap(p=>(KITP[p]||[]).map(x=>x[0]))])];S.fitDone=1}S.tags=Q.tags;S.time=Q.time;S.kit=Q.kit;S.anchors=Q.anchors;S.goal=Q.goal||7;S.lore=Q.lore||"some";const before=[...S.intro];
 S.paths.forEach(p=>{const k=Q.level[p]||0;if(S.prog[p].m<k)S.prog[p]={m:k,xp:0}});
 S.syn=S.syn.filter(id=>SYN.find(s=>s.id===id).p.every(p=>S.paths.includes(p)));
 SYN.forEach(s=>{if(!S.syn.includes(s.id)&&s.p.every(p=>S.paths.includes(p)&&S.prog[p].m>=s.req))S.syn.push(s.id)});
 S.seen=Math.max(S.seen,stage());S.rk=Math.max(S.rk||0,lifeRank());S.on=true;S.view="today";S.plan={d:td(),items:S.plan.d===td()?S.plan.items.filter(x=>x.done):[],swaps:0,closed:false};S.plan.items=buildPlan(S.plan.items);if(!redo)S.deck=td();Q=null;save();render();const fast=!!(S.onb&&S.onb.start===td()),ip=fast?[companionPid()].filter(Boolean):sel();if(S.lore==="new")setTimeout(()=>playPack("tour",()=>playIntro(ip)),400);else if(wantIntros())setTimeout(()=>playIntro(ip),400);window.scrollTo(0,0);
 toast(redo?"Your plan is updated":"Your first tasks are ready");
 try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
}

/* ================= sheets ================= */
let LASTF=null;function sheet(c,h){if(!$(".scrim"))LASTF=document.activeElement;sayStop();openLayer(`<div class="scrim" data-close="1"><div class="sheet" style="--c:${c}" role="dialog" aria-modal="true" tabindex="-1">${h}</div></div>`);{const st=$(".sheet .story");if(st&&canSay())st.insertAdjacentHTML("beforebegin",`<button class="listen" data-listen="1">${ic("sound")} Listen</button>`)}const sh=$(".sheet");if(sh&&!sh.querySelector("textarea,input:not([type=file])"))sh.focus({preventScroll:true})}
function skillSheet(pid,k){const P=PATHS[pid],s=P.skills[k],on=has(pid,k),pr=S.prog[pid],rf=(S.trialLog||[]).filter(x=>x.pid===pid&&x.k===k).pop();
 sheet(P.c,`<div class="kick">${P.name} with ${P.hero} · skill ${k+1} of 5</div><h2>${s.n}<span class="dev">${s.d}</span></h2>${enLine(s.n)}<p class="story">${skS(pid,s,k)}</p>
 <div class="box"><small>Effect</small>${PERK[s.perk](P.name)}${s.item?`<small style="margin-top:6px">Gift</small>${s.itemName||s.n} (${s.item.toLowerCase()})`:""}</div>
 <div class="box"><small>Trial to earn it</small>${trialFor(pid,k)}</div>
 <div class="box">${on?"Earned.":k===pr.m?`In progress: ${Math.min(pr.xp,NEED[k])} of ${NEED[k]} growth.`:"Locked."}</div>
 ${rf?`<div class="box"><small>Your reflection · ${rf.d.split("-").reverse().join(".")}</small>${FEEL.find(f=>f[0]===rf.feel)?.[1]||""}${rf.help.length?` · helped by ${rf.help.map(h=>HELP.find(x=>x[0]===h)[1].toLowerCase()).join(", ")}`:""}${rf.note?`<br>“${esc(rf.note)}”`:""}</div>`:""}<button class="cta" style="width:100%" data-close="1">Close</button>`)}
function synSheet(id){const s=SYN.find(x=>x.id===id),un=S.syn.includes(id);
 sheet("var(--gold)",`<div class="kick">Bridge · ${s.p.map(p=>PATHS[p].name).join(" + ")}</div><h2>${s.n}<span class="dev">${s.d}</span></h2>${enLine(s.n)}<p class="story">${s.s}</p>
 <div class="box"><small>Opens when</small>${s.p.map(p=>`${PATHS[p].name}: ${Math.min(S.prog[p].m,s.req)} of ${s.req} trials`).join("<br>")}</div>
 <div class="box"><small>Effect</small>+10% growth on ${s.p.map(p=>PATHS[p].name).join(" and ")}, plus a daily bridge task: ${s.q.toLowerCase()}</div>
 <div class="box">${un?"Open.":"Locked."}</div><div class="row"><button class="cta alt" data-close="1">Close</button><button class="cta" data-story="${id}">${un?"Watch the story":"Preview the story"}</button></div>`)}
function trialSheet(pid,confirm){if(confirm){ceremony(pid,0);return}const P=PATHS[pid],k=S.prog[pid].m,s=P.skills[k];
 sheet(P.c,confirm?`<div class="kick">Confirm</div><h2>Did you pass?</h2><div class="box">${trialText(pid)}</div><p class="mute">This unlocks ${s.n}${EN[s.n]?` (${EN[s.n].toLowerCase()})`:""} and cannot be undone. Only you know if it’s true.</p><div class="row"><button class="cta alt" data-close="1">Not yet</button><button class="cta" data-pass="${pid}">Yes, I passed</button></div>`
 :`<div class="kick">${P.name} trial ${k+1}</div><h2>${s.n}<span class="dev">${s.d}</span></h2>${enLine(s.n)}<p class="story">${skS(pid,s,k)}</p><div class="box"><small>The test</small>${trialText(pid)}</div><p class="mute">Your meter is full, so you’re ready. Do this in real life, then mark it here. Daily tasks still add growth while you prepare.</p><button class="cta" style="width:100%" data-close="1">Got it</button>`)}


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
function exportData(){const name=`abhyasa-backup-${td()}.json`,txt=JSON.stringify({app:"abhyasa",version:APP_VERSION,date:td(),state:S},null,1);
 try{const f=new File([txt],name,{type:"application/json"});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:"Abhyasa backup"}).then(()=>{S.lastBackup=td();save();render();toast("Backup saved")}).catch(()=>{});return}}catch(e){}
 try{S.lastBackup=td();save();const blob=new Blob([JSON.stringify({app:"abhyasa",version:APP_VERSION,date:td(),state:S},null,1)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`abhyasa-backup-${td()}.json`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);toast("Backup saved to your downloads")}catch(e){toast("Couldn’t save the backup on this device")}}
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
 const t=e.target.closest("[data-cday],[data-cmon],[data-slot],[data-fch],[data-remind],[data-rm],[data-rmgo],[data-say],[data-listen],[data-rest],[data-rday],[data-rwhy],[data-rsave],[data-cbgo],[data-enpick],[data-enp],[data-ensave],[data-enemy],[data-rven],[data-settings],[data-zoom],[data-zm],[data-tips-on],[data-noop],[data-oq],[data-oqx],[data-omsel],[data-odone],[data-oday],[data-otag],[data-osave],[data-olore],[data-tf],[data-fit],[data-flife],[data-fbusy],[data-fkit],[data-fsave],[data-qlife],[data-qbusy],[data-ident],[data-idsug],[data-idsave],[data-idclear],[data-pvals],[data-pv],[data-pvshare],[data-pvsave],[data-lifeshare],[data-rvid],[data-inktog],[data-mentor],[data-msel],[data-qmentor],[data-daypick],[data-dp],[data-dp-ok],[data-dp-auto],[data-st],[data-herosheet],[data-gear],[data-epic],[data-epic-setup],[data-ep],[data-feedback],[data-fbk],[data-fbsend],[data-cer],[data-learn],[data-pack],[data-who],[data-gloss],[data-focus],[data-fm],[data-x],[data-ex],[data-seg],[data-seg-go],[data-task],[data-checkin],[data-pdetail],[data-focus-manage],[data-review],[data-worth],[data-rvfocus],[data-rvfoe],[data-rvdone],[data-qlore],[data-intro],[data-tip],[data-tips-off],[data-lore],[data-calmode],[data-why],[data-other],[data-oth],[data-oth-go],[data-unnever],[data-uncustom],[data-pathsheet],[data-path-add],[data-path-pause],[data-nudge-act],[data-nudge-x],[data-pnext],[data-pprev],[data-streak],[data-goal],[data-eve],[data-mood],[data-eve-close],[data-chap],[data-today-cal],[data-fest],[data-time-cycle],[data-qgoal],[data-ring],[data-story],[data-snext],[data-sprev],[data-guide-next],[data-person],[data-talk],[data-close],[data-view],[data-time],[data-done],[data-swap],[data-open],[data-ci],[data-tgo],[data-treset],[data-tadj],[data-ttap],[data-trial],[data-trial-info],[data-pass],[data-skill],[data-syn],[data-tree-open],[data-act],[data-q],[data-qpath],[data-qlvl],[data-qtag],[data-qtime],[data-qkit],[data-qday]");
 if(!t)return;const d=t.dataset;
 if(d.close!==undefined){if(t.classList.contains("scrim")&&e.target!==t)return;closeLayer();return}
 if(d.view){exClose();fmClose();stopTool();OPEN=null;S.view=d.view;render();window.scrollTo(0,0);return}
 if(d.treeOpen){stopTool();OPEN=null;S.view="journey";render();window.scrollTo(0,0);return}
 if(d.time){setTime(+d.time);return}
 if(d.done){if(t.closest(".sheet"))closeLayer();complete(d.done,e);return}
 if(d.feedback){feedbackSheet();return}
 if(d.say){SAY=!SAY;const b=$(".story .say");if(b)b.classList.toggle("on",SAY);if(SAY)sayCard();else sayStop();return}
 if(d.listen){const sh=$(".sheet");if(sh){const t=[...sh.querySelectorAll("h2,.story,.box")].map(x=>x.innerText).join(". ");sayText(t)}return}
 if(d.remind){closeLayer();RM=null;remindSheet();return}
 if(d.rm){const[k,v]=d.rm.split(":").length>2?[d.rm.split(":")[0],d.rm.slice(d.rm.indexOf(":")+1)]:d.rm.split(":");if(v==="t")RM[k]=!RM[k];else RM[k]=v;remindSheet();return}
 if(d.rmgo){icsExport();return}
 if(d.cday){daySheet(d.cday);return}
 if(d.cmon){CALM.m+=+d.cmon;if(CALM.m<0){CALM.m=11;CALM.y--}if(CALM.m>11){CALM.m=0;CALM.y++}render();return}
 if(d.slot){const[id,k]=d.slot.split(":");const it=S.plan.items.find(x=>x.id===id);if(it){it.slot=k;save();render();taskSheet(id);toast(`Moved to ${k}`)}return}
 if(d.fch){const[a,v]=[d.fch.split(":")[0],d.fch.slice(d.fch.indexOf(":")+1)];
  if(a==="open"){closeLayer();fchSheet();return}
  if(a==="begin"){const f=fchOpen();if(!f)return;S.fch={k:f.c.k,fest:f.date,start:td(),ticks:[]};save();render();fchSheet();toast("Challenge begun. Today’s step is on your Today page");return}
  if(a==="tick"){if(!S.fch.ticks.includes(td()))S.fch.ticks.push(td());save();render();fchSheet();if(fchDone())toast("Challenge complete!");return}
  if(a==="claim"){const c=fchCur();S.charms.push({n:c.charm,g:c.g,d:td()});S.fchDone=[...(S.fchDone||[]),c.k+S.fch.fest.slice(0,4)];S.fch=null;save();closeLayer();render();toast(`${c.charm} added to your charms`);return}
  if(a==="quit"){S.fch=null;save();closeLayer();render();toast("Challenge stopped");return}
  return}
 if(d.rest){closeLayer();RS=null;restSheet();return}
 if(d.rday){const v=d.rday;if(RS.days.includes(v))RS.days=RS.days.filter(x=>x!==v);else{const wk=monOf(v),cnt=RS.days.filter(x=>monOf(x)===wk).length+(S.rest||[]).filter(r=>r.d<td()&&monOf(r.d)===wk).length;if(cnt>=2){toast("Up to 2 rest days per week");return}RS.days=[...RS.days,v]}restSheet();return}
 if(d.rwhy){RS.why=d.rwhy;restSheet();return}
 if(d.rsave){S.rest=[...(S.rest||[]).filter(r=>r.d<td()),...RS.days.map(x=>({d:x,why:RS.why}))].filter(r=>diff(r.d,td())<=60);RS=null;save();closeLayer();render();toast(S.rest.some(r=>r.d>=td())?"Rest planned. Your streak is safe":"No rest days planned");return}
 if(d.cbgo){closeLayer();const D=dctx();D.short=true;replan("A lighter plan for today. One task is enough");return}
 if(d.enpick){closeLayer();EPK=null;enemyPick();return}
 if(d.enp){const v=d.enp;EPK=EPK.includes(v)?EPK.filter(x=>x!==v):EPK.length<2?[...EPK,v]:(toast("Pick up to 2"),EPK);enemyPick();return}
 if(d.ensave){S.enemies=EPK;EPK=null;onbDone("enemy");save();closeLayer();render();if(S.enemies.length)toast(`Named. ${S.enemies.map(k=>EN_(k).antN).join(" and ")} will be checked each week`);return}
 if(d.enemy){enemySheet(d.enemy);return}
 if(d.rven){if(!RV)return;const[k,v]=d.rven.split(":");RV.en=RV.en||{};RV.en[k]=v;document.querySelectorAll(`#rve-${k} .chip`).forEach(b=>b.setAttribute("aria-pressed",b.dataset.rven===d.rven?"true":"false"));return}
 if(d.settings){closeLayer();settingsSheet();return}
 if(d.noop){toast(isIOS()?"In Safari: tap Share, then Add to Home Screen":"Open your browser menu and choose Install app");return}
 if(d.tipsOn){S.tips=[];S.tipD="";save();closeLayer();render();toast("Tips are back, one a day");return}
 if(d.zoom){closeLayer();zoomOpen();return}
 if(d.zm){const v=d.zm;if(v==="x"){const z=$(".zoomv");if(z)z.remove();ZV=null;return}if(v==="in")zScale(.7);if(v==="out")zScale(1/.7);if(v==="gear"){zGear(!ZV.gear);return}if(v==="fit"){ZV.x=-10;ZV.y=-10;ZV.w=220;ZV.h=250;zApply()}if(v[0]==="m"){const e=(S.ink||[])[+v.slice(1)];if(e)zFocus(e)}return}
 if(d.oq){closeLayer();OX=null;onbOpen(d.oq);return}
 if(d.oqx){if(S.onb)S.onb.skip=td();save();render();toast("Later. It will come back tomorrow");return}
 if(d.omsel){const[p,g]=d.omsel.split(":");S.mentor=S.mentor||{};S.mentor[p]=g;applyMentors();save();const y=$(".sheet").scrollTop;onbOpen("mentor");$(".sheet").scrollTop=y;return}
 if(d.odone){onbDone(d.odone);save();closeLayer();replan("Your mentors are set");return}
 if(d.oday){const[a,x]=d.oday.split(":");const arr=OX.a[a]=OX.a[a]||[],dd=+x,i=arr.indexOf(dd);i<0?arr.push(dd):arr.splice(i,1);onbOpen("routine");return}
 if(d.otag){const[p,t]=d.otag.split(":");const arr=OX.t[p]=OX.t[p]||[],i=arr.indexOf(t);i<0?arr.push(t):arr.splice(i,1);onbOpen("tags");return}
 if(d.osave){if(d.osave==="routine")S.anchors=OX.a;if(d.osave==="tags")S.tags=OX.t;onbDone(d.osave);OX=null;closeLayer();replan(d.osave==="routine"?"Your routine is planned in":"Tasks now match your focus");return}
 if(d.olore){S.lore=d.olore;onbDone("lore");save();closeLayer();render();toast("Thanks. Explanations will fit you");return}
 if(d.tf){const[id,v]=d.tf.split(":");tfApply(id,v);return}
 if(d.fit){closeLayer();FX=null;fitSheet();return}
 if(d.flife){const[k,v]=d.flife.split(":");FX.life[k]=FX.life[k]===v?"":v;fitSheet();return}
 if(d.fbusy){const v=+d.fbusy;FX.life.busy=FX.life.busy.includes(v)?FX.life.busy.filter(x=>x!==v):[...FX.life.busy,v];fitSheet();return}
 if(d.fkit){const v=d.fkit;FX.kit=FX.kit.includes(v)?FX.kit.filter(x=>x!==v):[...FX.kit,v];fitSheet();return}
 if(d.fsave){S.life=FX.life;S.kit=FX.kit;S.kitSeen=[...new Set([...(S.kitSeen||[]),...FX.paths.flatMap(p=>(KITP[p]||[]).map(x=>x[0]))])];S.fitDone=1;onbDone("fit");FX=null;closeLayer();replan("Your tasks now fit your life");return}
 if(d.qlife){const[k,v]=d.qlife.split(":");Q.life[k]=Q.life[k]===v?"":v;quiz();return}
 if(d.qbusy){const v=+d.qbusy;Q.life.busy=Q.life.busy.includes(v)?Q.life.busy.filter(x=>x!==v):[...Q.life.busy,v];quiz();return}
 if(d.ident){IDX=null;identSheet(d.ident);return}
 if(d.idsug!==undefined){const g=CHAR[IDX.pid];IDX.v=(IDLINES[g]||[])[+d.idsug]||"";identSheet(IDX.pid);return}
 if(d.idsave){const v=(($("#idin")||{}).value||"").trim().replace(/^I am becoming\s*/i,"").replace(/\.$/,"");S.ident=S.ident||{};if(v){S.ident[IDX.pid]=v.slice(0,90);onbDone("ident")}else delete S.ident[IDX.pid];const p=IDX.pid;IDX=null;save();closeLayer();render();toast(v?`Your inner ${PATHS[p].hero} heard you`:"Line removed");return}
 if(d.idclear){S.ident=S.ident||{};delete S.ident[IDX.pid];IDX=null;save();closeLayer();render();return}
 if(d.pvals){PVX=null;pvalSheet();return}
 if(d.pv){PVX.v=PVX.v.includes(d.pv)?PVX.v.filter(x=>x!==d.pv):PVX.v.length<4?[...PVX.v,d.pv]:(toast("Pick up to 4"),PVX.v);pvalSheet();return}
 if(d.pvshare){PVX.share=!PVX.share;pvalSheet();return}
 if(d.pvsave){S.pvals=PVX.v;S.pshare=PVX.share;PVX=null;save();closeLayer();render();toast("Saved privately");return}
 if(d.lifeshare){lifeShare();return}
 if(d.rvid){if(!RV)return;const[p,v]=d.rvid.split(":");RV.ident=RV.ident||{};RV.ident[p]=v;document.querySelectorAll(`#rvi-${p} .chip`).forEach(b=>b.setAttribute("aria-pressed",b.dataset.rvid===d.rvid?"true":"false"));return}
 if(d.inktog){S.hideInk=!S.hideInk;save();render();heroSheet(true);return}
 if(d.mentor){mentorSheet(d.mentor);return}
 if(d.msel){const[p,g]=d.msel.split(":");if(CHAR[p]===g){closeLayer();return}S.mentor=S.mentor||{};S.mentor[p]=g;applyMentors();save();closeLayer();render();toast(`Your inner ${PEOPLE[g].n} begins to stir`);if(!S.intro.includes(g))setTimeout(()=>playIntro([p]),400);return}
 if(d.qmentor){const[p,g]=d.qmentor.split(":");Q.mentor[p]=g;quiz();return}
 if(d.daypick){closeLayer();dayPickSheet();return}
 if(d.dp){const v=d.dp;DP=DP.includes(v)?DP.filter(x=>x!==v):DP.length<DAYMAX?[...DP,v]:(toast(`Pick up to ${DAYMAX}. Untick one first.`),DP);const y=$(".sheet").scrollTop;dayPickSheet(true);$(".sheet").scrollTop=y;return}
 if(d.dpOk){S.dayPick={d:td(),p:DP.slice()};DP=null;closeLayer();replan("Your lead mentors get the deeper tasks today");return}
 if(d.dpAuto){S.dayPick=null;DP=null;closeLayer();replan("Abhyasa picked today’s mentors");return}
 if(d.st){const[a,v]=d.st.split(":");
  if(a==="open"){closeLayer();TR=null;stSheet();return}
  if(a==="book"){playBook(+v);return}
  if(a==="story"){const c=SS().cur;playTrialStory(c?c.i:stAvail());return}
  if(a==="opt"){TR.opts=TR.opts.includes(v)?TR.opts.filter(x=>x!==v):TR.opts.length<2?[...TR.opts,v]:(toast("Pick up to 2"),TR.opts);TR.keep=true;stSheet();return}
  if(a==="strict"){TR.strict=v==="1";TR.keep=true;stSheet();return}
  if(a==="begin"){const i=stAvail();if(i<0||!TR.opts.length)return;SS().cur={i,opts:TR.opts,start:td(),ticks:[],strict:TR.strict};TR=null;save();render();stSheet();toast(STRIALS[i].kind==="daily"?"Trial begun. Today’s step is on your Today page":"Trial begun");return}
  if(a==="tick"){const c=SS().cur;if(!c)return;const T=STRIALS[c.i];if(T.kind==="daily"){if(!c.ticks.includes(td()))c.ticks.push(td())}else c.ticks.push(td());save();render();TR=null;stSheet();if(stReady())toast("Trial complete! Claim your title");return}
  if(a==="help"){TR=TR||{};TR.help=true;TR.keep=true;stSheet();return}
  if(a==="share"){stShare();return}
  if(a==="quit"){if(!TR||TR.confirm!=="quit"){TR={confirm:"quit"};sheet("var(--ink)",`<h2>Stop this trial?</h2><p class="sub">Nothing is lost. You can start it again any time, and choose a different way.</p><div class="row"><button class="cta alt" data-close="1">Keep going</button><button class="cta" data-st="quit">Stop it</button></div>`);return}SS().cur=null;TR=null;save();closeLayer();render();toast("Trial stopped. Start again whenever you are ready");return}
  if(a==="hard"){TR.note=($("#stnote")||{}).value||"";TR.hard=v;TR.keep=true;stSheet();return}
  if(a==="les"){TR.note=($("#stnote")||{}).value||"";TR.lessons=TR.lessons.includes(v)?TR.lessons.filter(x=>x!==v):[...TR.lessons,v];TR.keep=true;stSheet();return}
  if(a==="complete"){stComplete();return}
  return}
 if(d.herosheet){heroSheet();return}
 if(d.gear!==undefined){const[k,v]=d.gear.split(":");S.gear=S.gear||{};S.gear[k]=v;save();render();heroSheet(true);return}
 if(d.epicSetup){closeLayer();S.view="journey";S.seg=S.seg||{};S.seg.journey="epic";render();window.scrollTo(0,0);return}
 if(d.epic){closeLayer();S.view="journey";S.seg=S.seg||{};S.seg.journey="epic";render();window.scrollTo(0,0);return}
 if(d.ep){const[a,v]=d.ep.split(":");
  if(a==="pick"){const x=goalSuggest()[+v];if(x)startGoal(x);return}
  if(a==="own"){ownSheet();return}
  if(a==="ownp"){const ti=+d.ep.split(":")[2]||0;startGoal({pid:v,ti,size:sizeFor(v)});return}
  if(a==="ownc"){const x=comboOf(v);startGoal({pid:x.p[0],combo:v,size:Math.min(...x.p.map(sizeFor))});return}
  if(a==="log"){EP={v:S.epic.cur};logSheet();return}
  if(a==="v"){const st=TPL(S.epic.goal).st;EP.v=Math.max(0,+(EP.v+(v==="+"?st:-st)).toFixed(2));logSheet();return}
  if(a==="save"){const was=arcStage();S.epic.cur=EP.v;EP=null;save();closeLayer();render();const now=arcStage();toast(epicDone()?"Goal reached!":now>was?`Milestone reached. Book ${now+1} opens`:"Progress saved");return}
  if(a==="finish"){if(!S.epic)return;toHall(true);closeLayer();render();toast("Added to your past vows");return}
  if(a==="miss"){EP=null;missSheet();return}
  if(a==="why"){EP.why=EP.why.includes(v)?EP.why.filter(x=>x!==v):[...EP.why,v];missSheet();return}
  if(a==="ext"){S.epic.end=addD(td(),+v*7);S.epic.ext=true;S.epic.missAsk="";EP=null;save();closeLayer();render();toast(`Deadline moved to ${S.epic.end.split("-").reverse().join(".")}`);return}
  if(a==="missclose"){const w=EP&&EP.why||[];toHall(false,w);closeLayer();render();toast("Vow closed. The lessons stay with you");return}
  if(a==="close"){if(!S.epic)return;if(!EP||EP.confirm!=="close"){EP={confirm:"close"};sheet("var(--ink)",`<h2>End this vow?</h2><p class="sub">Your rank, gear and trials stay. Only this goal closes.</p><div class="row"><button class="cta alt" data-close="1">Keep going</button><button class="cta" data-ep="close">End it</button></div>`);return}
   toHall(!!S.epic.won||epicDone());closeLayer();render();toast("Vow closed. Take a new one any time");return}
  if(!EP||!EP.g)return;const g=EP.g,G=TPL(g);
  if(a==="n")g.n=Math.max(G.st,+(g.n+(v==="+"?G.st:-G.st)).toFixed(2));
  if(a==="b")g.base=Math.max(0,Math.min(g.n-G.st,+(g.base+(v==="+"?G.st:-G.st)).toFixed(2)));
  if(a==="w")g.w=+v;
  if(a==="foe")g.foes=g.foes.includes(v)?g.foes.filter(x=>x!==v):g.foes.length<3?[...g.foes,v]:(toast("Pick up to 3"),g.foes);
  if(a==="begin"){const id=bestEpicFor(g.pid);S.epicN=(S.epicN||0)+1;S.epic={id,goal:{pid:g.pid,ti:g.ti,combo:g.combo,size:g.size,n:g.n,base:g.base},foes:g.foes,start:td(),end:addD(td(),g.w*7),ms:msOf(g.base,g.n,G.st),cur:g.base,seen:0};EP=null;save();closeLayer();S.view="journey";S.seg=S.seg||{};S.seg.journey="epic";render();toast("Your vow is taken. Log progress any time");return}
  const sh=$(".sheet"),y=sh?sh.scrollTop:0;goalSheet();if($(".sheet"))$(".sheet").scrollTop=y;return}
 if(d.fbk){const tx=$("#fbtext");if(tx)FB.t=tx.value;FB.k=d.fbk;feedbackSheet();return}
 if(d.fbsend){fbSend(d.fbsend);return}
 if(d.cer){cerCmd(d.cer);return}
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
 if(d.rvfoe){if(!RV)return;RV.foe=d.rvfoe;document.querySelectorAll("#rvfoe .chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.rvfoe===RV.foe?"true":"false"));return}
 if(d.rvfocus){if(!RV)return;RV.focus=d.rvfocus;document.querySelectorAll("#rvfocus .chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.rvfocus===RV.focus?"true":"false"));return}
 if(d.rvdone){finishReview();return}
 if(d.qlore){Q.lore=d.qlore;quiz();return}
 if(d.intro){closeLayer();S.intro=S.intro.filter(g=>g!==CHAR[d.intro]);playIntro([d.intro]);return}
 if(d.tip){S.tips.push(d.tip);S.tipD=td();save();const f=$(".tipf");if(f)f.remove();return}
 if(d.tipsOff){Object.keys(TIPS).forEach(v=>TIPS[v].forEach(t=>{const k=v+":"+t[0];if(!S.tips.includes(k))S.tips.push(k)}));save();render();toast("Tips off");return}
 if(d.lore){S.lore=d.lore;save();render();if($(".sheet [data-set]"))settingsSheet();return}
 if(d.calmode){S.cal=d.calmode;save();render();if($(".sheet [data-set]"))settingsSheet();toast(d.calmode==="indian"?"Indian calendar on":d.calmode==="seasons"?"Seasons on":"Calendar off");return}
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
  if(v==="apply"){const before=S.plan.items.filter(x=>!x.done&&(x.kind==="task"||x.kind==="anchor")).map(x=>({t:x.t,id:x.id,pid:x.pid,why:x.why}));S.check=Object.assign({},CI,{d:td()});CIedit=false;CI=null;closeLayer();replan();checkDiff(before);return}
  const[g,x]=v.split(":");if(g==="sore"){if(x==="none")CI.sore=[];else{const i=CI.sore.indexOf(x);i<0?CI.sore.push(x):CI.sore.splice(i,1)}}else if(g==="busy")CI.busy=x==="1";else CI[g]=x;checkSheet();return}
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
 if(d.person){const c=PEOPLE[d.person],P=PATHS[c.pid],I=GUIDE_INTRO[d.person];sheet(P.c,`<div style="display:flex;gap:14px;align-items:center">${medalG(d.person,"lg")}<div><div class="kick">${P.name} guide</div><h2>${c.n}<span class="dev">${c.d}</span></h2></div></div><p class="story">${c.bio}</p><div class="box"><small>Says today</small>“${GUIDE_LINES[c.pid][doyNow()%5]}”</div><div class="row"><button class="cta alt" data-close="1">Close</button><button class="cta" data-intro="${c.pid}">Watch intro</button></div>`);return}
 if(d.talk){const ps=sel();if(!ps.length)return;const pid=ps[Math.floor(Math.random()*ps.length)],L=GUIDE_LINES[pid];TALK=[PATHS[pid].hero,L[Math.floor(Math.random()*L.length)]];render();clearTimeout(window._tk);window._tk=setTimeout(()=>{TALK=null;if(S.view==="hero")render()},4500);return}
 if(d.trial){trialSheet(d.trial,true);return}
 if(d.trialInfo){trialSheet(d.trialInfo,false);return}
 if(d.pass){passTrial(d.pass);return}
 if(d.skill){const[p,k]=d.skill.split(":");skillSheet(p,+k);return}
 if(d.syn){synSheet(d.syn);return}
 if(d.act==="install"){if(DPROMPT){DPROMPT.prompt();DPROMPT.userChoice.finally(()=>{DPROMPT=null;render()})}return}
 if(d.act==="export"){exportData();return}
 if(d.act==="import"){const f=$("#importf");if(f){f.value="";f.click()}return}
 if(d.act==="import-ok"){if(PENDING){stopTool();S=migrate(Object.assign(fresh(),PENDING.state),PENDING.state);PENDING=null;save();closeLayer();render();toast("Backup restored")}return}
 if(d.act==="redo"){stopTool();S.on=false;Q=null;quiz();window.scrollTo(0,0);return}
 if(d.act==="routine"){stopTool();S.on=false;Q=newQ();Q.i=qSteps().indexOf("routine");quiz();window.scrollTo(0,0);return}
 if(d.act==="reset"){if(!resetArm){resetArm=1;t.textContent="Tap again to erase everything";setTimeout(()=>{resetArm=0;if(t.isConnected)t.textContent="Reset everything"},3000);return}stopTool();try{localStorage.removeItem(KEY)}catch(e){}S=fresh();Q=null;location.reload();return}
 if(d.q){const n=qSteps().length;
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
