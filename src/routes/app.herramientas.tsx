import { createFileRoute } from "@tanstack/react-router";
import { LinkSections, type NDSection } from "@/components/LinkSections";

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

const sections: NDSection[] = [
  {
    title: "Herramientas Digitales",
    links: [
      { label: "Sala de Conectividad", url: "https://nuevoderechouba.com.ar/index.php/sala-de-conectividad/", proxy: true },
      { label: "OpenAI Chat GPT", url: "https://chatgpt.com/auth/login" },
      { label: "Audio a Texto", url: "https://maurocvera.github.io/Transcriptor-de-Audios-a-Texto/" },
      { label: "Lectura a Texto", url: "https://maurocvera.github.io/Lector-de-Texto-Avanzado/" },
      { label: "Imagen a Texto", url: "https://maurocvera.github.io/Interpretador-de-Texto/" },
      { label: "Asistente Académico ND", url: "https://gemini.google.com/gem/74ff34099801?usp=sharing" },
    ],
  },
];

function Herramientas() {
  return <LinkSections sections={sections} />;
}
