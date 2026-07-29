import { createFileRoute } from "@tanstack/react-router";
import { SectionPanel, MenuButton } from "@/components/SectionPanel";

export const Route = createFileRoute("/app/carreras")({
  component: Carreras,
  head: () => ({
    meta: [
      { title: "Carreras — Nuevo Derecho UBA" },
      { name: "description", content: "Carreras de la Facultad de Derecho UBA: Abogacía, Traductorado, Calígrafo, Profesorado y CBC." },
      { property: "og:title", content: "Carreras — Nuevo Derecho UBA" },
      { property: "og:description", content: "Explorá las carreras disponibles en la Facultad de Derecho UBA." },
    ],
  }),
});

const carreras = ["ABOGACÍA", "TRADUCTORADO", "CALÍGRAFO", "PROFESORADO", "CBC"];

function Carreras() {
  return (
    <div>
      <SectionPanel title="Carreras" variant="white">
        {carreras.map((c) => (
          <MenuButton key={c}>{c}</MenuButton>
        ))}
      </SectionPanel>

      <SectionPanel title="Accesos Rápidos">
        <MenuButton>Aulas 1er Cuatrimestre 2026</MenuButton>
        <MenuButton>Mapa Interactivo Facultad de Derecho UBA</MenuButton>
        <MenuButton>Grupos de WhatsApp 1er Cuatrimestre 2026</MenuButton>
      </SectionPanel>
    </div>
  );
}
