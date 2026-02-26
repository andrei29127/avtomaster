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
  title: "Z.ai Code Scaffold - AI-Powered Development",
  description: "Modern Next.js scaffold optimized for AI-powered development with Z.ai. Built with TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: ["Z.ai", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  authors: [{ name: "Z.ai Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
    url: "https://chat.z.ai",
    siteName: "Z.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ paddingBottom: "80px" }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      
      {/* GLOBAL STICKY ACTION BAR */}
      <div style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        zIndex: 9999,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid #ddd",
        padding: "10px"
      }}>
        <div style={{display:"flex", gap:"10px", maxWidth:"700px", margin:"0 auto"}}>
          <a href="#contact" style={{flex:1}}>
            <button style={{
              width:"100%",
              background:"linear-gradient(90deg,#ff7a18,#ffb347)",
              color:"#fff",
              padding:"14px",
              borderRadius:"10px",
              fontWeight:700,
              border:"none"
            }}>
              🚗 Заявка
            </button>
          </a>
          <a href="#feedback" style={{flex:1}}>
            <button style={{
              width:"100%",
              background:"#22c55e",
              color:"#fff",
              padding:"14px",
              borderRadius:"10px",
              fontWeight:700,
              border:"none"
            }}>
              💬 Связь
            </button>
          </a>
        </div>
      </div>

</body>
    </html>
  );
}
