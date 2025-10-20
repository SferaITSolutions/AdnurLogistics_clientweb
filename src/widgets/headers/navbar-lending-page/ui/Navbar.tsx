"use client";
import { Logo } from "../atoms/Logo";
import { NavLinksGroup } from "../molecules/NavlinkGroup";
import { Button, Drawer } from "antd";
import { FaArrowRight, FaBars } from "react-icons/fa";
import { useState } from "react";
import { ButtonPrimary, ButtonSecondary } from "@/shared/components/dump/atoms/button";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const navigate = useRouter();
  return (
    <header className="fixed  flex justify-between items-center  top-0 left-0 w-full bg-white shadow-sm z-50">
      <nav className=" flex justify-between items-center  container mx-auto w-full">
        <Logo />

        {/* Desktop nav links */}
        <div className="flex items-center gap-6 justify-center">
          <ButtonPrimary
            type="primary"
            label="Kirish"
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
