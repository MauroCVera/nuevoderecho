import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getSession, signOut } from "@/lib/auth";
import { SectionPanel } from "@/components/SectionPanel";
import { LinkSections, type NDSection } from "@/components/LinkSections";

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
  const user = getSession() ?? "Estudiante";

  const sections: NDSection[] = [
    {
      title: "Mi Carrera",
      links: [
        {
          label: "Mis Materias",
          dummy:
            "Próximamente vas a poder cargar tus materias e integrarlas con el Plan de Estudios Interactivo Online.",
        },
        { label: "Historial Académico", url: "https://3w.derecho.uba.ar" },
        {
          label: "Favoritos",
          dummy: "Función en desarrollo: vas a poder guardar accesos y links favoritos.",
        },
        {
          label: "Cerrar Sesión",
          onClick: () => {
            signOut();
            navigate({ to: "/" });
          },
        },
      ],
    },
  ];

  return (
    <div>
      <SectionPanel title="Mi Perfil" variant="white">
        <div className="flex items-center gap-3 p-2">
          <div className="w-14 h-14 rounded-full bg-[#0000ff] flex items-center justify-center text-white font-display text-2xl">
            {user[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-display text-2xl text-[#0000ff] leading-none">{user}</p>
            <p className="text-xs text-gray-600 mt-1">Estudiante — Facultad de Derecho UBA</p>
          </div>
        </div>
      </SectionPanel>

      <LinkSections sections={sections} />
    </div>
  );
}
