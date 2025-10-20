import React from "react";
import MenuItem from "@/shared/components/dump/molecules/menu-item";
import { FaCalculator, FaHome } from "react-icons/fa";
import Logo from "@/assets/images/logo/image_37-removebg-preview.png";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div style={{ width: 350 }}>
      <aside className="w-[350px] fixed top-0 left-0 h-full bg-secondary-blue-color border-r flex flex-col p-6 z-40">
        <Link href="/client/dashboard">
          <Image src={Logo} alt="logo" width={50} />
        </Link>
        <nav className="flex flex-col gap-2 mt-20">
          <MenuItem
            label="Dashboard"
            path="/client/dashboard"
            icon={<FaHome />}
          />
          <MenuItem
            label="Settings"
            path="/client/calculation"
            icon={<FaCalculator />}
          />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
