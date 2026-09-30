/**
 * 18 | ONE LAST CHAPTER — CENTRALIZED CAREER & COUNTDOWN DATA
 * ============================================================
 * Single source of truth for all dynamic countdowns, match information,
 * India ODI schedule, remaining ODI counts, and milestone target dates.
 *
 * Rules:
 * 1. Do NOT invent or guess dates, venues, or fixtures.
 * 2. Unconfirmed/unknown values are strictly null or 'TBD'.
 * 3. All countdown calculations are dynamic from new Date().
 * 4. The “ODIs Remaining” count is dynamically derived from upcoming fixtures in indiaODISchedule.
 * 5. Strictly excludes IPL and domestic franchise cricket.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const api = factory();
    root.VK18Data = api.data;
    root.VK18Countdown = api.countdown;
    root.VK18Career = api;
    try {
      Object.defineProperty(root, 'indiaODISchedule', {
        get() { return api.data.indiaODISchedule; },
        set(v) { api.data.indiaODISchedule = v; },
        configurable: true,
        enumerable: true
      });
      Object.defineProperty(root, 'remainingIndiaODIs', {
        get() { return api.data.remainingIndiaODIs; },
        set(v) { api.data.remainingIndiaODIs = v; },
        configurable: true,
        enumerable: true
      });
      Object.defineProperty(root, 'worldCup2027FinalDate', {
        get() { return api.data.worldCup2027FinalDate; },
        set(v) { api.data.worldCup2027.finalDate = v; },
        configurable: true,
        enumerable: true
      });
      Object.defineProperty(root, 'worldCup2027StartDate', {
        get() { return api.data.worldCup2027StartDate; },
        set(v) { api.data.worldCup2027.startDate = v; },
        configurable: true,
        enumerable: true
      });
      Object.defineProperty(root, 'worldCup2027TournamentInfo', {
        get() { return api.data.worldCup2027TournamentInfo; },
        configurable: true,
        enumerable: true
      });
      Object.defineProperty(root, 'estimatedRemainingIndiaODIs', {
        get() { return api.data.estimatedRemainingIndiaODIs; },
        configurable: true,
        enumerable: true
      });
      Object.defineProperty(root, 'centuryGoal', {
        get() { return api.data.centuryGoal; },
        set(v) {
          if (typeof v === 'object' && v !== null) {
            if (v.current !== undefined) api.data.centuryGoal.current = v.current;
            if (v.target !== undefined) api.data.centuryGoal.target = v.target;
            if (v.matchesRemaining !== undefined) api.data.centuryGoal.matchesRemaining = v.matchesRemaining;
          }
        },
        configurable: true,
        enumerable: true
      });
    } catch (e) {
      root.indiaODISchedule = api.data.indiaODISchedule;
      root.remainingIndiaODIs = api.data.remainingIndiaODIs;
      root.worldCup2027FinalDate = api.data.worldCup2027FinalDate;
      root.worldCup2027StartDate = api.data.worldCup2027StartDate;
      root.worldCup2027TournamentInfo = api.data.worldCup2027TournamentInfo;
      root.estimatedRemainingIndiaODIs = api.data.estimatedRemainingIndiaODIs;
      root.centuryGoal = api.data.centuryGoal;
      root.setCenturyGoal = function (opts) {
        return api.setCenturyGoal ? api.setCenturyGoal(opts) : api.data.setCenturyGoal(opts);
      };
    }
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // =========================================================================
  // CENTRAL CONFIGURATION: OPPONENT DIRECTORY & HELPERS
  // =========================================================================
  const OPPONENT_DIRECTORY = {
    'Australia': { code: 'AUS', flag: '🇦🇺' },
    'England': { code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    'South Africa': { code: 'RSA', flag: '🇿🇦' },
    'New Zealand': { code: 'NZ', flag: '🇳🇿' },
    'Pakistan': { code: 'PAK', flag: '🇵🇰' },
    'Sri Lanka': { code: 'SL', flag: '🇱🇰' },
    'West Indies': { code: 'WI', flag: '🌴' },
    'Bangladesh': { code: 'BAN', flag: '🇧🇩' },
    'Afghanistan': { code: 'AFG', flag: '🇦🇫' },
    'Zimbabwe': { code: 'ZIM', flag: '🇿🇼' }
  };

  function getOpponentInfo(opponent) {
    if (!opponent || opponent === 'TBD') {
      return { name: 'TBD', code: 'TBD', flag: '🏏' };
    }
    const found = OPPONENT_DIRECTORY[opponent];
    if (found) {
      return { name: opponent, code: found.code, flag: found.flag };
    }
    return {
      name: opponent,
      code: opponent.substring(0, 3).toUpperCase(),
      flag: '🏏'
    };
  }

  function getVenueImage(venueKey, fallbackUrl) {
    try {
      if (typeof self !== 'undefined' && self.VK18Images && self.VK18Images.venues && self.VK18Images.venues[venueKey]) {
        return self.VK18Images.venues[venueKey].src;
      }
      if (typeof window !== 'undefined' && window.VK18Images && window.VK18Images.venues && window.VK18Images.venues[venueKey]) {
        return window.VK18Images.venues[venueKey].src;
      }
      if (typeof VK18Images !== 'undefined' && VK18Images.venues && VK18Images.venues[venueKey]) {
        return VK18Images.venues[venueKey].src;
      }
    } catch (e) {}
    return fallbackUrl || '../assets/images/stadium-colossal-arena-panoramic.png';
  }

  // =========================================================================
  // CENTRAL CONFIGURATION: INDIA ODI SCHEDULE (indiaODISchedule)
  // =========================================================================
  // Single source of truth for all India ODI fixtures leading up to World Cup 2027.
  // STRICTLY EXCLUDES IPL / RCB fixtures (India International ODIs Only).
  //
  // Supported fields per fixture:
  // - opponent: string (e.g. 'Australia', 'England', 'South Africa')
  // - date: ISO string (e.g. '2025-10-18T14:00:00+05:30') or 'TBD' / null
  // - venue: string (e.g. 'Wankhede Stadium') or 'TBD'
  // - city: string (e.g. 'Mumbai') or 'TBD'
  // - status: 'upcoming' | 'completed' | 'TBD'
  // - officialTicketUrl: string (official booking portal) or '#' / null
  // - matchDetailsUrl: string (relative link to match details page)
  //
  // Helper aliases & archival metadata:
  // - ticketUrl: alias for officialTicketUrl
  // - detailsPage: alias for matchDetailsUrl
  // - homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' }
  // - awayTeam: dynamically resolved from opponent
  //
  // The “ODIs Remaining” count is dynamically derived from upcoming fixtures:
  // Count = fixtures where status === 'upcoming'.
  // Setting a fixture's status to 'completed' automatically decrements the count.
  //
  // The “Next India ODI” is resolved from the current date, not from array
  // order or the status field: the earliest fixture whose start time is still
  // ahead of now. Completed fixtures — and any fixture whose date has passed —
  // are never surfaced, and when nothing remains the next match resolves to
  // null so every consumer renders 'TBD'.
  const indiaODISchedule = [
    // ============================================================
    // OFFICIALLY ANNOUNCED INDIA ODI FIXTURES
    // Source: BCCI & NZC official schedule announcements.
    //
    // *** THIS LIST IS OPEN-ENDED — NOT FIXED AT 14 ***
    // Currently confirmed: 14 fixtures (as of 28 Sep 2026).
    // More series will be appended as officially announced
    // (e.g. pre-WC bilateral series, South Africa away,
    // additional home series, etc.).
    //
    // World Cup 2027 group stage & knockout fixtures will be added
    // separately under a dedicated section once the ICC officially
    // releases the full match schedule (expected ~Oct 1, 2026).
    //
    // HOW TO ADD A NEW FIXTURE:
    //   1. Append a new object to this array (increment id/index/appearanceNo).
    //   2. Set status: 'upcoming'.
    //   3. Save — remainingIndiaODIs updates automatically everywhere.
    //   No other file needs changing.
    //
    // Status: 'completed' if match date is in the past, 'upcoming' otherwise.
    // Next-fixture resolution is date-driven, so a fixture rolls off the
    // "next India ODI" slot automatically once its start time passes — no
    // status edit is needed for the site to stay current.
    // Current reference date: 28 SEPTEMBER 2026.
    // IPL and domestic franchise cricket are strictly excluded.
    // ============================================================

    // --- West Indies Home Series (September–October 2026) ---
    {
      id: 'match-01',
      index: 1,
      appearanceNo: 464,
      ref: 'ACT IV • REF 18/TRIVANDRUM-WI',
      archiveRef: 'OD-2026-IND-WI-001',
      series: 'India vs West Indies ODI Series 2026',
      title: 'IND VS WI — 1ST ODI',
      opponent: 'West Indies',
      date: '2026-09-27T14:00:00+05:30',
      dateDisplay: '27 SEPTEMBER 2026',
      dateSubtext: 'Day Match at Greenfield International',
      time: '14:00 IST',
      timeSubtext: 'Indian Standard Time (IST) • 14:00 IST',
      venue: 'Greenfield International Stadium',
      city: 'Trivandrum',
      territory: 'Kerala, Republic of India',
      capacity: 'Cap: 55,000 • North & South Stands',
      format: '50-Over ODI Bilateral Series — 1st ODI',
      status: 'completed',
      allocationStatus: 'COMPLETED',
      statusText: 'COMPLETED',
      ticketPortal: 'BCCI OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.bcci.tv/',
      ticketUrl: 'https://www.bcci.tv/',
      venueGuide: 'GREENFIELD ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('greenfield_trivandrum', '../assets/images/stadium-electric-packed-stands.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-01',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-01',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-02',
      index: 2,
      appearanceNo: 465,
      ref: 'ACT IV • REF 18/GUWAHATI-WI',
      archiveRef: 'OD-2026-IND-WI-002',
      series: 'India vs West Indies ODI Series 2026',
      title: 'IND VS WI — 2ND ODI',
      opponent: 'West Indies',
      date: '2026-09-30T14:00:00+05:30',
      dateDisplay: '30 SEPTEMBER 2026',
      dateSubtext: 'Day Match at Barsapara',
      time: '14:00 IST',
      timeSubtext: 'Indian Standard Time (IST) • 14:00 IST',
      venue: 'Barsapara Cricket Stadium',
      city: 'Guwahati',
      territory: 'Assam, Republic of India',
      capacity: 'Cap: 40,000 • East & West Stands',
      format: '50-Over ODI Bilateral Series — 2nd ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'BCCI OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.bcci.tv/',
      ticketUrl: 'https://www.bcci.tv/',
      venueGuide: 'BARSAPARA ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('barsapara_guwahati', '../assets/images/stadium-electric-packed-stands.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-02',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-02',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-03',
      index: 3,
      appearanceNo: 466,
      ref: 'ACT IV • REF 18/NEWCHANDIGARH-WI',
      archiveRef: 'OD-2026-IND-WI-003',
      series: 'India vs West Indies ODI Series 2026',
      title: 'IND VS WI — 3RD ODI',
      opponent: 'West Indies',
      date: '2026-10-03T14:00:00+05:30',
      dateDisplay: '03 OCTOBER 2026',
      dateSubtext: 'Day Match at IS Bindra PCA Stadium',
      time: '14:00 IST',
      timeSubtext: 'Indian Standard Time (IST) • 14:00 IST',
      venue: 'IS Bindra PCA Stadium',
      city: 'New Chandigarh',
      territory: 'Punjab, Republic of India',
      capacity: 'Cap: 26,000 • Pavilion & Club House Stands',
      format: '50-Over ODI Bilateral Series — 3rd ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'BCCI OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.bcci.tv/',
      ticketUrl: 'https://www.bcci.tv/',
      venueGuide: 'PCA MULLANPUR ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('pcamullanpur_newchandigarh', '../assets/images/stadium-legendary-packed-arena.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-03',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-03',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },

    // --- India Tour of New Zealand (Centenary Celebration — November 2026) ---
    {
      id: 'match-04',
      index: 4,
      appearanceNo: 467,
      ref: 'ACT IV • REF 18/AUCKLAND-NZ',
      archiveRef: 'OD-2026-IND-NZ-001',
      series: 'India Tour of New Zealand ODI Series 2026',
      title: 'IND VS NZ — 1ST ODI',
      opponent: 'New Zealand',
      date: '2026-11-04T07:30:00+05:30',
      dateDisplay: '04 NOVEMBER 2026',
      dateSubtext: 'Day/Night Match at Eden Park',
      time: '07:30 IST',
      timeSubtext: 'Indian Standard Time (IST) • 07:30 IST',
      venue: 'Eden Park',
      city: 'Auckland',
      territory: 'Auckland, New Zealand',
      capacity: 'Cap: 41,000 • North & West Stands',
      format: '50-Over ODI Bilateral Series — 1st ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'NZC OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.nzc.nz/',
      ticketUrl: 'https://www.nzc.nz/',
      venueGuide: 'EDEN PARK ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('edenpark_auckland', '../assets/images/stadium-night-pitch-atmospheric-mist.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-04',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-04',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-05',
      index: 5,
      appearanceNo: 468,
      ref: 'ACT IV • REF 18/WELLINGTON-NZ',
      archiveRef: 'OD-2026-IND-NZ-002',
      series: 'India Tour of New Zealand ODI Series 2026',
      title: 'IND VS NZ — 2ND ODI',
      opponent: 'New Zealand',
      date: '2026-11-07T07:30:00+05:30',
      dateDisplay: '07 NOVEMBER 2026',
      dateSubtext: 'Day/Night Match at Sky Stadium',
      time: '07:30 IST',
      timeSubtext: 'Indian Standard Time (IST) • 07:30 IST',
      venue: 'Sky Stadium',
      city: 'Wellington',
      territory: 'Wellington, New Zealand',
      capacity: 'Cap: 34,500 • The Cake Tin Bowl',
      format: '50-Over ODI Bilateral Series — 2nd ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'NZC OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.nzc.nz/',
      ticketUrl: 'https://www.nzc.nz/',
      venueGuide: 'SKY STADIUM ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('skystadium_wellington', '../assets/images/stadium-night-pitch-atmospheric-mist.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-05',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-05',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-06',
      index: 6,
      appearanceNo: 469,
      ref: 'ACT IV • REF 18/HAMILTON-NZ',
      archiveRef: 'OD-2026-IND-NZ-003',
      series: 'India Tour of New Zealand ODI Series 2026',
      title: 'IND VS NZ — 3RD ODI',
      opponent: 'New Zealand',
      date: '2026-11-10T07:30:00+05:30',
      dateDisplay: '10 NOVEMBER 2026',
      dateSubtext: 'Day/Night Match at Seddon Park',
      time: '07:30 IST',
      timeSubtext: 'Indian Standard Time (IST) • 07:30 IST',
      venue: 'Seddon Park',
      city: 'Hamilton',
      territory: 'Waikato, New Zealand',
      capacity: 'Cap: 10,500 • Village Green & Pavilion',
      format: '50-Over ODI Bilateral Series — 3rd ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'NZC OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.nzc.nz/',
      ticketUrl: 'https://www.nzc.nz/',
      venueGuide: 'SEDDON PARK ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('seddonpark_hamilton', '../assets/images/stadium-legendary-ground-evening.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-06',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-06',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-07',
      index: 7,
      appearanceNo: 470,
      ref: 'ACT IV • REF 18/MTMAUNGANUI-NZ-1',
      archiveRef: 'OD-2026-IND-NZ-004',
      series: 'India Tour of New Zealand ODI Series 2026',
      title: 'IND VS NZ — 4TH ODI',
      opponent: 'New Zealand',
      date: '2026-11-13T07:30:00+05:30',
      dateDisplay: '13 NOVEMBER 2026',
      dateSubtext: 'Day/Night Match at Bay Oval',
      time: '07:30 IST',
      timeSubtext: 'Indian Standard Time (IST) • 07:30 IST',
      venue: 'Bay Oval',
      city: 'Mount Maunganui',
      territory: 'Bay of Plenty, New Zealand',
      capacity: 'Cap: 10,000 • Grass Embankments',
      format: '50-Over ODI Bilateral Series — 4th ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'NZC OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.nzc.nz/',
      ticketUrl: 'https://www.nzc.nz/',
      venueGuide: 'BAY OVAL ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('bayoval_mtmaunganui', '../assets/images/stadium-legendary-packed-arena.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-07',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-07',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-08',
      index: 8,
      appearanceNo: 471,
      ref: 'ACT IV • REF 18/MTMAUNGANUI-NZ-2',
      archiveRef: 'OD-2026-IND-NZ-005',
      series: 'India Tour of New Zealand ODI Series 2026',
      title: 'IND VS NZ — 5TH ODI',
      opponent: 'New Zealand',
      date: '2026-11-15T07:30:00+05:30',
      dateDisplay: '15 NOVEMBER 2026',
      dateSubtext: 'Day/Night Match at Bay Oval',
      time: '07:30 IST',
      timeSubtext: 'Indian Standard Time (IST) • 07:30 IST',
      venue: 'Bay Oval',
      city: 'Mount Maunganui',
      territory: 'Bay of Plenty, New Zealand',
      capacity: 'Cap: 10,000 • Grass Embankments',
      format: '50-Over ODI Bilateral Series — 5th ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'NZC OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.nzc.nz/',
      ticketUrl: 'https://www.nzc.nz/',
      venueGuide: 'BAY OVAL ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('bayoval_mtmaunganui', '../assets/images/stadium-legendary-packed-arena.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-08',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-08',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },

    // --- Sri Lanka Home Series (December 2026) ---
    {
      id: 'match-09',
      index: 9,
      appearanceNo: 472,
      ref: 'ACT IV • REF 18/DELHI-SL',
      archiveRef: 'OD-2026-IND-SL-001',
      series: 'India vs Sri Lanka ODI Series 2026',
      title: 'IND VS SL — 1ST ODI',
      opponent: 'Sri Lanka',
      date: '2026-12-13T14:00:00+05:30',
      dateDisplay: '13 DECEMBER 2026',
      dateSubtext: 'Winter Day Match at Arun Jaitley Stadium',
      time: '14:00 IST',
      timeSubtext: 'Indian Standard Time (IST) • 14:00 IST',
      venue: 'Arun Jaitley Stadium',
      city: 'Delhi',
      territory: 'Delhi, Republic of India',
      capacity: 'Cap: 41,820 • Pavilion & Garha Stands',
      format: '50-Over ODI Bilateral Series — 1st ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'BCCI OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.bcci.tv/',
      ticketUrl: 'https://www.bcci.tv/',
      venueGuide: 'ARUN JAITLEY ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('arunjaitley_delhi', '../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-hindustan-times.jpg'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-09',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-09',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-10',
      index: 10,
      appearanceNo: 473,
      ref: 'ACT IV • REF 18/BENGALURU-SL',
      archiveRef: 'OD-2026-IND-SL-002',
      series: 'India vs Sri Lanka ODI Series 2026',
      title: 'IND VS SL — 2ND ODI',
      opponent: 'Sri Lanka',
      date: '2026-12-16T14:00:00+05:30',
      dateDisplay: '16 DECEMBER 2026',
      dateSubtext: 'Winter Day Match at Chinnaswamy',
      time: '14:00 IST',
      timeSubtext: 'Indian Standard Time (IST) • 14:00 IST',
      venue: 'M. Chinnaswamy Stadium',
      city: 'Bengaluru',
      territory: 'Karnataka, Republic of India',
      capacity: 'Cap: 40,000 • East & West Wing Stands',
      format: '50-Over ODI Bilateral Series — 2nd ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'BCCI OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.bcci.tv/',
      ticketUrl: 'https://www.bcci.tv/',
      venueGuide: 'CHINNASWAMY ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('chinnaswamy_bengaluru', '../assets/images/stadium-passionate-crowd-floodlights.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-10',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-10',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-11',
      index: 11,
      appearanceNo: 474,
      ref: 'ACT IV • REF 18/AHMEDABAD-SL',
      archiveRef: 'OD-2026-IND-SL-003',
      series: 'India vs Sri Lanka ODI Series 2026',
      title: 'IND VS SL — 3RD ODI',
      opponent: 'Sri Lanka',
      date: '2026-12-19T14:00:00+05:30',
      dateDisplay: '19 DECEMBER 2026',
      dateSubtext: 'Winter Day Match at Narendra Modi Stadium',
      time: '14:00 IST',
      timeSubtext: 'Indian Standard Time (IST) • 14:00 IST',
      venue: 'Narendra Modi Stadium',
      city: 'Ahmedabad',
      territory: 'Gujarat, Republic of India',
      capacity: "Cap: 132,000 • The World's Largest Cricket Ground",
      format: '50-Over ODI Bilateral Series — 3rd ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'BCCI OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.bcci.tv/',
      ticketUrl: 'https://www.bcci.tv/',
      venueGuide: 'NARENDRA MODI STADIUM GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('narendramodi_ahmedabad', '../assets/images/stadium-colossal-arena-panoramic.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-11',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-11',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },

    // --- Zimbabwe Home Series (January 2027) ---
    {
      id: 'match-12',
      index: 12,
      appearanceNo: 475,
      ref: 'ACT IV • REF 18/KOLKATA-ZIM',
      archiveRef: 'OD-2027-IND-ZIM-001',
      series: 'India vs Zimbabwe ODI Series 2027',
      title: 'IND VS ZIM — 1ST ODI',
      opponent: 'Zimbabwe',
      date: '2027-01-03T14:00:00+05:30',
      dateDisplay: '03 JANUARY 2027',
      dateSubtext: 'New Year Day Match at Eden Gardens',
      time: '14:00 IST',
      timeSubtext: 'Indian Standard Time (IST) • 14:00 IST',
      venue: 'Eden Gardens',
      city: 'Kolkata',
      territory: 'West Bengal, Republic of India',
      capacity: 'Cap: 68,000 • B, C, D & Club House Stands',
      format: '50-Over ODI Bilateral Series — 1st ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'BCCI OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.bcci.tv/',
      ticketUrl: 'https://www.bcci.tv/',
      venueGuide: 'EDEN GARDENS ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('edengardens_kolkata', '../assets/images/eden-gardens-2023-century-49-celebration-surjeet-yadav.webp'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-12',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-12',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-13',
      index: 13,
      appearanceNo: 476,
      ref: 'ACT IV • REF 18/HYDERABAD-ZIM',
      archiveRef: 'OD-2027-IND-ZIM-002',
      series: 'India vs Zimbabwe ODI Series 2027',
      title: 'IND VS ZIM — 2ND ODI',
      opponent: 'Zimbabwe',
      date: '2027-01-06T14:00:00+05:30',
      dateDisplay: '06 JANUARY 2027',
      dateSubtext: 'January Day Match at Rajiv Gandhi',
      time: '14:00 IST',
      timeSubtext: 'Indian Standard Time (IST) • 14:00 IST',
      venue: 'Rajiv Gandhi International Cricket Stadium',
      city: 'Hyderabad',
      territory: 'Telangana, Republic of India',
      capacity: 'Cap: 55,000 • Pavilion & Gallery Stands',
      format: '50-Over ODI Bilateral Series — 2nd ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'BCCI OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.bcci.tv/',
      ticketUrl: 'https://www.bcci.tv/',
      venueGuide: 'RAJIV GANDHI STADIUM GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('rajivgandhi_hyderabad', '../assets/images/stadium-passionate-crowd-floodlights.png'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-13',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-13',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    },
    {
      id: 'match-14',
      index: 14,
      appearanceNo: 477,
      ref: 'ACT IV • REF 18/MUMBAI-ZIM',
      archiveRef: 'OD-2027-IND-ZIM-003',
      series: 'India vs Zimbabwe ODI Series 2027',
      title: 'IND VS ZIM — 3RD ODI',
      opponent: 'Zimbabwe',
      date: '2027-01-09T14:00:00+05:30',
      dateDisplay: '09 JANUARY 2027',
      dateSubtext: 'January Day Match at Wankhede',
      time: '14:00 IST',
      timeSubtext: 'Indian Standard Time (IST) • 14:00 IST',
      venue: 'Wankhede Stadium',
      city: 'Mumbai',
      territory: 'Maharashtra, Republic of India',
      capacity: 'Cap: 33,108 • South Stand & Pavilion',
      format: '50-Over ODI Bilateral Series — 3rd ODI',
      status: 'upcoming',
      allocationStatus: 'REGISTRATION OPEN',
      statusText: 'REGISTRATION OPEN',
      ticketPortal: 'BCCI OFFICIAL PORTAL',
      officialTicketUrl: 'https://www.bcci.tv/',
      ticketUrl: 'https://www.bcci.tv/',
      venueGuide: 'MCA ARENA GUIDE',
      get imageSrc() { return this._imageSrc || getVenueImage('wankhede_mumbai', '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp'); },
      set imageSrc(v) { this._imageSrc = v; },
      matchDetailsUrl: '../18_match_details_india_vs_australia/code.html?match=match-14',
      detailsPage: '../18_match_details_india_vs_australia/code.html?match=match-14',
      homeTeam: { name: 'India', code: 'IND', flag: '🇮🇳' },
      get awayTeam() { return getOpponentInfo(this.opponent); }
    }
  ];

  /**
   * Derive Remaining India ODIs count from upcoming fixtures.
   * Matches with status === 'upcoming' (or 'scheduled') are counted.
   * Completed fixtures and unratified TBD fixtures are excluded from the active count.
   */
  function deriveRemainingIndiaODIs(schedule) {
    if (!Array.isArray(schedule)) return 0;
    return schedule.filter(fixture => {
      if (!fixture || typeof fixture !== 'object') return false;
      const s = String(fixture.status || '').toLowerCase().trim();
      return s === 'upcoming' || s === 'scheduled';
    }).length;
  }

  // =========================================================================
  // DYNAMIC NEXT-FIXTURE RESOLUTION (DATE AUTHORITATIVE)
  // =========================================================================
  // The current date — never array order and never a stale `status` field —
  // decides which India ODI is "next". A fixture whose start time has passed
  // is never surfaced as the next match, even if its status still reads
  // 'upcoming'; a fixture explicitly marked completed is never surfaced either.
  // When no fixture remains ahead of now, resolvers return null so every
  // consumer renders 'TBD' instead of an outdated match.

  const TERMINAL_FIXTURE_STATUSES = ['completed', 'complete', 'abandoned', 'cancelled', 'canceled'];

  /**
   * Fixture start timestamp in ms, or null when the date is missing/TBD/unparseable.
   */
  function getFixtureTimestamp(fixture) {
    if (!fixture || typeof fixture !== 'object') return null;
    if (isTbd(fixture.date)) return null;
    const ts = new Date(fixture.date).getTime();
    return isNaN(ts) ? null : ts;
  }

  /**
   * True when a fixture is explicitly marked terminal (completed/abandoned/etc).
   */
  function isCompletedFixture(fixture) {
    if (!fixture || typeof fixture !== 'object') return false;
    const s = String(fixture.status || '').toLowerCase().trim();
    return TERMINAL_FIXTURE_STATUSES.indexOf(s) !== -1;
  }

  /**
   * Fixtures still ahead of `now`, earliest start first.
   * Excludes completed fixtures and fixtures whose start time has passed.
   * Fixtures with an unknown/TBD date cannot be ordered by date and are omitted.
   */
  function getUpcomingMatches(schedule, now = new Date()) {
    if (!Array.isArray(schedule)) return [];
    const nowTime = now instanceof Date ? now.getTime() : new Date(now).getTime();
    if (isNaN(nowTime)) return [];
    return schedule
      .filter(fixture => {
        if (isCompletedFixture(fixture)) return false;
        const ts = getFixtureTimestamp(fixture);
        return ts !== null && ts > nowTime;
      })
      .sort((a, b) => getFixtureTimestamp(a) - getFixtureTimestamp(b));
  }

  /**
   * The single next India ODI, or null when nothing remains ahead of `now`.
   */
  function getNextMatch(schedule, now = new Date()) {
    const upcoming = getUpcomingMatches(schedule, now);
    return upcoming.length > 0 ? upcoming[0] : null;
  }

  // =========================================================================
  // CENTRAL CONFIGURATION: 2027 WORLD CUP
  // =========================================================================
  // Single source of truth for 2027 World Cup countdown & tournament information.
  // - worldCup2027FinalDate: ISO-8601 target string for the potential final date ('2027-11-21').
  // - worldCup2027FinalNote: Note indicating conditional qualification ('If India plays the final').
  // - worldCup2027StartDate: ISO-8601 target string or null/'TBD' if unconfirmed.
  //   If null/'TBD', all countdowns and displays automatically show 'TBD'.
  // - worldCup2027StartTime: Start time string or null/'TBD' if unconfirmed.
  // - worldCup2027TournamentInfo: Central tournament details and metadata.
  const worldCup2027FinalDate = '2027-11-21T17:00:00+05:30';
  const worldCup2027FinalNote = 'If India plays the final';
  const worldCup2027StartDate = '2027-10-15T17:00:00+05:30';
  const worldCup2027StartTime = '17:00 IST';

  const worldCup2027TournamentInfo = {
    name: "ICC Men's Cricket World Cup 2027",
    edition: '2027',
    year: 2027,
    startDate: worldCup2027StartDate,
    startTime: worldCup2027StartTime,
    finalDate: worldCup2027FinalDate,
    targetDate: worldCup2027FinalDate,
    finalNote: worldCup2027FinalNote,
    note: worldCup2027FinalNote,
    window: 'October – November 2027',
    hosts: 'South Africa • Zimbabwe • Namibia',
    hostNations: ['South Africa', 'Zimbabwe', 'Namibia'],
    format: '50-Over One Day International (ODI)',
    cycle: '50-OVER MONUMENTAL QUADRENNIAL',
    coordinates: '-26.2041° S, 28.0473° E',
    title: '2027: HIS LAST WORLD CUP',
    subtitle: 'FOR INDIA',
    campaignTitle: 'THE FINAL ODI CHAPTER // FOR INDIA',
    status: worldCup2027FinalDate ? 'CONFIRMED SCHEDULE' : 'TBD',
    notes: 'Potential final date: 2027-11-21 (If India plays the final). Confirmed as his final World Cup for India. Excludes IPL and domestic franchise cricket.'
  };

  // =========================================================================
  // CENTRAL CONFIGURATION: ESTIMATED REMAINING INDIA ODIS (BROADER JOURNEY)
  // =========================================================================
  // Single source of truth for the broader remaining India ODI journey:
  // - Bilateral ODIs before the 2027 World Cup (currently announced schedule)
  // - PLUS India's potential 2027 World Cup ODIs
  // - Around ~30 approximate fixtures (not claiming an exact final number is known)
  // Configurable so it can be updated as bilateral schedules and World Cup fixtures crystallize.
  const estimatedRemainingIndiaODIsConfig = {
    approximateTotal: 30,
    displayCount: '~30',
    label: 'Estimated remaining India ODIs',
    subtext: 'Bilateral fixtures + 2027 World Cup',
    notes: 'Estimated total combining currently announced bilateral fixtures and potential 2027 World Cup matches. Exact fixture count is not yet final.'
  };

  // =========================================================================
  // CENTRAL CONFIGURATION: GOAL FOR 100 INTERNATIONAL CENTURIES
  // =========================================================================
  const centuryGoalConfig = {
    currentCenturies: 86,
    targetCenturies: 100,
    matchesRemaining: 30,
    isApproximate: true,
    title: 'THE FINAL QUEST // 100 INTERNATIONAL CENTURIES',
    subtitle: 'RACING AGAINST THE SETTING SUN',
    subtext: 'Bilateral fixtures + 2027 World Cup (~30 Approx. Matches)',
    notes: 'Historical pursuit of 100 international centuries across estimated ~30 remaining India ODIs.'
  };

  function notifyCenturyGoalUpdate() {
    try {
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('vk18:century-goal-updated', {
          detail: (typeof VK18_DATA !== 'undefined' && VK18_DATA.centuryGoal) ? VK18_DATA.centuryGoal : null
        }));
      }
    } catch (e) {}
  }

  function setCenturyGoal(options) {
    if (!options || typeof options !== 'object') return (typeof VK18_DATA !== 'undefined' ? VK18_DATA.centuryGoal : null);
    if (options.current !== undefined) VK18_DATA.centuryGoal.current = options.current;
    if (options.target !== undefined) VK18_DATA.centuryGoal.target = options.target;
    if (options.matchesRemaining !== undefined) VK18_DATA.centuryGoal.matchesRemaining = options.matchesRemaining;
    if (options.title !== undefined) VK18_DATA.centuryGoal.title = options.title;
    if (options.subtitle !== undefined) VK18_DATA.centuryGoal.subtitle = options.subtitle;
    if (options.subtext !== undefined) VK18_DATA.centuryGoal.subtext = options.subtext;
    notifyCenturyGoalUpdate();
    return VK18_DATA.centuryGoal;
  }

  // --- 1. CONFIGURATION DATA ---
  const VK18_DATA = {
    // Centrally Configurable India ODI Schedule
    indiaODISchedule: indiaODISchedule,

    // Centralized Configuration: Estimated Remaining India ODIs (Broader Journey)
    estimatedRemainingIndiaODIs: {
      get count() {
        return this._count !== undefined ? this._count : estimatedRemainingIndiaODIsConfig.approximateTotal;
      },
      set count(val) {
        this._count = val;
      },
      get display() {
        if (this._display !== undefined) return this._display;
        return `~${this.count}`;
      },
      set display(val) {
        this._display = val;
      },
      get label() {
        return this._label || estimatedRemainingIndiaODIsConfig.label;
      },
      set label(val) {
        this._label = val;
      },
      get subtext() {
        return this._subtext || estimatedRemainingIndiaODIsConfig.subtext;
      },
      set subtext(val) {
        this._subtext = val;
      },
      notes: estimatedRemainingIndiaODIsConfig.notes
    },

    // Centralized Configuration: Goal for 100 International Centuries
    centuryGoal: {
      get current() {
        if (this._current !== undefined && this._current !== null) return this._current;
        return (VK18_DATA.careerStats && VK18_DATA.careerStats.totalCenturies) || centuryGoalConfig.currentCenturies;
      },
      set current(val) {
        const num = Number(val);
        this._current = isNaN(num) ? val : num;
        if (VK18_DATA.careerStats && !isNaN(num)) {
          VK18_DATA.careerStats.totalCenturies = num;
        }
        notifyCenturyGoalUpdate();
      },
      get target() {
        return this._target !== undefined ? this._target : centuryGoalConfig.targetCenturies;
      },
      set target(val) {
        const num = Number(val);
        this._target = isNaN(num) ? val : num;
        notifyCenturyGoalUpdate();
      },
      get matchesRemaining() {
        if (this._matchesRemaining !== undefined && this._matchesRemaining !== null) {
          return this._matchesRemaining;
        }
        return (VK18_DATA.estimatedRemainingIndiaODIs && VK18_DATA.estimatedRemainingIndiaODIs.count) || centuryGoalConfig.matchesRemaining;
      },
      get matchesRemainingDisplay() {
        return `~${this.matchesRemaining} APPROX.`;
      },
      get isApproximate() {
        return true;
      },
      set matchesRemaining(val) {
        const num = Number(val);
        this._matchesRemaining = isNaN(num) ? val : num;
        notifyCenturyGoalUpdate();
      },
      get needed() {
        const c = Number(this.current) || 0;
        const t = Number(this.target) || 100;
        return Math.max(0, t - c);
      },
      get progressPercentage() {
        const c = Number(this.current) || 0;
        const t = Number(this.target) || 100;
        if (t <= 0) return 0;
        return Math.min(100, Math.round((c / t) * 100));
      },
      get ratioDisplay() {
        return `${this.current}/${this.target}`;
      },
      get title() {
        return this._title || centuryGoalConfig.title;
      },
      set title(val) {
        this._title = val;
        notifyCenturyGoalUpdate();
      },
      get subtitle() {
        return this._subtitle || centuryGoalConfig.subtitle;
      },
      set subtitle(val) {
        this._subtitle = val;
        notifyCenturyGoalUpdate();
      },
      get subtext() {
        return this._subtext || centuryGoalConfig.subtext;
      },
      set subtext(val) {
        this._subtext = val;
        notifyCenturyGoalUpdate();
      }
    },
    setCenturyGoal: setCenturyGoal,

    // Dynamic Derivation of Remaining India ODIs
    // Directly derived from upcoming fixtures in indiaODISchedule rather than maintained separately.
    get remainingIndiaODIs() {
      if (this._remainingIndiaODIsOverride !== undefined && this._remainingIndiaODIsOverride !== null) {
        return this._remainingIndiaODIsOverride;
      }
      return deriveRemainingIndiaODIs(this.indiaODISchedule);
    },
    set remainingIndiaODIs(val) {
      this._remainingIndiaODIsOverride = val;
    },

    // Dynamic Upcoming Matches: playable fixtures ahead of the current date,
    // ordered earliest first (chronological ledger order for every consumer)
    get upcomingMatches() {
      return getUpcomingMatches(this.indiaODISchedule);
    },

    // Dynamic Next Match: earliest fixture still ahead of the current date.
    // Returns null when no fixture remains, so consumers render 'TBD' rather
    // than falling back to an already-completed match.
    get nextMatch() {
      return getNextMatch(this.indiaODISchedule);
    },

    // Dynamic Completed Matches: fixtures marked 'completed'
    get completedMatches() {
      if (!Array.isArray(this.indiaODISchedule)) return [];
      return this.indiaODISchedule.filter(fixture => {
        if (!fixture || typeof fixture !== 'object') return false;
        const s = String(fixture.status || '').toLowerCase().trim();
        return s === 'completed';
      });
    },

    // Central 2027 World Cup Configuration Values
    worldCup2027FinalDate: worldCup2027FinalDate,
    worldCup2027FinalNote: worldCup2027FinalNote,
    worldCup2027StartDate: worldCup2027StartDate,
    worldCup2027StartTime: worldCup2027StartTime,
    worldCup2027TournamentInfo: worldCup2027TournamentInfo,

    // Flagship Destination: ICC Men's Cricket World Cup 2027
    worldCup2027: {
      get finalDate() {
        return VK18_DATA.worldCup2027FinalDate;
      },
      set finalDate(val) {
        VK18_DATA.worldCup2027FinalDate = val;
        worldCup2027TournamentInfo.finalDate = val;
      },
      get finalNote() {
        return VK18_DATA.worldCup2027FinalNote;
      },
      set finalNote(val) {
        VK18_DATA.worldCup2027FinalNote = val;
        worldCup2027TournamentInfo.finalNote = val;
      },
      get note() {
        return VK18_DATA.worldCup2027FinalNote;
      },
      set note(val) {
        VK18_DATA.worldCup2027FinalNote = val;
        worldCup2027TournamentInfo.finalNote = val;
      },
      get startDate() {
        return VK18_DATA.worldCup2027StartDate;
      },
      set startDate(val) {
        VK18_DATA.worldCup2027StartDate = val;
        worldCup2027TournamentInfo.startDate = val;
      },
      get startTime() {
        return VK18_DATA.worldCup2027StartTime;
      },
      set startTime(val) {
        VK18_DATA.worldCup2027StartTime = val;
        worldCup2027TournamentInfo.startTime = val;
      },
      get targetDate() {
        return VK18_DATA.worldCup2027FinalDate || VK18_DATA.worldCup2027StartDate;
      },
      set targetDate(val) {
        VK18_DATA.worldCup2027FinalDate = val;
        worldCup2027TournamentInfo.finalDate = val;
      },
      get year() {
        return worldCup2027TournamentInfo.year;
      },
      get edition() {
        return worldCup2027TournamentInfo.edition;
      },
      get title() {
        return worldCup2027TournamentInfo.title;
      },
      get subtitle() {
        return worldCup2027TournamentInfo.subtitle;
      },
      get campaignTitle() {
        return worldCup2027TournamentInfo.campaignTitle;
      },
      get hosts() {
        return worldCup2027TournamentInfo.hosts;
      },
      get hostNations() {
        return worldCup2027TournamentInfo.hostNations;
      },
      get window() {
        return worldCup2027TournamentInfo.window;
      },
      get cycle() {
        return worldCup2027TournamentInfo.cycle;
      },
      get coordinates() {
        return worldCup2027TournamentInfo.coordinates;
      },
      get status() {
        return (VK18_DATA.worldCup2027FinalDate || VK18_DATA.worldCup2027StartDate)
          ? 'CONFIRMED SCHEDULE'
          : 'TBD';
      },
      get notes() {
        return worldCup2027TournamentInfo.notes;
      },
      get tournamentInfo() {
        return worldCup2027TournamentInfo;
      }
    },

    // Final ODI: Awaiting official BCCI farewell/retirement itinerary announcement
    // Must be null/TBD until officially ratified; no specific fixture is labeled his final ODI
    finalOdi: {
      date: null,
      status: 'TBD',
      opponent: 'TBD',
      venue: 'TBD',
      label: 'The Final ODI for India',
      notes: 'Pending official BCCI scheduling announcement. No specific fixture has been established as his final ODI.'
    },

    // Remaining ODI Ledger (India ODIs Only - Excludes IPL)
    // Synchronized dynamically with derived VK18_DATA.remainingIndiaODIs
    remainingOdis: {
      get count() {
        return VK18_DATA.remainingIndiaODIs;
      },
      set count(val) {
        VK18_DATA.remainingIndiaODIs = val;
      },
      get totalLedger() {
        return VK18_DATA.remainingIndiaODIs;
      },
      status: 'ACTIVE CADENCE',
      label: 'Remaining ODIs for India',
      scope: 'India International ODIs Only (Excludes IPL)'
    },

    // Hero Countdown Target:
    // Dynamically targets the culmination of the tribute odyssey (World Cup 2027 Final)
    heroCountdown: {
      title: 'THE FINAL ODI CHAPTER',
      subtitle: 'FOR INDIA',
      sublabel: 'LIVE TIME-LOCK // FOR INDIA',
      note: worldCup2027FinalNote,
      get targetDate() {
        return VK18_DATA.worldCup2027.targetDate;
      },
      set targetDate(val) {
        VK18_DATA.worldCup2027.targetDate = val;
      }
    },

    // Career Landmark Milestones
    careerStats: {
      runs: '28,498',
      totalCenturies: 86,
      odiCenturies: 55,
      testCenturies: 30,
      t20iCenturies: 1,
      testAverage: 46.85,
      odiAverage: 59.13,
      t20iAverage: 48.69,
      jerseyNumber: 18
    },

    // Comprehensive Official International Stats (Sourced via ESPNcricinfo & Cricbuzz; Strictly NO IPL)
    internationalStats: {
      metadata: {
        player: 'Virat Kohli',
        jersey: 18,
        country: 'India',
        sources: ['ESPNcricinfo', 'Cricbuzz'],
        scope: 'International Cricket Only (Test, ODI, T20I). Zero IPL or franchise cricket.',
        lastUpdated: 'September 2026'
      },
      summary: {
        matches: 563,
        innings: 630,
        runs: 28498,
        average: 53.20,
        centuries: 86,
        fifties: 148,
        doubleCenturies: 7,
        highestScore: '254*',
        notOuts: 88,
        ballsFaced: 36240,
        strikeRate: 78.63,
        fours: 2746,
        sixes: 309,
        catches: 319
      },
      formats: {
        odi: {
          id: 'odi',
          name: 'One Day Internationals',
          shortName: 'ODI',
          tag: '50-OVER FORMAT',
          badge: 'ODI SUPREMACY',
          heroNote: 'The undisputed master of the 50-over format: 55 centuries, 15,080 runs, and the pinnacle of run chasing.',
          matches: 315,
          innings: 303,
          runs: 15080,
          average: 59.13,
          strikeRate: 93.54,
          highestScore: '183',
          highestScoreAgainst: 'vs Pakistan, Dhaka (Asia Cup 2012)',
          centuries: 55,
          fifties: 79,
          doubleCenturies: 0,
          fours: 1354,
          sixes: 156,
          notOuts: 44,
          ballsFaced: 16120,
          catches: 154,
          chaseAverage: 65.4,
          successfulChaseAverage: 90.4,
          centuriesInChases: 28,
          worldRecords: [
            'All-time world record for most centuries in ODI history (55 centuries, surpassing Sachin Tendulkar\'s 49)',
            'Fastest batter to 8,000, 9,000, 10,000, 11,000, 12,000, 13,000, 14,000 & 15,000 ODI runs',
            'Most runs in a single ICC Men\'s Cricket World Cup tournament (765 runs at 95.62 avg, 2023)',
            '4-time ICC Men\'s ODI Cricketer of the Year (2012, 2017, 2018, 2023)',
            'Highest career batting average in successful ODI run chases in history (90.4+)'
          ]
        },
        test: {
          id: 'test',
          name: 'Test Cricket',
          shortName: 'TEST',
          tag: 'RED-BALL PINNACLE',
          badge: 'TEST RECORD',
          heroNote: 'The red-ball colossus: 7 double centuries, 9,230 runs, and India\'s most successful Test captain in history.',
          matches: 123,
          innings: 210,
          runs: 9230,
          average: 46.85,
          strikeRate: 55.60,
          highestScore: '254*',
          highestScoreAgainst: 'vs South Africa, Pune (2019)',
          centuries: 30,
          fifties: 31,
          doubleCenturies: 7,
          fours: 1027,
          sixes: 30,
          notOuts: 13,
          ballsFaced: 16600,
          catches: 115,
          worldRecords: [
            'Most double centuries by an Indian batter in Test history (7 double centuries)',
            'Most successful Indian Test captain of all time: 40 wins in 68 matches (58.8% win rate)',
            'First Asian captain to win a Test series on Australian soil (Border-Gavaskar Trophy 2018-19)',
            'Held the ICC World Test Championship Mace as #1 Test team for 5 consecutive years (2016–2021)'
          ]
        },
        t20i: {
          id: 't20i',
          name: 'Twenty20 Internationals',
          shortName: 'T20I',
          tag: '20-OVER WORLD CHAMPION',
          badge: 'T20I CANON',
          heroNote: '2024 World Cup Champion: retired from T20Is at the ultimate peak as Player of the Match in the Final.',
          matches: 125,
          innings: 117,
          runs: 4188,
          average: 48.69,
          strikeRate: 137.04,
          highestScore: '122*',
          highestScoreAgainst: 'vs Afghanistan, Dubai (Asia Cup 2022)',
          centuries: 1,
          fifties: 38,
          doubleCenturies: 0,
          fours: 369,
          sixes: 124,
          notOuts: 31,
          ballsFaced: 3056,
          catches: 50,
          worldRecords: [
            'ICC Men\'s T20 World Cup Champion (Kensington Oval, Barbados 2024)',
            'Player of the Match in the 2024 ICC T20 World Cup Final (76 off 59 balls vs South Africa)',
            'Two-time Player of the Tournament at ICC T20 World Cups (2014 & 2016)',
            'Highest career batting average in ICC T20 World Cup history (58.72 avg)'
          ]
        }
      },
      oppositionBreakdown: [
        { opponent: 'Australia', flag: '🇦🇺', matches: 102, runs: 5312, avg: 51.07, hundreds: 16, fifties: 27, topScore: '169' },
        { opponent: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matches: 89, runs: 4056, avg: 44.57, hundreds: 8, fifties: 23, topScore: '235' },
        { opponent: 'South Africa', flag: '🇿🇦', matches: 72, runs: 3345, avg: 54.83, hundreds: 8, fifties: 19, topScore: '254*' },
        { opponent: 'Sri Lanka', flag: '🇱🇰', matches: 76, runs: 4180, avg: 62.38, hundreds: 15, fifties: 19, topScore: '243' },
        { opponent: 'West Indies', flag: '🌴', matches: 74, runs: 3792, avg: 57.45, hundreds: 12, fifties: 18, topScore: '200' },
        { opponent: 'New Zealand', flag: '🇳🇿', matches: 68, runs: 3310, avg: 49.40, hundreds: 9, fifties: 17, topScore: '211' },
        { opponent: 'Pakistan', flag: '🇵🇰', matches: 27, runs: 1215, avg: 60.75, hundreds: 3, fifties: 8, topScore: '183' }
      ],
      captaincy: {
        test: { format: 'Test Matches', matches: 68, won: 40, lost: 17, drawn: 11, winPct: '58.82%' },
        odi: { format: 'One Day Internationals', matches: 95, won: 65, lost: 27, tied: 1, nr: 2, winPct: '68.42%' },
        t20i: { format: 'Twenty20 Internationals', matches: 50, won: 30, lost: 16, tied: 2, nr: 2, winPct: '60.00%' },
        combined: { format: 'All International Matches as Captain', matches: 213, won: 135, lost: 60, winPct: '63.38%' }
      }
    }
  };

  // --- 2. REUSABLE UTILITIES & COUNTDOWN CALCULATION ---

  /**
   * Check if a value is undefined, null, empty string, or 'TBD'
   */
  function isTbd(value) {
    return value === null || value === undefined || value === '' || value === 'TBD' || value === 'tbd';
  }

  /**
   * Return the value, or a fallback (default 'TBD') if missing/null
   */
  function formatValue(value, fallback = 'TBD') {
    return isTbd(value) ? fallback : value;
  }

  /**
   * Format a date string or Date object into uppercase archival format:
   * e.g., '15 OCTOBER 2027' or 'OCT 2027'. Returns 'TBD' if date is null/unknown.
   */
  function formatDate(dateInput, formatStyle = 'long') {
    if (isTbd(dateInput)) return 'TBD';
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return 'TBD';

    const monthNames = [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    const monthShort = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    const day = String(d.getDate()).padStart(2, '0');
    const month = formatStyle === 'short' ? monthShort[d.getMonth()] : monthNames[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
  }

  /**
   * Calculate exact time breakdown from current time to targetDate.
   * If targetDate is null/TBD: returns { days: 'TBD', hours: '--', minutes: '--', seconds: '--', isTbd: true }
   * If in past: returns zeros with isPast: true.
   */
  function calculateCountdown(targetDate, now = new Date()) {
    if (isTbd(targetDate)) {
      return {
        days: 'TBD',
        hours: '--',
        minutes: '--',
        seconds: '--',
        totalSeconds: 0,
        isTbd: true,
        isPast: false,
        formatted: 'TBD'
      };
    }

    const targetTime = new Date(targetDate).getTime();
    if (isNaN(targetTime)) {
      return {
        days: 'TBD',
        hours: '--',
        minutes: '--',
        seconds: '--',
        totalSeconds: 0,
        isTbd: true,
        isPast: false,
        formatted: 'TBD'
      };
    }

    const nowTime = now instanceof Date ? now.getTime() : new Date(now).getTime();
    const diff = targetTime - nowTime;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        isTbd: false,
        isPast: true,
        formatted: 'COMPLETED'
      };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds,
      isTbd: false,
      isPast: false,
      formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`
    };
  }

  /**
   * Compute whole days remaining to targetDate.
   * Returns 'TBD' if targetDate is null/TBD, 0 if in the past, or number of days.
   */
  function getDaysRemaining(targetDate, now = new Date()) {
    const cd = calculateCountdown(targetDate, now);
    if (cd.isTbd) return 'TBD';
    if (cd.isPast) return 0;
    return cd.days;
  }

  /**
   * Live countdown runner that syncs DOM elements every interval.
   * Automatically formats values, handles null/TBD gracefully, and cleans up.
   */
  function startCountdown(options) {
    const {
      targetDate,
      elements = {},
      padZeros = true,
      intervalMs = 1000,
      onTick = null
    } = options;

    function resolveEl(el) {
      if (typeof el === 'string') return document.getElementById(el);
      return el;
    }

    const daysEl = resolveEl(elements.daysEl || elements.days);
    const hoursEl = resolveEl(elements.hoursEl || elements.hours);
    const minsEl = resolveEl(elements.minsEl || elements.minutes || elements.mins);
    const secsEl = resolveEl(elements.secsEl || elements.seconds || elements.secs);

    function tick() {
      const cd = calculateCountdown(targetDate);

      if (daysEl) {
        daysEl.textContent = cd.isTbd
          ? 'TBD'
          : (padZeros && cd.days < 10 && !cd.isPast ? `0${cd.days}` : String(cd.days));
      }

      if (hoursEl) {
        hoursEl.textContent = cd.isTbd
          ? '--'
          : (padZeros ? String(cd.hours).padStart(2, '0') : String(cd.hours));
      }

      if (minsEl) {
        minsEl.textContent = cd.isTbd
          ? '--'
          : (padZeros ? String(cd.minutes).padStart(2, '0') : String(cd.minutes));
      }

      if (secsEl) {
        secsEl.textContent = cd.isTbd
          ? '--'
          : (padZeros ? String(cd.seconds).padStart(2, '0') : String(cd.seconds));
      }

      if (typeof onTick === 'function') {
        onTick(cd);
      }
    }

    // Run first tick immediately
    tick();

    // If target is TBD or past, no need to tick continuously
    const initial = calculateCountdown(targetDate);
    if (initial.isTbd || initial.isPast) {
      return { stop: () => {} };
    }

    const timerId = setInterval(tick, intervalMs);
    return {
      stop: () => clearInterval(timerId)
    };
  }

  // Specialized Match Countdown Helper
  function getMatchCountdown(match, elements, padZeros = true) {
    const targetDate = match && match.date && match.date !== 'TBD' ? match.date : null;
    return startCountdown({
      targetDate,
      elements,
      padZeros,
      intervalMs: 1000
    });
  }

  // Specialized Match Lookup Helper
  // An explicit id still resolves archived (completed) fixtures on request;
  // the implicit fallbacks only ever yield the date-resolved next fixture, and
  // return null when no fixture remains ahead of the current date.
  function getMatchById(id) {
    const schedule = VK18_DATA.indiaODISchedule || [];
    if (!id) return VK18_DATA.nextMatch;
    const normalized = String(id).toLowerCase().trim();
    return schedule.find(m =>
      (m.id && m.id.toLowerCase() === normalized) ||
      String(m.index) === normalized ||
      (m.id && m.id.replace('match-', '') === normalized) ||
      (m.opponent && m.opponent.toLowerCase() === normalized) ||
      (m.awayTeam && m.awayTeam.name && m.awayTeam.name.toLowerCase() === normalized) ||
      (m.awayTeam && m.awayTeam.code && m.awayTeam.code.toLowerCase() === normalized) ||
      (m.city && m.city.toLowerCase() === normalized) ||
      (m.venue && m.venue.toLowerCase().includes(normalized))
    ) || VK18_DATA.nextMatch;
  }

  VK18_DATA.getMatchById = getMatchById;

  return {
    data: VK18_DATA,
    get indiaODISchedule() {
      return VK18_DATA.indiaODISchedule;
    },
    set indiaODISchedule(val) {
      VK18_DATA.indiaODISchedule = val;
    },
    get remainingIndiaODIs() {
      return VK18_DATA.remainingIndiaODIs;
    },
    set remainingIndiaODIs(val) {
      VK18_DATA.remainingIndiaODIs = val;
    },
    get upcomingMatches() {
      return VK18_DATA.upcomingMatches;
    },
    get nextMatch() {
      return VK18_DATA.nextMatch;
    },
    get completedMatches() {
      return VK18_DATA.completedMatches;
    },
    deriveRemainingIndiaODIs,
    getUpcomingMatches,
    getNextMatch,
    getFixtureTimestamp,
    isCompletedFixture,
    get worldCup2027FinalDate() {
      return VK18_DATA.worldCup2027FinalDate;
    },
    set worldCup2027FinalDate(val) {
      VK18_DATA.worldCup2027.finalDate = val;
    },
    get worldCup2027FinalNote() {
      return VK18_DATA.worldCup2027FinalNote;
    },
    set worldCup2027FinalNote(val) {
      VK18_DATA.worldCup2027.finalNote = val;
    },
    get worldCup2027StartDate() {
      return VK18_DATA.worldCup2027StartDate;
    },
    set worldCup2027StartDate(val) {
      VK18_DATA.worldCup2027.startDate = val;
    },
    get worldCup2027StartTime() {
      return VK18_DATA.worldCup2027StartTime;
    },
    set worldCup2027StartTime(val) {
      VK18_DATA.worldCup2027.startTime = val;
    },
    get worldCup2027TournamentInfo() {
      return VK18_DATA.worldCup2027TournamentInfo;
    },
    get worldCup2027() {
      return VK18_DATA.worldCup2027;
    },
    get estimatedRemainingIndiaODIs() {
      return VK18_DATA.estimatedRemainingIndiaODIs;
    },
    get estimatedRemainingIndiaODIsConfig() {
      return estimatedRemainingIndiaODIsConfig;
    },
    get centuryGoal() {
      return VK18_DATA.centuryGoal;
    },
    get centuryGoalConfig() {
      return centuryGoalConfig;
    },
    setCenturyGoal,
    getMatchById,
    get stats() {
      return VK18_DATA.internationalStats;
    },
    get internationalStats() {
      return VK18_DATA.internationalStats;
    },
    getFormatStats(formatKey) {
      if (!formatKey) return VK18_DATA.internationalStats.summary;
      return (VK18_DATA.internationalStats.formats && VK18_DATA.internationalStats.formats[formatKey.toLowerCase()]) || null;
    },
    countdown: {
      calculateCountdown,
      getDaysRemaining,
      startCountdown,
      getMatchCountdown,
      getMatchById,
      formatDate,
      formatValue,
      isTbd
    }
  };
});
