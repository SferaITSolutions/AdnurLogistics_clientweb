"use client";

import {
  FaCalculator,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

import Logo from "@/shared/components/dump/atoms/Logo";
import { useGlobalStore } from "@/shared/store/globalStore";
import { Drawer } from "antd";
import { useTranslations } from "next-intl";
import MenuItem from "./menu-item";
import { formatPhone } from "@/shared/utils/formatter";
import UserDetails from "@/widgets/headers/navbar-cabinet/molecules/get-me";

export const DrawerSidebar = ({
  closeSidebar,
  isOpen,
}: {
  closeSidebar: () => void;
  isOpen: boolean;
}) => {
  const tr = useTranslations("personalNumberPage");
  const t = useTranslations("clientDashboard");
  const { setIslogout } = useGlobalStore();
  const logout = () => setIslogout(true);
  const { userInfo } = useGlobalStore();
  return (
    <Drawer
      placement="left"
      title={<span className="text-white">{tr("label")}: {userInfo?.code ?? "-"}</span>}
      onClose={closeSidebar}
      open={isOpen}
      width={400}
      className="lg:hidden bg-secondary-blue-color !text-white"
    >
      <div className="flex flex-col h-full text-white">
        <Logo />
        <nav className="flex flex-col gap-5 mt-10">
          <MenuItem
            label={t("dashboard")}
            path="/client/dashboard"
            icon={<FaHome color="white" size={26} />}
          />
          <MenuItem
            label={t("calculation")}
            path="/client/calculation"
            icon={<FaCalculator color="white" size={26} />}
          />
        </nav>
        <div className="flex flex-col gap-2 mt-10 !text-white px-4 py-2 border rounded-lg">
          {/* <span className="global-label-size text-white">{userInfo?.fullname || "-"}</span>
          <span className="global-text-size text-gray-200 truncate">{formatPhone(userInfo?.phone || "")}</span> */}
          <UserDetails
            userName={userInfo?.fullname || "-"}
            userPhone={formatPhone(userInfo?.phone || "-")}
          />
        </div>
        <div className="flex flex-col justify-end gap-3 mt-auto items-start">
          <button
            onClick={() => {
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-r-2xl shadow-sm font-medium transition-all duration-100"
          >
            <FaSignOutAlt color="red" size={26} />
            <span className="text-lg">{t("logout")}</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
};
