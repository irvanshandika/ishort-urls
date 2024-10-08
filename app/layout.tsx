/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import { Sora } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shorten Your URL Easily - iShort URLs",
  description: "Shorten Your URLs Easily With iShort URLs",
  keywords: "Short Url, iShort URLs, Shorten URL, URL Shortener",
  openGraph: {
    title: "Shorten Your URL Easily - iShort URLs",
    description: "Shorten Your URLs Easily With iShort URLs",
    url: "https://ishort.my.id",
    type: "website",
    images:
      "https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/ishort.my.id/Shorten%20Your%20URL%20Easily%20-%20iShort%20URLs/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F56188dc2-e3c3-4ce5-a8b1-1323953e37b9.jpg%3Ftoken%3DhOY-wLL-tV2Wb6eqlpzb3hUOqYMZbXQ3az2flBDqaSs%26height%3D800%26width%3D1200%26expires%3D33251249770/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ishort.my.id" />
        <meta property="twitter:url" content="https://ishort.my.id" />
        <meta name="twitter:title" content="Shorten Your URL Easily - iShort URLs" />
        <meta name="twitter:description" content="Shorten Your URLs Easily With iShort URLs" />

        <meta
          name="twitter:image"
          content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/ishort.my.id/Shorten%20Your%20URL%20Easily%20-%20iShort%20URLs/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F56188dc2-e3c3-4ce5-a8b1-1323953e37b9.jpg%3Ftoken%3DhOY-wLL-tV2Wb6eqlpzb3hUOqYMZbXQ3az2flBDqaSs%26height%3D800%26width%3D1200%26expires%3D33251249770/og.png"
        />
      </head>
      <body className={`${sora.className} bg-gray-100`}>
        <Toaster position="top-right" reverseOrder={false} />
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
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "nv5p14hnsi");
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '436612635438228');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <Image alt="Meta Pixel" height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=436612635438228&ev=PageView&noscript=1" />
        </noscript>
        <script type="text/javascript" src="https://cdn.trakteer.id/js/embed/trbtn.min.js?date=18-11-2023"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
      </body>
    </html>
  );
}
