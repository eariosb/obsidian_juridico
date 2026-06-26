import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getAllModules, getTotalModules } from "@/lib/content";
import { Sidebar } from "@/components/layout/Sidebar";
import { SearchBar } from "@/components/layout/SearchBar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ProgressProvider } from "@/components/course/ProgressProvider";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Curso Obsidian para Despachos Jurídicos",
  description:
    "Plataforma educativa para enseñar a despachos jurídicos cómo adoptar Obsidian como sistema de gestión de conocimiento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modules = getAllModules();
  const total = getTotalModules();

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ProgressProvider totalModules={total}>
            <MobileSidebar modules={modules} />
            <div className="flex min-h-screen">
              <aside className="hidden w-72 shrink-0 border-r border-border bg-card md:block sticky top-0 h-screen overflow-y-auto">
                <div className="flex items-center justify-between p-4 pb-2">
                  <span className="text-sm font-semibold">Curso Obsidian</span>
                  <ThemeToggle />
                </div>
                <SearchBar modules={modules} />
                <Sidebar modules={modules} />
              </aside>
              <main className="flex-1">
                {children}
                <Footer />
              </main>
            </div>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
