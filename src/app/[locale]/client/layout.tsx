'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { getLocalItem } from '@/shared/utils/storage';
import Navbar from '@/widgets/headers/navbar-cabinet';
import Sidebar from '@/widgets/sidebar';

const ClientPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getLocalItem('access_token');
    const isClientPage = pathname.includes('/client');

    if (isClientPage && !token) {
      router.replace('/');
    }
  }, [router, pathname]);

  return (
    <div className="flex min-h-screen max-w-screen">
      <Sidebar />
      <Navbar />
      <div className=" lg:!ml-[300px] !mt-[90px] justify-center flex !w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default ClientPage;
