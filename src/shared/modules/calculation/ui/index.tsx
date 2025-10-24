"use client";
import React from "react";
import { FonImage, FonLogo } from "../atoms";
import FormCalculation from "../molecules/form-calculation/form-calculation";
import { TitleText } from "@/shared/components/dump/atoms/title";
import ResultCalculation from "../molecules/result/result-calculation";
import { useFormStore } from "../store/store";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { useTranslations } from "next-intl";
export default function CalculationUI() {
  const t = useTranslations("calculationPage");
  const { response } = useCalculationStore();
  const { values } = useFormStore();
  return (
    <div>
      <FonLogo />
      <FonImage />
      <div className="w-full flex justify-center items-center">
        <TitleText title={t("title")} />
      </div>
      <div className="flex justify-between flex-col lg:flex-row gap-5 mt-10">
        <div className="w-full bg-white rounded-lg !p-4 !px-10 shadow-md">
          <FormCalculation />
        </div>
        <div className=" !p-4 !bg-white !rounded-lg shadow-md w-full !px-10">
          <ResultCalculation response={response} />
        </div>
      </div>
    </div>
  );
}
