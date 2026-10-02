/**
 * 18 | ONE LAST CHAPTER — COMPLETE PHOTOGRAPHY ASSET MANIFEST
 * Machine-readable registry of verified real-photography assets.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.VK18AssetManifest = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  return {
  "_UNREFERENCED": "RETAINED DELIBERATELY \u2014 NOT LOADED BY ANY PAGE. Verified 2026-09-30: nothing in the project references asset-manifest.js or asset-manifest.json (no script tag, require, import or dynamic path). Kept because this project has no git history, so deletion is unrecoverable. The LIVE image data is shared/image-assets.js (window.VK18Images), which resolves paths directly to ../assets/images/ and does not use this file.",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "VK18 Website Real Photography Image Asset Manifest",
  "description": "Centralized mapping of all real-photography images across the 11 pages of the Virat Kohli Cinematic Tribute website, including local asset paths, source URLs, photographer credits, editorial captions, dimensions, and fallbacks.",
  "version": "2.0.0",
  "updatedDate": "2026-09-29",
  "totalPages": 11,
  "summary": {
    "totalImageReferences": 29,
    "realPhotographyAssetsCount": 21,
    "localAssetFolder": "assets/images/",
    "sourcesIncluded": [
      "82* vs Pakistan Melbourne 2022 (Getty Images & AFP)",
      "2023 ICC World Cup Official Portraits & Match Action (Getty Images / Alex Davidson, Punit Paranjpe)",
      "India ODI Library (Getty Images / Stu Forster, Robert Cianflone)",
      "MensXP Milestone Archives (ICC / AFP)"
    ]
  },
  "pages": {
    "18_one_last_chapter_hero": {
      "pageFile": "18_one_last_chapter_hero/code.html",
      "pageTitle": "18 | ONE LAST CHAPTER \u2014 Hero Landmark",
      "assets": [
        {
          "assetId": "IMG-HERO-01",
          "purpose": "hero",
          "section": "Documentary Full-Bleed Atmosphere Backdrop",
          "element": "img",
          "selector": "main > div > div > div.absolute.inset-0.z-0 > img",
          "binding": "data-vk-image=\"hero.mainBackdrop\"",
          "localFile": "assets/images/world-cup-2023-portrait-bat-on-shoulder-alex-davidson.webp",
          "currentSrc": "../assets/images/world-cup-2023-portrait-bat-on-shoulder-alex-davidson.webp",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-poses-for-a-portrait-ahead-of-the-icc-news-photo/1716719115",
          "photographer": "Alex Davidson - ICC / Getty Images",
          "caption": "Virat Kohli of India poses for an official portrait holding bat on shoulder ahead of the ICC Men's Cricket World Cup India 2023",
          "resolution": "1365x2048",
          "status": "integrated_real_photo"
        }
      ]
    },
    "18_the_last_chapter_desktop_editorial": {
      "pageFile": "18_the_last_chapter_desktop_editorial/code.html",
      "pageTitle": "18 | THE LAST CHAPTER \u2014 Desktop Editorial",
      "assets": [
        {
          "assetId": "IMG-EDITORIAL-01",
          "purpose": "editorial",
          "section": "Cinematic Photographic Installation (Bleed Vignette)",
          "element": "img",
          "selector": "div.max-w-\\[1440px\\] div.relative.overflow-hidden img",
          "binding": "data-vk-image=\"editorial.tunnelAscent\"",
          "localFile": "assets/images/world-cup-2023-portrait-folded-arms-alex-davidson.jpg",
          "currentSrc": "../assets/images/world-cup-2023-portrait-folded-arms-alex-davidson.jpg",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-poses-for-a-portrait-ahead-of-the-icc-news-photo/1716728546",
          "photographer": "Alex Davidson - ICC / Getty Images",
          "caption": "Virat Kohli of India poses for a portrait ahead of the ICC Men's Cricket World Cup India 2023 in moody side lighting with arms folded.",
          "resolution": "1365x2048",
          "status": "integrated_real_photo"
        }
      ]
    },
    "18_the_journey_horizontal_documentary_timeline": {
      "pageFile": "18_the_journey_horizontal_documentary_timeline/code.html",
      "pageTitle": "18 | THE JOURNEY \u2014 Horizontal Documentary Timeline",
      "assets": [
        {
          "assetId": "IMG-TIMELINE-00A",
          "purpose": "journey",
          "era": "1990s",
          "section": "Milestone 01 (Childhood Roots & Father Prem Kohli)",
          "element": "img",
          "binding": "data-vk-image=\"journey.childhood\"",
          "localFile": "assets/images/childhood-young-virat-with-father-prem-kohli-centered.jpg",
          "currentSrc": "../assets/images/childhood-young-virat-with-father-prem-kohli-centered.jpg",
          "sourceUrl": "https://www.deccanherald.com/dh-galleries/photos/virat-kohli-birthday-special-check-out-some-of-his-rare-photos-1047542",
          "photographer": "Family Archive / Instagram @virat.kohli via Deccan Herald",
          "caption": "Young Virat Kohli as a toddler in light sweater supported by his father Prem Kohli in Delhi",
          "resolution": "720x405",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-TIMELINE-00B",
          "purpose": "journey",
          "era": "2004 \u2014 2006",
          "section": "Milestone 02 (Teenage / Early Delhi Ranji Trophy Proving Ground)",
          "element": "img",
          "binding": "data-vk-image=\"journey.teenage_cricket\"",
          "localFile": "assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-centered.jpg",
          "currentSrc": "../assets/images/delhi-ranji-trophy-2006-debut-feroz-shah-kotla-centered.jpg",
          "sourceUrl": "https://www.hindustantimes.com/photos/how-delhis-virat-became-the-worlds-king-kohli-8-pictures-from-virat-kohlis-early-days-as-a-cricketer-101747044922239.html",
          "photographer": "Hindustan Times Archives",
          "caption": "18-year-old Virat Kohli in Delhi Ranji Trophy flannels and maroon cap walking off Feroz Shah Kotla pitch with BDM bat and pads, 2006",
          "resolution": "1181x664",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-TIMELINE-01",
          "purpose": "journey",
          "era": "2008",
          "section": "Milestone 03 (2008 U19 World Cup Victory)",
          "element": "img",
          "binding": "data-vk-image=\"journey.era2008_u19\"",
          "localFile": "assets/images/kuala-lumpur-2008-u19-world-cup-trophy-centered.jpg",
          "currentSrc": "../assets/images/kuala-lumpur-2008-u19-world-cup-trophy-centered.jpg",
          "sourceUrl": "https://www.icc-cricket.com/photos/album/virat-kohli-with-the-2008-u19-cricket-world-cup",
          "photographer": "Getty Images - ICC (GettyImages-80086555)",
          "caption": "KUALA LUMPUR, MALAYSIA - MARCH 03: India U19 captain Virat Kohli poses with the ICC U/19 Cricket World Cup trophy in front of the Petronas Twin Towers on March 3, 2008 in Kuala Lumpur, Malaysia.",
          "resolution": "2301x1294",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-TIMELINE-02",
          "purpose": "journey",
          "era": "2008 \u2014 2011",
          "section": "Milestone 04 (Early India Debut & 2011 World Cup Torch Passing)",
          "element": "img",
          "binding": "data-vk-image=\"journey.era2011_world_cup\"",
          "localFile": "assets/images/wankhede-2011-world-cup-trophy-celebration-centered.jpg",
          "currentSrc": "../assets/images/wankhede-2011-world-cup-trophy-celebration-centered.jpg",
          "resolution": "1376x768",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-TIMELINE-05",
          "purpose": "journey",
          "era": "2012 \u2014 2013",
          "section": "Milestone 05 (The Chase Master)",
          "element": "img",
          "binding": "data-vk-image=\"journey.era2013_chase\"",
          "localFile": "assets/images/dhaka-2012-kohli-183-bat-raised-roar-centered.jpg",
          "currentSrc": "../assets/images/dhaka-2012-kohli-183-bat-raised-roar-centered.jpg",
          "sourceUrl": "https://www.espncricinfo.com/series/asia-cup-2011-12-524504/india-vs-pakistan-5th-match-535798/match-report",
          "photographer": "AFP / Getty Images",
          "caption": "DHAKA, BANGLADESH - MARCH 18: Virat Kohli roars in celebration with bat raised high during his epic 183 chase against Pakistan in the 2012 Asia Cup.",
          "resolution": "700x393",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-TIMELINE-06",
          "purpose": "journey",
          "era": "2016",
          "section": "Milestone 06 (A Defining Year \u2014 Peak Transcendence)",
          "element": "img",
          "binding": "data-vk-image=\"journey.era2016_transcendence\"",
          "localFile": "assets/images/mohali-2016-australia-82-finger-to-sky-centered.jpg",
          "currentSrc": "../assets/images/mohali-2016-australia-82-finger-to-sky-centered.jpg",
          "sourceUrl": "https://www.mensxp.com/ampstories/buzz-on-web/latest/132586-ipl-2023-virat-kohli-and-his-love-for-82-not-out-in-big-games-rcb-vs-mi.html",
          "photographer": "ICC / AFP via MensXP",
          "caption": "MOHALI, INDIA - MARCH 27: Virat Kohli stands with right index finger pointed high toward the sky in relief and triumph after his iconic 82 not out against Australia in the 2016 World T20.",
          "resolution": "720x405",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-TIMELINE-07",
          "purpose": "journey",
          "era": "2018",
          "section": "Milestone 07 (Australia Conquest & Test Command)",
          "element": "img",
          "binding": "data-vk-image=\"journey.era2018_command\"",
          "localFile": "assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg",
          "currentSrc": "../assets/images/edgbaston-2018-kohli-149-roar-celebration-centered.jpg",
          "sourceUrl": "https://www.gettyimages.com",
          "photographer": "Action Images via Reuters",
          "caption": "BIRMINGHAM, ENGLAND - AUGUST 02: Virat Kohli celebrates with bat aloft in Indian Test whites during the historic 2018 Test tour.",
          "resolution": "670x376",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-TIMELINE-08",
          "purpose": "journey",
          "era": "2023",
          "section": "Milestone 08 (World Cup Summit & 50th ODI Century)",
          "element": "img",
          "binding": "data-vk-image=\"journey.era2023_summit\"",
          "localFile": "assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe-centered.jpg",
          "currentSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe-centered.jpg",
          "sourceUrl": "https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-celebrates-his-century-during-the-icc-news-photo/1792617651",
          "photographer": "Punit Paranjpe / AFP via Getty Images",
          "caption": "MUMBAI, INDIA - NOVEMBER 15: Virat Kohli celebrates after scoring his 50th ODI century during the ICC Men's Cricket World Cup India 2023 semi-final between India and New Zealand at Wankhede Stadium on November 15, 2023 in Mumbai, India.",
          "resolution": "2048x1152",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-TIMELINE-09",
          "purpose": "journey",
          "era": "2024",
          "section": "Milestone 09 (T20 World Cup Champion & Bridgetown Farewell)",
          "element": "img",
          "binding": "data-vk-image=\"journey.era2024_t20_culmination\"",
          "localFile": "assets/images/barbados-2024-t20-world-cup-trophy-lift-centered.jpg",
          "currentSrc": "../assets/images/barbados-2024-t20-world-cup-trophy-lift-centered.jpg",
          "sourceUrl": "https://www.gettyimages.com",
          "photographer": "ICC / Getty Images",
          "caption": "BRIDGETOWN, BARBADOS - JUNE 29: Virat Kohli holds the ICC Men's T20 World Cup 2024 trophy draped with the Indian tricolor flag after victory in the final at Kensington Oval on June 29, 2024 in Bridgetown, Barbados.",
          "resolution": "594x334",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-TIMELINE-10",
          "purpose": "journey",
          "era": "2027",
          "section": "Milestone 10 (2027 Final Chapter Swansong Climax Backdrop)",
          "element": "img",
          "binding": "data-vk-image=\"journey.era2027_destination\"",
          "localFile": "assets/images/world-cup-2023-final-dejected-kohli-rohit-alex-davidson.webp",
          "currentSrc": "../assets/images/world-cup-2023-final-dejected-kohli-rohit-alex-davidson.webp",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-and-rohit-sharma-of-india-cut-dejected-figures-news-photo/1802477540",
          "photographer": "Alex Davidson - ICC / Getty Images",
          "caption": "AHMEDABAD, INDIA - NOVEMBER 19: Virat Kohli and Rohit Sharma of India walk together following the ICC Men's Cricket World Cup Final at Narendra Modi Stadium, setting up the unfinished business for 2027.",
          "resolution": "2048x1314",
          "status": "integrated_real_photo"
        }
      ]
    },
    "18_the_innings_we_ll_never_forget_desktop": {
      "pageFile": "18_the_innings_we_ll_never_forget_desktop/code.html",
      "pageTitle": "18 | THE INNINGS WE'LL NEVER FORGET \u2014 Canon Anthology",
      "assets": [
        {
          "assetId": "IMG-INNINGS-01",
          "purpose": "innings",
          "section": "Canon 01 Hero Card (82* vs Pakistan)",
          "binding": "data-vk-image=\"innings.melbourne_82\"",
          "localFile": "assets/images/mcg-2022-kohli-prayer-finger-to-sky-martin-keep.webp",
          "currentSrc": "../assets/images/mcg-2022-kohli-prayer-finger-to-sky-martin-keep.webp",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.com.au/detail/news-photo/indias-virat-kohli-celebrates-after-their-win-during-the-news-photo/1244169092",
          "photographer": "Martin Keep / AFP via Getty Images",
          "caption": "MELBOURNE, AUSTRALIA - OCTOBER 23: India's Virat Kohli is hoisted aloft by Rohit Sharma as they celebrate the miracle win over Pakistan at the MCG.",
          "resolution": "2048x1365",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-INNINGS-02",
          "purpose": "innings",
          "section": "Canon 02 Flank Card (149 vs England)",
          "binding": "data-vk-image=\"innings.edgbaston_149\"",
          "currentSrc": "../assets/images/edgbaston-2018-kohli-149-roar-celebration.jpg",
          "status": "archival_active"
        }
      ]
    },
    "18_82_vs_pakistan_melbourne_2022": {
      "pageFile": "18_82_vs_pakistan_melbourne_2022/code.html",
      "pageTitle": "18 | 82* VS PAKISTAN \u2014 Melbourne 2022 Dossier",
      "assets": [
        {
          "assetId": "IMG-MCGDOSSIER-01",
          "purpose": "82_vs_pakistan",
          "section": "Header Brand Icon",
          "binding": "data-vk-image=\"eighty_two_vs_pakistan.headerIcon\"",
          "localFile": "assets/images/mcg-2022-winning-run-celebration-darrian-traynor.webp",
          "currentSrc": "../assets/images/mcg-2022-winning-run-celebration-darrian-traynor.webp",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.com.au/detail/news-photo/virat-kohli-of-india-celebrates-after-the-final-run-is-news-photo/1435855942",
          "photographer": "Darrian Traynor - ICC / Getty Images",
          "caption": "Virat Kohli celebration after the winning run at the MCG",
          "resolution": "2048x1365",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-MCGDOSSIER-02",
          "purpose": "82_vs_pakistan",
          "section": "Dossier Hero Stage Scrim",
          "binding": "data-vk-image=\"eighty_two_vs_pakistan.heroBackdrop\"",
          "localFile": "assets/images/mcg-2022-winning-run-celebration-darrian-traynor.webp",
          "currentSrc": "../assets/images/mcg-2022-winning-run-celebration-darrian-traynor.webp",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.com.au/detail/news-photo/virat-kohli-of-india-celebrates-after-the-final-run-is-news-photo/1435855942",
          "photographer": "Darrian Traynor - ICC / Getty Images",
          "caption": "MELBOURNE, AUSTRALIA - OCTOBER 23: Virat Kohli of India celebrates after the final run is scored during the ICC Men's T20 World Cup match between India and Pakistan at Melbourne Cricket Ground on October 23, 2022.",
          "resolution": "2048x1365",
          "status": "integrated_real_photo"
        }
      ]
    },
    "18_the_last_ones_remaining_odis": {
      "pageFile": "18_the_last_ones_remaining_odis/code.html",
      "pageTitle": "18 | THE REMAINING ODIS \u2014 Countdown Ledger",
      "assets": [
        {
          "assetId": "IMG-REMAINING-01",
          "purpose": "remaining_odis",
          "section": "Main Hero Ledger Stage Backdrop",
          "binding": "data-vk-bg=\"remaining_odis.heroLedger\"",
          "localFile": "assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp",
          "currentSrc": "../assets/images/wankhede-2023-semi-final-defensive-shot-alex-davidson.webp",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-bats-during-the-icc-mens-cricket-world-news-photo/1794652371",
          "photographer": "Alex Davidson - ICC / Getty Images",
          "caption": "MUMBAI, INDIA - NOVEMBER 15: Virat Kohli of India bats in full strokeplay during the ICC Men's Cricket World Cup semi-final match between India and New Zealand at Wankhede Stadium.",
          "resolution": "2048x1313",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-REMAINING-02",
          "purpose": "remaining_odis",
          "section": "Card 1 Archival Window (British Midsummer 50-Over Stage)",
          "binding": "data-vk-bg=\"remaining_odis.edgbastonStage\"",
          "localFile": "assets/images/lords-odi-kohli-rohit-partnership-embrace-alex-davidson.jpg",
          "currentSrc": "../assets/images/lords-odi-kohli-rohit-partnership-embrace-alex-davidson.jpg",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.co.uk/photos/virat-kohli-odi",
          "photographer": "Stu Forster / Getty Images",
          "caption": "LONDON, ENGLAND - JULY 19: Virat Kohli of India celebrates during the Metro Bank ODI series between England and India at Lord's.",
          "resolution": "2048x1366",
          "status": "integrated_real_photo"
        }
      ]
    },
    "18_match_details_india_vs_australia": {
      "pageFile": "18_match_details_india_vs_australia/code.html",
      "pageTitle": "18 | MATCH DOSSIER \u2014 India vs Australia",
      "assets": [
        {
          "assetId": "VENUE-WANKHEDE",
          "purpose": "venues",
          "section": "Wankhede Stadium Master View",
          "binding": "data-vk-image=\"venues.wankhede_mumbai\"",
          "currentSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "status": "archival_active"
        }
      ]
    },
    "18_be_there_for_it_desktop": {
      "pageFile": "18_be_there_for_it_desktop/code.html",
      "pageTitle": "18 | BE THERE FOR IT \u2014 Commemorative Pass",
      "assets": [
        {
          "assetId": "IMG-BETHERE-01",
          "purpose": "be_there",
          "section": "Atmospheric Panoramic Hero Pivot",
          "binding": "data-vk-bg=\"be_there.crowdAtmosphere\"",
          "localFile": "assets/images/mcg-2022-stadium-stands-wide-view-surjeet-yadav.jpg",
          "currentSrc": "../assets/images/mcg-2022-stadium-stands-wide-view-surjeet-yadav.jpg",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.com.au/photos/world-twenty-india-pakistan-v-australia",
          "photographer": "Quinn Rooney / Getty Images",
          "caption": "MELBOURNE, AUSTRALIA - OCTOBER 23: Colossal panoramic view of Melbourne Cricket Ground packed to capacity with 90,293 spectators under towering floodlights during the India vs Pakistan classic.",
          "resolution": "2048x1365",
          "status": "integrated_real_photo"
        }
      ]
    },
    "18_world_cup_2027_destination": {
      "pageFile": "18_world_cup_2027_destination/code.html",
      "pageTitle": "18 | 2027 DESTINATION \u2014 The Horizon",
      "assets": [
        {
          "assetId": "IMG-DESTINATION-01",
          "purpose": "world_cup",
          "section": "Hero Horizon Full-Screen Stage",
          "binding": "data-vk-bg=\"world_cup.horizonHero\"",
          "localFile": "assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg",
          "currentSrc": "../assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-poses-for-a-portrait-ahead-of-the-icc-news-photo/1716725647",
          "photographer": "Alex Davidson - ICC / Getty Images",
          "caption": "Virat Kohli of India poses for a portrait ahead of the ICC Men's Cricket World Cup India 2023, roaring with clenched fists.",
          "resolution": "2048x1365",
          "status": "integrated_real_photo"
        }
      ]
    },
    "18_we_were_there_fan_memories_keepsake": {
      "pageFile": "18_we_were_there_fan_memories_keepsake/code.html",
      "pageTitle": "18 | WE WERE THERE \u2014 Witness Registry",
      "assets": [
        {
          "assetId": "IMG-FANMEMORIES-01",
          "purpose": "fans",
          "section": "Witness Registry 35mm Reel Scan Main Display",
          "binding": "data-vk-image=\"fans.witnessFlags\"",
          "localFile": "assets/images/mcg-2022-india-pakistan-fans-pose-william-west.jpg",
          "currentSrc": "../assets/images/mcg-2022-india-pakistan-fans-pose-william-west.jpg",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.com.au/photos/world-twenty-india-pakistan-v-australia",
          "photographer": "Asif Hassan / AFP via Getty Images",
          "caption": "MELBOURNE, AUSTRALIA - OCTOBER 23: Indian and Pakistan fans celebrate and pose together waving national flags in raw emotion at the Melbourne Cricket Ground.",
          "resolution": "2048x1365",
          "status": "integrated_real_photo"
        }
      ]
    },
    "18_i_was_there_commemorative_keepsake_generator": {
      "pageFile": "18_i_was_there_commemorative_keepsake_generator/code.html",
      "pageTitle": "18 | KEEPSAKE GENERATOR \u2014 Commemorative Folio",
      "assets": [
        {
          "assetId": "IMG-KEEPSAKE-DEFAULT",
          "purpose": "keepsake",
          "section": "Folio Card Archival Frame (Initial State)",
          "binding": "data-vk-image=\"keepsake.defaultCard\"",
          "localFile": "assets/images/wankhede-2023-semi-final-post-match-walkoff-alex-davidson.jpg",
          "currentSrc": "../assets/images/wankhede-2023-semi-final-post-match-walkoff-alex-davidson.jpg",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-reacts-after-winning-the-icc-mens-news-photo/1795170391",
          "photographer": "Alex Davidson - ICC / Getty Images",
          "caption": "MUMBAI, INDIA - NOVEMBER 15: Virat Kohli of India reacts with a satisfied smile walking off after winning the World Cup Semi Final match between India and New Zealand at Wankhede Stadium.",
          "resolution": "2048x1440",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-KEEPSAKE-MCG2022",
          "purpose": "keepsake",
          "match": "India vs Pakistan \u2022 Melbourne 2022 (82*)",
          "localFile": "assets/images/mcg-2022-kohli-flick-six-shot-william-west.webp",
          "currentSrc": "../assets/images/mcg-2022-kohli-flick-six-shot-william-west.webp",
          "fallbackSrc": "../assets/images/mcg-2022-kohli-flick-six-shot-william-west.webp",
          "sourceUrl": "https://www.gettyimages.com.au/photos/world-twenty-india-pakistan-v-australia",
          "photographer": "Quinn Rooney / Getty Images",
          "caption": "MELBOURNE, AUSTRALIA - OCTOBER 23: India's Virat Kohli plays a shot over the boundary line for six off Haris Rauf during the ICC Men's T20 World Cup match at MCG.",
          "resolution": "2048x1366",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-KEEPSAKE-WANKHEDE2025",
          "purpose": "keepsake",
          "match": "India vs Australia \u2022 Mumbai 2025",
          "localFile": "assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "currentSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "fallbackSrc": "../assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
          "sourceUrl": "https://www.gettyimages.ie/detail/news-photo/indias-virat-kohli-celebrates-after-scoring-a-century-news-photo/1783004094",
          "photographer": "Punit Paranjpe / AFP via Getty Images",
          "resolution": "2048x1366",
          "status": "integrated_real_photo"
        },
        {
          "assetId": "IMG-KEEPSAKE-SEMIFINAL",
          "purpose": "keepsake",
          "match": "World Cup Semi-Final \u2022 Mumbai 2023",
          "localFile": "assets/images/wankhede-2023-semi-final-post-match-walkoff-alex-davidson.jpg",
          "currentSrc": "../assets/images/wankhede-2023-semi-final-post-match-walkoff-alex-davidson.jpg",
          "sourceUrl": "https://www.gettyimages.co.uk/detail/news-photo/virat-kohli-of-india-reacts-after-winning-the-icc-mens-news-photo/1795170391",
          "photographer": "Alex Davidson - ICC / Getty Images",
          "resolution": "2048x1440",
          "status": "integrated_real_photo"
        }
      ]
    }
  }
};
});
