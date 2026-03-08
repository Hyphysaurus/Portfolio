import { useState, useEffect, useRef } from "react";

const SECTIONS = ["Work", "Projects", "Tools", "About"];

const NAV_HEIGHT = 64;

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const offsets = SECTIONS.map((s) => {
        const el = sectionRefs.current[s];
        if (!el) return { section: s, top: Infinity };
        return { section: s, top: el.getBoundingClientRect().top };
      });
      const current = offsets.find((o) => o.top > -200 && o.top < 400);
      setActiveSection(current?.section || null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (section) => {
    const el = sectionRefs.current[section];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 24;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const ref = (name) => (el) => {
    sectionRefs.current[name] = el;
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Instrument+Serif:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #faf9f7; }
        ::selection { background: #c1dbb3; color: #2a2a2a; }
        a { color: inherit; text-decoration: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes drawLine {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        ...styles.nav,
        borderBottom: scrolled ? "1px solid #e0ddd8" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        background: scrolled ? "rgba(250,249,247,0.9)" : "transparent",
      }}>
        <div style={styles.navInner}>
          <span
            style={styles.logo}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Mario Ramirez
          </span>
          <div style={styles.navLinks}>
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                style={{
                  ...styles.navLink,
                  color: activeSection === s ? "#5a7a5a" : "#8a8580",
                }}
              >
                {s}
              </button>
            ))}
            <a href="mailto:hyphysaurus@gmail.com" style={styles.navContact}>
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            <span style={{ ...styles.heroLine, animationDelay: "0.1s" }}>
              Building at the
            </span>
            <span style={{ ...styles.heroLine, animationDelay: "0.25s" }}>
              <em style={styles.italic}>intersection</em> of
            </span>
            <span style={{ ...styles.heroLine, animationDelay: "0.4s" }}>
              product & play
            </span>
          </h1>
          <p style={styles.heroSub}>
            Software developer with a background in education, now creating
            human‑centered tools, games, and stories.
          </p>
          <div style={styles.heroDivider} />
        </div>
      </header>

      {/* Work / Resume */}
      <section ref={ref("Work")} style={styles.section}>
        <div style={styles.sectionInner}>
          <SectionLabel text="Background" />
          <div style={styles.timelineGrid}>
            <TimelineItem
              period="2024 — Present"
              title="Independent Software Developer"
              desc="Building PlotFirst, Arkhe, and Volta do Mar — products spanning SaaS, creative tooling, and game development. Shipping end-to-end: product vision, design, engineering."
            />
            <TimelineItem
              period="2017 — 2024"
              title="Educator"
              desc="7+ years working directly with people — developing curriculum, leading teams, and building systems for learning. ServSafe certified. This is where the product instinct started."
            />
            <TimelineItem
              period="Previously"
              title="Shift Lead — Five Guys"
              desc="Team leadership, operations, quality standards. Fast environments, real accountability."
            />
          </div>

          <div style={{ marginTop: 64 }}>
            <SectionLabel text="Education" />
            <div style={styles.eduCard}>
              <span style={styles.eduDegree}>B.A., International Relations</span>
              <span style={styles.eduSchool}>University of California, Davis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section ref={ref("Projects")} style={styles.section}>
        <div style={styles.sectionInner}>
          <SectionLabel text="Selected Projects" />
          <p style={styles.projectsIntro}>
            The through-line: building things that feel alive — tools for
            storytelling, spaces for experimentation, worlds worth exploring.
          </p>

          <div style={styles.projectGrid}>
            <ProjectCard
              index="01"
              title="PlotFirst"
              tag="SaaS — Live"
              desc="A writing and planning tool that helps turn rough ideas into structured stories. Built end-to-end: product, design, implementation. Optimized for fast iteration and low-friction UX."
              link="https://PlotFirst.app"
              hovered={hoveredProject}
              setHovered={setHoveredProject}
              emoji="✍️"
            />
            <ProjectCard
              index="02"
              title="Arkhe"
              tag="Sandbox — Live"
              desc="A live, evolving space for creation, play, and experimentation in public. Built and shipped an early version, iterated in the open, used it as a sandbox for interaction and tooling ideas."
              link="https://arkhe.live"
              hovered={hoveredProject}
              setHovered={setHoveredProject}
              emoji="🧪"
            />
            <ProjectCard
              index="03"
              title="Volta do Mar"
              tag="Game — In Progress"
              desc="An exploration game about ecological restoration across an ocean archipelago. Blends 2D + 3D gameplay with a mythic tone. Built in Godot. Current focus: fog clearing, wind traversal, a one-island vertical slice."
              hovered={hoveredProject}
              setHovered={setHoveredProject}
              emoji="🧭"
            />
            <ProjectCard
              index="04"
              title="Wars of the Diadochi"
              tag="Writing — Ongoing"
              desc="Fan fiction exploring the successor wars after Alexander the Great — where history, ambition, and human drama collide. A narrative project blending research and creative storytelling."
              hovered={hoveredProject}
              setHovered={setHoveredProject}
              emoji="⚔️"
            />
          </div>
        </div>
      </section>

      {/* Tools */}
      <section ref={ref("Tools")} style={styles.section}>
        <div style={styles.sectionInner}>
          <SectionLabel text="Tools & Software" />
          <div style={styles.toolsGrid}>
            <ToolGroup
              label="Creative & Media"
              items={["Blender", "GIMP", "Canva", "OBS", "Ableton Live", "Ableton Note", "Serato Scratch"]}
            />
            <ToolGroup
              label="Development"
              items={["Godot", "Claude Code", "Replit", "MIT App Inventor"]}
            />
            <ToolGroup
              label="Product & Workflow"
              items={["Notion", "Framer", "RCS Selector"]}
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={ref("About")} style={styles.section}>
        <div style={styles.sectionInner}>
          <SectionLabel text="About" />
          <div style={styles.aboutGrid}>
            <div style={styles.aboutText}>
              <p style={styles.aboutParagraph}>
                I'm Mario — a software developer with 7+ years in education,
                now building playful, human-centered tools across game dev, SaaS,
                and creative spaces.
              </p>
              <p style={styles.aboutParagraph}>
                My work is driven by a belief that the best products feel like
                worlds: they invite exploration, reward curiosity, and leave room
                for surprise.
              </p>
              <p style={styles.aboutParagraph}>
                When I'm not building, I'm reading history, learning languages,
                making music, taking photos, or getting lost in a good game.
              </p>
            </div>
            <div style={styles.aboutMeta}>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Location</span>
                <span style={styles.metaValue}>California</span>
              </div>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Interests</span>
                <span style={styles.metaValue}>
                  History, language, art, photography, nature, music, gaming
                </span>
              </div>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Email</span>
                <a
                  href="mailto:hyphysaurus@gmail.com"
                  style={{ ...styles.metaValue, color: "#5a7a5a", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  hyphysaurus@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span style={styles.footerText}>© Mario Ramirez 2026</span>
          <div style={styles.footerLinks}>
            <a href="https://PlotFirst.app" target="_blank" rel="noopener" style={styles.footerLink}>PlotFirst</a>
            <a href="https://arkhe.live" target="_blank" rel="noopener" style={styles.footerLink}>Arkhe</a>
            <a href="mailto:hyphysaurus@gmail.com" style={styles.footerLink}>Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Subcomponents ── */

function SectionLabel({ text }) {
  return (
    <div style={styles.sectionLabel}>
      <span style={styles.sectionLabelText}>{text}</span>
      <div style={styles.sectionLabelLine} />
    </div>
  );
}

function TimelineItem({ period, title, desc }) {
  return (
    <div style={styles.timelineItem}>
      <span style={styles.timePeriod}>{period}</span>
      <div>
        <h3 style={styles.timeTitle}>{title}</h3>
        <p style={styles.timeDesc}>{desc}</p>
      </div>
    </div>
  );
}

function ProjectCard({ index, title, tag, desc, link, hovered, setHovered, emoji }) {
  const isHovered = hovered === title;
  const isFaded = hovered && !isHovered;

  return (
    <div
      style={{
        ...styles.projectCard,
        opacity: isFaded ? 0.35 : 1,
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        background: isHovered ? "#e8f0e4" : "#f4f2ef",
      }}
      onMouseEnter={() => setHovered(title)}
      onMouseLeave={() => setHovered(null)}
    >
      <div style={styles.projectTop}>
        <span style={styles.projectIndex}>{index}</span>
        <span style={styles.projectEmoji}>{emoji}</span>
      </div>
      <div style={styles.projectBody}>
        <div style={styles.projectHeader}>
          <h3 style={styles.projectTitle}>{title}</h3>
          <span style={styles.projectTag}>{tag}</span>
        </div>
        <p style={styles.projectDesc}>{desc}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener"
            style={styles.projectLink}
          >
            Visit ↗
          </a>
        )}
      </div>
    </div>
  );
}

function ToolGroup({ label, items }) {
  return (
    <div style={styles.toolGroup}>
      <span style={styles.toolLabel}>{label}</span>
      <div style={styles.toolItems}>
        {items.map((item) => (
          <span key={item} style={styles.toolChip}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Styles ── */

const font = "'DM Sans', sans-serif";
const serif = "'Instrument Serif', Georgia, serif";

const styles = {
  root: {
    fontFamily: font,
    color: "#2a2a2a",
    background: "#faf9f7",
    minHeight: "100vh",
    WebkitFontSmoothing: "antialiased",
  },

  /* Nav */
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: NAV_HEIGHT,
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  navInner: {
    width: "100%",
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontFamily: serif,
    fontSize: 20,
    fontWeight: 400,
    letterSpacing: "-0.01em",
    cursor: "pointer",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 28,
  },
  navLink: {
    fontFamily: font,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.03em",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.2s ease",
    padding: 0,
  },
  navContact: {
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.03em",
    color: "#2a2a2a",
    padding: "6px 16px",
    border: "1px solid #8aad8a",
    borderRadius: 20,
    transition: "all 0.2s ease",
  },

  /* Hero */
  hero: {
    paddingTop: 160,
    paddingBottom: 80,
  },
  heroContent: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 32px",
  },
  heroTitle: {
    fontFamily: serif,
    fontSize: "clamp(40px, 6.5vw, 80px)",
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: "-0.025em",
    display: "flex",
    flexDirection: "column",
  },
  heroLine: {
    display: "block",
    animation: "fadeUp 0.8s ease forwards",
    opacity: 0,
  },
  italic: {
    fontStyle: "italic",
    color: "#5a7a5a",
  },
  heroSub: {
    marginTop: 28,
    fontSize: 17,
    fontWeight: 300,
    lineHeight: 1.65,
    color: "#6b6560",
    maxWidth: 480,
    animation: "fadeUp 0.8s ease 0.55s forwards",
    opacity: 0,
  },
  heroDivider: {
    marginTop: 56,
    height: 1,
    background: "#b5ccb0",
    transformOrigin: "left",
    animation: "drawLine 0.8s ease 0.7s forwards",
    transform: "scaleX(0)",
  },

  /* Sections */
  section: {
    paddingTop: 72,
    paddingBottom: 72,
  },
  sectionInner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 32px",
  },
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 40,
  },
  sectionLabelText: {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#6a8a6a",
    whiteSpace: "nowrap",
  },
  sectionLabelLine: {
    flex: 1,
    height: 1,
    background: "#c5d8c0",
  },

  /* Timeline */
  timelineGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  timelineItem: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    gap: 32,
    padding: "28px 0",
    borderBottom: "1px solid #eae7e3",
  },
  timePeriod: {
    fontSize: 13,
    fontWeight: 400,
    color: "#8a8580",
    letterSpacing: "0.02em",
    paddingTop: 3,
  },
  timeTitle: {
    fontFamily: serif,
    fontSize: 22,
    fontWeight: 400,
    marginBottom: 8,
    letterSpacing: "-0.01em",
  },
  timeDesc: {
    fontSize: 15,
    fontWeight: 300,
    lineHeight: 1.65,
    color: "#5a5550",
  },

  /* Education */
  eduCard: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  eduDegree: {
    fontFamily: serif,
    fontSize: 22,
    fontWeight: 400,
    letterSpacing: "-0.01em",
  },
  eduSchool: {
    fontSize: 15,
    fontWeight: 300,
    color: "#6b6560",
  },

  /* Projects */
  projectsIntro: {
    fontSize: 17,
    fontWeight: 300,
    lineHeight: 1.65,
    color: "#6b6560",
    maxWidth: 560,
    marginBottom: 48,
    marginTop: -16,
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 24,
  },
  projectCard: {
    background: "#f4f2ef",
    borderRadius: 12,
    padding: 32,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    transition: "all 0.35s ease",
    cursor: "default",
  },
  projectTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectIndex: {
    fontSize: 12,
    fontWeight: 500,
    color: "#b0aaa3",
    letterSpacing: "0.05em",
  },
  projectEmoji: {
    fontSize: 22,
  },
  projectBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  projectHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 12,
  },
  projectTitle: {
    fontFamily: serif,
    fontSize: 24,
    fontWeight: 400,
    letterSpacing: "-0.01em",
  },
  projectTag: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#8a8580",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  projectDesc: {
    fontSize: 14,
    fontWeight: 300,
    lineHeight: 1.65,
    color: "#5a5550",
    flex: 1,
  },
  projectLink: {
    fontSize: 13,
    fontWeight: 500,
    color: "#5a7a5a",
    letterSpacing: "0.02em",
    alignSelf: "flex-start",
    borderBottom: "1px solid #5a7a5a",
    paddingBottom: 1,
    transition: "opacity 0.2s",
  },

  /* Tools */
  toolsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 36,
  },
  toolGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  toolLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: "#6b6560",
    letterSpacing: "0.03em",
  },
  toolItems: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  toolChip: {
    fontSize: 13,
    fontWeight: 400,
    color: "#3a3530",
    background: "#e4eddf",
    padding: "6px 14px",
    borderRadius: 20,
    letterSpacing: "0.01em",
  },

  /* About */
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 64,
  },
  aboutText: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  aboutParagraph: {
    fontSize: 17,
    fontWeight: 300,
    lineHeight: 1.7,
    color: "#3a3530",
  },
  aboutMeta: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    paddingTop: 4,
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#8a8580",
  },
  metaValue: {
    fontSize: 15,
    fontWeight: 400,
    color: "#3a3530",
    lineHeight: 1.5,
  },

  /* Footer */
  footer: {
    borderTop: "1px solid #c5d8c0",
    marginTop: 40,
    padding: "32px 0",
  },
  footerInner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontWeight: 400,
    color: "#8a8580",
    letterSpacing: "0.02em",
  },
  footerLinks: {
    display: "flex",
    gap: 24,
  },
  footerLink: {
    fontSize: 12,
    fontWeight: 400,
    color: "#8a8580",
    letterSpacing: "0.02em",
    transition: "color 0.2s",
  },
};
