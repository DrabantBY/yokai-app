import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.scss";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yokai App",
  description: "test task from Green City Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
