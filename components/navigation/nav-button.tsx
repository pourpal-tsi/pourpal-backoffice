"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcnui/sheet";

import NavMenu from "@/components/navigation/nav-menu";

export default function NavButton() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (!isMobile) setIsNavbarOpen(false);
  }, [isMobile]);

  return (
    <Sheet open={isNavbarOpen} onOpenChange={setIsNavbarOpen}>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetTitle />
      <SheetDescription />
      <SheetContent side="left" className="w-full overflow-auto lg:hidden">
        <NavMenu onNavigate={() => setIsNavbarOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
