// components/atoms/ActionButton.tsx

import { Spin } from "antd";
import React from "react";

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success" | "amber";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 to-indigo-600 !text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg",
  secondary:
    "bg-gray-100 text-gray-700 hover:bg-gray-200",
  danger:
    "bg-red-50 text-red-600 hover:bg-red-100",
  success:
    "bg-gradient-to-r from-green-500 to-emerald-600 !text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl",
  amber:
    "!text-amber-600 hover:text-amber-700 !font-medium",
};

const ActionButton = ({
  onClick,
  disabled,
  loading,
  variant = "secondary",
  children,
  className = "",
  type = "button",
}: ActionButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-2.5 rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
    >
      {loading ? <Spin size="small" /> : children}
    </button>
  );
};

export default ActionButton;