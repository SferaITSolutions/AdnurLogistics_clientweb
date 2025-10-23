"use client";

import { MdMenu } from "react-icons/md";
import NavbarItems from "@/shared/components/dump/molecules/navbar-items";
import NotificationsRoute from "./atoms/notofications-route";
import React from "react";
import UpdateProfileModal from "@/features/update-profile/ui/update-modal";
import UserDetails from "./molecules/get-me";
import { formatPhone } from "@/shared/utils/formatter";
import { useMe } from "./hook/hook";
import { useSidebarStore } from "@/features/auth/register/store/sidebarStore";
import { useUpdateProfileModalStore } from "@/features/update-profile/lib/store";

const Navbar: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { openModal } = useUpdateProfileModalStore();
  const { data } = useMe();
  const info = data?.data;

  return (
    <header
      className="fixed top-0 right-0 lg:!pl-[320px] flex items-center bg-white justify-between bg-primery-blue-color shadow-md h-[70px] px-6 lg:px-10 w-full !z-30"
      style={{ zIndex: 0 }}
    >
      <div className="flex items-center justify-center gap-3">
        {!isOpen && (
          <button onClick={toggleSidebar} className="lg:hidden">
            <MdMenu className="text-2xl text-primary-blue-color cursor-pointer" />
          </button>
        )}
        <h1 className="text-md lg:text-xl font-semibold text-gray-500 !mb-0">
          {/* {info?.code ? `Shaxsiy raqam: ${info?.code}` : null} */}
          Shaxsiy raqam: {info?.code || "-"}
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <NotificationsRoute />
        <UserDetails
          userName={info?.fullname || ""}
          userPhone={formatPhone(info?.phone || "")}
          onClick={() => openModal(info?.fullname || "")}
        />
        <NavbarItems />
      </div>
      <UpdateProfileModal />
    </header>
  );
};

export default Navbar;
