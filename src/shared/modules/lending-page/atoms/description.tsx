import { Typography } from "antd";
import React from "react";

export const HeroDescription = ({ text }: { text: string }) => {

  return (
    <div className="text-md">
      <span className="text-secondary-black-color">{text}</span>
    </div>
  );
};
