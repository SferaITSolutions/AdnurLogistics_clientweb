"use client";
import React from "react";
import { TitleText } from "@/shared/components/dump/atoms";
import { ServiceCard } from "../../atoms/service-card";
import ServiceTitle from "../../molecules/service-title";

export const ServicesSection = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-4xl">
        <ServiceTitle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <ServiceCard />
      </div>
    </div>
  );
};
