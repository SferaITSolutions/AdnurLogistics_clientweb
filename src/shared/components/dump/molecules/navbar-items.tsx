import LanguageSwitcher from "@/features/change-language/ui";
import React from "react";

export default function NavbarItems() {
  const role = localStorage.getItem("roleName");

  return (
    <div className="flex items-center gap-6">
      {["ROLE_USER"].includes(role ?? "") && (
        <LanguageSwitcher />
      )}
    </div>
  );
}