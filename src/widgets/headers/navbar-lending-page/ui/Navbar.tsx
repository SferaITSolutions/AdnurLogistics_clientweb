"use client";
import { Logo } from "../atoms/Logo";
import { FaArrowRight } from "react-icons/fa";
import { ButtonSecondary } from "@/shared/components/dump/atoms/button";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const navigate = useRouter();
  return (
    <header className="fixed  flex justify-between items-center  top-0 left-0 w-full bg-white shadow-sm z-50">
      <nav className=" flex justify-between items-center  container mx-auto w-full">
        <Logo />

        {/* Desktop nav links */}
        <div className="flex items-center gap-6 justify-center">
          <ButtonSecondary
            type="secondary"
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
