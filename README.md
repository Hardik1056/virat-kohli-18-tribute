# 18 | ONE LAST CHAPTER
### Cinematic Tribute & Archival Retrospective for Virat Kohli

An editorial, obsidian-and-gold digital experience chronicling the career, landmark innings, statistics, and remaining matches of modern cricket legend **Virat Kohli**.

---

## 🌟 Highlights

- **12 Curated Chapters & Dossiers**:
  1. `01 — HERO`: Landing & cinematic opening sequence.
  2. `02 — STATS`: Interactive Test, ODI, and T20I record books with career matrix & captaincy ledger. Verified via ESPNcricinfo & Cricbuzz (*Strictly pure international records — zero IPL statistics*).
  3. `03 — EDITORIAL`: Deep retrospective essay on Kohli's chase mentality and legacy.
  4. `04 — JOURNEY`: Interactive horizontal timeline from 2008 U19 triumph to 2024 T20 World Cup victory.
  5. `05 — THE INNINGS`: 7 canonical knocks with authentic photo gallery (Hobart, Melbourne, Edgbaston, Mohali, Dhaka, Wankhede 50th century, Eden Gardens 49th century).
  6. `06 — REMAINING ODIS`: Real-time countdown to the final ODI engagements on the road to 2027.
  7. `07 — WORLD CUP 2027`: Interactive countdown to South Africa / Zimbabwe / Namibia.
  8. `08 — 82* MELBOURNE`: Deep dive ball-by-ball autopsy of the greatest T20I innings ever played.
  9. `09 — MATCH DETAILS`: Tactical breakdown of India vs Australia.
  10. `10 — BE THERE`: Global stadium booking & venue experience dossiers.
  11. `11 — WE WERE THERE`: Crowd memories, keepsake submissions, and fan archive.
  12. `12 — KEEPSAKE GENERATOR`: Custom souvenir ticket & digital memorabilia generator.

- **Obsidian & Gold Design System**:
  - Deep OLED blacks (`#0a0a0a`), warm gold accents (`#cda851`), raw amber badges (`#ffb800`).
  - Strict WCAG AA contrast compliance across light and dark tokens.
  - Pre-compiled production Tailwind CSS bundle with zero client runtime overhead.
  - Fully responsive from mobile viewports (390px) to ultra-wide 4K displays.
  - Built-in global sticky navigation drawer, search modal, and offline fallback menu.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install optional dev dependencies (Tailwind compiler)
npm install

# 2. Run local development server (defaults to port 3018)
npm run dev

# 3. Or use standard static server
npm run serve

# 4. Run automated pre-flight audit
npm run check
```

---

## 📦 Deployment Options

The project is structured as a zero-dependency static web application, ready to deploy instantly to any modern hosting platform:

### 1. Vercel (Recommended)
Configuration already included in [`vercel.json`](./vercel.json) with pretty URLs (`/stats`, `/innings`, `/journey`, etc.) and immutable asset caching.
```bash
npx vercel
```
*Production build command: `npm run build` | Output directory: `.`*

### 2. Netlify
Configuration already included in [`netlify.toml`](./netlify.toml) with automatic redirects and cache rules.
```bash
npx netlify deploy --prod
```

### 3. GitHub Pages
1. Initialize git and commit:
```bash
git init
git add .
git commit -m "feat: initial commit of 18 One Last Chapter tribute"
git branch -M main
git remote add origin https://github.com/<your-username>/virat-kohli-tribute.git
git push -u origin main
```
2. In your GitHub repository settings, navigate to **Pages** → Source: **Deploy from a branch** → Branch: `main` / `root`.

### 4. Firebase Hosting
```bash
npx -y firebase-tools init hosting
# Select existing or new project, public directory: . (or build)
npx -y firebase-tools deploy --only hosting
```

---

## 🛡️ Pre-Flight Verification

Run the built-in integrity test before any production release:
```bash
npm run check
```
Verifies:
- All 14 HTML pages and shared JS/CSS assets are present and non-empty.
- All 300+ local images, fonts, and hyperlinks resolve to existing assets.
- Proper SEO meta tags (`title`, `description`, `canonical`, `og:title`, `og:image`, `viewport`).
- Routing rewrites in `vercel.json` and `netlify.toml`.
- Well-formed `sitemap.xml` and `robots.txt`.
- Domain policy verification (strict international cricket data).

---

## 🏏 License
Archival and fan tribute project. Images and statistical marks are property of their respective copyright holders (ESPNcricinfo, Cricbuzz, Getty Images / Associated Press).
