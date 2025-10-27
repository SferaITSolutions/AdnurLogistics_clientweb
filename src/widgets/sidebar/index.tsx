'use client';

import { useSidebarStore } from '@/features/auth/register/store/sidebarStore';
import LogoutModal from '@/features/logout/logout-modal';
import Logo from '@/shared/components/dump/atoms/Logo';
import { DrawerSidebar } from '@/shared/components/dump/molecules/DrawerSidebar';
import SidebarItems from '@/shared/components/dump/molecules/sidebar-items';
import { useGlobalStore } from '@/shared/store/globalStore';
import { useTranslations } from 'next-intl';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const t = useTranslations('clientDashboard');
  const { isOpen, closeSidebar } = useSidebarStore();
  const { setIslogout } = useGlobalStore();
  const logout = () => setIslogout(true);

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
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-r-2xl text-xl shadow-sm font-medium transition-all duration-100"
          >
            <FaSignOutAlt color="red" size={26} />
            <span className="text-lg">{t('logout')}</span>
          </button>
        </div>{' '}
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <DrawerSidebar closeSidebar={closeSidebar} isOpen={isOpen} />
      <LogoutModal />
    </>
  );
};

export default Sidebar;
