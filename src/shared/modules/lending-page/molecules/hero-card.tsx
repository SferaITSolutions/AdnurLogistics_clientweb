import React from "react";
import { HeroDescription } from "../atoms/HeroDescription";
import { TitleText } from "@/shared/components/dump/atoms";

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
      <TitleText title={title} color={'red'} />
      <HeroDescription text={description} color={'red'} />
    </div>
  );
};
