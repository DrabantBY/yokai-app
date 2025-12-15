import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Inter_Tight } from "next/font/google";

import { TanStackQueryProvider } from "@/providers";

import "./globals.scss";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Yokai App",
  description: "test task from Green City Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable}`}>
        <TanStackQueryProvider>
          <div id="root">
            <main>{children}</main>
          </div>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
