import React from "react";
export const HeroText = ({
  title,
  redText,
  classnameDy
}: {
  title: string;
  redText?: string;
  classnameDy?: string;
}) => {
  return (
    <div className={`${classnameDy} text-7xl`}>
      <span>{title}</span>
    </div>
  );
};
