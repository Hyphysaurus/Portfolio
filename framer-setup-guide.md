# Setting Up Your Portfolio in Framer — A Total Beginner's Guide

This walks you through recreating your portfolio in Framer from scratch. No code required — Framer is visual. Think of it like Canva meets website builder, but way cleaner.

---

## Step 0: Get Set Up

Go to **framer.com** and sign up (free tier works to start). Click **New Project** and choose **Blank** — don't use a template, you're building something specific.

You'll land in the Framer editor. Here's what you're looking at:

- **Left panel** — your page structure (layers, like Figma or Photoshop)
- **Center** — the canvas where you design
- **Right panel** — properties for whatever you've selected (colors, fonts, spacing, etc.)

---

## Step 1: Set Your Fonts and Colors

Before building anything, define your design system. This keeps everything consistent.

**Fonts to use** (matching your portfolio):

- **Heading font:** Instrument Serif — elegant, editorial. Add it via the font picker (search for it in Google Fonts, Framer has direct access).
- **Body font:** DM Sans — clean, warm, modern. Light weight (300) for body, medium (500) for labels.

**Your color palette:**

| Role | Hex | Where it goes |
|------|-----|---------------|
| Background | `#FAF9F7` | Page background (warm off-white) |
| Primary text | `#2A2A2A` | Headings, names, main copy |
| Secondary text | `#6B6560` | Descriptions, subtitles |
| Muted text | `#8A8580` | Dates, labels, nav links |
| Green accent | `#5A7A5A` | Active nav, links, italic hero word |
| Green light | `#C5D8C0` | Divider lines, section lines |
| Green hover | `#E8F0E4` | Card hover states |
| Green chips | `#E4EDDF` | Tool/skill tags background |
| Card background | `#F4F2EF` | Project cards |

In Framer, go to **Site Settings** (gear icon, top left) → **Styles** to set your default fonts and colors so they're easy to reuse.

---

## Step 2: Build the Navigation

1. Add a **Frame** at the top of your page. Set it to:
   - Width: `100%` (fill)
   - Height: `64px`
   - Layout: **Flex**, direction **Row**, justify **Space Between**, align **Center**
   - Padding left/right: `32px`
   - Background: transparent (it'll get a blur effect when you scroll — we'll add that later)

2. On the left, add a **Text** layer: "Mario Ramirez" in Instrument Serif, 20px.

3. On the right, add another **Frame** with Flex Row, gap `28px`. Inside it, add Text layers for each nav item: Work, Projects, Tools, About. Set them to DM Sans, 13px, color `#8A8580`.

4. Add a "Contact" text with a border: 1px solid `#8AAD8A`, border-radius `20px`, padding `6px 16px`. Link it to `mailto:hyphysaurus@gmail.com`.

5. **Make it sticky:** Select the nav frame → right panel → Position → **Fixed**. Top: `0`. This makes it stay at the top as you scroll.

---

## Step 3: Build the Hero Section

1. Below the nav, add a **Frame**:
   - Width: `100%`, max-width: `1120px`, centered
   - Padding top: `160px`, padding bottom: `80px`, padding left/right: `32px`

2. Add a **Text** block for the big headline. In Instrument Serif, set the size to something large — around `64px` to `80px` works. Line height: `1.08`. The text:

   > Building at the
   > *intersection* of
   > product & play

   Make "intersection" italic and color it `#5A7A5A` (your green accent). This is the key moment of color.

3. Below it, add a subtitle text in DM Sans Light (300), 17px, color `#6B6560`, max-width `480px`:

   > Software developer with a background in education, now creating human-centered tools, games, and stories.

4. Add a **Divider** (a frame that's 100% wide, 1px tall, background `#B5CCB0`).

**Scroll animations (optional but worth it):** Select the headline → right panel → click **+** next to Effects → **Appear** → choose "Fade Up." Set delay to stagger each line (0.1s, 0.25s, 0.4s). This gives the smooth load-in effect.

---

## Step 4: Work / Background Section

1. New section frame, same max-width and padding pattern.

2. **Section label:** A flex row with the text "BACKGROUND" (DM Sans, 12px, 500 weight, uppercase, letter-spacing `0.1em`, color `#6A8A6A`) and a line next to it (frame, flex-grow: 1, height 1px, background `#C5D8C0`).

3. **Timeline items:** Each one is a two-column grid:
   - Left column (180px): Date range in DM Sans 13px, color `#8A8580`
   - Right column: Title in Instrument Serif 22px, description in DM Sans 15px/300 weight

   Create one, then **duplicate** it for each role:
   - 2024–Present: Independent Software Developer
   - 2017–2024: Educator
   - Previously: Shift Lead — Five Guys

4. **Education sub-section:** Same section label pattern with "EDUCATION", then:
   - "B.A., International Relations" in Instrument Serif 22px
   - "University of California, Davis" in DM Sans 15px, color `#6B6560`

---

## Step 5: Projects Section

1. Section label: "SELECTED PROJECTS"

2. Intro paragraph in DM Sans 17px/300, color `#6B6560`, max-width `560px`.

3. **Project cards** — this is the fun part. Create a 2-column grid (gap `24px`). Each card is a Frame:
   - Background: `#F4F2EF`
   - Border radius: `12px`
   - Padding: `32px`
   - Layout: Flex column

   Inside each card:
   - Top row: index number ("01") on left, emoji on right
   - Title in Instrument Serif 24px
   - Tag like "SaaS — Live" in uppercase, 11px, `#8A8580`
   - Description in DM Sans 14px/300
   - "Visit ↗" link in `#5A7A5A` with underline (only for live projects)

   **Hover effect:** Select a card → Hover variant → change background to `#E8F0E4` and add a slight Y-translate (-2px). This gives the green tint on hover.

   Your four cards:
   - 01 — PlotFirst (✍️) — SaaS, Live — links to PlotFirst.app
   - 02 — Arkhe (🧪) — Sandbox, Live — links to arkhe.live
   - 03 — Volta do Mar (🧭) — Game, In Progress
   - 04 — Wars of the Diadochi (⚔️) — Writing, Ongoing

---

## Step 6: Tools Section

1. Section label: "TOOLS & SOFTWARE"

2. Three groups, each with a label (DM Sans 13px/500, `#6B6560`) and a flex-wrap row of chips:
   - **Creative & Media:** Blender, GIMP, Canva, OBS, Ableton Live, Ableton Note, Serato Scratch
   - **Development:** Godot, Claude Code, Replit, MIT App Inventor
   - **Product & Workflow:** Notion, Framer, RCS Selector

3. Each chip: DM Sans 13px, color `#3A3530`, background `#E4EDDF`, padding `6px 14px`, border-radius `20px`.

   In Framer, you can make one chip, then **Component** it (right-click → Create Component), and reuse it with different text. This saves a ton of time.

---

## Step 7: About Section

1. Section label: "ABOUT"

2. Two-column layout (roughly 60/40 split):

   **Left column** — three paragraphs in DM Sans 17px/300, color `#3A3530`, with spacing between them. This is your personal narrative.

   **Right column** — metadata stack:
   - Location → California
   - Interests → History, language, art, photography, nature, music, gaming
   - Email → hyphysaurus@gmail.com (colored `#5A7A5A`, underlined)

   Each meta item has a tiny uppercase label (11px, `#8A8580`) above the value.

---

## Step 8: Footer

Simple frame with a top border (`1px solid #C5D8C0`), flex row, space-between:
- Left: "© Mario Ramirez 2026" in 12px `#8A8580`
- Right: links to PlotFirst, Arkhe, Email — same style

---

## Step 9: Publishing

1. Click **Publish** (top right, blue button).
2. Framer gives you a free `.framer.website` URL.
3. To use a custom domain: **Site Settings** → **Domains** → add your domain and follow the DNS instructions.

---

## Pro Tips for Framer Beginners

**Components are your best friend.** Anything you reuse (section labels, timeline items, project cards, chips) — right-click it and "Create Component." Change it once, it updates everywhere.

**Use Auto Layout (Flex) for everything.** Never manually position things. Set frames to Flex with direction, gap, and padding. This makes your site automatically responsive.

**Responsive breakpoints.** At the top of the canvas, you'll see breakpoints (Desktop, Tablet, Mobile). After building desktop, click Tablet and adjust anything that looks off — usually just making grids single-column and reducing font sizes.

**Interactions panel** (lightning bolt icon) is where you add scroll animations, hover effects, and click actions. Start simple: "Appear" animations on scroll for sections, hover color changes on cards.

**Linking nav to sections.** Select each nav text → right panel → Link → choose "Section" and pick the matching frame. Framer handles smooth scrolling automatically.

**Images later.** Once you have screenshots for your projects, just drag them into the card frames. Framer handles responsive sizing.
