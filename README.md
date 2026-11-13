# plasma-midterm-2026

The midterm topic pages for Introduction to Plasma Physics, 2026. They are served by GitHub Pages.

Each student takes one report topic in class and is given two words. Typing the words on the site opens that topic's
page:

- the question;
- what to explain;
- where to start;
- the task;
- how to hand in.

Reports are handed in on KULMS, not here.

## How it works

- **The pages:** `k/<id>.json` holds one topic page each.
  - Each page is encrypted (AES-GCM) under a key derived from its two words (PBKDF2-SHA-256, 600 000 iterations).
  - The file name comes from the same derivation, so the site holds no list of topics.
- **Nothing about students** is here: no names, no student numbers, no words.
- **Strength:** the words keep the pages out of search engines and away from casual eyes, but they are not strong
  secrets. So the site only ever holds topic text.

## Building

These files are generated, so never edit them by hand. The source is in the course repository (`3_Plasma_Physics`,
`Studio/work/midterm-site/`), which reads the topics from the midterm handout. From the course folder:

```bash
node Studio/work/midterm-site/build.mjs
```

The build writes into this folder. Then commit here and push.

GitHub Pages settings: deploy from the branch `main`, folder `/` (root).
