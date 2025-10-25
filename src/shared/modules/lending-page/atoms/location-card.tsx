"use client";
import { TitleText } from "@/shared/components/dump/atoms";
import { CopyText } from "@/shared/components/dump/atoms/copyText";
import { LocationTypes } from "@/shared/types/lenging-page-types";
import { useTranslations } from "next-intl";
import React from "react";

export const LocationCard: React.FC<{ location: LocationTypes }> = ({
  location,
}) => {
  const t = useTranslations("LendingPage.warehouses");
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center">{location.title}</h1>
      <div className="p-6 rounded-2xl flex flex-col gap-6 bg-[#fff]">
        <div className="flex flex-col">
          <div className="mb-1 global-label-size !font-bold">
            {t("address")}{" "}
          </div>
          <CopyText text={location.fullLocation} />
        </div>
        <div>
          <div className="mb-1 global-label-size !font-bold">
            {t("receiver")}{" "}
          </div>
          <CopyText text={location.receiver} />
        </div>
        <div>
          <div className="mb-1 global-label-size !font-bold">
            {t("labels")}{" "}
          </div>
          <CopyText text={location.marks} />
        </div>
        <div>
          <div className="mb-1 global-label-size !font-bold">
            {t("transport")}{" "}
          </div>
          <CopyText text={location.transport} />
        </div>
      </div>
    </div>
  );
};
