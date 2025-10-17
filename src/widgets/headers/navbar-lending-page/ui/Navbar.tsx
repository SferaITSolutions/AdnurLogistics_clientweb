"use client";
import { Logo } from "../atoms/Logo";
import { NavLinksGroup } from "../molecules/NavlinkGroup";
import { Button, Drawer } from "antd";
import { FaArrowRight, FaBars } from "react-icons/fa";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed  flex justify-between items-center  top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <nav className=" flex justify-between items-center  container w-full">
        <Logo />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinksGroup />
          <Button type="primary" className="rounded-full px-5">
            <FaArrowRight />
            Kirish
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <Button
            type="text"
            icon={<FaBars className="text-gray-700 text-xl" />}
            onClick={() => setOpen(true)}
            className=""
          />
        </div>
      </nav>

      {/* Drawer (Mobile Menu) */}

      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        title={<Logo />}
        bodyStyle={{ paddingTop: "1rem" }}
      >
        <NavLinksGroup onClick={() => setOpen(false)} />
        <Button
          type="primary"
          className="mt-4 w-full rounded-full"
          onClick={() => setOpen(false)}
        >
          <FaArrowRight />
          Kirish
        </Button>
      </Drawer>
    </header>
  );
};
