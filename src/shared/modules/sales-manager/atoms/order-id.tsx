'use client';

import { useTranslations } from 'next-intl';

export default function OrderId({ OrderId }: { OrderId: string }) {
  const t = useTranslations('clientDashboard');
  return (
    <div className="space-x-2">
      <span className="!font-[700]">{t('orderId')}</span>{' '}
      <span className="font-semibold">{OrderId}</span>
    </div>
  );
}
