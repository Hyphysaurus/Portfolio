# Portfolio Redesign — Design Spec

**Date:** 2026-04-01
**Approach:** Evolve Version 2 (sage green HTML site) into a multi-page portfolio on GitHub Pages
**Inspiration:** erichishinuma.com — minimalist, warm, text-first, multi-page
**Design identity:** Coastal redwood — warm cream, sage green, serif + sans-serif, nature-inspired

---

## Site Structure

**Pages:**
- `index.html` — Home (hero + selected projects)
- `work.html` — Full project catalog
- `about.html` — Personal story, values, timeline, tools, contact
- `gallery.html` — Photography + digital art

**Navigation** (persistent across all pages):
- Top-left: `Mario R.` (logo, links home)
- Top-right: `Work` · `About` · `Gallery` · `Contact` (mailto button)
- Frosted glass effect on scroll (existing behavior)
- Mobile: hide text links, show Contact button only (existing behavior)

**Footer** (shared):
- `(c) Mario Ramirez 2026` + links to live projects + email

---

## Design System (carried from Version 2)

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FAF9F7` | Page background |
| `--text` | `#2A2A2A` | Primary text |
| `--text-soft` | `#6B6560` | Secondary text |
| `--text-muted` | `#8A8580` | Tertiary/labels |
| `--green` | `#5A7A5A` | Accent, links, buttons |
| `--green-light` | `#C5D8C0` | Dividers, borders |
| `--green-hover` | `#E8F0E4` | Card hover state |
| `--green-chip` | `#E4EDDF` | Tool chips |
| `--green-border` | `#8AAD8A` | Button borders |
| `--green-divider` | `#B5CCB0` | Section dividers |
| `--card-bg` | `#F4F2EF` | Card surfaces |

### Typography
- **Headlines:** Instrument Serif (Google Fonts)
- **Body/UI:** DM Sans (Google Fonts)
- **Sizes:** clamp-based responsive for hero, fixed for body

### Animations
- Fade-up on scroll (IntersectionObserver, existing)
- Line draw for section dividers (existing)
- Staggered hero text entrance (existing)
- Card hover: translateY(-3px) + green tint + shadow

### Shared Components
- Section label with green uppercase text + horizontal rule
- Frosted glass nav with scroll detection
- Minimal footer with copyright + links

---

## Page 1: Home (`index.html`)

### Hero
```
Mario Ramirez

Building at the intersection
of product & play

Hey -- I'm Mario. Former educator, now building software,
games, and creative tools. I like things that feel alive.

[green dot] Open to opportunities
```
- Staggered fade-up animation on headline spans
- Italic accent on key word (e.g., "intersection" or "play") in `--green`
- Casual one-liner replaces formal bio paragraph
- "Open to opportunities" badge with pulse animation
- Green divider line below hero

### Selected Projects (3-4 cards)
- 2-column grid (1-column on mobile)
- Each card: emoji + title + status tag + one-line description + optional screenshot + link
- Hover: green tint, slight lift, sibling cards dim to 35% opacity
- Data-driven from JS arrays (existing pattern)

**Featured projects (recommended order):**
1. PlotFirst — AI-powered world-building tool (SaaS, live)
2. Mythic Grounds — Sacred sites directory (live, revenue-generating)
3. Volta do Mar — 3D island exploration game (Godot, in progress)
4. Arkhe — Indie dev profitability tracker (SaaS, live)

### Nothing else on Home
No tools, no timeline, no about blurb. Hero + projects + footer. Clean.

---

## Page 2: Work (`work.html`)

### Intro
```
The through-line: building things that feel alive --
tools, games, and systems worth exploring.
```

### Project List
Text-based list (not cards), grouped by status. Each entry:
- Title (left) + status tag (right, uppercase, muted)
- 1-2 line description
- "Visit" link for live projects

**Groups:**

**SHIPPED**
- PlotFirst — AI-powered world-building and story planning tool. React + Express + Postgres + multi-provider AI. 14 themes, 18 languages, story graph, campaign simulation, heraldry builder. → plotfirst.app
- Arkhe — Profitability tracker for indie developers. React + Supabase + Stripe. Auth, gamification, 60+ tools directory, 6 themes, command palette. → arkhe.live
- Mythic Grounds — Sacred sites and mythology directory. Next.js + Neon Postgres. 154 entries, 32 cultures, AdSense monetization, interactive map. → mythicgrounds.com

**IN PROGRESS**
- Volta do Mar — 3D island exploration game about ecological restoration. Godot 4.6, Gerstner ocean shader, day/night cycle, harvestable flora, Terrain3D.
- Zen Garden — Mobile satisfaction game. Sand raking, stone placement, bonsai trimming. Godot 4.6, targeting Google Play with AdMob.
- SolBot — Autonomous Solana trading bot. 5 strategy engines, rug-pull detection, AI portfolio manager. Node.js + Express.

**WRITING**
- Wars of the Diadochi — Historical fan fiction exploring the successor wars after Alexander the Great.

### Design
- Timeline-item grid layout (date/status left, content right) — existing pattern
- Green section dividers between groups
- Minimal, scannable, text-first (Eric-inspired)

---

## Page 3: About (`about.html`)

### Personal Intro
```
Hey -- I'm Mario.

I spent 7+ years in education and food service, leading teams,
building curriculum, and working directly with people. That
background shapes how I think about products: they should feel
alive, invite exploration, and leave room for surprise.

Now I build software, games, and creative tools. I'm self-taught
in development, trained in media through broadcasting and
production coursework, and I work primarily with Claude Code as
a co-development partner.

When I'm not building, I'm reading history, learning languages,
making music, taking photos, or getting lost in a good game.
```

### Values (with emojis)
```
What I value

[leaf] Build things that feel alive
Products should reward curiosity, not just complete tasks.

[pencil] Ship, then polish
I'd rather have something real in the world than something
perfect in my head.

[wave] Stay close to the material
Whether it's code, a game world, or a lesson plan -- I do
my best work when my hands are in it.
```

### Background (timeline format)
- 2024 -- Present: Independent Developer
- 2017 -- 2024: Educator (7+ years)
- Previously: Shift Lead -- Five Guys

### Education
- B.A., International Relations -- UC Davis
- Broadcasting -- Ohlone College
- CTS Media -- UC Davis

### Tools & Software (chip badges, grouped)
- **Development:** Godot, Claude Code, TypeScript, React, Next.js, Tailwind, Supabase, Node.js
- **Creative & Media:** Blender, GIMP, Canva, OBS, Ableton Live
- **Product & Workflow:** Notion, Vercel, GitHub

### Contact (sidebar metadata)
- Location: California
- Email: hyphysaurus@gmail.com
- GitHub: Hyphysaurus
- Twitch: @Hyphysaurus

### Layout
- Two-column grid for intro + sidebar metadata (existing about-grid pattern)
- Single column for values, timeline, tools sections
- All using existing component patterns

---

## Page 4: Gallery (`gallery.html`)

### Structure
Two sections with masonry image grids:

**PHOTOGRAPHY**
- Nature, travel, landscapes, people
- Masonry layout: 3 columns desktop, 2 tablet, 1 mobile
- No captions — let images breathe

**DIGITAL ART**
- Blender renders, game screenshots, concept art, GIMP work
- Same masonry layout

### Interactions
- Hover: subtle sage green border
- Click: lightbox overlay with left/right navigation and close button
- Fade-up scroll animation on grid items

### Content needed (from user)
- 9-15 images total across both sections
- Mix of photography and digital art

---

## Positioning & Tone

### Identity
Builder who ships. Former educator, now building software, games, and creative tools solo. Every project listed was designed, built, and shipped end-to-end.

### Tone
Warm, casual, confident without being boastful. "Hey, I'm Mario" energy. Let the work speak — don't oversell.

### What we don't mention
- Profit/revenue numbers
- "Aspiring" anything
- AI-assisted/vibe-coded disclaimers

### What we do mention
- Claude Code in the tools list (honest, forward-looking)
- "Built end-to-end" (true, emphasizes ownership)
- Specific tech stacks per project (demonstrates depth)

---

## Technical Architecture

### File Structure
```
Portfolio/
  index.html          -- Home
  work.html           -- Work
  about.html          -- About
  gallery.html        -- Gallery
  css/
    shared.css        -- Design system, nav, footer, animations
  js/
    shared.js         -- Nav scroll behavior, fade-up observer
    projects.js       -- Project data arrays (used by Home + Work)
    gallery.js        -- Gallery data + lightbox
  assets/
    photos/           -- Photography images
    art/              -- Digital art images
    projects/         -- Project screenshots
```

### Approach
- Extract shared CSS/JS from current monolithic index.html into separate files
- Data-driven content via JS arrays (existing pattern — just add projects.js and gallery.js)
- No build step, no dependencies, no framework
- GitHub Pages deployment (existing)

### Responsive Breakpoints (existing)
- Desktop: full layout (860px+)
- Tablet: single-column cards, 2-col masonry (520-860px)
- Mobile: single column everything, reduced padding (below 520px)

---

## Assets Needed (from user)

| Asset | For | Priority |
|-------|-----|----------|
| Photo of Mario | About page or Hero | High |
| PlotFirst screenshots | Home card, Work page | High |
| Arkhe screenshots | Home card, Work page | High |
| Mythic Grounds screenshots | Home card, Work page | High |
| Volta do Mar screenshots/GIFs | Home card, Work page | High |
| Photography (5-8 images) | Gallery — Photography | Medium |
| Digital art (4-7 images) | Gallery — Digital Art | Medium |
| Zen Garden screenshots | Work page | Low (when ready) |
| SolBot dashboard screenshot | Work page | Low |
