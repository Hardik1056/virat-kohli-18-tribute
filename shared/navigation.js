/**
 * 18 | ONE LAST CHAPTER — CENTRALIZED WEBSITE NAVIGATION SYSTEM
 * ==============================================================
 * Master persistent desktop-first navigation for all 11 pages of the Virat Kohli tribute site.
 *
 * Primary Sections (Desktop-first):
 *   01 — HOME
 *   02 — THE LAST CHAPTER
 *   03 — THE JOURNEY
 *   04 — THE INNINGS
 *   05 — REMAINING ODIs
 *   06 — WORLD CUP 2027
 *   07 — BE THERE
 *   08 — WE WERE THERE
 *
 * Archival Dossiers & Detail Pages:
 *   - 82* vs Pakistan
 *   - Match Details
 *   - I WAS THERE keepsake generator
 *
 * Visual Language: Obsidian Gold Editorial
 * Palette: Canvas #070709, Surface #0d0d0f, Border #747476, Gold #cda851
 * These mirror shared/design-system.css :root. The previous header listed a
 * stale parallel palette (gold #d4af37 / #f2ca50) that no token ever held —
 * the nav has been repointed at the real tokens, and #f2ca50 is gone.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VK18Navigation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // =========================================================================
  // 1. CENTRALIZED NAVIGATION CONFIGURATION
  // =========================================================================

  const PRIMARY_SECTIONS = [
    {
      id: 'home',
      number: '01',
      label: 'HOME',
      folder: '18_one_last_chapter_hero',
      url: '../18_one_last_chapter_hero/code.html',
      description: 'Documentary Hero Landmark'
    },
    {
      id: 'the-chapter',
      number: '02',
      label: 'THE CHAPTER',
      folder: '18_the_last_chapter_desktop_editorial',
      url: '../18_the_last_chapter_desktop_editorial/code.html',
      description: 'The Final Horizon Editorial'
    },
    {
      id: 'journey',
      number: '03',
      label: 'THE JOURNEY',
      folder: '18_the_journey_horizontal_documentary_timeline',
      url: '../18_the_journey_horizontal_documentary_timeline/code.html',
      description: 'Horizontal Documentary Timeline'
    },
    {
      id: 'innings',
      number: '04',
      label: 'INNINGS',
      folder: '18_the_innings_we_ll_never_forget_desktop',
      url: '../18_the_innings_we_ll_never_forget_desktop/code.html',
      description: 'Retrospective & 86 Centuries'
    },
    {
      id: 'remaining-odis',
      number: '05',
      label: 'REMAINING ODIs',
      folder: '18_the_last_ones_remaining_odis',
      url: '../18_the_last_ones_remaining_odis/code.html',
      description: 'Bilateral Scarcity Ledger'
    },
    {
      id: 'world-cup-2027',
      number: '06',
      label: 'WORLD CUP 2027',
      folder: '18_world_cup_2027_destination',
      url: '../18_world_cup_2027_destination/code.html',
      description: 'The Horizon & Swansong'
    },
    {
      id: 'stats',
      number: '07',
      label: 'STATS',
      folder: '18_career_stats_international',
      url: '../18_career_stats_international/code.html',
      description: 'International Career Records: Tests, ODIs & T20Is'
    },
    {
      id: 'quiz',
      number: '08',
      label: 'QUIZ',
      folder: '18_how_well_do_you_know_kohli_quiz',
      url: '../18_how_well_do_you_know_kohli_quiz/code.html',
      description: 'The Ultimate Cricket IQ Challenge & 4 Lifelines'
    },
    {
      id: 'about',
      number: '09',
      label: 'ABOUT',
      folder: 'about',
      url: '../18_one_last_chapter_hero/code.html#tribute-about',
      description: 'Archival Homage & Disclaimers',
      isAbout: true
    }
  ];

  const DETAIL_SECTIONS = [
    {
      id: '82-vs-pakistan',
      ref: 'REF. MCG-82',
      badge: 'MCG 2022',
      label: '82* vs Pakistan',
      folder: '18_82_vs_pakistan_melbourne_2022',
      url: '../18_82_vs_pakistan_melbourne_2022/code.html',
      description: 'Melbourne T20I Miracle Chase'
    },
    {
      id: 'match-details',
      ref: 'REF. DOSSIER-01',
      badge: 'FIXTURES',
      label: 'Match Details',
      folder: '18_match_details_india_vs_australia',
      url: '../18_match_details_india_vs_australia/code.html',
      description: 'India vs Australia Wankhede Dossier'
    },
    {
      id: 'keepsake-generator',
      ref: 'REF. KEEPSAKE',
      badge: 'PASS',
      label: 'Keepsake Ticket',
      folder: '18_i_was_there_commemorative_keepsake_generator',
      url: '../18_i_was_there_commemorative_keepsake_generator/code.html',
      description: 'Archival Match Keepsake Ticket Generator'
    }
  ];

  // Pages with full-bleed hero artwork flowing behind translucent navbar.
  const FULL_BLEED_PAGES = [
    '18_one_last_chapter_hero'
  ];

  // Pages that already have pt-16 (64px) top padding on their main element.
  const PADDED_MAIN_PAGES = [
    '18_match_details_india_vs_australia',
    '18_world_cup_2027_destination',
    '18_82_vs_pakistan_melbourne_2022',
    '18_how_well_do_you_know_kohli_quiz'
  ];

  // =========================================================================
  // 2. HELPER UTILITIES
  // =========================================================================

  function getCurrentFolder() {
    const path = window.location.pathname || '';
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0) {
      for (let i = segments.length - 1; i >= 0; i--) {
        const seg = segments[i];
        if (seg.startsWith('18_')) {
          return seg;
        }
      }
    }
    return '18_one_last_chapter_hero';
  }

  function isSectionActive(item, currentFolder) {
    if (item.isAbout) {
      return typeof window !== 'undefined' && window.location.hash === '#tribute-about';
    }
    return item.folder === currentFolder;
  }

  function isDetailActive(currentFolder) {
    return DETAIL_SECTIONS.some(d => d.folder === currentFolder);
  }

  // =========================================================================
  // 3. HTML GENERATION (OBSIDIAN GOLD EDITORIAL SPEC)
  // =========================================================================

  function renderDesktopNav(currentFolder) {
    return PRIMARY_SECTIONS.map(sec => {
      const active = isSectionActive(sec, currentFolder);
      const activeClasses = active
        ? 'text-primary font-bold border-b-2 border-primary bg-primary/10'
        : 'text-on-surface-variant/80 hover:text-primary hover:bg-surface-container-low/60 border-b-2 border-transparent';

      const dataAttr = sec.isAbout ? 'data-vk-about-trigger="true"' : '';

      return `
        <a href="${sec.url}" 
           ${dataAttr}
           class="vk-nav-link px-2 lg:px-2.5 py-1.5 flex items-center gap-1 font-label-caps text-[10.5px] 2xl:text-[11.5px] tracking-[0.14em] uppercase transition-all duration-150 shrink-0 ${activeClasses}"
           ${active ? 'aria-current="page"' : ''}
           title="${sec.number} — ${sec.label}: ${sec.description}">
          <span class="font-mono text-[9px] ${active ? 'text-primary' : 'text-primary/60'}">${sec.number}</span>
          <span>${sec.label}</span>
        </a>
      `;
    }).join('');
  }

  function renderDossiersDropdown(currentFolder) {
    const hasActiveDetail = isDetailActive(currentFolder);
    const triggerClasses = hasActiveDetail
      ? 'border-primary text-primary bg-primary/10'
      : 'border-outline-variant/40 text-on-surface-variant hover:text-primary hover:border-primary/60';

    const menuItems = DETAIL_SECTIONS.map(item => {
      const active = isSectionActive(item, currentFolder);
      const itemClasses = active
        ? 'bg-surface-container border-l-2 border-primary text-primary'
        : 'hover:bg-surface-container-low text-on-surface hover:text-primary border-l-2 border-transparent';

      return `
        <a href="${item.url}" 
           class="flex flex-col px-3 py-2 transition-colors group ${itemClasses}"
           ${active ? 'aria-current="page"' : ''}>
          <div class="flex items-center justify-between gap-2">
            <span class="font-label-caps text-xs tracking-wider uppercase ${active ? 'text-primary font-bold' : 'group-hover:text-primary'}">${item.label}</span>
            <span class="font-mono text-[9px] px-1.5 py-0.5 bg-surface-container-high text-primary tracking-widest uppercase">${item.badge}</span>
          </div>
          <span class="font-meta-sm text-[10px] text-secondary/60 mt-0.5">${item.description}</span>
        </a>
      `;
    }).join('');

    return `
      <div class="relative vk-dossiers-container">
        <button id="vk-dossiers-btn" 
                type="button" 
                aria-expanded="false" 
                aria-haspopup="true"
                class="flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 bg-surface-container-low border font-label-caps text-[11px] tracking-widest uppercase transition-all duration-150 ${triggerClasses}">
          <span class="material-symbols-outlined text-[15px] text-primary" aria-hidden="true">folder_open</span>
          <span>DOSSIERS</span>
          <span class="material-symbols-outlined text-[15px] transition-transform duration-200" id="vk-dossiers-icon" aria-hidden="true">expand_more</span>
        </button>
        <div id="vk-dossiers-menu" 
             class="hidden absolute right-0 top-full mt-2 w-72 bg-[#0e0e0e] border border-[#262626] shadow-2xl py-1 z-50 divide-y divide-[#1c1c1c] animate-fadeIn">
          <div class="px-3 py-1.5 font-mono text-[9px] text-outline uppercase tracking-widest flex items-center justify-between">
            <span>CANONICAL DOSSIERS</span>
            <span class="text-primary/70">ARCHIVE</span>
          </div>
          <div class="py-1">
            ${menuItems}
          </div>
        </div>
      </div>
    `;
  }

  function renderMobileDrawer(currentFolder) {
    const primaryItems = PRIMARY_SECTIONS.map(sec => {
      const active = isSectionActive(sec, currentFolder);
      const dataAttr = sec.isAbout ? 'data-vk-about-trigger="true"' : '';
      return `
        <a href="${sec.url}" 
           ${dataAttr}
           class="flex items-center justify-between px-4 py-3 border-b border-[#1c1c1c] transition-colors ${active ? 'bg-primary/10 text-primary border-l-4 border-l-primary font-bold' : 'hover:bg-surface-container-low text-on-surface'}">
          <div class="flex items-center gap-3">
            <span class="font-mono text-xs ${active ? 'text-primary' : 'text-primary/60'}">${sec.number}</span>
            <span class="font-label-caps text-xs sm:text-sm tracking-widest uppercase">${sec.label}</span>
          </div>
          <span class="material-symbols-outlined text-sm ${active ? 'text-primary' : 'text-outline/40'}" aria-hidden="true">arrow_forward</span>
        </a>
      `;
    }).join('');

    const detailItems = DETAIL_SECTIONS.map(item => {
      const active = isSectionActive(item, currentFolder);
      return `
        <a href="${item.url}" 
           class="flex items-center justify-between px-4 py-3 border-b border-[#1c1c1c] transition-colors ${active ? 'bg-primary/10 text-primary border-l-4 border-l-primary font-bold' : 'hover:bg-surface-container-low text-on-surface'}">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-label-caps text-xs sm:text-sm tracking-widest uppercase">${item.label}</span>
              <span class="font-mono text-[9px] px-1 bg-surface-container-high text-primary tracking-widest uppercase">${item.badge}</span>
            </div>
            <span class="font-meta-sm text-[10px] text-secondary/60">${item.description}</span>
          </div>
          <span class="material-symbols-outlined text-sm ${active ? 'text-primary' : 'text-outline/40'}" aria-hidden="true">arrow_forward</span>
        </a>
      `;
    }).join('');

    return `
      <div id="vk-mobile-drawer" 
           class="hidden fixed top-14 left-0 right-0 bottom-0 bg-[#0c0c0c]/98 backdrop-blur-xl border-b border-[#262626] overflow-y-auto z-40 select-none pb-12">
        <div class="w-full max-w-lg mx-auto flex flex-col pt-2">
          <div class="px-4 py-2 font-mono text-[10px] text-primary tracking-widest uppercase bg-surface-container-lowest/80 border-y border-[#1f1f1f]">
            PRIMARY SECTIONS // 01 — 09
          </div>
          <nav aria-label="Mobile Primary Navigation" class="flex flex-col">
            ${primaryItems}
          </nav>

          <div class="px-4 py-2 font-mono text-[10px] text-primary tracking-widest uppercase bg-surface-container-lowest/80 border-y border-[#1f1f1f] mt-4">
            ARCHIVAL DOSSIERS
          </div>
          <nav aria-label="Mobile Dossiers Navigation" class="flex flex-col">
            ${detailItems}
          </nav>

          <div class="p-6 text-center">
            <p class="font-meta-sm text-[10px] text-outline uppercase tracking-widest">
              18 | ONE LAST CHAPTER • NON-COMMERCIAL FAN TRIBUTE
            </p>
          </div>
        </div>
      </div>
    `;
  }

  function renderAboutModal() {
    return `
      <div id="vk-about-modal" 
           class="hidden fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none"
           role="dialog"
           aria-modal="true"
           aria-labelledby="vk-about-title">
        
        <div class="relative w-full max-w-2xl bg-[#121212] border border-[#2e2a20] shadow-[0_0_60px_rgba(0,0,0,0.95)] p-5 sm:p-8 my-auto text-left">
          <!-- Accent Corner Notches -->
          <div class="absolute -top-1 -left-1 w-2.5 h-2.5 bg-primary"></div>
          <div class="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-primary"></div>
          <div class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary"></div>
          <div class="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-primary"></div>

          <!-- Header -->
          <div class="flex items-start justify-between pb-4 border-b border-outline-variant/30 gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span class="font-label-caps text-[10px] text-primary tracking-[0.2em] uppercase font-bold">ARCHIVAL NOTICE // TERMS OF SERVICE</span>
              </div>
              <h2 id="vk-about-title" class="font-headline-lg text-2xl sm:text-3xl text-on-surface tracking-wide uppercase leading-tight">
                ABOUT THIS TRIBUTE ARCHIVE
              </h2>
            </div>
            <button id="vk-about-close-btn" 
                    type="button" 
                    aria-label="Close About Dialog"
                    class="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/30">
              <span class="material-symbols-outlined text-xl" aria-hidden="true">close</span>
            </button>
          </div>

          <!-- Body Sections -->
          <div class="mt-5 space-y-3.5 max-h-[60vh] overflow-y-auto pr-2 text-on-surface">
            <!-- 01 -->
            <div class="p-3.5 bg-surface-container-low border border-outline-variant/25">
              <div class="font-label-caps text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
                01 // INDEPENDENT FAN ARCHIVE
              </div>
              <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
                This digital platform is an independent, non-commercial retrospective and archival monography created strictly by and for cricket fans. It celebrates the international career, monumental records, and sportsmanship of Virat Kohli as he approaches the final chapter of his ODI journey.
              </p>
            </div>

            <!-- 02 -->
            <div class="p-3.5 bg-surface-container-low border border-outline-variant/25">
              <div class="font-label-caps text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
                02 // NO OFFICIAL AFFILIATION OR ENDORSEMENT
              </div>
              <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
                This website is strictly <strong>NOT affiliated with, authorized by, sponsored by, or endorsed by Virat Kohli</strong>, the Board of Control for Cricket in India (BCCI), the International Cricket Council (ICC), Royal Challengers Bengaluru (RCB), or any sports governing authority, corporate partner, or commercial brand.
              </p>
            </div>

            <!-- 03 -->
            <div class="p-3.5 bg-surface-container-low border border-outline-variant/25">
              <div class="font-label-caps text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
                03 // 100% NON-COMMERCIAL • NO MONETIZATION
              </div>
              <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
                This platform is entirely free of charge. It does not sell tickets, charge fees, solicit donations, process financial payments, display paid advertisements, or broker commercial promotions of any kind.
              </p>
            </div>

            <!-- 04 -->
            <div class="p-3.5 bg-surface-container-low border border-outline-variant/25">
              <div class="font-label-caps text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
                04 // TRADEMARKS &amp; NOMINATIVE FAIR USE
              </div>
              <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
                All player names, logos, tournament insignias, team emblems, and historical match references remain the exclusive intellectual property of their respective copyright and trademark holders. Their presence on this site serves solely descriptive, educational, and commemorative historical tribute under fair use doctrine.
              </p>
            </div>

            <!-- 05 -->
            <div class="p-3.5 bg-surface-container-low border border-outline-variant/25">
              <div class="font-label-caps text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
                05 // DATA ESTIMATES &amp; SCHEDULE DISCLOSURE
              </div>
              <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Match countdowns, the goal for 100 international centuries (86/100), and the estimated ≈30 remaining India ODIs (Bilateral fixtures + 2027 World Cup) are archival calculations compiled from public fixtures and projected 2027 World Cup schedules for fan appreciation. Official tournament scheduling and match selections remain at the sole authority of the ICC and BCCI.
              </p>
            </div>
          </div>

          <!-- Footer Action -->
          <div class="mt-6 pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span class="font-mono text-[10px] text-outline uppercase tracking-widest text-center sm:text-left">
              CANONICAL RETROSPECTIVE • 18 | ONE LAST CHAPTER
            </span>
            <button id="vk-about-ack-btn" 
                    type="button" 
                    class="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-primary-fixed text-on-primary font-label-caps text-xs tracking-widest uppercase font-bold transition-colors cursor-pointer">
              ACKNOWLEDGE &amp; CLOSE
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function buildNavigationMarkup(currentFolder) {
    const needsSpacer = !FULL_BLEED_PAGES.includes(currentFolder) && !PADDED_MAIN_PAGES.includes(currentFolder);

    return `
      <style>
        /* Was a hardcoded stale gold that matched no token in the palette.
           Reading the token also means this cannot drift if the gold is
           retuned. */
        .vk-nav-link:focus-visible { outline: 2px solid var(--color-primary); outline-offset: -2px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes vkNavFade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: vkNavFade 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      </style>

      <!-- PERSISTENT OBSIDIAN GOLD MASTER NAVIGATION -->
      <header id="vk-global-header" class="fixed top-0 left-0 right-0 h-14 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#262626] z-50 select-none">
        <div class="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 h-full flex items-center justify-between gap-2">
          
          <!-- LEFT BRAND MARK -->
          <div class="flex items-center gap-2.5 shrink-0">
            <a href="../18_one_last_chapter_hero/code.html" class="flex items-center gap-2 group py-1" title="18 | ONE LAST CHAPTER">
              <span class="font-headline-lg text-primary text-2xl font-bold tracking-tight leading-none group-hover:text-primary-fixed transition-colors">18</span>
              <span class="w-px h-4 bg-outline-variant/60"></span>
              <!-- Was hidden from sm up, which put this ~185px wordmark in the
                   bar from 640px while the 6 primary sections only appear at xl
                   (1280px). Between 1280-1536px the bar carried brand + 6
                   sections + ABOUT + DOSSIERS, and the nav element hides its own
                   overflow (overflow-x-auto no-scrollbar), so any excess scrolled
                   away with no scrollbar to signal it. Holding the wordmark until
                   2xl frees that width; the 18 mark still carries the identity. -->
              <span class="vk-brand-wordmark font-label-caps text-xs text-on-surface tracking-[0.22em] uppercase font-bold group-hover:text-primary transition-colors">ONE LAST CHAPTER</span>
            </a>
          </div>

          <!-- DESKTOP PRIMARY SECTIONS (01 - 09) -->
          <nav aria-label="Master Site Sections" class="hidden xl:flex items-center h-full overflow-x-auto no-scrollbar gap-0.5">
            ${renderDesktopNav(currentFolder)}
          </nav>

          <!-- RIGHT ACTIONS: DOSSIERS QUICK LINKS & MOBILE TOGGLE -->
          <div class="flex items-center gap-2 shrink-0">
            <a href="../18_82_vs_pakistan_melbourne_2022/code.html" 
               class="hidden md:inline-flex items-center gap-1 px-2.5 py-1 border border-outline-variant/40 hover:border-primary/60 text-on-surface-variant hover:text-primary font-label-caps text-[10px] tracking-widest uppercase transition-colors ${currentFolder === '18_82_vs_pakistan_melbourne_2022' ? 'border-primary text-primary bg-primary/10' : ''}"
               title="82* vs Pakistan — Melbourne 2022">
              <span>82* MCG</span>
            </a>
            <a href="../18_match_details_india_vs_australia/code.html" 
               class="hidden md:inline-flex items-center gap-1 px-2.5 py-1 border border-outline-variant/40 hover:border-primary/60 text-on-surface-variant hover:text-primary font-label-caps text-[10px] tracking-widest uppercase transition-colors ${currentFolder === '18_match_details_india_vs_australia' ? 'border-primary text-primary bg-primary/10' : ''}"
               title="Match Details & Fixtures Dossier">
              <span>FIXTURES</span>
            </a>

            <!-- MOBILE TOGGLE BUTTON -->
            <button id="vk-mobile-toggle" 
                    type="button" 
                    aria-expanded="false" 
                    aria-label="Toggle Global Navigation Menu"
                    class="xl:hidden flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary font-label-caps text-xs tracking-widest transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-base" id="vk-mobile-icon" aria-hidden="true">menu</span>
              <span class="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold">MENU</span>
            </button>
          </div>

        </div>
      </header>

      <!-- MOBILE NAVIGATION DRAWER -->
      ${renderMobileDrawer(currentFolder)}

      <!-- ABOUT / TERMS OF SERVICE MODAL -->
      ${renderAboutModal()}

      <!-- SPACER FOR FLOW PAGES (Ensures content starts below the 56px fixed bar) -->
      ${needsSpacer ? '<div id="vk-global-spacer" class="h-14 w-full shrink-0 pointer-events-none" aria-hidden="true"></div>' : ''}
    `;
  }

  // =========================================================================
  // 4. INTERACTIVE EVENT HANDLERS
  // =========================================================================

  function attachEventHandlers() {
    const dossiersBtn = document.getElementById('vk-dossiers-btn');
    const dossiersMenu = document.getElementById('vk-dossiers-menu');
    const dossiersIcon = document.getElementById('vk-dossiers-icon');

    if (dossiersBtn && dossiersMenu) {
      dossiersBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = !dossiersMenu.classList.contains('hidden');
        if (isOpen) {
          dossiersMenu.classList.add('hidden');
          dossiersBtn.setAttribute('aria-expanded', 'false');
          if (dossiersIcon) dossiersIcon.style.transform = 'rotate(0deg)';
        } else {
          dossiersMenu.classList.remove('hidden');
          dossiersBtn.setAttribute('aria-expanded', 'true');
          if (dossiersIcon) dossiersIcon.style.transform = 'rotate(180deg)';
        }
      });
    }

    const mobileToggle = document.getElementById('vk-mobile-toggle');
    const mobileDrawer = document.getElementById('vk-mobile-drawer');
    const mobileIcon = document.getElementById('vk-mobile-icon');

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = !mobileDrawer.classList.contains('hidden');
        if (isOpen) {
          mobileDrawer.classList.add('hidden');
          mobileToggle.setAttribute('aria-expanded', 'false');
          if (mobileIcon) mobileIcon.textContent = 'menu';
          document.body.classList.remove('overflow-hidden');
        } else {
          mobileDrawer.classList.remove('hidden');
          mobileToggle.setAttribute('aria-expanded', 'true');
          if (mobileIcon) mobileIcon.textContent = 'close';
          document.body.classList.add('overflow-hidden');
        }
      });
    }

    // Track the element that triggered the modal for focus restore on close
    let _aboutModalOpener = null;

    function _getFocusable(container) {
      return Array.from(container.querySelectorAll(
        'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.closest('[hidden]') && !el.closest('.hidden'));
    }

    function _trapFocus(e) {
      const modal = document.getElementById('vk-about-modal');
      if (!modal || modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeAboutModal();
        return;
      }
      const focusable = _getFocusable(modal);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    }

    function openAboutModal() {
      const modal = document.getElementById('vk-about-modal');
      if (modal) {
        _aboutModalOpener = document.activeElement;
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        modal.setAttribute('aria-hidden', 'false');
        // Move focus to the first focusable element inside the dialog
        requestAnimationFrame(function () {
          const focusable = _getFocusable(modal);
          if (focusable.length) focusable[0].focus();
        });
        document.addEventListener('keydown', _trapFocus);
      }
      if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
        mobileDrawer.classList.add('hidden');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        if (mobileIcon) mobileIcon.textContent = 'menu';
      }
    }

    function closeAboutModal() {
      const modal = document.getElementById('vk-about-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
        document.removeEventListener('keydown', _trapFocus);
        // Restore focus to the element that opened the modal
        if (_aboutModalOpener && typeof _aboutModalOpener.focus === 'function') {
          _aboutModalOpener.focus();
          _aboutModalOpener = null;
        }
      }
    }

    const aboutBtn = document.getElementById('vk-about-btn');
    if (aboutBtn) {
      aboutBtn.addEventListener('click', openAboutModal);
    }

    document.querySelectorAll('[data-vk-about-trigger="true"]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openAboutModal();
      });
    });

    const mobileAboutBtn = document.getElementById('vk-mobile-about-btn');
    if (mobileAboutBtn) {
      mobileAboutBtn.addEventListener('click', openAboutModal);
    }

    const aboutCloseBtn = document.getElementById('vk-about-close-btn');
    if (aboutCloseBtn) {
      aboutCloseBtn.addEventListener('click', closeAboutModal);
    }

    const aboutAckBtn = document.getElementById('vk-about-ack-btn');
    if (aboutAckBtn) {
      aboutAckBtn.addEventListener('click', closeAboutModal);
    }

    const aboutModal = document.getElementById('vk-about-modal');
    if (aboutModal) {
      aboutModal.addEventListener('click', function (e) {
        if (e.target === aboutModal) {
          closeAboutModal();
        }
      });
    }

    // Expose helpers globally
    window.VK18OpenAboutModal = openAboutModal;
    window.VK18CloseAboutModal = closeAboutModal;

    // Click outside listener
    document.addEventListener('click', function (e) {
      if (dossiersMenu && !dossiersMenu.classList.contains('hidden')) {
        if (!e.target.closest('.vk-dossiers-container')) {
          dossiersMenu.classList.add('hidden');
          if (dossiersBtn) dossiersBtn.setAttribute('aria-expanded', 'false');
          if (dossiersIcon) dossiersIcon.style.transform = 'rotate(0deg)';
        }
      }
    });

    // Escape key listener
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const aboutModalEl = document.getElementById('vk-about-modal');
        if (aboutModalEl && !aboutModalEl.classList.contains('hidden')) {
          closeAboutModal();
        }
        if (dossiersMenu && !dossiersMenu.classList.contains('hidden')) {
          dossiersMenu.classList.add('hidden');
          if (dossiersBtn) dossiersBtn.setAttribute('aria-expanded', 'false');
          if (dossiersIcon) dossiersIcon.style.transform = 'rotate(0deg)';
        }
        if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
          mobileDrawer.classList.add('hidden');
          if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
          if (mobileIcon) mobileIcon.textContent = 'menu';
          document.body.classList.remove('overflow-hidden');
        }
      }
    });
  }

  // =========================================================================
  // 5. MOUNT & INITIALIZATION
  // =========================================================================

  function init() {
    const currentFolder = getCurrentFolder();
    const markup = buildNavigationMarkup(currentFolder);

    // Target container: #vk-global-nav if present, otherwise prepend to body
    let container = document.getElementById('vk-global-nav');
    if (!container) {
      container = document.createElement('div');
      container.id = 'vk-global-nav';
      document.body.insertBefore(container, document.body.firstChild);
    }

    container.innerHTML = markup;
    attachEventHandlers();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    primarySections: PRIMARY_SECTIONS,
    detailSections: DETAIL_SECTIONS,
    getCurrentFolder,
    openAboutModal: function () {
      if (typeof window.VK18OpenAboutModal === 'function') {
        window.VK18OpenAboutModal();
      }
    },
    closeAboutModal: function () {
      if (typeof window.VK18CloseAboutModal === 'function') {
        window.VK18CloseAboutModal();
      }
    },
    init
  };
});
