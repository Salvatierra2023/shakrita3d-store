import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shakrita3D Store | Figuras Kawaii 3D hechas en Perú",
    template: "%s | Shakrita3D Store",
  },
  description:
    "Shakrita3D Store crea figuras kawaii 3D personalizadas en Perú. Diseño, impresión y acabado artesanal para regalos únicos.",
  keywords: [
    "figuras kawaii 3D",
    "impresión 3D Perú",
    "figuras personalizadas",
    "regalos kawaii",
    "figuras 3D personalizadas Perú",
  ],
  authors: [{ name: "Emilia - Shakrita3D Store" }],
  creator: "Emilia",
  openGraph: {
    title: "Shakrita3D Store | Figuras Kawaii 3D hechas en Perú",
    description:
      "Figuras kawaii 3D personalizadas, diseñadas e impresas en Perú con estilo kawaii elegante.",
    url: "https://shakrita3d.com", // luego lo cambiamos
    siteName: "Shakrita3D Store",
    images: [
      {
        url: "/seo-cover.png",
        width: 1200,
        height: 630,
        alt: "Shakrita3D Store - Figuras Kawaii 3D",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakrita3D Store | Figuras Kawaii 3D hechas en Perú",
    description:
      "Figuras kawaii 3D personalizadas hechas en Perú. Regalos únicos y diseños originales.",
    images: ["/seo-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
