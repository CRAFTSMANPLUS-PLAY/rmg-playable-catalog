# CRAFTSMAN+ × RMG — Playable Catalog

A curated, self-updating gallery of CRAFTSMAN PLAY playable ads tailored for the Real Money Gaming vertical — covering Casino, Lottery, and Casual categories.

**Live site:** `https://craftsmanplus-play.github.io/RMG-Playable-Catalog/`

---

## How it works

The catalog is a static GitHub Pages site. Each playable loads live via iframe inside a phone shell in the modal view. Thumbnail screenshots are generated automatically via Puppeteer and committed back to the repo.

### Adding a new playable

1. Open `playables.js`
2. Add a new entry to the `PLAYABLES` array:
   ```js
   {
     id: 18,                          // Next sequential ID
     name: "Your Playable Name",
     category: "Casino",              // Casino | Lottery | Casual
     tags: ["slots", "adventure"],
     previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=...",
     thumbnail: "images/your-playable-name.jpg"  // Will be auto-generated
   }
   ```
3. Commit and push to `main`
4. GitHub Actions will automatically detect the change to `playables.js`, run the screenshot script, and commit the new image back to the repo

### Generating screenshots manually

```bash
npm install
npm run screenshots           # Skip existing
npm run screenshots:force     # Regenerate all
```

Or trigger from GitHub Actions UI: **Actions → Generate Playable Screenshots → Run workflow**

### Updating an existing playable name or URL

Edit the entry in `playables.js`, then run `npm run screenshots:force` to regenerate that thumbnail.

---

## Repo structure

```
RMG-Playable-Catalog/
├── index.html              # Main catalog page (GitHub Pages entry point)
├── playables.js            # All playable data — edit this to add/update entries
├── images/                 # Auto-generated screenshots (committed by CI)
│   ├── bison.jpg
│   ├── aztec-gold.jpg
│   └── ...
├── scripts/
│   └── screenshot.js       # Puppeteer automation
├── .github/
│   └── workflows/
│       └── screenshots.yml # GitHub Actions workflow
└── package.json
```

---

## Categories

| Category | Color  | Description |
|----------|--------|-------------|
| Casino   | Gold   | Slots, bingo, social casino |
| Lottery  | Blue   | State lotteries, scratch, plinko |
| Casual   | Green  | Skill games, match mechanics |

---

Built by CRAFTSMAN+ CS · Maintained by Shane Hedengran
