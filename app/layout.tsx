import { Sora } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import Script from "next/script";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shorten Your URL Easily - iShort URLs",
  description: "Pendekkan URL-mu dengan mudah menggunakan iShort URLs",
  keywords: "Short Url",
  openGraph: {
    title: "Shorten Your URL Easily - iShort URLs",
    description: "Pendekkan URL-mu dengan mudah menggunakan iShort URLs",
    url: "https://ishort.my.id",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} bg-gray-100`}>
        <NextUIProvider>{children}</NextUIProvider>
        <script async src="https://kit.fontawesome.com/c7e6574aa8.js" crossOrigin="anonymous"></script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GHCHMVJH3X" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GHCHMVJH3X');
          `}
        </Script>
      </body>
    </html>
  );
}
