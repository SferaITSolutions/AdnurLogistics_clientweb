'use client';

import { useTranslations } from 'next-intl';

export default function ToLocation({ tolocation }: { tolocation: string }) {
  const t = useTranslations('clientDashboard');
  return (
    <div className="space-x-2">
      <span className="!font-[700]">{t('WarehousePendingArrival')}</span>
      <span>{tolocation}</span>
    </div>
  );
}
