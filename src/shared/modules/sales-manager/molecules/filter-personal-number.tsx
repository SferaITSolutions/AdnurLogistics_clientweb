'use client';

import { useOrderDetailsStore } from '@/features/order-details/lib/store';
import { Input } from 'antd';
import { useTranslations } from 'next-intl';
import { FaSearch, FaHashtag, FaTimes } from 'react-icons/fa';

export default function FilterPersonalNumber() {
  const { setOrderIdFilterSaller, orderIdFilterSaller } = useOrderDetailsStore();
  const t = useTranslations('common');
  
  return (
    <div className="group relative">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex flex-col gap-3 border-2 border-gray-200/60 hover:border-blue-300/60 rounded-2xl shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50/50 p-5 transition-all duration-300">
        {/* Header with icon */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
            <FaHashtag className="w-5 h-5 text-white" />
          </div>
          <label 
            htmlFor="personal-number" 
            className="text-base font-bold text-gray-800 m-0"
          >
            {/* {t('orderId')} */}
            {t("userId")}
          </label>
        </div>

        {/* Decorative divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Input wrapper with icon */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <FaSearch className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
          </div>
          
          <Input
            id="personal-number"
            className="!rounded-xl !pl-12 !pr-4 !py-3 !border-2 !border-gray-200 hover:!border-blue-400 focus:!border-blue-500 !shadow-sm hover:!shadow-md focus:!shadow-lg !transition-all !duration-200 !bg-white"
            value={orderIdFilterSaller || ''}
            onChange={(e) => setOrderIdFilterSaller(e.target.value)}
            placeholder={``}
            size="large"
          />
          
          {/* Clear button */}
          {orderIdFilterSaller && (
            <button
              onClick={() => setOrderIdFilterSaller('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-red-100 text-gray-500 hover:text-red-600 transition-all duration-200 hover:scale-110"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}