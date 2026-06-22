import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://berkat-unggas-farm.vercel.app"),
  title: {
    template: "%s | Jaya Abadi Poultry",
    default: "Jaya Abadi Poultry - Supplier DOC Ayam, Bibit Unggas, Telur & Daging Frozen Berkualitas",
  },
  description:
    "Supplier bibit unggas, telur, karkas, dan daging frozen berkualitas sejak 2018. Menyediakan DOC ayam, itik, angsa, entok dengan harga transparan. Melayani pengiriman seluruh Pulau Jawa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${nunito.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
