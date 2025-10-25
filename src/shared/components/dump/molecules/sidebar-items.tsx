'use client';

import { FaCalculator, FaHome } from 'react-icons/fa';

import MenuItem from '@/shared/components/dump/molecules/menu-item';
import { useTranslations } from 'next-intl';

export default function SidebarItems() {
  const t = useTranslations('clientDashboard');

  return (
    <nav className="flex flex-col gap-5 mt-10 text-white z-50">
      <MenuItem
        label={t('dashboard')}
        path={`/client/dashboard`}
        icon={<FaHome size={26} color="white" />}
      />
      <MenuItem
        label={t('calculation')}
        path={`/client/calculation`}
        icon={<FaCalculator size={26} />}
      />
    </nav>
  );
}
