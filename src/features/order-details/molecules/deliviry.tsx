import { From, ToLocation } from '../atoms';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { FaTruck, FaTruckLoading, FaMapPin } from 'react-icons/fa';

interface DeliviryStatusProps {
  deliviryStatus: {
    status: string;
    fromlocation?: string;
    tolocation?: string;
  };
}

export default function DeliviryStatus({ deliviryStatus }: DeliviryStatusProps) {
  const from = deliviryStatus?.fromlocation;
  const to = deliviryStatus?.tolocation;
  const t = useTranslations('clientDashboard');
  const isLoading = !from && !to;
  console.log(deliviryStatus);
  
  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="relative overflow-hidden flex items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200/60 shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
          <FaTruckLoading className="w-6 h-6 text-blue-500 animate-pulse" />
          <span className="relative text-lg font-semibold text-blue-700">{t('itemsBeingCollected')}</span>
        </div>
      ) : (
        <div className="relative group">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          
          <div className="relative flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-white to-blue-50/30 border border-blue-200/60 shadow-md hover:shadow-xl transition-all duration-300">
            {/* From Location */}
            <div className="flex items-center gap-2 flex-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 border border-green-200">
                <FaMapPin className="w-5 h-5 text-green-600" />
              </div>
              <From from={from || 'Shanghai'} />
            </div>
            
            {/* Arrow with animation */}
            <div className="flex-shrink-0">
              <div className="relative">
                <FaArrowRight className="text-blue-500 text-xl animate-pulse" />
                <div className="absolute inset-0 animate-ping">
                  <FaArrowRight className="text-blue-300 text-xl opacity-75" />
                </div>
              </div>
            </div>
            
            {/* To Location */}
            <div className="flex items-center gap-2 flex-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 border border-red-200">
                <FaMapPin className="w-5 h-5 text-red-600" />
              </div>
              <ToLocation to={to || 'Tashkent'} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}