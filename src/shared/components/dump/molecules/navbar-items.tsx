import LanguageSwitcher from "@/features/change-language/ui";
import React from "react";

export default function NavbarItems() {
  const role = localStorage.getItem("roleName");

  return (
    <div className="flex items-center gap-6">
      {["ROLE_USER", "ROLE_CONTROLLER"].includes(role ?? "") && (
        <LanguageSwitcher />
      )}
    </div>
  );
}