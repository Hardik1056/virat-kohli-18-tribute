#!/usr/bin/env python3
"""
Generate bespoke Obsidian & Gold '18' favicon suite:
  - favicon.svg
  - favicon.ico (16, 32, 48)
  - apple-touch-icon.png (180x180)
  - favicon-32x32.png
  - favicon-16x16.png
  - assets/icons/icon-192.png
  - assets/icons/icon-512.png
"""

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT_DIR = Path(__file__).resolve().parent.parent

SVG_CONTENT = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#080809"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff2be"/>
      <stop offset="45%" stop-color="#d4af37"/>
      <stop offset="100%" stop-color="#997a15"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e5c158" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#735b22" stop-opacity="0.3"/>
    </linearGradient>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="16" flood-color="#d4af37" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Background squircle -->
  <rect x="24" y="24" width="464" height="464" rx="112" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="14"/>

  <!-- Inner accent ring -->
  <circle cx="256" cy="256" r="204" fill="none" stroke="#d4af37" stroke-opacity="0.22" stroke-width="3" stroke-dasharray="8 8"/>

  <!-- Iconic '18' Monogram -->
  <g filter="url(#goldGlow)">
    <text x="256" y="332"
          font-family="Georgia, 'Times New Roman', 'Playfair Display', serif"
          font-size="248"
          font-weight="900"
          letter-spacing="-8"
          fill="url(#goldGrad)"
          text-anchor="middle">18</text>
  </g>

  <!-- Crown star accent -->
  <path d="M 256 82 L 264 104 L 287 104 L 268 118 L 275 140 L 256 126 L 237 140 L 244 118 L 225 104 L 248 104 Z" fill="#fff2be" opacity="0.95"/>
</svg>
"""

def render_bitmap_icon(size=512):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw rounded squircle
    margin = int(size * 0.05)
    corner_radius = int(size * 0.22)
    border_width = max(2, int(size * 0.03))

    # Background rect
    draw.rounded_rectangle(
        [(margin, margin), (size - margin, size - margin)],
        radius=corner_radius,
        fill=(14, 14, 16, 255),
        outline=(212, 175, 55, 220),
        width=border_width
    )

    # Inner circular ring
    ring_margin = int(size * 0.12)
    draw.ellipse(
        [(ring_margin, ring_margin), (size - ring_margin, size - ring_margin)],
        outline=(212, 175, 55, 50),
        width=max(1, int(size * 0.008))
    )

    # Star accent
    star_y = int(size * 0.19)
    star_r = int(size * 0.04)
    cx = size // 2
    draw.polygon([
        (cx, star_y - star_r),
        (cx + int(star_r * 0.4), star_y - int(star_r * 0.3)),
        (cx + star_r, star_y),
        (cx + int(star_r * 0.4), star_y + int(star_r * 0.3)),
        (cx, star_y + star_r),
        (cx - int(star_r * 0.4), star_y + int(star_r * 0.3)),
        (cx - star_r, star_y),
        (cx - int(star_r * 0.4), star_y - int(star_r * 0.3)),
    ], fill=(255, 242, 190, 240))

    # Draw text '18'
    # Try system fonts: Georgia or Times New Roman
    font_size = int(size * 0.48)
    font = None
    font_paths = [
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf",
        "/Library/Fonts/Georgia.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                font = ImageFont.truetype(p, font_size)
                break
            except Exception:
                continue

    if font is None:
        font = ImageFont.load_default()

    text = "18"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    tx = (size - tw) // 2 - bbox[0]
    ty = int(size * 0.58) - (th // 2) - bbox[1]

    # Draw text glow/shadow
    shadow_offset = max(1, int(size * 0.015))
    draw.text((tx, ty + shadow_offset), text, font=font, fill=(0, 0, 0, 180))
    # Main gold text
    draw.text((tx, ty), text, font=font, fill=(212, 175, 55, 255))

    return img

def main():
    icons_dir = ROOT_DIR / "assets" / "icons"
    icons_dir.mkdir(parents=True, exist_ok=True)

    # 1. Write SVG to root and assets/
    svg_root = ROOT_DIR / "favicon.svg"
    svg_assets = ROOT_DIR / "assets" / "favicon.svg"
    svg_root.write_text(SVG_CONTENT, encoding="utf-8")
    svg_assets.write_text(SVG_CONTENT, encoding="utf-8")
    print(f"✓ Saved {svg_root} and {svg_assets}")

    # 2. Render base high-res bitmap (1024x1024)
    base_img = render_bitmap_icon(1024)

    # 3. Apple Touch Icon (180x180)
    apple_icon = base_img.resize((180, 180), Image.Resampling.LANCZOS)
    apple_icon.save(ROOT_DIR / "apple-touch-icon.png", "PNG")
    apple_icon.save(icons_dir / "apple-touch-icon.png", "PNG")
    print("✓ Saved apple-touch-icon.png (180x180)")

    # 4. Standard PNG Favicons (32x32, 16x16)
    fav_32 = base_img.resize((32, 32), Image.Resampling.LANCZOS)
    fav_32.save(ROOT_DIR / "favicon-32x32.png", "PNG")
    fav_32.save(icons_dir / "favicon-32x32.png", "PNG")

    fav_16 = base_img.resize((16, 16), Image.Resampling.LANCZOS)
    fav_16.save(ROOT_DIR / "favicon-16x16.png", "PNG")
    fav_16.save(icons_dir / "favicon-16x16.png", "PNG")
    print("✓ Saved favicon-32x32.png and favicon-16x16.png")

    # 5. PWA Icons (192x192, 512x512)
    icon_192 = base_img.resize((192, 192), Image.Resampling.LANCZOS)
    icon_192.save(icons_dir / "icon-192.png", "PNG")

    icon_512 = base_img.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save(icons_dir / "icon-512.png", "PNG")
    print("✓ Saved PWA icons (192 & 512)")

    # 6. Multi-resolution favicon.ico
    fav_48 = base_img.resize((48, 48), Image.Resampling.LANCZOS)
    base_img.save(
        ROOT_DIR / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    base_img.save(
        icons_dir / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("✓ Saved multi-resolution favicon.ico (16, 32, 48)")

    # 7. Write site.webmanifest
    manifest = """{
  "name": "18 | ONE LAST CHAPTER",
  "short_name": "18 Virat Kohli",
  "description": "Cinematic Archival Retrospective for Virat Kohli",
  "icons": [
    {
      "src": "/assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#0a0a0a",
  "background_color": "#0a0a0a",
  "display": "standalone",
  "start_url": "/"
}
"""
    (ROOT_DIR / "site.webmanifest").write_text(manifest, encoding="utf-8")
    print("✓ Saved site.webmanifest")

if __name__ == "__main__":
    main()
