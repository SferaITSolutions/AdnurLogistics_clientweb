"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import BgImage from "@/assets/images/auth/Group 48097120.png";
import PersonalNumber from "../templates/personal-number";
import RegisterForm from "../templates/form";
import FinelyTab from "../templates/finely-tab";
import { useRegisterStore } from "../store/registerStore";
import { RegisterStepIndicator } from "../molecules/RegisterStepIndicator";

export default function RegisterUI() {
  const { step } = useRegisterStore();

  // Step list
  const steps = [
    { id: 1, label: "Ma’lumotlar", component: <RegisterForm /> },
    { id: 2, label: "Shaxsiy raqam", component: <PersonalNumber /> },
    { id: 3, label: "Tasdiq", component: <FinelyTab /> },
  ];

  // Animatsiya variantlari
  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="flex justify-between gap-10 min-h-screen">
      {/* Chap tomondagi fon rasmi */}
      <Image
        src={BgImage}
        alt="bg"
        className="max-h-screen w-1/2 object-cover"
        priority
      />

      {/* O‘ng tomondagi form step */}
      <div className="flex flex-col justify-center w-1/2 p-10 relative overflow-hidden">
        {/* Step indicator */}
        <div className="mb-10 justify-start items-start w-full">
          <RegisterStepIndicator
            steps={steps.map(({ id, label }) => ({ id, label }))}
          />
        </div>

        {/* Step content */}
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
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full flex justify-start items-center"
                >
                  {s.component}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
