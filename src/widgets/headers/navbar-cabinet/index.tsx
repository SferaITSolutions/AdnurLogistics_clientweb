"use client";

import React, { useState, useEffect } from "react";
import { MdMenu, MdNotifications } from "react-icons/md";
import NavbarItems from "@/shared/components/dump/molecules/navbar-items";
import { useSidebarStore } from "@/features/auth/register/store/sidebarStore";
import UserDetails from "./molecules/get-me";
import UpdateProfileModal from "@/features/update-profile/ui/update-modal";
import { useUpdateProfileModalStore } from "@/features/update-profile/lib/store";
import { Button } from "antd";
import NotificationsRoute from "./atoms/notofications-route";

const Navbar: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { openModal, closeModal } = useUpdateProfileModalStore();
  return (
    <header
      className="fixed top-0 right-0 md:!pl-[320px] flex items-center bg-white justify-between bg-primery-blue-color shadow-md h-[70px] px-6 md:px-10 w-full !z-30"
      style={{ zIndex: 0 }}
    >
      <div className="flex items-center gap-3">
        {!isOpen && (
          <button onClick={toggleSidebar} className="md:hidden">
            <MdMenu className="text-2xl text-primary-blue-color cursor-pointer" />
          </button>
        )}
        <h1 className="text-lg md:text-xl font-semibold text-primary-blue-color">
          Shaxsiy hisob raqam
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <NotificationsRoute />
        <UserDetails
          userName="John Doe"
          userPhone="+1234567890"
          onClick={() => {
            openModal("1234567890");
          }}
        />
        <NavbarItems />
      </div>
      <UpdateProfileModal />
    </header>
  );
};

export default Navbar;
