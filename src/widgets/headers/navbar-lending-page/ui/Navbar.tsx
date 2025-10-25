"use client";

import { useState } from "react";
import { ButtonPrimary } from "@/shared/components/dump/atoms/button";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import LanguageSwitcher from "@/features/change-language/ui";
import { Logo } from "../atoms/Logo";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const Navbar = () => {
  const navigate = useRouter();
  const t = useTranslations("LendingPage.header");
  const [menuOpen, setMenuOpen] = useState(false);

  const NavActions = () => (
    <>
      <LanguageSwitcher />
      <ButtonPrimary
        type="primary"
        label={t("login")}
        Icon={<FaArrowRight />}
        onClick={() => {
          setMenuOpen(false);
          navigate.push("/auth/log-in");
        }}
      />
    </>
  );

  return (
    <header className="fixed flex justify-between items-center top-0 left-0 w-full bg-white shadow-sm z-50">
      <nav className="flex justify-between items-center container mx-auto w-full py-3">
        <Logo />

        <div className="hidden md:flex items-center gap-6 justify-center">
          <NavActions />
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            className="focus:outline-none"
          >
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="sm:hidden absolute top-15 left-0 w-full bg-white shadow-md border-t border-gray-200 animate-dropdown z-[60]">
          <div className="flex flex-col items-center gap-6 py-6">
            <NavActions />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes dropdown {
          0% {
            opacity: 0;
            transform: translateY(-16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease;
        }
      `}</style>
    </header>
  );
};
