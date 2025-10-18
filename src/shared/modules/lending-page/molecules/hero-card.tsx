import React from "react";
import { HeroDescription } from "../atoms/description";
import { TitleText } from "@/shared/components/dump/atoms";

export const HeroCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="p-4 rounded-md text-bold">
      <TitleText title={title} />
      <HeroDescription text={description} />
    </div>
  );
};
