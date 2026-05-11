import fs from 'fs';
import path from 'path';

export interface Voice {
  id: string;
  name: string;
  gender: string;
  language: string;
  country: string;
  flag?: string;
}

const VOICES_URL = "https://raw.githubusercontent.com/rizwan884/tsda/refs/heads/main/voices.json";

// Fallback demo voices in case both remote and local fail
export const DEMO_VOICES: Voice[] = [
  { id: "7f4f039a046c4349885b54637d45e4e7", name: "David (Demo)", gender: "Male", language: "English", country: "United States" },
  { id: "f26210f9-2c06-4033-9f88-1d70104e7683", name: "Emma (Demo)", gender: "Female", language: "English", country: "United Kingdom" },
  { id: "af89255743b94098909c25f191b92c4f", name: "Sophie (Demo)", gender: "Female", language: "French", country: "France" },
  { id: "732d8476-f368-4796-93a8-48529249e91a", name: "Hans (Demo)", gender: "Male", language: "German", country: "Germany" }
];

export async function getVoices(): Promise<Voice[]> {
  try {
    const localPath = path.join(process.cwd(), 'voices_updated.json');
    let rawData: any[] = [];

    if (fs.existsSync(localPath)) {
      rawData = JSON.parse(fs.readFileSync(localPath, 'utf8'));
    } else {
      const response = await fetch(VOICES_URL, { next: { revalidate: 60 } });
      if (!response.ok) throw new Error('Remote fetch failed');
      rawData = await response.json();
    }

    return rawData.map((v: any) => {
      const { previewAudioPath, ...rest } = v;
      return rest as Voice;
    });
  } catch (error) {
    console.error("Error fetching voices:", error);
    return DEMO_VOICES;
  }
}
