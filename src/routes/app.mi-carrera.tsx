import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { signOut, useSession, displayName } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { SectionPanel, MenuButton } from "@/components/SectionPanel";

export const Route = createFileRoute("/app/mi-carrera")({
  component: MiCarrera,
  head: () => ({
    meta: [
      { title: "Mi Carrera — Nuevo Derecho UBA" },
      { name: "description", content: "Tu espacio personal en Nuevo Derecho: perfil, materias y accesos guardados." },
      { property: "og:title", content: "Mi Carrera — Nuevo Derecho UBA" },
      { property: "og:description", content: "Gestioná tu carrera desde un solo lugar." },
    ],
  }),
});

function MiCarrera() {
  const navigate = useNavigate();
  const { user } = useSession();
  const [carrera, setCarrera] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("carrera").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      setCarrera(data?.carrera ?? null);
    });
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle().then(({ data }) => {
      setIsAdmin(!!data);
    });
  }, [user]);

  const name = displayName(user);

  return (
    <div>
      <SectionPanel title="Mi Perfil" variant="white">
        <div className="flex items-center gap-3 p-2">
          <div className="w-14 h-14 rounded-full bg-[#0000ff] flex items-center justify-center text-white font-display text-2xl">
            {name[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-display text-2xl text-[#0000ff] leading-none">{name}</p>
            <p className="text-xs text-gray-600 mt-1">
              {carrera ? `${carrera} — ` : ""}Facultad de Derecho UBA
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">{user?.email}</p>
          </div>
        </div>
      </SectionPanel>

      <SectionPanel title="Mi Carrera">
        <MenuButton>Mis Materias</MenuButton>
        <MenuButton>Historial Académico</MenuButton>
        <MenuButton>Próximos Exámenes</MenuButton>
        <MenuButton>Favoritos</MenuButton>
        {isAdmin && (
          <Link to="/app/admin" className="menu-btn block text-center">
            Panel de Administración
          </Link>
        )}
        <MenuButton
          onClick={async () => {
            await signOut();
            navigate({ to: "/" });
          }}
        >
          Cerrar Sesión
        </MenuButton>
      </SectionPanel>
    </div>
  );
}
