"use client";

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { getBrowserSupabase } from '@/lib/supabaseBrowser';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  configured: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = getBrowserSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => !!supabase);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then((result: { data: { user: User | null } }) => {
      setUser(result.data.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, loading, configured: !!supabase, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
