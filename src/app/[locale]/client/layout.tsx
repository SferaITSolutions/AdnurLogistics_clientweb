'use client';

import Navbar from '@/widgets/headers/navbar-cabinet';
import React from 'react';
import Sidebar from '@/widgets/sidebar';

const ClientPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen max-w-screen">
      <Sidebar />
      <Navbar />
      <div className=" lg:!ml-[300px] !mt-[90px] justify-center flex !w-full overflow-x-hidden">{children}</div>
    </div>
  );
};

export default ClientPage;