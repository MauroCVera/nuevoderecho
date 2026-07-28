import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const CARRERAS = ["Abogacía", "Traductorado", "Calígrafo", "Profesorado", "CBC"] as const;
export type Carrera = (typeof CARRERAS)[number];

export async function signUp(
  email: string,
  password: string,
  carrera: Carrera,
): Promise<{ ok: boolean; error?: string }> {
  email = email.trim();
  if (!email || !password) return { ok: false, error: "Completá email y contraseña" };
  if (!carrera) return { ok: false, error: "Elegí una carrera" };
  const redirectTo = typeof window !== "undefined" ? window.location.origin : undefined;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { carrera },
      emailRedirectTo: redirectTo,
    },
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) return { ok: false, error: "Email o contraseña incorrectos" };
  if (data.user) {
    // Track last sign-in in profiles (best-effort).
    supabase
      .from("profiles")
      .update({ last_sign_in_at: new Date().toISOString() })
      .eq("user_id", data.user.id)
      .then(() => undefined);
  }
  return { ok: true };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, user: session?.user ?? null, loading };
}

export function displayName(user: User | null | undefined): string {
  if (!user) return "Estudiante";
  return user.email?.split("@")[0] ?? "Estudiante";
}
