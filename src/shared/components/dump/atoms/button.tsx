import React from "react";

export const ButtonPrimary = ({
  type,
  onClick,
  label,
  Icon,
}: {
  type: "primary" | "secondary";
  onClick?: () => void;
  label: string;
  Icon?: React.ReactNode;
}) => {
  return (
    <button
      className={`bg-primary-blue-color cursor-pointer  px-6 py-2 rounded-md hover:bg-secondary-blue-color w-fit flex items-center gap-2 text-[#fff]`}
      onClick={onClick}
    >
      {Icon}
      <span className="text-[#fff]"> {label}</span>
    </button>
  );
};
export const ButtonSecondary = ({
  onClick,
  label,
  Icon,
}: {
  type: "primary" | "secondary";
  onClick: () => void;
  label: string;
  Icon?: React.ReactNode;
}) => {
  return (
    <button
      className={`bg-secondary-blue-color cursor-pointer  px-6 py-2 rounded-md hover:bg-primary-blue-color w-fit flex items-center gap-2 text-[#fff]`}
      onClick={onClick}
    >
        {Icon}
        <span className="text-[#fff]"> {label}</span>
    </button>
  );
};
