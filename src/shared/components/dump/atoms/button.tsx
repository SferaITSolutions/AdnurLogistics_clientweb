import React from "react";

export const ButtonPrimary = ({
  type,
  onClick,
  label,
  Icon,
  classNameDy
}: {
  type: "primary" | "secondary";
  onClick?: () => void;
  label: string;
  Icon?: React.ReactNode;
  classNameDy?: string
}) => {
  return (
    <button
      className={`bg-primary-blue-color cursor-pointer  px-6 py-4 rounded-full hover:bg-secondary-blue-color w-fit flex items-center gap-2 text-[#fff] ${classNameDy}`}
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

export const ButtonOutline = ({
  onClick,
  label,
  Icon,
  classNameDy
}: {
  onClick?: () => void;
  label: string;
  classNameDy?: string;
  Icon?: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        border-2 border-white
        text-white
        hover:text-white
        transition-all duration-200
        cursor-pointer px-6 py-2 rounded-full
        w-fit flex items-center gap-2
      `}
    >
      {Icon && <span className="flex items-center">{Icon}</span>}
      <span className="text-white">{label}</span>
    </button>
  );
};


export const ButtonLight = ({
  onClick,
  label,
  icon,
}: {
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
}) => {
  return (
    <button
      className={`bg-white cursor-pointer  px-6 py-4 rounded-full hover:bg-primary-blue-color w-fit flex items-center gap-2 text-[#333]`}
      onClick={onClick}
    >
      {icon}
      <span className="text-[#333]"> {label}</span>
    </button>
  );
};
