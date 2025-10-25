'use client';

import { From, ToLocation } from '../atoms';

import { FaArrowRight } from 'react-icons/fa';
// import DeleveryStatus from '../atoms/delevery-status'
import { useTranslations } from 'next-intl';

interface DeliviryStatusProps {
  deliviryStatus: {
    status: string;
    fromLocation?: string;
    toLocation?: string;
  };
}

export default function DeliviryStatus({ deliviryStatus }: DeliviryStatusProps) {
  const from = deliviryStatus?.fromLocation ? 'Yiwu, China' : null;
  const to = deliviryStatus?.toLocation;
  const t = useTranslations('clientDashboard');
  const isLoading = !from && !to;

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm text-gray-500 !font-medium">
          <span className="text-lg">{t('itemsBeingCollected')}</span>
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200 shadow-sm">
          <From from={from || 'Shanghai'} />
          <FaArrowRight className="text-blue-400 text-lg" />
          <ToLocation to={to || 'Tashkent'} />
        </div>
      )}
    </div>
  );
}
