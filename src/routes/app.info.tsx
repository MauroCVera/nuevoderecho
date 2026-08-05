import { createFileRoute } from "@tanstack/react-router";
import { LinkSections, type NDSection } from "@/components/LinkSections";

export const Route = createFileRoute("/app/info")({
  component: Info,
  head: () => ({
    meta: [
      { title: "Info para Estudiantes — Nuevo Derecho UBA" },
      { name: "description", content: "Inscripciones, Club del Fallo, certificados, becas y Consejo Directivo." },
      { property: "og:title", content: "Info para Estudiantes — Nuevo Derecho UBA" },
      { property: "og:description", content: "Toda la info útil para estudiantes de la Facultad de Derecho UBA." },
    ],
  }),
});

const sections: NDSection[] = [
  {
    title: "Info para Estudiantes",
    links: [
      { label: "Inscripciones", url: "https://nuevoderechouba.com.ar/index.php/inscripciones/", proxy: true },
      { label: "Club del Fallo", url: "https://drive.google.com/drive/folders/10Cn9u3TtkazzdM1lzrhZ15z4T4MLL0u1" },
      { label: "Certificado Alumno Regular", url: "https://www.derecho.uba.ar/tramites/" },
      { label: "Certificado de Examen", url: "https://docs.google.com/forms/u/0/d/19-CGFBpwcQoeRW5EEdvk1hhJu7V4m_R9mDwdtXsrCf4/viewform?edit_requested=true" },
      { label: "Centro de Estudiantes", url: "https://nuevoderechouba.com.ar/index.php/centro-de-estudiantes/", proxy: true },
      { label: "Becas", url: "https://www.derecho.uba.ar/extension/becas/" },
      { label: "Consejo Directivo", url: "https://nuevoderechouba.com.ar/index.php/consejo-directivo/", proxy: true },
    ],
  },
];

function Info() {
  return <LinkSections sections={sections} />;
}
