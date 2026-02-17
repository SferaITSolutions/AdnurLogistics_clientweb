"use client";

import { FaCalculator, FaDollarSign, FaHome, FaNewspaper, FaUser } from "react-icons/fa";
import MenuItem from "@/shared/components/dump/molecules/menu-item";
import { useTranslations } from "next-intl";
import { MdNotifications } from "react-icons/md";
import { useMe } from "@/widgets/headers/navbar-cabinet/hook/hook";
import { AiFillProduct } from "react-icons/ai";

export default function SidebarItems() {
  const t = useTranslations("");
  const role = localStorage.getItem("roleName");
  const { data } = useMe();

  return (
    <nav className="flex flex-col gap-3 mt-12 text-white z-50">
      {/* Section Title */}
      {/* <div className="flex items-center gap-2 px-4 mb-2">
        <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />
        <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
          Navigation
        </span>
      </div> */}

      {role === "ROLE_USER" && (
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
      {/* {role === "ROLE_SUPER_ADMIN" && (
        <MenuItem
          label={t("pricesTable.prices")}
          path={`/client/admin/prices`}
          icon={<FaHome size={22} />}
        />
      )} */}
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
          label={"Hizmat turi"}
          path={`/client/admin/products`}
          icon={<AiFillProduct size={22} />}
        />
      )}
      {role === "ROLE_SUPER_ADMIN" && (
        <MenuItem
          label={"Yangiliklar"}
          path={`/client/admin/news`}
          icon={<FaNewspaper size={22} />}
        />
      )}
      {role === "ROLE_SUPER_ADMIN" && (
        <MenuItem
          label={"Versiya sozlamalari"}
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
  );
}
