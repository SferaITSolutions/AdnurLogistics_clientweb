"use client";

import { FaCalculator, FaDollarSign, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import Logo from "@/shared/components/dump/atoms/Logo";
import { useGlobalStore } from "@/shared/store/globalStore";
import { Drawer, Select } from "antd";
import { useTranslations } from "next-intl";
import MenuItem from "./menu-item";
// import { formatPhone } from "@/shared/utils/formatter";
import UserDetails from "@/widgets/headers/navbar-cabinet/molecules/get-me";
import { MdNotifications } from "react-icons/md";
import { useSidebarStore } from "@/features/auth/register/store/sidebarStore";
import { useEntityIds } from "@/services/users/hook";
import { useMe } from "@/widgets/headers/navbar-cabinet/hook/hook";
import { formatPhoneTR } from "@/shared/utils/formatter";

export const DrawerSidebar = ({
  closeSidebar,
  isOpen,
}: {
  closeSidebar: () => void;
  isOpen: boolean;
}) => {
  const role = localStorage.getItem("roleName");
  const { toggleSidebar, selectedEntityId, setSelectedEntityId } = useSidebarStore();
  const { data: entityids } = useEntityIds();
  const { data } = useMe();

  const tr = useTranslations("personalNumberPage");
  const t = useTranslations("");
  const { setIslogout } = useGlobalStore();
  const logout = () => setIslogout(true);
  const { userInfo } = useGlobalStore();
  const handleEntityChange = (value: string) => {
    setSelectedEntityId(value);
  };
  const formatPhone = (value: string, withoutPrefix?: boolean): string => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");

    let formatted = digits;

    if (formatted.startsWith("998")) {
      formatted = formatted.slice(3);
    }

    const formattedNumber =
      (formatted.substring(0, 2) ? formatted.substring(0, 2) : "") +
      (formatted.substring(2, 5) ? " " + formatted.substring(2, 5) : "") +
      (formatted.substring(5, 7) ? " " + formatted.substring(5, 7) : "") +
      (formatted.substring(7, 9) ? " " + formatted.substring(7, 9) : "");

    return withoutPrefix ? formattedNumber : "+998 " + formattedNumber;
  };
  return (
    <Drawer
      placement="left"
      title={
        <div className="flex items-center justify-start gap-3">
          {/* <div>
            <span className="text-white text-base font-semibold">
              {tr("label")}: {userInfo?.code ?? "-"}
            </span>
          </div> */}
          {role === "ROLE_USER" && entityids?.result?.ids && entityids.result.ids.length > 0 && (
            <div className="hidden lg:block">
              {t("accountNumber")}: {" "}
              <Select
                value={selectedEntityId}
                onChange={handleEntityChange}
                placeholder={t("label")}
                style={{ minWidth: 200 }}
                size="large"
                className="font-semibold"
                options={entityids.result.ids.map((id: string) => ({
                  label: `${id}`,
                  value: id,
                }))}
              />
            </div>
          )}
        </div>
      }
      onClose={closeSidebar}
      open={isOpen}
      width={400}
      className="lg:hidden"
      // classNames={{
      //   body: "bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600 text-white",
      //   header:
      //     "bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white",
      // }}
      closeIcon={
        <span className="text-white text-xl hover:text-gray-300 transition-colors">
          ✕
        </span>
      }
      classNames={{
        body: "bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600 text-white",
        header:
          "bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white [&_.ant-drawer-close]:text-white [&_.ant-drawer-close:hover]:text-gray-200",
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

          {role === "ROLE_USER" && data?.data?.code && (
            <MenuItem
              label={t("clientDashboard.dashboard")}
              path={`/client/dashboard`}
              icon={<FaHome size={22} />}
            />
          )}
          {role === "ROLE_USER" && (
            <MenuItem
              label={t("clientDashboard.calculation")}
              path={`/client/calculation`}
              icon={<FaCalculator size={22} />}
            />
          )}
          {role === "ROLE_SUPER_ADMIN" && (
            <MenuItem
              label={t("pricesTable.prices")}
              path={`/client/admin/prices`}
              icon={<FaHome size={22} />}
            />
          )}
          {role === "ROLE_SUPER_ADMIN" && (
            <MenuItem
              label={t("pricesTable.users")}
              path={`/client/admin/users`}
              icon={<FaUser size={22} />}
            />
          )}
          {role === "ROLE_SUPER_ADMIN" && (
            <MenuItem
              label={t("pricesTable.locations")}
              path={`/client/admin/locations`}
              icon={<FaCalculator size={22} />}
            />
          )}
          {role === "ROLE_SUPER_ADMIN" && (
            <MenuItem
              label={"Xabarnoma"}
              path={`/client/admin/notifications`}
              icon={<MdNotifications size={22} />}
            />
          )}
          {role === "ROLE_CONTROLLER" && (
            <MenuItem
              label={"Savdo buyurtmalari"}
              path={`/client/sales-manager`}
              icon={<FaDollarSign size={22} />}
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
                userPhone={userInfo?.phone.startsWith("998") ? formatPhone(userInfo?.phone || "-") : formatPhoneTR(userInfo?.phone || "-")}
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
