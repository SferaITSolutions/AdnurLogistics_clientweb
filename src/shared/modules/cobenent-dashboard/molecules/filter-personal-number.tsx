'use client';

import { useOrderDetailsStore } from '@/features/order-details/lib/store';
import { Input } from 'antd';
import { useTranslations } from 'next-intl';

export default function FilterPersonalNumber() {
  const { setOrderIdFilter, orderIdFilter } = useOrderDetailsStore();
  const t = useTranslations('clientDashboard');
  return (
    <div className="flex flex-col gap-2 border border-gray-200 rounded-2xl shadow-sm p-4">
      <label htmlFor="personal-number text-2xl">{t('orderId')}</label>
      <Input
        id="personal-number"
        className="!rounded-xl"
        value={orderIdFilter || ''}
        onChange={(e) => setOrderIdFilter(e.target.value)}
        placeholder={t('orderId')}
        size="large"
      />
    </div>
  );
}
