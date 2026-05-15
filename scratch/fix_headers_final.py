import os

filepath = "/Users/rizwanrashid/Documents/ai_fish_voice_clone_tts/lib/core/services/fish_audio_service.dart"

with open(filepath, 'r') as f:
    content = f.read()

# 1. Restore Content-Type in _commonHeaders
content = content.replace(
    "  static const Map<String, String> _commonHeaders = {\n    'User-Agent': 'Voxaloud-Mobile-App/2.0.0',\n  };",
    "  static const Map<String, String> _commonHeaders = {\n    'User-Agent': 'Voxaloud-Mobile-App/2.0.0',\n    'Content-Type': 'application/json',\n  };"
)

# 2. In all MultipartRequest methods, remove Content-Type after addAll
# These methods are: instantSpeechSynthesis, cloneVoice, mergeAudioSegments, speechToText, convertVoice
multipart_patterns = [
    "req.headers.addAll(_commonHeaders);\n      req.headers['x-api-key'] = _gatewayKey;",
    "req.headers.addAll(_commonHeaders);\n      req.headers['x-api-key'] = _gatewayKey;" # Repeat for safety if any vary
]

content = content.replace(
    "req.headers.addAll(_commonHeaders);\n      req.headers['x-api-key'] = _gatewayKey;",
    "req.headers.addAll(_commonHeaders);\n      req.headers.remove('Content-Type'); // Let Multipart handle its own boundary\n      req.headers['x-api-key'] = _gatewayKey;"
)

with open(filepath, 'w') as f:
    f.write(content)
