#!/usr/bin/env python3
import os
import re

GA_TAG = """  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-X42Q4J24LP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-X42Q4J24LP');
  </script>"""

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

html_files = []
for root, dirs, files in os.walk(BASE_DIR):
    if "node_modules" in root or ".git" in root:
        continue
    for file in files:
        if file.endswith(".html"):
            html_files.append(os.path.join(root, file))

modified_count = 0
for file_path in sorted(html_files):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if "G-X42Q4J24LP" in content:
        print(f"Skipping (already present): {os.path.relpath(file_path, BASE_DIR)}")
        continue

    # Insert right after <head> or <head ...>
    head_match = re.search(r"<head[^>]*>", content, re.IGNORECASE)
    if head_match:
        pos = head_match.end()
        new_content = content[:pos] + "\n" + GA_TAG + content[pos:]
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        modified_count += 1
        print(f"Injected into: {os.path.relpath(file_path, BASE_DIR)}")
    else:
        print(f"Warning: No <head> found in {os.path.relpath(file_path, BASE_DIR)}")

print(f"\nSuccessfully injected GA4 tag into {modified_count} HTML files.")
