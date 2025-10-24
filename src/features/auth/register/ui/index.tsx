'use client';

import { AnimatePresence, motion } from 'framer-motion';

import BgImage from '@/assets/images/auth/Group 48097120.png';
import RegisterBackStep from '@/features/auth/register/molecules/RegisterBackStep';
import Image from 'next/image';
import { RegisterStepIndicator } from '../molecules/RegisterStepIndicator';
import { useRegisterStore } from '../store/registerStore';
import FinelyTab from '../templates/finely-tab';
import RegisterForm from '../templates/form';
import PersonalNumber from '../templates/personal-number';
import { useTranslations } from 'next-intl';

export default function RegisterUI() {
  const { step } = useRegisterStore();
  const t = useTranslations("register");
  const steps = [
    { id: 1, label: t('steps.step1'), component: <RegisterForm /> },
    { id: 2, label: t('steps.step2'), component: <PersonalNumber /> },
    { id: 3, label: t('steps.step3'), component: <FinelyTab /> },
  ];

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

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
          <RegisterStepIndicator steps={steps.map(({ id, label }) => ({ id, label }))} />
        </div>
        {step !== 1 && (
          <div className="w-full max-w-md mx-auto mb-5">
            <RegisterBackStep />
          </div>
        )}

        <AnimatePresence mode="sync">
          {steps.map(
            (s) =>
              s.id === step && (
                <motion.div
                  key={s.id}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full flex items-center justify-center"
                >
                  {s.component}
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
