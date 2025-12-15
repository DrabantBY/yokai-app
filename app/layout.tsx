import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Roboto } from "next/font/google";

import { TanStackQueryProvider } from "@/providers";

import "./globals.scss";

const roboto = Roboto({
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={`${roboto.className}`}>
        <TanStackQueryProvider>
          <div id="root">
            <main>{children}</main>
          </div>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
