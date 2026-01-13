'use client';

import { FaCalculator, FaHome } from 'react-icons/fa';
import MenuItem from '@/shared/components/dump/molecules/menu-item';
import { useTranslations } from 'next-intl';

export default function SidebarItems() {
  const t = useTranslations('');

  return (
    <nav className="flex flex-col gap-3 mt-12 text-white z-50">
      {/* Section Title */}
      {/* <div className="flex items-center gap-2 px-4 mb-2">
        <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />
        <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
          Navigation
        </span>
      </div> */}
      
      <MenuItem
        label={t('clientDashboard.dashboard')}
        path={`/client/dashboard`}
        icon={<FaHome size={22} />}
      />
      <MenuItem
        label={t('clientDashboard.calculation')}
        path={`/client/calculation`}
        icon={<FaCalculator size={22} />}
      />
      <MenuItem
        label={'prices'}
        path={`/client/admin/prices`}
        icon={<FaHome size={22} />}
      />
      <MenuItem
        label={'locations'}
        path={`/client/admin/locations`}
        icon={<FaCalculator size={22} />}
      />
    </nav>
  );
}
