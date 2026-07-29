// Simple client-side auth using localStorage. Not real security — a gate.
const USERS_KEY = "nd_users";
const SESSION_KEY = "nd_session";

type User = { username: string; password: string };

function loadUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signUp(username: string, password: string): { ok: boolean; error?: string } {
  username = username.trim();
  if (!username || !password) return { ok: false, error: "Completá usuario y contraseña" };
  const users = loadUsers();
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return { ok: false, error: "Ese usuario ya existe" };
  }
  users.push({ username, password });
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, username);
  return { ok: true };
}

export function signIn(username: string, password: string): { ok: boolean; error?: string } {
  const users = loadUsers();
  const u = users.find((x) => x.username.toLowerCase() === username.trim().toLowerCase());
  if (!u || u.password !== password) return { ok: false, error: "Usuario o contraseña incorrectos" };
  localStorage.setItem(SESSION_KEY, u.username);
  return { ok: true };
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}
