#!/usr/bin/env python3
"""
scripts/fix-seo-titles.py
Fixes all page title tags, canonical URLs, meta descriptions, and keywords
to lead with "Virat Kohli" for better search engine indexing.
"""
from pathlib import Path
import re

ROOT_DIR = Path(__file__).resolve().parent.parent
BASE_URL = "https://www.thelastdance18.online"

PAGES = {
    "18_career_stats_international/code.html": {
        "title": "Virat Kohli Career Statistics — All International Records, 86 Centuries &amp; ODI Averages",
        "canonical": f"{BASE_URL}/stats",
        "description": "Virat Kohli's complete international career statistics: 86 centuries across all formats, ODI batting average, Test records, T20I stats, and milestones. The definitive official ledger.",
        "keywords": "Virat Kohli stats, Virat Kohli centuries, Virat Kohli ODI average, Virat Kohli Test records, Virat Kohli career statistics, King Kohli records, 86 hundreds cricket, Indian cricket records",
        "og_title": "Virat Kohli Career Statistics — All International Records &amp; 86 Centuries",
    },
    "18_the_journey_horizontal_documentary_timeline/code.html": {
        "title": "Virat Kohli Career Journey — 2008 U-19 World Cup to 2024 T20 Champion | Documentary Timeline",
        "canonical": f"{BASE_URL}/journey",
        "description": "Follow Virat Kohli's extraordinary career journey from the 2008 U-19 World Cup triumph to the 2024 T20 World Cup victory. A chronological documentary archive spanning 16 years of cricket history.",
        "keywords": "Virat Kohli career timeline, Virat Kohli 2008 U-19 World Cup, Virat Kohli captaincy, Virat Kohli 2011 World Cup, Virat Kohli 2023 World Cup, Virat Kohli 2024 T20 champion, Indian cricket history",
        "og_title": "Virat Kohli Career Journey Timeline — 2008 to 2024",
    },
    "18_the_innings_we_ll_never_forget_desktop/code.html": {
        "title": "Virat Kohli's Greatest Innings — 82* MCG, 183 Dhaka, 149 Edgbaston &amp; More",
        "canonical": f"{BASE_URL}/innings",
        "description": "Relive Virat Kohli's most iconic innings: 82* vs Pakistan at MCG 2022, 183 vs Pakistan at Dhaka 2012, 149 vs England at Edgbaston 2018, and his historic 50th ODI century at Wankhede.",
        "keywords": "Virat Kohli best innings, Virat Kohli 82 vs Pakistan MCG, Virat Kohli 183 Dhaka, Virat Kohli 149 Edgbaston, Virat Kohli 50th century Wankhede, Virat Kohli iconic knocks, greatest cricket innings",
        "og_title": "Virat Kohli's Greatest Innings — 82* MCG, 183 Dhaka &amp; More",
    },
    "18_the_last_ones_remaining_odis/code.html": {
        "title": "Virat Kohli Remaining ODIs — 2027 World Cup Schedule &amp; 100 Centuries Countdown",
        "canonical": f"{BASE_URL}/remaining-odis",
        "description": "Track Virat Kohli's remaining ODI fixtures on the road to 100 centuries (currently 86/100) and the 2027 ICC Cricket World Cup in South Africa, Zimbabwe and Namibia.",
        "keywords": "Virat Kohli remaining ODIs, Virat Kohli 2027 World Cup schedule, India ODI fixtures 2025 2026, Virat Kohli 100 centuries countdown, India cricket schedule, ODI series India",
        "og_title": "Virat Kohli Remaining ODIs — Schedule &amp; 100 Centuries Countdown",
    },
    "18_world_cup_2027_destination/code.html": {
        "title": "Virat Kohli 2027 ICC Cricket World Cup — India's Campaign in South Africa &amp; Africa",
        "canonical": f"{BASE_URL}/world-cup-2027",
        "description": "Virat Kohli's final chance at a second ODI World Cup title. India's campaign at the 2027 ICC Cricket World Cup across South Africa, Zimbabwe, and Namibia — venues, fixtures, and the road to glory.",
        "keywords": "ICC Cricket World Cup 2027, Virat Kohli World Cup 2027, India World Cup 2027, South Africa Zimbabwe Namibia cricket, ICC 2027 schedule, Virat Kohli ODI World Cup, India cricket 2027",
        "og_title": "Virat Kohli — 2027 ICC Cricket World Cup | India's Final Campaign",
    },
    "18_82_vs_pakistan_melbourne_2022/code.html": {
        "title": "Virat Kohli 82* vs Pakistan MCG 2022 — T20 World Cup Miracle Chase Ball-by-Ball",
        "canonical": f"{BASE_URL}/82-melbourne",
        "description": "The full ball-by-ball story of Virat Kohli's legendary 82* vs Pakistan at the Melbourne Cricket Ground in the T20 World Cup 2022 — the greatest T20 chase in cricket history.",
        "keywords": "Virat Kohli 82 not out, India vs Pakistan MCG 2022, T20 World Cup 2022 India Pakistan, Haris Rauf six Virat Kohli, Melbourne Cricket Ground 2022, greatest T20 chase cricket",
        "og_title": "Virat Kohli 82* vs Pakistan MCG 2022 — The T20 World Cup Miracle",
    },
    "18_the_last_chapter_desktop_editorial/code.html": {
        "title": "Virat Kohli — The Final ODI Chapter | Chase Master's Farewell Retrospective",
        "canonical": f"{BASE_URL}/editorial",
        "description": "An archival editorial retrospective on Virat Kohli — the greatest chase master in ODI history — as he navigates his final chapter in international cricket. Essays, analysis, and reflection.",
        "keywords": "Virat Kohli editorial, Virat Kohli chase master, Virat Kohli ODI farewell, greatest ODI batsman, Virat Kohli legacy, India cricket retrospective, Virat Kohli career essay",
        "og_title": "Virat Kohli — The Final ODI Chapter | Chase Master Retrospective",
    },
    "18_match_details_india_vs_australia/code.html": {
        "title": "Virat Kohli vs Australia — Match Archive, Stats &amp; Tactical Breakdown",
        "canonical": f"{BASE_URL}/match-details",
        "description": "Complete archive of Virat Kohli's performances against Australia: match-by-match stats, key innings, and tactical breakdown of his record-breaking rivalry.",
        "keywords": "Virat Kohli vs Australia, India vs Australia ODI, Virat Kohli Australia stats, India Australia cricket 2025, Virat Kohli match archive",
        "og_title": "Virat Kohli vs Australia — Match Archive &amp; Stats",
    },
    "18_be_there_for_it_desktop/code.html": {
        "title": "Watch Virat Kohli Live — Stadium Guide, Fixtures &amp; Ticket Info",
        "canonical": f"{BASE_URL}/be-there",
        "description": "Your guide to watching Virat Kohli play live — upcoming fixtures at Eden Gardens, Wankhede, MCG, and other iconic venues. Stadium guides, atmosphere tips, and how to be there for history.",
        "keywords": "Watch Virat Kohli live, Virat Kohli upcoming matches, India cricket tickets, Eden Gardens cricket, Wankhede Stadium, MCG cricket, Virat Kohli live stadium",
        "og_title": "Watch Virat Kohli Live — Stadium Guide &amp; Fixture Info",
    },
    "18_we_were_there_fan_memories_keepsake/code.html": {
        "title": "Virat Kohli Fan Memories — We Were There | Global Witness Archive",
        "canonical": f"{BASE_URL}/we-were-there",
        "description": "Fans share their memories of witnessing Virat Kohli's greatest moments live. A global archive of oral histories from cricket fans who were there — MCG, Wankhede, Eden Gardens, and beyond.",
        "keywords": "Virat Kohli fan memories, watching Virat Kohli live, MCG 2022 India Pakistan fans, cricket fan stories, Virat Kohli fans, oral history cricket",
        "og_title": "Virat Kohli Fan Memories — We Were There Archive",
    },
    "18_i_was_there_commemorative_keepsake_generator/code.html": {
        "title": "Virat Kohli Match Keepsake Generator — Create Your Digital Match Souvenir",
        "canonical": f"{BASE_URL}/keepsake",
        "description": "Create a personalized digital match souvenir from any Virat Kohli match you attended. Generate your commemorative ticket, share your memory, and celebrate being part of history.",
        "keywords": "Virat Kohli match souvenir, cricket keepsake generator, digital match ticket, Virat Kohli memorabilia, I was there cricket, personalized cricket ticket",
        "og_title": "Virat Kohli Match Keepsake — Create Your Digital Souvenir",
    },
}

def update_page(rel_path, meta):
    file_path = ROOT_DIR / rel_path
    if not file_path.is_file():
        print(f"  ✗ Not found: {rel_path}")
        return

    content = file_path.read_text(encoding="utf-8")
    original = content

    # 1. Fix <title>
    content = re.sub(
        r'<title>[^<]*</title>',
        f'<title>{meta["title"]}</title>',
        content,
        count=1
    )

    # 2. Fix canonical URL
    content = re.sub(
        r'<link rel="canonical" href="[^"]*"/>',
        f'<link rel="canonical" href="{meta["canonical"]}"/>',
        content,
        count=1
    )

    # 3. Fix meta description
    content = re.sub(
        r'<meta name="description" content="[^"]*"/>',
        f'<meta name="description" content="{meta["description"]}"/>',
        content,
        count=1
    )

    # 4. Fix og:description
    content = re.sub(
        r'<meta property="og:description" content="[^"]*"/>',
        f'<meta property="og:description" content="{meta["description"]}"/>',
        content,
        count=1
    )

    # 5. Fix og:title
    content = re.sub(
        r'<meta property="og:title" content="[^"]*"/>',
        f'<meta property="og:title" content="{meta["og_title"]}"/>',
        content,
        count=1
    )

    # 6. Fix twitter:title
    content = re.sub(
        r'<meta name="twitter:title" content="[^"]*"/>',
        f'<meta name="twitter:title" content="{meta["og_title"]}"/>',
        content,
        count=1
    )

    # 7. Fix twitter:description
    content = re.sub(
        r'<meta name="twitter:description" content="[^"]*"/>',
        f'<meta name="twitter:description" content="{meta["description"]}"/>',
        content,
        count=1
    )

    # 8. Fix og:url
    content = re.sub(
        r'<meta property="og:url" content="[^"]*"/>',
        f'<meta property="og:url" content="{meta["canonical"]}"/>',
        content,
        count=1
    )

    # 9. Fix meta keywords
    content = re.sub(
        r'<meta name="keywords" content="[^"]*"/>',
        f'<meta name="keywords" content="{meta["keywords"]}"/>',
        content,
        count=1
    )

    # 10. Ensure robots tag exists
    if '<meta name="robots"' not in content:
        content = content.replace(
            '<link rel="canonical"',
            '<meta name="robots" content="index, follow"/>\n  <link rel="canonical"',
            1
        )

    if content != original:
        file_path.write_text(content, encoding="utf-8")
        print(f"  ✓ Updated: {rel_path}")
    else:
        print(f"  ~ No changes: {rel_path}")

def main():
    print("🚀 Fixing SEO titles, canonicals, descriptions across all pages...")
    for rel_path, meta in PAGES.items():
        update_page(rel_path, meta)
    print("✅ Done! All pages updated.")

if __name__ == "__main__":
    main()
