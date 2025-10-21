import LanguageSwitcher from "@/features/change-language/ui";
import { Badge } from "antd";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";

export default function NavbarItems() {
  return (
    <div className="flex items-center gap-6">
      <LanguageSwitcher />
    </div>
  );
}
