"use client";

import { FonImage, FonLogo } from "../atoms";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { TitleText } from "@/shared/components/dump/atoms/title";
import { useTranslations } from "next-intl";
import FormCalculation from "../molecules/form-calculation/form-calculation";
import ResultCalculation from "../molecules/result/result-calculation";

export default function CalculationUI() {
  const t = useTranslations("calculationPage");
  const { response } = useCalculationStore();

  return (
    <div className="pb-8 relative">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <FonLogo />
        <FonImage />

        {/* Title Section */}
        <div className="w-full flex justify-center items-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />
            <TitleText title={t("title")} />
          </div>
        </div>

        {/* Calculation Section (Single Tab Content) */}
        <div className="relative w-full bg-gradient-to-br bg-white rounded-b-2xl shadow-xl border border-gray-200/60 flex justify-between flex-col lg:flex-row gap-0 overflow-hidden mt-6">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/5 rounded-full blur-2xl" />
          <div className="relative z-10 w-full lg:w-1/2 p-6">
            <FormCalculation />
          </div>
          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <div className="relative z-10 w-full lg:w-1/2 p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
            <ResultCalculation response={response} />
          </div>
        </div>
      </div>
    </div>
  );
}
