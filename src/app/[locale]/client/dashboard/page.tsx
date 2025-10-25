'use client';

import { Filters, List } from '@/shared/modules/cobenent-dashboard/ui';

import { useTranslations } from 'next-intl';

export default function DashboardClient() {
  const t = useTranslations('clientDashboard');
  return (
    <div className="flex flex-col gap-2.5 container max-w-full">
      <h1 className="text-2xl !font-bold">{t('title')}</h1>
      <Filters />
      <List />
    </div>
  );
}
