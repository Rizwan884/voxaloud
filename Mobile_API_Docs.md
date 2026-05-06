# Mobile API Integration Guide (V1)

This documentation describes the interface for the backend bridge to the high-performance audio engine.

## Base Configuration

- **Endpoint URL**: `https://voxaloud.shaaddev.studio/api/external/remote-engine-v1`
- **Method**: `POST` (Both JSON and Multipart/Form-Data are supported)
- **Authentication Header**: `X-Gateway-Key` (Your secure secret)

## Operations Overview

The `op` field in the request body determines the action.

| Operation (`op`) | Description | Data Source |
| :--- | :--- | :--- |
| `fetch_ai_voices` | Fetch all AI Voices (TTS) | Local JSON |
| `fetch_celebrity_voices` | Fetch all Celebrity/Politician voices | Local JSON |
| `fetch_voice_categories` | Fetch unique categories (non-AI) | Local JSON |
| `process_task` | Synthesize text into audio | Fish Audio API |
| `commit_new_entry` | Create/Clone a new voice resource | Fish Audio API |
| `merge_audio_segments` | Join multiple audio files (Local or URLs) | Proxy Server |

---

## 1. Fetch AI Voices (`fetch_ai_voices`)
Returns a list of voices categorized as "AI Voice".

**Request Body:**
```json
{
  "op": "fetch_ai_voices",
  "client_ref": "YOUR_APP_ID"
}
```

---

## 2. Fetch Celebrity Voices (`fetch_celebrity_voices`)
Returns all voices *except* those categorized as "AI Voice".

**Request Body:**
```json
{
  "op": "fetch_celebrity_voices",
  "client_ref": "YOUR_APP_ID"
}
```

---

## 3. Fetch Voice Categories (`fetch_voice_categories`)
Returns a unique list of all categories present in the voice data (excluding "AI Voice").

**Request Body:**
```json
{
  "op": "fetch_voice_categories",
  "client_ref": "YOUR_APP_ID"
}
```

---

## 4. Synthesize Audio (`process_task`)
Generates an MP3 stream using Fish Audio. Supports `temperature`, `top_p`, `speed`, and `volume`.

**Request Body:**
```json
{
  "op": "process_task",
  "client_ref": "YOUR_APP_ID",
  "text": "Hello world",
  "voice_id": "FISH_MODEL_ID_HERE",
  "format": "mp3"
}
```

---

## 5. Create Voice Clone (`commit_new_entry`)
Create a new cloned voice resource.

**Request Body:**
```json
{
  "op": "commit_new_entry",
  "client_ref": "YOUR_APP_ID",
  "title": "Voice Name",
  "voices": ["URL_TO_AUDIO_SAMPLE"]
}
```

---

## 6. Merge Audio Segments (`merge_audio_segments`)
Combines multiple audio files into one. Supports direct file uploads (Multipart) or URLs (JSON).

**Request Body (JSON Example):**
```json
{
  "op": "merge_audio_segments",
  "client_ref": "YOUR_APP_ID",
  "urls": ["url1", "url2"]
}
```

**Request Body (Multipart Example):**
- `op`: `merge_audio_segments`
- `client_ref`: `YOUR_APP_ID`
- `audio`: (Multiple file attachments)

---

## Error Handling

- `401 Unauthorized`: Invalid `X-Gateway-Key` header.
- `403 Forbidden`: Invalid `client_ref`.
- `500 Internal Error`: Communication or processing failure.
