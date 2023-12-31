import { ReactNode } from "react";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

import Provider from "@/app/_trpc/Provider";

import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wizard Maker',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
