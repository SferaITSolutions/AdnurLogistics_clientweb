"use client";

import { FonImage, FonLogo } from "../atoms";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { TitleText } from "@/shared/components/dump/atoms/title";
import { Tabs } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ApplyForm from "../molecules/apply-form";
import FormCalculation from "../molecules/form-calculation/form-calculation";
import ResultCalculation from "../molecules/result/result-calculation";
import SendingImage from "@/assets/images/client/send-telegram.jpg";
import Image from "next/image";
import { FaCalculator, FaShippingFast } from "react-icons/fa";

export default function CalculationUI() {
  const t = useTranslations("calculationPage");
  const { response } = useCalculationStore();
  const [activeTab, setActiveTab] = useState("LCL");

  const tabItems = [
    {
      key: "LCL",
      label: (
        <div className="flex items-center gap-2 px-3 py-1">
          <FaCalculator className="text-lg" />
          <span className="global-text-size font-semibold">{t("typeIcl")}</span>
        </div>
      ),
      children: (
        <div className="relative w-full bg-gradient-to-br bg-white rounded-b-2xl shadow-xl border border-gray-200/60 flex justify-between flex-col lg:flex-row gap-0 overflow-hidden">
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
      ),
    },
    {
      key: "FCL",
      label: (
        <div className="flex items-center gap-2 px-3 py-1">
          <FaShippingFast className="text-lg" />
          <span className="global-text-size font-semibold">{t("typeFcl")}</span>
        </div>
      ),
      children: (
        <div className="relative w-full bg-gradient-to-br from-white to-gray-50/50 rounded-b-2xl shadow-xl border border-gray-200/60 flex justify-between flex-col lg:flex-row gap-0 overflow-hidden">
          <div className="relative z-10 w-full lg:w-1/2 p-6">
            <ApplyForm />
          </div>
            <div className="w-1/2">
              <Image src={SendingImage} alt="sending" width={500} height={500} className="w-full h-auto" />
            </div>
        </div>
      ),
    },
  ];

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
        
        {/* Tabs Section */}
        <div className="mt-6">
          <Tabs
            activeKey={activeTab}
            defaultActiveKey="LCL"
            onChange={setActiveTab}
            items={tabItems}
            className="custom-tabs"
            tabBarStyle={{
              fontWeight: 600,
              marginBottom: 0,
              borderBottom: "2px solid #e5e7eb",
            }}
          />
        </div>
      </div>
    </div>
  );
}
