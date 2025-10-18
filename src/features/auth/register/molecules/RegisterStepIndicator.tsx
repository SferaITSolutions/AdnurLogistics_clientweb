"use client";

import React from "react";
import { useRegisterStore } from "../store/registerStore";
import clsx from "clsx";

interface Step {
  id: number;
  label: string;
}

interface RegisterStepIndicatorProps {
  steps: Step[];
}

export const RegisterStepIndicator = ({
  steps,
}: RegisterStepIndicatorProps) => {
  const { step } = useRegisterStore();

  return (
    <div className="flex items-center justify-center gap-6 mb-8">
      {steps.map((s, index) => (
        <div key={s.id} className="flex items-center gap-2">
          {/* Step number */}
          <div
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold transition-all duration-300",
              step === s.id
                ? "bg-blue-600 shadow-lg scale-110"
                : step > s.id
                ? "bg-green-500"
                : "bg-gray-300 text-gray-700"
            )}
          >
            {s.id}
          </div>

          {/* Step label */}
          <span
            className={clsx(
              "text-sm transition-all duration-300",
              step === s.id
                ? "text-blue-600 font-medium"
                : step > s.id
                ? "text-green-600"
                : "text-gray-500"
            )}
          >
            {s.label}
          </span>

          {/* Progress line */}
          {index < steps.length - 1 && (
            <div
              className={clsx(
                "w-8 h-[2px] rounded transition-all duration-300",
                step > s.id ? "bg-blue-600" : "bg-gray-300"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};
