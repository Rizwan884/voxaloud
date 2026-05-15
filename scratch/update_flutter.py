import os

filepath = "/Users/rizwanrashid/Documents/ai_fish_voice_clone_tts/lib/core/services/fish_audio_service.dart"

with open(filepath, 'r') as f:
    content = f.read()

# Replace getVoices and getCelebrityVoices
old_pattern = """      if (res.statusCode == 200) {
        final List data = jsonDecode(res.body);
        return data.map((v) => VoiceModel.fromJson(v)).toList();
      }"""

new_pattern = """      if (res.statusCode == 200) {
        final Map<String, dynamic> responseData = jsonDecode(res.body);
        final List data = responseData['data'] ?? [];
        return data.map((v) => VoiceModel.fromJson(v)).toList();
      }"""

content = content.replace(old_pattern, new_pattern)

# Replace getVoiceCategories
old_cat = """      if (res.statusCode == 200) {
        final List data = jsonDecode(res.body);
        return data.map((e) => e.toString()).toList();
      }"""

new_cat = """      if (res.statusCode == 200) {
        final Map<String, dynamic> responseData = jsonDecode(res.body);
        final List data = responseData['data'] ?? [];
        return data.map((e) => e.toString()).toList();
      }"""

content = content.replace(old_cat, new_cat)

# Replace speechToText
old_stt = """      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        return data['text'];
      }"""

new_stt = """      final responseData = jsonDecode(res.body);
      if (res.statusCode == 200 && responseData['success'] == true) {
        return responseData['data']['text'];
      }"""

content = content.replace(old_stt, new_stt)

# Replace cloneVoice
old_clone = """      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        return data['_id'] ?? data['id'];
      }"""

new_clone = """      final responseData = jsonDecode(res.body);
      if (res.statusCode == 200 && responseData['success'] == true) {
        final data = responseData['data'];
        return data['_id'] ?? data['id'];
      }"""

content = content.replace(old_clone, new_clone)

# Standardize Errors for generateSpeech, convertVoice, mergeAudioSegments
content = content.replace(
    "      final err = jsonDecode(res.body);\n      throw Exception('Engine Error: ${err['error'] ?? 'Unknown'}');",
    "      final responseData = jsonDecode(res.body);\n      throw Exception('Engine Error: ${responseData['error'] ?? 'Unknown'}');"
)

with open(filepath, 'w') as f:
    f.write(content)
