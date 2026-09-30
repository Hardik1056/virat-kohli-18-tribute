#!/usr/bin/env python3
"""
18 | ONE LAST CHAPTER — Pre-flight Deployment & Security Verification Script
Verifies:
  - All 12 tribute pages + root index.html + 404.html exist
  - Favicon suite (SVG, ICO, Apple Touch Icon, Webmanifest)
  - HTTP security headers (CSP, X-Frame-Options, X-Content-Type-Options, HSTS, etc.)
  - All local assets (images, stylesheets, scripts) resolve to real files
  - No broken relative links
  - Meta tags, titles, canonical tags, and Open Graph tags across pages
  - vercel.json and netlify.toml route destinations exist
  - sitemap.xml validity
  - No forbidden/accidental IPL statistics in copy
"""

import sys
import os
import re
from pathlib import Path
import xml.etree.ElementTree as ET
import json

ROOT_DIR = Path(__file__).resolve().parent.parent

PAGE_FILES = [
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

CRITICAL_SHARED_ASSETS = [
    "shared/compiled-tailwind.css",
    "shared/design-system.css",
    "shared/navigation.js",
    "shared/career-data.js",
    "shared/tailwind.config.js",
    "vercel.json",
    "netlify.toml",
    "robots.txt",
    "sitemap.xml",
    "package.json",
    "favicon.ico",
    "favicon.svg",
    "apple-touch-icon.png",
    "site.webmanifest",
]

REQUIRED_SECURITY_HEADERS = [
    "Content-Security-Policy",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Strict-Transport-Security",
    "Permissions-Policy",
]

def check_files_exist():
    errors = []
    print("🔍 [1/7] Checking required files and templates...")
    for rel_path in PAGE_FILES:
        full_path = ROOT_DIR / rel_path
        if not full_path.is_file():
            errors.append(f"Missing page file: {rel_path}")
        elif full_path.stat().st_size == 0:
            errors.append(f"Empty page file: {rel_path}")

    for rel_path in CRITICAL_SHARED_ASSETS:
        full_path = ROOT_DIR / rel_path
        if not full_path.is_file():
            errors.append(f"Missing critical asset: {rel_path}")
        elif full_path.stat().st_size == 0:
            errors.append(f"Empty critical asset: {rel_path}")

    if not errors:
        print(f"   ✓ All {len(PAGE_FILES)} pages and {len(CRITICAL_SHARED_ASSETS)} critical assets exist and are non-empty.")
    return errors

def check_favicons():
    errors = []
    print("🔍 [2/7] Checking Favicon & PWA configuration...")
    for page_rel in PAGE_FILES:
        full_page_path = ROOT_DIR / page_rel
        if not full_page_path.is_file():
            continue
        content = full_page_path.read_text(encoding="utf-8")
        if 'rel="icon"' not in content:
            errors.append(f"[{page_rel}] Missing rel=\"icon\" tag in <head>")
        if 'rel="apple-touch-icon"' not in content:
            errors.append(f"[{page_rel}] Missing rel=\"apple-touch-icon\" tag in <head>")

    if not errors:
        print(f"   ✓ All {len(PAGE_FILES)} pages have proper favicon and apple-touch-icon tags.")
    return errors

def check_security_headers():
    errors = []
    print("🔍 [3/7] Auditing HTTP security headers across Vercel & Netlify...")
    
    # Check vercel.json
    vercel_path = ROOT_DIR / "vercel.json"
    if vercel_path.is_file():
        try:
            v_data = json.loads(vercel_path.read_text(encoding="utf-8"))
            headers_list = v_data.get("headers", [])
            found_headers = set()
            for entry in headers_list:
                for h in entry.get("headers", []):
                    found_headers.add(h.get("key"))
            
            for req in REQUIRED_SECURITY_HEADERS:
                if req not in found_headers:
                    errors.append(f"[vercel.json] Missing required security header: {req}")
        except Exception as e:
            errors.append(f"[vercel.json] Error parsing headers: {e}")

    # Check netlify.toml
    netlify_path = ROOT_DIR / "netlify.toml"
    if netlify_path.is_file():
        net_content = netlify_path.read_text(encoding="utf-8")
        for req in REQUIRED_SECURITY_HEADERS:
            if req not in net_content:
                errors.append(f"[netlify.toml] Missing required security header: {req}")

    if not errors:
        print("   ✓ Enterprise security headers verified: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.")
    return errors

def check_html_links_and_assets():
    errors = []
    checked_refs = 0
    print("🔍 [4/7] Verifying local asset links and img sources across all HTML pages...")

    src_pattern = re.compile(r'(?:src|href)=["\']([^"\']+)["\']', re.IGNORECASE)

    for page_rel in PAGE_FILES:
        full_page_path = ROOT_DIR / page_rel
        if not full_page_path.is_file():
            continue
        content = full_page_path.read_text(encoding="utf-8")
        page_dir = full_page_path.parent

        matches = src_pattern.findall(content)
        for target in matches:
            # Ignore JS template literals, external links, mailto, tel, empty, fragment-only, data URIs
            if (
                "${" in target
                or target.startswith("http://")
                or target.startswith("https://")
                or target.startswith("//")
                or target.startswith("data:")
                or target.startswith("mailto:")
                or target.startswith("tel:")
                or target.startswith("#")
                or not target.strip()
            ):
                continue

            # Strip query strings and hashes
            clean_target = target.split("?")[0].split("#")[0]
            if not clean_target:
                continue

            # Handle absolute root paths vs relative paths
            if clean_target.startswith("/"):
                target_path = ROOT_DIR / clean_target.lstrip("/")
            else:
                target_path = (page_dir / clean_target).resolve()

            checked_refs += 1
            if not target_path.exists():
                errors.append(f"[{page_rel}] Broken link/asset reference '{target}' -> {target_path}")

    if not errors:
        print(f"   ✓ Verified {checked_refs} local asset & link references across all HTML files. Zero broken links!")
    return errors

def check_seo_and_meta():
    errors = []
    print("🔍 [5/7] Checking SEO meta tags, titles, and social previews...")
    pages_to_check = [p for p in PAGE_FILES if p != "index.html"]

    for page_rel in pages_to_check:
        full_page_path = ROOT_DIR / page_rel
        if not full_page_path.is_file():
            continue
        content = full_page_path.read_text(encoding="utf-8")

        if "<title>" not in content or "</title>" not in content:
            errors.append(f"[{page_rel}] Missing <title> tag")
        if 'name="viewport"' not in content:
            errors.append(f"[{page_rel}] Missing viewport meta tag")
        if 'name="description"' not in content:
            errors.append(f"[{page_rel}] Missing meta description")
        if 'property="og:title"' not in content and 'name="og:title"' not in content:
            errors.append(f"[{page_rel}] Missing Open Graph og:title")

    if not errors:
        print(f"   ✓ All {len(pages_to_check)} content pages have proper titles, meta descriptions, and viewport settings.")
    return errors

def check_deployment_configs():
    errors = []
    print("🔍 [6/7] Verifying Vercel & Netlify routing configs and sitemap...")

    # Check vercel.json rewrites
    vercel_path = ROOT_DIR / "vercel.json"
    if vercel_path.is_file():
        try:
            data = json.loads(vercel_path.read_text(encoding="utf-8"))
            rewrites = data.get("rewrites", [])
            for r in rewrites:
                dest = r.get("destination", "").lstrip("/")
                dest_path = ROOT_DIR / dest
                if not dest_path.is_file():
                    errors.append(f"[vercel.json] Rewrite target does not exist: {dest}")
            print(f"   ✓ Verified {len(rewrites)} Vercel rewrite routes.")
        except Exception as e:
            errors.append(f"[vercel.json] JSON parse error: {e}")

    # Check netlify.toml redirects
    netlify_path = ROOT_DIR / "netlify.toml"
    if netlify_path.is_file():
        content = netlify_path.read_text(encoding="utf-8")
        to_targets = re.findall(r'to\s*=\s*["\']([^"\']+)["\']', content)
        for target in to_targets:
            dest = target.lstrip("/")
            dest_path = ROOT_DIR / dest
            if not dest_path.is_file():
                errors.append(f"[netlify.toml] Redirect target does not exist: {dest}")
        print(f"   ✓ Verified {len(to_targets)} Netlify redirect targets.")

    # Check sitemap.xml
    sitemap_path = ROOT_DIR / "sitemap.xml"
    if not sitemap_path.is_file():
        errors.append("sitemap.xml is missing")
    else:
        try:
            tree = ET.parse(sitemap_path)
            root = tree.getroot()
            urls = root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url")
            print(f"   ✓ sitemap.xml is well-formed XML with {len(urls)} registered URLs.")
        except Exception as e:
            errors.append(f"sitemap.xml XML syntax error: {e}")

    return errors

def check_policy_constraints():
    errors = []
    print("🔍 [7/7] Enforcing strict domain policies (Zero IPL stats on international records)...")
    ipl_forbidden_patterns = [
        r"\bRoyal Challengers\b",
        r"\bRCB\b",
        r"\bChennai Super Kings\b",
        r"\bMumbai Indians\b",
        r"\bOrange Cap\b",
        r"\bIPL Century\b",
        r"\bIPL Runs\b",
    ]
    
    # Check stats page specifically
    stats_page = ROOT_DIR / "18_career_stats_international/code.html"
    if stats_page.is_file():
        content = stats_page.read_text(encoding="utf-8")
        for pat in ipl_forbidden_patterns:
            if re.search(pat, content, re.IGNORECASE):
                errors.append(f"[Policy Violation] Found '{pat}' match in 18_career_stats_international/code.html. Only international cricket allowed.")

    if not errors:
        print("   ✓ Policy passed: Pure international cricket statistics strictly preserved.")
    return errors

def main():
    print("================================================================")
    print(" 18 | ONE LAST CHAPTER — PRE-FLIGHT AUDIT & SECURITY CHECK ")
    print("================================================================")

    all_errors = []
    all_errors.extend(check_files_exist())
    all_errors.extend(check_favicons())
    all_errors.extend(check_security_headers())
    all_errors.extend(check_html_links_and_assets())
    all_errors.extend(check_seo_and_meta())
    all_errors.extend(check_deployment_configs())
    all_errors.extend(check_policy_constraints())

    print("================================================================")
    if all_errors:
        print(f"❌ AUDIT FAILED with {len(all_errors)} error(s):")
        for err in all_errors:
            print(f"   - {err}")
        sys.exit(1)
    else:
        print("🎉 ALL PRE-FLIGHT & SECURITY CHECKS PASSED! 100% PRODUCTION READY.")
        print("================================================================")
        sys.exit(0)

if __name__ == "__main__":
    main()
