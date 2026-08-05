import { createFileRoute } from "@tanstack/react-router";
import { LinkSections, type NDSection } from "@/components/LinkSections";

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

const sections: NDSection[] = [
  {
    title: "Carreras",
    variant: "white",
    links: [
      { label: "ABOGACÍA", url: "https://nuevoderechouba.com.ar/index.php/abogacia/", proxy: true },
      { label: "TRADUCTORADO", url: "https://nuevoderechouba.com.ar/index.php/traductorado-publico/", proxy: true },
      { label: "CALÍGRAFO", url: "https://nuevoderechouba.com.ar/index.php/caligrafo-original/", proxy: true },
      { label: "PROFESORADO", url: "https://nuevoderechouba.com.ar/index.php/profesorado-en-ciencias-juridicas/", proxy: true },
      { label: "CBC", url: "https://nuevoderechouba.com.ar/index.php/cbc-original/", proxy: true },
    ],
  },
  {
    title: "Accesos Rápidos",
    links: [
      {
        label: "Aulas 2do Cuatrimestre 2026",
        dummy: "Información disponible próximamente con el comienzo de Cuatrimestre del Miércoles 12 de Agosto.",
      },
      { label: "Mapa Interactivo Facultad de Derecho UBA", url: "https://maurocvera.github.io/Interact_Map_UBA_Derecho/" },
      { label: "Grupos de Whatsapp 2ndo Cuatrimestre 2026", url: "https://grupos-ws-nd.lovable.app/" },
    ],
  },
];

function Carreras() {
  return <LinkSections sections={sections} />;
}
