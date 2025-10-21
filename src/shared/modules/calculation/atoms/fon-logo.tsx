import React from "react";
import Image from "next/image";
import fonLogo from "@/assets/images/client/fon-Logo.svg";
export default function FonLogo() {
  return (
    <div className="">
      <Image src={fonLogo} alt="fon" className="w-20 !mb-10 select-none" />
    </div>
  );
}
