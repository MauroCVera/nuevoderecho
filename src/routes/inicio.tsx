import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/inicio")({
  component: Inicio,
});

function Inicio() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getSession()) navigate({ to: "/" });
    else setReady(true);
  }, [navigate]);

  if (!ready) return <div style={{ background: "#0000ff", minHeight: "100vh" }} />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 text-white" style={{ background: "#0000ff" }}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl">
          <span className="font-display text-[#0000ff] text-5xl leading-none">ND</span>
        </div>
        <div className="text-left">
          <h1 className="font-display text-5xl sm:text-6xl leading-[0.85]">NUEVO</h1>
          <h1 className="font-display text-5xl sm:text-6xl leading-[0.85]">DERECHO</h1>
        </div>
      </div>

      <p className="font-display text-lg sm:text-xl tracking-widest text-center mb-8">
        CONDUCCIÓN DEL CENTRO DE ESTUDIANTES
      </p>

      <button
        onClick={() => navigate({ to: "/app/carreras" })}
        className="btn-entrar"
        aria-label="Entrar a la aplicación"
      >
        ENTRAR
      </button>

      <p className="font-display text-2xl sm:text-3xl tracking-wider text-center mt-10">
        JUNTO A VOS DURANTE TODA TU CARRERA
      </p>

      <div className="flex gap-4 mt-10">
        {[
          { bg: "#25D366", label: "W" },
          { bg: "#E1306C", label: "IG" },
          { bg: "#000000", label: "TT" },
          { bg: "#1877F2", label: "F" },
          { bg: "#1DA1F2", label: "X" },
        ].map((s) => (
          <div key={s.label} className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: s.bg }}>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
