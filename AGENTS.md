# Agent entry point

This repository is build output: the static midterm-topic site of the Plasma Physics course, 2026. queezz publishes it
on GitHub Pages, and the pushes are his.

- **Never edit the site files by hand:** `index.html`, `app.js`, `style.css`, `favicon.svg`, `.nojekyll`, `k/`.
  - Change `Studio/work/midterm-site/` in the course repository, the sibling folder `3_Plasma_Physics`.
  - Rebuild from there with `node Studio/work/midterm-site/build.mjs`. The build writes into this folder.
  - Then commit here.
- **No student data ever comes here:** no names, no student numbers, no topic words. The words live only in the
  course's git-ignored `Grading/` folder. The build refuses to finish if a student number appears in the site.
- **Rules:** the course's `AGENTS.md` applies. Its `Grades/` and `Homeworks/` are never read or listed.
- **Commits** end with a bare `agent: <model>` line.
- **History:** the course's `.agents/log/2026-11-13-lecture6-cut-midterm-topics.md`.
