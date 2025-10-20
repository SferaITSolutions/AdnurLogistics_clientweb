"use client";

import React, { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import NavbarItems from "@/shared/components/dump/molecules/navbar-items";
import { useSidebarStore } from "@/features/auth/register/store/sidebarStore";

const Navbar: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();

  return (
    <header
      className="fixed top-0 right-0 flex items-center bg-white justify-between bg-primery-blue-color shadow-md h-[70px] px-6 md:px-10 w-full z-40"
      style={{ zIndex: 0 }}
    >
      <div className="flex items-center gap-3">
        {!isOpen && (
          <button onClick={toggleSidebar}>
            <MdMenu className="text-2xl text-primary-blue-color cursor-pointer" />
          </button>
        )}
        <h1 className="text-lg md:text-xl font-semibold text-primary-blue-color">
          Shaxsiy hisob raqam
        </h1>
      </div>

      <NavbarItems />
    </header>
  );
};

export default Navbar;
