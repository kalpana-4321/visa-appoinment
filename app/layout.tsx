import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlobePass — Fast, Simple & Secure Visa Applications",
  description: "Skip agents, avoid paperwork, and apply for your visa in minutes. Secure and trusted worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
