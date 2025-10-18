import React from "react";
export const ButtonOutline = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 bg-white text-primary-blue-color px-4 py-2 rounded-lg border-2 border-primary-blue-color cursor-pointer hover:bg-primary-blue-color hover:shadow-lg"
    >
      {icon}
      {label}
    </button>
  );
};
