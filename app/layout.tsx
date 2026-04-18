import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import StickyReserveBar from "@/components/StickyReserveBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aubebrunch.com"),
  title: "Aube | French Brunch in Orlando",
  description:
    "Warm croissants, bright plates, and long brunches in Orlando. Aube is a French brunch house built for slow mornings and full tables.",
  openGraph: {
    title: "Aube | French Brunch in Orlando",
    description:
      "Warm croissants, bright plates, and long brunches in Orlando.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Aube",
              description: "French brunch in Orlando, Florida",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 W Church St",
                addressLocality: "Orlando",
                addressRegion: "FL",
                postalCode: "32801",
              },
              telephone: "+1-407-555-0100",
              url: "https://aubebrunch.com",
              servesCuisine: "French",
              priceRange: "$$",
              openingHours: ["Mo-Fr 08:00-16:00", "Sa-Su 08:00-17:00"],
            }),
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${manrope.variable} ${ibmPlexMono.variable}`}>
        {children}
        <StickyReserveBar />
      </body>
    </html>
  );
}
