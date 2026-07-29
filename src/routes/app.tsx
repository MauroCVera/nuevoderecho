import { createFileRoute, Outlet, useNavigate, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSession, signOut } from "@/lib/auth";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const TABS = [
  { to: "/app/carreras", label: "Carreras", icon: "🎓" },
  { to: "/app/institucional", label: "Institucional", icon: "🏛️" },
  { to: "/app/info", label: "Info", icon: "📋" },
  { to: "/app/herramientas", label: "Herr. Digitales", icon: "🛠️" },
  { to: "/app/mi-carrera", label: "Mi Carrera", icon: "👤" },
] as const;

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s) navigate({ to: "/" });
    else { setUser(s); setReady(true); }
  }, [navigate]);

  if (!ready) return <div style={{ background: "#0000ff", minHeight: "100vh" }} />;

  function handleLogout() {
    signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1e90ff]">
      {/* Header */}
      <header className="bg-[#0000ff] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
            <span className="font-display text-[#0000ff] text-lg leading-none">ND</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wide">NUEVO DERECHO</div>
            <div className="text-[10px] opacity-80 -mt-0.5">Hola, {user}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-full border border-white/30"
        >
          Salir
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#0000ff] border-t border-white/20 grid grid-cols-5 z-50">
        {TABS.map((t) => {
          const active = location.pathname.startsWith(t.to);
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-col items-center py-2 text-[10px] font-semibold transition ${
                active ? "text-white" : "text-white/60"
              }`}
            >
              <span className="text-xl leading-none mb-0.5">{t.icon}</span>
              <span className="text-center leading-tight px-0.5">{t.label}</span>
              {active && <span className="w-6 h-0.5 bg-white rounded-full mt-1" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
