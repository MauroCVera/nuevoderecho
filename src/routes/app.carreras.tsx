import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionPanel, MenuButton } from "@/components/SectionPanel";
import { WebView } from "@/components/WebView";

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

type Link = { label: string; url: string; proxy?: boolean };

const carreras: Link[] = [
  { label: "ABOGACÍA", url: "https://nuevoderechouba.com.ar/index.php/abogacia/", proxy: true },
  { label: "TRADUCTORADO", url: "https://nuevoderechouba.com.ar/index.php/traductorado-publico/", proxy: true },
  { label: "CALÍGRAFO", url: "https://nuevoderechouba.com.ar/index.php/caligrafo-original/", proxy: true },
  { label: "PROFESORADO", url: "https://nuevoderechouba.com.ar/index.php/profesorado-en-ciencias-juridicas/", proxy: true },
  { label: "CBC", url: "https://nuevoderechouba.com.ar/index.php/cbc-original/", proxy: true },
];

const accesos: Link[] = [
  { label: "Aulas 1er Cuatrimestre 2026", url: "https://nuevoderechouba.com.ar/wp-content/uploads/2026/03/AULAS_1S_26.pdf", proxy: true },
  { label: "Mapa Interactivo Facultad de Derecho UBA", url: "https://maurocvera.github.io/Interact_Map_UBA_Derecho/" },
  { label: "Grupos de WhatsApp 1er Cuatrimestre 2026", url: "https://docs.google.com/spreadsheets/u/0/d/1iX1K2Q7uYGGsgk7yqku3msQ81UC-maZk6PgXGYxdx8Y/htmlview" },
];

function Carreras() {
  const [active, setActive] = useState<Link | null>(null);

  return (
    <div>
      <SectionPanel title="Carreras" variant="white">
        {carreras.map((c) => (
          <MenuButton key={c.label} onClick={() => setActive(c)}>{c.label}</MenuButton>
        ))}
      </SectionPanel>

      <SectionPanel title="Accesos Rápidos">
        {accesos.map((a) => (
          <MenuButton key={a.label} onClick={() => setActive(a)}>{a.label}</MenuButton>
        ))}
      </SectionPanel>

      {active && (
        <WebView
          url={active.url}
          title={active.label}
          useProxy={active.proxy}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}
