import React, { ReactNode } from "react";
import type { Metadata } from "next";

import RootProvider from "@/app/providers";
import { Toaster } from "@/components/shadcnui/toaster";

import ProfileAvatar from "@/components/user/profile-avatar";
import ThemeToggle from "@/components/user/theme-toggle";
import NavButton from "@/components/navigation/nav-button";
import NavMenu from "@/components/navigation/nav-menu";

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PourPal - Backoffice",
  description: "Administrator dashboard for the PourPal sales system.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <RootProvider>
          <div className="flex h-screen flex-col md:flex-row">
            {/* PAGE SIDEBAR (ONLY FOR LARGE SCREENS) */}
            <aside className="hidden w-full max-w-xs flex-col overflow-auto bg-white p-2 dark:bg-zinc-900 md:flex">
              <header className="border-b border-b-zinc-100 pb-2 dark:border-b-zinc-800">
                <h4 className="p-2 text-xl">PourPal</h4>
              </header>
              <NavMenu className="grow py-4" />
              <footer className="flex items-center gap-2 border-t border-t-zinc-100 p-4 dark:border-t-zinc-800">
                <ProfileAvatar />
                <ThemeToggle className="ml-auto" />
              </footer>
            </aside>

            {/* PAGE HEADER (ONLY FOR SMALL SCREENS) */}
            <div className="sticky left-0 top-0 flex items-center gap-5 border-b border-border bg-background p-4 md:hidden">
              <NavButton />
              <h4 className="text-xl">PourPal</h4>
              <div className="ml-auto flex gap-5">
                <ThemeToggle />
                <ProfileAvatar />
              </div>
            </div>

            {/* PAGE CONTENT */}
            <main className="grow bg-zinc-50 p-6 dark:bg-zinc-950">
              {children}
            </main>
          </div>
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
