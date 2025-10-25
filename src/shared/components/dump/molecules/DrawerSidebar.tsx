'use client';

import { FaCalculator, FaHome, FaSignOutAlt } from 'react-icons/fa';

import { useRouter } from '@/i18n/routing';
import { authService } from '@/services/auth/auth.service';
import Logo from '@/shared/components/dump/atoms/Logo';
import { Drawer } from 'antd';
import { useTranslations } from 'next-intl';
import MenuItem from './menu-item';

export const DrawerSidebar = ({
  closeSidebar,
  isOpen,
}: {
  closeSidebar: () => void;
  isOpen: boolean;
}) => {
  const t = useTranslations('clientDashboard');
  const router = useRouter();
  const logout = () => {
    authService.clearStorage();
    router.push('/');
  };
  return (
    <Drawer
      placement="left"
      onClose={closeSidebar}
      open={isOpen}
      width={300}
      className="lg:hidden bg-secondary-blue-color"
    >
      <div className="flex flex-col h-full text-white">
        <Logo />
        <nav className="flex flex-col gap-5 mt-10">
          <MenuItem
            label={t('dashboard')}
            path="/client/dashboard"
            icon={<FaHome color="white" size={26} />}
          />
          <MenuItem
            label={t('calculation')}
            path="/client/calculation"
            icon={<FaCalculator color="white" size={26} />}
          />
        </nav>
        <div className="flex flex-col justify-end gap-3 mt-auto items-start">
          <button
            onClick={() => {
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-r-2xl shadow-sm font-medium transition-all duration-100"
          >
            <FaSignOutAlt color="red" size={26} />
            <span className="text-lg">{t('logout')}</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
};
