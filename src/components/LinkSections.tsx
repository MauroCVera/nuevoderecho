import { useState } from "react";
import { SectionPanel, MenuButton } from "@/components/SectionPanel";
import { WebView } from "@/components/WebView";
import { toast } from "sonner";

export type NDLink = {
  label: string;
  url?: string;
  /** Route through our proxy to hide the external site's header/nav/footer */
  proxy?: boolean;
  /** Dummy button: shows a message instead of opening content */
  dummy?: string;
  onClick?: () => void;
};

export type NDSection = {
  title: string;
  variant?: "blue" | "white";
  links: NDLink[];
};

export function LinkSections({ sections }: { sections: NDSection[] }) {
  const [active, setActive] = useState<NDLink | null>(null);

  const handle = (l: NDLink) => {
    if (l.onClick) return l.onClick();
    if (l.dummy) {
      toast(l.label, { description: l.dummy, duration: 6000 });
      return;
    }
    if (l.url) setActive(l);
  };

  return (
    <div>
      {sections.map((s) => (
        <SectionPanel key={s.title} title={s.title} variant={s.variant}>
          {s.links.map((l) => (
            <MenuButton key={l.label} dummy={Boolean(l.dummy)} onClick={() => handle(l)}>
              {l.label}
            </MenuButton>
          ))}
        </SectionPanel>
      ))}

      {active?.url && (
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
