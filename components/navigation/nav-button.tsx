"use client";

import { useEffect, useState } from "react";
import NavMenu from "@/components/navigation/nav-menu";
import useMediaQuery from "@/hooks/use-media-query";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcnui/sheet";

export default function NavButton() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
      <SheetContent side="left" className="w-full overflow-auto md:hidden">
        <NavMenu onNavigate={() => setIsNavbarOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
