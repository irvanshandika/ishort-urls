import { Sora } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pendekkan URL mu dengan mudah - iShort URLs",
  description: "Pendekkan URL-mu dengan mudah menggunakan iShort URLs",
  keywords: "Short Url",
  openGraph: {
    title: "Pendekkan URL mu dengan mudah - iShort URLs",
    description: "Pendekkan URL-mu dengan mudah menggunakan iShort URLs",
    url: "https://ishort.my.id",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className}`}>
        <NextUIProvider>{children}</NextUIProvider>
        <script async src="https://kit.fontawesome.com/c7e6574aa8.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
