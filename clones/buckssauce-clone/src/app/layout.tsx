import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Custom display face used across headings and buttons (self-hosted from target).
const peperoncino = localFont({
  variable: "--font-peperoncino",
  src: "../../public/fonts/PeperoncinoSans-Regular.woff",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buckssauce.com"),
  title: "Bucks Sauce - Best Small-Batch BBQ Sauce | Gourmet, No HFCS | Bucks Sauce",
  description:
    "Shop small-batch BBQ sauce made with real ingredients. No high fructose corn syrup, no seed oils, no additives. Sweet heat with a balanced finish. Premium BBQ sauce built to perform.",
  icons: { icon: "/seo/favicon.png" },
  openGraph: {
    title: "Bucks Sauce - Best Small-Batch BBQ Sauce | Gourmet, No HFCS | Bucks Sauce",
    description:
      "Shop small-batch BBQ sauce made with real ingredients. No high fructose corn syrup, no seed oils, no additives. Sweet heat with a balanced finish. Premium BBQ sauce built to perform.",
    images: ["/seo/og-image.png"],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/seo/og-image.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${peperoncino.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
