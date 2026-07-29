import { createFileRoute } from "@tanstack/react-router";

// List of hosts we're willing to proxy (anti-open-proxy)
const ALLOWED_HOSTS = new Set([
  "nuevoderechouba.com.ar",
  "www.nuevoderechouba.com.ar",
]);

// CSS injected into HTML pages to hide the site's own header/nav/footer
const HIDE_CSS = `
<style id="nd-hide-chrome">
  header, nav, footer,
  .site-header, .site-footer,
  #masthead, #colophon,
  .main-navigation, .primary-navigation, .top-bar, .topbar,
  .header, .header-main, .site-branding,
  .elementor-location-header, .elementor-location-footer,
  .menu-toggle, .mobile-menu, .site-navigation,
  #wpadminbar { display: none !important; visibility: hidden !important; height: 0 !important; }
  body { padding-top: 0 !important; margin-top: 0 !important; }
  html, body { overflow-x: hidden !important; }
  main, article, .site-main, .content-area, #content, .entry-content {
    padding: 8px !important; margin: 0 !important; max-width: 100% !important;
  }
  img, video, iframe { max-width: 100% !important; height: auto !important; }
</style>
`;

export const Route = createFileRoute("/api/public/proxy")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const target = url.searchParams.get("url");
        if (!target) return new Response("Missing url", { status: 400 });

        let targetUrl: URL;
        try {
          targetUrl = new URL(target);
        } catch {
          return new Response("Invalid url", { status: 400 });
        }
        if (!ALLOWED_HOSTS.has(targetUrl.hostname)) {
          return new Response("Host not allowed", { status: 403 });
        }
        if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
          return new Response("Bad protocol", { status: 400 });
        }

        let upstream: Response;
        try {
          upstream = await fetch(targetUrl.toString(), {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (compatible; NuevoDerechoApp/1.0; +https://nuevoderecho.lovable.app)",
              Accept: "text/html,application/xhtml+xml,*/*",
            },
            redirect: "follow",
          });
        } catch (e) {
          return new Response("Upstream fetch failed", { status: 502 });
        }

        const contentType = upstream.headers.get("content-type") || "";
        const headers = new Headers();
        headers.set("content-type", contentType || "text/html; charset=utf-8");
        headers.set("cache-control", "public, max-age=300");
        // Remove framing restrictions from upstream so we can iframe it
        // (we set our own response headers, upstream ones are dropped)

        if (contentType.includes("text/html")) {
          let html = await upstream.text();
          const baseTag = `<base href="${targetUrl.origin}${targetUrl.pathname.replace(/[^/]*$/, "")}">`;
          const injection = `${baseTag}\n${HIDE_CSS}`;

          if (/<head[^>]*>/i.test(html)) {
            html = html.replace(/<head[^>]*>/i, (m) => `${m}\n${injection}`);
          } else {
            html = `${injection}${html}`;
          }
          // Also inject a DOMContentLoaded script as belt-and-suspenders
          const script = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  var sels = ['header','nav','footer','.site-header','.site-footer','#masthead','#colophon','.main-navigation','.primary-navigation','.top-bar','.header','.elementor-location-header','.elementor-location-footer','.menu-toggle','.mobile-menu'];
  sels.forEach(function(s){ document.querySelectorAll(s).forEach(function(el){ el.style.setProperty('display','none','important'); }); });
});
</script>`;
          if (/<\/body>/i.test(html)) {
            html = html.replace(/<\/body>/i, `${script}</body>`);
          } else {
            html += script;
          }

          return new Response(html, { status: upstream.status, headers });
        }

        // Non-HTML: stream through (PDFs, etc. — but our allowed host serves both)
        const buf = await upstream.arrayBuffer();
        return new Response(buf, { status: upstream.status, headers });
      },
    },
  },
});
