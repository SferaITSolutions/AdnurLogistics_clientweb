import React from "react";
export const HeroCardText = ({
  title,
  subText,
  classnameDy,
}: {
  title: string;
  subText?: string;
  classnameDy?: string;
}) => {
  return (
    <div className={`${classnameDy}`}>
      <p className=" !mb-0 heading-title-size">{title}</p>
      <p className=" !mb-0 global-text-size">{subText}</p>
    </div>
  );
};
