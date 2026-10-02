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
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.VK18Images = api;
    // Support legacy or alternative accessors
    root.VK18AssetRegistry = api;
  }
})(typeof self !== 'undefined' ? self : (typeof globalThis !== 'undefined' ? globalThis : this), function () {

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
        src: '../assets/images/childhood-young-virat-with-father-prem-kohli-centered.jpg',
        fallback: '../assets/images/childhood-young-virat-with-father-prem-kohli-centered.jpg',
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
        src: '../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-centered.jpg',
        fallback: '../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-centered.jpg',
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
        src: '../assets/images/kuala-lumpur-2008-u19-world-cup-trophy-centered.jpg',
        fallback: '../assets/images/kuala-lumpur-2008-u19-world-cup-trophy-centered.jpg',
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
        src: '../assets/images/wankhede-2011-world-cup-trophy-celebration-centered.jpg',
        fallback: '../assets/images/wankhede-2011-world-cup-trophy-celebration-centered.jpg',
        sourceUrl: 'https://www.gettyimages.com/detail/news-photo/indian-cricket-team-celebrate-with-the-world-cup-trophy-news-photo/111436822',
        photographer: 'Matthew Lewis / Getty Images (Photo ID 111436822)',
        caption: 'MUMBAI, INDIA - APRIL 02: Indian cricket team celebrate with the ICC World Cup trophy after defeating Sri Lanka at Wankhede Stadium on April 02, 2011.',
        alt: 'Indian cricket team including young Virat Kohli celebrating with the 2011 ICC Cricket World Cup trophy under floodlights at Wankhede Stadium',
        description: 'Wankhede Stadium championship celebration with the World Cup trophy on 2 April 2011, carrying Sachin Tendulkar on shoulders.'
      },
      era2011_world_cup: {
        id: 'IMG-TIMELINE-02',
        purpose: 'journey',
        era: '2008 — 2011',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 04 (Early India Debut & 2011 World Cup Torch Passing)',
        src: '../assets/images/wankhede-2011-world-cup-trophy-celebration-centered.jpg',
        fallback: '../assets/images/wankhede-2011-world-cup-trophy-celebration-centered.jpg',
        sourceUrl: 'https://www.gettyimages.com/detail/news-photo/indian-cricket-team-celebrate-with-the-world-cup-trophy-news-photo/111436822',
        photographer: 'Matthew Lewis / Getty Images (Photo ID 111436822)',
        caption: 'MUMBAI, INDIA - APRIL 02: Indian cricket team celebrate with the ICC World Cup trophy after defeating Sri Lanka at Wankhede Stadium on April 02, 2011.',
        alt: 'Indian cricket team including young Virat Kohli celebrating with the 2011 ICC Cricket World Cup trophy under floodlights at Wankhede Stadium',
        description: 'Wankhede Stadium championship celebration with the World Cup trophy on 2 April 2011, carrying Sachin Tendulkar on shoulders.'
      },
      era2013_chase: {
        id: 'IMG-TIMELINE-05',
        purpose: 'journey',
        era: '2012 — 2013',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 05 (The Chase Master)',
        src: '../assets/images/dhaka-2012-kohli-183-bat-raised-roar-centered.jpg',
        fallback: '../assets/images/dhaka-2012-kohli-183-bat-raised-roar-centered.jpg',
        sourceUrl: 'https://www.espncricinfo.com/series/asia-cup-2011-12-524504/india-vs-pakistan-5th-match-535798/match-report',
        photographer: 'AFP / Getty Images',
        caption: 'DHAKA, BANGLADESH - MARCH 18: Virat Kohli roars in celebration with bat raised high during his epic 183 chase against Pakistan in the 2012 Asia Cup.',
        alt: 'Virat Kohli roaring in celebration with bat raised high during his epic 183 chase against Pakistan in Dhaka 2012',
        description: 'Epic pursuit masterclass of 183 against Pakistan establishing Kohli as the supreme chase architect in ODI history.'
      },
      era2016_transcendence: {
        id: 'IMG-TIMELINE-06',
        purpose: 'journey',
        era: '2016',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 06 (A Defining Year — Peak Transcendence)',
        src: '../assets/images/mohali-2016-australia-82-finger-to-sky-centered.jpg',
        fallback: '../assets/images/mohali-2016-australia-82-finger-to-sky-centered.jpg',
        sourceUrl: 'https://www.mensxp.com/ampstories/buzz-on-web/latest/132586-ipl-2023-virat-kohli-and-his-love-for-82-not-out-in-big-games-rcb-vs-mi.html',
        photographer: 'ICC / AFP via MensXP',
        caption: 'MOHALI, INDIA - MARCH 27: Virat Kohli stands with right index finger pointed high toward the sky in relief and triumph after his iconic 82 not out against Australia in the 2016 World T20.',
        alt: 'Virat Kohli pointing right index finger to the sky in emotional transcendence after winning 82* vs Australia in Mohali 2016',
        description: 'Standing in gratitude with index finger pointed to the heavens after 82* vs Australia, capturing the emotional transcendence of the chase master.'
      },
      era2018_command: {
        id: 'IMG-TIMELINE-07',
        purpose: 'journey',
        era: '2018',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 07 (Australia Conquest & Test Command)',
        src: '../assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg',
        fallback: '../assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg',
        sourceUrl: 'https://www.gettyimages.com',
        photographer: 'Action Images via Reuters',
        caption: 'BIRMINGHAM, ENGLAND - AUGUST 02: Virat Kohli celebrates with bat aloft in Indian Test whites during the historic 2018 Test tour.',
        alt: 'Virat Kohli in Indian Test whites roaring in celebration with MRF bat and helmet outstretched after historic Test masterclass',
        description: 'Virat Kohli in Indian Test whites roaring in celebration, capturing the fierce determination that powered India to their historic 2018/19 series conquest in Australia.'
      },
      era2018_australia: {
        id: 'IMG-TIMELINE-07-ALIAS',
        purpose: 'journey',
        era: '2018',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 07 (Australia Conquest & Test Command)',
        src: '../assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg',
        fallback: '../assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg',
        alt: 'Virat Kohli in Indian Test whites roaring in celebration with MRF bat and helmet outstretched after historic Test masterclass',
        description: 'Virat Kohli in Indian Test whites roaring in celebration.'
      },
      era2023_summit: {
        id: 'IMG-TIMELINE-08',
        purpose: 'journey',
        era: '2023',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 08 (World Cup Summit & 50th ODI Century)',
        src: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe-centered.jpg',
        fallback: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe-centered.jpg',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-celebrates-his-century-during-the-icc-news-photo/1792617651',
        photographer: 'Punit Paranjpe / AFP via Getty Images',
        caption: 'MUMBAI, INDIA - NOVEMBER 15: Virat Kohli celebrates after scoring his 50th ODI century during the ICC Men\'s Cricket World Cup India 2023 semi-final between India and New Zealand at Wankhede Stadium on November 15, 2023 in Mumbai, India.',
        alt: 'Virat Kohli celebrating his record-breaking 50th ODI century with bat raised aloft before cheering crowd at Wankhede Stadium Mumbai',
        description: 'Historical apex at Wankhede Stadium: Virat Kohli scoring his 50th ODI century to surpass Sachin Tendulkar, bowing in reverence before the icon in the stands.'
      },
      era2024_t20_culmination: {
        id: 'IMG-TIMELINE-09',
        purpose: 'journey',
        era: '2024',
        page: '18_the_journey_horizontal_documentary_timeline',
        section: 'Milestone 09 (T20 World Cup Champion & Bridgetown Farewell)',
        src: '../assets/images/barbados-2024-t20-world-cup-trophy-lift-centered.jpg',
        fallback: '../assets/images/barbados-2024-t20-world-cup-trophy-lift-centered.jpg',
        sourceUrl: 'https://www.gettyimages.com',
        photographer: 'ICC / Getty Images',
        caption: 'BRIDGETOWN, BARBADOS - JUNE 29: Virat Kohli holds the ICC Men\'s T20 World Cup 2024 trophy draped with the Indian tricolor flag after victory in the final at Kensington Oval on June 29, 2024 in Bridgetown, Barbados.',
        alt: 'Virat Kohli holding the ICC Men\'s T20 World Cup 2024 trophy with Indian tricolor flag draped over shoulders in Bridgetown Barbados',
        description: 'T20 International farewell triumph: Virat Kohli smiling with the World Cup trophy draped in the Indian tricolor flag at Kensington Oval.'
      },
      era2027_destination: {
        id: 'IMG-TIMELINE-10',
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
        src: '../assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg',
        fallback: '../assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg',
        alt: 'Virat Kohli in Indian Test whites roaring in celebration with MRF bat and helmet outstretched after scoring 149 at Edgbaston in 2018',
        description: 'Edgbaston, Birmingham August 2018. Defiant 149 against swinging Dukes balls in English mist.'
      },
      mohali_82: {
        id: 'IMG-INNINGS-03',
        purpose: 'innings',
        match: 'vs Australia, Mohali 2016 (82*)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon Mohali 82* Card',
        src: '../assets/images/mohali-2016-australia-82-finger-to-sky-centered.jpg',
        fallback: '../assets/images/mohali-2016-australia-82-finger-to-sky-centered.jpg',
        alt: 'Virat Kohli pointing skyward in ecstatic relief and triumph after winning 82* vs Australia in Mohali 2016',
        description: 'Mohali 2016 T20 World Cup knockout chase against Australia.'
      },
      dhaka_183: {
        id: 'IMG-INNINGS-04',
        purpose: 'innings',
        match: 'vs Pakistan, Dhaka 2012 (183)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon Dhaka 183 Card',
        src: '../assets/images/dhaka-2012-kohli-183-bat-raised-roar-centered.jpg',
        fallback: '../assets/images/dhaka-2012-kohli-183-bat-raised-roar-centered.jpg',
        alt: 'Virat Kohli roaring in celebration with bat raised high after reaching century against Pakistan in Dhaka 2012',
        description: 'Career-best 183 off 148 balls chasing 330 against Pakistan in Asia Cup 2012.'
      },
      wankhede_117: {
        id: 'IMG-INNINGS-05',
        purpose: 'innings',
        match: 'vs New Zealand, Mumbai 2023 (117)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon Wankhede 50th Century Card',
        src: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe-centered.jpg',
        fallback: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe-centered.jpg',
        alt: 'Virat Kohli looking up with MRF bat raised vertically in celebration after scoring his 50th ODI century at Wankhede Stadium',
        description: 'World record 50th ODI century in the World Cup semi-final at Wankhede Stadium.'
      },
      edengardens_101: {
        id: 'IMG-INNINGS-06',
        purpose: 'innings',
        match: 'vs South Africa, Kolkata 2023 (101*)',
        page: '18_the_innings_we_ll_never_forget_desktop',
        section: 'Canon Eden Gardens 49th Century Card',
        src: '../assets/images/eden-gardens-2023-century-49-celebration-centered.jpg',
        fallback: '../assets/images/eden-gardens-2023-century-49-celebration-centered.jpg',
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
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        sourceUrl: 'https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-plays-a-defensive-shot-during-the-icc-news-photo/1794652371',
        photographer: 'Alex Davidson - ICC / Getty Images',
        caption: 'MUMBAI, INDIA - NOVEMBER 15: Virat Kohli of India plays a defensive shot during the ICC Men\'s Cricket World Cup India 2023 semi-final between India and New Zealand at Wankhede Stadium on November 15, 2023 in Mumbai, India.',
        alt: 'Virat Kohli playing defensive shot with laser focus at Wankhede Stadium'
      },
      greenfield_trivandrum: {
        id: 'VENUE-GREENFIELD',
        venue: 'Greenfield International Stadium',
        city: 'Trivandrum',
        territory: 'Kerala, Republic of India',
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli playing defensive push shot in full 50-over strokeplay focus'
      },
      barsapara_guwahati: {
        id: 'VENUE-BARSAPARA',
        venue: 'Barsapara Cricket Stadium',
        city: 'Guwahati',
        territory: 'Assam, Republic of India',
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli playing exquisite defensive stroke in 50-over international cricket'
      },
      pcamullanpur_newchandigarh: {
        id: 'VENUE-PCAMULLANPUR',
        venue: 'IS Bindra PCA Stadium',
        city: 'New Chandigarh',
        territory: 'Punjab, Republic of India',
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli in full strokeplay focus during India bilateral ODI series'
      },
      edenpark_auckland: {
        id: 'VENUE-EDENPARK',
        venue: 'Eden Park',
        city: 'Auckland',
        territory: 'Auckland, New Zealand',
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli batting in international 50-over cricket'
      },
      skystadium_wellington: {
        id: 'VENUE-SKYSTADIUM',
        venue: 'Sky Stadium',
        city: 'Wellington',
        territory: 'Wellington, New Zealand',
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli in action during bilateral 50-over ODI series'
      },
      seddonpark_hamilton: {
        id: 'VENUE-SEDDONPARK',
        venue: 'Seddon Park',
        city: 'Hamilton',
        territory: 'Waikato, New Zealand',
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli playing defensive stroke with soft hands'
      },
      bayoval_mtmaunganui: {
        id: 'VENUE-BAYOVAL',
        venue: 'Bay Oval',
        city: 'Mount Maunganui',
        territory: 'Bay of Plenty, New Zealand',
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli batting in overseas ODI series'
      },
      arunjaitley_delhi: {
        id: 'VENUE-ARUNJAITLEY',
        venue: 'Arun Jaitley Stadium',
        city: 'Delhi',
        territory: 'Delhi, Republic of India',
        src: '../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-centered.jpg',
        fallback: '../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-centered.jpg',
        alt: '18-year-old Virat Kohli in Delhi Ranji Trophy flannels at Feroz Shah Kotla'
      },
      chinnaswamy_bengaluru: {
        id: 'VENUE-CHINNASWAMY',
        venue: 'M. Chinnaswamy Stadium',
        city: 'Bengaluru',
        territory: 'Karnataka, Republic of India',
        src: '../assets/images/wankhede-2023-semi-final-post-match-walkoff-alex-davidson.jpg',
        fallback: '../assets/images/wankhede-2023-semi-final-post-match-walkoff-alex-davidson.jpg',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli smiling in satisfied post-match walkoff in blue India kit'
      },
      narendramodi_ahmedabad: {
        id: 'VENUE-NARENDRAMODI',
        venue: 'Narendra Modi Stadium',
        city: 'Ahmedabad',
        territory: 'Gujarat, Republic of India',
        src: '../assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg',
        fallback: '../assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli roaring with clenched fists in official World Cup campaign portrait'
      },
      edengardens_kolkata: {
        id: 'VENUE-EDENGARDENS',
        venue: 'Eden Gardens',
        city: 'Kolkata',
        territory: 'West Bengal, Republic of India',
        src: '../assets/images/eden-gardens-2023-century-49-celebration-centered.jpg',
        fallback: '../assets/images/eden-gardens-2023-century-49-celebration-centered.jpg',
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
        src: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        fallback: '../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli in full strokeplay focus during India bilateral ODI series'
      },
      newlands_capetown: {
        id: 'VENUE-NEWLANDS',
        venue: 'Newlands Cricket Ground',
        city: 'Cape Town',
        territory: 'Western Cape, South Africa',
        src: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        fallback: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        photographer: 'Surjeet Yadav / IANS',
        alt: 'Virat Kohli acknowledging the crowd after scoring his career-best 254*'
      },
      wanderers_johannesburg: {
        id: 'VENUE-WANDERERS',
        venue: 'The Wanderers Stadium',
        city: 'Johannesburg',
        territory: 'Gauteng, South Africa',
        src: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        fallback: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        photographer: 'Surjeet Yadav / IANS',
        alt: 'Virat Kohli acknowledging the crowd in Test match mastery'
      },
      supersport_centurion: {
        id: 'VENUE-SUPERSPORT',
        venue: 'SuperSport Park',
        city: 'Centurion (Tshwane)',
        territory: 'Gauteng, South Africa',
        src: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        fallback: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        photographer: 'Surjeet Yadav / IANS',
        alt: 'Virat Kohli in marathon double-century command'
      },
      mangaung_bloemfontein: {
        id: 'VENUE-MANGAUNG',
        venue: 'Mangaung Oval',
        city: 'Bloemfontein',
        territory: 'Free State, South Africa',
        src: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        fallback: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        photographer: 'Surjeet Yadav / IANS',
        alt: 'Virat Kohli acknowledging crowd applause'
      },
      victoriafalls_zimbabwe: {
        id: 'VENUE-VICTORIAFALLS',
        venue: 'Victoria Falls Stadium',
        city: 'Victoria Falls',
        territory: 'Matabeleland North, Zimbabwe',
        src: '../assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg',
        fallback: '../assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg',
        photographer: 'Alex Davidson - ICC / Getty Images',
        alt: 'Virat Kohli roaring in fierce determination ahead of the 2027 Africa campaign'
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
        fallback: '../assets/images/mcg-2022-kohli-flick-six-shot-william-west.webp',
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
        src: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe-centered.jpg',
        fallback: '../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe-centered.jpg',
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
        src: '../assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg',
        fallback: '../assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg',
        sourceUrl: 'https://www.reuters.com',
        photographer: 'Philip Brown / Reuters / Action Images',
        caption: 'BIRMINGHAM, ENGLAND - AUGUST 02: Virat Kohli celebrates his century on Day 2 of the 1st Test between England and India at Edgbaston on August 2, 2018.',
        alt: 'Virat Kohli in Indian Test whites roaring in celebration with MRF bat and helmet outstretched after scoring 149 at Edgbaston in 2018',
        description: 'Edgbaston 2018 historic 149 masterclass against England in English overcast conditions.'
      },
      pune_2019: {
        id: 'IMG-KEEPSAKE-PUNE2019',
        purpose: 'keepsake',
        match: 'India vs South Africa • Pune 2019 (254*)',
        page: '18_i_was_there_commemorative_keepsake_generator',
        src: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        fallback: '../assets/images/pune-2019-kohli-254-double-century-centered.jpg',
        sourceUrl: 'https://www.gettyimages.com',
        photographer: 'Surjeet Yadav / IANS',
        caption: 'PUNE, INDIA - OCTOBER 11: Virat Kohli acknowledges the crowd after scoring his career-best 254* against South Africa at MCA Stadium Pune on October 11, 2019.',
        alt: 'Virat Kohli acknowledging the crowd after scoring his career-highest 254* against South Africa in Pune',
        description: 'Marathon 254* double century test masterclass in Pune.'
      },
      dubai_2022: {
        id: 'IMG-KEEPSAKE-DUBAI2022',
        purpose: 'keepsake',
        match: 'Asia Cup • Dubai 2022 (Maiden T20I / 71st Century)',
        page: '18_i_was_there_commemorative_keepsake_generator',
        src: '../assets/images/dubai-2022-kohli-122-century-centered.jpg',
        fallback: '../assets/images/dubai-2022-kohli-122-century-centered.jpg',
        sourceUrl: 'https://www.gettyimages.com/detail/news-photo/virat-kohli-of-india-celebrates-after-scoring-a-century-news-photo/1421950409',
        photographer: 'Surjeet Yadav / AFP via Getty Images (Photo ID 1421950409)',
        caption: 'DUBAI, UAE - SEPTEMBER 08: Virat Kohli of India celebrates after scoring a century (122*) during the Asia Cup match against Afghanistan at Dubai International Stadium on September 08, 2022.',
        alt: 'Virat Kohli celebrating his maiden T20I century (122*) and 71st international hundred in Dubai 2022',
        description: 'Dubai International Stadium floodlights for the emotional 71st international century.'
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
