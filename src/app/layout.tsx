import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { DesignProvider } from "@/components/DesignProvider";
import { DEFAULT_DESIGN, designCss, getDesign } from "@/lib/design";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Тихая долина — онлайн-ферма",
  description: "Мобильная онлайн-игра: огород, животные, рыбалка, шахты, город и живой рынок.",
  applicationName: "Тихая долина",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#244d3b",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  let design = DEFAULT_DESIGN;
  try { design = await getDesign(); } catch { /* тема по умолчанию */ }
  return (
    <html lang="ru">
      <body>
        {/* Глобальная тема и CSS из админки применяются ко всему сайту, включая /admin */}
        <style id="game-design" dangerouslySetInnerHTML={{ __html: designCss(design) }} />
        <DesignProvider design={design}>{children}</DesignProvider>
      </body>
    </html>
  );
}
