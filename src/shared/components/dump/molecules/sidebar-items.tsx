import React from "react";
import { FaCalculator, FaHome } from "react-icons/fa";
import MenuItem from "@/shared/components/dump/molecules/menu-item";

export default function SidebarItems() {
  return (
    <nav className="flex flex-col gap-3 mt-10 text-white z-50">
      <MenuItem
        label="Dashboard"
        path="/client/dashboard"
        icon={<FaHome color="white" />}
      />
      <MenuItem
        label="Calculation"
        path="/client/calculation"
        icon={<FaCalculator />}
      />
    </nav>
  );
}
