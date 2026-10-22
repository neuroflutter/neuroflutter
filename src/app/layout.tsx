import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { siteSchema, jsonLd } from "@/lib/schema";
import "@fontsource/bodoni-moda/latin-400.css";
import "@fontsource/bodoni-moda/latin-400-italic.css";
import "@fontsource/bodoni-moda/latin-500.css";
import "@fontsource/spectral/latin-300.css";
import "@fontsource/spectral/latin-400.css";
import "@fontsource/spectral/latin-400-italic.css";
import "@fontsource/spectral/latin-500.css";
import "@fontsource/spectral/latin-600.css";
import "./globals.css";

const homeTitle = "NeuroFlutter — Neuroscience Publication & Learning Platform";
const shareImage = "/illustrations/brain-butterfly-soft.webp";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: "%s · NeuroFlutter",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Hala Al Masri" }],
  creator: "Hala Al Masri",
  publisher: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: homeTitle,
    description: site.description,
    url: `${site.url}/`,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: shareImage,
        width: 1260,
        height: 1066,
        alt: "Watercolour illustration of a human brain overlaid with a pale blue butterfly.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.description,
    images: [shareImage],
  },
  icons: { icon: "/illustrations/butterfly-teal.webp" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(siteSchema)}
        />
      </head>
      <body className="paper">
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
