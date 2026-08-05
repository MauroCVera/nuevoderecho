import type { ReactNode } from "react";

export function SectionPanel({
  title,
  children,
  variant = "blue",
}: {
  title: string;
  children: ReactNode;
  variant?: "blue" | "white";
}) {
  const isBlue = variant === "blue";
  return (
    <section
      className={`mx-3 my-3 rounded-2xl p-4 ${isBlue ? "bg-[#0000ff]" : "bg-white border-2 border-[#0000ff]"}`}
    >
      <h2
        className={`font-display text-3xl text-center tracking-wide mb-4 ${
          isBlue ? "text-white" : "text-[#0000ff]"
        }`}
      >
        {title}
      </h2>
      <div className="space-y-2.5">{children}</div>
    </section>
  );
}

export function MenuButton({
  children,
  onClick,
  dummy = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  dummy?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="menu-btn"
      type="button"
      style={
        dummy
          ? {
              background: "linear-gradient(180deg,#d4d4d4 0%,#9a9a9a 55%,#7a7a7a 100%)",
              color: "#f5f5f5",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}
