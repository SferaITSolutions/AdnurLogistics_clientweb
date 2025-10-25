'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Readonly<Props>) => {
  return (
    <ProgressProvider height="3px" color="#5c66e8" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  );
};

export default MainLayout;
