# Abhyasa · अभ्यास

Steady practice over a long time. A daily practice app with guides from the Puranas: Hanuman for Body, Rama for Bonds and Narada for Music.

It is a Progressive Web App (PWA): a website that installs on your phone like an app, works offline and updates itself when you publish a new version. It has no server and no account, and data stays on the device.

## Folder structure

```
abhyasa-app/
├─ index.html              App shell (rarely changes)
├─ manifest.webmanifest    App name, colours and icons for installing
├─ sw.js                   Service worker: offline mode and updates
├─ css/app.css             All styles
├─ css/fonts.css           Bundled fonts (files in fonts/, SIL Open Font License)
├─ js/content.js           ALL CONTENT: paths, tasks, skills, stories, chapters, festivals
├─ js/app.js               App logic
├─ icons/                  App icons (icon.svg is the source)
├─ tools/bump_version.py   Release helper
├─ tools/build_preview.py  Builds a single-file preview in dist/
└─ CHANGELOG.md
```

## 1. Try it on your computer

The service worker only runs on `localhost` or `https`, so open the app through a local server rather than by double-clicking the file:

```bash
cd abhyasa-app
python -m http.server 8000
```

Then open http://localhost:8000 in Chrome. Use the device toolbar (F12, then the phone icon) to see it at phone size.

## 2. Publish it for free (GitHub Pages)

1. Create an empty repository on GitHub, for example `abhyasa`.
2. In the `abhyasa-app` folder:
   ```bash
   git init
   git add .
   git commit -m "Abhyasa 1.0.0"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/abhyasa.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, then branch `main` and folder `/ (root)`. Save.
4. After a minute or two the app is live at `https://YOUR-USERNAME.github.io/abhyasa/`.

Alternative without git: drag the `abhyasa-app` folder onto https://app.netlify.com/drop.

## 3. Install it on your phone

- **Android (Chrome):** open the link, then tap **Install** in the banner, or open the menu and choose **Install app**. The Hero tab also has an Install button.
- **iPhone (Safari):** open the link, tap **Share**, then **Add to Home Screen**.

## 4. Release an update

1. Edit what you need, usually `js/content.js`.
2. Test locally (step 1).
3. Bump the version. This is the step that tells installed phones an update exists:
   ```bash
   python tools/bump_version.py 1.1.0 "Added Spirit path and 10 new tasks"
   ```
4. Commit and push:
   ```bash
   git add .
   git commit -m "Abhyasa 1.1.0"
   git push
   ```
5. Open the app on your phone. Within about an hour, or on the next launch, a bar appears: **"A new version of Abhyasa is ready" → Update**.

If you skip step 3, phones keep showing the old cached version.

Use `1.0.1` for small fixes, `1.1.0` for new content or features, and `2.0.0` for big changes.

## 5. Adding content (`js/content.js`)

Everything below lives in `js/content.js`. Copy an existing entry and change it, keeping the commas and brackets.

**A daily task.** Add to a path's `pool`:
```js
X("Plank, 3 × 45 sec",10,{tags:"strength|climb",lo:1,hi:4,place:"any",en:2,load:["push"],
  g:["Elbows under shoulders","Squeeze glutes","Rest 30 sec between"],
  tool:{type:"intervals",work:45,rest:30,rounds:3}})
```
- `tags`: which focus areas it serves (from the path's `tags` list), or `any`.
- `lo`/`hi`: the range of levels (0–4) where it appears.
- `place`: `any`, `home`, `out`, `gym`, `pool` or `wall`. `needs`: kit ids such as `["gym"]`.
- `en`: energy 1 (light) to 3 (hard). `load`: `push`, `pull`, `grip`, `legs`, `cardio` or `mobility`. These drive the "why today" rules and soreness filtering.
- `g`: guide steps. `tool`: `timer` `{sec}`, `intervals` `{work,rest,rounds}`, `metronome` `{bpm}`, `breath` `{in,hold,out}` or `counter` `{target,label,step}`.
- Extras: `songs:true` shows the song list, `raga:true` shows the raga for the time of day, `call:true` marks a call (used for the India time hint), and `quiet:true` marks a task suitable late at night.

**A festival.** Add to `FEST` with the date as `YYYY-MM-DD`:
```js
"2027-11-08":{n:"Bhai Dooj",d:"भाई दूज",s:"One or two sentences of the story.",t:"One small action for today.",bg:"lamps"}
```
Add `approx:true` if the date isn't confirmed. The `bg` options are `hills`, `glow`, `bridge`, `clouds`, `river`, `scroll`, `lamps`, `rivers`, `sea`, `forest`, `city` and `stars`.

**A daily anecdote** (shown on days without a festival). Add to `ANEC`:
```js
{n:"Title",s:"Two sentences in your own words.",t:"Try today: …",src:"Source text",bg:"forest"}
```

**A journey chapter.** Add to a guide's list in `CHAPTERS`, with two scenes and a charm:
```js
{dest:"Place name",charm:["Charm name","One-line meaning."],scenes:[
  {bg:"sea",chars:one("hanuman"),cap:"First scene caption."},
  {bg:"glow",chars:one("hanuman","float"),cap:"Second scene caption."}]}
```

**A bridge story.** Edit `STORIES`. Each scene uses `bg`, `chars` (`[who, x, y, scale, animation]`), `cap` and optional `notes:[[x,y]]`.

**Quotes and guide lines.** Edit `QUOTES` and `GUIDE_LINES`.

### Adding a new path (for example Friendship, with Krishna)

Paths sit inside five realms (`REALMS`): Body, Bonds, Craft, Joy and Peace. Users focus on up to 5 paths at a time.
1. In `content.js`, add a `PATHS.friend` entry shaped like the others, with `realm:"bonds"`, plus levels, tags, skills, trials and a pool. Add `"friend"` to `ORDER` and remove it from `SOON`.
2. Add the guide to `CHAR` and `PEOPLE` (with `pr:"he"` or `pr:"she"`), add 5 lines to `GUIDE_LINES` and about 4 entries to `CHAPTERS`. Optionally add it to `RELATED` so the app can suggest it as a next step.
3. In `app.js`, add a portrait for the guide in `portraitG()` and an icon in `ICO`. In `css/app.css`, add a colour token like `--friend` in both the light and dark blocks.
4. Bump the version as `1.x.0`.

## 6. Your data

- Progress is stored in the browser on that device (`localStorage`, key `abhyasa.v3`). Nothing is sent anywhere.
- **Hero → App → Save a backup** downloads a `.json` file. **Restore a backup** loads it on another phone.
- If you change the shape of saved data in a future version, raise `SCHEMA` in `app.js` and add a step to `migrate()`, so existing users keep their progress.

## 7. Roadmap ideas

| Feature | What it needs |
|---|---|
| Notifications ("your companion is back") | A small push server, for example Firebase Cloud Messaging. On iPhone, web push only works for apps added to the Home Screen (iOS 16.4 and later). |
| Sync across devices and accounts | A backend such as Supabase or Firebase. |
| Sangha (community) | Accounts plus a backend, and moderation. |
| App Store and Play Store | Wrap this same code with Capacitor. Needs developer accounts: Apple charges USD 99 per year, Google a one-time USD 25. |
| Home-screen widget | A native app (via Capacitor plus native widget code). |

## Credits and notes

- Stories are condensed retellings. Valmiki episodes, later tellings and folk tales are labelled in the text. Have someone who knows the texts well review them before a public launch.
- Festival dates from November to December 2026 come from Drik Panchang. Dates for 2027 are approximate and marked `approx:true` until the official panchang is out.
- Fonts: Inter, Literata and Tiro Devanagari Hindi, bundled in `fonts/` from Fontsource (SIL Open Font License). The app makes no requests to Google or any other outside server.
- Feedback: set `FEEDBACK_EMAIL` at the bottom of `js/content.js` to add an Email button to the feedback sheet. Share and Copy always work.
