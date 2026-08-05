import { useState } from "react";
import { SectionPanel, MenuButton } from "@/components/SectionPanel";
import { WebView } from "@/components/WebView";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type NDChoice = {
  label: string;
  url: string;
  /** Open in the phone's default browser instead of the in-app WebView */
  external?: boolean;
  proxy?: boolean;
};

export type NDLink = {
  label: string;
  url?: string;
  /** Route through our proxy to hide the external site's header/nav/footer */
  proxy?: boolean;
  /** Open in the phone's default browser instead of the in-app WebView */
  external?: boolean;
  /** Dummy button: shows a message instead of opening content */
  dummy?: string;
  /** Show a popup with several options */
  choices?: NDChoice[];
  choicesDescription?: string;
  onClick?: () => void;
};

export type NDSection = {
  title: string;
  variant?: "blue" | "white";
  links: NDLink[];
};

export function LinkSections({ sections }: { sections: NDSection[] }) {
  const [active, setActive] = useState<{ label: string; url: string; proxy?: boolean } | null>(null);
  const [menu, setMenu] = useState<NDLink | null>(null);

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handle = (l: NDLink) => {
    if (l.onClick) return l.onClick();
    if (l.dummy) {
      toast(l.label, { description: l.dummy, duration: 6000 });
      return;
    }
    if (l.choices) {
      setMenu(l);
      return;
    }
    if (l.url) {
      if (l.external) return openExternal(l.url);
      setActive({ label: l.label, url: l.url, proxy: l.proxy });
    }
  };

  const handleChoice = (c: NDChoice) => {
    setMenu(null);
    if (c.external) return openExternal(c.url);
    setActive({ label: c.label, url: c.url, proxy: c.proxy });
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

      <Dialog open={Boolean(menu)} onOpenChange={(o) => !o && setMenu(null)}>
        <DialogContent className="max-w-[92vw] sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl tracking-wide text-[#0000ff]">
              {menu?.label}
            </DialogTitle>
            {menu?.choicesDescription && (
              <DialogDescription>{menu.choicesDescription}</DialogDescription>
            )}
          </DialogHeader>
          <div className="space-y-2.5">
            {menu?.choices?.map((c) => (
              <MenuButton key={c.label} onClick={() => handleChoice(c)}>
                {c.label}
              </MenuButton>
            ))}
          </div>
        </DialogContent>
      </Dialog>

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
