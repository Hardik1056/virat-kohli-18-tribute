#!/usr/bin/env python3
"""
Generate Google-compliant sitemap.xml with image sitemap extensions.
"""

from pathlib import Path
import xml.etree.ElementTree as ET

ROOT_DIR = Path(__file__).resolve().parent.parent
BASE_URL = "https://www.thelastdance18.online"

URL_ENTRIES = [
    {
        "loc": f"{BASE_URL}/",
        "priority": "1.0",
        "changefreq": "daily",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/world-cup-2023-portrait-bat-on-shoulder-alex-davidson.webp",
                "title": "Virat Kohli — 18 One Last Chapter Farewell Tribute"
            },
            {
                "loc": f"{BASE_URL}/assets/images/portrait-solitary-champion-batsman.png",
                "title": "Virat Kohli Cinematic Monolith Portrait"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/stats",
        "priority": "0.95",
        "changefreq": "weekly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/world-cup-2023-portrait-fist-roar-alex-davidson.jpg",
                "title": "Virat Kohli International Cricket Career Record Ledger"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/innings",
        "priority": "0.95",
        "changefreq": "weekly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/mcg-2022-kohli-flick-six-shot-william-west.webp",
                "title": "Virat Kohli 82* vs Pakistan at Melbourne Cricket Ground"
            },
            {
                "loc": f"{BASE_URL}/assets/images/wankhede-2023-century-50-bat-raised-punit-paranjpe.webp",
                "title": "Virat Kohli 50th ODI Century at Wankhede Stadium 2023"
            },
            {
                "loc": f"{BASE_URL}/assets/images/eden-gardens-2023-century-49-celebration-surjeet-yadav.webp",
                "title": "Virat Kohli 49th ODI Century at Eden Gardens 2023"
            },
            {
                "loc": f"{BASE_URL}/assets/images/dhaka-2012-kohli-183-bat-raised-roar.jpg",
                "title": "Virat Kohli 183 vs Pakistan at Dhaka Asia Cup 2012"
            },
            {
                "loc": f"{BASE_URL}/assets/images/mohali-2016-australia-82-finger-to-sky.jpeg",
                "title": "Virat Kohli 82* vs Australia at Mohali T20 World Cup 2016"
            },
            {
                "loc": f"{BASE_URL}/assets/images/edgbaston-2018-kohli-149-roar-celebration.jpg",
                "title": "Virat Kohli 149 vs England at Edgbaston 2018"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/editorial",
        "priority": "0.85",
        "changefreq": "monthly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/solitary-batsman-tunnel-walk.png",
                "title": "The Last Chapter — India Relentless Chaser Retrospective"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/journey",
        "priority": "0.85",
        "changefreq": "monthly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/delhi-airport-2008-u19-world-cup-trophy-arrival-timescontent.webp",
                "title": "Virat Kohli 2008 U19 World Cup Victory Arrival"
            },
            {
                "loc": f"{BASE_URL}/assets/images/kuala-lumpur-2008-u19-world-cup-trophy-petronas-towers-icc-getty.jpg",
                "title": "Virat Kohli U19 Trophy with Petronas Towers"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/remaining-odis",
        "priority": "0.90",
        "changefreq": "daily",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/stadium-passionate-crowd-floodlights.png",
                "title": "Remaining India ODI Fixtures & 100 Centuries Countdown"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/world-cup-2027",
        "priority": "0.85",
        "changefreq": "weekly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/stadium-colossal-arena-panoramic.png",
                "title": "ICC World Cup 2027 Africa Campaign"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/82-melbourne",
        "priority": "0.90",
        "changefreq": "monthly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/mcg-2022-kohli-prayer-finger-to-sky-martin-keep.webp",
                "title": "Virat Kohli Prayer Finger to Sky MCG 2022"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/match-details",
        "priority": "0.75",
        "changefreq": "weekly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/stadium-night-pitch-atmospheric-mist.png",
                "title": "India vs Australia Fixture Dossier"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/be-there",
        "priority": "0.75",
        "changefreq": "monthly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/stadium-electric-packed-stands.png",
                "title": "Be There — Stadium Dossiers & Witness Guide"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/we-were-there",
        "priority": "0.75",
        "changefreq": "monthly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/mcg-2022-india-pakistan-fans-pose-william-west.jpg",
                "title": "We Were There — Global Fan Memories Archive"
            }
        ]
    },
    {
        "loc": f"{BASE_URL}/keepsake",
        "priority": "0.80",
        "changefreq": "monthly",
        "images": [
            {
                "loc": f"{BASE_URL}/assets/images/vintage-youthful-cricket-batsman.png",
                "title": "Virat Kohli Commemorative Keepsake Ticket Generator"
            }
        ]
    }
]

from xml.sax.saxutils import escape

def generate_sitemap():
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ]

    for item in URL_ENTRIES:
        xml_lines.append("  <url>")
        xml_lines.append(f"    <loc>{escape(item['loc'])}</loc>")
        xml_lines.append("    <lastmod>2026-09-30</lastmod>")
        xml_lines.append(f"    <changefreq>{item['changefreq']}</changefreq>")
        xml_lines.append(f"    <priority>{item['priority']}</priority>")
        for img in item.get("images", []):
            xml_lines.append("    <image:image>")
            xml_lines.append(f"      <image:loc>{escape(img['loc'])}</image:loc>")
            xml_lines.append(f"      <image:title>{escape(img['title'])}</image:title>")
            xml_lines.append("    </image:image>")
        xml_lines.append("  </url>")

    xml_lines.append("</urlset>\n")
    sitemap_content = "\n".join(xml_lines)

    (ROOT_DIR / "sitemap.xml").write_text(sitemap_content, encoding="utf-8")
    print(f"✓ Generated high-ranking Google Image sitemap.xml with {len(URL_ENTRIES)} registered canonical endpoints.")

if __name__ == "__main__":
    generate_sitemap()
