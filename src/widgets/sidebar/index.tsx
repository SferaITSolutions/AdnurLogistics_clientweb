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
  const t = useTranslations('');
  const { isOpen, closeSidebar } = useSidebarStore();
  const { setIslogout } = useGlobalStore();
  const logout = () => setIslogout(true);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="min-w-[300px] fixed min-h-screen bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600 text-white hidden lg:flex flex-col p-6 z-50 shadow-2xl">
        {/* Decorative gradient overlays */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <Logo />
        </div>
        
        <div className="relative z-10 flex-1">
          <SidebarItems />
        </div>
        
        <div className="relative z-10 flex flex-col justify-end gap-3 mt-auto items-start">
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-2" />
          
          <button
            onClick={logout}
            className="group w-full cursor-pointer flex items-center gap-4 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-400/50 text-white shadow-lg hover:shadow-red-500/20 font-medium transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 border border-red-400/30 group-hover:border-red-400/50 transition-all duration-300">
              <FaSignOutAlt className="text-red-400 group-hover:text-red-300" size={20} />
            </div>
            <span className="text-base font-semibold group-hover:translate-x-1 transition-transform duration-300">
              {t('pricesTable.logout')}
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <DrawerSidebar closeSidebar={closeSidebar} isOpen={isOpen} />
      <LogoutModal />
    </>
  );
};

export default Sidebar;