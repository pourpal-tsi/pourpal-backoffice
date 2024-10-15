import NavMenu from "@/components/navigation/nav-menu";
import ProfileAvatar from "@/components/user/profile-avatar";
import NavButton from "@/components/navigation/nav-button";
import { ColorSchemeSelector } from "@/components/color-scheme/color-scheme-selector";
import React, { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* PAGE SIDEBAR (ONLY FOR LARGE SCREENS) */}
      <aside className="hidden w-full max-w-xs shrink-0 flex-col overflow-auto border-r border-r-zinc-100 bg-white p-2 dark:border-r-zinc-800 dark:bg-zinc-900 lg:flex">
        <header className="border-b border-b-zinc-100 pb-2 dark:border-b-zinc-800">
          <h4 className="p-2 text-xl">PourPal</h4>
        </header>
        <NavMenu className="grow py-4" />
        <footer className="flex items-center gap-2 border-t border-t-zinc-100 p-4 dark:border-t-zinc-800">
          <ProfileAvatar />
          <ColorSchemeSelector className="ml-auto" />
        </footer>
      </aside>

      {/* PAGE HEADER (ONLY FOR SMALL SCREENS) */}
      <div className="sticky left-0 top-0 z-50 flex items-center gap-2 border-b border-border bg-background p-4 lg:hidden">
        <NavButton />
        <h4 className="text-xl">PourPal</h4>
        <div className="ml-auto flex gap-5">
          <ColorSchemeSelector />
          <ProfileAvatar />
        </div>
      </div>

      {/* PAGE CONTENT */}
      <main className="grow bg-zinc-50 p-6 dark:bg-zinc-950 lg:overflow-auto">
        {children}
      </main>
    </div>
  );
}
