import React from "react";
export const HeroCardText = ({
  title,
  subText,
  classnameDy
}: {
  title: string;
  subText?: string;
  classnameDy?: string;
}) => {
  return (
    <div className={`${classnameDy}`}>
      <p className="text-5xl !mb-0">{title}</p>
      <p className="text-lg !mb-0">{subText}</p>
    </div>
  );
};
