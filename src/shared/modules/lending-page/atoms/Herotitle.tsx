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
    <div className={`${classnameDy} md:text-7xl text-5xl`}>
      <span>{title}</span>
    </div>
  );
};
