import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const cleanSource = source === 'exit_intent' || source === 'footer_form' ? source : 'footer_form';

    // 1. Try Supabase if configured
    if (supabase) {
      const { error } = await supabase
        .from('email_subscribers')
        .insert([{ email, source: cleanSource }]);

      if (!error) {
        return NextResponse.json({ success: true, provider: 'supabase' });
      }
      console.warn('Supabase insertion error, falling back to local storage:', error);
    }

    // 2. Fallback: Save locally to subscribers.json in the project root
    const jsonPath = path.join(process.cwd(), 'subscribers.json');
    let subscribers: Array<{ email: string; source: string; created_at: string }> = [];

    try {
      if (fs.existsSync(jsonPath)) {
        const fileContent = fs.readFileSync(jsonPath, 'utf8');
        subscribers = JSON.parse(fileContent);
      }
    } catch (readError) {
      console.error('Error reading subscribers file:', readError);
    }

    // Add new entry
    subscribers.push({
      email,
      source: cleanSource,
      created_at: new Date().toISOString()
    });

    try {
      fs.writeFileSync(jsonPath, JSON.stringify(subscribers, null, 2), 'utf8');
    } catch (writeError) {
      console.error('Error writing subscribers file:', writeError);
      return NextResponse.json({ error: 'Failed to write subscriber data.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, provider: 'local_json' });
  } catch (err: unknown) {
    console.error('Subscribe runtime error:', err);
    const errorMsg = err instanceof Error ? err.message : 'Internal server error.';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
