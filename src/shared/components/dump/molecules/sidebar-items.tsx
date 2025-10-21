import React from "react";
import { FaCalculator, FaHome } from "react-icons/fa";
import MenuItem from "@/shared/components/dump/molecules/menu-item";
import { usePathname } from "next/navigation";

export default function SidebarItems() {
  const pathname = usePathname();
  // Get current lang from url, assuming first segment: /{lang}/...
  const segments = pathname.split("/").filter(Boolean);
  const currentLang = segments.length > 0 ? segments[0] : "en";

  return (
    <nav className="flex flex-col gap-3 mt-10 text-white z-50">
      <MenuItem
        label="Dashboard"
        path={`/${currentLang}/client/dashboard`}
        icon={<FaHome color="white" />}
      />
      <MenuItem
        label="Calculation"
        path={`/${currentLang}/client/calculation`}
        icon={<FaCalculator />}
      />
    </nav>
  );
}
