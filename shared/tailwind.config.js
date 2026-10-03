// Obsidian & Gold Editorial - Centralized Tailwind Configuration
// Tribute to Virat Kohli: "18 | ONE LAST CHAPTER"
// Extracted from Google Stitch Master Design Specification (DESIGN.md)
//
// ARCHITECTURAL CONTRACT:
// - This file exports THEME CONFIGURATION ONLY (colors, spacing, typography scale).
// - It intentionally does NOT define the 'content' array.
// - Content scanning globs (e.g. './*.html', './18_*/**/*.html', './shared/**/*.js') live
//   strictly in the root tailwind.config.js.
// - Always run `npm run build:css` after authoring new Tailwind utility classes across pages.

(function () {
  const obsidianGoldTheme = {
    // `darkMode: "class"` was removed: the site is dark-only and ships zero
    // `dark:` variant utilities, so the strategy selected nothing. Every page
    // still carries <html class="dark">, which is now an inert marker of intent.
    // Re-add `darkMode: "class"` here AND author `dark:` variants together —
    // adding it alone does not create a second theme.
    theme: {
      extend: {
        colors: {
          "background": "#0d0d0f",
          "surface": "#0d0d0f",
          "surface-dim": "#09090b",
          "surface-bright": "#303036",
          "surface-container-lowest": "#070709",
          "surface-container-low": "#131316",
          "surface-container": "#18181c",
          "surface-container-high": "#212126",
          "surface-container-highest": "#2b2b31",
          "surface-variant": "#2b2b31",
          "surface-tint": "#cda851",

          "on-surface": "#ded9d0",
          "on-surface-variant": "#a9a293",
          "on-background": "#ded9d0",
          "inverse-surface": "#ded9d0",
          "inverse-on-surface": "#26262b",

          "primary": "#cda851",
          "on-primary": "#2d2200",
          "primary-container": "#a98230",
          "on-primary-container": "#473600",
          "inverse-primary": "#634e00",
          "primary-fixed": "#dfbe78",
          "primary-fixed-dim": "#b89342",
          "on-primary-fixed": "#1e1500",
          "on-primary-fixed-variant": "#493900",

          "secondary": "#9da2ac",
          "on-secondary": "#26292e",
          "secondary-container": "#3c3f46",
          "on-secondary-container": "#a6abb5",
          "secondary-fixed": "#d2d5dc",
          "secondary-fixed-dim": "#9da2ac",
          "on-secondary-fixed": "#14171a",
          "on-secondary-fixed-variant": "#383b40",

          "tertiary": "#b0b7c3",
          "on-tertiary": "#20262f",
          "tertiary-container": "#9198a6",
          "on-tertiary-container": "#2f3642",
          "tertiary-fixed": "#cdd4e1",
          "tertiary-fixed-dim": "#a8b0bd",
          "on-tertiary-fixed": "#0f141a",
          "on-tertiary-fixed-variant": "#333a44",

          // Contrast-tuned 2026-09-30 to match shared/design-system.css :root.
          // Kept in sync deliberately: shared/compiled-tailwind.css is a frozen
          // artifact whose colours are literals, so a REBUILD is the only way
          // these reach a page natively. Until then shared/contrast-overrides.css
          // carries the same values at runtime. Change all three together.
          "outline": "#989184",          // 4.50:1 worst-case — WCAG 1.4.3 AA text
          "outline-variant": "#747476",  // 3.02:1 worst-case — WCAG 1.4.11 borders

          "error": "#ffb4ab",
          "on-error": "#690005",
          "error-container": "#93000a",
          "on-error-container": "#ffdad6"
        },
        borderRadius: {
          "DEFAULT": "0.25rem",
          "lg": "0.5rem",
          "xl": "0.75rem",
          "full": "9999px"
        },
        spacing: {
          "space-xs": "0.25rem",
          "space-sm": "0.5rem",
          "space-md": "1rem",
          "space-lg": "1.75rem",
          "space-xl": "3rem",
          "space-xxl": "5rem",
          "gutter": "1.5rem",
          "gutter-mobile": "1rem",
          "margin": "4rem",
          "margin-mobile": "1.25rem"
        },
        fontFamily: {
          "monument-hero": ["Bebas Neue", "sans-serif"],
          "monument-hero-mobile": ["Bebas Neue", "sans-serif"],
          "headline-xl": ["Bebas Neue", "sans-serif"],
          "headline-xl-mobile": ["Bebas Neue", "sans-serif"],
          "headline-lg": ["Bebas Neue", "sans-serif"],
          "headline-lg-mobile": ["Bebas Neue", "sans-serif"],
          "data-display": ["Bebas Neue", "sans-serif"],
          "headline-md": ["\"Source Serif 4\"", "serif"],
          "subheading": ["\"Source Serif 4\"", "serif"],
          "body-lg": ["\"Source Serif 4\"", "serif"],
          "body-md": ["\"Source Serif 4\"", "serif"],
          "label-caps": ["JetBrains Mono", "monospace"],
          "meta-sm": ["JetBrains Mono", "monospace"]
        },
        fontSize: {
          "monument-hero": ["112px", { lineHeight: "96px", letterSpacing: "0.04em", fontWeight: "400" }],
          "monument-hero-mobile": ["56px", { lineHeight: "52px", letterSpacing: "0.03em", fontWeight: "400" }],
          "headline-xl": ["64px", { lineHeight: "60px", letterSpacing: "0.03em", fontWeight: "400" }],
          "headline-xl-mobile": ["40px", { lineHeight: "38px", letterSpacing: "0.02em", fontWeight: "400" }],
          "headline-lg": ["44px", { lineHeight: "44px", letterSpacing: "0.02em", fontWeight: "400" }],
          "headline-lg-mobile": ["32px", { lineHeight: "32px", letterSpacing: "0.02em", fontWeight: "400" }],
          "headline-md": ["26px", { lineHeight: "34px", letterSpacing: "-0.01em", fontWeight: "600" }],
          "subheading": ["20px", { lineHeight: "30px", letterSpacing: "0", fontWeight: "400" }],
          "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
          "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
          "data-display": ["48px", { lineHeight: "48px", letterSpacing: "0.02em", fontWeight: "400" }],
          "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.18em", fontWeight: "500" }],
          "meta-sm": ["12px", { lineHeight: "18px", letterSpacing: "0.06em", fontWeight: "400" }]
        }
      }
    }
  };

  if (typeof window !== "undefined") {
    window.tailwind = window.tailwind || {};
    window.tailwind.config = obsidianGoldTheme;
    if (typeof tailwind !== "undefined") {
      tailwind.config = obsidianGoldTheme;
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = obsidianGoldTheme;
  }
})();
