'use client';

import BgImage from '@/assets/images/auth/Group 48097120.png';
import Image from 'next/image';
import RegisterForm from '../templates/form';
import { useTranslations } from 'next-intl';

export default function RegisterUI() {
  const t = useTranslations("register");
  const steps = [
    { id: 1, label: t('steps.step1') },
  ];

  return (
    <div className="flex justify-between gap-10 min-h-screen">
      <Image
        src={BgImage}
        alt="bg"
        className="max-h-screen hidden lg:block lg:w-1/2 object-cover"
        priority
      />
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-10 relative overflow-hidden">
        <div className="mb-10 justify-start items-start w-full">
          {/* Step indicator with only one step */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              1
            </div>
            <span className="font-medium">{steps[0].label}</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
