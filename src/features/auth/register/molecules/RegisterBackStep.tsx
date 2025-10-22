'use client';

import { useRegisterStore } from '@/features/auth/register/store/registerStore';
import { setLocalItem } from '@/shared/utils/storage';

const RegisterBackStep = () => {
  const { prevStep, step } = useRegisterStore();
  return (
    <div
      onClick={() => {
        prevStep();
        setLocalItem('stepKey', step - 1);
      }}
      className="flex items-center gap-2 cursor-pointer group select-none"
    >
      <div className="w-2 h-2 border-l-2 border-b-2 rotate-45 border-gray-700 group-hover:border-blue-600 transition-all"></div>
      <span className="text-gray-700 group-hover:text-blue-600 text-sm font-medium">Ortga</span>
    </div>
  );
};

export default RegisterBackStep;
