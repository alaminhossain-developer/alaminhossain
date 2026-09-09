import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Md. Al Amin Hossain — WordPress & Shopify Developer",
  description: "WordPress & Shopify developer specializing in high-performance web experiences.",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  other: {
    'theme-color': '#0a0e27',
    'google-site-verification': 'atMxay4XTb_fbi7p-ozVNQgbdiDB3LUq8idEXNqSk1c',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LayoutShell>{children}</LayoutShell>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-17TKND8540"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-17TKND8540');`}
        </Script>
      </body>
    </html>
  );
}
