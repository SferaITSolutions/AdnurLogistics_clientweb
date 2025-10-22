'use client';

import { ButtonPrimary } from '@/shared/components/dump/atoms';
import { FaCheckCircle } from 'react-icons/fa';
import { setLocalItem } from '@/shared/utils/storage';
import { useRegisterStore } from '@/features/auth/register/store/registerStore';
import { useRouter } from 'next/navigation';

export default function FinelyTab() {
  const { reset } = useRegisterStore();
  const navigate = useRouter();
  const handleReset = () => {
    navigate.push('/client/dashboard');
    setLocalItem('stepKey', 1);
    reset();
  };
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <FaCheckCircle size={50} className="text-green-500" />
      <h1 className="text-2xl font-semibold">Tabriklaymiz!</h1>
      <p className="text-gray-600 max-w-sm">
        Sizning ro‘yxatdan o‘tish jarayoningiz muvaffaqiyatli yakunlandi.
      </p>
      <ButtonPrimary type="primary" label="Shaxsiy kabinetga kirish" onClick={handleReset} />
    </div>
  );
}
