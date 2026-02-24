'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoTip from "@/assets/images/logo/image_37-removebg-preview.png";
import { usePathname } from "next/navigation"; // next/navigation — URL'dagi to'liq path

export default function Logo() {
  let role = "";
  if (typeof window !== "undefined") {
    role = localStorage.getItem("roleName") || "";
  }

  const pathname = usePathname(); // /uz/client/admin/... ko'rinishida keladi
  
  // URL'dan birinchi segment — bu lang
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] || "uz";

  // Role-ga qarab bazaviy path (lang prefikssiz)
  let basePath = "";
  if (role === "ROLE_SUPER_ADMIN") {
    basePath = "/client/admin/locations";
  } else if (role === "ROLE_USER") {
    basePath = "/client/dashboard";
  } else {
    basePath = "/client/sales-manager";
  }

  // Lang + basePath birlashtirish — ikki marta qo'shilmasligi uchun
  const href = `/${lang}${basePath}`;

  return (
    <Link href={href} className="flex items-center gap-2">
      <Image src={LogoTip} alt="logo" width={50} />
      <div className="text-2xl font-semibold flex flex-col text-white">
        <span className="font-semibold">Adnur</span>
        <span className="font-extralight">Logistics</span>
      </div>
    </Link>
  );
}