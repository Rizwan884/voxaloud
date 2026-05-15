import os

filepath = "/Users/rizwanrashid/Documents/ai_fish_voice_clone_tts/lib/core/services/fish_audio_service.dart"

with open(filepath, 'r') as f:
    content = f.read()

# 1. Clean _commonHeaders
content = content.replace(
    "  static const Map<String, String> _commonHeaders = {\n    'User-Agent': 'Voxaloud-Mobile-App/2.0.0',\n    'Content-Type': 'application/json',\n  };",
    "  static const Map<String, String> _commonHeaders = {\n    'User-Agent': 'Voxaloud-Mobile-App/2.0.0',\n  };"
)

# 2. Add Content-Type specifically to JSON POST methods
methods_to_fix = [
    "generateSpeech",
    "getVoices",
    "getCelebrityVoices",
    "getVoiceCategories"
]

for method in methods_to_fix:
    # Look for the headers block in each method and add Content-Type back
    # We target the specific pattern ..._commonHeaders, 'x-api-key': _gatewayKey,
    content = content.replace(
        "..._commonHeaders,\n              'x-api-key': _gatewayKey,\n            },",
        "..._commonHeaders,\n              'x-api-key': _gatewayKey,\n              'Content-Type': 'application/json',\n            },"
    )
    content = content.replace(
        "..._commonHeaders,\n          'x-api-key': _gatewayKey,\n        },",
        "..._commonHeaders,\n          'x-api-key': _gatewayKey,\n          'Content-Type': 'application/json',\n        },"
    )

with open(filepath, 'w') as f:
    f.write(content)
