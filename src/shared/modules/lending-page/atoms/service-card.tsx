"use client";
import React from "react";
import servisecardImg from "@/assets/images/landing-images/servisecard.png";
import { useTranslations } from "next-intl";

export const ServiceCard = () => {
  const t = useTranslations("LendingPage.services.list");
  const servicesConstants = [
    {
      id: 1,
      title: "01",
      description: t("transport"),
    },
    {
      id: 2,
      title: "02",
      description: t("inspection"),
    },
    {
      id: 3,
      title: "03",
      description: t("storage"),
    },
    {
      id: 4,
      title: "04",
      description: t("customs"),
    },
  ];
  return (
    <>
      {servicesConstants.map((service) => (
        <div
          key={service.id}
          className={`
            flex flex-col gap-4 p-8 pb-20 shadow-xl w-full rounded-4xl transition-all duration-300
            bg-[#F8F8F8] text-black
            group
            hover:bg-cover hover:bg-center hover:bg-no-repeat hover:text-white
          `}
          style={{
            backgroundImage: `url(${servisecardImg.src})`,
            backgroundSize: "0%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundSize = "cover";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundSize = "0%";
          }}
        >
          <h1 className="text-4xl font-bold">{service.title}</h1>
          <p className="text-xl">{service.description}</p>
        </div>
      ))}
    </>
  );
};
