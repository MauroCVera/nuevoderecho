import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSession, signIn, signUp } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (getSession()) {
      navigate({ to: "/inicio" });
    } else {
      setReady(true);
    }
  }, [navigate]);

  if (!ready) return <div style={{ background: "#0000ff", minHeight: "100vh" }} />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = mode === "login" ? signIn(username, password) : signUp(username, password);
    if (!res.ok) return setError(res.error || "Error");
    navigate({ to: "/inicio" });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10" style={{ background: "#0000ff" }}>
      <h1
        className="font-display text-white text-center text-5xl sm:text-6xl leading-none mb-2"
        style={{ letterSpacing: "0.03em" }}
      >
        Bienvenido/a a
      </h1>
      <h1
        className="font-display text-white text-center text-5xl sm:text-6xl leading-none mb-10"
        style={{ letterSpacing: "0.03em" }}
      >
        Facultad de Derecho
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex mb-5 rounded-lg overflow-hidden border border-white/40">
          <button
            type="button"
            onClick={() => { setMode("login"); setError(null); }}
            className={`flex-1 py-2 font-display text-lg tracking-wide ${mode === "login" ? "bg-white text-[#0000ff]" : "text-white"}`}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => { setMode("signup"); setError(null); }}
            className={`flex-1 py-2 font-display text-lg tracking-wide ${mode === "signup" ? "bg-white text-[#0000ff]" : "text-white"}`}
          >
            Crear cuenta
          </button>
        </div>

        <label className="block text-white text-sm mb-1 font-medium">Usuario</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-md px-3 py-2 mb-3 bg-white text-black outline-none"
          autoComplete="username"
        />

        <label className="block text-white text-sm mb-1 font-medium">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md px-3 py-2 mb-4 bg-white text-black outline-none"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        {error && <p className="text-white bg-red-600/70 rounded px-3 py-2 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full font-display text-2xl tracking-wider py-2.5 rounded-full bg-white text-[#0000ff] hover:bg-white/90 transition"
        >
          {mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>

      <p className="text-white/70 text-xs mt-6 text-center max-w-xs">
        Nuevo Derecho — Conducción del Centro de Estudiantes
      </p>
    </div>
  );
}
