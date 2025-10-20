import React from "react";
import { HeroDescription } from "../atoms/HeroDescription";
import { TitleText } from "@/shared/components/dump/atoms";
import { HeroCardText } from "../atoms/HeroCardTitle";

export const HeroCard = ({
  title,
  description,
  classNameDy
}: {
  title: string;
  description: string;
  classNameDy?: string;
}) => {
  return (
    <div className={`p-4 rounded-md text-bold ${classNameDy}`}>
      <HeroCardText title={title} subText={description} />
    </div>
  );
};
