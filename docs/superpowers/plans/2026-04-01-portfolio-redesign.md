# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing single-page HTML portfolio into a multi-page site with Home, Work, About, and Gallery pages using the coastal redwood design system.

**Architecture:** Extract shared CSS/JS from the monolithic `index.html` into reusable files (`css/shared.css`, `js/shared.js`, `js/projects.js`). Each page is a standalone HTML file that imports shared resources. Data-driven content via JS arrays. No build step, no framework, no dependencies.

**Tech Stack:** Vanilla HTML/CSS/JS, Google Fonts (Instrument Serif + DM Sans), GitHub Pages hosting.

**Spec:** `docs/superpowers/specs/2026-04-01-portfolio-redesign-design.md`

**Existing codebase:** The current `index.html` is a complete single-page portfolio with inline CSS (~310 lines) and inline JS (~190 lines). It uses data-driven rendering (WORK, MEDIA, PROJECTS, TOOLS arrays rendered via template literals). The design system (colors, fonts, animations, responsive breakpoints) is already defined and working.

**Note on innerHTML:** All JS rendering uses innerHTML with author-controlled data arrays (hardcoded in projects.js and gallery.js). No user-generated content exists on this site. This is standard practice for static portfolio sites.

**Important:** This project is static HTML with no test framework or build step. "Testing" means opening the file in a browser and verifying visually. Each task ends with a commit.

---

## File Structure

```
Portfolio/
  index.html              -- Home page (rewrite of existing)
  work.html               -- Work page (new)
  about.html              -- About page (new)
  gallery.html            -- Gallery page (new)
  css/
    shared.css             -- Design system extracted from index.html
  js/
    shared.js              -- Nav + scroll + fade-up observer
    projects.js            -- Project data arrays (Home + Work)
    gallery.js             -- Gallery data + masonry + lightbox
  assets/
    photos/                -- Photography images (user-provided later)
    art/                   -- Digital art images (user-provided later)
    projects/              -- Project screenshots (user-provided later)
  Portfolio 2/             -- Keep (existing, unchanged)
  Portfolio 3/             -- Keep (existing, unchanged)
  docs/                    -- Keep (specs + plans)
```

---

### Task 1: Extract shared CSS into `css/shared.css`

**Files:**
- Create: `css/shared.css`

This extracts all CSS from the current `index.html` into a standalone file. The CSS is copied verbatim with additions for: multi-page nav active state, work-item list layout, values section, masonry gallery grid, and lightbox overlay.

- [ ] **Step 1: Create the `css/` directory**

Run: `mkdir -p css`

- [ ] **Step 2: Create `css/shared.css`**

Copy the full design system from `index.html` lines 13-318 (everything inside `<style>`) into `css/shared.css`. Then add the following new styles at the end (before the responsive section):

New styles to add for work-item list:
```css
.work-item {
  display: grid; grid-template-columns: 1fr auto; gap: 16px;
  padding: 26px 0;
  border-bottom: 1px solid #eae7e3;
  align-items: start;
}
.work-item:last-child { border-bottom: none; }
.work-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 22px; font-weight: 400; margin-bottom: 6px;
  letter-spacing: -0.01em;
}
.work-desc { font-size: 15px; font-weight: 300; line-height: 1.65; color: var(--text-soft); }
.work-tag {
  font-size: 10px; font-weight: 600; letter-spacing: 0.07em;
  text-transform: uppercase; color: var(--text-muted);
  white-space: nowrap; padding-top: 8px;
}
.work-link {
  display: inline-block; margin-top: 8px;
  font-size: 13px; font-weight: 500; color: var(--green);
  border-bottom: 1px solid var(--green);
  padding-bottom: 1px; transition: opacity 0.2s;
}
.work-link:hover { opacity: 0.7; }
```

New styles to add for values section:
```css
.values-grid { display: flex; flex-direction: column; gap: 32px; margin-top: 8px; }
.value-item { display: flex; gap: 16px; }
.value-emoji { font-size: 24px; flex-shrink: 0; padding-top: 2px; }
.value-content h3 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 20px; font-weight: 400; margin-bottom: 4px;
}
.value-content p { font-size: 15px; font-weight: 300; line-height: 1.65; color: var(--text-soft); }
```

New styles to add for masonry gallery:
```css
.masonry { columns: 3; column-gap: 16px; }
.masonry-item {
  break-inside: avoid; margin-bottom: 16px;
  border-radius: 12px; overflow: hidden; cursor: pointer;
  transition: all 0.3s ease; border: 2px solid transparent;
}
.masonry-item:hover {
  border-color: var(--green-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(90,122,90,0.1);
}
.masonry-item img { width: 100%; height: auto; display: block; }
```

New styles to add for lightbox:
```css
.lightbox {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(26,24,20,0.92);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
}
.lightbox.active { opacity: 1; pointer-events: all; }
.lightbox img {
  max-width: 90vw; max-height: 85vh; border-radius: 8px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.4);
}
.lightbox-close {
  position: absolute; top: 24px; right: 28px;
  font-size: 28px; color: #fff; cursor: pointer;
  background: none; border: none; opacity: 0.7; transition: opacity 0.2s;
}
.lightbox-close:hover { opacity: 1; }
.lightbox-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  font-size: 36px; color: #fff; cursor: pointer;
  background: none; border: none; opacity: 0.5; transition: opacity 0.2s; padding: 16px;
}
.lightbox-nav:hover { opacity: 1; }
.lightbox-prev { left: 16px; }
.lightbox-next { right: 16px; }
```

Add to the 860px responsive breakpoint:
```css
.work-item { grid-template-columns: 1fr; gap: 4px; }
.masonry { columns: 2; }
```

Add to the 520px responsive breakpoint:
```css
.masonry { columns: 1; }
```

Also update `.nav-logo` to be a link (add `text-decoration: none; color: var(--text);`).

- [ ] **Step 3: Commit**

```bash
git add css/shared.css
git commit -m "extract: shared CSS design system from index.html"
```

---

### Task 2: Extract shared JS into `js/shared.js`

**Files:**
- Create: `js/shared.js`

This extracts the nav scroll behavior and fade-up IntersectionObserver from `index.html` into a reusable module.

- [ ] **Step 1: Create the `js/` directory**

Run: `mkdir -p js`

- [ ] **Step 2: Create `js/shared.js`**

```js
// Nav scroll behavior + fade-up observer
document.addEventListener('DOMContentLoaded', function() {
  var nav = document.getElementById('nav');

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Scroll-triggered fade-in
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(function(el) {
    observer.observe(el);
  });
});
```

- [ ] **Step 3: Commit**

```bash
git add js/shared.js
git commit -m "extract: shared JS (nav scroll + fade-up observer)"
```

---

### Task 3: Create project data in `js/projects.js`

**Files:**
- Create: `js/projects.js`

Contains all project data used by both the Home page (featured cards) and Work page (full list). Updated content reflecting current project state from the deep-dive reviews.

- [ ] **Step 1: Create `js/projects.js`**

```js
// Featured projects shown on Home page (3-4 max)
var FEATURED_PROJECTS = [
  {
    emoji: '\u270D\uFE0F',
    title: 'PlotFirst',
    tag: 'SaaS \u2014 Live',
    desc: 'AI-powered world-building and story planning tool. 13 generation modules, visual story graph, campaign simulation, heraldry builder. React + Express + Postgres + multi-provider AI.',
    link: 'https://plotfirst.app/',
    image: 'assets/projects/plotfirst.png',
    imageAlt: 'PlotFirst \u2014 world-building interface',
  },
  {
    emoji: '\uD83C\uDFDB\uFE0F',
    title: 'Mythic Grounds',
    tag: 'Directory \u2014 Live',
    desc: 'Sacred sites and mythology directory with 154 entries across 32 cultures. Interactive map, bookmarks, Near Me search. Next.js + Neon Postgres.',
    link: 'https://mythicgrounds.com/',
    image: 'assets/projects/mythicgrounds.png',
    imageAlt: 'Mythic Grounds \u2014 sacred sites directory',
  },
  {
    emoji: '\uD83E\uDDED',
    title: 'Volta do Mar',
    tag: 'Game \u2014 In Progress',
    desc: '3D island exploration game about ecological restoration. BOTW-inspired atmosphere with Gerstner ocean, day/night cycle, and harvestable flora. Godot 4.6.',
    image: 'assets/projects/volta.png',
    imageAlt: 'Volta do Mar \u2014 island exploration',
  },
  {
    emoji: '\uD83D\uDCC8',
    title: 'Arkhe',
    tag: 'SaaS \u2014 Live',
    desc: 'Profitability tracker for indie developers. Project P&L, 22-point launch checklist, XP gamification, 60+ developer tools directory. React + Supabase + Stripe.',
    link: 'https://arkhe.live/',
    image: 'assets/projects/arkhe.png',
    imageAlt: 'Arkhe \u2014 indie dev profitability tracker',
  },
];

// All projects for Work page, grouped by status
var SHIPPED_PROJECTS = [
  {
    title: 'PlotFirst',
    tag: 'SaaS \u2014 Live',
    desc: 'AI-powered world-building and story planning tool. 13 generation modules, visual story graph, campaign simulation, heraldry builder, 14 themes, 18 languages. React + Express + Postgres + multi-provider AI.',
    link: 'https://plotfirst.app/',
  },
  {
    title: 'Arkhe',
    tag: 'SaaS \u2014 Live',
    desc: 'Profitability tracker for indie developers. Project P&L tracking, 22-point launch checklist, XP gamification, 60+ developer tools directory, 6 visual themes, command palette. React + Supabase + Stripe.',
    link: 'https://arkhe.live/',
  },
  {
    title: 'Mythic Grounds',
    tag: 'Directory \u2014 Live',
    desc: 'Sacred sites and mythology directory. 154 entries across 32 cultures, interactive Leaflet map, bookmarks, Near Me geolocation search, AdSense monetization. Next.js + Neon Postgres.',
    link: 'https://mythicgrounds.com/',
  },
];

var IN_PROGRESS_PROJECTS = [
  {
    title: 'Volta do Mar',
    tag: 'Game \u2014 In Progress',
    desc: '3D island exploration game about ecological restoration. Gerstner ocean shader, day/night cycle, harvestable flora system, caldera lake and waterfall. Godot 4.6 + Terrain3D.',
  },
  {
    title: 'Zen Garden',
    tag: 'Game \u2014 In Progress',
    desc: 'Mobile satisfaction game. Sand raking, stone placement, bonsai trimming. Hybrid-casual with progression and unlockables. Godot 4.6, targeting Google Play with AdMob.',
  },
  {
    title: 'SolBot',
    tag: 'Automation \u2014 Active',
    desc: 'Autonomous Solana trading bot. 5 strategy engines, Alpha Radar scoring, multi-layer rug-pull detection, AI portfolio manager with dynamic rebalancing. Node.js + Express.',
  },
];

var WRITING_PROJECTS = [
  {
    title: 'Wars of the Diadochi',
    tag: 'Fiction \u2014 Ongoing',
    desc: 'Historical fan fiction exploring the successor wars after Alexander the Great. Where history, ambition, and human drama collide.',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add js/projects.js
git commit -m "add: project data arrays for Home + Work pages"
```

---

### Task 4: Create asset directories

**Files:**
- Create: `assets/photos/.gitkeep`
- Create: `assets/art/.gitkeep`
- Create: `assets/projects/.gitkeep`

- [ ] **Step 1: Create directories with .gitkeep files**

```bash
mkdir -p assets/photos assets/art assets/projects
touch assets/photos/.gitkeep assets/art/.gitkeep assets/projects/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add assets/photos/.gitkeep assets/art/.gitkeep assets/projects/.gitkeep
git commit -m "add: asset directories for gallery and project screenshots"
```

---

### Task 5: Rewrite Home page (`index.html`)

**Files:**
- Modify: `index.html` (full rewrite)

Replace the monolithic single-page portfolio with a clean Home page that imports shared CSS/JS and renders only hero + featured project cards. Project images that don't exist yet are hidden gracefully via an onerror handler on each img tag.

- [ ] **Step 1: Rewrite `index.html`**

The new Home page structure:
- `<head>`: Google Fonts preconnect + link, shared.css link
- `<nav>`: Logo links to index.html, nav links to work/about/gallery/contact
- `<header class="hero">`: Updated headline ("Building at the intersection of product & play"), casual sub ("Hey — I'm Mario..."), availability badge
- `<section id="projects">`: Rendered from FEATURED_PROJECTS array via inline script
- `<footer>`: Copyright + project links + email
- `<script>`: projects.js, shared.js, then inline render script

Key changes from existing index.html:
- Remove all inline CSS (now in css/shared.css)
- Remove all inline data arrays (WORK, MEDIA, PROJECTS, TOOLS — now in projects.js or page-specific)
- Remove work timeline, education, media training, tools sections (moved to about.html)
- Update hero text from "Educator, creator, aspiring developer" to "Building at the intersection of product & play"
- Update sub text to casual tone: "Hey — I'm Mario..."
- Nav links: Work, About, Gallery, Contact (replacing Work, Projects, Tools, About)
- Logo changes from `<span>` with onclick to `<a href="index.html">`
- Footer adds Mythic Grounds link
- Project cards use onerror to hide missing images gracefully

- [ ] **Step 2: Open `index.html` in browser and verify**

Open `file:///C:/Users/maram/Dev/Portfolio/index.html` in browser. Check:
- Nav renders with Work, About, Gallery, Contact links
- Hero text animates in with staggered fade-up
- "Open to opportunities" badge pulses
- 4 project cards render (images will hide gracefully if not yet present)
- Footer shows with project links
- Responsive: resize window to check mobile layout

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "rewrite: Home page with updated hero, featured projects, multi-page nav"
```

---

### Task 6: Create Work page (`work.html`)

**Files:**
- Create: `work.html`

Text-based project list grouped by status (Shipped, In Progress, Writing). Uses work-item layout from shared.css and project data from projects.js.

- [ ] **Step 1: Create `work.html`**

Structure:
- Same `<head>` as index.html (fonts + shared.css)
- `<nav>`: Same nav, with `class="active"` on the Work link
- `<header class="hero">`: Title "Work", sub text about building things that feel alive, divider
- Three `<section>` elements with section-labels: "Shipped", "In Progress", "Writing"
- Each section has a container div rendered from the corresponding projects.js array
- Inline render function `renderWorkList(items)` creates work-item divs with title, desc, tag, and optional visit link
- Same footer as index.html

- [ ] **Step 2: Open `work.html` in browser and verify**

Check:
- "Work" nav link has green underline (`.active` class)
- Three sections: Shipped (3 items), In Progress (3 items), Writing (1 item)
- Live projects show "Visit" links
- Responsive layout works on mobile

- [ ] **Step 3: Commit**

```bash
git add work.html
git commit -m "add: Work page with grouped project list"
```

---

### Task 7: Create About page (`about.html`)

**Files:**
- Create: `about.html`

Personal story, values, background timeline, education, media training, tools, and contact info.

- [ ] **Step 1: Create `about.html`**

Structure:
- Same `<head>` (fonts + shared.css)
- `<nav>`: Same nav, `class="active"` on About link
- `<header class="hero">`: Title "About", divider
- `<section>` with about-grid: left column = 4 paragraphs (Hey intro, education background, now builds software, hobbies), right column = about-meta (Location, Email with mailto link, GitHub link, Twitch link)
- `<section>` "What I Value": values-grid with 3 value-items, each with emoji + h3 + p (leaf/Build things that feel alive, pencil/Ship then polish, wave/Stay close to the material)
- `<section>` "Background": 3 timeline-items (Independent Developer 2024-Present, Educator 2017-2024, Shift Lead Previously)
- Education subsection: B.A. International Relations, UC Davis
- Media Training subsection: Broadcasting at Ohlone College, CTS Media at UC Davis
- `<section>` "Tools & Software": tool chips rendered from inline TOOLS array (Development, Creative & Media, Product & Workflow)
- Same footer

- [ ] **Step 2: Open `about.html` in browser and verify**

Check:
- "About" nav link highlighted
- Personal intro with two-column layout (text left, meta right)
- Values section with leaf/pencil/wave emojis
- Background timeline renders correctly
- Education and media training sections
- Tool chips render in three groups
- Responsive: single column on mobile

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "add: About page with intro, values, background, tools"
```

---

### Task 8: Create Gallery page (`gallery.html`) with lightbox

**Files:**
- Create: `gallery.html`
- Create: `js/gallery.js`

Masonry image grid with Photography and Digital Art sections, plus a lightbox overlay for fullscreen viewing. The gallery data arrays start empty with placeholder "Coming soon." text — the user will add images later.

- [ ] **Step 1: Create `js/gallery.js`**

Contains:
- `PHOTOGRAPHY` array (starts empty, user adds `{ src, alt }` objects later)
- `DIGITAL_ART` array (starts empty)
- `renderMasonry(containerId, items)` function: if items empty, shows "Coming soon." in muted text; otherwise renders masonry-item divs with data-index and data-section attributes
- DOMContentLoaded listener that:
  - Sets up lightbox open/close/navigate functions
  - Delegates click events on `.masonry-item` to open lightbox with correct items array
  - Wires lightbox-close, lightbox-prev, lightbox-next buttons
  - Handles click-on-backdrop to close
  - Handles keyboard: Escape closes, ArrowLeft/ArrowRight navigates
  - Calls renderMasonry for both grids

- [ ] **Step 2: Create `gallery.html`**

Structure:
- Same `<head>` (fonts + shared.css)
- `<nav>`: Same nav, `class="active"` on Gallery link
- `<header class="hero">`: Title "Gallery", sub text ("When I'm not building..."), divider
- `<section>` "Photography": div with `id="photo-grid"` and class `masonry fade-up`
- `<section>` "Digital Art": div with `id="art-grid"` and class `masonry fade-up`
- Lightbox overlay div with id="lightbox", containing close button, prev/next nav buttons, and img element
- Same footer
- Scripts: gallery.js then shared.js

- [ ] **Step 3: Open `gallery.html` in browser and verify**

Check:
- "Gallery" nav link highlighted
- Photography and Digital Art sections show "Coming soon." placeholders
- Page styling consistent with other pages
- Lightbox elements present in DOM (will function when images are added)

- [ ] **Step 4: Commit**

```bash
git add gallery.html js/gallery.js
git commit -m "add: Gallery page with masonry grid and lightbox"
```

---

### Task 9: Clean up old files

**Files:**
- Delete: `Portfolio 2/` directory
- Delete: `Portfolio 3/` directory
- Delete: `portfolio.jsx`
- Delete: `PortfolioStyles.tsx`
- Delete: `framer-setup-guide.md`
- Delete: `NotionPortfolio.md`
- Move: `assets/plotfirst-volta-world.png` to `assets/projects/plotfirst.png`
- Move: `assets/arkhe-code-snippets.png` to `assets/projects/arkhe.png`

- [ ] **Step 1: Confirm with user before deleting**

Ask: "I'm about to remove the old portfolio drafts (Portfolio 2/, Portfolio 3/, portfolio.jsx, PortfolioStyles.tsx, framer-setup-guide.md, NotionPortfolio.md). The new site replaces all of these. OK to delete?"

Wait for confirmation. Do not proceed without it.

- [ ] **Step 2: Remove old files (only after user confirms)**

```bash
cd "C:/Users/maram/Dev/Portfolio"
git rm -r "Portfolio 2/" "Portfolio 3/" portfolio.jsx PortfolioStyles.tsx framer-setup-guide.md NotionPortfolio.md
```

- [ ] **Step 3: Move existing screenshots to new assets directory**

```bash
cd "C:/Users/maram/Dev/Portfolio"
mv assets/plotfirst-volta-world.png assets/projects/plotfirst.png
mv assets/arkhe-code-snippets.png assets/projects/arkhe.png
git add assets/
```

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/maram/Dev/Portfolio"
git add -A
git commit -m "cleanup: remove old portfolio drafts, move screenshots to assets/projects/"
```

---

### Task 10: Final verification and deploy

- [ ] **Step 1: Test all pages in browser**

Open each page and verify:
- `index.html` — Hero animates, 4 project cards render, nav links work to all pages
- `work.html` — 3 project groups render, "Work" is active in nav, Visit links open in new tab
- `about.html` — Intro, values, timeline, tools, contact all render, "About" is active
- `gallery.html` — Both sections show "Coming soon.", "Gallery" is active
- All pages: nav links navigate correctly between pages, footer is consistent, responsive layout works at 860px and 520px breakpoints

- [ ] **Step 2: Push to GitHub Pages**

```bash
cd "C:/Users/maram/Dev/Portfolio"
git push origin main
```

- [ ] **Step 3: Verify live site**

Visit the GitHub Pages URL and check all four pages load correctly with styles and scripts.
