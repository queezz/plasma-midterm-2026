# Publishing the topic site on GitHub Pages

queezz does this once; after that, updates are a single push. About five minutes.

## 1. Make the empty repository on GitHub

Go to <https://github.com/new>:
- **Name:** `plasma-midterm-2026`.
- **Visibility:** Public. Free GitHub Pages needs a public repository, and the pages are encrypted anyway.
- **Leave unticked:** README, .gitignore and licence, so the first push goes in cleanly.
- Click **Create repository**.

## 2. Push from this folder (PowerShell)

```powershell
cd "$env:USERPROFILE\Dropbox\10-Research\00-KYOU\10-Lectures\plasma-midterm-2026"
```

```powershell
git remote add origin https://github.com/queezz/plasma-midterm-2026.git
```

```powershell
git push -u origin main
```

## 3. Turn on Pages

In the repository, open **Settings → Pages**, then:
- **Source:** Deploy from a branch.
- **Branch:** `main`, folder `/ (root)`.
- Click **Save**.

The first deployment takes a minute or two; the **Actions** tab shows "pages build and deployment". The site is then
<https://queezz.github.io/plasma-midterm-2026/>.

## 4. Check it

1. Open the address. You should see only "Your midterm topic" and a box for two words.
2. Type one pair from the course's `Grading/2026/midterm-keys.json`, or from the topic server's CSV export. Its topic
   page should open.
3. Type two wrong words. The page should say "No topic opens with these words".

## Later updates

After an agent rebuilds the site (`node Studio/work/midterm-site/build.mjs` in the course folder) and commits here:

```powershell
git push
```

Or, from Fleet, `fleet push plasma-midterm-2026`.

## If the repository gets another name

The topic server shows students the address, which is `url` in the course's `Studio/work/midterm-site/site.json`. Ask
an agent to change it and rebuild. The words stay the same.
