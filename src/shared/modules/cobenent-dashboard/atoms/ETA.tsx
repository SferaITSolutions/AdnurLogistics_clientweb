'use client';

import { useTranslations } from 'next-intl';

export default function ETA({ ETA }: { ETA: string }) {
  const t = useTranslations('clientDashboard');
  return (
    <div className="space-x-2">
      <span className="!font-[700]">{t('eta')}</span>
      <span>{ETA}</span>
    </div>
  );
}
