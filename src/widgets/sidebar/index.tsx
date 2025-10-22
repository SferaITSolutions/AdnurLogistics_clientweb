'use client';

import { DrawerSidebar } from '@/shared/components/dump/molecules/DrawerSidebar';
import { FaSignOutAlt } from 'react-icons/fa';
import Logo from '@/shared/components/dump/atoms/Logo';
import SidebarItems from '@/shared/components/dump/molecules/sidebar-items';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/features/auth/register/store/sidebarStore';

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebarStore();
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('access_token');
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
            className="!group flex items-center gap-3 px-4 py-3 rounded-r-xl text-sm font-medium transition-all duration-100"
          >
            <FaSignOutAlt color="red" />
            Logout
          </button>
        </div>{' '}
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <DrawerSidebar closeSidebar={closeSidebar} isOpen={isOpen} />
    </>
  );
};

export default Sidebar;
