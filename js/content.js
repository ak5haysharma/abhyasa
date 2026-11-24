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
const PERK={swap:()=>"+1 streak shield each week",xp:n=>`+10% growth on ${n}`,shield:()=>"1 streak shield each week",all:()=>"+5% growth on every path"};
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
 body:{name:"Strength",realm:"body",about:"Fitness, strength, energy",hero:"Hanuman",heroDev:"हनुमान",c:"var(--body)",
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
 bonds:{name:"Family",realm:"bonds",about:"Parents, siblings, friends, roots",hero:"Rama",heroDev:"राम",c:"var(--bonds)",
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
 music:{name:"Music",realm:"joy",about:"Guitar, voice, ear, creating",hero:"Narada",heroDev:"नारद",c:"var(--music)",
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
   X("Quiet fingerstyle practice",10,{tags:"guitar",lo:1,en:1,quiet:true,g:["Good for late evenings","Thumb plays the bass, then index, middle, ring","Hold a C chord and play the pattern 10 times slowly"],tool:{type:"metronome",bpm:60}})]},
 flex:{name:"Flexibility and breath",realm:"body",about:"Yoga, mobility, breathing",hero:"Patanjali",heroDev:"पतञ्जलि",c:"var(--flex)",
  q:"How free does your body feel?",
  levels:["I feel stiff most days","I stretch now and then","I do yoga or mobility weekly","I practise most days"],
  tags:[["yoga","Yoga"],["mobility","Mobility"],["breath","Breathwork"],["posture","Desk posture"]],
  skills:[
   {n:"Sthira Sukha",d:"स्थिर सुख",s:"Steady and easy: the Yoga Sutras’ test of a good posture.",perk:"swap"},
   {n:"Pranayama",d:"प्राणायाम",s:"Breath, lengthened and steadied, steadies the mind.",perk:"xp",item:"Mala",itemName:"Rudraksha mala"},
   {n:"Abhyasa",d:"अभ्यास",s:"Practice kept up for a long time, without a break, with care.",perk:"shield"},
   {n:"Pratyahara",d:"प्रत्याहार",s:"Drawing the senses inward, the way a tortoise draws in its limbs.",perk:"xp",item:"Pot",itemName:"Kamandalu"},
   {n:"Samadhi",d:"समाधि",s:"Complete absorption: body, breath and mind as one.",perk:"all"}],
  trials:[
   {def:"Fold forward and touch the floor or your shins with straight legs, held 10 sec",breath:"5 min of slow breathing at 6 breaths a minute",yoga:"Hold a 1 min downward dog with steady breath"},
   {def:"Hold a deep squat for 2 minutes"},
   {def:"20 minutes of yoga or mobility without a break"},
   {def:"Hold a 1 min balance pose on each leg with eyes steady"},
   {def:"A 45 min practice: postures, breath and 10 min of stillness"}],
  pool:[
   X("Calm breathing, 5 in, 5 out",6,{tags:"breath|any",en:1,g:["Sit tall, shoulders soft","Breathe in for 5, out for 5: six breaths a minute","Breathe through the nose if you can"],tool:{type:"breath",in:5,hold:0,out:5}}),
   X("Nadi shodhana, alternate nostril",8,{tags:"breath",en:1,g:["Right thumb closes the right nostril; breathe in left","Ring finger closes the left; breathe out right","In right, out left. That’s one round","Slow and quiet, never forced"],tool:{type:"breath",in:4,hold:2,out:6}}),
   X("Desk reset: neck and shoulders",5,{tags:"posture|any",en:1,load:["mobility"],g:["Chin tucks, 10 slow","Shoulder rolls, 10 back","Doorway chest stretch, 30 sec each side","Look away from the screen for 30 sec"],tool:{type:"timer",sec:300}}),
   X("6 rounds of sun salutation",10,{tags:"yoga",hi:2,place:"home",en:2,load:["mobility","push"],g:["One breath per movement","Knees down in the plank if needed","Finish standing still for 3 breaths"],tool:{type:"counter",target:6,label:"rounds"}}),
   X("Hip opener sequence",15,{tags:"yoga|mobility",place:"home",en:1,load:["mobility"],rec:["legs"],g:["Low lunge, 1 min per side","Pigeon pose or figure-4, 90 sec per side","Butterfly, 1 min","Happy baby, 1 min"],tool:{type:"timer",sec:900}}),
   X("Hamstring and spine flow",12,{tags:"mobility|any",en:1,load:["mobility"],rec:["legs"],g:["Cat-cow, 10 slow rounds","Standing forward fold, bend the knees, 1 min","Seated twist, 1 min per side","Lying hamstring stretch with a strap or towel, 1 min per leg"],tool:{type:"timer",sec:720}}),
   X("Balance practice",8,{tags:"yoga",en:1,load:["mobility"],g:["Tree pose, 30 sec per side, 3 times","Fix your eyes on one point","Then try with eyes closed for 5 sec"],tool:{type:"timer",sec:480}}),
   X("Walk and breathe: 4 steps in, 4 out",15,{tags:"breath",place:"out",en:1,load:["cardio"],g:["Breathe in for 4 steps, out for 4 steps","If that’s easy, try 4 in and 6 out","Notice your feet on the ground"],tool:{type:"timer",sec:900}}),
   X("Yin stretch before bed",15,{tags:"mobility|yoga",lo:1,place:"home",en:1,load:["mobility"],rec:["legs"],quiet:true,g:["Hold each pose 2–3 minutes, no effort","Child’s pose, then supported bridge, then legs up the wall","Slow breathing throughout"],tool:{type:"timer",sec:900}}),
   X("Full yoga practice",40,{tags:"yoga",lo:2,place:"home",en:2,load:["mobility","push","legs"],g:["5 min breathing","20 min standing and floor postures","5 min balance","10 min rest in shavasana"],tool:{type:"timer",sec:2400}}),
   X("Box breathing before a hard moment",4,{tags:"breath|any",en:1,g:["Use it before a meeting or a hard call","In 4, hold 4, out 4","Repeat 6 times"],tool:{type:"breath",in:4,hold:4,out:4}})]},
 love:{name:"Partner and love",realm:"bonds",about:"Your partner, dating, and self-respect",hero:"Savitri",heroDev:"सावित्री",c:"var(--love)",
  q:"How is love in your life right now?",
  levels:["Single, and not sure where to start","Together, but it feels distant","In a good relationship","Deeply connected"],
  tags:[["partner","Partner"],["dating","Dating"],["selflove","Self-respect"]],
  skills:[
   {n:"Svayamvara",d:"स्वयंवर",s:"Savitri chose for herself. Love begins with knowing what you want.",perk:"swap"},
   {n:"Shraddha",d:"श्रद्धा",s:"Trust in the person you chose, even in hard times.",perk:"xp",item:"Garland",itemName:"Forest garland"},
   {n:"Sahana",d:"सहन",s:"Patience: a simple life in the forest, lived without complaint.",perk:"shield"},
   {n:"Vak",d:"वाक्",s:"Wise, calm words. Savitri’s speech moved even Yama.",perk:"xp",item:"Ring",itemName:"Wedding ring"},
   {n:"Saubhagya",d:"सौभाग्य",s:"A love strong enough to outlast fate.",perk:"all"}],
  trials:[
   {def:"Plan and enjoy one screen-free evening together",dating:"Start one real conversation with someone new",selflove:"Spend one evening doing only what you love"},
   {def:"Have a calm talk about something that bothers you",dating:"Ask someone out, or say yes to an invitation"},
   {def:"Plan a full day around what your partner loves",dating:"Go on a date and be fully yourself",selflove:"Write down what you want in a partner, and why"},
   {def:"Share three things you’re grateful for in each other",selflove:"Turn down one thing that doesn’t respect you"},
   {def:"Make a shared plan for the next year together",dating:"Have an honest talk about what you both want"}],
  pool:[
   X("15 min together, phones away",15,{tags:"partner",en:1,g:["Phones in another room","Ask: what was the best part of your day?","Listen more than you talk"],tool:{type:"timer",sec:900}}),
   X("Send a message just because",3,{tags:"partner|dating",en:1,g:["No logistics, no requests","Mention something specific you like about them"]}),
   X("Cook something together",45,{tags:"partner",lo:1,g:["Pick a dish neither of you has made","Share the jobs, play music","Eat at the table, no screens"]}),
   X("Ask a deeper question",10,{tags:"partner|dating",lo:1,en:1,g:["Try: what’s something you’ve changed your mind about?","Or: what do you want more of this year?","Listen, then ask one follow-up"]}),
   X("Plan a small surprise",10,{tags:"partner",lo:1,en:1,g:["Think of something they mentioned recently","Small and personal beats big and generic"]}),
   X("Take a walk together",30,{tags:"partner",place:"out",en:1,load:["cardio"],g:["No destination needed","Talk about plans, not problems"]}),
   X("Say yes to one social plan",5,{tags:"dating",en:1,g:["An event, a class, a friend’s gathering","You meet people by being where people are"]}),
   X("Write three things you value in a partner",10,{tags:"dating|selflove",en:1,g:["Values, not looks or job titles","Note one thing you won’t compromise on"]}),
   X("One evening just for you",60,{tags:"selflove",lo:1,en:1,g:["Do something you love, alone","No apologising for it"]}),
   X("Repair one small hurt",10,{tags:"partner",lo:2,en:2,g:["Name it calmly: “Earlier, when…”","Say how it felt, not what they did wrong","Ask what they need"]}),
   X("Plan a date night",10,{tags:"partner|dating",en:1,g:["Pick a day and book it","Something you haven’t done together before"]})]},
 learn:{name:"Learning",realm:"craft",about:"Study, courses, languages, reading",hero:"Saraswati",heroDev:"सरस्वती",c:"var(--learn)",
  q:"How is your learning going?",
  levels:["I haven’t studied in a while","I learn now and then","I study a few times a week","I study most days"],
  tags:[["reading","Reading"],["course","Courses"],["language","Languages"],["tech","Tech and AI"]],
  skills:[
   {n:"Akshara",d:"अक्षर",s:"The first letter. Every learner starts with one.",perk:"swap"},
   {n:"Pustaka",d:"पुस्तक",s:"The book in Saraswati’s hand: knowledge you can return to.",perk:"xp",item:"Book",itemName:"Palm-leaf book"},
   {n:"Smriti",d:"स्मृति",s:"Memory: what you revisit, stays.",perk:"shield"},
   {n:"Viveka",d:"विवेक",s:"Like her swan, said to separate milk from water: telling true from false.",perk:"xp",item:"Swan",itemName:"Swan feather"},
   {n:"Vidya",d:"विद्या",s:"Knowledge that frees you, and grows when shared.",perk:"all"}],
  trials:[
   {def:"Finish one chapter or lesson and explain it in 3 sentences",language:"Hold a 2 min conversation in the language",tech:"Build or try one small thing with a new tool"},
   {def:"Study on 5 days in one week"},
   {def:"Finish a whole course module or a whole book",language:"Read a short article in the language without a dictionary"},
   {def:"Teach one thing you learned to someone else"},
   {def:"Complete a course, certificate or project",language:"Hold a 15 min conversation in the language"}],
  pool:[
   X("Read 20 pages",25,{tags:"reading",en:1,quiet:true,g:["Phone in another room","Underline one idea worth keeping","Write it down in one sentence after"],tool:{type:"timer",sec:1500}}),
   X("Focused study, 25 minutes",25,{tags:"course|tech|any",en:2,g:["One topic only","Notes in your own words","5 min break after"],tool:{type:"timer",sec:1500,label:"Study timer"}}),
   X("One lesson of your course",30,{tags:"course",en:2,g:["Watch or read the lesson once","Pause and write the key point","Do the exercise, even if it’s optional"]}),
   X("Language practice, 15 min",15,{tags:"language",en:1,g:["App lesson or flashcards","Say every answer out loud","Learn 5 new words and use each in a sentence"],tool:{type:"timer",sec:900}}),
   X("Flashcard review",10,{tags:"language|course|any",en:1,g:["Review before you learn new cards","Say the answer before you flip","Hard cards come back sooner"],tool:{type:"counter",target:30,label:"cards",step:5}}),
   X("Review yesterday’s notes",10,{tags:"any",en:1,g:["Read them once","Cover them and recall the key points","Fix anything you got wrong"]}),
   X("Teach it back",15,{tags:"any",lo:1,en:2,g:["Explain today’s topic out loud, as if to a friend","Where you get stuck is what to study next"]}),
   X("Build a tiny thing with a new tool",45,{tags:"tech",lo:2,en:3,g:["Pick one small, real problem","Use the new tool for every step","Write down what surprised you"]}),
   X("Explain one AI idea in plain words",15,{tags:"tech",lo:1,en:2,g:["Pick a term: embeddings, agents, fine-tuning…","Write 5 sentences a non-expert would understand","Check them against a good source"]}),
   X("Listen and learn on the move",20,{tags:"any",place:"any",en:1,travel:true,g:["A podcast or lecture on your topic","Note one idea afterwards"]})]},
 focus:{name:"Career focus",realm:"craft",about:"Deep work, career growth, side projects",hero:"Arjuna",heroDev:"अर्जुन",c:"var(--focus)",
  q:"How focused is your work right now?",
  levels:["I’m scattered most days","Some good days","Mostly focused","Deep work is a habit"],
  tags:[["deepwork","Deep work"],["career","Career growth"],["side","Side project"],["habits","Phone and email habits"]],
  skills:[
   {n:"Lakshya",d:"लक्ष्य",s:"The target: know exactly what you’re aiming at.",perk:"swap"},
   {n:"Gandiva",d:"गाण्डीव",s:"Arjuna’s bow: the right tool, kept ready.",perk:"xp",item:"Bow",itemName:"Gandiva"},
   {n:"Ekagrata",d:"एकाग्रता",s:"One-pointed focus, like the bird’s eye.",perk:"shield"},
   {n:"Savyasachi",d:"सव्यसाची",s:"Arjuna could shoot with either hand: range built by practice.",perk:"xp",item:"Shell",itemName:"Devadatta conch"},
   {n:"Karma Yoga",d:"कर्मयोग",s:"Do the work well, and let go of the result.",perk:"all"}],
  trials:[
   {def:"Two 45 min deep-work blocks in one day, phone away"},
   {def:"Finish the task you’ve been avoiding most"},
   {def:"Ship something: a feature, report or post",career:"Ask a manager or mentor for specific feedback",side:"Publish a first version of your side project"},
   {def:"A full week with deep work on every workday"},
   {def:"Complete a milestone you set four weeks ago"}],
  pool:[
   X("Plan tomorrow in three lines",5,{en:1,g:["The one thing that matters most","Two things that would be nice","Put the first one in your calendar"]}),
   X("Deep-work block, 45 min",45,{tags:"deepwork|any",en:3,g:["One task, written down first","Phone in another room, notifications off","Stop at 45 min and note where you are"],tool:{type:"timer",sec:2700,label:"Focus timer"}}),
   X("Hardest task first",30,{tags:"deepwork",lo:1,en:3,g:["Before email or chat","Just start: 30 minutes, then decide"],tool:{type:"timer",sec:1800}}),
   X("Inbox to zero",15,{tags:"habits",en:1,g:["Reply in 2 minutes or schedule it","Archive the rest","Close the inbox when done"],tool:{type:"timer",sec:900}}),
   X("Two hours with the phone away",5,{tags:"habits|deepwork",en:1,g:["Put the phone in another room","Tick this when the two hours are done"]}),
   X("Learn one skill for your role",30,{tags:"career",lo:1,en:2,g:["Pick a skill your next role needs","One tutorial, then try it on real work"]}),
   X("Update your CV or LinkedIn",20,{tags:"career",en:1,g:["Add one recent result with a number","Remove one outdated line"]}),
   X("30 min on your side project",30,{tags:"side",en:2,g:["Pick the smallest next step","Ship something, even if it’s tiny"],tool:{type:"timer",sec:1800}}),
   X("Weekly review",20,{lo:1,en:1,g:["What moved forward this week?","What got stuck, and why?","Choose next week’s one big thing"]}),
   X("Say no to one thing",5,{tags:"habits|career",lo:1,en:1,g:["A meeting, a request or a habit that wastes time","Say no politely and briefly"]})]},
 calm:{name:"Meditation",realm:"peace",about:"Stillness, meditation, mantra",hero:"Dhruva",heroDev:"ध्रुव",c:"var(--calm)",
  q:"How is your inner calm?",
  levels:["I rarely sit still","I’ve tried meditation","I meditate sometimes","I meditate most days"],
  tags:[["silent","Silent sitting"],["mantra","Mantra"],["guided","Guided"],["gratitude","Gratitude"]],
  skills:[
   {n:"Sankalpa",d:"संकल्प",s:"Dhruva’s resolve: decide once, then keep going.",perk:"swap"},
   {n:"Japa",d:"जप",s:"Repeating a mantra, bead by bead.",perk:"xp",item:"Mala",itemName:"Japa mala"},
   {n:"Dhriti",d:"धृति",s:"Steadiness through cold, hunger and doubt.",perk:"shield"},
   {n:"Dhyana",d:"ध्यान",s:"Meditation that flows without effort.",perk:"xp",item:"Star",itemName:"Pole star"},
   {n:"Achala",d:"अचल",s:"Unmoving, like the pole star others steer by.",perk:"all"}],
  trials:[
   {def:"Sit still for 10 minutes without your phone",mantra:"108 repetitions of a mantra with a mala"},
   {def:"Meditate on 7 days in a row"},
   {def:"Sit for 20 minutes without moving"},
   {def:"Half a day with no screens: quiet practice only"},
   {def:"Meditate on 30 days in a row"}],
  pool:[
   X("Three minutes of breath",3,{tags:"any",en:1,g:["Sit or stand still","Breathe in 4, out 6","Count 10 breaths; start again if you lose count"],tool:{type:"breath",in:4,hold:0,out:6}}),
   X("10 min silent sitting",10,{tags:"silent",en:1,quiet:true,g:["Sit upright, eyes closed or lowered","Notice the breath at the nostrils","When the mind wanders, come back. That is the practice"],tool:{type:"timer",sec:600}}),
   X("20 min sitting",20,{tags:"silent",lo:2,en:2,g:["Same as the 10 min sit, just longer","Don’t move for the first 10 minutes"],tool:{type:"timer",sec:1200}}),
   X("Mantra with a mala",12,{tags:"mantra",en:1,g:["Choose a short mantra, for example Om Namah Shivaya or Om","One bead per repetition, 108 beads","Tap the counter after each quarter round of 27"],tool:{type:"counter",target:4,label:"quarter rounds"}}),
   X("Guided meditation",10,{tags:"guided",en:1,g:["Use any meditation app or recording you trust","Headphones, eyes closed"],tool:{type:"timer",sec:600}}),
   X("Body scan",15,{tags:"guided|silent",en:1,quiet:true,g:["Lie down","Move attention slowly from toes to head","Notice each area without changing it"],tool:{type:"timer",sec:900}}),
   X("Three things I’m grateful for",5,{tags:"gratitude|any",en:1,g:["Write them down","Be specific: not “family” but what someone did today"]}),
   X("Walking meditation",15,{tags:"silent",place:"out",en:1,load:["cardio"],g:["Walk slowly, no earphones","Feel each step: lift, move, place"],tool:{type:"timer",sec:900}}),
   X("Candle gazing (trataka)",5,{tags:"silent",lo:1,place:"home",en:1,quiet:true,g:["Candle at eye level, an arm’s length away","Gaze softly at the flame for 1–2 min","Close your eyes and watch the after-image"],tool:{type:"timer",sec:300}}),
   X("No screens after 21:00",5,{tags:"any",lo:1,en:1,quiet:true,g:["Phone on charge outside the bedroom","Read, talk or sit instead"]})]}

};
const ORDER=["body","flex","bonds","love","learn","focus","music","calm"];
const REALMS=[
 {id:"body",n:"Body",s:"Sharira",d:"शरीर",about:"Health and strength"},
 {id:"bonds",n:"Bonds",s:"Dharma",d:"धर्म",about:"Duty and people"},
 {id:"craft",n:"Craft",s:"Artha",d:"अर्थ",about:"Work and prosperity"},
 {id:"joy",n:"Joy",s:"Kama",d:"काम",about:"Beauty and expression"},
 {id:"peace",n:"Peace",s:"Moksha",d:"मोक्ष",about:"Inner freedom"}];
// Paths that build on each other, used for "ready to expand?" suggestions
const RELATED={body:["flex"],flex:["calm","body"],bonds:["love"],love:["bonds"],learn:["focus","music"],focus:["learn"],music:["learn"],calm:["flex"]};
[["Send 5 problems at your current grade in one session","Swim 200 m without stopping"],["Send your first problem one grade harder","Swim 500 m without stopping"],["Flash a problem at your project grade","Swim 1 km without stopping"],["Send a problem two grades above where you started","Swim 1.5 km in under 40 min"],["Send your hardest problem yet, in front of friends","Swim 2 km without stopping"]].forEach(([c,w],k)=>{PATHS.body.trials[k].climb=c;PATHS.body.trials[k].swim=w});
const KIT=[["gym","Gym"],["pool","Pool"],["wall","Climbing wall"],["park","Park or outdoors"],["dumbbells","Dumbbells"],["bands","Resistance bands"],["pullup","Pull-up bar"],["hangboard","Hangboard"],["mat","Yoga mat"]];
const ACTS=[
 {id:"gym",pid:"body",n:"Gym session",m:60,load:["push","pull","legs"],place:"gym"},
 {id:"climb",pid:"body",n:"Bouldering",m:75,load:["pull","grip"],place:"wall"},
 {id:"swim",pid:"body",n:"Swimming",m:45,load:["cardio","pull"],place:"pool"},
 {id:"run",pid:"body",n:"Running",m:40,load:["cardio","legs"],place:"out"},
 {id:"yoga",pid:"flex",n:"Yoga class",m:60,load:["mobility"],place:"any"},
 {id:"guitar",pid:"music",n:"Guitar practice or lesson",m:45,load:[],place:"any"},
 {id:"family",pid:"bonds",n:"Family call",m:30,load:[],place:"any"},
 {id:"study",pid:"learn",n:"Course or class",m:60,load:[],place:"any"},
 {id:"sit",pid:"calm",n:"Meditation group",m:30,load:[],place:"any"},
 {id:"date",pid:"love",n:"Date night",m:90,load:[],place:"any"}];
const SONGS=[
 [["A Horse with No Name","America"],["Knockin’ on Heaven’s Door","Bob Dylan"],["Leaving on a Jet Plane","John Denver"]],
 [["Stand by Me","Ben E. King"],["Tum Hi Ho","Aashiqui 2"],["Let Her Go","Passenger"]],
 [["Wonderwall","Oasis"],["Agar Tum Saath Ho","Tamasha"],["Wish You Were Here","Pink Floyd"]],
 [["Tears in Heaven","Eric Clapton"],["Blackbird","The Beatles"],["Hotel California","Eagles"]]];
const SOON=[["Friendship","Krishna","bonds"],["Money","Lakshmi","craft"],["Making","Vishwakarma","craft"],["Art and writing","Valmiki","joy"],["Courage","Durga","body"],["Wisdom","Nachiketa","peace"],["Gratitude","Shabari","peace"]];
const SYN=[
 {id:"prana",p:["body","music"],req:2,n:"Prana and Nada",d:"प्राण-नाद",s:"Breath feeds sound. A strong, steady body holds the instrument longer and plays calmer.",q:"5 min breathing, then 10 min of music"},
 {id:"seva",p:["body","bonds"],req:2,n:"Seva",d:"सेवा",s:"Hanuman’s strength was always in service of Rama. Share your strength with people you love.",q:"Walk or train with family or a friend"},
 {id:"sangat",p:["bonds","music"],req:2,n:"Sangat",d:"संगत",s:"Music is complete when someone hears it. Play for the people around you.",q:"Play or sing one song for someone"},
 {id:"sangam",p:["body","bonds","music"],req:4,n:"Triveni Sangam",d:"त्रिवेणी संगम",s:"Where three rivers meet. Body, bonds and music now feed each other.",q:"Train, then play for your family"}
];
const TIMES=[[15,"15 min"],[30,"30 min"],[45,"45 min"],[75,"60+ min"]];


const CHAR={body:"hanuman",flex:"patanjali",bonds:"rama",love:"savitri",learn:"saraswati",focus:"arjuna",music:"narada",calm:"dhruva"};
const PEOPLE={
 hanuman:{n:"Hanuman",d:"हनुमान",pid:"body",pr:"he",bio:"Son of the wind and Rama’s devoted friend. He leapt the ocean, carried a mountain, and never forgot to serve."},
 rama:{n:"Rama",d:"राम",pid:"bonds",pr:"he",bio:"Prince of Ayodhya and the ideal of duty. He kept every promise: to his father, his friends and his people."},
 narada:{n:"Narada",d:"नारद",pid:"music",pr:"he",bio:"The wandering sage with the veena. He carries music and stories between the worlds, always chanting Narayana."},
 patanjali:{n:"Patanjali",d:"पतञ्जलि",pid:"flex",pr:"he",bio:"The sage who gathered yoga into the Yoga Sutras. Legend says he was the great serpent Adishesha, born into a mother’s folded hands."},
 savitri:{n:"Savitri",d:"सावित्री",pid:"love",pr:"she",bio:"A princess who chose her own husband, Satyavan, knowing he was fated to die. With calm and wisdom she won his life back from Yama."},
 saraswati:{n:"Saraswati",d:"सरस्वती",pid:"learn",pr:"she",bio:"Goddess of knowledge, speech and music. She holds a veena and a book, and her white swan stands for telling true from false."},
 arjuna:{n:"Arjuna",d:"अर्जुन",pid:"focus",pr:"he",bio:"The great archer of the Mahabharata, famous for focus. When doubt stopped him at Kurukshetra, Krishna’s answer became the Bhagavad Gita."},
 dhruva:{n:"Dhruva",d:"ध्रुव",pid:"calm",pr:"he",bio:"A five-year-old prince who walked into the forest after being pushed away. His steady practice made him the pole star."}
};
const GUIDE_LINES={
 body:["Strength grows the way I crossed the ocean: one push, then the next.","You are stronger than you remember. Jambavan reminded me, so let me remind you.","Rest is part of training. Even I sat still before the leap.","Strength is best used for someone else. Help someone today.","Breathe like the wind, and move every day."],
 bonds:["A promise kept is a bridge built, one stone at a time.","Call the people who raised you. Exile taught me what they mean.","Duty is lighter when shared with friends.","Listen first, then speak with care.","Small acts of care hold a family together."],
 flex:["Steady and easy: that is a good posture, and a good life.","Lengthen the breath and the mind follows.","Practice, kept up for a long time, takes root.","Stiffness is only a habit. Habits can change.","Stillness is also a practice."],
 love:["Love begins with knowing what you want.","Speak calmly, even when it matters most. Especially then.","Small, daily care outlasts grand gestures.","Choose again, every day, the person you chose.","Respect for yourself makes love steady."],
 learn:["Every learner starts with one letter.","What you revisit, stays.","Ask, then listen. Knowledge flows like a river.","Teach what you learned today, and it becomes yours.","Tell true from false, the way the swan separates milk from water."],
 focus:["See only the bird’s eye. One target today.","Do the work well. Let the result go.","When your hands shake, sit down, breathe, and stand up again.","Practise even in the dark. Skill grows from habit.","The right tool, kept ready, saves the day."],
 calm:["Decide once. Then sit, again and again.","When the mind runs, come back. That is the practice.","Steadiness is quiet, but it guides others.","Cold, hunger, doubt: they pass. You stay.","Find the still point, and steer by it."],
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
  {dest:"Everywhere",charm:["Traveller’s mala","Music goes where you go."],scenes:[{bg:"clouds",chars:one("narada"),cap:"Narada never settles. He carries news, songs and questions between gods and people."},{bg:"glow",chars:one("narada","float"),cap:"Wherever he goes, music goes with him."}]}],
 patanjali:[
  {dest:"Gonika’s folded hands",charm:["Anjali leaf","Fallen into open hands."],scenes:[{bg:"river",chars:one("patanjali"),cap:"A legend says Patanjali fell as a tiny serpent into the cupped hands of Gonika, praying by a river."},{bg:"glow",chars:one("patanjali","float"),cap:"So he was named Pata-anjali: fallen into folded hands."}]},
  {dest:"Chidambaram",charm:["Nataraja’s ember","Where movement meets stillness."],scenes:[{bg:"city",chars:one("patanjali"),cap:"In one telling, Patanjali waits at Chidambaram to see Shiva’s cosmic dance."},{bg:"glow",chars:one("patanjali","float"),cap:"Watching the dance, he sees how movement and stillness belong together."}]},
  {dest:"The Yoga Sutras",charm:["Sutra thread","Short threads of meaning."],scenes:[{bg:"scroll",chars:one("patanjali"),cap:"He gathers yoga into short threads of meaning: the Yoga Sutras."},{bg:"glow",chars:one("patanjali","rise"),cap:"An early sutra says yoga is the stilling of the mind’s restless movements."}]},
  {dest:"Behind the screen",charm:["Adishesha’s coil","Some truths need patience."],scenes:[{bg:"forest",chars:one("patanjali"),cap:"A legend says he taught a thousand students at once from behind a screen."},{bg:"glow",chars:one("patanjali","float"),cap:"One student peeked and saw the great serpent Adishesha. Some truths need patience to be seen."}]}],
 savitri:[
  {dest:"Madra",charm:["Svayamvara flower","Choosing for yourself."],scenes:[{bg:"city",chars:one("savitri"),cap:"Princess Savitri of Madra is free to choose her own husband."},{bg:"forest",chars:one("savitri","float"),cap:"She chooses Satyavan, a prince living in exile in the forest."}]},
  {dest:"Narada’s warning",charm:["Forest garland","A choice kept."],scenes:[{bg:"glow",chars:two("narada","savitri"),cap:"Narada warns her: Satyavan will die within a year."},{bg:"glow",chars:one("savitri","rise"),cap:"Savitri does not change her choice. Love, once given, is kept."}]},
  {dest:"The forest year",charm:["Three-night vow","Patience made visible."],scenes:[{bg:"forest",chars:one("savitri"),cap:"She lives simply with Satyavan and cares for his blind parents."},{bg:"stars",chars:one("savitri","float"),cap:"Before the fated day, she keeps a fast for three nights."}]},
  {dest:"Following Yama",charm:["Yama’s boon","Calm words change fate."],scenes:[{bg:"forest",chars:one("savitri"),cap:"Yama comes for Satyavan. Savitri follows, speaking with wisdom and calm."},{bg:"glow",chars:one("savitri","rise"),cap:"Pleased, Yama grants her wishes, and her last wish brings Satyavan back to life."}]}],
 saraswati:[
  {dest:"The lotus",charm:["White lotus petal","Clarity rising from water."],scenes:[{bg:"glow",chars:one("saraswati"),cap:"Saraswati is the goddess of knowledge, speech and music."},{bg:"river",chars:one("saraswati","float"),cap:"She is also a river, said to flow unseen beneath the earth."}]},
  {dest:"The veena and the book",charm:["Veena string","Art and learning together."],scenes:[{bg:"clouds",chars:one("saraswati"),cap:"She holds a veena, a book and a mala: art, learning and focus."},{bg:"glow",chars:one("saraswati","rise"),cap:"Her white swan is said to separate milk from water: telling true from false."}]},
  {dest:"Vasant Panchami",charm:["Yellow flower","The first letter."],scenes:[{bg:"hills",chars:one("saraswati"),cap:"On Vasant Panchami, many children write their first letters in her honour."},{bg:"glow",chars:one("saraswati","float"),cap:"Every learner starts with one letter."}]},
  {dest:"The hidden river",charm:["River pebble","What you learn quietly shows up later."],scenes:[{bg:"river",chars:one("saraswati"),cap:"The Saraswati river is said to join the Ganga and Yamuna unseen at Prayag."},{bg:"rivers",chars:one("saraswati","rise"),cap:"Learning works the same way: what you studied quietly shows up later."}]}],
 arjuna:[
  {dest:"Practice in the dark",charm:["Practice arrow","Skill grows from habit."],scenes:[{bg:"stars",chars:one("arjuna"),cap:"In a popular telling, the lamp blows out at dinner and Arjuna keeps eating easily in the dark."},{bg:"forest",chars:one("arjuna","rise"),cap:"He realises habit guides his hands, so he starts practising archery at night too."}]},
  {dest:"Drona’s test",charm:["Clay bird","One target."],scenes:[{bg:"forest",chars:one("arjuna"),cap:"Drona asks his students what they see in the tree."},{bg:"glow",chars:one("arjuna","float"),cap:"Only Arjuna answers: just the bird’s eye."}]},
  {dest:"Draupadi’s svayamvara",charm:["Fish-eye target","Calm hands, still mind."],scenes:[{bg:"city",chars:one("arjuna"),cap:"The test is to hit a turning fish above, looking only at its reflection below."},{bg:"glow",chars:one("arjuna","rise"),cap:"Arjuna strings the great bow and hits the mark."}]},
  {dest:"Kurukshetra",charm:["Gandiva string","Doubt, then action."],scenes:[{bg:"hills",chars:one("arjuna"),cap:"Before the battle, Arjuna’s hands shake and he sets down his bow."},{bg:"glow",chars:one("arjuna","rise"),cap:"Krishna’s answer becomes the Gita, and Arjuna stands up to do his work."}]}],
 dhruva:[
  {dest:"The king’s lap",charm:["Forest stone","Something no one can take."],scenes:[{bg:"city",chars:one("dhruva"),cap:"Young Dhruva is pushed off his father’s lap by his stepmother."},{bg:"forest",chars:one("dhruva","float"),cap:"Hurt, he walks into the forest looking for something no one can take away."}]},
  {dest:"Narada’s mantra",charm:["Mantra bead","A method, and the work."],scenes:[{bg:"forest",chars:two("narada","dhruva"),cap:"Narada tests his resolve, then gives him a mantra."},{bg:"stars",chars:one("dhruva","float"),cap:"Dhruva sits and repeats it, day after day."}]},
  {dest:"Madhuvana",charm:["Madhuvana leaf","Steadiness through doubt."],scenes:[{bg:"forest",chars:one("dhruva"),cap:"His practice deepens through cold and hunger. He does not move."},{bg:"glow",chars:one("dhruva","rise"),cap:"Vishnu appears before him, moved by his steadiness."}]},
  {dest:"The pole star",charm:["Dhruva’s light","A fixed point to steer by."],scenes:[{bg:"stars",chars:one("dhruva"),cap:"Dhruva is given a place that never moves: the pole star."},{bg:"stars",chars:one("dhruva","float"),cap:"Travellers still find their way by him."}]}]
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

/* ================= starter pack: guide intros, English meanings, glossary, tips ================= */
// Three short cards shown when a guide joins you. bg = scene for the "famous moment" card.
const GUIDE_INTRO={
 hanuman:{who:"Hanuman is a vanara, a forest being with a monkey form, and the son of the wind god Vayu. He is loved for his strength and loyalty.",moment:"When no one else could, he leapt across the ocean to Lanka to find Sita, Rama’s wife.",teach:"Strength grows with practice, and is best used for others.",src:"Ramayana",bg:"sea"},
 rama:{who:"Rama is the prince of Ayodhya and the hero of the Ramayana. Many Hindus worship him as a form of the god Vishnu, and he is seen as the ideal of duty.",moment:"To keep his father’s promise, he gave up his throne and spent fourteen years in exile in the forest.",teach:"Keep your word, and care for the people who depend on you.",src:"Ramayana",bg:"forest"},
 narada:{who:"Narada is a wandering sage and musician. He travels between heaven and earth with his veena, a stringed instrument, carrying news and songs.",moment:"He told the poet Valmiki the story of Rama, and Valmiki turned it into the Ramayana.",teach:"Listen first, practise every day, and share what you make.",src:"Ramayana and Puranas",bg:"river"},
 patanjali:{who:"Patanjali is the sage credited with the Yoga Sutras, a short classic text on yoga written about 2,000 years ago.",moment:"He described yoga as calming the restless movements of the mind, through steady practice and letting go.",teach:"Steady, easy practice of body and breath calms the mind.",src:"Yoga Sutras",bg:"scroll"},
 savitri:{who:"Savitri is a princess in the Mahabharata, India’s great epic, famous for her intelligence and loyalty.",moment:"When Yama, the god of death, came for her husband, she followed him and spoke so wisely that he gave her husband back.",teach:"Choose with your heart, then stay calm and steady when it gets hard.",src:"Mahabharata",bg:"forest"},
 saraswati:{who:"Saraswati is the goddess of knowledge, speech, music and learning. She is shown holding a veena and a book, with a white swan.",moment:"On the festival of Vasant Panchami, students honour her, and many children write their very first letters.",teach:"Learn a little every day, and learn to tell true from false.",src:"Vedas and Puranas",bg:"river"},
 arjuna:{who:"Arjuna is the great archer of the Mahabharata and one of the five Pandava brothers.",moment:"Before a great battle he froze with doubt. Krishna’s answer to him is the Bhagavad Gita, one of India’s best-known texts.",teach:"Focus on one target, and do your work without fear of the result.",src:"Mahabharata",bg:"hills"},
 dhruva:{who:"Dhruva is a young prince from the Puranas, ancient story collections, famous for his determination.",moment:"Hurt by rejection at the age of five, he meditated in the forest until he became the pole star.",teach:"Steady practice can turn pain into something unshakable.",src:"Vishnu and Bhagavata Puranas",bg:"stars"}
};
// English meaning shown next to each Sanskrit name
const EN={
 "Vayu Prana":"Breath of the wind","Gada":"The mace","Smarana":"Remembering your strength","Langhana":"The great leap","Sanjeevani":"The life-giving herb",
 "Sthira Sukha":"Steady and easy","Pranayama":"Breath control","Abhyasa":"Steady practice","Pratyahara":"Turning the senses inward","Samadhi":"Complete absorption",
 "Vachan":"A promise kept","Kodanda":"Rama’s bow","Maitri":"Friendship","Setu":"The bridge","Maryada":"Doing what is right",
 "Svayamvara":"Choosing for yourself","Shraddha":"Trust","Sahana":"Patience","Vak":"Wise speech","Saubhagya":"Lasting good fortune",
 "Akshara":"The first letter","Pustaka":"The book","Smriti":"Memory","Viveka":"Telling true from false","Vidya":"Knowledge",
 "Lakshya":"The target","Gandiva":"Arjuna’s bow","Ekagrata":"One-pointed focus","Savyasachi":"Skilled with both hands","Karma Yoga":"The path of action",
 "Shruti":"Listening","Veena":"The veena","Tala":"Rhythm","Raga":"Melody and mood","Katha":"Story",
 "Sankalpa":"Resolve","Japa":"Repeating a mantra","Dhriti":"Steadiness","Dhyana":"Meditation","Achala":"Unmoving",
 "Prana and Nada":"Breath and sound","Seva":"Service","Sangat":"Making music together","Triveni Sangam":"Where three rivers meet",
 "Bālak":"Beginner","Shishya":"Student","Sādhaka":"Practitioner","Yodha":"Warrior","Āchārya":"Teacher","Purushottam":"The highest of people"
};
const GLOSSARY=[
 ["How the app works",[
  ["Abhyasa","Sanskrit for steady practice over a long time. The name of this app."],
  ["Realm","One of five areas of life: Body, Bonds, Craft, Joy and Peace."],
  ["Path","Something you want to grow inside a realm, such as Strength or Music. You focus on up to 5 at a time."],
  ["Guide","A figure from Indian stories who walks a path with you and shares lines and stories."],
  ["Growth","Points you earn by doing tasks. They fill a path’s ring."],
  ["Trial","A real-life test that appears when a ring is full. Passing it earns the next skill."],
  ["Skill","One of 5 levels on each path. Each skill gives an effect, and some give a gift for your hero."],
  ["Bridge","A bonus that opens when two paths both pass 2 trials. It comes with a story and a shared task."],
  ["Streak","How many days in a row you’ve done at least one task. Shown as a diya, an oil lamp."],
  ["Streak shield","Covers one missed day. Some skills give you shields each week."],
  ["Companion","Each day one guide travels. Close your day and they bring back a story chapter and a charm."],
  ["Charm","A keepsake from your companion’s journey."],
  ["Sandhya","The evening close: how today felt and one line about it. The word means twilight."]]],
 ["Indian words and texts",[
  ["Purusharthas","The four aims of life in Hindu thought: dharma (duty), artha (prosperity), kama (joy) and moksha (freedom). Abhyasa’s realms are based on them."],
  ["Vedas","The oldest sacred texts of Hinduism, more than 3,000 years old."],
  ["Upanishads","Philosophical texts that explore the self and reality."],
  ["Ramayana","The epic of Prince Rama, his exile, and the rescue of his wife Sita."],
  ["Mahabharata","A vast epic about a family war. It contains the Bhagavad Gita."],
  ["Bhagavad Gita","Krishna’s advice to Arjuna before battle, about duty and action."],
  ["Puranas","Ancient collections of stories about gods, sages and kings."],
  ["Avatar","A god taking a form on earth, as Vishnu does as Rama or Krishna."],
  ["Vanara","Forest beings with monkey forms in the Ramayana, like Hanuman."],
  ["Ritu","One of six Indian seasons, each about two months long."],
  ["Panchang","The Hindu calendar, based on the moon and sun."],
  ["Purnima · Amavasya","Full moon and new moon days, often kept as special days."],
  ["Ekadashi","The eleventh day of each half of the lunar month, often a day of fasting."],
  ["Raga · Tala","In Indian music, a raga is a melody with a mood, and tala is the rhythm cycle."],
  ["Mantra · Mala","A mantra is a word or phrase repeated in meditation. A mala is a string of 108 beads for counting."]]]
];
// First-time tips, one at a time per tab
const TIPS={
 today:[["rings","The rings show today’s practice, one colour per path. Finish a task and its ring fills. Close them all to complete your day."],["comp","Swipe the cards under the rings: your companion, check-in, today’s story and suggestions. Tap a task to open its guide."],["swap","A task doesn’t fit? Tap ⇄ and say why. Abhyasa learns from it. Did something else instead? Log it below the list."],["streak","The diya at the top is your streak. One task a day keeps it lit."],["eve","In the evening, tap “Close your day”: how it felt, and one line. Tomorrow morning brings the next chapter."]],
 journey:[["focus","Each card is a path: progress to the next skill, and your last 7 days. Tap one for its skills. “Manage focus” adds or pauses paths."],["tree","Use the tabs at the top for the skill tree, bridge stories and the Indian calendar."]],
 hero:[["hero","This is your hero. It changes as you pass trials and earn gifts. Tap it to hear from a guide."],["gloss","Stats shows your week and month as charts. The glossary and backup are under More."]]
};

/* ================= explainer pack ================= */
// Each pack is a short swipe deck. A card has either a scene (bg + chars, as in STORIES) or an icon (ico), plus kick and cap.
const LEARN=[
 {id:"tour",t:"How Abhyasa works",sub:"The daily journey in 8 cards",ico:"path",cards:[
  {ico:"sun",kick:"1 · The idea",cap:"<b>Abhyasa</b> is Sanskrit for steady practice over a long time. You pick up to 5 things to grow in your life, and each comes with a <b>guide</b> from Indian stories."},
  {ico:"moon",kick:"2 · Every morning",cap:"A short deck of cards greets you: your <b>streak</b>, what your companion found overnight, and today in the Indian calendar."},
  {ico:"focus",kick:"3 · During the day",cap:"The <b>rings</b> on Today show your practice. Tasks fit your time, energy and kit. Tap one for its guide, or start <b>focus mode</b>. Doesn’t fit? <b>Swap</b> it and say why."},
  {ico:"trial",kick:"4 · Growth and trials",cap:"Tasks add <b>growth</b> to a path. When a path is full, a <b>trial</b> appears: a real-life test. Pass it to earn a <b>skill</b>, and sometimes a gift for your hero."},
  {ico:"moon",kick:"5 · Every evening",cap:"<b>Close your day</b>: how it felt, and one line. Your <b>companion</b> sets out on a journey and returns the next morning with a story chapter and a <b>charm</b>."},
  {ico:"tree",kick:"6 · Bridges",cap:"When two paths both grow, a <b>bridge</b> opens between them, with a bonus and a short animated story of how their guides met."},
  {ico:"path",kick:"7 · Every Sunday",cap:"A two-minute <b>weekly review</b>: your time per path, your best day, and which path to focus on next week."},
  {ico:"hero",kick:"8 · Your hero",cap:"Your hero grows through six ranks, from <b>Bālak</b> (beginner) to <b>Purushottam</b> (the highest of people). Today is your practice, Journey your paths, Hero your story."}]},
 {id:"ramayana",t:"The Ramayana in 2 minutes",sub:"Rama, Sita and Hanuman",ico:"bonds",cards:[
  {bg:"city",chars:[["rama",120,50,1,"rise"]],kick:"1 · The prince",cap:"Rama is the eldest son of King Dasharatha of Ayodhya. He wins the hand of Princess <b>Sita</b> by lifting and breaking the great bow of the god Shiva."},
  {bg:"forest",chars:[["rama",120,55,.9,"float"]],kick:"2 · The exile",cap:"On the eve of his coronation, his stepmother Kaikeyi calls in two promises from the king: her son <b>Bharata</b> will rule, and Rama must live 14 years in the forest. Rama goes without anger, with Sita and his brother <b>Lakshmana</b>."},
  {bg:"stars",chars:[],kick:"3 · The abduction",cap:"In the forest, <b>Ravana</b>, the ten-headed king of Lanka, carries Sita away to his island kingdom."},
  {bg:"sea",chars:[["hanuman",120,55,.95,"float"]],kick:"4 · Hanuman’s leap",cap:"Rama makes friends with the <b>vanaras</b>, forest people with monkey forms. Their hero <b>Hanuman</b> leaps across the ocean, finds Sita, and brings back hope."},
  {bg:"bridge",chars:[["rama",120,50,.9,"rise"]],kick:"5 · The bridge and the battle",cap:"The army builds a bridge of stones to Lanka, often called <b>Ram Setu</b>. After a long battle, Rama defeats Ravana."},
  {bg:"lamps",chars:[["rama",120,50,1,"float"]],kick:"6 · The return",cap:"Rama comes home and Ayodhya lights rows of lamps to welcome him. Many Hindus remember that night at <b>Diwali</b>."},
  {ico:"learn",kick:"7 · Why it matters",cap:"The Ramayana has been told for over 2,000 years in hundreds of versions: Valmiki’s Sanskrit poem, Tulsidas’ Hindi <i>Ramcharitmanas</i>, Thailand’s <i>Ramakien</i> and many more. In Abhyasa, Rama guides <b>Family</b> and Hanuman guides <b>Strength</b>."}]},
 {id:"mahabharata",t:"The Mahabharata in 2 minutes",sub:"Arjuna, Krishna and the Gita",ico:"focus",cards:[
  {ico:"learn",kick:"1 · The great epic",cap:"The <b>Mahabharata</b> is one of the longest poems in the world, traditionally credited to the sage <b>Vyasa</b>. It tells of a royal family split in two: the five <b>Pandava</b> brothers and their hundred cousins, the <b>Kauravas</b>."},
  {bg:"city",chars:[["arjuna",120,50,.95,"rise"]],kick:"2 · Five brothers",cap:"Yudhishthira, known for truth; Bhima, for strength; <b>Arjuna</b>, the great archer; and the twins Nakula and Sahadeva. Together they share one wife, the fierce and brilliant <b>Draupadi</b>."},
  {bg:"forest",chars:[],kick:"3 · The dice game",cap:"Cheated in a game of dice, the Pandavas lose their kingdom and spend 13 years in exile. Many stories happen in these years, including the tale of <b>Savitri</b>."},
  {bg:"hills",chars:[["arjuna",120,55,.9,"float"]],kick:"4 · The Gita",cap:"At <b>Kurukshetra</b>, about to fight his own family, Arjuna freezes. His charioteer <b>Krishna</b> answers his doubt. That conversation is the <b>Bhagavad Gita</b>: do your duty well, without clinging to the result."},
  {bg:"glow",chars:[],kick:"5 · The war",cap:"An 18-day war follows. The Pandavas win, at a terrible cost. The epic doesn’t hide the grey areas: almost everyone makes hard and costly choices."},
  {ico:"focus",kick:"6 · In Abhyasa",cap:"Arjuna guides <b>Career focus</b>, and Savitri guides <b>Partner and love</b>. Daily stories from the epic include Ekalavya, Karna and the bird’s eye."}]},
 {id:"texts",t:"The old texts",sub:"Vedas, Upanishads, Puranas and more",ico:"learn",cards:[
  {ico:"sun",kick:"1 · The Vedas",cap:"The oldest sacred texts of Hinduism: hymns, rituals and chants passed down by memory for thousands of years. The <b>Rigveda</b> is the oldest."},
  {ico:"calm",kick:"2 · The Upanishads",cap:"Philosophical dialogues about the self (<b>atman</b>) and ultimate reality (<b>brahman</b>). Here you meet bold questioners like the boy <b>Nachiketa</b> and the philosopher <b>Gargi</b>."},
  {ico:"bonds",kick:"3 · The epics",cap:"The <b>Ramayana</b> and the <b>Mahabharata</b>, called <i>itihasa</i>, “so it was”. Long, human stories of duty, love and war."},
  {ico:"music",kick:"4 · The Puranas",cap:"Large collections of stories about the gods Vishnu, Shiva and the Goddess, their avatars, and sages and devotees like <b>Dhruva</b>, <b>Prahlada</b> and <b>Narada</b>."},
  {ico:"flex",kick:"5 · Yoga Sutras and the Gita",cap:"<b>Patanjali’s Yoga Sutras</b>: 196 short lines on calming the mind. The <b>Bhagavad Gita</b>: 700 verses within the Mahabharata. Both are read worldwide today."},
  {ico:"tree",kick:"6 · Many versions",cap:"These are living traditions, told differently across regions, languages and centuries. Abhyasa keeps retellings short, labels the source, and marks folk tales as folk tales."}]},
 {id:"living",t:"Living the journey",sub:"Using the stories in daily life",ico:"sun",cards:[
  {ico:"hero",kick:"1 · Mirrors, not rules",cap:"Each guide shows one quality to practise: Hanuman’s strength in service, Rama’s kept promises, Narada’s listening, Dhruva’s steadiness. Ask: <i>what would my guide do today?</i>"},
  {ico:"love",kick:"2 · No belief needed",cap:"You can enjoy these stories the way people read Greek myths or fables. For about a billion people they are also sacred, so Abhyasa retells them with care and respect."},
  {ico:"sun",kick:"3 · One line a day",cap:"Read your guide’s line in the morning. Notice one moment today when it fits. That small habit turns stories into practice."},
  {ico:"calm",kick:"4 · Small and steady",cap:"The Yoga Sutras say practice takes root when it is kept up for a long time, without a break, and with care. One task a day beats a heroic week followed by nothing."},
  {ico:"path",kick:"5 · Make it yours",cap:"Swap what doesn’t fit, log what you did instead, pause paths, and use the Sunday review. The journey is yours, and the guides walk beside you."}]}
];
const WHO=[
 ["Your guides",[["Hanuman","हनुमान","Strength. Vanara hero, son of the wind, Rama’s devoted friend.","body"],["Patanjali","पतञ्जलि","Flexibility and breath. Sage of the Yoga Sutras.","flex"],["Rama","राम","Family. Prince of Ayodhya and ideal of duty.","bonds"],["Savitri","सावित्री","Partner and love. Princess who won her husband back from Death.","love"],["Saraswati","सरस्वती","Learning. Goddess of knowledge, speech and music.","learn"],["Arjuna","अर्जुन","Career focus. Great archer of the Mahabharata.","focus"],["Narada","नारद","Music. Wandering sage with the veena.","music"],["Dhruva","ध्रुव","Meditation. Boy whose resolve made him the pole star.","calm"]]],
 ["Gods and goddesses",[["Vishnu","विष्णु","The preserver. Comes to earth as avatars, including Rama and Krishna."],["Shiva","शिव","The great yogi and transformer, also Nataraja, lord of dance."],["Brahma","ब्रह्मा","The creator."],["Lakshmi","लक्ष्मी","Goddess of prosperity and good fortune, Vishnu’s consort."],["Durga","दुर्गा","Warrior goddess who defeats the buffalo demon Mahishasura."],["Ganesha","गणेश","Elephant-headed remover of obstacles, patron of beginnings."],["Krishna","कृष्ण","Avatar of Vishnu, Arjuna’s friend and teacher in the Gita."],["Surya · Vayu","सूर्य · वायु","The sun god, Hanuman’s teacher, and the wind god, his father."],["Yama","यम","God of death and justice."]]],
 ["People of the Ramayana",[["Sita","सीता","Rama’s wife, princess of Mithila, known for courage and loyalty."],["Lakshmana","लक्ष्मण","Rama’s brother, who follows him into exile."],["Bharata","भरत","Rama’s brother, who rules in his name using his sandals."],["Sugriva","सुग्रीव","Vanara king of Kishkindha and Rama’s ally."],["Jambavan","जाम्बवान","Wise bear king who reminds Hanuman of his strength."],["Ravana","रावण","Ten-headed king of Lanka, a great scholar undone by pride."],["Shabari","शबरी","Old devotee who waited years to welcome Rama."],["Valmiki","वाल्मीकि","Poet traditionally credited with the Ramayana."]]],
 ["People of the Mahabharata",[["Draupadi","द्रौपदी","Fierce, brilliant wife of the five Pandavas."],["Karna","कर्ण","Generous, tragic warrior on the Kaurava side."],["Bhishma","भीष्म","Elder of the family, bound by an unbreakable vow."],["Drona","द्रोण","Teacher of archery to both sides of the family."],["Ekalavya","एकलव्य","Forest archer who taught himself in front of a clay image of Drona."],["Vyasa","व्यास","Sage traditionally credited with the Mahabharata."]]],
 ["Sages and seekers",[["Nachiketa","नचिकेता","Boy who questioned Death in the Katha Upanishad."],["Gargi","गार्गी","Philosopher who questioned the sage Yajnavalkya."],["Vishwamitra","विश्वामित्र","King who became a sage after many failures and fresh starts."],["Prahlada","प्रह्लाद","Child devotee whose faith survived every danger."]]]
];

/* ================= feedback ================= */
// Put your email here to let testers send feedback by email. Leave empty to offer only Share and Copy.
const FEEDBACK_EMAIL="";

/* ================= task library, batch 2 (v1.11) ================= */
// Added after the main definitions so each path's pool grows without touching the originals.
PATHS.body.pool.push(
 X("Core: hollow body and dead bugs",12,{tags:"strength|climb|any",en:2,load:["mobility"],g:["Dead bugs, 3 × 10 slow, lower back pressed down","Hollow body hold, 3 × 20 sec","Side plank, 30 sec per side"],tool:{type:"intervals",work:30,rest:20,rounds:6}}),
 X("Pull-up practice",15,{tags:"strength|climb",lo:1,needs:["pullup"],place:"home",en:3,load:["pull","grip"],g:["Dead hang, 20 sec, to warm up","Sets of 2–5 pull-ups, or slow negatives if you can’t do one yet","Rest 2 min between sets, 5 sets"],tool:{type:"timer",sec:120,label:"Rest timer"}}),
 X("Band work for climbers",12,{tags:"climb|strength",needs:["bands"],place:"any",en:1,load:["push","mobility"],rec:["pull","grip"],g:["Band chest press, 2 × 15","Band pull-aparts, 2 × 15","Finger extensions with a rubber band, 2 × 20"],tool:{type:"timer",sec:720}}),
 X("Bouldering: technique laps",45,{tags:"climb",lo:1,needs:["wall"],place:"wall",en:2,load:["pull","grip"],g:["Pick 6 problems two grades below your max","Climb each 3 times: quiet feet, straight arms, smooth hips","Rest 2 min between laps"]}),
 X("Swim: kick sets",20,{tags:"swim",needs:["pool"],place:"pool",en:2,load:["legs","cardio"],g:["Warm up 100 m easy","6 × 25 m kick with a board, 30 sec rest","Cool down 100 m easy"],tool:{type:"intervals",work:60,rest:30,rounds:6}}),
 X("Swim: breathe every 3 strokes",25,{tags:"swim",lo:1,needs:["pool"],place:"pool",en:2,load:["cardio","pull"],g:["Warm up 100 m","8 × 50 m breathing every third stroke, 20 sec rest","Exhale fully under water before you turn to breathe"],tool:{type:"intervals",work:75,rest:20,rounds:8}}),
 X("Recovery swim",20,{tags:"swim",needs:["pool"],place:"pool",en:1,load:["cardio"],rec:["legs","pull"],g:["20 minutes at an easy pace","Mix strokes if you like","Long, relaxed glides"],tool:{type:"timer",sec:1200}}),
 X("Stairs or hill walk",20,{tags:"walk|run",place:"out",en:2,load:["legs","cardio"],travel:true,g:["Find stairs or a hill","Walk up at a strong pace, walk down slowly","Repeat for 20 minutes"],tool:{type:"timer",sec:1200}}),
 X("Run drills and strides",20,{tags:"run",lo:1,place:"out",en:2,load:["legs","cardio"],g:["5 min easy jog","High knees, butt kicks and skips, 2 × 20 m each","4 × 80 m strides at 80% effort, walk back"],tool:{type:"timer",sec:1200}}),
 X("Ankle and balance work",8,{tags:"run|walk|any",en:1,load:["mobility"],g:["Stand on one leg, 30 sec each, then with eyes closed","20 slow calf raises per leg","Ankle circles, 10 each way"],tool:{type:"timer",sec:480}}),
 X("Towel grip hangs",10,{tags:"climb|strength",lo:2,needs:["pullup"],place:"home",en:3,load:["grip"],g:["Hang a towel over the bar","Hold for 10–20 sec, 5 times","Stop at any finger or elbow pain"],tool:{type:"intervals",work:15,rest:45,rounds:5}})
);
PATHS.flex.pool.push(
 X("Morning wake-up flow",7,{tags:"yoga|mobility|any",en:1,load:["mobility"],g:["Cat-cow, 8 rounds","Downward dog, pedal the feet, 1 min","Low lunge each side, 45 sec","Stand tall and take 5 long breaths"],tool:{type:"timer",sec:420}}),
 X("Bhramari, humming bee breath",5,{tags:"breath",en:1,quiet:true,g:["Sit comfortably, eyes closed","Breathe in through the nose","Breathe out with a soft humming sound, like a bee","Repeat 7 times and notice the quiet after"],tool:{type:"counter",target:7,label:"breaths"}}),
 X("Kapalabhati, gentle",5,{tags:"breath",lo:1,en:2,g:["Sit tall. Short, active breaths out through the nose, letting the breath in happen by itself","3 rounds of 20 breaths, rest between","Skip it if you’re pregnant, have high blood pressure or feel dizzy"],tool:{type:"counter",target:3,label:"rounds"}}),
 X("Wrist and forearm care",6,{tags:"posture|mobility",en:1,load:["mobility"],rec:["grip"],g:["Wrist circles, 10 each way","Prayer stretch, 30 sec","Reverse prayer, 30 sec","Make fists and spread fingers, 20 times"],tool:{type:"timer",sec:360}}),
 X("Thoracic opener over a towel",8,{tags:"posture|mobility",place:"home",en:1,load:["mobility"],g:["Roll a towel and lie on it across your upper back","Arms overhead, breathe slowly, 2 min","Move the towel a little lower, 2 more min","Open book stretch, 5 per side"],tool:{type:"timer",sec:480}}),
 X("Couch stretch for tight hips",8,{tags:"mobility|posture",place:"home",en:1,load:["mobility"],rec:["legs"],g:["Back knee on a cushion near a wall or sofa, shin up against it","Squeeze the glute of that leg, stay tall","90 sec per side, twice"],tool:{type:"timer",sec:480}}),
 X("Yoga for the lower back",15,{tags:"yoga|posture",place:"home",en:1,load:["mobility"],g:["Knees to chest, rock gently, 1 min","Supine twist, 1 min per side","Sphinx pose, 2 min","Child’s pose, 2 min"],tool:{type:"timer",sec:900}}),
 X("Warrior three holds",8,{tags:"yoga",lo:1,en:2,load:["legs","mobility"],g:["Hinge forward on one leg, arms forward","Hold 20 sec per side, 3 rounds","Keep hips level, eyes on one point"],tool:{type:"intervals",work:20,rest:10,rounds:6}}),
 X("Hourly posture check",3,{tags:"posture",en:1,g:["Each hour today: stand, roll your shoulders back, look far away for 20 sec","Tap the counter each time"],tool:{type:"counter",target:6,label:"checks"}}),
 X("Supported shavasana",10,{tags:"yoga|breath",place:"home",en:1,quiet:true,g:["Lie down with a cushion under your knees","Let the floor hold you","Breathe slowly and scan the body from feet to head"],tool:{type:"timer",sec:600}}),
 X("Count 21 breaths",5,{tags:"breath|any",en:1,g:["Count each breath out, from 1 to 21","Lost count? Start again at 1, kindly","That restarting is the practice"],tool:{type:"counter",target:21,label:"breaths"}})
);
PATHS.bonds.pool.push(
 X("Send your parents a short video",5,{tags:"parents|abroad",en:1,g:["30 seconds of your day: your street, your meal, your view","Add one line about how you are"]}),
 X("Ask your parents about their health, properly",15,{tags:"parents",lo:1,en:1,call:true,g:["Ask about sleep, medicines and check-ups","Listen without fixing","Offer one concrete help, like booking an appointment"]}),
 X("Book the next family call",3,{tags:"abroad|family",en:1,g:["Pick a day and time that suits both time zones","Put it in everyone’s calendar"]}),
 X("Learn 5 words in your mother tongue",10,{tags:"roots",en:1,g:["Pick words you’d use with family: love, home, tired, proud, food","Say each aloud 3 times","Use one on your next call"]}),
 X("Listen to a song from your region",10,{tags:"roots",en:1,g:["A bhajan, a folk song or an old film song your family loves","Look up the meaning of one line","Send it to someone at home"]}),
 X("Share one old family photo",5,{tags:"family|parents",en:1,g:["Find an old photo on your phone or in an album","Send it with a question: who took this, and when?"]}),
 X("Write down one family recipe",20,{tags:"roots|family",lo:1,en:1,g:["Ask the person who makes it best","Write the steps as they speak, including the “a little of this”","Save it somewhere you’ll keep"]}),
 X("Check in on a friend having a hard time",10,{tags:"friends",en:1,g:["A short message: “Thinking of you. How are you really?”","No advice unless they ask"]}),
 X("Invite someone for chai or coffee",5,{tags:"friends",en:1,g:["Name a day and a place","Keep it simple: one hour is enough"]}),
 X("Thank an elder for something specific",10,{lo:1,en:1,g:["Name one thing they did that shaped you","Tell them by call, voice note or letter"]}),
 X("Plan your next visit home",20,{tags:"abroad",lo:2,en:1,g:["Look at dates and prices","Ask family what would make the visit special","Book it, or set a date to decide"]}),
 X("Draw a family tree with an elder",30,{tags:"roots|parents",lo:2,en:1,call:true,g:["Start with grandparents on both sides","Ask one story for each name","Keep the notes and photos together"]})
);
PATHS.love.pool.push(
 X("Ask about their week, then just listen",15,{tags:"partner",en:1,g:["Ask: what was the hardest and the best part of your week?","Don’t fix anything","Repeat back one thing you heard"]}),
 X("Make them tea, unasked",5,{tags:"partner",en:1,g:["Just the way they like it","No reason needed"]}),
 X("Write a short note",5,{tags:"partner",en:1,g:["Two lines on paper, left somewhere they’ll find it","Something specific you noticed this week"]}),
 X("Ask what makes them feel loved",15,{tags:"partner",lo:1,en:1,g:["Ask: when did you feel most loved by me recently?","Listen for the pattern: words, time, help, touch or small gifts","Do more of that this week"]}),
 X("Tell the story of how you met",10,{tags:"partner",en:1,g:["Each of you tells it from your side","Notice the details you remember differently"]}),
 X("Set one shared goal for the month",20,{tags:"partner",lo:2,en:2,g:["Something small and fun: a trip, a skill, a habit","Write it down where you both see it"]}),
 X("Update your dating profile honestly",20,{tags:"dating",en:1,g:["Use a recent photo that looks like you today","Write one line about what you love doing, not a list","Say what you’re looking for, kindly and clearly"]}),
 X("Message one match with a real question",5,{tags:"dating",en:1,g:["Ask about something in their profile","Skip “hey”: ask what got them into it"]}),
 X("Go somewhere new on your own",45,{tags:"selflove|dating",lo:1,en:2,g:["A café, a museum, a class or a walk somewhere new","Notice what you enjoy when no one else decides"]}),
 X("Three things you like about yourself",5,{tags:"selflove",en:1,quiet:true,g:["Write them down","Not achievements: qualities, like patience or humour"]}),
 X("Set one boundary, kindly",10,{tags:"selflove|partner",lo:2,en:2,g:["Pick one small thing that drains you","Say it simply: “I need… because…”","Keep it short and warm"]})
);
PATHS.learn.pool.push(
 X("Read 10 pages before bed",15,{tags:"reading",en:1,quiet:true,g:["A paper book or e-reader, not your phone","Stop at 10 pages, even if you want more"],tool:{type:"timer",sec:900}}),
 X("Summarise a chapter in 5 bullets",15,{tags:"reading|course",lo:1,en:2,g:["Close the book first","Write 5 bullets from memory","Then check what you missed"]}),
 X("Watch one lecture and take notes",30,{tags:"course",en:2,g:["Normal speed, not 2×","Pause every 10 min and write the main idea","End with one question you still have"],tool:{type:"timer",sec:1800}}),
 X("Practise problems, not just reading",30,{tags:"course|tech",lo:1,en:3,g:["Do 3–5 exercises without looking at the answer","Mark where you got stuck","That’s tomorrow’s study topic"],tool:{type:"timer",sec:1800}}),
 X("Speak for 2 minutes in the language",5,{tags:"language",lo:1,en:2,g:["Record yourself describing your day","Listen back and note 2 missing words","Look them up"],tool:{type:"timer",sec:120}}),
 X("Watch a short video in the language",15,{tags:"language",en:1,g:["Subtitles in the same language, not English","Pause and repeat one sentence aloud"]}),
 X("Write 5 sentences in the language",10,{tags:"language",lo:1,en:2,g:["About today: what you did, ate and felt","Check them with a dictionary or a friend"]}),
 X("Learn one tool trick",10,{tags:"tech",en:1,g:["One shortcut, command or feature you don’t use yet","Use it 5 times today"]}),
 X("Read one paper abstract or tech article",15,{tags:"tech",lo:1,en:2,g:["Pick something in your field from this month","Write down one idea you could try at work"]}),
 X("Run a small AI experiment",30,{tags:"tech",lo:1,en:2,g:["Take one real task from your work","Try two different prompts or tools on it","Note which worked better, and why"]}),
 X("Ask a question in a community",10,{lo:2,en:2,g:["A forum, class group or colleague","Show what you tried first"]}),
 X("Plan next week’s learning",5,{en:1,g:["Three lines: what, when, and how you’ll know you learned it"]})
);
PATHS.focus.pool.push(
 X("Notifications off for the morning",3,{tags:"habits",en:1,g:["Turn on Focus or Do Not Disturb until noon","Close chat and email apps"]}),
 X("Two focus sprints",55,{tags:"deepwork",lo:1,en:3,g:["One task, written down","25 min work, 5 min break, twice","Stand up and move in the breaks"],tool:{type:"intervals",work:1500,rest:300,rounds:2}}),
 X("Clear your desk and desktop",10,{tags:"habits",en:1,g:["Clear everything off the desk except today’s things","Close every tab you don’t need","Empty your downloads folder"]}),
 X("Write a one-page plan",25,{tags:"deepwork|side",lo:1,en:2,g:["Goal, why it matters, three steps, first step this week","Keep it to one page"]}),
 X("Message someone in your field",10,{tags:"career",en:1,g:["Someone you admire or worked with","Ask one specific question, or share something useful"]}),
 X("Read one industry article",15,{tags:"career",en:1,g:["Pick from a source you trust","Note one idea you could use at work"]}),
 X("Explain your work in 60 seconds",10,{tags:"career",lo:1,en:2,g:["What you do, for whom, and one recent result","Say it aloud, then trim it","Use it next time someone asks"],tool:{type:"timer",sec:60}}),
 X("Fix one small annoying thing",15,{tags:"side|deepwork",en:2,g:["A bug, a form or a messy file you keep putting off","Finish it completely"]}),
 X("Ship a tiny update",30,{tags:"side",lo:2,en:3,g:["The smallest improvement users would notice","Push it today"]}),
 X("Shutdown routine",5,{tags:"habits",en:1,g:["Write down where you stopped","List tomorrow’s first task","Close the laptop and say “done for today”"]}),
 X("Block focus time in your calendar",5,{tags:"habits|deepwork",en:1,g:["Two blocks of 90 min this week","Name them after the task, not “focus”"]}),
 X("Batch your email",20,{tags:"habits",lo:1,en:2,g:["One slot today for all email","Reply, schedule or archive each one","Close it when the slot ends"],tool:{type:"timer",sec:1200}})
);
PATHS.music.pool.push(
 X("Travis picking basics",15,{tags:"guitar",lo:2,en:2,g:["Thumb alternates between two bass strings","Add the index finger on the off-beats","Start at 60 bpm on a C chord"],tool:{type:"metronome",bpm:60}}),
 X("Barre chord practice",15,{tags:"guitar",lo:1,hi:3,en:2,g:["F at the first fret, then Bm at the second","Press with the side of your index finger","Play each string one by one, fix the muted ones"],tool:{type:"timer",sec:900}}),
 X("Learn the chords of one Bollywood song",20,{tags:"guitar|keys",lo:1,hi:3,songs:true,g:["Search the song name plus “chords”","Learn the chorus first","Strum it along with the recording"]}),
 X("Learn one new chord",10,{tags:"guitar|keys",hi:2,en:1,g:["Pick a chord from a song you like","Switch between it and a chord you know, 20 times"]}),
 X("Play a song slower than you like",15,{lo:1,en:1,g:["Set the metronome 20 bpm below the real tempo","Play it with no mistakes","Then go up 5 bpm"],tool:{type:"metronome",bpm:60}}),
 X("Clean up one tricky bar",10,{lo:2,en:2,g:["Find the bar where you always slip","Loop just that bar 10 times slowly","Then play the bars before and after it"],tool:{type:"metronome",bpm:55}}),
 X("Hold Sa with a drone",10,{tags:"singing",en:1,g:["Play a tanpura drone","Sing a long, steady Sa, 5 times","Then Pa, then the upper Sa"],tool:{type:"timer",sec:600}}),
 X("Breathing for singers",6,{tags:"singing",en:1,g:["Breathe low into your belly, shoulders still","Let the air out on a long “ssss” for as long as you can","Try to beat your time each round"],tool:{type:"breath",in:4,hold:0,out:12}}),
 X("Count and clap in 3 and 4",10,{tags:"theory|any",en:1,g:["Clap on the first beat, tap on the others","4 bars in 4/4, then 4 bars in 3/4","Now switch without stopping"],tool:{type:"metronome",bpm:80}}),
 X("Transcribe a melody by ear",20,{tags:"theory",lo:2,en:2,g:["A short, simple tune you know well","Find the first note on your instrument","Work it out note by note, then write it down"]}),
 X("Write four lines of lyrics",15,{lo:2,en:2,g:["About something that happened this week","Make lines 2 and 4 rhyme","Hum a tune for them"]}),
 X("A raga phrase: Yaman",15,{tags:"singing|guitar|keys",lo:2,en:2,raga:true,g:["Yaman uses a sharp Ma (the raised fourth)","Ascent: Ni Re Ga Ma Dha Ni Sa","Play or sing it slowly over a drone"]})
);
PATHS.calm.pool.push(
 X("Five-minute morning sit",5,{tags:"silent|any",en:1,g:["Before your phone","Sit, feel the breath, nothing else"],tool:{type:"timer",sec:300}}),
 X("Loving-kindness for one person",10,{tags:"guided|gratitude",en:1,g:["Picture someone you love","Silently wish: may you be well, may you be happy, may you be at peace","Then the same wish for yourself"],tool:{type:"timer",sec:600}}),
 X("Om, 21 times",6,{tags:"mantra",en:1,g:["Sit tall","Chant a long Om on each breath out","Feel the vibration in your chest"],tool:{type:"counter",target:21,label:"chants"}}),
 X("Gayatri mantra, 3 times with meaning",8,{tags:"mantra",lo:1,en:1,g:["Read the meaning first: a prayer for a clear, awakened mind","Recite it slowly three times","Sit quietly for one minute after"],tool:{type:"counter",target:3,label:"recitations"}}),
 X("One worry, one action",10,{tags:"gratitude|any",en:1,g:["Write down one worry","Write the smallest action that would help","Do it, or schedule it"]}),
 X("Mindful tea or coffee",5,{tags:"any",en:1,g:["No phone","Notice the warmth, smell and taste","Finish the cup before you do anything else"]}),
 X("Sit with sounds",10,{tags:"silent",en:1,g:["Eyes closed","Notice every sound, near and far, without naming it","Let them come and go"],tool:{type:"timer",sec:600}}),
 X("Write a thank-you",10,{tags:"gratitude",en:1,g:["To someone who helped you, recently or long ago","Be specific about what changed for you"]}),
 X("Breath awareness on the way",10,{tags:"any",place:"any",en:1,travel:true,g:["On your commute or a walk","Count 10 breaths, then start again","Earphones out"]}),
 X("Evening review: three good things",5,{tags:"gratitude",en:1,quiet:true,g:["Write three things that went well today","Add why each one happened"]}),
 X("Yoga nidra",20,{tags:"guided",lo:1,en:1,quiet:true,g:["Lie down, use a guided recording you trust","Stay awake and follow the voice","Rest a minute before getting up"],tool:{type:"timer",sec:1200}}),
 X("Thirty-minute sit",30,{tags:"silent",lo:3,en:2,g:["Same as your usual sit, just longer","Don’t move for the first 15 minutes"],tool:{type:"timer",sec:1800}})
);

/* ================= new paths, batch 1 (v1.12): Friendship, Money, Courage, Wisdom ================= */
Object.assign(PATHS,{
 friend:{name:"Friendship",realm:"bonds",about:"Close friends, new friends, community",hero:"Krishna",heroDev:"कृष्ण",c:"var(--friend)",
  q:"How are your friendships?",
  levels:["I feel lonely most weeks","I have friends but rarely meet","I see friends regularly","My friendships are deep and active"],
  tags:[["close","Close friends"],["new","Making new friends"],["local","Friends nearby"],["far","Friends far away"]],
  skills:[
   {n:"Sakha",d:"सखा",s:"Krishna calls Arjuna his sakha: a friend who stands beside you as an equal.",perk:"swap"},
   {n:"Sudarshana",d:"सुदर्शन",s:"Krishna’s spinning discus: it returns to the hand that sent it, as loyalty returns to a true friend.",perk:"xp",item:"Chakra",itemName:"Sudarshana chakra"},
   {n:"Sudama",d:"सुदामा",s:"A poor childhood friend arrives with a handful of rice, and a king runs barefoot to greet him.",perk:"shield"},
   {n:"Murali",d:"मुरली",s:"Krishna’s flute draws everyone together. Friendship is the music that gathers people.",perk:"xp",item:"Flute",itemName:"Bansuri"},
   {n:"Sarathi",d:"सारथी",s:"Krishna drives Arjuna’s chariot: the friend who steers you through your hardest day.",perk:"all"}],
  trials:[
   {def:"Meet or call friends 3 times in one week",new:"Start a real conversation with someone new"},
   {def:"Reconnect with a friend you haven’t spoken to in a year",new:"Join a club, class or group and go twice"},
   {def:"Host a small gathering: a meal, a walk or a game night"},
   {def:"Be there for a friend through something hard, from start to finish"},
   {def:"Introduce two friends who become friends too"}],
  pool:[
   X("Message a close friend, just because",3,{tags:"close|far",en:1,g:["Share something that made you think of them","No need for a reason"]}),
   X("Voice note to a friend far away",5,{tags:"far",en:1,g:["Two minutes about your week","Ask one real question back"]}),
   X("Call a friend for 20 minutes",20,{tags:"close|far",en:1,call:true,g:["Ask what’s been on their mind lately","Share one thing honestly too"],tool:{type:"timer",sec:1200}}),
   X("Plan a meetup this week",5,{tags:"local|close",en:1,g:["Suggest a day, a time and a place","Make it easy: a walk, coffee or lunch"]}),
   X("Walk with a friend",45,{tags:"local",place:"out",en:1,load:["cardio"],g:["No screens, no agenda","Take the long way round"]}),
   X("Remember a date that matters to a friend",5,{tags:"close",en:1,g:["A birthday, exam, interview or anniversary","Put it in your calendar with a reminder to message"]}),
   X("Send a photo from an old memory",3,{tags:"close|far",en:1,g:["A trip, a party, a silly moment","Add: “remember this?”"]}),
   X("Say yes to an invitation",5,{tags:"new|local",en:1,g:["Even if you’re a little tired","Stay at least an hour"]}),
   X("Go to a meetup or class",60,{tags:"new",lo:1,en:2,g:["Something you’re curious about","Ask two people a question each","Get one contact"]}),
   X("Follow up with someone you met",5,{tags:"new",lo:1,en:1,g:["Within a few days","Mention something they said, and suggest meeting again"]}),
   X("Cook for friends",90,{tags:"local|close",lo:1,en:2,g:["Keep the menu simple","Ask each person to bring one thing"]}),
   X("Ask a friend how you can help",10,{tags:"close",lo:1,en:1,g:["Especially someone going through a busy or hard time","Then actually do it"]}),
   X("Tell a friend what they mean to you",10,{tags:"close",lo:2,en:2,g:["Be specific: a moment they helped you","Message or say it in person"]}),
   X("Start a group chat plan",10,{tags:"close|far",lo:1,en:1,g:["Suggest a group call or a trip","Pick a date poll and send it"]}),
   X("Play a game together, online or in person",30,{tags:"far|local",en:1,g:["A board game, a quiz or an online match","The point is laughing together"]}),
   X("Write a birthday message that isn’t generic",5,{lo:1,en:1,g:["One memory, one wish, one line of thanks"]}),
   X("Introduce two friends",10,{lo:2,en:2,g:["People who share an interest","Message both: “you two should meet, here’s why”"]}),
   X("Forgive a small thing",10,{lo:2,en:2,g:["Something a friend did that still bothers you","Let it go, or talk about it kindly"]})]},
 money:{name:"Money",realm:"craft",about:"Budget, savings, earning, giving",hero:"Lakshmi",heroDev:"लक्ष्मी",c:"var(--money)",
  q:"How do you feel about your money?",
  levels:["I don’t know where my money goes","I track it now and then","I budget and save regularly","I invest with a clear plan"],
  tags:[["budget","Budgeting"],["save","Saving"],["invest","Investing basics"],["earn","Earning more"]],
  skills:[
   {n:"Shubha",d:"शुभ",s:"Lakshmi is said to arrive where there is order and care. It starts with seeing your money clearly.",perk:"swap"},
   {n:"Kalasha",d:"कलश",s:"The overflowing pot of plenty: savings that grow quietly.",perk:"xp",item:"Pot",itemName:"Golden kalasha"},
   {n:"Santosha",d:"सन्तोष",s:"Contentment. Wanting less is a quiet kind of wealth.",perk:"shield"},
   {n:"Kamala",d:"कमल",s:"Lakshmi stands on a lotus, which rises clean from muddy water: wealth earned with integrity.",perk:"xp",item:"Lotus",itemName:"Lakshmi’s lotus"},
   {n:"Dana",d:"दान",s:"Giving. Wealth that flows outward with wisdom brings good back.",perk:"all"}],
  trials:[
   {def:"Track every expense for 7 days"},
   {def:"Make a monthly budget and keep to it for one month"},
   {def:"Save one month of your expenses as an emergency fund",earn:"Earn your first income from a side project or skill"},
   {def:"Set up an automatic monthly saving or investment"},
   {def:"Write a one-page money plan for the next five years"}],
  pool:[
   X("Log today’s spending",5,{tags:"budget|any",en:1,g:["Every purchase, even small ones","Note one you didn’t need"]}),
   X("Check your bank balance calmly",5,{tags:"budget",en:1,g:["Just look, without judging","Write down the number"]}),
   X("Sort last week’s spending into groups",15,{tags:"budget",lo:1,en:2,g:["Home, food, transport, fun, other","Which group surprised you?"]}),
   X("Cancel one subscription you don’t use",10,{tags:"budget|save",en:1,g:["Check your bank or app store subscriptions","Cancel one today"]}),
   X("A no-spend day",3,{tags:"save",en:1,g:["Buy nothing except essentials today","Notice what you wanted, and why"]}),
   X("Move a small amount to savings",3,{tags:"save",en:1,g:["Even a small amount builds the habit","Name the savings pot after its goal"]}),
   X("Set a savings goal with a date",10,{tags:"save",lo:1,en:1,g:["A trip, an emergency fund or a course","Divide it by the months until then"]}),
   X("Compare one big bill",20,{tags:"save|budget",lo:1,en:2,g:["Phone, internet, insurance or energy","Look up two alternatives"]}),
   X("Learn one investing term",10,{tags:"invest",en:1,g:["Index fund, compound interest, diversification or inflation","Explain it in one sentence"]}),
   X("Read about low-cost index funds",20,{tags:"invest",lo:1,en:2,g:["Use a trusted, independent source","Write down the main costs and risks"]}),
   X("Review your investments for 10 minutes",10,{tags:"invest",lo:2,en:1,g:["Check they still match your plan","No buying or selling in a panic"]}),
   X("List three skills people would pay for",10,{tags:"earn",en:1,g:["Things you’re good at, or could learn quickly","Who would pay, and how much?"]}),
   X("Spend 30 minutes on a side income idea",30,{tags:"earn",lo:1,en:2,g:["The smallest step: a post, an offer or a portfolio page"],tool:{type:"timer",sec:1800}}),
   X("Prepare for a pay conversation",20,{tags:"earn",lo:2,en:2,g:["List three results from this year, with numbers","Check typical pay for your role"]}),
   X("Give a small amount to a good cause",5,{lo:1,en:1,g:["A cause you know and trust","Notice how it feels"]}),
   X("Talk about money with someone you trust",20,{lo:2,en:2,call:true,g:["A partner, parent or friend","Share one goal and one worry"]}),
   X("Write your money values",10,{en:1,g:["What should money do for you? Freedom, family, security, joy?","Rank your top three"]}),
   X("A monthly money review",20,{lo:1,en:2,g:["Income, spending and saving this month","One thing to change next month"]})]},
 courage:{name:"Courage",realm:"body",about:"Facing fears, speaking up, trying new things",hero:"Durga",heroDev:"दुर्गा",c:"var(--courage)",
  q:"How does fear show up for you?",
  levels:["Fear often stops me","I push through sometimes","I take on challenges regularly","I seek out hard things"],
  tags:[["fears","Facing a fear"],["speak","Speaking up"],["risk","Trying new things"],["physical","Physical challenges"]],
  skills:[
   {n:"Abhaya",d:"अभय",s:"Durga’s raised palm says: do not fear. Courage starts with one small step.",perk:"swap"},
   {n:"Trishula",d:"त्रिशूल",s:"Her trident: thought, word and action pointing the same way.",perk:"xp",item:"Trident",itemName:"Trishula"},
   {n:"Dhairya",d:"धैर्य",s:"Steadiness while afraid. Not the absence of fear, but staying anyway.",perk:"shield"},
   {n:"Simha",d:"सिंह",s:"Durga rides a lion: courage you can lean on, built by practice.",perk:"xp",item:"Lion",itemName:"Lion of Durga"},
   {n:"Vijaya",d:"विजय",s:"Victory over the demon of doubt, celebrated every year on Vijayadashami.",perk:"all"}],
  trials:[
   {def:"Do one thing that scares you a little, and write down how it went"},
   {def:"Speak up once in a group where you’d usually stay quiet"},
   {def:"Have a difficult conversation you’ve been avoiding"},
   {def:"Try something completely new in front of other people",speak:"Give a short talk or presentation",physical:"Complete a physical challenge you’ve never done, safely"},
   {def:"Take on a challenge that takes weeks: a race, a performance or a talk"}],
  pool:[
   X("Name one fear on paper",5,{tags:"fears|any",en:1,g:["Write: “I’m afraid that…”","Then: “The worst realistic outcome is…”","Then: “I could handle it by…”"]}),
   X("Build a fear ladder",15,{tags:"fears",en:2,g:["Pick one fear","Write 5 steps from easy to hard","Do step one this week"]}),
   X("Climb one rung of your fear ladder",15,{tags:"fears",lo:1,en:2,g:["The next step on your ladder","Stay with the discomfort for a while before you stop"]}),
   X("Ask one question in a meeting",5,{tags:"speak",en:2,g:["Prepare it beforehand","Ask in the first ten minutes, before the nerves build"]}),
   X("Say no to one thing",5,{tags:"speak|any",en:2,g:["Something you don’t want to do","Short and kind: “Thanks, but I can’t this time.”"]}),
   X("Share an opinion you usually keep to yourself",10,{tags:"speak",lo:1,en:2,g:["Something small but true","Say it calmly, without apologising"]}),
   X("Record yourself speaking for 2 minutes",10,{tags:"speak",en:2,g:["Explain something you know well","Watch it once and note one thing you did well"],tool:{type:"timer",sec:120}}),
   X("Order or ask for something in a new language",5,{tags:"risk|speak",en:2,travel:true,g:["At a café or shop","Mistakes are part of it"]}),
   X("Try one food or place you’ve never tried",30,{tags:"risk",en:1,travel:true,g:["Somewhere new near you","Notice what was better than you expected"]}),
   X("Start a conversation with a stranger",5,{tags:"risk|speak",lo:1,en:2,g:["A compliment or a simple question","Keep it light and brief"]}),
   X("Ask for something you want",10,{tags:"speak|risk",lo:1,en:2,g:["Feedback, help, a discount or a favour","A no is just information"]}),
   X("End your shower with 30 seconds of cool water",3,{tags:"physical",en:2,load:["cardio"],g:["Cool, not icy","Breathe slowly through it","Skip it if you have a heart condition"],tool:{type:"timer",sec:30}}),
   X("A hard workout you’ve been avoiding",40,{tags:"physical",lo:1,en:3,load:["legs","cardio"],g:["The session you usually skip","Start, and give it 10 honest minutes before deciding"]}),
   X("Sign up for a challenge",10,{tags:"physical|risk",lo:2,en:1,g:["A race, a climb, an open mic or a course","Pick a date at least 4 weeks away"]}),
   X("Have one honest conversation",20,{tags:"speak|fears",lo:2,en:3,g:["Start with how you feel, not what they did","Listen to their side fully"]}),
   X("Write about a time you were brave",10,{en:1,quiet:true,g:["What happened, what you felt, what you did anyway","Keep it for days when you doubt yourself"]}),
   X("Breathe before the hard thing",3,{en:1,g:["In for 4, hold for 4, out for 6, three times","Then go"],tool:{type:"breath",in:4,hold:4,out:6}}),
   X("Do the thing you’ve been putting off",15,{tags:"fears|any",en:2,g:["Just the first 15 minutes","Momentum does the rest"],tool:{type:"timer",sec:900}})]},
 wisdom:{name:"Wisdom",realm:"peace",about:"Big questions, reflection, philosophy",hero:"Nachiketa",heroDev:"नचिकेता",c:"var(--wisdom)",
  q:"How often do you reflect on life’s big questions?",
  levels:["Rarely","Now and then","I read or reflect weekly","Reflection is a daily habit"],
  tags:[["texts","Reading wisdom texts"],["reflect","Journaling"],["questions","Big questions"],["mentors","Learning from elders"]],
  skills:[
   {n:"Jijnasa",d:"जिज्ञासा",s:"The wish to know. Nachiketa asks the question everyone else avoids.",perk:"swap"},
   {n:"Deepa",d:"दीप",s:"A lamp that lights only the next step, which is enough to walk by.",perk:"xp",item:"Lamp",itemName:"Lamp of knowledge"},
   {n:"Tapas",d:"तपस्",s:"Discipline: three days at Death’s door, without food, unmoved.",perk:"shield"},
   {n:"Shreyas",d:"श्रेयस्",s:"Choosing the good over the merely pleasant, as Yama taught Nachiketa.",perk:"xp",item:"Scroll",itemName:"Katha scroll"},
   {n:"Atma Jnana",d:"आत्मज्ञान",s:"Self-knowledge: what in you does not change.",perk:"all"}],
  trials:[
   {def:"Read a wisdom story or philosophy chapter and write what it means to you"},
   {def:"Journal every day for one week"},
   {def:"Ask an elder or mentor three big questions and write down their answers"},
   {def:"Spend half a day without distractions, reading and reflecting"},
   {def:"Write a one-page personal philosophy: what you value, and why"}],
  pool:[
   X("Read one page of a wisdom text",10,{tags:"texts",en:1,quiet:true,g:["The Gita, an Upanishad, the Dhammapada, Marcus Aurelius or another you trust","Read slowly, then reread one line"]}),
   X("One question, one page",15,{tags:"reflect|questions",en:2,g:["Pick one: What matters most to me? What am I avoiding?","Write without stopping for 10 minutes"],tool:{type:"timer",sec:600}}),
   X("Three-line journal",5,{tags:"reflect",en:1,quiet:true,g:["What happened today","What I felt","What I learned"]}),
   X("Choose the good over the pleasant",5,{tags:"questions|any",en:1,g:["Notice one choice today between what feels nice and what is good","Choose the good once"]}),
   X("Ask an elder one big question",20,{tags:"mentors",en:1,call:true,g:["Try: what do you wish you’d known at my age?","Write down their answer"]}),
   X("Read the story of Nachiketa",15,{tags:"texts",en:1,g:["Katha Upanishad, first chapter, in a translation you like","Note the three boons he asks for"]}),
   X("A walk with one question",20,{tags:"questions|reflect",place:"out",en:1,load:["cardio"],g:["Take one question with you, no earphones","Let the answer come, or not"],tool:{type:"timer",sec:1200}}),
   X("Write a letter to your future self",20,{tags:"reflect",lo:1,en:2,g:["Five years from now","What you hope, what you fear, what you promise"]}),
   X("Explain one idea in your own words",15,{tags:"texts|questions",lo:1,en:2,g:["An idea from something you read this week","Five sentences, as if to a friend"]}),
   X("Spend 10 minutes doing nothing",10,{tags:"reflect|any",en:1,quiet:true,g:["No phone, no book","Sit or look out of a window"],tool:{type:"timer",sec:600}}),
   X("Talk to a mentor about a decision",30,{tags:"mentors",lo:1,en:2,g:["Bring the decision and your options","Ask what they would weigh most"]}),
   X("Notice one assumption",5,{tags:"questions",lo:1,en:1,g:["Something you take for granted about yourself or others","Ask: is it really true?"]}),
   X("Read about a different tradition",20,{tags:"texts",lo:1,en:1,g:["A short piece from Stoic, Buddhist, Sufi or another tradition","Note where it agrees with what you know"]}),
   X("What would I regret?",10,{tags:"questions|reflect",lo:1,en:2,g:["Imagine you’re 80","What would you regret not doing? Write three things"]}),
   X("A weekly reflection",20,{tags:"reflect",lo:1,en:2,g:["What went well, what didn’t, what I learned","One intention for next week"]}),
   X("Learn from someone you disagree with",15,{tags:"questions",lo:2,en:2,g:["Read or listen to a thoughtful view you disagree with","Write the strongest version of their point"]}),
   X("Write your own rule for living",10,{tags:"reflect|questions",lo:2,en:2,g:["One sentence you want to live by","Test it against a hard day"]})]}
});
ORDER.push("friend","money","courage","wisdom");
for(let i=SOON.length-1;i>=0;i--)if(["Friendship","Money","Courage","Wisdom"].includes(SOON[i][0]))SOON.splice(i,1);
Object.assign(RELATED,{friend:["bonds","love"],money:["focus","learn"],courage:["body","focus"],wisdom:["calm","learn"]});
RELATED.bonds.push("friend");RELATED.focus.push("money");RELATED.calm.push("wisdom");RELATED.body.push("courage");
Object.assign(CHAR,{friend:"krishna",money:"lakshmi",courage:"durga",wisdom:"nachiketa"});
Object.assign(PEOPLE,{
 krishna:{n:"Krishna",d:"कृष्ण",pid:"friend",pr:"he",bio:"A form of Vishnu, loved as a playful cowherd boy, a loyal friend and a wise guide. He was friend and charioteer to Arjuna, and never forgot his poor childhood friend Sudama."},
 lakshmi:{n:"Lakshmi",d:"लक्ष्मी",pid:"money",pr:"she",bio:"Goddess of prosperity, good fortune and well-being. She rose from the churning of the ocean and is welcomed into homes with lamps at Diwali."},
 durga:{n:"Durga",d:"दुर्गा",pid:"courage",pr:"she",bio:"A warrior goddess formed from the combined power of all the gods. Riding a lion, she defeated the buffalo demon Mahishasura, a victory celebrated during Navratri."},
 nachiketa:{n:"Nachiketa",d:"नचिकेता",pid:"wisdom",pr:"he",bio:"A boy in the Katha Upanishad who went to the house of Yama, the god of death, waited three days, and refused every distraction until Death taught him the secret of the self."}
});
Object.assign(GUIDE_LINES,{
 friend:["A friend is someone who runs barefoot to greet you.","Show up. That is most of friendship.","Old friends are worth a handful of rice and a whole kingdom.","Let people in, and play your flute where they can hear it.","On your hardest day, let a friend take the reins."],
 money:["See your money clearly. Order invites plenty.","Enough is a kind of wealth.","Small, steady saving fills the pot.","Earn cleanly, like a lotus above the water.","Give a little. Wealth likes to flow."],
 courage:["Fear is a guest. You don’t have to let it drive.","One small brave act today is enough.","Stay steady while afraid. That is courage.","Your lion grows each time you choose the hard thing.","Every demon looks smaller once you face it."],
 wisdom:["Ask the question everyone else avoids.","The lamp shows only the next step. Take it.","Choose the good, not just the pleasant.","Wait at the door until the answer comes.","What in you does not change? Look for it."]
});
Object.assign(GUIDE_INTRO,{
 krishna:{who:"Krishna is one of the most loved figures in Hinduism: a form of the god Vishnu, a mischievous cowherd boy, and later a wise prince and friend.",moment:"When his poor childhood friend Sudama came to his palace with only a handful of flattened rice, Krishna ran barefoot to embrace him.",teach:"Show up for your friends, whatever their status or yours.",src:"Bhagavata Purana and Mahabharata",bg:"city"},
 lakshmi:{who:"Lakshmi is the goddess of prosperity, good fortune and well-being. She is shown seated on a lotus, with gold coins flowing from her hand.",moment:"She rose from the ocean of milk when the gods and demons churned it together, and chose Vishnu as her partner.",teach:"Wealth comes to order, effort and contentment, and is meant to flow.",src:"Puranas",bg:"rivers"},
 durga:{who:"Durga is a warrior goddess, created from the combined power of all the gods when none of them alone could defeat the demon Mahishasura.",moment:"Riding a lion and holding the gods’ weapons, she fought him for nine days and won on the tenth: Vijayadashami.",teach:"Courage is not having no fear. It is facing what frightens you.",src:"Devi Mahatmya, Markandeya Purana",bg:"glow"},
 nachiketa:{who:"Nachiketa is a young boy in the Katha Upanishad, one of the best-known philosophical texts of ancient India.",moment:"Sent to the house of Death, he waited three days without food, then refused wealth and long life until Yama taught him the truth about the self.",teach:"Keep asking the deep questions, and choose the good over the merely pleasant.",src:"Katha Upanishad",bg:"stars"}
});
Object.assign(EN,{"Sakha":"Friend","Sudarshana":"The returning discus","Sudama":"The old friend","Murali":"The flute","Sarathi":"The charioteer",
 "Shubha":"An auspicious start","Kalasha":"The full pot","Santosha":"Contentment","Kamala":"The lotus","Dana":"Giving",
 "Abhaya":"Fearlessness","Trishula":"The trident","Dhairya":"Courage under pressure","Simha":"The lion","Vijaya":"Victory",
 "Jijnasa":"The wish to know","Deepa":"The lamp","Tapas":"Discipline","Shreyas":"The good, not the pleasant","Atma Jnana":"Self-knowledge"});
Object.assign(CHAPTERS,{
 krishna:[
  {dest:"Gokul",charm:["Butter pot","Joy shared is joy doubled."],scenes:[{bg:"hills",chars:one("krishna"),cap:"As a child in Gokul, Krishna and his friends steal butter from the village pots."},{bg:"glow",chars:one("krishna","float"),cap:"He shares every stolen bite with his friends. Friendship begins with sharing."}]},
  {dest:"Govardhan hill",charm:["Govardhan stone","Shelter for everyone."],scenes:[{bg:"clouds",chars:one("krishna"),cap:"A terrible storm floods the village."},{bg:"hills",chars:one("krishna","rise"),cap:"Krishna lifts Govardhan hill on one finger, and everyone shelters beneath it for seven days."}]},
  {dest:"Dwarka",charm:["Handful of rice","A gift measured by love."],scenes:[{bg:"city",chars:one("krishna"),cap:"Years later, his poor friend Sudama comes to the golden city of Dwarka with only some flattened rice."},{bg:"glow",chars:one("krishna","float"),cap:"Krishna runs barefoot to greet him, eats the rice with joy, and quietly changes his friend’s life."}]},
  {dest:"Kurukshetra",charm:["Chariot reins","The friend who steers."],scenes:[{bg:"hills",chars:two("krishna","arjuna"),cap:"Krishna refuses to fight, but agrees to drive Arjuna’s chariot."},{bg:"glow",chars:one("krishna","rise"),cap:"When Arjuna loses heart, his friend’s words become the Bhagavad Gita."}]}],
 lakshmi:[
  {dest:"The ocean of milk",charm:["Drop of nectar","What rises from patient effort."],scenes:[{bg:"rivers",chars:one("lakshmi"),cap:"Gods and demons churn the ocean of milk for the nectar of immortality."},{bg:"glow",chars:one("lakshmi","rise"),cap:"From the waves rises Lakshmi, seated on a lotus."}]},
  {dest:"Vaikuntha",charm:["Garland of choice","Choose your partner wisely."],scenes:[{bg:"clouds",chars:one("lakshmi"),cap:"Every god hopes she will choose him."},{bg:"glow",chars:one("lakshmi","float"),cap:"She garlands Vishnu, the steady preserver, and chooses order over show."}]},
  {dest:"Indra’s court",charm:["Fallen flower","Pride drives plenty away."],scenes:[{bg:"city",chars:one("lakshmi"),cap:"In a Purana story, the god Indra grows proud and careless with a sage’s gift."},{bg:"stars",chars:one("lakshmi","float"),cap:"Lakshmi leaves his kingdom, and only returns after humility and hard work."}]},
  {dest:"Diwali night",charm:["Clay diya","Welcome with light."],scenes:[{bg:"lamps",chars:one("lakshmi"),cap:"On Diwali, families clean their homes and light lamps at every door."},{bg:"lamps",chars:one("lakshmi","float"),cap:"They welcome Lakshmi in: prosperity, and the care that keeps it."}]}],
 durga:[
  {dest:"The gods’ despair",charm:["Spark of light","Strength gathered from many."],scenes:[{bg:"stars",chars:[],cap:"The buffalo demon Mahishasura cannot be defeated by any god alone."},{bg:"glow",chars:one("durga","rise"),cap:"Their combined light takes one form: the goddess Durga."}]},
  {dest:"The gift of weapons",charm:["Trident tip","The right tools for the task."],scenes:[{bg:"glow",chars:one("durga"),cap:"Shiva gives her his trident, Vishnu his discus, and the others their gifts."},{bg:"hills",chars:one("durga","float"),cap:"The mountains give her a lion to ride."}]},
  {dest:"Nine nights",charm:["Navratri thread","Keep going, night after night."],scenes:[{bg:"stars",chars:one("durga"),cap:"Mahishasura changes shape again and again: buffalo, lion, elephant, warrior."},{bg:"glow",chars:one("durga","rise"),cap:"She meets every form, for nine nights. These are remembered as Navratri."}]},
  {dest:"Vijayadashami",charm:["Victory flag","Doubt defeated."],scenes:[{bg:"glow",chars:one("durga","rise"),cap:"On the tenth day she defeats him."},{bg:"lamps",chars:one("durga","float"),cap:"The day is celebrated as Vijayadashami, the day of victory, and a good day to begin something brave."}]}],
 nachiketa:[
  {dest:"His father’s sacrifice",charm:["Old cow’s bell","Noticing what’s wrong."],scenes:[{bg:"glow",chars:one("nachiketa"),cap:"Nachiketa’s father gives away old, useless cows as offerings, and keeps the best."},{bg:"glow",chars:one("nachiketa","float"),cap:"The boy asks: “To whom will you give me?” In anger, his father says: “To Death.”"}]},
  {dest:"Yama’s door",charm:["Three days’ dust","Patience that waits."],scenes:[{bg:"stars",chars:one("nachiketa"),cap:"Nachiketa goes to the house of Yama. Death is away."},{bg:"stars",chars:one("nachiketa","float"),cap:"He waits three days without food. Yama returns and offers him three wishes."}]},
  {dest:"The three boons",charm:["Fire-altar brick","Ask for what matters."],scenes:[{bg:"glow",chars:one("nachiketa"),cap:"First, peace with his father. Second, the knowledge of a sacred fire."},{bg:"scroll",chars:one("nachiketa","rise"),cap:"Third: what happens to us after death?"}]},
  {dest:"The secret of the self",charm:["Lamp of the self","The good, not the pleasant."],scenes:[{bg:"glow",chars:one("nachiketa"),cap:"Yama tempts him with gold, kingdoms and long life instead."},{bg:"stars",chars:one("nachiketa","float"),cap:"He refuses them all. So Yama teaches him that the true self is never born and never dies."}]}]
});
WHO[0][1].push(["Krishna","कृष्ण","Friendship. Playful, wise friend and Arjuna’s charioteer.","friend"],["Lakshmi","लक्ष्मी","Money. Goddess of prosperity and good fortune.","money"],["Durga","दुर्गा","Courage. Warrior goddess riding a lion.","courage"],["Nachiketa","नचिकेता","Wisdom. Boy who questioned Death.","wisdom"]);
["Krishna","Lakshmi","Durga"].forEach(n=>{const g=WHO[1][1];const i=g.findIndex(x=>x[0]===n);if(i>=0)g.splice(i,1)});
{const g=WHO[4][1],i=g.findIndex(x=>x[0]==="Nachiketa");if(i>=0)g.splice(i,1)}

/* ================= new paths, batch 2 (v1.13): Making, Art and writing, Gratitude ================= */
Object.assign(PATHS,{
 making:{name:"Making",realm:"craft",about:"Repairs, cooking, handcraft, growing",hero:"Vishwakarma",heroDev:"विश्वकर्मा",c:"var(--making)",
  q:"How often do you make or fix things?",
  levels:["I rarely make things","I fix or cook now and then","I make something most weeks","Making is a big part of my life"],
  tags:[["diy","Repairs and DIY"],["cook","Cooking"],["craft","Handcraft"],["grow","Growing plants"]],
  skills:[
   {n:"Shilpa",d:"शिल्प",s:"Vishwakarma, architect of the gods, begins every creation with a plan.",perk:"swap"},
   {n:"Vajra",d:"वज्र",s:"The thunderbolt he forged for Indra: strength shaped by skill.",perk:"xp",item:"Vajra",itemName:"Indra’s vajra"},
   {n:"Yantra",d:"यन्त्र",s:"Good tools, kept in order, make every job lighter.",perk:"shield"},
   {n:"Pushpaka",d:"पुष्पक",s:"The flying chariot he built: ambition made with care.",perk:"xp",item:"Chariot",itemName:"Pushpaka vimana"},
   {n:"Dwaraka",d:"द्वारका",s:"The golden city he raised for Krishna by the sea: mastery.",perk:"all"}],
  trials:[
   {def:"Make or fix one thing from start to finish"},
   {def:"Repair something you’d normally throw away",cook:"Cook a full meal for others from scratch",grow:"Grow something from seed to its first leaves"},
   {def:"Finish a project that takes more than a week"},
   {def:"Teach someone to make something you can make"},
   {def:"Make something you’re proud to give as a gift"}],
  pool:[
   X("Fix one small thing at home",15,{tags:"diy|any",place:"home",en:1,g:["A loose screw, a wobbly chair, a dripping tap","Find the right tool first","Finish it fully"]}),
   X("Organise your tools",15,{tags:"diy|craft",place:"home",en:1,g:["Put every tool in one place","Throw away what’s broken","Note what you’re missing"]}),
   X("Sharpen a knife or tool",10,{tags:"diy|cook",lo:1,place:"home",en:1,g:["Use a sharpener or whetstone carefully","Test it on paper or a tomato"]}),
   X("Learn one repair from a video",20,{tags:"diy",en:1,g:["Something you actually need: a zip, a plug, a bike chain","Watch once, then do it alongside"]}),
   X("Cook something new",40,{tags:"cook",en:2,place:"home",g:["Pick a recipe with fewer than 10 ingredients","Read it all before you start","Taste as you go"]}),
   X("Master one base recipe",30,{tags:"cook",lo:1,place:"home",en:2,g:["Dal, rice, a sauce or bread","Make it three times this month","Change one thing each time"]}),
   X("Cook a dish from your childhood",45,{tags:"cook",lo:1,place:"home",en:2,g:["Ask family how they make it","Write the recipe down as you go"]}),
   X("Sketch a plan before you build",10,{tags:"craft|diy",en:1,g:["Draw what you’re making, with sizes","List materials and steps"]}),
   X("30 minutes on a craft project",30,{tags:"craft",en:2,g:["Woodwork, sewing, knitting, pottery or models","Stop while it’s still fun"],tool:{type:"timer",sec:1800}}),
   X("Mend a piece of clothing",20,{tags:"craft|diy",en:1,quiet:true,g:["A button, a seam or a small hole","Thread, needle and a calm evening"]}),
   X("Make a small gift",45,{tags:"craft|cook",lo:1,en:2,g:["A card, a bake, a small object","For someone specific"]}),
   X("Water and check your plants",5,{tags:"grow",en:1,g:["Feel the soil before watering","Turn pots toward the light"]}),
   X("Plant some seeds",15,{tags:"grow",en:1,g:["Herbs are easy: basil, coriander, mint","Label them with the date"]}),
   X("Repot one plant",15,{tags:"grow",lo:1,en:1,g:["A slightly bigger pot, fresh soil","Water well afterwards"]}),
   X("Build something with your hands",60,{tags:"craft|diy",lo:2,en:2,g:["A shelf, a box, a frame or a stool","Measure twice, cut once"]}),
   X("Clean and care for your workspace",10,{en:1,g:["Clear the surface, put tools away","A tidy bench invites the next project"]})]},
 art:{name:"Art and writing",realm:"joy",about:"Writing, drawing, photography, poetry",hero:"Valmiki",heroDev:"वाल्मीकि",c:"var(--art)",
  q:"How is your creative life?",
  levels:["I haven’t made art in years","I sketch or write sometimes","I create most weeks","I share my work regularly"],
  tags:[["write","Writing"],["draw","Drawing and painting"],["photo","Photography"],["poetry","Poetry"]],
  skills:[
   {n:"Adikavi",d:"आदिकवि",s:"Valmiki is called the first poet. Every artist starts with a first line.",perk:"swap"},
   {n:"Shloka",d:"श्लोक",s:"Grief at a bird’s death came out of Valmiki as the first verse.",perk:"xp",item:"Stylus",itemName:"Valmiki’s stylus"},
   {n:"Rasa",d:"रस",s:"Art carries a feeling from one heart to another.",perk:"shield"},
   {n:"Kavya",d:"काव्य",s:"Poetry, shaped and finished, line by line.",perk:"xp",item:"Scroll",itemName:"Ramayana manuscript"},
   {n:"Gana",d:"गान",s:"Valmiki’s students sang his poem before Rama himself: art that reaches its audience.",perk:"all"}],
  trials:[
   {def:"Make something every day for a week, however small"},
   {def:"Finish one piece: a poem, drawing, photo set or short story"},
   {def:"Share a piece of your work with someone and ask what they felt"},
   {def:"Make a series of 5 related pieces"},
   {def:"Share your work publicly: online, at an event or in print"}],
  pool:[
   X("Morning pages: write one page",15,{tags:"write|any",en:1,g:["Write without stopping, whatever comes","Don’t reread it today"],tool:{type:"timer",sec:900}}),
   X("Write 200 words",20,{tags:"write",en:2,g:["A scene, a memory or an idea","Stop at 200, even mid-sentence"],tool:{type:"timer",sec:1200}}),
   X("Describe one person in five sentences",10,{tags:"write",en:1,g:["Someone you saw today","What they wore, did and might be thinking"]}),
   X("Edit one old piece",20,{tags:"write|poetry",lo:1,en:2,g:["Cut 20% of the words","Read it aloud"]}),
   X("Write a four-line poem",10,{tags:"poetry",en:1,g:["About something small: a cup, a window, a sound","End on an image, not an explanation"]}),
   X("Write a haiku a day",5,{tags:"poetry",en:1,g:["Three lines: 5, 7 and 5 syllables","One moment from today"]}),
   X("Read a poem aloud, twice",5,{tags:"poetry",en:1,quiet:true,g:["Any poet: Kabir, Tagore, Rumi, Mary Oliver","Notice which line stays with you"]}),
   X("Ten-minute sketch",10,{tags:"draw",en:1,g:["Draw something in front of you","Don’t erase, just keep going"],tool:{type:"timer",sec:600}}),
   X("Draw your hand",15,{tags:"draw",en:2,g:["Five different poses","Look at the hand more than the paper"]}),
   X("Paint or colour for 20 minutes",20,{tags:"draw",lo:1,place:"home",en:1,g:["Watercolour, pencils or an app","Play with colour, not perfection"],tool:{type:"timer",sec:1200}}),
   X("A photo walk",30,{tags:"photo",place:"out",en:1,load:["cardio"],travel:true,g:["Pick one theme: shadows, red, doors, faces","Take 20 photos, keep the best 3"]}),
   X("One photo, edited well",15,{tags:"photo",lo:1,en:1,g:["Pick your best photo this week","Adjust light, crop and colour, gently"]}),
   X("Study one artwork",10,{en:1,g:["A painting, photo or poem you admire","Ask: why does it work?"]}),
   X("Share one piece with a friend",5,{lo:1,en:2,g:["Something you made recently","Ask what they felt, not whether it’s good"]}),
   X("Start a series",15,{lo:2,en:2,g:["Choose a theme for 5 pieces","Make the first one today"]}),
   X("Post or print one piece",10,{lo:2,en:2,g:["Online, on your wall or in a zine","Let it go out into the world"]})]},
 gratitude:{name:"Gratitude",realm:"peace",about:"Thankfulness, service, simple living",hero:"Shabari",heroDev:"शबरी",c:"var(--gratitude)",
  q:"How often do you notice what’s good?",
  levels:["Rarely","Sometimes","I practise gratitude weekly","It’s a daily habit"],
  tags:[["notice","Noticing the good"],["thank","Thanking others"],["serve","Service"],["simple","Simple living"]],
  skills:[
   {n:"Pratiksha",d:"प्रतीक्षा",s:"Shabari waited for years, sweeping the path every morning in case Rama came that day.",perk:"swap"},
   {n:"Badari",d:"बदरी",s:"She tasted each berry so that only the sweetest reached Rama.",perk:"xp",item:"Basket",itemName:"Shabari’s basket"},
   {n:"Kritajnata",d:"कृतज्ञता",s:"Remembering what others have done for you.",perk:"shield"},
   {n:"Atithya",d:"आतिथ्य",s:"Hospitality: welcoming whoever comes to your door as an honoured guest.",perk:"xp",item:"Lamp",itemName:"Ashram lamp"},
   {n:"Bhakti",d:"भक्ति",s:"Devotion: love given freely, which Rama honoured above every ritual.",perk:"all"}],
  trials:[
   {def:"Write three things you’re grateful for every day for a week"},
   {def:"Thank three people for something specific, in person or in writing"},
   {def:"Do an act of service for someone without being asked"},
   {def:"Spend a week with one less comfort, and notice what you have",serve:"Volunteer for a few hours"},
   {def:"Write a gratitude letter and read it to the person"}],
  pool:[
   X("Three good things",5,{tags:"notice|any",en:1,quiet:true,g:["Write three things that went well today","Add why each one happened"]}),
   X("Notice one beautiful thing",3,{tags:"notice",en:1,g:["Stop and look for 30 seconds","A sky, a face, a sound"]}),
   X("Savour one meal",15,{tags:"notice|simple",en:1,g:["No screens","Notice the taste and who made it possible"]}),
   X("Thank someone specifically",5,{tags:"thank",en:1,g:["Not just “thanks”: say what they did and what it meant"]}),
   X("Write a thank-you note",10,{tags:"thank",en:1,g:["On paper if you can","Leave it where they’ll find it"]}),
   X("Thank someone who serves you",3,{tags:"thank|serve",en:1,travel:true,g:["A driver, cleaner, cook or shop worker","Use their name if you know it"]}),
   X("Tell a teacher what they gave you",15,{tags:"thank",lo:1,en:1,g:["A message or email to a teacher or mentor","Name one lesson you still use"]}),
   X("Help someone without being asked",15,{tags:"serve",en:2,g:["Carry, clean, cook or listen","Don’t mention it afterwards"]}),
   X("Give away one thing you don’t use",10,{tags:"simple|serve",en:1,g:["Clothes, a book or a tool","To someone who will use it"]}),
   X("A one-hour volunteer shift",60,{tags:"serve",lo:1,en:2,g:["A food bank, shelter, temple kitchen or community garden","Go with a friend if you like"]}),
   X("One less comfort today",3,{tags:"simple",en:1,g:["Skip one small luxury","Notice how much you already have"]}),
   X("Tidy one corner",10,{tags:"simple",place:"home",en:1,g:["Clear a shelf or drawer","Keep only what you use or love"]}),
   X("Gratitude walk",20,{tags:"notice",place:"out",en:1,load:["cardio"],g:["Name one thing you’re grateful for at each corner"],tool:{type:"timer",sec:1200}}),
   X("Remember someone who helped you",5,{tags:"thank|notice",en:1,quiet:true,g:["Picture them and what they did","Let yourself feel it"]}),
   X("Welcome a guest well",30,{tags:"serve",lo:1,en:1,g:["Tea, a clean space, full attention","Treat them as Shabari treated Rama"]}),
   X("Write a gratitude letter",30,{lo:2,en:2,g:["To someone who changed your life","300 words: what they did and what it meant"]})]}
});
ORDER.push("making","art","gratitude");SOON.length=0;
Object.assign(RELATED,{making:["focus","art"],art:["music","making"],gratitude:["calm","bonds"]});
RELATED.music.push("art");RELATED.calm.push("gratitude");RELATED.money.push("making");
Object.assign(CHAR,{making:"vishwakarma",art:"valmiki",gratitude:"shabari"});
Object.assign(PEOPLE,{
 vishwakarma:{n:"Vishwakarma",d:"विश्वकर्मा",pid:"making",pr:"he",bio:"The divine architect and craftsman of the gods. He built golden Lanka, the city of Dwarka and the flying chariot Pushpaka, and forged Indra’s thunderbolt. Workshops in India honour him each year."},
 valmiki:{n:"Valmiki",d:"वाल्मीकि",pid:"art",pr:"he",bio:"The sage honoured as the first poet, traditionally credited with the Ramayana. Later legend says he was once a robber named Ratnakara, changed by a single question."},
 shabari:{n:"Shabari",d:"शबरी",pid:"gratitude",pr:"she",bio:"An elderly woman of a forest community who served the sage Matanga and waited many years for Rama. Her simple devotion is one of the most loved moments of the Ramayana."}
});
Object.assign(GUIDE_LINES,{
 making:["Every great city starts as a sketch.","Keep your tools sharp and in their place.","Make it, then make it better.","What you build with care outlasts you.","Teach someone. Craft grows when shared."],
 art:["The first line is the bravest one.","Turn what you feel into something others can feel.","Finish it. A finished poem beats a perfect idea.","Look closely. Art begins with attention.","Share your song. It is complete only when heard."],
 gratitude:["Sweep the path each morning. Something good may come.","Notice the sweet berries in your day.","Remember who helped you get here.","Welcome whoever comes as an honoured guest.","Love given simply is the highest offering."]
});
Object.assign(GUIDE_INTRO,{
 vishwakarma:{who:"Vishwakarma is the divine architect and craftsman in Hindu stories, the maker of the gods’ palaces, chariots and weapons.",moment:"He built golden Lanka, the city of Dwarka by the sea, and Pushpaka, a chariot that could fly through the sky.",teach:"Plan carefully, use good tools, and make things that last.",src:"Vedas, epics and Puranas",bg:"city"},
 valmiki:{who:"Valmiki is the sage honoured as the first poet of Sanskrit, traditionally credited with writing the Ramayana.",moment:"Seeing a hunter kill one of a pair of birds, his grief came out as a perfect verse: the first shloka.",teach:"Turn what you feel into words or images others can share.",src:"Ramayana",bg:"river"},
 shabari:{who:"Shabari is an elderly woman in the Ramayana who lived in the forest ashram of the sage Matanga.",moment:"She waited years for Rama. When he came, she offered him berries she had tasted herself to be sure they were sweet, and he ate them with joy.",teach:"Notice the good, and give simply and with love.",src:"Ramayana",bg:"forest"}
});
Object.assign(EN,{"Shilpa":"Craft","Vajra":"The thunderbolt","Yantra":"The tool","Pushpaka":"The flying chariot","Dwaraka":"The golden city",
 "Adikavi":"The first poet","Shloka":"The verse","Rasa":"Feeling","Kavya":"Poetry","Gana":"Sharing your song",
 "Pratiksha":"Patient waiting","Badari":"The berries","Kritajnata":"Gratitude","Atithya":"Hospitality","Bhakti":"Devotion",
 "Sarathi Sakha":"The friend who steers","Setu Bandha":"Building the bridge","Ramayana Gana":"Singing the Ramayana","Mantra Diksha":"Receiving a mantra","Before Yama":"Facing Death"});
Object.assign(CHAPTERS,{
 vishwakarma:[
  {dest:"Indra’s forge",charm:["Thunderbolt spark","Strength shaped by skill."],scenes:[{bg:"clouds",chars:one("vishwakarma"),cap:"The gods need a weapon strong enough to defeat the serpent demon Vritra."},{bg:"glow",chars:one("vishwakarma","rise"),cap:"Vishwakarma forges the vajra, the thunderbolt, for Indra."}]},
  {dest:"Golden Lanka",charm:["Golden brick","Build to last."],scenes:[{bg:"city",chars:one("vishwakarma"),cap:"On an island in the sea, he builds a city of gold."},{bg:"city",chars:one("vishwakarma","float"),cap:"In later stories it becomes Ravana’s Lanka, still shining when Hanuman arrives."}]},
  {dest:"Pushpaka",charm:["Chariot wheel","Ambition with care."],scenes:[{bg:"clouds",chars:one("vishwakarma"),cap:"He builds Pushpaka, a chariot that flies through the sky."},{bg:"lamps",chars:one("vishwakarma","float"),cap:"After the war, it carries Rama home to Ayodhya."}]},
  {dest:"Dwarka",charm:["Sea shell","Mastery by the sea."],scenes:[{bg:"sea",chars:one("vishwakarma"),cap:"Krishna asks for a safe city for his people."},{bg:"city",chars:one("vishwakarma","rise"),cap:"Vishwakarma raises golden Dwarka from the sea, said to be built in a single night."}]}],
 valmiki:[
  {dest:"The Tamasa river",charm:["Heron feather","Grief that became song."],scenes:[{bg:"river",chars:one("valmiki"),cap:"By the river, Valmiki watches a pair of krauncha birds."},{bg:"glow",chars:one("valmiki","float"),cap:"A hunter’s arrow kills one, and his grief pours out as a perfect verse: the first shloka."}]},
  {dest:"Narada’s visit",charm:["Veena string","A story worth telling."],scenes:[{bg:"clouds",chars:two("narada","valmiki"),cap:"Valmiki asks Narada: is there anyone truly good and brave alive?"},{bg:"scroll",chars:one("valmiki","rise"),cap:"Narada tells him Rama’s story, and Valmiki begins to write."}]},
  {dest:"The forest ashram",charm:["Ashram leaf","Shelter for the lost."],scenes:[{bg:"forest",chars:one("valmiki"),cap:"Years later, Sita comes to his ashram alone."},{bg:"forest",chars:one("valmiki","float"),cap:"He gives her shelter, and her twin sons Lava and Kusha grow up as his students."}]},
  {dest:"Rama’s court",charm:["Singer’s bell","Art that reaches its audience."],scenes:[{bg:"city",chars:one("valmiki"),cap:"Valmiki teaches the boys his whole poem."},{bg:"lamps",chars:one("valmiki","rise"),cap:"They sing the Ramayana before Rama himself, who hears his own story."}]}],
 shabari:[
  {dest:"Matanga’s ashram",charm:["Ashram broom","Humble work, done daily."],scenes:[{bg:"forest",chars:one("shabari"),cap:"As a young woman, Shabari serves the sage Matanga in his forest ashram."},{bg:"glow",chars:one("shabari","float"),cap:"Before he dies, he tells her: Rama will come here one day."}]},
  {dest:"The long wait",charm:["Swept path","Readiness, every morning."],scenes:[{bg:"forest",chars:one("shabari"),cap:"Every morning for years, she sweeps the path and gathers fruit."},{bg:"stars",chars:one("shabari","float"),cap:"Her hair turns white. She still sweeps the path."}]},
  {dest:"Rama arrives",charm:["Sweet berry","The best of what you have."],scenes:[{bg:"forest",chars:two("rama","shabari"),cap:"At last, Rama and Lakshmana come to her door."},{bg:"glow",chars:one("shabari","rise"),cap:"She offers berries she has tasted to be sure they are sweet. Rama eats them with joy."}]},
  {dest:"The way to Sugriva",charm:["Forest path","Kindness repaid."],scenes:[{bg:"hills",chars:one("shabari"),cap:"Shabari tells Rama where to find Sugriva and the vanaras."},{bg:"glow",chars:one("shabari","float"),cap:"Her simple help leads Rama to Hanuman, and to Sita."}]}]
});
SYN.push(
 {id:"sarathi",p:["friend","focus"],req:2,n:"Sarathi Sakha",d:"सारथी सखा",s:"Krishna and Arjuna: lifelong friends, one at the reins and one with the bow.",q:"Ask a friend for honest advice on one work decision"},
 {id:"setu",p:["making","body"],req:2,n:"Setu Bandha",d:"सेतु बन्ध",s:"Nala, son of Vishwakarma, designs the bridge to Lanka, and Hanuman’s army carries the stones.",q:"Build or fix something that needs physical effort"},
 {id:"bhakti",p:["gratitude","bonds"],req:2,n:"Bhakti",d:"भक्ति",s:"Shabari’s berries for Rama: gratitude and family love in one small offering.",q:"Thank a family member for something specific"},
 {id:"gana",p:["art","bonds"],req:2,n:"Ramayana Gana",d:"रामायण गान",s:"Valmiki’s students sing Rama’s own story to him: art that carries a family’s memory.",q:"Write or draw one family memory"},
 {id:"diksha",p:["music","calm"],req:2,n:"Mantra Diksha",d:"मन्त्र दीक्षा",s:"Narada gives young Dhruva a mantra: music and stillness meet in sacred sound.",q:"Chant or hum one mantra or melody slowly for 5 minutes"},
 {id:"yama",p:["love","wisdom"],req:2,n:"Before Yama",d:"यम के सम्मुख",s:"Savitri and Nachiketa both stood before Death, and both won with calm, wise words.",q:"Have one calm, honest conversation about something that matters"}
);
Object.assign(STORIES,{
 sarathi:{cast:["friend","focus"],note:"Mahabharata",scenes:[
  {bg:"city",chars:two("krishna","arjuna"),cap:"Krishna and Arjuna are cousins and close friends from youth."},
  {bg:"hills",chars:two("krishna","arjuna"),cap:"Before the great war, both sides ask Krishna for help. Arjuna chooses Krishna himself, unarmed, over his whole army."},
  {bg:"hills",chars:[["arjuna",50,80,.8,"bow"],["krishna",190,60,.9,"rise"]],cap:"On the battlefield Arjuna loses heart. His friend at the reins speaks the Bhagavad Gita."},
  {bg:"glow",chars:two("krishna","arjuna"),cap:"A friend who tells you the truth, and steers you through your hardest day."}]},
 setu:{cast:["making","body"],note:"Ramayana, Yuddha Kanda",scenes:[
  {bg:"sea",chars:[["hanuman",120,50,.95,"float"]],cap:"Rama’s army reaches the ocean. Lanka lies across the water."},
  {bg:"glow",chars:[["vishwakarma",120,50,.95,"rise"]],cap:"Nala, the son of Vishwakarma, has his father’s gift: stones he places will float."},
  {bg:"bridge",chars:two("vishwakarma","hanuman"),cap:"Hanuman and the vanaras carry rocks and trees, and Nala sets each one in place."},
  {bg:"bridge",chars:[["hanuman",60,70,.8,"rise"],["vishwakarma",190,70,.8,"rise"]],cap:"In five days the bridge is done. Skill and strength, working together."}]},
 bhakti:{cast:["gratitude","bonds"],note:"Ramayana, Aranya Kanda",scenes:[
  {bg:"forest",chars:[["shabari",120,50,.95,"float"]],cap:"Old Shabari has swept the forest path every morning for years."},
  {bg:"forest",chars:two("rama","shabari"),cap:"One day Rama arrives at her door."},
  {bg:"glow",chars:[["shabari",50,70,.85,"bow"],["rama",190,60,.9,"rise"]],cap:"She offers him berries she has tasted herself, so only the sweet ones reach him."},
  {bg:"glow",chars:two("rama","shabari"),cap:"Rama eats them with joy. A simple gift, given with love, is worth more than any ritual."}]},
 gana:{cast:["art","bonds"],note:"Ramayana, Uttara Kanda",scenes:[
  {bg:"forest",chars:[["valmiki",120,50,.95,"float"]],cap:"In his forest ashram, Valmiki teaches two boys, Lava and Kusha, his poem of Rama."},
  {bg:"city",chars:[["valmiki",120,55,.9,"rise"]],cap:"He brings them to Rama’s great ceremony in Ayodhya."},
  {bg:"lamps",chars:[["rama",120,50,.95,"float"]],notes:[[40,60],[260,70]],cap:"The boys sing, and Rama listens to his own life as a song."},
  {bg:"glow",chars:two("valmiki","rama"),cap:"He learns the singers are his own sons. Art carries what families forget."}]},
 diksha:{cast:["music","calm"],note:"Vishnu and Bhagavata Puranas",scenes:[
  {bg:"forest",chars:[["dhruva",120,55,.95,"float"]],cap:"Five-year-old Dhruva walks into the forest, hurt and determined."},
  {bg:"clouds",chars:two("narada","dhruva"),notes:[[160,40]],cap:"Narada meets him, tests his resolve, then gives him a mantra."},
  {bg:"stars",chars:[["dhruva",120,55,.95,"rise"]],cap:"Dhruva repeats it, breath after breath, through every season."},
  {bg:"stars",chars:two("narada","dhruva"),cap:"Sound, repeated with stillness, carries him to the sky as the pole star."}]},
 yama:{cast:["love","wisdom"],note:"Mahabharata and Katha Upanishad",scenes:[
  {bg:"forest",chars:[["savitri",120,50,.95,"float"]],cap:"Savitri follows Yama as he carries away her husband, speaking with calm wisdom."},
  {bg:"glow",chars:[["savitri",120,50,.95,"rise"]],cap:"Moved, Yama grants her wishes, and her husband returns to life."},
  {bg:"stars",chars:[["nachiketa",120,55,.95,"float"]],cap:"Long before, the boy Nachiketa waited three days at Yama’s door."},
  {bg:"glow",chars:two("savitri","nachiketa"),cap:"Two who faced Death without fear, and won with love and questions."}]}
});
WHO[0][1].push(["Vishwakarma","विश्वकर्मा","Making. Divine architect and craftsman.","making"],["Valmiki","वाल्मीकि","Art and writing. The first poet.","art"],["Shabari","शबरी","Gratitude. Devotee who waited years for Rama.","gratitude"]);
["Valmiki","Shabari"].forEach(n=>{const g=WHO[2][1],i=g.findIndex(x=>x[0]===n);if(i>=0)g.splice(i,1)});

/* ================= #13: chapters 5–8 for every 4-chapter guide ================= */
CHAPTERS.patanjali.push(
 {dest:"Three works",charm:["Three-fold leaf","Speech, mind and body."],scenes:[{bg:"scroll",chars:one("patanjali"),cap:"Tradition links the name Patanjali with three works: on grammar, on yoga and on medicine."},{bg:"glow",chars:one("patanjali","float"),cap:"Clean speech, a calm mind, a healthy body. One teacher, three kinds of care."}]},
 {dest:"Practice and letting go",charm:["Abhyasa bead","Keep at it. Let it go."],scenes:[{bg:"forest",chars:one("patanjali"),cap:"Sutra 1.12 says the mind is steadied by two things: abhyasa, steady practice, and vairagya, letting go."},{bg:"glow",chars:one("patanjali","rise"),cap:"Practice for a long time, without breaks, with care. That is the meaning of this app’s name."}]},
 {dest:"The eight limbs",charm:["Eight-petal lotus","One limb at a time."],scenes:[{bg:"hills",chars:one("patanjali"),cap:"He lays out yoga as eight limbs: how you treat others, how you treat yourself, posture, breath, and then the inner steps."},{bg:"glow",chars:one("patanjali","float"),cap:"Posture is only the third limb. The path starts with how you live."}]},
 {dest:"Steady and easy",charm:["Seat of ease","Firm, but not tense."],scenes:[{bg:"river",chars:one("patanjali"),cap:"Sutra 2.46 says a posture should be sthira and sukha: steady and easy."},{bg:"glow",chars:one("patanjali","rise"),cap:"The same rule works for any habit. Firm enough to hold, easy enough to keep."}]});
CHAPTERS.savitri.push(
 {dest:"Waking in the forest",charm:["Banyan leaf","Gentle words for hard news."],scenes:[{bg:"forest",chars:one("savitri"),cap:"Satyavan wakes with his head in her lap. He thinks he only slept."},{bg:"stars",chars:one("savitri","float"),cap:"Night has fallen. Savitri tells him gently what happened, and they start for home."}]},
 {dest:"Back to the hermitage",charm:["Hermitage lamp","The ones who waited for you."],scenes:[{bg:"stars",chars:one("savitri"),cap:"His parents have searched all night, afraid for their son."},{bg:"lamps",chars:one("savitri","rise"),cap:"They return, and Satyavan’s father, blind for years, can see again. Yama’s first boon has come true."}]},
 {dest:"The kingdom returns",charm:["Royal seal","Patience is repaid."],scenes:[{bg:"city",chars:one("savitri"),cap:"At dawn, ministers arrive from his old kingdom. The usurper has fallen."},{bg:"glow",chars:one("savitri","float"),cap:"The family goes home. Each of her boons has come true, one by one."}]},
 {dest:"Vat Savitri",charm:["Banyan thread","Love that keeps going."],scenes:[{bg:"forest",chars:one("savitri"),cap:"On Vat Savitri, many women tie threads around a banyan tree and remember her."},{bg:"glow",chars:one("savitri","rise"),cap:"Her story is not about luck. It is about calm, clear words when it matters most."}]});
CHAPTERS.saraswati.push(
 {dest:"Vak, the word",charm:["Vak syllable","Speak with care."],scenes:[{bg:"river",chars:one("saraswati"),cap:"In the Rigveda, Saraswati is praised as a great river. Later she becomes one with Vak, sacred speech."},{bg:"glow",chars:one("saraswati","float"),cap:"Words are a river too: they can water a field or flood it."}]},
 {dest:"Kalidasa’s tongue",charm:["Palm-leaf poem","Anyone can begin."],scenes:[{bg:"city",chars:one("saraswati"),cap:"A popular legend says Kalidasa began as a simple man, mocked for knowing nothing."},{bg:"scroll",chars:one("saraswati","rise"),cap:"He prayed to the goddess and went on to write Shakuntala and Meghaduta, some of the finest poems in Sanskrit."}]},
 {dest:"Sharada",charm:["Sharada lamp","Teachers keep the lamp lit."],scenes:[{bg:"hills",chars:one("saraswati"),cap:"As Sharada, she is honoured in Kashmir and at Sringeri in the south."},{bg:"lamps",chars:one("saraswati","float"),cap:"Scholars there have taught in her name for centuries, teacher to student."}]},
 {dest:"Books at rest",charm:["Resting book","Rest is part of learning."],scenes:[{bg:"lamps",chars:one("saraswati"),cap:"At the end of Navratri, many families place books and instruments before her and do not use them for a day."},{bg:"glow",chars:one("saraswati","rise"),cap:"On Vijayadashami they are picked up again, and children begin to learn. Rest, then return."}]});
CHAPTERS.arjuna.push(
 {dest:"The hunter’s challenge",charm:["Boar’s arrow","Lose well, learn more."],scenes:[{bg:"hills",chars:one("arjuna"),cap:"During exile, Arjuna and a forest hunter shoot the same boar and fight over it."},{bg:"glow",chars:one("arjuna","rise"),cap:"Arjuna loses, and then sees the hunter is Shiva. For his courage and humility, Shiva gives him the Pashupata weapon."}]},
 {dest:"Brihannala",charm:["Dancer’s bell","A skill for every season."],scenes:[{bg:"city",chars:one("arjuna"),cap:"In the year of hiding, the great archer lives at King Virata’s court as Brihannala, a dance teacher."},{bg:"glow",chars:one("arjuna","float"),cap:"He teaches music and dance to Princess Uttara. Every skill you learn has its time."}]},
 {dest:"Choosing a friend",charm:["Charioteer’s rein","Wisdom over numbers."],scenes:[{bg:"city",chars:two("krishna","arjuna"),cap:"Before the war, Arjuna and Duryodhana both ask Krishna for help. One can have his army, the other Krishna alone, unarmed."},{bg:"glow",chars:one("arjuna","rise"),cap:"Arjuna chooses Krishna without a second thought. Good counsel is worth an army."}]},
 {dest:"Returning the bow",charm:["Sea-worn string","Skills are borrowed. Let them go."],scenes:[{bg:"sea",chars:one("arjuna"),cap:"Years later, as the Pandavas begin their last journey, Agni asks Arjuna to return the Gandiva."},{bg:"sea",chars:one("arjuna","float"),cap:"He throws the great bow into the sea. What you master, you also learn to put down."}]});
CHAPTERS.dhruva.push(
 {dest:"Coming home",charm:["Glass for a gem","Ask for what matters."],scenes:[{bg:"city",chars:one("dhruva"),cap:"Dhruva comes home and his father runs to hold him."},{bg:"glow",chars:one("dhruva","float"),cap:"In the Bhagavata, he feels he asked God for a throne when he could have asked for so much more."}]},
 {dest:"Bowing to Suruchi",charm:["Bowed head","Forgive the ones who pushed you."],scenes:[{bg:"city",chars:one("dhruva"),cap:"He bows to Suruchi, the stepmother who pushed him away."},{bg:"glow",chars:one("dhruva","rise"),cap:"The hurt that sent him to the forest is gone. He has nothing to prove."}]},
 {dest:"Manu’s counsel",charm:["Manu’s word","Stop when anger takes over."],scenes:[{bg:"hills",chars:one("dhruva"),cap:"When his brother Uttama is killed by a yaksha, King Dhruva goes to war and does not stop."},{bg:"glow",chars:one("dhruva","float"),cap:"His grandfather Manu tells him: enough. Anger is not justice. Dhruva lays down his bow."}]},
 {dest:"The turning sky",charm:["Seven-star ring","Be the fixed point."],scenes:[{bg:"stars",chars:one("dhruva"),cap:"The seven sages, the stars of the Great Bear, circle around the pole star every night."},{bg:"stars",chars:one("dhruva","rise"),cap:"The steady one becomes the centre that others turn around."}]});
CHAPTERS.krishna.push(
 {dest:"Kaliya’s pool",charm:["Peacock feather","Clean water for everyone."],scenes:[{bg:"river",chars:one("krishna"),cap:"The serpent Kaliya poisons a stretch of the Yamuna. Cows and children fall sick."},{bg:"glow",chars:one("krishna","float"),cap:"Krishna dances on Kaliya’s hoods until he gives in, then lets him leave for the sea instead of killing him."}]},
 {dest:"The flute in Vrindavan",charm:["Bamboo flute","Joy calls people together."],scenes:[{bg:"forest",chars:one("krishna"),cap:"When Krishna plays his flute in Vrindavan, cows stop grazing and the gopis leave their work."},{bg:"glow",chars:one("krishna","float"),cap:"The stories say even the river slows down to listen."}]},
 {dest:"Sandipani’s ashram",charm:["Student’s slate","Even Krishna went to school."],scenes:[{bg:"forest",chars:one("krishna"),cap:"In Ujjain, Krishna and Balarama study with the teacher Sandipani. Sudama is their classmate."},{bg:"scroll",chars:one("krishna","rise"),cap:"The Bhagavata says they learned the 64 arts in 64 days. Then Krishna pays his fee: he brings back his teacher’s lost son."}]},
 {dest:"The peace mission",charm:["Five-village scroll","Try peace first."],scenes:[{bg:"city",chars:one("krishna"),cap:"Before the war, Krishna goes to Hastinapura and asks for just five villages for the Pandavas."},{bg:"glow",chars:one("krishna","float"),cap:"Duryodhana refuses to give even a needle’s point of land. Krishna tried. The war that follows is not his choice."}]});
CHAPTERS.lakshmi.push(
 {dest:"Eight forms",charm:["Eight coins","Wealth is more than money."],scenes:[{bg:"glow",chars:one("lakshmi"),cap:"As Ashtalakshmi, she has eight forms: wealth, grain, courage, knowledge, children, victory, patience and more."},{bg:"lamps",chars:one("lakshmi","float"),cap:"Money is only one of them."}]},
 {dest:"Who is awake?",charm:["Moonlit coin","Stay awake to your chances."],scenes:[{bg:"stars",chars:one("lakshmi"),cap:"On Kojagari Purnima, a Bengali and Odia tradition says Lakshmi walks the earth asking: “Ko jagarti?” Who is awake?"},{bg:"glow",chars:one("lakshmi","rise"),cap:"She blesses those who are awake and ready."}]},
 {dest:"The lotus in mud",charm:["Lotus seed","Grow clean from where you are."],scenes:[{bg:"river",chars:one("lakshmi"),cap:"Her lotus grows from mud but stays clean above the water."},{bg:"glow",chars:one("lakshmi","float"),cap:"Earn well, and keep your hands clean doing it."}]},
 {dest:"Dhanteras",charm:["Brass pot","Health is the first wealth."],scenes:[{bg:"sea",chars:one("lakshmi"),cap:"From the same churning ocean rose Dhanvantari, the healer, carrying the pot of nectar."},{bg:"lamps",chars:one("lakshmi","rise"),cap:"He is honoured on Dhanteras, two days before Diwali. Before wealth comes health."}]});
CHAPTERS.durga.push(
 {dest:"Chanda and Munda",charm:["Chamunda’s spark","Fierce when it is needed."],scenes:[{bg:"hills",chars:one("durga"),cap:"Two generals, Chanda and Munda, come to capture her."},{bg:"glow",chars:one("durga","rise"),cap:"Kali springs from her brow and defeats them both. She is named Chamunda."}]},
 {dest:"Raktabija",charm:["Red hibiscus","Deal with the root."],scenes:[{bg:"hills",chars:one("durga"),cap:"Every drop of the demon Raktabija’s blood that touches the ground becomes another demon."},{bg:"glow",chars:one("durga","float"),cap:"Kali catches every drop before it falls. Some problems must be stopped at the root, or they multiply."}]},
 {dest:"Alone",charm:["Single flame","All your strength is yours."],scenes:[{bg:"hills",chars:one("durga"),cap:"The demon king Shumbha mocks her for fighting with the help of other goddesses."},{bg:"glow",chars:one("durga","rise"),cap:"She draws them all back into herself and says: “I am alone here. They were all me.”"}]},
 {dest:"Homecoming",charm:["River clay","Come home, then let go."],scenes:[{bg:"city",chars:one("durga"),cap:"In Bengal, Durga Puja is her yearly visit home to her parents, with her children beside her."},{bg:"river",chars:one("durga","float"),cap:"On the last day her clay image is carried to the river. Welcome fully, and let go fully."}]});
CHAPTERS.nachiketa.push(
 {dest:"Two paths",charm:["Fork stone","The good, not just the pleasant."],scenes:[{bg:"glow",chars:one("nachiketa"),cap:"Yama tells him: there are two paths. Shreyas, the good, and preyas, the pleasant."},{bg:"forest",chars:one("nachiketa","float"),cap:"The wise choose the good. Most choose the pleasant and lose their way."}]},
 {dest:"The chariot",charm:["Chariot rein","Hold the reins."],scenes:[{bg:"hills",chars:one("nachiketa"),cap:"Yama explains: the body is a chariot, the senses are horses, the mind is the reins."},{bg:"glow",chars:one("nachiketa","rise"),cap:"Clear thinking is the driver. Without it, the horses run wherever they want."}]},
 {dest:"Arise, awake",charm:["Razor’s edge","The path is narrow. Walk it."],scenes:[{bg:"stars",chars:one("nachiketa"),cap:"“Arise, awake, and learn from the wise,” the Katha Upanishad says."},{bg:"glow",chars:one("nachiketa","float"),cap:"“The path is as sharp as a razor’s edge.” Hard, but it can be walked."}]},
 {dest:"Home again",charm:["Father’s welcome","Anger can heal."],scenes:[{bg:"city",chars:one("nachiketa"),cap:"Nachiketa returns home. His father’s anger is gone, just as Yama promised."},{bg:"glow",chars:one("nachiketa","rise"),cap:"The boy who was given away in anger comes back as a teacher."}]});
CHAPTERS.vishwakarma.push(
 {dest:"Shaving the sun",charm:["Sun shaving","Nothing is wasted."],scenes:[{bg:"glow",chars:one("vishwakarma"),cap:"His daughter Sanjna cannot bear the blazing heat of her husband, Surya."},{bg:"glow",chars:one("vishwakarma","rise"),cap:"Vishwakarma trims the sun on his lathe. From the shavings he makes Vishnu’s discus and Shiva’s trident."}]},
 {dest:"Puri",charm:["Neem chip","Give work the time it needs."],scenes:[{bg:"city",chars:one("vishwakarma"),cap:"In an Odia legend, an old carpenter agrees to carve Jagannath, if no one opens the door for 21 days."},{bg:"glow",chars:one("vishwakarma","float"),cap:"The worried queen opens it early. The carpenter is gone and the images are unfinished, and they are worshipped that way still."}]},
 {dest:"Nala’s bridge",charm:["Floating stone","Pass your craft on."],scenes:[{bg:"sea",chars:one("vishwakarma"),cap:"His son Nala leads the vanaras in building the bridge to Lanka."},{bg:"bridge",chars:one("vishwakarma","rise"),cap:"A craft passed from parent to child can carry an army across the sea."}]},
 {dest:"Vishwakarma Puja",charm:["Polished tool","Care for what you work with."],scenes:[{bg:"city",chars:one("vishwakarma"),cap:"On Vishwakarma Puja in September, workers clean their tools and machines and honour them."},{bg:"glow",chars:one("vishwakarma","float"),cap:"For a day, the tools rest too."}]});
CHAPTERS.valmiki.push(
 {dest:"The anthill",charm:["Anthill grain","Sit long enough to change."],scenes:[{bg:"forest",chars:one("valmiki"),cap:"The legend says he sat in meditation for so long that an anthill grew over him."},{bg:"glow",chars:one("valmiki","rise"),cap:"In Sanskrit an anthill is valmika. That is how he got his name."}]},
 {dest:"Brahma’s blessing",charm:["Meter cord","Use the gift you were given."],scenes:[{bg:"glow",chars:one("valmiki"),cap:"Brahma appears and tells him: the verse that came from your grief is a gift."},{bg:"scroll",chars:one("valmiki","float"),cap:"Use it to tell Rama’s whole story. So Valmiki begins."}]},
 {dest:"The boys and the horse",charm:["Horse ribbon","Students grow brave."],scenes:[{bg:"forest",chars:one("valmiki"),cap:"Rama’s royal horse wanders near the ashram. In later tellings, Lava and Kusha catch it."},{bg:"glow",chars:one("valmiki","rise"),cap:"Not even Rama’s army can take it back from his students."}]},
 {dest:"The first poet",charm:["Seven-knot cord","One verse at a time."],scenes:[{bg:"scroll",chars:one("valmiki"),cap:"His Ramayana runs to about 24,000 verses in seven books."},{bg:"glow",chars:one("valmiki","float"),cap:"He is called the Adi Kavi, the first poet. It began with one verse."}]});
CHAPTERS.shabari.push(
 {dest:"Fresh garlands",charm:["Unfading garland","Good work stays fresh."],scenes:[{bg:"forest",chars:one("shabari"),cap:"Shabari shows Rama her teachers’ ashram."},{bg:"glow",chars:one("shabari","float"),cap:"The flowers they left years ago have still not faded, the Ramayana says."}]},
 {dest:"Nine kinds of devotion",charm:["Nine beads","Start with good company."],scenes:[{bg:"forest",chars:two("rama","shabari"),cap:"In Tulsidas’s Ramcharitmanas, Rama teaches Shabari nine kinds of devotion."},{bg:"glow",chars:one("shabari","rise"),cap:"The first is simple: keep good company."}]},
 {dest:"The wait is over",charm:["Ember of the ashram","A life complete."],scenes:[{bg:"forest",chars:one("shabari"),cap:"She has met Rama. There is nothing left she is waiting for."},{bg:"glow",chars:one("shabari","rise"),cap:"With his blessing, she leaves this world to join her teachers."}]},
 {dest:"Shabari Dham",charm:["Hill stone","Small lives are remembered."],scenes:[{bg:"hills",chars:one("shabari"),cap:"In the Dangs of Gujarat, many believe a hill called Shabari Dham marks where she met Rama."},{bg:"glow",chars:one("shabari","float"),cap:"Kings are forgotten. An old woman who swept a path is still remembered."}]});

/* ================= #13: festivals Nov 2027 – 2028 ================= */
Object.assign(FEST,{
 "2027-10-31":{n:"Bhai Dooj",d:"भाई दूज",s:"Yamuna welcomes her brother Yama with a meal and a tilak. Siblings honour each other on this last day of Diwali.",t:"Message a sibling or cousin.",approx:true,bg:"river"},
 "2027-11-03":{n:"Chhath Puja",d:"छठ पूजा",s:"Families stand in rivers at sunset and sunrise to thank Surya, the sun, for life on earth.",t:"Watch the sunrise or sunset today, phone in your pocket.",bg:"river"},
 "2027-11-13":{n:"Dev Diwali",d:"देव दीपावली",s:"On the Kartika full moon, the ghats of Varanasi are lit with lamps. Tradition says the gods come down to celebrate Shiva’s victory over Tripurasura.",t:"Light a lamp or candle this evening and sit with it for 2 minutes.",bg:"lamps"},
 "2027-12-03":{n:"Vivah Panchami",d:"विवाह पंचमी",s:"Rama and Sita were married in Mithila on this day, after Rama lifted and broke Shiva’s great bow.",t:"Do one thoughtful thing for your partner or closest person.",approx:true,bg:"city"},
 "2027-12-10":{n:"Gita Jayanti",d:"गीता जयन्ती",s:"Today marks the day Krishna spoke the Bhagavad Gita to Arjuna at Kurukshetra.",t:"Read one verse of the Gita and think about it once today.",approx:true,bg:"scroll"},
 "2028-01-15":{n:"Makar Sankranti",d:"मकर संक्रान्ति",s:"The sun turns north. Bhishma waited on his bed of arrows for this time. Kites fill the sky and til-gud is shared.",t:"Share something sweet and say a kind word with it."},
 "2028-01-31":{n:"Vasant Panchami",d:"वसन्त पंचमी",s:"Spring begins and Saraswati is honoured. Many children write their first letters today, and people wear yellow.",t:"Learn one new thing, however small.",bg:"scroll"},
 "2028-02-23":{n:"Maha Shivaratri",d:"महाशिवरात्रि",s:"The great night of Shiva. Many stay awake in meditation and chanting.",t:"Spend 20 minutes in stillness tonight.",approx:true,bg:"stars"},
 "2028-03-10":{n:"Holi",d:"होली",s:"Prahlada’s faith survives the fire that burns Holika. The next day, colour fills the streets.",t:"Let go of one grudge today.",approx:true},
 "2028-03-26":{n:"Ugadi and Chaitra Navratri",d:"उगादि",s:"New Year in the Deccan, and the start of nine spring nights of the Goddess. People eat a mix of six tastes, because a year brings sweet and bitter alike.",t:"Write one goal for the year ahead.",approx:true},
 "2028-04-03":{n:"Rama Navami",d:"राम नवमी",s:"The birth of Rama in Ayodhya, at noon, in the spring of the year.",t:"Keep one promise today without being reminded.",approx:true,bg:"city"},
 "2028-04-09":{n:"Hanuman Jayanti",d:"हनुमान जयन्ती",s:"In North India, Hanuman’s birth is celebrated on the Chaitra full moon. As a baby he leapt at the sun, thinking it was a fruit.",t:"Do your hardest task first today.",approx:true,bg:"hills"},
 "2028-04-27":{n:"Akshaya Tritiya",d:"अक्षय तृतीया",s:"A day when good work is said never to fade. In one telling, Vyasa begins dictating the Mahabharata to Ganesha.",t:"Start something new.",approx:true,bg:"scroll"},
 "2028-05-08":{n:"Buddha Purnima",d:"बुद्ध पूर्णिमा",s:"The full moon of Vaishakha marks the Buddha’s birth, awakening and passing. He sat under the Bodhi tree and would not move until he understood.",t:"Sit still for 10 minutes and just watch your breath.",approx:true,bg:"forest"},
 "2028-07-06":{n:"Guru Purnima",d:"गुरु पूर्णिमा",s:"A full moon for teachers, linked with the sage Vyasa.",t:"Thank one teacher, past or present.",approx:true},
 "2028-08-05":{n:"Raksha Bandhan",d:"रक्षा बन्धन",s:"Sisters tie a thread on their brothers’ wrists, and the promise of protection goes both ways. In one story, Draupadi tears her sari to bind Krishna’s cut finger, and he never forgets it.",t:"Do one thing to look out for someone close to you.",approx:true},
 "2028-08-13":{n:"Janmashtami",d:"जन्माष्टमी",s:"Krishna is born at midnight in a prison in Mathura and carried across the Yamuna to safety.",t:"Play or listen to one song purely for joy.",bg:"river"},
 "2028-08-23":{n:"Ganesh Chaturthi",d:"गणेश चतुर्थी",s:"Ganesha, remover of obstacles, is welcomed into homes.",t:"Clear one obstacle you have been avoiding.",approx:true},
 "2028-09-19":{n:"Navratri begins",d:"नवरात्रि",s:"Nine nights of the Goddess, ending in her victory over Mahishasura.",t:"Choose one practice to keep for nine days.",approx:true},
 "2028-09-27":{n:"Vijayadashami",d:"विजयादशमी",s:"Rama defeats Ravana and Durga defeats Mahishasura. A traditional day to begin learning.",t:"Begin a new skill today.",approx:true},
 "2028-10-02":{n:"Sharad Purnima",d:"शरद पूर्णिमा",s:"The brightest full moon of the year. Rice pudding is left out in the moonlight, and in Bengal and Odisha Lakshmi is said to ask: who is awake?",t:"Step outside tonight and look at the moon for a minute.",approx:true,bg:"stars"},
 "2028-10-15":{n:"Dhanteras",d:"धनतेरस",s:"Dhanvantari, the healer of the gods, rose from the churning ocean on this day. Families buy one small new metal thing for the home.",t:"Do one thing for your health today.",approx:true,bg:"lamps"},
 "2028-10-17":{n:"Diwali",d:"दीपावली",s:"Rama returns to Ayodhya and the city lights lamps to welcome him home.",t:"Call your family and light a lamp.",bg:"lamps"},
 "2028-10-18":{n:"Govardhan Puja",d:"गोवर्धन पूजा",s:"Krishna lifted Govardhan hill to shelter his village from a storm. Today a ‘mountain’ of food is cooked and shared.",t:"Offer help to someone before they ask.",approx:true,bg:"hills"},
 "2028-10-19":{n:"Bhai Dooj",d:"भाई दूज",s:"Yamuna welcomes her brother Yama with a meal and a tilak. Siblings honour each other on this last day of Diwali.",t:"Message a sibling or cousin.",approx:true,bg:"river"},
 "2028-10-23":{n:"Chhath Puja",d:"छठ पूजा",s:"Families stand in rivers at sunset and sunrise to thank Surya, the sun, for life on earth.",t:"Watch the sunrise or sunset today, phone in your pocket.",approx:true,bg:"river"},
 "2028-11-02":{n:"Kartika Purnima",d:"कार्तिक पूर्णिमा",s:"On this full moon, lamps fill the ghats of Varanasi for Dev Diwali. Tradition says the gods come down to celebrate Shiva’s victory over Tripurasura.",t:"Light a lamp or candle this evening and sit with it for 2 minutes.",bg:"lamps"},
 "2028-11-21":{n:"Vivah Panchami",d:"विवाह पंचमी",s:"Rama and Sita were married in Mithila on this day, after Rama lifted and broke Shiva’s great bow.",t:"Do one thoughtful thing for your partner or closest person.",approx:true,bg:"city"},
 "2028-11-27":{n:"Gita Jayanti",d:"गीता जयन्ती",s:"Today marks the day Krishna spoke the Bhagavad Gita to Arjuna at Kurukshetra.",t:"Read one verse of the Gita and think about it once today.",approx:true,bg:"scroll"}
});

/* ================= #13: generic seasons (for users who pick “Seasons”) ================= */
const SEASONS=[
 {from:"03-01",n:"Spring",d:"",m:"spring",s:"Days grow longer. A good season to start something new and build momentum."},
 {from:"06-01",n:"Summer",d:"",m:"summer",s:"Long light and warm evenings. Train early, rest in the heat, and get outside."},
 {from:"09-01",n:"Autumn",d:"",m:"autumn",s:"The year turns inward. A good season to study and settle into routines."},
 {from:"12-01",n:"Winter",d:"",m:"winter",s:"Short days and cold mornings. Keep your practice small and steady, and keep warm company."}];
