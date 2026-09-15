import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side Supabase client for Route Handlers and Server Components.
// Returns null when Supabase env vars aren't configured yet.
export async function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component — cookies are refreshed by proxy.ts instead.
        }
      },
    },
  });
}

// Verifies the session against the Supabase Auth server (never trust a
// locally-decoded JWT/session for authorization decisions).
export async function requireUser() {
  const supabase = await getServerSupabase();
  if (!supabase) {
    return { user: null, error: "Auth is not configured on this server yet." };
  }
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return { user: null, error: "Please sign in to continue." };
  }
  return { user: data.user, error: null };
}
