// Mario Ramirez Portfolio — Framer Code Overrides
// 
// HOW TO USE:
// 1. In Framer, go to Assets panel (left sidebar) → Code → New File
// 2. Name it "PortfolioStyles" 
// 3. Paste this entire file
// 4. Select any element on canvas → right panel → scroll to "Code Overrides"
// 5. Pick "PortfolioStyles" as the file, then choose the override to apply
//
// Each override below is named for what it styles.
// Apply them to matching elements on your canvas.

import type { ComponentType } from "react"
import { Override } from "framer"

// ─── COLOR TOKENS ───────────────────────────────────────
const colors = {
    bg:           "#FAF9F7",  // warm off-white page background
    text:         "#2A2A2A",  // primary text (headings, names)
    textSoft:     "#6B6560",  // secondary (descriptions, subtitles)
    textMuted:    "#8A8580",  // muted (dates, labels, nav)
    green:        "#5A7A5A",  // primary green accent
    greenLight:   "#C5D8C0",  // divider lines, section lines
    greenHover:   "#E8F0E4",  // card hover background
    greenChip:    "#E4EDDF",  // tool tag backgrounds
    greenBorder:  "#8AAD8A",  // button borders
    greenDivider: "#B5CCB0",  // hero divider
    cardBg:       "#F4F2EF",  // project card background
}

// ─── PAGE BACKGROUND ────────────────────────────────────
// Apply to: the outermost page frame
export function PageBackground(): Override {
    return {
        style: {
            backgroundColor: colors.bg,
        },
    }
}

// ─── NAVIGATION ─────────────────────────────────────────
// Apply to: the nav bar container frame
export function NavBar(): Override {
    return {
        style: {
            backgroundColor: "transparent",
            borderBottom: "none",
        },
    }
}

// Apply to: the site name "Mario." text in the nav
export function NavLogo(): Override {
    return {
        style: {
            color: colors.text,
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 20,
        },
    }
}

// Apply to: each nav link (Work, Projects, Tools)
export function NavLink(): Override {
    return {
        style: {
            color: colors.textMuted,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.03em",
        },
    }
}

// ─── HERO SECTION ───────────────────────────────────────
// Apply to: the main hero area / section frame
export function HeroSection(): Override {
    return {
        style: {
            backgroundColor: colors.bg,
            paddingTop: 160,
            paddingBottom: 80,
        },
    }
}

// Apply to: "About Mario." headline
export function HeroHeading(): Override {
    return {
        style: {
            color: colors.text,
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            letterSpacing: "-0.025em",
            lineHeight: 1.08,
        },
    }
}

// Apply to: the subtitle text below the headline
export function HeroSubtitle(): Override {
    return {
        style: {
            color: colors.textSoft,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.65,
        },
    }
}

// ─── BUTTONS ────────────────────────────────────────────
// Apply to: primary CTA buttons ("Contact", "Let's connect")
export function ButtonPrimary(): Override {
    return {
        style: {
            backgroundColor: colors.green,
            color: "#FFFFFF",
            borderRadius: 24,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            border: "none",
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 10,
            paddingBottom: 10,
        },
    }
}

// Apply to: secondary / outline buttons ("Portfolio")
export function ButtonSecondary(): Override {
    return {
        style: {
            backgroundColor: "transparent",
            color: colors.green,
            border: `1.5px solid ${colors.greenBorder}`,
            borderRadius: 24,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 10,
            paddingBottom: 10,
        },
    }
}

// ─── ABOUT / BIO SECTION ────────────────────────────────
// Apply to: "Mario Ramirez" name text
export function PersonName(): Override {
    return {
        style: {
            color: colors.text,
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 28,
            fontWeight: 400,
        },
    }
}

// Apply to: "Designer" subtitle (or whatever role you set)
export function PersonRole(): Override {
    return {
        style: {
            color: colors.textMuted,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 400,
        },
    }
}

// Apply to: bio paragraph text blocks
export function BodyText(): Override {
    return {
        style: {
            color: colors.textSoft,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            lineHeight: 1.7,
        },
    }
}

// ─── SECTION LABELS ─────────────────────────────────────
// Apply to: section label text ("BACKGROUND", "SELECTED PROJECTS", etc.)
export function SectionLabel(): Override {
    return {
        style: {
            color: colors.green,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
        },
    }
}

// Apply to: the horizontal line next to section labels
export function SectionDivider(): Override {
    return {
        style: {
            backgroundColor: colors.greenLight,
            height: 1,
        },
    }
}

// ─── SKILL / TOOL TAGS ─────────────────────────────────
// Apply to: the tags like "Product design", "UX research", "Strategy"
export function SkillTag(): Override {
    return {
        style: {
            backgroundColor: colors.greenChip,
            color: colors.text,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            borderRadius: 20,
            paddingLeft: 14,
            paddingRight: 14,
            paddingTop: 6,
            paddingBottom: 6,
        },
    }
}

// ─── PROJECT CARDS ──────────────────────────────────────
// Apply to: each project card frame
export function ProjectCard(): Override {
    return {
        style: {
            backgroundColor: colors.cardBg,
            borderRadius: 12,
            padding: 32,
        },
        whileHover: {
            style: {
                backgroundColor: colors.greenHover,
                y: -2,
            },
            transition: { duration: 0.3 },
        },
    }
}

// Apply to: project title text inside cards
export function ProjectTitle(): Override {
    return {
        style: {
            color: colors.text,
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 24,
            fontWeight: 400,
        },
    }
}

// Apply to: project description text inside cards
export function ProjectDescription(): Override {
    return {
        style: {
            color: colors.textSoft,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.65,
        },
    }
}

// Apply to: project tag text ("SaaS — Live", "Game — In Progress")
export function ProjectTag(): Override {
    return {
        style: {
            color: colors.textMuted,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
        },
    }
}

// Apply to: "Visit ↗" links on project cards
export function ProjectLink(): Override {
    return {
        style: {
            color: colors.green,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            borderBottom: `1px solid ${colors.green}`,
            paddingBottom: 1,
        },
    }
}

// ─── TIMELINE ITEMS ─────────────────────────────────────
// Apply to: date/period text in work experience
export function TimelinePeriod(): Override {
    return {
        style: {
            color: colors.textMuted,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.02em",
        },
    }
}

// Apply to: job title / role text in work experience
export function TimelineTitle(): Override {
    return {
        style: {
            color: colors.text,
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 22,
            fontWeight: 400,
        },
    }
}

// Apply to: job description text
export function TimelineDescription(): Override {
    return {
        style: {
            color: colors.textSoft,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            lineHeight: 1.65,
        },
    }
}

// ─── FOOTER ─────────────────────────────────────────────
// Apply to: the footer container frame
export function Footer(): Override {
    return {
        style: {
            borderTop: `1px solid ${colors.greenLight}`,
            backgroundColor: colors.bg,
        },
    }
}

// Apply to: footer text ("© Mario Ramirez 2026")
export function FooterText(): Override {
    return {
        style: {
            color: colors.textMuted,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 400,
        },
    }
}

// Apply to: footer links
export function FooterLink(): Override {
    return {
        style: {
            color: colors.textMuted,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 400,
        },
    }
}
