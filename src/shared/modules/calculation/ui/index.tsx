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

export default function CalculationUI() {
  const t = useTranslations("calculationPage");
  const { response } = useCalculationStore();
  const [activeTab, setActiveTab] = useState("LCL");

  const tabItems = [
    {
      key: "LCL",
      label: <span className="global-text-size">{t("typeIcl")}</span>,
      children: (
        <div className="w-full bg-white rounded-b-2xl  shadow-md flex justify-between flex-col lg:flex-row gap-5 ">
          <div className="w-full rounded-2xl !p-4 !px-5">
            <FormCalculation />
          </div>
          <div className="!p-5 w-full border-l-2 border-gray-200 !select-none">
            <ResultCalculation response={response} />
          </div>
        </div>
      ),
    },
    {
      key: "FCL",
      label: <span className="global-text-size">{t("typeFcl")}</span>   ,
      children: (
        <div className="w-full bg-white rounded-b-2xl   shadow-md flex justify-between flex-col lg:flex-row gap-5 ">
          <div className="w-full rounded-2xl !p-4 !px-5">
            <ApplyForm />
          </div>
          <div className="!p-5 w-full border-l-2 border-gray-200">
            <Image src={SendingImage} alt="sending" width={500} height={500} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="pb-8">
      <FonLogo />
      <FonImage />
      <div className="w-full flex justify-center items-center">
        <TitleText title={t("title")} />
      </div>
      <div className="mt-6">
        <Tabs
          activeKey={activeTab}
          defaultActiveKey="LCL"
          onChange={setActiveTab}
          items={tabItems}
          tabBarStyle={{
            fontWeight: 400,
            marginBottom: 0,
          }}
        />
      </div>
    </div>
  );
}
