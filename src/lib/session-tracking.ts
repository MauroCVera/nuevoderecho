import { supabase } from "@/integrations/supabase/client";

const SESSION_ID_KEY = "nd_session_row_id";

/** Record a new login row and remember its id so we can close it on logout. */
export async function recordLogin(username: string, carrera?: string | null) {
  try {
    const { data, error } = await supabase
      .from("user_sessions" as never)
      .insert({ username, carrera: carrera ?? null } as never)
      .select("id")
      .single();
    if (error) {
      console.warn("[sessions] insert failed", error.message);
      return;
    }
    const row = data as { id: string } | null;
    if (row?.id && typeof window !== "undefined") {
      localStorage.setItem(SESSION_ID_KEY, row.id);
    }
  } catch (e) {
    console.warn("[sessions] insert threw", e);
  }
}

/** Close the current session row with a logout timestamp. */
export async function recordLogout() {
  if (typeof window === "undefined") return;
  const id = localStorage.getItem(SESSION_ID_KEY);
  if (!id) return;
  try {
    const { error } = await supabase
      .from("user_sessions" as never)
      .update({ fecha_logout: new Date().toISOString() } as never)
      .eq("id", id);
    if (error) console.warn("[sessions] update failed", error.message);
  } catch (e) {
    console.warn("[sessions] update threw", e);
  } finally {
    localStorage.removeItem(SESSION_ID_KEY);
  }
}
