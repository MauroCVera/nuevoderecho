import { useEffect } from "react";

type WebViewProps = {
  url: string;
  title: string;
  onClose: () => void;
  /** Route HTML pages through our proxy to hide the site's header/nav/footer */
  useProxy?: boolean;
};

export function WebView({ url, title, onClose, useProxy = false }: WebViewProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const src = useProxy ? `/api/public/proxy?url=${encodeURIComponent(url)}` : url;

  return (
    <div className="fixed inset-x-0 top-0 bottom-16 z-40 flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-2 bg-[#0000ff] text-white px-3 py-2 shadow">
        <button
          onClick={onClose}
          aria-label="Volver"
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 flex items-center justify-center text-lg leading-none"
        >
          ←
        </button>
        <div className="flex-1 truncate font-display text-lg tracking-wide">{title}</div>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 flex items-center justify-center text-lg leading-none"
        >
          ✕
        </button>
      </div>

      {/* Iframe */}
      <iframe
        src={src}
        title={title}
        className="flex-1 w-full border-0 bg-white"
        // sandbox is intentionally omitted so PDFs and Google Docs work.
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
