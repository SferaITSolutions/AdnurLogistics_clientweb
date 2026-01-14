"use client";

import { FaCalculator, FaHome, FaSignOutAlt } from "react-icons/fa";
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
  const role = localStorage.getItem("roleName")
  const tr = useTranslations("personalNumberPage");
  const t = useTranslations("clientDashboard");
  const { setIslogout } = useGlobalStore();
  const logout = () => setIslogout(true);
  const { userInfo } = useGlobalStore();

  return (
    <Drawer
      placement="left"
      title={
        <div className="flex items-center justify-start gap-3">
          <div>
            <span className="text-white text-base font-semibold">
              {tr("label")}: {userInfo?.code ?? "-"}
            </span>
          </div>
        </div>
      }
      onClose={closeSidebar}
      open={isOpen}
      width={400}
      className="lg:hidden"
      classNames={{
        body: "bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600 text-white",
        header:
          "bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white",
      }}
    >
      <div className="flex flex-col h-full  relative">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <Logo />
        </div>

        <nav className="relative !text-white z-10 flex flex-col gap-3 mt-10">
          {/* Section Title */}
          {/* <div className="flex items-center gap-2 px-4 mb-2">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Navigation
            </span>
          </div> */}

          {role !== "ROLE_SUPER_ADMIN" && (
            <MenuItem
              label={t("dashboard")}
              path={`/client/dashboard`}
              icon={<FaHome size={22} />}
            />
          )}
          {role !== "ROLE_SUPER_ADMIN" && (
            <MenuItem
              label={t("calculation")}
              path={`/client/calculation`}
              icon={<FaCalculator size={22} />}
            />
          )}
          {role === "ROLE_SUPER_ADMIN" && (
            <MenuItem
              label={"prices"}
              path={`/client/admin/prices`}
              icon={<FaHome size={22} />}
            />
          )}
          {role === "ROLE_SUPER_ADMIN" && (
            <MenuItem
              label={"locations"}
              path={`/client/admin/locations`}
              icon={<FaCalculator size={22} />}
            />
          )}
        </nav>

        {/* User Info Card */}
        <div className="relative z-10 flex flex-col gap-3 mt-10 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <span className=" font-bold text-xl">
                {userInfo?.fullname?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1">
              <UserDetails
                userName={userInfo?.fullname || "-"}
                userPhone={formatPhone(userInfo?.phone || "-")}
              />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="relative z-10 flex flex-col justify-end gap-3 mt-auto items-start">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-2" />

          <button
            onClick={logout}
            className="group w-full flex items-center gap-4 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-400/50 text-white shadow-lg hover:shadow-red-500/20 font-medium transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 border border-red-400/30 group-hover:border-red-400/50 transition-all duration-300">
              <FaSignOutAlt
                className="text-red-400 group-hover:text-red-300"
                size={20}
              />
            </div>
            <span className="text-base font-semibold group-hover:translate-x-1 transition-transform duration-300">
              {t("logout")}
            </span>
          </button>
        </div>
      </div>
    </Drawer>
  );
};
