"""
generate_voice_images.py
Reads updated_data_1778009267572.json and generates a realistic portrait
for each entry using Pollinations.ai (100% FREE, no API key needed).
Images saved as voice_images/{fishModelId}.jpg
"""

import json
import os
import time
import urllib.request
import urllib.parse

# ── Config ────────────────────────────────────────────────────────────────────
JSON_FILE   = "updated_data_1778009267572.json"
OUTPUT_DIR  = "voice_images"
DELAY_SEC   = 2     # Pause between requests (be polite to free service)
WIDTH       = 512
HEIGHT      = 512

# ── Setup ─────────────────────────────────────────────────────────────────────
os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(JSON_FILE, "r") as f:
    voices = json.load(f)

total = len(voices)
print(f"Found {total} voices. Using Pollinations.ai (free, no key needed)\n")

success, skipped, failed = 0, 0, 0

for i, v in enumerate(voices):
    name        = v.get("name", "").strip()
    category    = v.get("category", "").strip()
    gender      = v.get("gender", "").strip()
    notes       = v.get("notes", "").strip()
    fish_id     = v.get("fishModelId", "").strip()

    if not fish_id:
        print(f"[{i+1}/{total}] SKIP — no fishModelId for '{name}'")
        skipped += 1
        continue

    out_path = os.path.join(OUTPUT_DIR, f"{fish_id}.jpg")
    if os.path.exists(out_path):
        print(f"[{i+1}/{total}] EXISTS — {name}")
        skipped += 1
        continue

    # Build prompt based on type
    gender_word = gender.lower() if gender else "person"

    if category in ("AI Voice",):
        prompt = (
            f"futuristic AI avatar named {name}, digital art portrait, "
            f"glowing blue neon, dark background, cinematic, 4K, ultra detailed"
        )
    elif category in ("Cartoon Character", "Anime Character"):
        prompt = (
            f"high quality digital illustration of {name}, {notes[:60]}, "
            f"vibrant colors, clean background, professional art style, detailed"
        )
    else:
        prompt = (
            f"hyper-realistic professional headshot portrait of {name}, "
            f"famous {gender_word} {category}, {notes[:80]}, "
            f"studio lighting, sharp focus, 4K photography, neutral background"
        )

    encoded_prompt = urllib.parse.quote(prompt)
    seed = abs(hash(fish_id)) % 99999
    url = (
        f"https://image.pollinations.ai/prompt/{encoded_prompt}"
        f"?width={WIDTH}&height={HEIGHT}&seed={seed}&nologo=true&model=flux"
    )

    try:
        print(f"[{i+1}/{total}] {name} ({category}) ...", end=" ", flush=True)

        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as response:
            img_bytes = response.read()

        if len(img_bytes) < 1000:
            print("✗ response too small (possibly error)")
            failed += 1
        else:
            with open(out_path, "wb") as f_out:
                f_out.write(img_bytes)
            print(f"✓ {len(img_bytes)//1024}KB saved")
            success += 1

    except Exception as e:
        print(f"✗ ERROR: {e}")
        failed += 1

    time.sleep(DELAY_SEC)

# ── Summary ───────────────────────────────────────────────────────────────────
print(f"\n{'─'*60}")
print(f"Done! ✓ Generated: {success}  ⏭ Skipped: {skipped}  ✗ Failed: {failed}")
print(f"Images saved in: ./{OUTPUT_DIR}/")
