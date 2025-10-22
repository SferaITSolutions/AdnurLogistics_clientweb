'use client';

import { FaCalculator, FaHome, FaSignOutAlt } from 'react-icons/fa';

import { Drawer } from 'antd';
import Logo from '@/shared/components/dump/atoms/Logo';
import MenuItem from './menu-item';
import { useRouter } from 'next/navigation';

export const DrawerSidebar = ({
  closeSidebar,
  isOpen,
}: {
  closeSidebar: () => void;
  isOpen: boolean;
}) => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('access_token');
    router.push('/');
  };
  return (
    <Drawer
      placement="left"
      onClose={closeSidebar}
      open={isOpen}
      width={300}
      className="lg:hidden bg-secondary-blue-color"
      // headerStyle={{ display: "none" }}
    >
      <div className="flex flex-col h-full text-white">
        <Logo />
        <nav className="flex flex-col gap-3 mt-10">
          <MenuItem label="Dashboard" path="/client/dashboard" icon={<FaHome color="white" />} />
          <MenuItem
            label="Calculation"
            path="/client/calculation"
            icon={<FaCalculator color="white" />}
          />
        </nav>
        <div className="flex flex-col justify-end gap-3 mt-auto items-start">
          <button
            onClick={() => {
              logout();
            }}
            className="!mb-3 flex items-center gap-2 text-xl"
          >
            <FaSignOutAlt color="red" />
            Logout
          </button>
        </div>
      </div>
    </Drawer>
  );
};
