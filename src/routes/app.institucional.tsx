import { createFileRoute } from "@tanstack/react-router";
import { LinkSections, type NDSection } from "@/components/LinkSections";

export const Route = createFileRoute("/app/institucional")({
  component: Institucional,
  head: () => ({
    meta: [
      { title: "Institucional — Nuevo Derecho UBA" },
      { name: "description", content: "Accesos institucionales: Campus Virtual, SIU-Guaraní, Calendario Académico, Correo Académico y trámites." },
      { property: "og:title", content: "Institucional — Nuevo Derecho UBA" },
      { property: "og:description", content: "Herramientas institucionales de la Facultad de Derecho UBA." },
    ],
  }),
});

const sections: NDSection[] = [
  {
    title: "Institucional",
    links: [
      {
        label: "Herramienta de Readmisión",
        dummy: "Herramienta en desarrollo. Estará disponible próximamente.",
      },
      { label: "Campus Virtual", url: "https://www.derecho.uba.ar/campusvirtual/" },
      { label: "SIU-Guaraní Derecho", url: "https://3w.derecho.uba.ar" },
      { label: "Calendario Académico", url: "https://www.derecho.uba.ar/academica/calendario_academico.php" },
      { label: "Correo Académico", url: "https://www.derecho.uba.ar/correoacademico/acceso-correo-electronico-academico.php" },
      { label: "Trámites a Distancia UBA", url: "https://www.tramitesadistancia.uba.ar" },
    ],
  },
];

function Institucional() {
  return <LinkSections sections={sections} />;
}
