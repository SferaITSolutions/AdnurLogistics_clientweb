"use client";

import React from "react";
import Logo from "@/shared/components/dump/atoms/Logo";
import SidebarItems from "@/shared/components/dump/molecules/sidebar-items";
import { DrawerSidebar } from "@/shared/components/dump/molecules/DrawerSidebar";
import { useSidebarStore } from "@/features/auth/register/store/sidebarStore";

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebarStore();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="min-w-[300px] fixed min-h-screen bg-secondary-blue-color text-white hidden md:flex flex-col p-6 z-50">
        <Logo />
        <SidebarItems />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <DrawerSidebar closeSidebar={closeSidebar} isOpen={isOpen} />
    </>
  );
};

export default Sidebar;
