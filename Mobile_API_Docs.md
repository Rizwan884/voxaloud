# Mobile API Integration Guide (V1)

This documentation describes the interface for the backend bridge to the high-performance audio engine.

## Base Configuration

- **Endpoint URL**: `https://voxaloud.shaaddev.studio/api/external/remote-engine-v1`
- **Method**: `POST` (All operations use POST for enhanced security)
- **Test Connectivity (GET)**: `https://voxaloud.shaaddev.studio/api/external/remote-engine-v1`

## Authentication

Every request must include both a secure header and a client reference in the body.

### Required Header
| Header | Value | Description |
| :--- | :--- | :--- |
| `X-Gateway-Key` | `STRING` | Match your `APP_INTERNAL_SECRET` in `.env`. |

### Required Body Field
| Field | Value | Description |
| :--- | :--- | :--- |
| `client_ref` | `STRING` | Match your `ALLOWED_APP_ID` in `.env`. |

---

## Operations Overview

The `op` field in the request body determines the action to be performed.

| Operation (`op`) | Description | Data Source |
| :--- | :--- | :--- |
| `fetch_ai_voices` | Fetch all AI Voices (TTS) | Local JSON |
| `fetch_celebrity_voices` | Fetch all Celebrity/Politician voices | Local JSON |
| `process_task` | Synthesize text into audio | Fish Audio API |
| `commit_new_entry` | Create/Clone a new voice resource | Fish Audio API |

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

## 3. Synthesize Audio (`process_task`)
Generates an MP3 stream from the provided text using Fish Audio.

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

**Response:**
- **Success (200)**: Binary data (audio/mpeg stream).

---

## 4. Create Voice Clone (`commit_new_entry`)
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

## Error Handling

- `401 Unauthorized`: Invalid or missing `X-Gateway-Key` header.
- `403 Forbidden`: Invalid `client_ref` provided in the body.
- `404 Not Found`: Middleware blocking or incorrect URL.
- `405 Method Not Allowed`: Using GET when only POST is supported (or vice versa).
- `500 Internal Error`: Data file missing or API communication failed.
