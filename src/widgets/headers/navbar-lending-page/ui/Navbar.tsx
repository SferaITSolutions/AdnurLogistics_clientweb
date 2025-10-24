"use client";
import { Logo } from "../atoms/Logo";
import { NavLinksGroup } from "../molecules/NavlinkGroup";
import { Button, Drawer } from "antd";
import { FaArrowRight, FaBars } from "react-icons/fa";
import { useState } from "react";
import { ButtonPrimary, ButtonSecondary } from "@/shared/components/dump/atoms/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/features/change-language/ui";

export const Navbar = () => {
  const navigate = useRouter();
  const t = useTranslations("LendingPage.header");
  return (
    <header className="fixed  flex justify-between items-center  top-0 left-0 w-full bg-white shadow-sm z-50">
      <nav className=" flex justify-between items-center  container mx-auto w-full">
        <Logo />

        {/* Desktop nav links */}
        <div className="flex items-center gap-6 justify-center">
        <LanguageSwitcher />
          <ButtonPrimary
            type="primary"
            label={t("login")}
            Icon={<FaArrowRight color="#fff" />}
            onClick={() => {
              navigate.push("/auth/log-in");
            }}
          />
        </div>
      </nav>
    </header>
  );
};
