'use client';

import { useSidebarStore } from '@/features/auth/register/store/sidebarStore';
import { useRouter } from '@/i18n/routing';
import { authService } from '@/services/auth/auth.service';
import Logo from '@/shared/components/dump/atoms/Logo';
import { DrawerSidebar } from '@/shared/components/dump/molecules/DrawerSidebar';
import SidebarItems from '@/shared/components/dump/molecules/sidebar-items';
import { useTranslations } from 'next-intl';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const t = useTranslations('clientDashboard');
  const { isOpen, closeSidebar } = useSidebarStore();
  const router = useRouter();
  const logout = () => {
    authService.clearStorage();
    router.push('/');
  };
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="min-w-[300px] fixed min-h-screen bg-secondary-blue-color text-white hidden lg:flex flex-col p-6 z-50">
        <Logo />
        <SidebarItems />{' '}
        <div className="flex flex-col justify-end gap-3 mt-auto items-start">
          <button
            onClick={() => {
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-r-2xl text-xl shadow-sm font-medium transition-all duration-100"
          >
            <FaSignOutAlt color="red" size={26} />
            <span className="text-xl">{t('logout')}</span>
          </button>
        </div>{' '}
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <DrawerSidebar closeSidebar={closeSidebar} isOpen={isOpen} />
    </>
  );
};

export default Sidebar;
