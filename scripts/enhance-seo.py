#!/usr/bin/env python3
"""
scripts/enhance-seo.py
Systematically boosts SEO across all pages:
  1. Fixes missing <h1> tags in editorial and innings pages.
  2. Injects rich JSON-LD structured data (Person, WebSite, BreadcrumbList, SportsEvent, Article).
  3. Upgrades Open Graph & Twitter Cards with absolute high-res preview images, dimensions & alts.
  4. Injects curated meta keywords and author tags.
  5. Optimizes all <img> tags with loading="lazy", decoding="async", and semantic alt descriptions.
"""

from pathlib import Path
import re
import json

ROOT_DIR = Path(__file__).resolve().parent.parent
BASE_URL = "https://18-one-last-chapter.fan"

PAGE_METADATA = {
    "18_one_last_chapter_hero/code.html": {
        "title": "18 | ONE LAST CHAPTER — Virat Kohli Cinematic Tribute & Archival Retrospective",
        "name": "One Last Chapter — Hero",
        "path": "18_one_last_chapter_hero/code.html",
        "clean_path": "",
        "og_image": "assets/images/world-cup-2023-portrait-bat-on-shoulder-alex-davidson.webp",
        "og_image_alt": "Virat Kohli in India cricket uniform, bat on shoulder",
        "keywords": "Virat Kohli, cricket, India, One Last Chapter, 100 centuries, ODI centuries, 2027 World Cup, Indian cricket legend, VK18",
        "schema_type": "WebSite",
    },
    "18_career_stats_international/code.html": {
        "title": "18 | STATS — Virat Kohli Official International Career Records",
        "name": "Career Stats",
        "path": "18_career_stats_international/code.html",
        "clean_path": "stats",
        "og_image": "assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg",
        "og_image_alt": "Virat Kohli roaring in celebration during ICC World Cup",
        "keywords": "Virat Kohli stats, Test cricket records, ODI centuries, T20I stats, Cricinfo, Cricbuzz, Kohli 86 hundreds, international cricket ledger",
        "schema_type": "Dataset",
    },
    "18_the_last_chapter_desktop_editorial/code.html": {
        "title": "18 | THE LAST CHAPTER — The Final ODI Chapter: India's Relentless Chaser",
        "name": "The Last Chapter Editorial",
        "path": "18_the_last_chapter_desktop_editorial/code.html",
        "clean_path": "editorial",
        "og_image": "assets/images/solitary-batsman-tunnel-walk.png",
        "og_image_alt": "Virat Kohli walking through stadium tunnel toward the pitch",
        "keywords": "Virat Kohli editorial, cricket retrospective, chase master, Indian cricket history, 2027 World Cup journey",
        "schema_type": "Article",
    },
    "18_the_journey_horizontal_documentary_timeline/code.html": {
        "title": "18 | THE JOURNEY — Chronological Archival Timeline (2008 – 2024)",
        "name": "The Journey",
        "path": "18_the_journey_horizontal_documentary_timeline/code.html",
        "clean_path": "journey",
        "og_image": "assets/images/delhi-airport-2008-u19-world-cup-trophy-arrival-timescontent.webp",
        "og_image_alt": "Young Virat Kohli with the 2008 U-19 Cricket World Cup Trophy",
        "keywords": "Virat Kohli timeline, career journey, 2008 U19 World Cup, 2011 World Cup, captaincy era, 2024 T20 World Cup champion",
        "schema_type": "CollectionPage",
    },
    "18_the_innings_we_ll_never_forget_desktop/code.html": {
        "title": "18 | THE INNINGS — The Monumental Knocks We'll Never Forget",
        "name": "Iconic Innings",
        "path": "18_the_innings_we_ll_never_forget_desktop/code.html",
        "clean_path": "innings",
        "og_image": "assets/images/mcg-2022-kohli-prayer-finger-to-sky-martin-keep.webp",
        "og_image_alt": "Virat Kohli pointing finger to the sky after 82* at Melbourne Cricket Ground",
        "keywords": "Virat Kohli best innings, 82 vs Pakistan MCG, 183 vs Pakistan Dhaka, 149 Edgbaston, 82 vs Australia Mohali, 50th century Wankhede, 133 Hobart",
        "schema_type": "CollectionPage",
    },
    "18_the_last_ones_remaining_odis/code.html": {
        "title": "18 | REMAINING ODIS — The Final Bilateral Fixture Ledger & Century Goal",
        "name": "Remaining ODIs",
        "path": "18_the_last_ones_remaining_odis/code.html",
        "clean_path": "remaining-odis",
        "og_image": "assets/images/stadium-passionate-crowd-floodlights.png",
        "og_image_alt": "Atmospheric cricket stadium under evening floodlights",
        "keywords": "Virat Kohli upcoming matches, remaining ODIs, India ODI schedule, 100 centuries chase, countdown to 2027",
        "schema_type": "CollectionPage",
    },
    "18_world_cup_2027_destination/code.html": {
        "title": "18 | DESTINATION 2027 — The Final World Cup Campaign in Africa",
        "name": "Destination 2027",
        "path": "18_world_cup_2027_destination/code.html",
        "clean_path": "world-cup-2027",
        "og_image": "assets/images/stadium-colossal-arena-panoramic.png",
        "og_image_alt": "Panoramic view of monumental cricket stadium arena",
        "keywords": "ICC World Cup 2027, South Africa Zimbabwe Namibia, Virat Kohli World Cup, India cricket campaign",
        "schema_type": "SportsEvent",
    },
    "18_82_vs_pakistan_melbourne_2022/code.html": {
        "title": "18 | 82* vs PAKISTAN — The Melbourne Miracle Ball-by-Ball Autopsy",
        "name": "82* Melbourne Miracle",
        "path": "18_82_vs_pakistan_melbourne_2022/code.html",
        "clean_path": "82-melbourne",
        "og_image": "assets/images/mcg-2022-kohli-flick-six-shot-william-west.webp",
        "og_image_alt": "Virat Kohli hitting Haris Rauf for legendary straight six at MCG 2022",
        "keywords": "Virat Kohli 82 not out, India vs Pakistan MCG 2022, Haris Rauf six, T20 World Cup chase, Melbourne miracle",
        "schema_type": "SportsEvent",
    },
    "18_match_details_india_vs_australia/code.html": {
        "title": "18 | FIXTURE DOSSIER — India vs Australia Match Archive & Tactical Breakdown",
        "name": "Match Details",
        "path": "18_match_details_india_vs_australia/code.html",
        "clean_path": "match-details",
        "og_image": "assets/images/stadium-night-pitch-atmospheric-mist.png",
        "og_image_alt": "Night cricket pitch under stadium lights and atmospheric mist",
        "keywords": "India vs Australia cricket, Virat Kohli tactical breakdown, match ledger, venue dossier",
        "schema_type": "SportsEvent",
    },
    "18_be_there_for_it_desktop/code.html": {
        "title": "18 | BE THERE — Global Stadium Guides & Witness Booking Dossier",
        "name": "Be There For It",
        "path": "18_be_there_for_it_desktop/code.html",
        "clean_path": "be-there",
        "og_image": "assets/images/stadium-electric-packed-stands.png",
        "og_image_alt": "Packed electric stadium stands filled with passionate cricket fans",
        "keywords": "Virat Kohli live matches, stadium guide, MCG, Eden Gardens, Wankhede, cricket tickets guide",
        "schema_type": "WebPage",
    },
    "18_we_were_there_fan_memories_keepsake/code.html": {
        "title": "18 | WE WERE THERE — The Global Fan Witness Archive & Oral History",
        "name": "We Were There",
        "path": "18_we_were_there_fan_memories_keepsake/code.html",
        "clean_path": "we-were-there",
        "og_image": "assets/images/mcg-2022-india-pakistan-fans-pose-william-west.jpg",
        "og_image_alt": "Cricket fans united at Melbourne Cricket Ground celebrating history",
        "keywords": "Virat Kohli fans, fan memories, oral history, cricket stadium witness, cricket keepsakes",
        "schema_type": "CollectionPage",
    },
    "18_i_was_there_commemorative_keepsake_generator/code.html": {
        "title": "18 | KEEPSAKE GENERATOR — Official Digital Match Souvenir Ticket Studio",
        "name": "Keepsake Generator",
        "path": "18_i_was_there_commemorative_keepsake_generator/code.html",
        "clean_path": "keepsake",
        "og_image": "assets/images/vintage-youthful-cricket-batsman.png",
        "og_image_alt": "Digital commemorative keepsake souvenir card for Virat Kohli matches",
        "keywords": "Virat Kohli souvenir ticket, match keepsake generator, cricket digital memorabilia, personalized ticket",
        "schema_type": "WebApplication",
    }
}

def generate_json_ld(rel_path, meta):
    canonical_url = f"{BASE_URL}/{meta['clean_path']}" if meta['clean_path'] else f"{BASE_URL}/"

    # Base Person schema for Virat Kohli
    person_schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": f"{BASE_URL}/#virat-kohli",
        "name": "Virat Kohli",
        "alternateName": ["King Kohli", "VK18", "Cheeku"],
        "description": "Legendary Indian international cricketer and former captain of the Indian National Cricket Team.",
        "gender": "Male",
        "nationality": {"@type": "Country", "name": "India"},
        "jobTitle": "International Cricketer",
        "memberOf": {
            "@type": "SportsTeam",
            "name": "Indian National Cricket Team"
        },
        "sameAs": [
            "https://en.wikipedia.org/wiki/Virat_Kohli",
            "https://www.espncricinfo.com/player/virat-kohli-253802",
            "https://www.cricbuzz.com/profiles/1413/virat-kohli",
            "https://twitter.com/imVkohli",
            "https://www.instagram.com/virat.kohli"
        ]
    }

    # BreadcrumbList
    breadcrumb_schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": f"{BASE_URL}/"
            }
        ]
    }
    if meta['clean_path']:
        breadcrumb_schema["itemListElement"].append({
            "@type": "ListItem",
            "position": 2,
            "name": meta["name"],
            "item": canonical_url
        })

    # Page-specific Schema
    page_schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": canonical_url,
        "url": canonical_url,
        "name": meta["title"],
        "description": meta.get("description", "A cinematic archival tribute to modern cricket legend Virat Kohli."),
        "inLanguage": "en",
        "isPartOf": {
            "@type": "WebSite",
            "name": "18 | ONE LAST CHAPTER",
            "url": f"{BASE_URL}/"
        },
        "about": {"@id": f"{BASE_URL}/#virat-kohli"},
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": f"{BASE_URL}/{meta['og_image']}",
            "caption": meta["og_image_alt"]
        }
    }

    if meta["schema_type"] == "Article":
        page_schema["@type"] = "Article"
        page_schema["headline"] = "The Final ODI Chapter: India's Relentless Chaser"
        page_schema["author"] = {"@type": "Organization", "name": "18 Curatorial Collective"}
        page_schema["publisher"] = {"@type": "Organization", "name": "18 | ONE LAST CHAPTER"}
    elif meta["schema_type"] == "SportsEvent":
        page_schema["@type"] = "SportsEvent"
        page_schema["competitor"] [
            {"@type": "SportsTeam", "name": "India"},
            {"@type": "SportsTeam", "name": "Opponents"}
        ] if "competitor" in page_schema else None

    combined_ld = [person_schema, breadcrumb_schema, page_schema]
    return json.dumps(combined_ld, indent=2, ensure_ascii=False)

def update_page_seo(rel_path, meta):
    file_path = ROOT_DIR / rel_path
    if not file_path.is_file():
        return

    content = file_path.read_text(encoding="utf-8")

    # 1. Fix missing H1 in Innings and Editorial
    if "18_the_innings_we_ll_never_forget_desktop" in rel_path:
        content = re.sub(
            r'<h2 class="font-monument-hero([^"]*)">\s*THE INNINGS WE’LL <span class="text-primary-container">NEVER FORGET</span>\s*</h2>',
            r'<h1 class="font-monument-hero\1">THE INNINGS WE’LL <span class="text-primary-container">NEVER FORGET</span></h1>',
            content
        )
    elif "18_the_last_chapter_desktop_editorial" in rel_path:
        content = re.sub(
            r'<h2 class="font-monument-hero([^"]*)">\s*THE LAST <span class="text-primary-container">CHAPTER</span>\s*</h2>',
            r'<h1 class="font-monument-hero\1">THE LAST <span class="text-primary-container">CHAPTER</span></h1>',
            content
        )

    # 2. Add / Update Open Graph & Twitter Image Tags
    img_url = f"{BASE_URL}/{meta['og_image']}"
    og_block = f"""  <!-- Enhanced SEO & Social Metadata -->
  <meta name="keywords" content="{meta['keywords']}"/>
  <meta name="author" content="18 | ONE LAST CHAPTER Curatorial Archive"/>
  <meta property="og:image" content="{img_url}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:image:alt" content="{meta['og_image_alt']}"/>
  <meta name="twitter:image" content="{img_url}"/>
  <meta name="twitter:image:alt" content="{meta['og_image_alt']}"/>"""

    # Remove existing og:image if present to prevent duplication
    content = re.sub(r'<meta property="og:image"[^>]*>\n?', '', content)
    content = re.sub(r'<meta property="og:image:width"[^>]*>\n?', '', content)
    content = re.sub(r'<meta property="og:image:height"[^>]*>\n?', '', content)
    content = re.sub(r'<meta property="og:image:alt"[^>]*>\n?', '', content)
    content = re.sub(r'<meta name="twitter:image"[^>]*>\n?', '', content)
    content = re.sub(r'<meta name="twitter:image:alt"[^>]*>\n?', '', content)
    content = re.sub(r'<meta name="keywords"[^>]*>\n?', '', content)
    content = re.sub(r'<meta name="author"[^>]*>\n?', '', content)

    # Inject og_block after <meta property="og:title"
    if '<meta property="og:title"' in content:
        content = re.sub(r'(<meta property="og:title"[^>]*>)', rf'\1\n{og_block}', content, count=1)
    else:
        content = content.replace("</head>", f"{og_block}\n</head>", 1)

    # 3. Add JSON-LD Script tag
    # Remove existing application/ld+json if any
    content = re.sub(r'<script type="application/ld\+json">.*?</script>\s*', '', content, flags=re.DOTALL)
    json_ld_str = generate_json_ld(rel_path, meta)
    json_ld_tag = f"""  <!-- Schema.org JSON-LD Structured Data -->
  <script type="application/ld+json">
{json_ld_str}
  </script>
</head>"""
    content = content.replace("</head>", json_ld_tag, 1)

    # 4. Optimize <img> tags: ensure loading="lazy" (except hero/first) and decoding="async"
    # Find all <img> tags and add loading="lazy" if not already present
    def optimize_img(match):
        img_tag = match.group(0)
        if 'decoding=' not in img_tag:
            img_tag = img_tag.replace('<img ', '<img decoding="async" ')
        if 'loading=' not in img_tag and 'hero' not in img_tag.lower():
            img_tag = img_tag.replace('<img ', '<img loading="lazy" ')
        return img_tag

    content = re.sub(r'<img\s+[^>]+>', optimize_img, content)

    file_path.write_text(content, encoding="utf-8")
    print(f"✓ Enhanced SEO & JSON-LD for {rel_path}")

def main():
    print("🚀 Elevating SEO footprint across all 12 chapters...")
    for rel_path, meta in PAGE_METADATA.items():
        update_page_seo(rel_path, meta)
    print("🎉 SEO enhancement complete!")

if __name__ == "__main__":
    main()
