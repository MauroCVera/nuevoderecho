import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/app/admin")({
  component: AdminPanel,
  head: () => ({
    meta: [{ title: "Administración — Nuevo Derecho UBA" }],
  }),
});

type Row = {
  user_id: string;
  email: string;
  carrera: string | null;
  created_at: string;
  last_sign_in_at: string | null;
};

function AdminPanel() {
  const navigate = useNavigate();
  const { user, loading } = useSession();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/" });
      return;
    }
    (async () => {
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!role) {
        setAllowed(false);
        setChecking(false);
        return;
      }
      setAllowed(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id, email, carrera, created_at, last_sign_in_at")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setRows((data ?? []) as Row[]);
      setChecking(false);
    })();
  }, [user, loading, navigate]);

  if (loading || checking) {
    return <div className="p-6 text-white">Cargando…</div>;
  }

  if (!allowed) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 text-center">
          <p className="font-display text-2xl text-[#0000ff]">Acceso restringido</p>
          <p className="text-sm text-gray-600 mt-2">Este panel es solo para administradores.</p>
        </div>
      </div>
    );
  }

  const fmt = (v: string | null) =>
    v ? new Date(v).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }) : "—";

  return (
    <div className="p-3">
      <div className="bg-white rounded-2xl p-4 border-2 border-[#0000ff]">
        <h2 className="font-display text-3xl text-[#0000ff] text-center mb-3">Usuarios</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <p className="text-xs text-gray-500 mb-3 text-center">{rows.length} registrados</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[#0000ff] border-b border-[#0000ff]/30">
                <th className="py-2 pr-2">Email</th>
                <th className="py-2 pr-2">Carrera</th>
                <th className="py-2 pr-2">Alta</th>
                <th className="py-2">Último login</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.user_id} className="border-b border-gray-100">
                  <td className="py-2 pr-2 break-all">{r.email}</td>
                  <td className="py-2 pr-2">{r.carrera ?? "—"}</td>
                  <td className="py-2 pr-2 whitespace-nowrap">{fmt(r.created_at)}</td>
                  <td className="py-2 whitespace-nowrap">{fmt(r.last_sign_in_at)}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">Sin usuarios todavía.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
