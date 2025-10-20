import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import clsx from "clsx";

interface SidebarItemProps {
  path: string;
  icon?: ReactNode;
  label: string;
}

export default function SidebarItem({ path, icon, label }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={clsx(
        "group flex items-center gap-3 px-4 py-3 rounded-r-xl text-sm font-medium transition-all duration-100",
        "text-gray-300 hover:text-white",
        isActive
          ? "bg-primary-blue-color shadow-md scale-[1.02] text-white rounded-r-xl"
          : "hover:bg-primary-blue-color/40 hover:scale-[1.02]"
      )}
    >
      {/* Icon qismi */}
      {icon && (  
        <span
          className={clsx(
            "transition-transform duration-300",
            "group-hover:rotate-3",
            isActive && "text-white"
          )}
        >
          {icon}
        </span>
      )}

      {/* Label qismi */}
      <span
        className={clsx(
          "transition-all duration-300",
          isActive ? "font-semibold text-white" : "text-gray-300"
        )}
      >
        {label}
      </span>

      {/* Active chiziq animatsiyasi */}
      <span
        className={clsx(
          "absolute left-0 top-0 w-[3px] h-full rounded-r bg-primary-blue-color transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        )}
      ></span>
    </Link>
  );
}
