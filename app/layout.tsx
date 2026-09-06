import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import { getPortfolioData } from "@/lib/sanity/getPortfolioData";
import PortfolioProvider from "@/components/layout/PortfolioProvider";

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
  other: {
    'theme-color': '#0a0e27',
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const data = await getPortfolioData()
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PortfolioProvider data={data}>
          <LayoutShell>{children}</LayoutShell>
        </PortfolioProvider>
      </body>
    </html>
  );
}
