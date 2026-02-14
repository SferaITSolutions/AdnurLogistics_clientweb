"use client";
import { useSidebarStore } from "@/features/auth/register/store/sidebarStore";
import NavbarItems from "@/shared/components/dump/molecules/navbar-items";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { MdMenu } from "react-icons/md";
import NotificationsRoute from "./atoms/notofications-route";
import { useMe } from "./hook/hook";
import UserDetails from "./molecules/get-me";
import { useGlobalStore } from "@/shared/store/globalStore";
import { useEntityIds } from "@/services/users/hook";
import { Image, Select } from "antd";
import { FaEye } from "react-icons/fa";
import { formatPhoneTR } from "@/shared/utils/formatter";

const Navbar: React.FC = () => {
  const t = useTranslations("personalNumberPage");
  const { isOpen, toggleSidebar, selectedEntityId, setSelectedEntityId } = useSidebarStore();
  const { data } = useMe();
  const { setUserInfo } = useGlobalStore();
  const role = localStorage.getItem("roleName");
  const { data: entityids } = useEntityIds();
  const info: any = data?.data;

  useEffect(() => {
    if (info) {
      setUserInfo(info);
    }
  }, [info, role]);

  // Set default value when entityids are loaded
  useEffect(() => {
    if (entityids?.result?.ids && entityids.result.ids.length > 0 && !selectedEntityId) {
      // Set the one matching info.code or the first one
      const defaultId = entityids.result.ids.find(
        (id: string) => id === info?.code
      ) || entityids.result.ids[0];
      setSelectedEntityId(defaultId);
    }
  }, [entityids, info?.code, selectedEntityId, setSelectedEntityId]);

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

  const handleEntityChange = (value: string) => {
    setSelectedEntityId(value);
  };

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
      <div className="items-center gap-5 flex">
        <div className="hidden lg:block">
          {info?.imgUrl ?
            <Image
              src={info?.imgUrl}
              alt="User image"
              width={50}
              height={50}
              className="rounded-full object-cover"
              preview={{
                mask: <div><FaEye/></div>,
              }}
            />
            : <NotificationsRoute />}
        </div>
        <div className="hidden lg:block">
          <UserDetails
            userName={info?.fullname || ""}
            userPhone={info?.phone.startsWith("998") ? formatPhone(info?.phone || "-") : formatPhoneTR(info?.phone || "-")}
          />
        </div>
        <NavbarItems />
      </div>
    </header>
  );
};

export default Navbar;