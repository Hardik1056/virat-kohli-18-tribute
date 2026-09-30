#!/usr/bin/env python3
"""
Inject favicon and PWA meta tags into all HTML files across the project.
"""

from pathlib import Path
import re

ROOT_DIR = Path(__file__).resolve().parent.parent

HTML_FILES = [
    "index.html",
    "404.html",
    "18_one_last_chapter_hero/code.html",
    "18_career_stats_international/code.html",
    "18_the_last_chapter_desktop_editorial/code.html",
    "18_the_journey_horizontal_documentary_timeline/code.html",
    "18_the_innings_we_ll_never_forget_desktop/code.html",
    "18_the_last_ones_remaining_odis/code.html",
    "18_world_cup_2027_destination/code.html",
    "18_82_vs_pakistan_melbourne_2022/code.html",
    "18_match_details_india_vs_australia/code.html",
    "18_be_there_for_it_desktop/code.html",
    "18_we_were_there_fan_memories_keepsake/code.html",
    "18_i_was_there_commemorative_keepsake_generator/code.html",
]

def make_favicon_tags(prefix: str) -> str:
    return f"""  <link rel="icon" type="image/svg+xml" href="{prefix}favicon.svg"/>
  <link rel="icon" type="image/png" sizes="32x32" href="{prefix}favicon-32x32.png"/>
  <link rel="icon" type="image/png" sizes="16x16" href="{prefix}favicon-16x16.png"/>
  <link rel="apple-touch-icon" sizes="180x180" href="{prefix}apple-touch-icon.png"/>
  <link rel="manifest" href="{prefix}site.webmanifest"/>
  <meta name="theme-color" content="#0a0a0a"/>"""

def inject():
    for rel_path in HTML_FILES:
        file_path = ROOT_DIR / rel_path
        if not file_path.is_file():
            print(f"Skipping missing file: {rel_path}")
            continue

        content = file_path.read_text(encoding="utf-8")
        
        # Don't duplicate if already injected
        if 'rel="icon"' in content:
            print(f"Favicon already present in {rel_path}, skipping.")
            continue

        prefix = "./" if "/" not in rel_path else "../"
        tags = make_favicon_tags(prefix)

        # Inject after </title> or before </head>
        if "</title>" in content:
            content = content.replace("</title>", f"</title>\n{tags}", 1)
        elif "<head>" in content:
            content = content.replace("<head>", f"<head>\n{tags}", 1)
        elif "<head " in content:
            content = re.sub(r'(<head[^>]*>)', rf'\1\n{tags}', content, count=1)
        else:
            print(f"Warning: could not locate head in {rel_path}")
            continue

        file_path.write_text(content, encoding="utf-8")
        print(f"✓ Injected favicon suite into {rel_path}")

if __name__ == "__main__":
    inject()
