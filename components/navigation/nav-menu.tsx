"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/shadcn";
import {
  Gift,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Wallet,
} from "lucide-react";

export interface NavMenuProps {
  onNavigate?: () => void;
  className?: string;
}

export default function NavMenu({ onNavigate, className }: NavMenuProps) {
  return (
    <nav className={className}>
      <ul className="space-y-1">
        {/* ANALYTICS SECTION */}
        <NavLabel>Analytics</NavLabel>
        <NavEntry href="/dashboard" onClick={onNavigate}>
          <LayoutDashboard className="mr-2 size-4" /> Dashboard
        </NavEntry>

        {/* STORE SECTION */}
        <NavLabel>Store</NavLabel>
        <NavEntry href="/inventory" onClick={onNavigate}>
          <Package className="mr-2 size-4" /> Inventory
        </NavEntry>
        <NavEntry href="/promotions" onClick={onNavigate}>
          <Gift className="mr-2 size-4" /> Promotions
        </NavEntry>

        {/* HISTORY SECTION */}
        <NavLabel>History</NavLabel>
        <NavEntry href="/orders" onClick={onNavigate}>
          <ShoppingCart className="mr-2 size-4" /> Orders
        </NavEntry>
        <NavEntry href="/payments" onClick={onNavigate}>
          <Wallet className="mr-2 size-4" /> Payments
        </NavEntry>
      </ul>
    </nav>
  );
}

function NavLabel({ children }: { children: ReactNode }) {
  return <div className="p-1 text-sm text-muted-foreground">{children}</div>;
}

interface NavEntryProps {
  href: string;
  onClick?: () => void;
  children: ReactNode;
}

function NavEntry({ href, onClick, children }: NavEntryProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "block p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md hover:text-foreground",
          isActive &&
            "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground",
        )}
      >
        <div className="flex flex-row items-center">{children}</div>
      </Link>
    </li>
  );
}
