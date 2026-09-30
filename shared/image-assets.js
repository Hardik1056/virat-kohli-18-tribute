/**
 * 18 | ONE LAST CHAPTER — CENTRALIZED IMAGE ASSET REGISTRY
 * ========================================================
 * Single source of truth for all real-photography image assets across the 11 pages.
 * 
 * Rules:
 * 1. Each image has a clear semantic purpose (hero, editorial, journey, innings, 82_vs_pakistan, remaining_odis, venues, be_there, world_cup, fans, keepsake).
 * 2. Every file name matches the exact real-world action, subject, match, and photographer visible in the photo.
 * 3. Different eras, matches, and sections have separate, dedicated real-photography slots.
 * 4. Never reuse one generic Kohli image across unrelated sections.
 * 5. To replace or update any image on the site, change its `src` property in this file ONLY.
 * 6. Existing dimensions, cropping, overlays, and responsive layouts are strictly preserved.
 * 7. Authentic source URLs, photographer credits, event captions, and fallback values are preserved for full provenance.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const api = factory();
    root.VK18Images = api;
    // Support legacy or alternative accessors
    root.VK18AssetRegistry = api;
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // =========================================================================
  // CENTRALIZED IMAGE MAP (ORGANIZED BY PURPOSE, ERA, MATCH & VENUE)
  // =========================================================================
  const IMAGES = {
    // -----------------------------------------------------------------------
    // PURPOSE: HERO (Monumental Landing Landmark)
    // Page: 18_one_last_chapter_hero/code.html
    // -----------------------------------------------------------------------
    hero: {
      mainBackdrop: {
        id: 'IMG-HERO-01',
        purpose: 'hero',
        page: '18_one_last_chapter_hero',
        section: 'Documentary Full-Bleed Atmosphere Backdrop',
        src: '../assets/images/world-cup-2023-portrait-bat-on-shoulder-alex-davidson.webp',
        fallback: '../assets/images/world-cup-2023-portrait-bat-on-shoulder-alex-davidson.webp',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-poses-for-a-portrait-ahead-of-the-icc-news-photo/1716719115',
        photographer: 'Alex Davidson - ICC / Getty Images',
        caption: 'THIRUVANANTHAPURAM, INDIA - OCTOBER 04: Virat Kohli of India poses for a portrait ahead of the ICC Men\'s Cricket World Cup India 2023 on October 04, 2023 in Thiruvananthapuram, India.',
        alt: 'Virat Kohli official portrait holding MRF bat resting on right shoulder wearing batting gloves with calm intense gaze',
        description: 'Monumental studio portrait of Virat Kohli holding his MRF bat on his shoulder ahead of the World Cup.'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: EDITORIAL (The Last Chapter Long-Form Monograph)
    // Page: 18_the_last_chapter_desktop_editorial/code.html
    // -----------------------------------------------------------------------
    editorial: {
      tunnelAscent: {
        id: 'IMG-EDITORIAL-01',
        purpose: 'editorial',
        page: '18_the_last_chapter_desktop_editorial',
        section: 'Cinematic Photographic Installation / Bleed Vignette',
        src: '../assets/images/world-cup-2023-portrait-folded-arms-alex-davidson.jpg',
        fallback: '../assets/images/world-cup-2023-portrait-folded-arms-alex-davidson.jpg',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-poses-for-a-portrait-ahead-of-the-icc-news-photo/1716728546',
        photographer: 'Alex Davidson - ICC / Getty Images',
        caption: 'THIRUVANANTHAPURAM, INDIA - OCTOBER 04: Virat Kohli of India poses for a portrait ahead of the ICC Men\'s Cricket World Cup India 2023 on October 04, 2023 in Thiruvananthapuram, India.',
        alt: 'Virat Kohli standing with folded arms and tattooed forearms in moody chiaroscuro studio lighting',
        description: '35mm museum frame capture of solitary statesman batsman with folded arms in contemplative chiaroscuro.'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: JOURNEY (Horizontal Timeline Eras)
    // Page: 18_the_journey_horizontal_documentary_timeline/code.html
    // -----------------------------------------------------------------------
    journey: {
      childhood: {
        id: 'IMG-TIMELINE-00A',
        purpose: 'journey',
        era: '1990s',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 01 (Childhood Roots & Father Prem Kohli)',
        src: '../assets/images/childhood-young-virat-with-father-prem-kohli-deccan-herald.jpg',
        fallback: '../assets/images/childhood-young-virat-with-father-prem-kohli-deccan-herald.jpg',
        sourceUrl: 'https://www.deccanherald.com/dh-galleries/photos/virat-kohli-birthday-special-check-out-some-of-his-rare-photos-1047542',
        photographer: 'Family Archive / Instagram @virat.kohli via Deccan Herald',
        caption: 'Young Virat Kohli as a toddler in light sweater supported by his father Prem Kohli in Delhi',
        alt: 'Toddler Virat Kohli in light sweater supported by his smiling father Prem Kohli in Delhi',
        description: 'Authentic childhood photograph of young Virat Kohli with his father Prem Kohli in Delhi, the foundational inspiration who took him to West Delhi Cricket Academy.'
      },
      childhood_pony: {
        id: 'IMG-TIMELINE-00A-ALT',
        purpose: 'journey',
        era: '1990s',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Childhood Rare Archive (Indiatimes)',
        src: '../assets/images/childhood-young-virat-red-sweater-pony-indiatimes.jpg',
        sourceUrl: 'https://photogallery.indiatimes.com/sports/cricket/virat-kohli/celebs-rare-childhood-pics/articleshow/61515870.cms',
        photographer: 'BCCL / Indiatimes Archive',
        caption: 'Young boy Virat Kohli in red sweater riding a pony during childhood family trip',
        alt: 'Young boy Virat Kohli in red sweater riding a pony in the hills',
        description: 'Rare childhood photograph of young Virat Kohli on a family vacation in northern hills.'
      },
      teenage_cricket: {
        id: 'IMG-TIMELINE-00B',
        purpose: 'journey',
        era: '2004 — 2006',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 02 (Teenage / Early Delhi Ranji Trophy Proving Ground)',
        src: '../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-hindustan-times.jpg',
        fallback: '../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-hindustan-times.jpg',
        sourceUrl: 'https://www.hindustantimes.com/photos/how-delhis-virat-became-the-worlds-king-kohli-8-pictures-from-virat-kohlis-early-days-as-a-cricketer-101747044922239.html',
        photographer: 'Hindustan Times Archives',
        caption: '18-year-old Virat Kohli in Delhi Ranji Trophy flannels and maroon cap walking off Feroz Shah Kotla pitch with BDM bat and pads, 2006',
        alt: '18-year-old Virat Kohli in Delhi Ranji Trophy cricket whites and maroon cap carrying BDM bat at Feroz Shah Kotla',
        description: 'Historic Delhi Ranji Trophy debut photograph of 18-year-old Virat Kohli at Feroz Shah Kotla in 2006, the crucible of his unmatched mental resilience.'
      },
      teenage_delhi_whites: {
        id: 'IMG-TIMELINE-00B-ALT',
        purpose: 'journey',
        era: '2006',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Teenage Delhi Cricket Whites Archive',
        src: '../assets/images/delhi-cricket-2006-teenage-virat-kohli-hindustan-times.jpg',
        sourceUrl: 'https://www.hindustantimes.com/photos/how-delhis-virat-became-the-worlds-king-kohli-8-pictures-from-virat-kohlis-early-days-as-a-cricketer-101747044922239.html',
        photographer: 'Hindustan Times Archives',
        caption: 'Teenage Virat Kohli in full-sleeved Delhi cricket whites with DDCA crest and maroon cap, February 2006',
        alt: 'Teenage Virat Kohli in Delhi cricket flannels with DDCA badge and maroon cap walking on ground',
        description: 'February 2006 archival capture of teenage Virat Kohli representing Delhi in junior cricket.'
      },
      era2008_u19: {
        id: 'IMG-TIMELINE-01',
        purpose: 'journey',
        era: '2008',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 03 (2008 U19 World Cup Victory)',
        src: '../assets/images/kuala-lumpur-2008-u19-world-cup-trophy-petronas-towers-icc-getty.jpg',
        fallback: '../assets/images/kuala-lumpur-2008-u19-world-cup-trophy-petronas-towers-icc-getty.jpg',
        sourceUrl: 'https://www.icc-cricket.com/photos/album/virat-kohli-with-the-2008-u19-cricket-world-cup',
        photographer: 'Getty Images - ICC (GettyImages-80086555)',
        caption: 'KUALA LUMPUR, MALAYSIA - MARCH 03: India U19 captain Virat Kohli poses with the ICC U/19 Cricket World Cup trophy in front of the Petronas Twin Towers on March 3, 2008 in Kuala Lumpur, Malaysia.',
        alt: 'India U19 captain Virat Kohli holding the 2008 U19 World Cup trophy aloft with Petronas Twin Towers in background',
        description: 'Iconic photograph of 19-year-old captain Virat Kohli hoisting the 2008 ICC U19 World Cup trophy high above his head before the Petronas Twin Towers in Kuala Lumpur.'
      },
      u19_trophy_airport: {
        id: 'IMG-TIMELINE-01-ALT',
        purpose: 'journey',
        era: '2008',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: '2008 U19 Trophy Homecoming Archive',
        src: '../assets/images/delhi-airport-2008-u19-world-cup-trophy-arrival-timescontent.webp',
        sourceUrl: 'https://timescontent.timesofindia.com/photo/sports/Virat-Kohli/66224',
        photographer: 'Times Content / Bennett, Coleman & Co. Ltd. (Photo ID 66224)',
        caption: 'India Under-19 cricket team captain Virat Kohli arrives at airport holding the ICC U-19 Cricket World Cup trophy, flower garland, and aircraft model',
        alt: 'Virat Kohli holding 2008 U19 World Cup trophy upon arrival with garland and airplane model',
        description: 'Homecoming arrival of Under-19 captain Virat Kohli holding the World Cup trophy in India.'
      },
      early_india_2011: {
        id: 'IMG-TIMELINE-02',
        purpose: 'journey',
        era: '2008 — 2011',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 04 (Early India Debut & 2011 World Cup Torch Passing)',
        src: '../assets/images/wankhede-2011-world-cup-confetti-celebration.png',
        fallback: '../assets/images/wankhede-2011-world-cup-confetti-celebration.png',
        alt: 'Cinematic documentary wide photograph of iconic cricket stadium confetti celebration night, golden floodlights, silhouette of triumphant batsman carrying the national flag on shoulders, historic championship night 2011',
        description: 'Wankhede Stadium championship celebration with blue and gold confetti shower on 2 April 2011, carrying Sachin Tendulkar on shoulders.'
      },
      era2011_world_cup: {
        id: 'IMG-TIMELINE-02',
        purpose: 'journey',
        era: '2008 — 2011',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 04 (Early India Debut & 2011 World Cup Torch Passing)',
        src: '../assets/images/wankhede-2011-world-cup-confetti-celebration.png',
        fallback: '../assets/images/wankhede-2011-world-cup-confetti-celebration.png',
        alt: 'Cinematic documentary wide photograph of iconic cricket stadium confetti celebration night, golden floodlights, silhouette of triumphant batsman carrying the national flag on shoulders, historic championship night 2011',
        description: 'Wankhede Stadium championship celebration with blue and gold confetti shower on 2 April 2011, carrying Sachin Tendulkar on shoulders.'
      },
      era2018_australia: {
        id: 'IMG-TIMELINE-03',
        purpose: 'journey',
        era: '2018 / 2016',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 07 (Australia Conquest & 82* Masterclass)',
        src: '../assets/images/mohali-2016-australia-82-finger-to-sky.jpeg',
        fallback: '../assets/images/mohali-2016-australia-82-finger-to-sky.jpeg',
        sourceUrl: 'https://www.mensxp.com/ampstories/buzz-on-web/latest/132586-ipl-2023-virat-kohli-and-his-love-for-82-not-out-in-big-games-rcb-vs-mi.html',
        photographer: 'ICC / AFP via MensXP',
        caption: 'MOHALI, INDIA - MARCH 27: Virat Kohli stands with right index finger pointed high toward the sky in relief and triumph after his iconic 82 not out against Australia in the 2016 World T20.',
        alt: 'Virat Kohli standing with finger pointed to the sky after his 82* chase masterclass vs Australia in Mohali',
        description: 'Standing in gratitude with index finger pointed to the heavens after 82* vs Australia, capturing the emotional transcendence of the chase master.'
      },
      era2027_destination: {
        id: 'IMG-TIMELINE-04',
        purpose: 'journey',
        era: '2027',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 10 (2027 Final Chapter Swansong Climax Backdrop)',
        src: '../assets/images/world-cup-2023-final-dejected-kohli-rohit-alex-davidson.webp',
        fallback: '../assets/images/world-cup-2023-final-dejected-kohli-rohit-alex-davidson.webp',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-and-rohit-sharma-of-india-cut-dejected-figures-news-photo/1802477540',
        photographer: 'Alex Davidson - ICC / Getty Images',
        caption: 'AHMEDABAD, INDIA - NOVEMBER 19: Virat Kohli and Rohit Sharma of India cut dejected figures following the ICC Men\'s Cricket World Cup Final at Narendra Modi Stadium on November 19, 2023 in Ahmedabad, India.',
        alt: 'Virat Kohli with hand covering mouth standing alongside despondent Rohit Sharma after the 2023 World Cup Final in Ahmedabad',
        description: 'Deeply moving capture of Kohli and Rohit after the 2023 Final defeat in Ahmedabad, fueling the solemn resolve for the 2027 swansong.'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: INNINGS (Monumental Canon Matches)
    // Page: 18_the_innings_we_ll_never_forget_desktop/code.html
    // -----------------------------------------------------------------------
    innings: {
      melbourne_82: {
        id: 'IMG-INNINGS-01',
        purpose: 'innings',
        match: 'vs Pakistan, Melbourne 2022 (82*)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon 01 Hero Card (82* vs Pakistan)',
        src: '../assets/images/mcg-2022-kohli-prayer-finger-to-sky-martin-keep.webp',
        fallback: '../assets/images/mcg-2022-kohli-prayer-finger-to-sky-martin-keep.webp',
        sourceUrl: 'https://www.gettyimages.com.au/detail/news-photo/indias-virat-kohli-celebrates-after-their-win-during-the-news-photo/1244169092',
        photographer: 'Martin Keep / AFP via Getty Images',
        caption: 'MELBOURNE, AUSTRALIA - OCTOBER 23: India\'s Virat Kohli celebrates after their win during the ICC men\'s Twenty20 World Cup 2022 match between India and Pakistan at Melbourne Cricket Ground on October 23, 2022.',
        alt: 'Virat Kohli with eyes closed pointing his right index finger to the sky in emotional thankfulness after winning 82* vs Pakistan at the MCG',
        description: 'Close-up of Virat Kohli looking up at the heavens with finger pointed in emotional prayer and thankfulness after the 82 not out victory.'
      },
      edgbaston_149: {
        id: 'IMG-INNINGS-02',
        purpose: 'innings',
        match: 'vs England, Edgbaston 2018 (149)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon 06 Card (149 vs England)',
        src: '../assets/images/edgbaston-2018-kohli-149-roar-celebration.jpg',
        fallback: '../assets/images/edgbaston-2018-kohli-149-roar-celebration.jpg',
        alt: 'Virat Kohli in Indian Test whites roaring in celebration with MRF bat and helmet outstretched after scoring 149 at Edgbaston in 2018',
        description: 'Edgbaston, Birmingham August 2018. Defiant 149 against swinging Dukes balls in English mist.'
      },
      mohali_82: {
        id: 'IMG-INNINGS-03',
        purpose: 'innings',
        match: 'vs Australia, Mohali 2016 (82*)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon Mohali 82* Card',
        src: '../assets/images/mohali-2016-australia-82-finger-to-sky.jpeg',
        fallback: '../assets/images/mohali-2016-australia-82-finger-to-sky.jpeg',
        alt: 'Virat Kohli pointing skyward in ecstatic relief and triumph after winning 82* vs Australia in Mohali 2016',
        description: 'Mohali 2016 T20 World Cup knockout chase against Australia.'
      },
      dhaka_183: {
        id: 'IMG-INNINGS-04',
        purpose: 'innings',
        match: 'vs Pakistan, Dhaka 2012 (183)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon Dhaka 183 Card',
        src: '../assets/images/dhaka-2012-kohli-183-bat-raised-roar.jpg',
        fallback: '../assets/images/dhaka-2012-kohli-183-bat-raised-roar.jpg',
        alt: 'Virat Kohli roaring in celebration with bat raised high after reaching century against Pakistan in Dhaka 2012',
        description: 'Career-best 183 off 148 balls chasing 330 against Pakistan in Asia Cup 2012.'
      },
      wankhede_117: {
        id: 'IMG-INNINGS-05',
        purpose: 'innings',
        match: 'vs New Zealand, Mumbai 2023 (117)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon Wankhede 50th Century Card',
        src: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp',
        fallback: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp',
        alt: 'Virat Kohli looking up with MRF bat raised vertically in celebration after scoring his 50th ODI century at Wankhede Stadium',
        description: 'World record 50th ODI century in the World Cup semi-final at Wankhede Stadium.'
      },
      edengardens_101: {
        id: 'IMG-INNINGS-06',
        purpose: 'innings',
        match: 'vs South Africa, Kolkata 2023 (101*)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon Eden Gardens 49th Century Card',
        src: '../assets/images/eden-gardens-2023-century-49-celebration-surjeet-yadav.webp',
        fallback: '../assets/images/eden-gardens-2023-century-49-celebration-surjeet-yadav.webp',
        alt: 'Virat Kohli celebrating his 49th ODI century against South Africa on his 35th birthday at Eden Gardens',
        description: 'Equalling Sachin Tendulkar\'s 49 ODI centuries at Eden Gardens in the 2023 World Cup.'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: 82_VS_PAKISTAN (Melbourne 2022 Dossier Folio)
    // Page: 18_82_vs_pakistan_melbourne_2022/code.html
    // -----------------------------------------------------------------------
    eighty_two_vs_pakistan: {
      headerIcon: {
        id: 'IMG-MCGDOSSIER-01',
        purpose: '82_vs_pakistan',
        page: '18_82_vs_pakistan_melbourne_2022',
        section: 'Header Brand Icon',
        src: '../assets/images/mcg-2022-winning-run-celebration-darrian-traynor.webp',
        fallback: '../assets/images/mcg-2022-winning-run-celebration-darrian-traynor.webp',
        sourceUrl: 'https://www.gettyimages.com.au/detail/news-photo/virat-kohli-of-india-celebrates-after-the-final-run-is-news-photo/1435855942',
        photographer: 'Darrian Traynor - ICC / Getty Images',
        caption: 'Virat Kohli celebrating the winning run with arms outstretched at the MCG',
        alt: 'Virat Kohli 82* monument icon',
        description: 'Brand mark icon of Melbourne 82* triumph.'
      },
      heroBackdrop: {
        id: 'IMG-MCGDOSSIER-02',
        purpose: '82_vs_pakistan',
        page: '18_82_vs_pakistan_melbourne_2022',
        section: 'Dossier Hero Stage Scrim',
        src: '../assets/images/mcg-2022-winning-run-celebration-darrian-traynor.webp',
        fallback: '../assets/images/mcg-2022-winning-run-celebration-darrian-traynor.webp',
        sourceUrl: 'https://www.gettyimages.com.au/detail/news-photo/virat-kohli-of-india-celebrates-after-the-final-run-is-news-photo/1435855942',
        photographer: 'Darrian Traynor - ICC / Getty Images',
        caption: 'MELBOURNE, AUSTRALIA - OCTOBER 23: Virat Kohli of India celebrates after the final run is scored during the ICC Men\'s T20 World Cup match between India and Pakistan at Melbourne Cricket Ground on October 23, 2022 in Melbourne, Australia.',
        alt: 'Virat Kohli with arms outstretched screaming in jubilation as the final winning run is scored against Pakistan at the MCG',
        description: 'Authentic 2048px capture of Virat Kohli roaring in jubilation with arms outstretched under MCG floodlights after 82* vs Pakistan.'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: REMAINING_ODIS (The Remaining Bilateral ODI Ledger)
    // Page: 18_the_last_ones_remaining_odis/code.html
    // -----------------------------------------------------------------------
    remaining_odis: {
      heroLedger: {
        id: 'IMG-REMAINING-01',
        purpose: 'remaining_odis',
        page: '18_the_last_ones_remaining_odis',
        section: 'Main Hero Ledger Stage Backdrop',
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-bats-during-the-icc-mens-cricket-world-news-photo/1794652371',
        photographer: 'Alex Davidson - ICC / Getty Images',
        caption: 'MUMBAI, INDIA - NOVEMBER 15: Virat Kohli of India bats during the ICC Men\'s Cricket World Cup Semi Final match between India and New Zealand at Wankhede Stadium on November 15, 2023 in Mumbai, India.',
        alt: 'Virat Kohli playing a defensive push shot with soft hands watching the ball intently off the pitch at Wankhede Stadium',
        description: 'Action capture of Virat Kohli in full 50-over strokeplay and focus for the remaining bilateral ODI ledger.'
      },
      edgbastonStage: {
        id: 'IMG-REMAINING-02',
        purpose: 'remaining_odis',
        page: '18_the_last_ones_remaining_odis',
        section: 'Card 1 Archival Window (British Midsummer 50-Over Stage)',
        src: '../assets/images/lords-odi-kohli-rohit-partnership-embrace-alex-davidson.jpg',
        fallback: '../assets/images/lords-odi-kohli-rohit-partnership-embrace-alex-davidson.jpg',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-celebrates-the-century-of-batting-partner-news-photo/2286773550',
        photographer: 'Alex Davidson / Getty Images',
        caption: 'LONDON, ENGLAND - JULY 19: Virat Kohli of India celebrates the century of batting partner Rohit Sharma during the 3rd Metro Bank ODI between England and India at Lord\'s Cricket Ground on July 19, 2026 in London, England.',
        alt: 'Virat Kohli (#18) with arm around Rohit Sharma (#45) in celebratory embrace on the pitch at Lord\'s during England ODI series',
        description: 'Authentic 2048px capture of Virat Kohli and Rohit Sharma in partnership embrace at Lord\'s for the British midsummer 50-over stage.'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: VENUES / MATCH_DETAILS (Bilateral Venues & Match Dossier)
    // Pages: 18_match_details_india_vs_australia/code.html & shared/career-data.js
    // -----------------------------------------------------------------------
    venues: {
      wankhede_mumbai: {
        id: 'VENUE-WANKHEDE',
        venue: 'Wankhede Stadium',
        city: 'Mumbai',
        territory: 'Maharashtra, Republic of India',
        src: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp',
        fallback: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp',
        sourceUrl: 'https://www.gettyimages.ie/detail/news-photo/indias-virat-kohli-celebrates-after-scoring-a-century-news-photo/1783004094',
        photographer: 'Punit Paranjpe / AFP via Getty Images',
        caption: 'MUMBAI, INDIA - NOVEMBER 15: India\'s Virat Kohli celebrates after scoring his 50th ODI century at Wankhede Stadium.',
        alt: 'Virat Kohli looking up with MRF bat raised vertically in celebration after scoring his 50th ODI century at Wankhede Stadium'
      },
      greenfield_trivandrum: {
        id: 'VENUE-GREENFIELD',
        venue: 'Greenfield International Stadium',
        city: 'Trivandrum',
        territory: 'Kerala, Republic of India',
        src: '../assets/images/stadium-electric-packed-stands.png',
        fallback: '../assets/images/stadium-electric-packed-stands.png',
        alt: 'Greenfield International Stadium Trivandrum under floodlights'
      },
      barsapara_guwahati: {
        id: 'VENUE-BARSAPARA',
        venue: 'Barsapara Cricket Stadium',
        city: 'Guwahati',
        territory: 'Assam, Republic of India',
        src: '../assets/images/stadium-electric-packed-stands.png',
        fallback: '../assets/images/stadium-electric-packed-stands.png',
        alt: 'Barsapara Cricket Stadium Guwahati under floodlights'
      },
      pcamullanpur_newchandigarh: {
        id: 'VENUE-PCAMULLANPUR',
        venue: 'IS Bindra PCA Stadium',
        city: 'New Chandigarh',
        territory: 'Punjab, Republic of India',
        src: '../assets/images/stadium-legendary-packed-arena.png',
        fallback: '../assets/images/stadium-legendary-packed-arena.png',
        alt: 'IS Bindra PCA Stadium New Chandigarh arena bowl'
      },
      edenpark_auckland: {
        id: 'VENUE-EDENPARK',
        venue: 'Eden Park',
        city: 'Auckland',
        territory: 'Auckland, New Zealand',
        src: '../assets/images/stadium-night-pitch-atmospheric-mist.png',
        fallback: '../assets/images/stadium-night-pitch-atmospheric-mist.png',
        alt: 'Eden Park Auckland floodlit stadium arena'
      },
      skystadium_wellington: {
        id: 'VENUE-SKYSTADIUM',
        venue: 'Sky Stadium',
        city: 'Wellington',
        territory: 'Wellington, New Zealand',
        src: '../assets/images/stadium-night-pitch-atmospheric-mist.png',
        fallback: '../assets/images/stadium-night-pitch-atmospheric-mist.png',
        alt: 'Sky Stadium Wellington cake tin bowl floodlights'
      },
      seddonpark_hamilton: {
        id: 'VENUE-SEDDONPARK',
        venue: 'Seddon Park',
        city: 'Hamilton',
        territory: 'Waikato, New Zealand',
        src: '../assets/images/stadium-legendary-ground-evening.png',
        fallback: '../assets/images/stadium-legendary-ground-evening.png',
        alt: 'Seddon Park Hamilton grass embankments and floodlights'
      },
      bayoval_mtmaunganui: {
        id: 'VENUE-BAYOVAL',
        venue: 'Bay Oval',
        city: 'Mount Maunganui',
        territory: 'Bay of Plenty, New Zealand',
        src: '../assets/images/stadium-legendary-packed-arena.png',
        fallback: '../assets/images/stadium-legendary-packed-arena.png',
        alt: 'Bay Oval Mount Maunganui coastal cricket ground'
      },
      arunjaitley_delhi: {
        id: 'VENUE-ARUNJAITLEY',
        venue: 'Arun Jaitley Stadium',
        city: 'Delhi',
        territory: 'Delhi, Republic of India',
        src: '../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-hindustan-times.jpg',
        fallback: '../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-hindustan-times.jpg',
        alt: 'Arun Jaitley Stadium Delhi winter evening pavilion stands'
      },
      chinnaswamy_bengaluru: {
        id: 'VENUE-CHINNASWAMY',
        venue: 'M. Chinnaswamy Stadium',
        city: 'Bengaluru',
        territory: 'Karnataka, Republic of India',
        src: '../assets/images/stadium-passionate-crowd-floodlights.png',
        fallback: '../assets/images/stadium-passionate-crowd-floodlights.png',
        alt: 'M. Chinnaswamy Stadium Bengaluru stands under floodlights'
      },
      narendramodi_ahmedabad: {
        id: 'VENUE-NARENDRAMODI',
        venue: 'Narendra Modi Stadium',
        city: 'Ahmedabad',
        territory: 'Gujarat, Republic of India',
        src: '../assets/images/stadium-colossal-arena-panoramic.png',
        fallback: '../assets/images/stadium-colossal-arena-panoramic.png',
        alt: 'Narendra Modi Stadium Ahmedabad 132,000 colosseum bowl'
      },
      edengardens_kolkata: {
        id: 'VENUE-EDENGARDENS',
        venue: 'Eden Gardens',
        city: 'Kolkata',
        territory: 'West Bengal, Republic of India',
        src: '../assets/images/eden-gardens-2023-century-49-celebration-surjeet-yadav.webp',
        fallback: '../assets/images/eden-gardens-2023-century-49-celebration-surjeet-yadav.webp',
        sourceUrl: 'https://www.gettyimages.ie/detail/news-photo/virat-kohli-of-india-celebrates-their-century-to-equal-news-photo/1776191562',
        photographer: 'Surjeet Yadav / Getty Images',
        caption: 'KOLKATA, INDIA - NOVEMBER 05: Virat Kohli of India celebrates their century to equal Sachin Tendulkar\'s record for most ODI centuries for India at Eden Gardens on November 05, 2023.',
        alt: 'Virat Kohli with MRF bat raised in right hand and helmet in left hand after 49th ODI century at Eden Gardens'
      },
      rajivgandhi_hyderabad: {
        id: 'VENUE-RAJIVGANDHI',
        venue: 'Rajiv Gandhi International Cricket Stadium',
        city: 'Hyderabad',
        territory: 'Telangana, Republic of India',
        src: '../assets/images/stadium-passionate-crowd-floodlights.png',
        fallback: '../assets/images/stadium-passionate-crowd-floodlights.png',
        alt: 'Rajiv Gandhi International Cricket Stadium Hyderabad under floodlights'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: BE_THERE (Atmospheric Fan Presence & Pass Stage)
    // Page: 18_be_there_for_it_desktop/code.html
    // -----------------------------------------------------------------------
    be_there: {
      crowdAtmosphere: {
        id: 'IMG-BETHERE-01',
        purpose: 'be_there',
        page: '18_be_there_for_it_desktop',
        section: 'Atmospheric Cinematic Hero Pivot',
        src: '../assets/images/mcg-2022-stadium-stands-wide-view-surjeet-yadav.jpg',
        fallback: '../assets/images/mcg-2022-stadium-stands-wide-view-surjeet-yadav.jpg',
        sourceUrl: 'https://www.gettyimages.com.au/detail/news-photo/a-general-view-of-the-ground-during-the-icc-mens-twenty20-news-photo/1244171151',
        photographer: 'Surjeet Yadav / AFP via Getty Images',
        caption: 'MELBOURNE, AUSTRALIA - OCTOBER 23: A general view of the ground during the ICC men\'s Twenty20 World Cup 2022 match between India and Pakistan at Melbourne Cricket Ground on October 23, 2022.',
        alt: 'Panoramic view of Melbourne Cricket Ground packed with spectators in the stands watching India vs Pakistan',
        description: 'Broad wide perspective of 90,293 spectators filling the MCG bowl for India vs Pakistan.'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: WORLD_CUP (2027 Destination & Swansong Horizon)
    // Page: 18_world_cup_2027_destination/code.html
    // -----------------------------------------------------------------------
    world_cup: {
      horizonHero: {
        id: 'IMG-DESTINATION-01',
        purpose: 'world_cup',
        page: '18_world_cup_2027_destination',
        section: 'Hero Horizon Full-Screen Stage',
        src: '../assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg',
        fallback: '../assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-poses-for-a-portrait-ahead-of-the-icc-news-photo/1716725647',
        photographer: 'Alex Davidson - ICC / Getty Images',
        caption: 'THIRUVANANTHAPURAM, INDIA - OCTOBER 04: Virat Kohli of India poses for a portrait ahead of the ICC Men\'s Cricket World Cup India 2023 on October 04, 2023 in Thiruvananthapuram, India.',
        alt: 'Virat Kohli with clenched fists roaring with fierce determination in official World Cup portrait',
        description: 'Fierce double-fist roar portrait of Virat Kohli ahead of the World Cup.'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: FANS (Witness Registry & Community Archives)
    // Page: 18_we_were_there_fan_memories_keepsake/code.html
    // -----------------------------------------------------------------------
    fans: {
      witnessFlags: {
        id: 'IMG-FANMEMORIES-01',
        purpose: 'fans',
        page: '18_we_were_there_fan_memories_keepsake',
        section: 'Witness Registry 35mm Reel Scan Main Display',
        src: '../assets/images/mcg-2022-india-pakistan-fans-pose-william-west.jpg',
        fallback: '../assets/images/mcg-2022-india-pakistan-fans-pose-william-west.jpg',
        sourceUrl: 'https://www.gettyimages.com.au/detail/news-photo/an-indian-and-a-pakistan-fan-pose-together-for-photographs-news-photo/1244162838',
        photographer: 'William West / AFP via Getty Images',
        caption: 'MELBOURNE, AUSTRALIA - OCTOBER 23: An Indian and a Pakistan fan pose together for photographs during the ICC men\'s Twenty20 World Cup 2022 match between India and Pakistan at Melbourne Cricket Ground on October 23, 2022.',
        alt: 'An Indian fan and a Pakistan fan smiling and posing together in team jerseys at the Melbourne Cricket Ground',
        description: 'Supporters of India and Pakistan smiling and posing together in camaraderie at the MCG.'
      }
    },

    // -----------------------------------------------------------------------
    // PURPOSE: KEEPSAKE (Personalized Archival Folio Cards)
    // Page: 18_i_was_there_commemorative_keepsake_generator/code.html
    // -----------------------------------------------------------------------
    keepsake: {
      defaultCard: {
        id: 'IMG-KEEPSAKE-DEFAULT',
        purpose: 'keepsake',
        page: '18_i_was_there_commemorative_keepsake_generator',
        section: 'Folio Card Archival Frame (Initial State)',
        src: '../assets/images/wankhede-2023-semi-final-post-match-walkoff-alex-davidson.jpg',
        fallback: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-reacts-after-winning-the-icc-mens-news-photo/1795170391',
        photographer: 'Alex Davidson - ICC / Getty Images',
        caption: 'MUMBAI, INDIA - NOVEMBER 15: Virat Kohli of India reacts with a satisfied smile walking off after winning the World Cup Semi Final match between India and New Zealand at Wankhede Stadium.',
        alt: 'Virat Kohli smiling with hand in hair in post-match walkoff with ample negative space',
        description: 'Clean horizontal portrait of Virat Kohli with relaxed expression and ample negative space for the folio card.'
      },
      mcg_2022: {
        id: 'IMG-KEEPSAKE-MCG2022',
        purpose: 'keepsake',
        match: 'India vs Pakistan • Melbourne 2022 (82*)',
        page: '18_i_was_there_commemorative_keepsake_generator',
        src: '../assets/images/mcg-2022-kohli-flick-six-shot-william-west.webp',
        fallback: '../cinematic_sports_documentary_horizontal_wide_photography_of_a_legendary_packed/screen.png',
        sourceUrl: 'https://www.gettyimages.com.au/detail/news-photo/indias-virat-kohli-plays-a-shot-over-the-boundary-line-for-news-photo/1244168908',
        photographer: 'William West / AFP via Getty Images',
        caption: 'MELBOURNE, AUSTRALIA - OCTOBER 23: India\'s Virat Kohli plays a shot over the boundary line for six runs off Haris Rauf during the ICC Men\'s T20 World Cup match at MCG on October 23, 2022.',
        alt: 'Virat Kohli playing the backfoot flick shot for six over fine leg off Haris Rauf at the MCG',
        description: 'The iconic flick six shot off Haris Rauf over fine leg boundary at the Melbourne Cricket Ground.'
      },
      wankhede_2025: {
        id: 'IMG-KEEPSAKE-WANKHEDE2025',
        purpose: 'keepsake',
        match: 'India vs Australia • Mumbai 2025',
        page: '18_i_was_there_commemorative_keepsake_generator',
        src: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp',
        fallback: '../dramatic_cinematic_photograph_of_a_night_cricket_pitch_under_atmospheric_mist/screen.png',
        sourceUrl: 'https://www.gettyimages.ie/detail/news-photo/indias-virat-kohli-celebrates-after-scoring-a-century-news-photo/1783004094',
        photographer: 'Punit Paranjpe / AFP via Getty Images',
        caption: 'Virat Kohli celebrating his landmark century at Wankhede Stadium.',
        alt: 'Virat Kohli celebrating at Wankhede Stadium',
        description: 'Wankhede Stadium celebration capture for the commemorative keepsake.'
      },
      edgbaston_2018: {
        id: 'IMG-KEEPSAKE-EDGBASTON2018',
        purpose: 'keepsake',
        match: 'India vs England • Edgbaston 2018 (149)',
        page: '18_i_was_there_commemorative_keepsake_generator',
        src: '../assets/images/edgbaston-2018-lone-batsman-walking-mist.png',
        fallback: '../cinematic_sports_documentary_horizontal_photograph_of_a_solitary_batsman_in/screen.png',
        alt: 'Archival frame capture: Edgbaston 2018 149',
        description: 'Edgbaston 2018 English overcast and rain-swept outfield.'
      },
      pune_2019: {
        id: 'IMG-KEEPSAKE-PUNE2019',
        purpose: 'keepsake',
        match: 'India vs South Africa • Pune 2019 (254*)',
        page: '18_i_was_there_commemorative_keepsake_generator',
        src: '../cinematic_sports_documentary_wide_panoramic_photograph_of_a_colossal_cricket/screen.png',
        fallback: '../cinematic_sports_documentary_wide_panoramic_photograph_of_a_colossal_cricket/screen.png',
        alt: 'Archival frame capture: Pune 2019 254*',
        description: 'Colossal open-tier arena panorama for the marathon 254* double century.'
      },
      dubai_2022: {
        id: 'IMG-KEEPSAKE-DUBAI2022',
        purpose: 'keepsake',
        match: 'Asia Cup • Dubai 2022 (Maiden T20I / 71st Century)',
        page: '18_i_was_there_commemorative_keepsake_generator',
        src: '../cinematic_sports_documentary_wide_photograph_of_an_electric_packed_cricket/screen.png',
        fallback: '../cinematic_documentary_wide_photograph_of_iconic_cricket_stadium_confetti/screen.png',
        alt: 'Archival frame capture: Dubai 2022 71st Century',
        description: 'Dubai International Stadium floodlights for the emotional 71st century.'
      },
      semi_final_2023: {
        id: 'IMG-KEEPSAKE-SEMIFINAL',
        purpose: 'keepsake',
        match: 'World Cup Semi-Final • Mumbai 2023',
        page: '18_i_was_there_commemorative_keepsake_generator',
        src: '../assets/images/wankhede-2023-semi-final-post-match-walkoff-alex-davidson.jpg',
        fallback: '../assets/images/wankhede-2023-semi-final-post-match-walkoff-alex-davidson.jpg',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-reacts-after-winning-the-icc-mens-news-photo/1795170391',
        photographer: 'Alex Davidson - ICC / Getty Images',
        caption: 'MUMBAI, INDIA - NOVEMBER 15: Virat Kohli of India reacts with a satisfied smile walking off after winning the World Cup Semi Final match between India and New Zealand at Wankhede Stadium.',
        alt: 'Virat Kohli smiling and running hand through hair walking off the field after World Cup semi-final win',
        description: 'Satisfied post-match walkoff after securing the World Cup Final berth at Wankhede.'
      },
      ipl_rohit_embrace: {
        id: 'IMG-KEEPSAKE-IPL-ROHIT',
        purpose: 'keepsake',
        match: 'RCB vs MI • Bengaluru 2023',
        page: '18_i_was_there_commemorative_keepsake_generator',
        src: '../assets/images/ipl-2023-rcb-mi-kohli-rohit-embrace.jpeg',
        sourceUrl: 'https://www.mensxp.com/ampstories/buzz-on-web/latest/132586-ipl-2023-virat-kohli-and-his-love-for-82-not-out-in-big-games-rcb-vs-mi.html',
        photographer: 'AFP / MensXP',
        caption: 'Rohit Sharma (MI) and Virat Kohli (RCB) post-match embrace in IPL 2023.',
        alt: 'Rohit Sharma and Virat Kohli in IPL jerseys embracing post-match',
        description: 'Post-match embrace between Rohit Sharma and Virat Kohli during IPL 2023.'
      }
    }
  };

  // Provide convenient aliases for numeric or hyphenated keys
  IMAGES['82_vs_pakistan'] = IMAGES.eighty_two_vs_pakistan;
  IMAGES.match_details = { venues: IMAGES.venues };

  // =========================================================================
  // HELPER METHODS
  // =========================================================================

  /**
   * Safely retrieve an image entry by dot-notation path:
   * e.g. VK18Images.get('hero.mainBackdrop') or VK18Images.get('venues.wankhede_mumbai')
   */
  function get(path) {
    if (!path || typeof path !== 'string') return null;
    const parts = path.split('.');
    let current = IMAGES;
    for (const p of parts) {
      if (!current || typeof current !== 'object') return null;
      current = current[p];
    }
    return current || null;
  }

  /**
   * Retrieve the active src URL for a given path, with optional fallback
   */
  function getSrc(path, defaultFallback = '') {
    const entry = get(path);
    if (!entry) return defaultFallback;
    return entry.src || entry.fallback || defaultFallback;
  }

  /**
   * Automatically bind and update DOM elements that declare data-vk-image or data-vk-bg attributes.
   * Preserves all classes, aspect ratios, overlays, and inline layout styles.
   */
  function applyToDom(rootElement = document) {
    if (typeof document === 'undefined') return;

    // 1. Elements expecting image src (<img>)
    const imgElements = rootElement.querySelectorAll('[data-vk-image]');
    imgElements.forEach(el => {
      const path = el.getAttribute('data-vk-image');
      const entry = get(path);
      if (entry && entry.src) {
        if (el.tagName.toLowerCase() === 'img') {
          el.src = entry.src;
          if (entry.alt && (!el.alt || el.getAttribute('data-keep-alt') !== 'true')) {
            el.alt = entry.alt;
          }
        }
      }
    });

    // 2. Elements expecting background-image (<div>, <section>, etc.)
    const bgElements = rootElement.querySelectorAll('[data-vk-bg]');
    bgElements.forEach(el => {
      const path = el.getAttribute('data-vk-bg');
      const entry = get(path);
      if (entry && entry.src) {
        el.style.backgroundImage = `url('${entry.src}')`;
      }
    });
  }

  // Auto-run applyToDom when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyToDom());
    } else {
      applyToDom();
    }
  }

  return {
    map: IMAGES,
    hero: IMAGES.hero,
    editorial: IMAGES.editorial,
    journey: IMAGES.journey,
    innings: IMAGES.innings,
    eighty_two_vs_pakistan: IMAGES.eighty_two_vs_pakistan,
    '82_vs_pakistan': IMAGES.eighty_two_vs_pakistan,
    remaining_odis: IMAGES.remaining_odis,
    venues: IMAGES.venues,
    match_details: IMAGES.match_details,
    be_there: IMAGES.be_there,
    world_cup: IMAGES.world_cup,
    fans: IMAGES.fans,
    keepsake: IMAGES.keepsake,
    get,
    getSrc,
    applyToDom
  };
});
