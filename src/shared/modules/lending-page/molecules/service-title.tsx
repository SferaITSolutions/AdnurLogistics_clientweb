"use client";
import { useTranslations } from "next-intl";
import React from "react";

export default function ServiceTitle({
  classNameDy,
}: {
  classNameDy?: string;
}) {
  const t = useTranslations("LendingPage.services");
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col sm:flex-row gap-2">
        <h1 className="heading-title-size text-black text-xl">{t("title1")}</h1>
        <h1 className="text-red-600 heading-title-size text-xl">
          {t("title2")}{" "}
        </h1>
      </div>
      <h1 className="heading-title-size text-black text-xl">{" "}{t("title3")}</h1>
    </div>
  );
}
