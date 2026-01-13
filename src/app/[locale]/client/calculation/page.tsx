"use client"
import CalculationUI from '@/shared/modules/calculation/ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CalculationPage() {
  const role = localStorage.getItem("roleName")
  const router = useRouter();

  useEffect(() => {
    const rolename = role
    if (rolename === "ROLE_SUPER_ADMIN") {
      router.replace("/403");
    }
  }, [router,role]);
  return (
    <div className="container">
      <CalculationUI />
    </div>
  );
}
