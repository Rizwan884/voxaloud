import { NextResponse } from "next/server";
import axios from "axios";

const VOICES_URL = "https://raw.githubusercontent.com/jr270504/tsda/refs/heads/main/voices.json";

export async function GET() {
  try {
    const response = await axios.get(VOICES_URL);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching voices:", error);
    return NextResponse.json({ error: "Failed to fetch voices" }, { status: 500 });
  }
}
