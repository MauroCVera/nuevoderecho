import { createFileRoute } from "@tanstack/react-router";
import { SectionPanel, MenuButton } from "@/components/SectionPanel";

export const Route = createFileRoute("/app/herramientas")({
  component: Herramientas,
  head: () => ({
    meta: [
      { title: "Herramientas Digitales — Nuevo Derecho UBA" },
      { name: "description", content: "Sala de conectividad, ChatGPT, audio/imagen a texto y el Asistente Académico ND." },
      { property: "og:title", content: "Herramientas Digitales — Nuevo Derecho UBA" },
      { property: "og:description", content: "Herramientas digitales para potenciar tu carrera." },
    ],
  }),
});

function Herramientas() {
  return (
    <SectionPanel title="Herramientas Digitales">
      <MenuButton>Sala de Conectividad</MenuButton>
      <MenuButton>OpenAI Chat GPT</MenuButton>
      <MenuButton>Audio a Texto</MenuButton>
      <MenuButton>Lectura a Texto</MenuButton>
      <MenuButton>Imagen a Texto</MenuButton>
      <MenuButton>Asistente Académico ND</MenuButton>
    </SectionPanel>
  );
}
