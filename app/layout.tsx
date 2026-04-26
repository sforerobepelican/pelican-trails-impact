import type { Metadata, Viewport } from "next";
import "@/index.css";
import { SITE_URL } from "@/lib/seo";

/**
 * Root layout — server component. Renders <html>/<body>; per-locale layout
 * sets the html lang attribute through the [locale] segment.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Turismo Comunitario en Colombia · Experiencias Auténticas | BePelican",
    template: "%s | BePelican",
  },
  description:
    "Viaja por Colombia con propósito. BePelican conecta viajeros con comunidades locales en experiencias de turismo transformador. Reserva tu próxima aventura.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08949B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <noscript>
          BePelican requires JavaScript. Please enable it to explore our community tourism experiences in Colombia.
        </noscript>
        {children}
      </body>
    </html>
  );
}
