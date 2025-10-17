"use client";
import Link from "next/link";

type NavLinkProps = {
  href: string;
  label: string;
  active?: boolean;
};

export const NavLink = ({ href, label, active }: NavLinkProps) => {
  return (
    <Link
      href={href}
      scroll={false}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        active
          ? "text-color-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-color-primary"
          : "text-gray-700 hover:text-color-primary"
      }`}
    >
      {label}
    </Link>
  );
};
