import { Typography } from "antd";
import React from "react";

export const HeroDescription = ({ text, color, classNameDy }: { text: string, color?: string, classNameDy?: string }) => {

  return (
    <div className={`text-md text-${color} ${classNameDy}`}>
      <span className={`${color ? color : 'text-secondary-black-color'}`}>{text}</span>
    </div>
  );
};
