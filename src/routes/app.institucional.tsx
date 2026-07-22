import { createFileRoute } from "@tanstack/react-router";
import { SectionPanel, MenuButton } from "@/components/SectionPanel";

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

function Institucional() {
  return (
    <SectionPanel title="Institucional">
      <MenuButton>Centro de Consultas Personal</MenuButton>
      <MenuButton>Campus Virtual</MenuButton>
      <MenuButton>SIU-Guaraní Derecho</MenuButton>
      <MenuButton>Calendario Académico</MenuButton>
      <MenuButton>Correo Académico</MenuButton>
      <MenuButton>Trámites a Distancia UBA</MenuButton>
    </SectionPanel>
  );
}
