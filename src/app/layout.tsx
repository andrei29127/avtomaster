import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "АвтоМастер — Техцентр в Керчи",
  description:
    "АвтоМастер — техцентр: ремонт авто и запчасти в Керчи. Подбор по VIN, консультация, обратная связь.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground pb-24`}
      >
        {children}
        <Toaster />

        {/* GLOBAL STICKY ACTION BAR */}
        <div
          className="mobile-bottom-bar"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", maxWidth: "700px", margin: "0 auto" }}>
            <a href="#feedback-form" style={{ flex: 1 }}>
              <button
                style={{
                  width: "100%",
                  background: "linear-gradient(90deg,#ff7a18,#ffb347)",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  border: "none",
                }}
              >
                🚗 Заявка
              </button>
            </a>

            <a href="#contact-form" style={{ flex: 1 }}>
              <button
                style={{
                  width: "100%",
                  background: "#22c55e",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  border: "none",
                }}
              >
                💬 Связь
              </button>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}




