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

const carreras: { label: string; href: string }[] = [
  { label: "ABOGACÍA", href: "https://nuevoderechouba.com.ar/index.php/abogacia/" },
  { label: "TRADUCTORADO", href: "https://nuevoderechouba.com.ar/index.php/traductorado-publico/" },
  { label: "CALÍGRAFO", href: "https://nuevoderechouba.com.ar/index.php/caligrafo-original/" },
  { label: "PROFESORADO", href: "https://nuevoderechouba.com.ar/index.php/profesorado-en-ciencias-juridicas/" },
  { label: "CBC", href: "https://nuevoderechouba.com.ar/index.php/cbc-original/" },
];

const accesos: { label: string; href: string }[] = [
  { label: "Aulas 1er Cuatrimestre 2026", href: "http://nuevoderechouba.com.ar/wp-content/uploads/2026/03/AULAS_1S_26.pdf" },
  { label: "Mapa Interactivo Facultad de Derecho UBA", href: "https://maurocvera.github.io/Interact_Map_UBA_Derecho/" },
  { label: "Grupos de WhatsApp 1er Cuatrimestre 2026", href: "https://docs.google.com/spreadsheets/u/0/d/1iX1K2Q7uYGGsgk7yqku3msQ81UC-maZk6PgXGYxdx8Y/htmlview?pli=1#gid=511442778" },
];

function Carreras() {
  return (
    <div>
      <SectionPanel title="Carreras" variant="white">
        {carreras.map((c) => (
          <MenuButton key={c.label} href={c.href}>{c.label}</MenuButton>
        ))}
      </SectionPanel>

      <SectionPanel title="Accesos Rápidos">
        {accesos.map((a) => (
          <MenuButton key={a.label} href={a.href}>{a.label}</MenuButton>
        ))}
      </SectionPanel>
    </div>
  );
}
