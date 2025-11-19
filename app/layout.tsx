import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";

import { Providers } from "./providers";
import Footer from "@/components/footer";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Whatsapp from "@/components/Whatsapp";
import MobileBottomNav from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "vkjKXPVsw2gB_sOt84rzFAtxBge-py5YBLIdS9Z8s3E",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9RF3KKDVY7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9RF3KKDVY7');
          `}
        </Script>
      </head>
      <body
        className={clsx(
          "bg-white dark:bg-black font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-full">
            <Navbar />
            <main className="mx-auto max-w-screen pt-6 flex-grow">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
            <Whatsapp />
          </div>
        </Providers>
      </body>
    </html>
  );
}
