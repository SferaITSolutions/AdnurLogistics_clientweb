'use client';

import { Filters, List } from '@/shared/modules/cobenent-dashboard/ui';
import { useMe } from '@/widgets/headers/navbar-cabinet/hook/hook';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NewsForAdmin from '@/features/news-for-admin';

export default function DashboardClient() {
  const t = useTranslations('clientDashboard');
  const role = localStorage.getItem("roleName")
  const router = useRouter();
  const { data } = useMe();

  useEffect(() => {
    const rolename = role
    if (rolename !== "ROLE_USER") {
      router.replace("/403");
    }
  }, [router, role]);
  return (
    <div className="flex flex-col gap-2.5 container max-w-full">
      <title>
        Sales orders
      </title>
      <h1 className="text-2xl !font-bold">{t('title')}</h1>
      {/* <h1 className="text-2xl !font-bold">{t('News')}</h1> */}

      <NewsForAdmin />
      <Filters />
      <List />

    </div>
  );
}
