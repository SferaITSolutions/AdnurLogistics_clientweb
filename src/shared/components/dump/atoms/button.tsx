import React from "react";

export const ButtonPrimary = ({
  type,
  onClick,
  label,
  Icon,
  classNameDy,
  ...props
}: {
  type: "primary" | "secondary";
  onClick?: () => void;
  label: string;
  Icon?: React.ReactNode;
  classNameDy?: string;
  [key: string]: any;
}) => {
  return (
    <button
      className={`bg-primary-blue-color cursor-pointer hover:!text-[#004F98] hover:!bg-[#fff] hover:!border-[#0D6CEC] hover:!border-2 !border-2 border-primary-blue-color px-6 py-4 rounded-full w-fit flex items-center gap-2 !text-[#fff] ${classNameDy} transition-all duration-200`}
      onClick={onClick}
      {...props}
    >
      {Icon}
      <span className=""> {label}</span>
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
      className={`bg-secondary-blue-color cursor-pointer  px-6 py-2 rounded-md hover:!text-[#004F98] hover:!bg-[#fff] hover:!border-[#004F98] hover:!border-2 !border-2 border-secondary-blue-color w-fit flex items-center gap-2 !text-[#fff] transition-all duration-200`}
      onClick={onClick}
    >
      {Icon}
      <span className=""> {label}</span>
    </button>
  );
};

export const ButtonOutline = ({
  onClick,
  label,
  Icon,
  classNameDy,
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
        !text-white
        bg-transparent
        hover:!bg-white
        hover:!text-[#004F98]
        hover:border-primary-blue-color
        transition-all duration-200
        cursor-pointer px-6 py-4 rounded-full
        w-fit flex items-center gap-2
      `}
    >
      {Icon && <span className="flex items-center">{Icon}</span>}
      <span className="">{label}</span>
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
      className={`        border-2 border-white
        !text-white
        bg-transparent
        hover:!bg-white
        hover:!text-[#004F98]
        hover:border-primary-blue-color
        transition-all duration-200
        cursor-pointer px-6 py-4 rounded-full
        w-fit flex items-center gap-2`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
