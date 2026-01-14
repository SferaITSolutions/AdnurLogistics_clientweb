import Image from "next/image";
import Link from "next/link";
import React from "react";

import LogoTip from "@/assets/images/logo/image_37-removebg-preview.png";
export default function Logo() {
  const role = localStorage.getItem("roleName")

  return (
    <Link href={role !== "ROLE_SUPER_ADMIN" ? "/client/dashboard" : "/client/admin/prices"} className="flex items-center gap-2">
      <Image src={LogoTip} alt="logo" width={50} />
      <div className="text-2xl font-semibold flex flex-col text-white">
        <span className="font-semibold">Adnur</span>
        <span className="font-extralight">Logistics</span>
      </div>
    </Link>
  );
}
