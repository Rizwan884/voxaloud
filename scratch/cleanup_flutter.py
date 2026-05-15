import os
import re

filepath = "/Users/rizwanrashid/Documents/ai_fish_voice_clone_tts/lib/core/services/fish_audio_service.dart"

with open(filepath, 'r') as f:
    lines = f.readlines()

new_lines = []
skip_mode = False

# 1. Simplify Headers
header_start = -1
header_end = -1
for i, line in enumerate(lines):
    if "static const Map<String, String> _commonHeaders =" in line:
        header_start = i
    if header_start != -1 and "};" in line and header_end == -1:
        header_end = i

if header_start != -1 and header_end != -1:
    lines[header_start:header_end+1] = [
        "  static const Map<String, String> _commonHeaders = {\n",
        "    'User-Agent': 'Voxaloud-Mobile-App/2.0.0',\n",
        "    'Content-Type': 'application/json',\n",
        "  };\n"
    ]

# 2. Remove useDummyData and Dummy logic
final_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    
    # Remove useDummyData definition
    if "static const bool useDummyData =" in line:
        i += 1
        continue
        
    # Remove dummyVoices definition
    if "static final List<VoiceModel> dummyVoices =" in line:
        # Skip until the end of the list
        while "];" not in lines[i]:
            i += 1
        i += 1
        continue

    # Remove getDummyLibrary
    if "static List<AudioModel> getDummyLibrary()" in line:
        i += 1
        continue

    # Remove if (useDummyData) blocks
    if "if (useDummyData)" in line:
        # Skip the block
        brace_count = 0
        while i < len(lines):
            brace_count += lines[i].count('{')
            brace_count -= lines[i].count('}')
            i += 1
            if brace_count == 0:
                break
        continue

    # Clean up Exception messages
    line = line.replace("Vercel Security Blocked: Request flagged as bot.", "Backend Security Error: Invalid request parameters or key.")
    line = line.replace("Vercel Blocked Voices Fetch", "Backend Error: Could not fetch voices")
    line = line.replace("Vercel Blocked Celebrity Fetch", "Backend Error: Could not fetch celebrity voices")
    line = line.replace("Vercel Blocked Categories Fetch", "Backend Error: Could not fetch categories")

    # Fix return dummyVoices fallbacks
    if "return dummyVoices;" in line:
        if "getVoices" in "".join(lines[max(0, i-20):i]):
            line = line.replace("return dummyVoices;", "return [];")
        else:
            line = line.replace("return dummyVoices;", "return [];")

    final_lines.append(line)
    i += 1

# Remove redundant Content-Type headers since it's now in _commonHeaders
content = "".join(final_lines)
content = content.replace("'Content-Type': 'application/json',", "")
# Fix double commas or empty maps resulting from the above
content = content.replace(",\n            },", "\n            },")
content = content.replace(",\n        },", "\n        },")

with open(filepath, 'w') as f:
    f.write(content)
