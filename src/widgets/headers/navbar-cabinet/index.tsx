"use client";
import { useSidebarStore } from "@/features/auth/register/store/sidebarStore";
import NavbarItems from "@/shared/components/dump/molecules/navbar-items";
import { formatPhone } from "@/shared/utils/formatter";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { MdMenu } from "react-icons/md";
import NotificationsRoute from "./atoms/notofications-route";
import { useMe } from "./hook/hook";
import UserDetails from "./molecules/get-me";
import { useGlobalStore } from "@/shared/store/globalStore";

const Navbar: React.FC = () => {
  const t = useTranslations("personalNumberPage");
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { data } = useMe();
  const { setUserInfo } = useGlobalStore();
  const info = data?.data;
  useEffect(() => {
    if (info) {
      setUserInfo(info);
    }
  }, [info]);
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
        <h1 className="text-md hidden lg:block lg:text-lg font-semibold text-gray-500 !mb-0">
          {t("label")}: {info?.code ?? "-"}
        </h1>
      </div>
      <div className="items-center gap-5 flex">
        <div className="hidden lg:block">
          <NotificationsRoute />
        </div>
        <div className="hidden lg:block">
          <UserDetails
            userName={info?.fullname || ""}
            userPhone={formatPhone(info?.phone || "")}
          />
        </div>
        <NavbarItems />
      </div>
    </header>
  );
};

export default Navbar;
