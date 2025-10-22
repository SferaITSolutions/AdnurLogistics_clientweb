"use client";

import React from "react";

type Variant = "info" | "error" | "success" | "warning";

interface RegisterErrorlabelProps {
  text: string;
  variant?: Variant;
  icon?: React.ReactNode;
  closable?: boolean;
  className?: string;
  onClose?: () => void;
}

/**
 * Simple outline text component.
 * - Shows an outlined box with text.
 * - Supports variants (info/error/success/warning).
 * - Optional icon and closable button.
 */
export const RegisterErrorlabel: React.FC<RegisterErrorlabelProps> = ({
  text,
  variant = "info",
  icon,
  closable = false,
  className = "",
  onClose,
}) => {
  const base =
    "w-full rounded-lg border px-4 py-2 gap-3 text-sm sm:text-base";
  const variantMap: Record<
    Variant,
    { border: string; text: string; bg?: string; iconColor?: string }
  > = {
    info: { border: "!border-blue-500", text: "text-blue-800", iconColor: "text-blue-500" },
    success: { border: "!border-green-500", text: "text-green-800", iconColor: "text-green-500" },
    error: { border: "!border-red-500", text: "text-red-800", iconColor: "text-red-500" },
    warning: { border: "border-yellow-500", text: "text-yellow-800", iconColor: "text-yellow-500" },
  };

  const v = variantMap[variant];

  return (
    <div className={`${base} ${v.border} ${v.text} bg-white ${className} relative flex items-center fade`} >
      {icon ? (
        <div className={`${v.iconColor} mt-[2px]`}>{icon}</div>
      ) : (
        /* small dot to visually balance when no icon */
        <div className={`w-2 h-2 rounded-full ${v.iconColor} mt-2`} />
      )}

      <div>
        {text}
      </div>

      {closable && (
        <button
          onClick={onClose}
          aria-label="close"
          className=" opacity-80 hover:opacity-100 transition text-[#333] absolute right-4"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default RegisterErrorlabel;
