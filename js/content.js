/* =====================================================================
   Abhyasa content
   Everything a non-programmer is likely to edit lives in this file:
   paths, skills, tasks, trials, bridges, guides, stories, journey chapters,
   seasons, festivals and daily anecdotes. See README.md, section "Adding content".
   Keep the shapes of the objects the same and the app will pick up changes.
   ===================================================================== */
/* ================= content ================= */
const NEED=[80,150,240,360,500];
const RANKS=[["Bālak","बालक"],["Shishya","शिष्य"],["Sādhaka","साधक"],["Yodha","योद्धा"],["Āchārya","आचार्य"],["Purushottam","पुरुषोत्तम"]];
const PERK={swap:()=>"+1 task swap each day",xp:n=>`+10% growth on ${n}`,shield:()=>"1 streak shield each week",all:()=>"+5% growth on every path"};
const QUOTES=[
 ["Lift yourself by your own effort. Do not let yourself sink.","Bhagavad Gita 6.5"],
 ["You have a right to your work, never to its fruits.","Bhagavad Gita 2.47"],
 ["The restless mind is calmed by steady practice and letting go.","Bhagavad Gita 6.35"],
 ["Practice takes root when kept up for long, without a break, with care.","Yoga Sutra 1.14"],
 ["Better your own path done imperfectly than another’s done well.","Bhagavad Gita 3.35"],
 ["Arise, awake, and learn from those who know.","Katha Upanishad 1.3.14"],
 ["What is bitter at first turns to nectar in the end.","Bhagavad Gita 18.37"]
];
const X=(t,m,o)=>{o=o||{};const tg=o.tags||"any";return Object.assign({t,m,lo:0,hi:4,needs:[],place:"any",en:2,load:[],g:[],tool:null},o,{tags:tg.split("|")})};

const PATHS={
 body:{name:"Body",about:"Fitness, strength, energy",hero:"Hanuman",heroDev:"हनुमान",c:"var(--body)",
  q:"Where is your body today?",
  levels:["I rarely exercise","I move now and then","I train 2–3 times a week","I train 4+ times a week"],
  tags:[["strength","Gym and strength"],["climb","Bouldering"],["swim","Swimming"],["run","Running"],["walk","Walking"],["yoga","Yoga and mobility"]],
  skills:[
   {n:"Vayu Prana",d:"वायु प्राण",s:"Hanuman is the son of the wind. You learn to breathe and move every day.",perk:"swap"},
   {n:"Gada",d:"गदा",s:"Hanuman’s mace: great strength, held with control.",perk:"xp",item:"Weapon"},
   {n:"Smarana",d:"स्मरण",s:"Jambavan reminds Hanuman of the strength he forgot. A missed day no longer breaks you.",perk:"shield"},
   {n:"Langhana",d:"लंघन",s:"The leap across the ocean. Months of work, one clean moment.",perk:"xp",item:"Armlets",itemName:"Swarna kankan"},
   {n:"Sanjeevani",d:"संजीवनी",s:"He carries the mountain to heal Lakshmana. Your strength now serves others.",perk:"all"}],
  trials:[
   {run:"Run 3 km without stopping",walk:"Walk 5 km in one go",strength:"20 push-ups and 40 squats",yoga:"12 surya namaskar without a break",def:"Walk or run 3 km without stopping"},
   {run:"Run 5 km",walk:"Walk 8 km in one go",strength:"3 rounds of 15 push-ups, 30 squats, 1 min plank",yoga:"24 surya namaskar in one go",def:"Run 5 km or walk 8 km"},
   {run:"Beat your best 5 km time",walk:"Hike 12 km",strength:"Beat one personal best lift or rep count",yoga:"Hold a 2 min plank and a steady 1 min balance pose",def:"Beat one personal best"},
   {run:"Run 10 km",walk:"Walk 20 km in a day",strength:"A full session at your best weights",yoga:"60 min of practice without a break",def:"Run 10 km or a 60 min hard session"},
   {run:"Run 15 km or a half marathon",walk:"Climb a mountain or walk 30 km",strength:"New personal bests on 3 lifts",yoga:"108 surya namaskar",def:"Your hardest physical day yet"}],
  pool:[
   X("Brisk walk",20,{tags:"walk|any",hi:2,place:"out",en:1,load:["cardio"],g:["Walk fast enough that talking feels a little hard","Let your arms swing and keep your shoulders loose","Last 3 minutes: slow down and breathe through the nose"],tool:{type:"timer",sec:1200}}),
   X("Long walk, 60 min",60,{tags:"walk",lo:2,place:"out",en:1,load:["cardio","legs"],g:["Pick a route with trees or water","No earphones for the first 15 minutes","A steady pace you could hold for hours"],tool:{type:"timer",sec:3600}}),
   X("10 min mobility routine",10,{place:"any",en:1,load:["mobility"],g:["Neck circles, 5 each way","Cat-cow, 10 slow rounds","Hip circles, 10 each way","World’s greatest stretch, 5 per side","Deep squat hold, 60 sec"],tool:{type:"timer",sec:600}}),
   X("12 surya namaskar",15,{tags:"yoga",hi:2,place:"home",en:2,load:["mobility","push"],g:["One breath per movement: inhale up, exhale down","Keep the pace slow and even","Knees down in the plank if needed","Rest in child’s pose after every 4 rounds"],tool:{type:"counter",target:12,label:"rounds"}}),
   X("24 surya namaskar",25,{tags:"yoga",lo:2,place:"home",en:2,load:["mobility","push"],g:["One breath per movement","Sets of 6, short rest between","Finish with 2 min lying still"],tool:{type:"counter",target:24,label:"rounds"}}),
   X("Calm breathing, 4-4-6",8,{tags:"yoga|swim|any",place:"any",en:1,g:["Sit tall, shoulders soft","Breathe in for 4, hold for 4, out for 6","Follow the circle and let the long exhale slow you down"],tool:{type:"breath",in:4,hold:4,out:6}}),
   X("Bodyweight circuit",15,{tags:"strength|any",hi:1,place:"any",en:2,load:["push","legs"],g:["40 sec work, 20 sec rest, 9 rounds","Rotate: squats, push-ups (knees are fine), plank","Stop each set 2 reps before you fail"],tool:{type:"intervals",work:40,rest:20,rounds:9}}),
   X("Gym: push day",40,{tags:"strength",lo:1,needs:["gym"],place:"gym",en:3,load:["push"],g:["Warm up: 5 min row or bike, then light sets","Bench or dumbbell press, 3 × 6–8","Overhead press, 3 × 8","Dips or push-ups, 3 sets, stop 2 reps short","Rest 90 sec between sets"],tool:{type:"timer",sec:90,label:"Rest timer"}}),
   X("Gym: leg day",45,{tags:"strength|run|climb",lo:1,needs:["gym"],place:"gym",en:3,load:["legs"],g:["Warm up: 5 min bike and 10 bodyweight squats","Squat, 3 × 6–8","Romanian deadlift, 3 × 8","Walking lunges, 2 × 10 per leg","Calf raises, 3 × 15"],tool:{type:"timer",sec:120,label:"Rest timer"}}),
   X("Gym: pull day",40,{tags:"strength",lo:1,needs:["gym"],place:"gym",en:3,load:["pull","grip"],g:["Pull-ups or lat pull-downs, 3 × 6–8","Rows, 3 × 8–10","Face pulls, 3 × 15","Biceps curls, 2 × 12"],tool:{type:"timer",sec:90,label:"Rest timer"}}),
   X("Dumbbell full body",30,{tags:"strength",hi:3,needs:["dumbbells"],place:"home",en:2,load:["push","pull","legs"],g:["Goblet squat, 3 × 10","Floor press, 3 × 10","One-arm row, 3 × 10 per side","Rest 60 sec between sets"],tool:{type:"timer",sec:60,label:"Rest timer"}}),
   X("Shoulder care",10,{tags:"climb|swim|strength",place:"any",en:1,load:["mobility"],rec:["push","pull"],g:["Band pull-aparts, 2 × 15","External rotations, 2 × 12 per arm","Wall slides, 2 × 10","No band? Do the same moves slowly with no weight"],tool:{type:"timer",sec:600}}),
   X("50 push-ups through the day",5,{tags:"strength|climb",lo:1,place:"any",en:1,load:["push"],g:["Do sets of 5–10 whenever you stand up","Full range: chest close to the floor","Tap the counter after each set"],tool:{type:"counter",target:50,label:"push-ups",step:5}}),
   X("Push work for climbers",15,{tags:"climb",place:"any",en:2,load:["push"],g:["Climbing is mostly pulling. This keeps your shoulders balanced","Push-ups, 3 × 10","Pike push-ups, 3 × 6","Reverse wrist curls or band wrist extensions, 2 × 15"],tool:{type:"timer",sec:60,label:"Rest timer"}}),
   X("Finger and forearm care",10,{tags:"climb",place:"any",en:1,load:["mobility"],rec:["grip"],g:["Warm water soak or gentle squeezes, 2 min","Wrist flexor stretch, 3 × 30 sec","Wrist extensor stretch, 3 × 30 sec","Finger extensions against a rubber band, 2 × 20"],tool:{type:"timer",sec:600}}),
   X("Light hangboard session",20,{tags:"climb",lo:2,needs:["hangboard"],place:"home",en:3,load:["grip","pull"],g:["Warm up: 5 min of easy hangs with feet on a chair","Repeaters: hang 7 sec, rest 3 sec, 6 times = 1 set","3 sets with 3 min rest between","Stop at any finger pain"],tool:{type:"intervals",work:7,rest:3,rounds:6}}),
   X("Bouldering: silent feet drill",60,{tags:"climb",needs:["wall"],place:"wall",en:2,load:["pull","grip"],g:["Warm up on 5 easy problems","Climb 5 easy problems placing each foot without a sound","Then work 2–3 projects, resting 3 min between tries","Cool down with easy traverses"]}),
   X("Swim drills",25,{tags:"swim",hi:3,needs:["pool"],place:"pool",en:2,load:["cardio","pull"],g:["Warm up: 100 m easy","Catch-up drill, 4 × 25 m","Side kick with a long body, 4 × 25 m","Cool down: 100 m easy"],tool:{type:"intervals",work:60,rest:20,rounds:8}}),
   X("Swim 1 km in sets",35,{tags:"swim",lo:2,needs:["pool"],place:"pool",en:3,load:["cardio","pull"],g:["4 × 250 m at a steady pace","30 sec rest between sets","Count strokes per length and try to lower it"],tool:{type:"intervals",work:300,rest:30,rounds:4}}),
   X("Dry breath training for swimming",6,{tags:"swim",place:"any",en:1,g:["On land only. Never practise breath holds in water alone","Breathe in 4, hold 8, out 8","Stop if you feel dizzy"],tool:{type:"breath",in:4,hold:8,out:8}}),
   X("Easy run, 2–3 km",20,{tags:"run",hi:2,place:"out",en:2,load:["cardio","legs"],g:["A pace where you can speak in full sentences","Walk breaks are fine","Stretch calves and hips after"],tool:{type:"timer",sec:1200}}),
   X("Run intervals: 8 × 1 min",25,{tags:"run",lo:2,place:"out",en:3,load:["cardio","legs"],g:["10 min easy warm-up","8 rounds: 1 min fast, 90 sec easy","5 min easy cool-down"],tool:{type:"intervals",work:60,rest:90,rounds:8}}),
   X("Long run, 8 km",50,{tags:"run",lo:3,place:"out",en:3,load:["cardio","legs"],g:["Easy pace the whole way","Carry water if it’s warm","Eat within an hour after"]}),
   X("Hotel-room workout",15,{place:"any",en:2,load:["push","legs"],travel:true,g:["No kit needed","4 rounds: 10 squats, 8 push-ups, 10 lunges, 30 sec plank","60 sec rest between rounds"],tool:{type:"intervals",work:120,rest:60,rounds:4}}),
   X("Stretch before bed",10,{place:"home",en:1,load:["mobility"],rec:["legs"],g:["Lying hamstring stretch, 60 sec per leg","Figure-4 hip stretch, 60 sec per side","Child’s pose, 90 sec","Slow breathing to finish"],tool:{type:"timer",sec:600}})]},
 bonds:{name:"Bonds",about:"Family, friends, partner, roots",hero:"Rama",heroDev:"राम",c:"var(--bonds)",
  q:"How connected do you feel?",
  levels:["I’ve drifted from people","I keep in touch sometimes","I’m in regular contact","My circle is close and active"],
  tags:[["parents","Parents"],["abroad","Family in India or abroad"],["partner","Partner"],["friends","Friends"],["family","Siblings and family"],["roots","Roots and culture"]],
  skills:[
   {n:"Vachan",d:"वचन",s:"Rama keeps his father’s word. You become someone people can count on.",perk:"swap"},
   {n:"Kodanda",d:"कोदण्ड",s:"Rama’s bow. It is drawn only for what is right.",perk:"xp",item:"Bow"},
   {n:"Maitri",d:"मैत्री",s:"The friendship of Rama and Sugriva. Friends carry you through missed days.",perk:"shield"},
   {n:"Setu",d:"सेतु",s:"The bridge to Lanka, built stone by stone with many hands.",perk:"xp",item:"Quiver",itemName:"Tunir"},
   {n:"Maryada",d:"मर्यादा",s:"Duty above comfort. You do the right, hard thing.",perk:"all"}],
  trials:[
   {def:"Call your parents or family 3 times in one week"},
   {def:"Video-call someone you have not spoken to in a month"},
   {def:"Help a friend or family member with a real problem, fully"},
   {def:"Have one deep, honest talk with your closest person"},
   {def:"Have the conversation you have been avoiding"}],
  pool:[
   X("Call your parents",15,{tags:"parents",en:1,call:true,g:["Ask one specific question, not only “how are you”","Share one small thing from your day","Ask if they need help with anything"]}),
   X("Send a voice note to your parents",5,{tags:"parents",en:1,g:["30–60 seconds is enough","Add a photo from your day"]}),
   X("Ask a parent for a story from their youth",20,{tags:"parents|roots",lo:2,en:1,call:true,g:["Ask: what was your first job like?","Or: how did you celebrate festivals as a child?","Record it, with their permission. These stories are precious"]}),
   X("15 min with your partner, phones away",15,{tags:"partner",en:1,g:["Phones in another room","Ask: what was the best part of your day?","Listen more than you talk"],tool:{type:"timer",sec:900}}),
   X("Cook or eat a meal together",45,{tags:"partner|family",lo:1,g:["Pick something simple you both like","No screens at the table"]}),
   X("Plan a small surprise",10,{tags:"partner",lo:2,en:1,g:["Think of something they mentioned recently","Small and personal beats big and generic"]}),
   X("Message one friend you miss",5,{tags:"friends",en:1,g:["Mention a memory you share","Suggest a time to talk"]}),
   X("Video-call a friend",30,{tags:"friends",lo:1,call:true,g:["Book it like a meeting so it happens","Ask about something they cared about last time"]}),
   X("Plan a meetup with a local friend",10,{tags:"friends",lo:1,en:1,g:["Suggest a day and a place, not “sometime”","A walk or coffee is enough"]}),
   X("Message a sibling or cousin",5,{tags:"family",en:1,g:["Send an old photo with a short note"]}),
   X("Start a family video call",30,{tags:"family|abroad",lo:1,call:true,g:["Send the link 10 min before","Have one topic ready: a plan, a memory or a recipe"]}),
   X("Read one story from the Ramayana",15,{tags:"roots",en:1,g:["New to it? Start with the Bala Kanda","One episode a day, about 10 pages","Note one idea that fits your week"],tool:{type:"timer",sec:900}}),
   X("Cook a dish from home",45,{tags:"roots|family",lo:1,g:["Ask your mother or father for the recipe on a call","Write it down in your own words","Share a photo with the family"]}),
   X("Learn one shloka",10,{tags:"roots",en:1,g:["Start with Gita 2.47, karmanye vadhikaraste","Read the meaning first","Say it 5 times slowly, and once tomorrow morning"],tool:{type:"counter",target:5,label:"recitations"}}),
   X("Teach someone a tradition",15,{tags:"roots",lo:2,g:["Pick a festival, a dish or a word","Tell the story behind it in 2 minutes"]}),
   X("Keep one small promise today",5,{en:1,g:["Pick something you said you would do","Do it before evening"]}),
   X("Write a thank-you message",10,{lo:1,en:1,g:["Name one specific thing they did","Say how it helped you"]})]},
 music:{name:"Music",about:"Guitar, voice, ear, creating",hero:"Narada",heroDev:"नारद",c:"var(--music)",
  q:"Where are you with music?",
  levels:["I’ve never played","I know a few basics","I can play some songs","I write or perform"],
  tags:[["guitar","Guitar"],["singing","Singing"],["keys","Keys"],["theory","Listening and theory"]],
  skills:[
   {n:"Shruti",d:"श्रुति",s:"Narada listens before he plays. Your ear opens.",perk:"swap"},
   {n:"Veena",d:"वीणा",s:"Narada’s veena, the Mahati. Your instrument becomes part of you.",perk:"xp",item:"Instrument"},
   {n:"Tala",d:"ताल",s:"Rhythm holds the worlds together. Your practice keeps time even on off days.",perk:"shield"},
   {n:"Raga",d:"राग",s:"Each raga carries a mood. You make the instrument feel.",perk:"xp",item:"Mala",itemName:"Tulsi mala"},
   {n:"Katha",d:"कथा",s:"Narada carries songs between worlds. Your music reaches people.",perk:"all"}],
  trials:[
   {guitar:"Switch between 4 chords cleanly, no stops",singing:"Sing a full scale in tune, up and down",keys:"Play a major scale with both hands",theory:"Name the notes of 3 major chords",def:"Play 4 chords cleanly, no stops"},
   {guitar:"Play a progression at 80 bpm for 2 min",singing:"Sing one verse in time with a metronome",keys:"Play a melody with chords under it",theory:"Clap the rhythm of a song correctly",def:"Play a progression in time for 2 min"},
   {def:"Play or sing one full song from start to end"},
   {def:"Record one original piece, 30 sec or longer"},
   {def:"Perform for other people, live or shared"}],
  pool:[
   X("Tune by ear, then open chords",15,{tags:"guitar",hi:1,en:1,g:["Tune the low E with a tuner app","Tune each string to the one below it (5th fret method)","Play G, C, D and Em, 2 min each","Every string should ring clearly"],tool:{type:"timer",sec:900}}),
   X("One-minute chord changes",15,{tags:"guitar",hi:2,g:["Pick two chords you find hard, for example G and C","Switch between them for 1 min and count clean changes","Note your score and beat it next time","Repeat with 3 pairs"],tool:{type:"counter",target:60,label:"changes"}}),
   X("Strumming patterns",20,{tags:"guitar",lo:1,hi:3,g:["Pattern: D, D-U, U-D-U, common in pop and Bollywood","Mute the strings and strum only the rhythm first","Add chords at 70 bpm","Go up 5 bpm when it feels easy"],tool:{type:"metronome",bpm:70}}),
   X("Learn 8 bars of a song",20,{tags:"guitar|keys|singing",lo:1,hi:3,songs:true,g:["Pick a song below","Learn only the first 8 bars, usually the intro or first verse","Play it slowly with the metronome until there are no stops"],tool:{type:"metronome",bpm:65}}),
   X("Play one song start to end",20,{tags:"guitar|keys|singing",lo:2,songs:true,g:["Pick a song you mostly know","Split it into parts: intro, verse, chorus, bridge","Loop the hardest part at 70% speed","Join verse to chorus without stopping","Play it all once. Done when there are no stops"],tool:{type:"metronome",bpm:63}}),
   X("Play along with a backing track",20,{tags:"guitar|keys",lo:2,g:["Search for “slow blues backing track in A” or “pop backing track in G”","Play the chords first, then melody notes on top","Focus on staying with the drums"]}),
   X("One scale, slow and clean",15,{tags:"guitar|keys",lo:1,en:1,g:["Guitar: A minor pentatonic, first box at the 5th fret","One note per click, then two","Alternate picking: down, up, down, up","Speed up only when every note is clean"],tool:{type:"metronome",bpm:60}}),
   X("Improvise over a drone",15,{tags:"guitar|keys|singing",lo:2,g:["Play a tanpura drone (search “tanpura drone C”)","Use only the notes of a scale you know","Play short phrases and leave space between them","Try happy, then sad, with the same notes"],tool:{type:"timer",sec:900}}),
   X("Write a riff or melody",20,{lo:3,en:3,g:["Choose only 3 notes","Make a 2-bar pattern and repeat it","Change one note or the rhythm","Record a voice memo before you forget it"],tool:{type:"metronome",bpm:80}}),
   X("Record yourself and listen back",15,{lo:2,en:3,g:["Record one song or exercise on your phone","Listen once without judging","Write down one thing to fix tomorrow"]}),
   X("Sa re ga ma warm-up",10,{tags:"singing",en:1,g:["Hum along to a drone for 1 min","Sing sa re ga ma pa, up and down, slowly","Then skip notes: sa ga, re ma, ga pa"],tool:{type:"metronome",bpm:60}}),
   X("Sing one song with full attention",10,{tags:"singing",hi:2,en:1,songs:true,g:["Pick a song from the list","Sing along once with the recording","Then once without it"]}),
   X("Right-hand melody of a simple song",20,{tags:"keys",hi:2,songs:true,g:["Search “song name easy piano” for the notes","Learn 4 notes at a time","Play slowly with the metronome"],tool:{type:"metronome",bpm:60}}),
   X("Listen to one raga",15,{tags:"theory|any",en:1,raga:true,g:["Use headphones and do nothing else","Notice when the main phrase returns","Hum the notes you remember afterwards"],tool:{type:"timer",sec:900}}),
   X("Ear training: intervals",10,{tags:"theory|guitar",hi:3,en:1,g:["Use a free ear-training app or site","Start with 3 intervals: third, fifth, octave","Sing each one before you answer"],tool:{type:"timer",sec:600}}),
   X("Quiet fingerstyle practice",10,{tags:"guitar",lo:1,en:1,quiet:true,g:["Good for late evenings","Thumb plays the bass, then index, middle, ring","Hold a C chord and play the pattern 10 times slowly"],tool:{type:"metronome",bpm:60}})]}
};
const ORDER=["body","bonds","music"];
[["Send 5 problems at your current grade in one session","Swim 200 m without stopping"],["Send your first problem one grade harder","Swim 500 m without stopping"],["Flash a problem at your project grade","Swim 1 km without stopping"],["Send a problem two grades above where you started","Swim 1.5 km in under 40 min"],["Send your hardest problem yet, in front of friends","Swim 2 km without stopping"]].forEach(([c,w],k)=>{PATHS.body.trials[k].climb=c;PATHS.body.trials[k].swim=w});
const KIT=[["gym","Gym"],["pool","Pool"],["wall","Climbing wall"],["park","Park or outdoors"],["dumbbells","Dumbbells"],["bands","Resistance bands"],["pullup","Pull-up bar"],["hangboard","Hangboard"],["mat","Yoga mat"]];
const ACTS=[
 {id:"gym",pid:"body",n:"Gym session",m:60,load:["push","pull","legs"],place:"gym"},
 {id:"climb",pid:"body",n:"Bouldering",m:75,load:["pull","grip"],place:"wall"},
 {id:"swim",pid:"body",n:"Swimming",m:45,load:["cardio","pull"],place:"pool"},
 {id:"run",pid:"body",n:"Running",m:40,load:["cardio","legs"],place:"out"},
 {id:"yoga",pid:"body",n:"Yoga class",m:60,load:["mobility"],place:"any"},
 {id:"guitar",pid:"music",n:"Guitar practice or lesson",m:45,load:[],place:"any"},
 {id:"family",pid:"bonds",n:"Family call",m:30,load:[],place:"any"}];
const SONGS=[
 [["A Horse with No Name","America"],["Knockin’ on Heaven’s Door","Bob Dylan"],["Leaving on a Jet Plane","John Denver"]],
 [["Stand by Me","Ben E. King"],["Tum Hi Ho","Aashiqui 2"],["Let Her Go","Passenger"]],
 [["Wonderwall","Oasis"],["Agar Tum Saath Ho","Tamasha"],["Wish You Were Here","Pink Floyd"]],
 [["Tears in Heaven","Eric Clapton"],["Blackbird","The Beatles"],["Hotel California","Eagles"]]];
const SOON=[["Spirit","Meditation, study, inner practice"],["Craft","Data, AI and career skills"]];
const SYN=[
 {id:"prana",p:["body","music"],req:2,n:"Prana and Nada",d:"प्राण-नाद",s:"Breath feeds sound. A strong, steady body holds the instrument longer and plays calmer.",q:"5 min breathing, then 10 min of music"},
 {id:"seva",p:["body","bonds"],req:2,n:"Seva",d:"सेवा",s:"Hanuman’s strength was always in service of Rama. Share your strength with people you love.",q:"Walk or train with family or a friend"},
 {id:"sangat",p:["bonds","music"],req:2,n:"Sangat",d:"संगत",s:"Music is complete when someone hears it. Play for the people around you.",q:"Play or sing one song for someone"},
 {id:"sangam",p:["body","bonds","music"],req:4,n:"Triveni Sangam",d:"त्रिवेणी संगम",s:"Where three rivers meet. Body, bonds and music now feed each other.",q:"Train, then play for your family"}
];
const TIMES=[[15,"15 min"],[30,"30 min"],[45,"45 min"],[75,"60+ min"]];


const CHAR={body:"hanuman",bonds:"rama",music:"narada"};
const PEOPLE={
 hanuman:{n:"Hanuman",d:"हनुमान",pid:"body",bio:"Son of the wind and Rama’s devoted friend. He leapt the ocean, carried a mountain, and never forgot to serve."},
 rama:{n:"Rama",d:"राम",pid:"bonds",bio:"Prince of Ayodhya and the ideal of duty. He kept every promise: to his father, his friends and his people."},
 narada:{n:"Narada",d:"नारद",pid:"music",bio:"The wandering sage with the veena. He carries music and stories between the worlds, always chanting Narayana."}
};
const GUIDE_LINES={
 body:["Strength grows the way I crossed the ocean: one push, then the next.","You are stronger than you remember. Jambavan reminded me, so let me remind you.","Rest is part of training. Even I sat still before the leap.","Strength is best used for someone else. Help someone today.","Breathe like the wind, and move every day."],
 bonds:["A promise kept is a bridge built, one stone at a time.","Call the people who raised you. Exile taught me what they mean.","Duty is lighter when shared with friends.","Listen first, then speak with care.","Small acts of care hold a family together."],
 music:["Listen before you play. The ear opens first.","Narayana, Narayana. Keep the rhythm, even on slow days.","A song is complete only when someone hears it.","Play slowly and cleanly. Speed will come.","Every raga carries a mood. What does yours feel like today?"]
};

/* ================= calendar: ritu, festivals, daily anecdotes ================= */
const RITU=[
 {from:"01-14",n:"Shishira",d:"शिशिर",m:"late winter",s:"The cold deepens and the sun turns north. A season for warmth, routine and keeping going."},
 {from:"03-15",n:"Vasanta",d:"वसन्त",m:"spring",s:"Flowers return and Holi brings colour. A season for fresh starts and new skills."},
 {from:"05-15",n:"Grishma",d:"ग्रीष्म",m:"summer",s:"The heat peaks. Train early, rest at noon, and drink more water."},
 {from:"07-16",n:"Varsha",d:"वर्षा",m:"monsoon",s:"Rain slows travel. Traditionally a time to stay in one place and study."},
 {from:"09-17",n:"Sharad",d:"शरद्",m:"autumn",s:"Clear skies and full moons. Navratri and Diwali fall in this light."},
 {from:"11-16",n:"Hemanta",d:"हेमन्त",m:"early winter",s:"Cool mornings and long evenings. A season for steady practice and warm company."}];
const FEST={
 "2026-11-24":{n:"Kartika Purnima",d:"कार्तिक पूर्णिमा",s:"On this full moon, lamps fill the ghats of Varanasi for Dev Diwali. Tradition says the gods come down to celebrate Shiva’s victory over the demon Tripurasura.",t:"Light a lamp or candle this evening and sit with it for 2 minutes.",bg:"lamps"},
 "2026-12-01":{n:"Kalabhairav Jayanti",d:"कालभैरव जयन्ती",s:"Kala Bhairava, a fierce form of Shiva, is the guardian of Kashi and the keeper of time.",t:"Be on time for everything today."},
 "2026-12-04":{n:"Utpanna Ekadashi",d:"उत्पन्ना एकादशी",s:"Ekadashi is said to be born today, as a power that came out of Vishnu to defeat the demon Mura while Vishnu rested.",t:"Skip one indulgence today: sugar, scrolling or snacks."},
 "2026-12-07":{n:"Masik Shivaratri",d:"मासिक शिवरात्रि",s:"Each month, the night before the new moon is kept for Shiva: stillness in the darkest part of the month.",t:"Sit in silence for 10 minutes before bed.",bg:"stars"},
 "2026-12-08":{n:"Margashirsha Amavasya",d:"मार्गशीर्ष अमावस्या",s:"On the new moon, families remember their ancestors and offer water and food in their name.",t:"Ask an elder one question about your grandparents.",bg:"stars"},
 "2026-12-14":{n:"Vivah Panchami",d:"विवाह पंचमी",s:"Rama and Sita were married in Mithila on this day, after Rama lifted and broke Shiva’s great bow.",t:"Do one thoughtful thing for your partner or closest person.",bg:"city"},
 "2026-12-15":{n:"Subrahmanya Shashti",d:"सुब्रह्मण्य षष्ठी",s:"Skanda, also called Murugan, leads the gods’ army against the demon Surapadman. He stands for focused courage.",t:"One fully focused session, phone in another room."},
 "2026-12-16":{n:"Dhanu Sankranti",d:"धनु संक्रान्ति",s:"The sun enters Dhanu and Dhanurmasa begins. In Tamil homes, Andal’s Tiruppavai is sung before dawn all month.",t:"Wake 20 minutes earlier this month."},
 "2026-12-20":{n:"Gita Jayanti",d:"गीता जयन्ती",s:"Today marks the day Krishna spoke the Bhagavad Gita to Arjuna at Kurukshetra. It is also Mokshada Ekadashi.",t:"Read one verse of the Gita and think about it once today."},
 "2026-12-22":{n:"Hanuman Jayanti (Kannada calendar)",d:"हनुमान जयन्ती",s:"In parts of Karnataka, today is Hanuman Jayanti, also called Hanumad Vratam. Other regions celebrate his birth in spring.",t:"Do your Body task as an offering of strength.",bg:"sea"},
 "2026-12-23":{n:"Dattatreya Jayanti",d:"दत्तात्रेय जयन्ती",s:"Dattatreya is said to have learned from 24 teachers in nature: the earth, the sea, a bee, even a spider. Today is also Margashirsha Purnima.",t:"Learn one lesson from something around you today."},
 "2026-12-24":{n:"Arudra Darshan",d:"आरुद्रा दर्शन",s:"In Chidambaram, devotees celebrate Nataraja: Shiva as the cosmic dancer whose dance keeps the universe moving.",t:"Play or move to music for 5 minutes."},
 "2027-01-15":{n:"Makar Sankranti",d:"मकर संक्रान्ति",s:"The sun turns north. Bhishma waited on his bed of arrows for this time. Kites fill the sky and til-gud is shared.",t:"Share something sweet and say a kind word with it."},
 "2027-03-06":{n:"Maha Shivaratri",d:"महाशिवरात्रि",s:"The great night of Shiva. Many stay awake in meditation and chanting.",t:"Spend 20 minutes in stillness tonight.",approx:true,bg:"stars"},
 "2027-03-22":{n:"Holi",d:"होली",s:"Prahlada’s faith survives the fire that burns Holika. The next day, colour fills the streets.",t:"Let go of one grudge today.",approx:true},
 "2027-04-08":{n:"Ugadi",d:"उगादि",s:"New Year in the Deccan. People eat a mix of six tastes, because a year brings sweet and bitter alike.",t:"Write one goal for the year ahead.",approx:true},
 "2027-04-14":{n:"Rama Navami",d:"राम नवमी",s:"The birth of Rama in Ayodhya.",t:"Keep one promise today without being reminded.",approx:true,bg:"city"},
 "2027-05-08":{n:"Akshaya Tritiya",d:"अक्षय तृतीया",s:"A day when good work is said never to fade. In one telling, Vyasa begins dictating the Mahabharata to Ganesha.",t:"Start something new.",approx:true,bg:"scroll"},
 "2027-07-18":{n:"Guru Purnima",d:"गुरु पूर्णिमा",s:"A full moon for teachers, linked with the sage Vyasa.",t:"Thank one teacher, past or present.",approx:true},
 "2027-08-24":{n:"Janmashtami",d:"जन्माष्टमी",s:"Krishna is born at midnight in a prison in Mathura and carried across the Yamuna to safety.",t:"Play or listen to one song purely for joy.",approx:true,bg:"river"},
 "2027-09-04":{n:"Ganesh Chaturthi",d:"गणेश चतुर्थी",s:"Ganesha, remover of obstacles, is welcomed into homes.",t:"Clear one obstacle you have been avoiding.",approx:true},
 "2027-09-30":{n:"Navratri begins",d:"नवरात्रि",s:"Nine nights of the Goddess, ending in her victory over Mahishasura.",t:"Choose one practice to keep for nine days.",approx:true},
 "2027-10-09":{n:"Vijayadashami",d:"विजयादशमी",s:"Rama defeats Ravana and Durga defeats Mahishasura. A traditional day to begin learning.",t:"Begin a new skill today.",approx:true},
 "2027-10-29":{n:"Diwali",d:"दीपावली",s:"Rama returns to Ayodhya and the city lights lamps to welcome him home.",t:"Call your family and light a lamp.",approx:true,bg:"lamps"}
};
const ANEC=[
 {n:"Ekalavya’s practice",s:"Turned away by the teacher Drona, Ekalavya made a clay image of him and practised archery before it every day, until he became a master.",t:"Practise today even though no one is watching.",src:"Mahabharata, Adi Parva",bg:"forest"},
 {n:"The squirrel at the bridge",s:"While the vanaras built the bridge to Lanka, a small squirrel rolled in sand and shook it onto the stones. Rama stroked its back in thanks.",t:"Do one small part of a big job.",src:"A folk telling",bg:"bridge"},
 {n:"Nachiketa at Yama’s door",s:"Young Nachiketa waited three days at the door of Death and refused every gift offered to distract him, until he got his answer.",t:"Turn down one distraction today.",src:"Katha Upanishad"},
 {n:"Satyakama’s honesty",s:"Asked about his father, Satyakama said honestly that he did not know. His teacher accepted him because of that truth.",t:"Say one honest thing you have been avoiding.",src:"Chandogya Upanishad"},
 {n:"Gargi’s questions",s:"In a king’s court, Gargi questioned the sage Yajnavalkya more sharply than anyone else in the debate.",t:"Ask one bold question today.",src:"Brihadaranyaka Upanishad",bg:"scroll"},
 {n:"Bhagiratha brings the Ganga",s:"Bhagiratha’s long tapas brought the Ganga down from heaven, finishing work his ancestors had begun.",t:"Continue something someone else started.",src:"Ramayana, Bala Kanda",bg:"river"},
 {n:"The first shloka",s:"Seeing a hunter kill one of a pair of krauncha birds, Valmiki’s grief came out as a verse: the first shloka.",t:"Turn one feeling into a few lines or a melody.",src:"Ramayana, Bala Kanda",bg:"river"},
 {n:"Sudama’s gift",s:"Sudama brought Krishna only a handful of flattened rice. Krishna ate it with joy and remembered their friendship.",t:"Send a small message or gift to an old friend.",src:"Bhagavata Purana"},
 {n:"Ganesha the scribe",s:"Ganesha agreed to write the Mahabharata only if Vyasa never paused. Vyasa asked that Ganesha understand every verse before writing it.",t:"Work 25 minutes without pausing.",src:"A popular telling",bg:"scroll"},
 {n:"Govardhan",s:"When storms hit his village, Krishna lifted Govardhan hill and held it up so everyone could shelter beneath it.",t:"Shelter someone today: offer help before you are asked.",src:"Bhagavata Purana",bg:"hills"},
 {n:"Savitri and Yama",s:"Savitri followed Yama as he took her husband away and spoke so wisely that he gave back her husband’s life.",t:"Stay calm and keep going in a hard conversation.",src:"Mahabharata, Vana Parva"},
 {n:"Vishwamitra begins again",s:"Vishwamitra failed and restarted his tapas many times before he was finally called a brahmarishi.",t:"Restart one thing you gave up.",src:"Ramayana, Bala Kanda",bg:"hills"},
 {n:"Abhimanyu’s half lesson",s:"Abhimanyu learned how to enter the chakravyuha before he was born, but never learned how to leave it.",t:"Finish learning one thing you only half know.",src:"Mahabharata"},
 {n:"Karna’s armour",s:"Asked for his divine armour, Karna cut it from his body and gave it, though it left him unprotected.",t:"Give something generously today.",src:"Mahabharata, Vana Parva"},
 {n:"The bird’s eye",s:"Drona asked his students what they saw in the tree. Only Arjuna answered: just the eye of the bird.",t:"Pick one task and see only that for 30 minutes.",src:"Mahabharata, a popular telling",bg:"forest"},
 {n:"Shravana’s care",s:"Shravana Kumara carried his blind parents on pilgrimage in two baskets slung from his shoulders.",t:"Do one practical thing for your parents today.",src:"Ramayana, a popular telling",bg:"hills"}
];
const MONS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ================= journey chapters ================= */
const one=(g,an)=>[[g,120,50,1,an||"rise"]],two=(a,b)=>[[a,30,80,.85,"in-l"],[b,230,80,.85,"in-r"]];
const CHAPTERS={
 hanuman:[
  {dest:"Anjana’s hill",charm:["Anjana’s thread","A reminder of where you come from."],scenes:[{bg:"hills",chars:one("hanuman"),cap:"Hanuman returns to the hill where his mother Anjana raised him."},{bg:"glow",chars:one("hanuman","float"),cap:"As a child he leapt at the sun, thinking it was a fruit. Today he only smiles at the sky."}]},
  {dest:"Surya’s path",charm:["Sun-gold coin","Light earned by keeping up."],scenes:[{bg:"glow",chars:one("hanuman"),cap:"Hanuman asks Surya, the sun, to teach him. Surya agrees, if he can keep up."},{bg:"hills",chars:one("hanuman","float"),cap:"So Hanuman studies facing the sun, moving with it across the sky all day."}]},
  {dest:"Kishkindha",charm:["Kishkindha stone","From the hill of friends."],scenes:[{bg:"hills",chars:one("hanuman"),cap:"In Kishkindha, Hanuman serves Sugriva, the exiled vanara prince."},{bg:"hills",chars:two("rama","hanuman"),cap:"There he meets Rama, and his strength finds its purpose."}]},
  {dest:"Mahendra mountain",charm:["Mahendra pebble","Taken from the place of the leap."],scenes:[{bg:"sea",chars:one("hanuman"),cap:"The search for Sita reaches the ocean. No one can cross it."},{bg:"glow",chars:one("hanuman","rise"),cap:"Jambavan reminds Hanuman of the strength he forgot. He climbs Mahendra mountain to leap."}]},
  {dest:"Mainaka",charm:["Mainaka’s gift","Rest, offered and politely refused."],scenes:[{bg:"sea",chars:one("hanuman","float"),cap:"Halfway across the ocean, the mountain Mainaka rises from the water to offer him rest."},{bg:"sea",chars:one("hanuman"),cap:"Hanuman touches it in thanks and flies on. Rest can wait until the work is done."}]},
  {dest:"Surasa",charm:["Surasa’s scale","Wit beats size."],scenes:[{bg:"sea",chars:one("hanuman"),cap:"Surasa, mother of serpents, blocks his path and opens her mouth wide."},{bg:"glow",chars:one("hanuman","float"),cap:"Hanuman grows huge, then shrinks tiny, slips in and out, and wins her blessing with wit."}]},
  {dest:"Lanka’s gate",charm:["Lankini’s key","The first gate is always the hardest."],scenes:[{bg:"city",chars:one("hanuman"),cap:"At night, the guardian Lankini stops him at the gate of Lanka."},{bg:"city",chars:one("hanuman","rise"),cap:"One blow, and she steps aside, knowing Lanka’s end has begun."}]},
  {dest:"Ashoka grove",charm:["Sita’s chudamani","Hope carried back across the sea."],scenes:[{bg:"forest",chars:one("hanuman"),cap:"In the Ashoka grove he finds Sita and gives her Rama’s ring."},{bg:"glow",chars:one("hanuman","float"),cap:"She gives him her hair jewel to carry back. Hope has crossed the ocean."}]}],
 rama:[
  {dest:"Ayodhya",charm:["Ayodhya dust","Taken from home, carried into exile."],scenes:[{bg:"city",chars:one("rama"),cap:"Rama hears his father’s promise to Kaikeyi and accepts fourteen years of exile without anger."},{bg:"forest",chars:one("rama","float"),cap:"He leaves with Sita and Lakshmana. A promise kept is worth more than a kingdom."}]},
  {dest:"Shringaverapura",charm:["Guha’s oar","Friendship needs no rank."],scenes:[{bg:"river",chars:one("rama"),cap:"Guha, chief of the boatmen, welcomes Rama as a friend."},{bg:"river",chars:one("rama","float"),cap:"He ferries them across the Ganga. Friendship needs no rank."}]},
  {dest:"Chitrakoot",charm:["Chitrakoot leaf","A brother’s trust."],scenes:[{bg:"forest",chars:one("rama"),cap:"Bharata comes to bring Rama home. Rama refuses: his word comes first."},{bg:"glow",chars:one("rama","rise"),cap:"Bharata takes Rama’s sandals and rules in his name until he returns."}]},
  {dest:"Panchavati",charm:["Panchavati flower","A simple home, full of each other."],scenes:[{bg:"forest",chars:one("rama"),cap:"In Panchavati, Rama, Sita and Lakshmana make a simple home in the forest."},{bg:"forest",chars:one("rama","float"),cap:"Quiet days, full of each other. Then Sita is taken."}]},
  {dest:"Shabari’s ashram",charm:["Shabari’s berry","Care in the smallest act."],scenes:[{bg:"forest",chars:one("rama"),cap:"Old Shabari has waited years for Rama to come."},{bg:"glow",chars:one("rama","rise"),cap:"In many tellings, she tastes each berry first so she can give him only the sweet ones. Rama eats them with joy."}]},
  {dest:"Kishkindha",charm:["Sugriva’s pledge","Friendship sworn before fire."],scenes:[{bg:"hills",chars:two("rama","hanuman"),cap:"Hanuman brings Rama to Sugriva."},{bg:"glow",chars:one("rama"),cap:"Rama and Sugriva swear friendship before a fire."}]},
  {dest:"Rameshwaram",charm:["Setu stone","Every stone counts."],scenes:[{bg:"bridge",chars:one("rama"),cap:"The army reaches the sea. Nala and the vanaras build a bridge to Lanka."},{bg:"bridge",chars:one("rama","float"),cap:"Stone by stone, by many hands. In a folk telling, even a squirrel carries sand."}]},
  {dest:"Return to Ayodhya",charm:["Ayodhya diya","The first lamp of Diwali."],scenes:[{bg:"lamps",chars:one("rama"),cap:"After fourteen years, Rama comes home."},{bg:"lamps",chars:one("rama","float"),cap:"The city lights lamps to welcome him. That night is remembered as Diwali."}]}],
 narada:[
  {dest:"Vaikuntha",charm:["Mahati string","From the veena that never leaves him."],scenes:[{bg:"clouds",chars:one("narada"),cap:"Narada sings Narayana’s name as he travels between the worlds."},{bg:"glow",chars:one("narada","float"),cap:"His veena, the Mahati, never leaves his side."}]},
  {dest:"Dhruva’s forest",charm:["Dhruva’s star","Steadiness that becomes a guide."],scenes:[{bg:"stars",chars:one("narada"),cap:"Narada meets a five-year-old boy, Dhruva, walking into the forest alone."},{bg:"stars",chars:one("narada","float"),cap:"He gives Dhruva a mantra. The boy’s steady practice later makes him the pole star."}]},
  {dest:"Hiranyakashipu’s palace",charm:["Prahlada’s lamp","Faith learned before birth."],scenes:[{bg:"city",chars:one("narada"),cap:"Narada shelters the queen Kayadhu and teaches her about devotion."},{bg:"glow",chars:one("narada","rise"),cap:"Her unborn son, Prahlada, hears every word and grows up fearless."}]},
  {dest:"The Tamasa river",charm:["Valmiki’s stylus","The seed of the Ramayana."],scenes:[{bg:"river",chars:one("narada"),cap:"Narada visits the poet Valmiki by the river."},{bg:"scroll",chars:one("narada","float"),cap:"He tells Valmiki the story of Rama, the seed of the Ramayana."}]},
  {dest:"A forest road",charm:["Anthill clay","A life can turn on one question."],scenes:[{bg:"forest",chars:one("narada"),cap:"In a later legend, a robber named Ratnakara stops Narada on a forest road."},{bg:"glow",chars:one("narada","rise"),cap:"Narada asks him who will share the weight of his deeds. The answer changes his life. He becomes Valmiki."}]},
  {dest:"Tumburu’s court",charm:["Tumburu’s note","There is always more to learn."],scenes:[{bg:"clouds",chars:one("narada"),cap:"In a folk tale, the gandharva Tumburu is praised as the finest singer."},{bg:"glow",chars:one("narada","float"),cap:"Narada sees how much he still has to learn, and starts practising again from the beginning."}]},
  {dest:"Kailasa",charm:["The golden mango","Your whole world is close to home."],scenes:[{bg:"hills",chars:one("narada"),cap:"In a Tamil telling, Narada brings a special mango to Shiva’s family on Kailasa."},{bg:"glow",chars:one("narada","float"),cap:"Ganesha wins it by walking around his parents, who are his whole world."}]},
  {dest:"Everywhere",charm:["Traveller’s mala","Music goes where you go."],scenes:[{bg:"clouds",chars:one("narada"),cap:"Narada never settles. He carries news, songs and questions between gods and people."},{bg:"glow",chars:one("narada","float"),cap:"Wherever he goes, music goes with him."}]}]
};

const STORIES={
 seva:{cast:["body","bonds"],note:"Valmiki Ramayana, Kishkindha Kanda",scenes:[
  {bg:"hills",chars:[["hanuman",220,70,.9,"in-r"]],cap:"Kishkindha. Sugriva hides on Rishyamukha hill, and Hanuman keeps watch."},
  {bg:"hills",chars:[["rama",30,80,.85,"in-l"],["hanuman",230,80,.85,"in-r"]],cap:"Two princes arrive, searching for Sita. Hanuman goes down to meet them, disguised as a scholar."},
  {bg:"glow",chars:[["rama",70,60,.95,"rise"],["hanuman",200,80,.8,"bow"]],cap:"He hears Rama speak and knows at once whom he wants to serve. He bows."},
  {bg:"bridge",chars:[["rama",88,58,.55,"float"],["hanuman",140,50,1,"rise"]],cap:"Hanuman carries the brothers on his shoulders to Sugriva. Strength, given to a bond."}]},
 prana:{cast:["body","music"],note:"A folk tale, told in many forms",scenes:[
  {bg:"clouds",chars:[["narada",120,50,1,"in-l"]],notes:[[250,70]],cap:"Narada was proud of his veena. No one, he thought, could sing better."},
  {bg:"hills",chars:[["narada",30,80,.8,""],["hanuman",230,80,.85,"in-r"]],notes:[[160,60]],cap:"He met Hanuman, who asked to hear him play. Then Hanuman began to sing."},
  {bg:"melt",chars:[["hanuman",260,90,.7,"float"]],cap:"The rock under them melted at the song. Narada set his veena on it. When the song ended, the rock set hard around it."},
  {bg:"glow",chars:[["narada",60,70,.85,"bow"],["hanuman",200,70,.85,"rise"]],notes:[[160,50]],cap:"Only Hanuman’s song could free it. Narada learned that music rises from breath, strength and humility."}]},
 sangat:{cast:["bonds","music"],note:"Valmiki Ramayana, Bala Kanda",scenes:[
  {bg:"river",chars:[],cap:"By the river Tamasa, the poet Valmiki asks: is anyone alive truly good, brave and true?"},
  {bg:"clouds",chars:[["narada",120,50,1,"in-r"]],notes:[[250,60]],cap:"Narada, the wandering sage, answers with one name: Rama."},
  {bg:"scroll",chars:[["narada",10,90,.7,""],["rama",240,70,.85,"rise"]],cap:"He tells Rama’s whole story. Valmiki later shapes it into the Ramayana."},
  {bg:"glow",chars:[["rama",120,50,1,"rise"]],notes:[[40,60],[260,80]],cap:"A life became a song that is still sung. Bonds live on through music."}]},
 sangam:{cast:["body","bonds","music"],note:"Uttara Kanda and later tellings",scenes:[
  {bg:"lamps",chars:[["rama",120,40,1,"in-l"]],cap:"After the long war, Rama returns home to Ayodhya. The city lights its lamps."},
  {bg:"lamps",chars:[["rama",60,40,.9,""],["hanuman",210,80,.75,"in-r"]],cap:"Hanuman stays at his feet, still serving."},
  {bg:"clouds",chars:[["narada",120,50,.95,"in-r"]],notes:[[40,70]],cap:"In many tellings, Narada comes to sing at the court."},
  {bg:"rivers",chars:[["hanuman",10,90,.7,"rise"],["rama",120,50,.85,"rise"],["narada",250,90,.7,"rise"]],cap:"Strength, bonds and music meet, like three rivers at Prayag."}]}
};
