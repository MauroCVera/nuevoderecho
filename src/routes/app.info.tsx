import { createFileRoute } from "@tanstack/react-router";
import { SectionPanel, MenuButton } from "@/components/SectionPanel";

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

function Info() {
  return (
    <SectionPanel title="Info para Estudiantes">
      <MenuButton>Inscripciones</MenuButton>
      <MenuButton>Club del Fallo</MenuButton>
      <MenuButton>Certificado Alumno Regular</MenuButton>
      <MenuButton>Certificado de Examen</MenuButton>
      <MenuButton>Centro de Estudiantes</MenuButton>
      <MenuButton>Becas</MenuButton>
      <MenuButton>Consejo Directivo</MenuButton>
    </SectionPanel>
  );
}
