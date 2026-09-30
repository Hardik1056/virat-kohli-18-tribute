const obsidianGoldTheme = require('./shared/tailwind.config.js');

module.exports = {
  content: [
    "./*.html",
    "./18_*/**/*.html",
    "./shared/**/*.js"
  ],
  // darkMode intentionally not set. It previously read
  // `obsidianGoldTheme.darkMode || "class"`, which masked the removal of
  // darkMode from shared/tailwind.config.js by silently re-adding "class".
  // The site ships no `dark:` variants, so no strategy is the honest setting.
  theme: obsidianGoldTheme.theme || {}
};
