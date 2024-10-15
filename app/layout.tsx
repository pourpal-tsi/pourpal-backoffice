import React, { ReactNode } from "react";
import type { Metadata } from "next";

import RootProvider from "@/app/provider";
import { Toaster } from "@/components/ui/toaster";

import { fontMono, fontSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "PourPal - Backoffice",
  description: "Administrator dashboard for the PourPal sales system.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} antialiased`}
    >
      <body>
        <RootProvider>
          {children}
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
