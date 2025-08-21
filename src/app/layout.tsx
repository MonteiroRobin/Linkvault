import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkVault - Gestionnaire de Liens Personnel",
  description: "LinkVault est une application web moderne et intuitive pour organiser, rechercher et gérer vos liens favoris avec un système de tags avancé.",
  keywords: "gestionnaire de liens, bookmarks, organisation, tags, productivité, web app",
  authors: [{ name: "LinkVault Team" }],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "LinkVault - Gestionnaire de Liens Personnel",
    description: "Organisez et gérez vos liens favoris avec notre système de tags avancé",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
