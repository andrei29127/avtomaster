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

const MAINTENANCE_MODE = true;

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground ${MAINTENANCE_MODE ? "" : "pb-24"}`}
      >
        {MAINTENANCE_MODE ? (
          <main className="min-h-screen bg-black flex items-center justify-center text-white px-6">
            <div className="text-center max-w-xl">
              <h1 className="text-4xl font-bold mb-6">АвтоМастер</h1>
              <p className="text-lg text-white/80 mb-4">На сайте ведутся технические работы</p>
              <p className="text-white/60 mb-8">Мы скоро вернемся онлайн 🚗</p>
              <div className="border border-white/20 rounded-2xl p-6 bg-white/5">
                <p className="text-sm text-white/70 mb-2">
                  Если вопрос срочный — свяжитесь с нами по телефону
                </p>
                <p className="text-xl font-semibold">+7(978)088-41-06  +7(978)858-25-38</p>
              </div>
            </div>
          </main>
        ) : (
          children
        )}
        {!MAINTENANCE_MODE && <Toaster />}

        {!MAINTENANCE_MODE && (
          <>
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
            <a href="#contact-form" style={{ flex: 1 }}>
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

            <a href="#feedback-form" style={{ flex: 1 }}>
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
          </>
        )}
      </body>
    </html>
  );
}




