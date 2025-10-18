"use client";
import { NavLink } from "../atoms/navLink";

const links = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#courses", label: "Courses" },
  { href: "#contact", label: "Contact" },
];

export const NavLinksGroup = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-5">
      {links.map((link) => (
        <div className="p-1" key={link.href} onClick={onClick}>
          <NavLink {...link} />
        </div>
      ))}
    </div>
  );
};
