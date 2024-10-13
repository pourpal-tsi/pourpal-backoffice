import React, { ReactNode } from "react";
import type { Metadata } from "next";

import RootProvider from "@/app/provider";
import { Toaster } from "@/components/ui/toaster";

import ProfileAvatar from "@/components/user/profile-avatar";
import ThemeToggle from "@/components/user/theme-toggle";
import NavButton from "@/components/navigation/nav-button";
import NavMenu from "@/components/navigation/nav-menu";

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
          <div className="flex h-screen flex-col lg:flex-row">
            {/* PAGE SIDEBAR (ONLY FOR LARGE SCREENS) */}
            <aside className="hidden w-full max-w-xs shrink-0 flex-col overflow-auto bg-white p-2 dark:bg-zinc-900 lg:flex">
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
            <div className="sticky left-0 top-0 z-50 flex items-center gap-2 border-b border-border bg-background p-4 lg:hidden">
              <NavButton />
              <h4 className="text-xl">PourPal</h4>
              <div className="ml-auto flex gap-5">
                <ThemeToggle />
                <ProfileAvatar />
              </div>
            </div>

            {/* PAGE CONTENT */}
            <main className="grow bg-zinc-50 p-6 dark:bg-zinc-950 lg:overflow-auto">
              {children}
            </main>
          </div>
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
