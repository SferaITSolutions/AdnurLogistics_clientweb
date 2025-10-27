'use client';

import { FonImage, FonLogo } from '../atoms';
import { useCalculationStore } from '@/entities/hooks/calculation/store';
import { TitleText } from '@/shared/components/dump/atoms/title';
import { useTranslations } from 'next-intl';
import FormCalculation from '../molecules/form-calculation/form-calculation';
import ResultCalculation from '../molecules/result/result-calculation';
import { Tabs } from 'antd';
import { useState } from 'react';
import ApplyForm from '../molecules/apply-form';

export default function CalculationUI() {
  const t = useTranslations('calculationPage');
  const { response } = useCalculationStore();
  const [activeTab, setActiveTab] = useState('LCL');

  const tabItems = [
    {
      key: 'LCL',
      label: t('typeIcl'),
      children: (
        <div className="flex justify-between flex-col lg:flex-row gap-5 mt-10">
          <div className="w-full bg-white rounded-2xl !p-4 !px-10 shadow-md">
            <FormCalculation />
          </div>
          <div className=" !p-4 !bg-white rounded-2xl shadow-md w-full !px-10">
            <ResultCalculation response={response} />
          </div>
        </div>
      ),
    },
    {
      key: 'FCL',
      label: (
        <span className=" select-none cursor-not-allowed">
          {t('typeFcl')}
        </span>
      ),
      children: (
        <div className=" ">
          <ApplyForm />
        </div>
      ),
    },
  ];

  return (
    <div className="pb-8">
      <FonLogo />
      <FonImage />
      <div className="w-full flex justify-center items-center">
        <TitleText title={t('title')} />
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
