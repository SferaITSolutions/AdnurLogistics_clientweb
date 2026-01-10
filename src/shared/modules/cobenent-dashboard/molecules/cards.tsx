'use client';

import React from 'react';
import { FaTruck } from 'react-icons/fa';
import ETA from '../atoms/ETA';
import OrderId from '../atoms/order-id';
import QuantityOrder from '../atoms/quentity-order';
import ToLocation from '../atoms/tolacation';
import StatusOrder from '../atoms/status-order';

interface DashboardCardProps {
  ETAdata?: number | string;
  OrderIdprops?: number | string;
  Quantity?: number | string;
  Volume?: number | string;
  Weight?: number | string;
  status?: number | string;
  quantity?: string | null;
  tolocation?: string | null;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  ETAdata,
  OrderIdprops,
  Quantity,
  Volume,
  Weight,
  status,
  quantity,
  tolocation,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full cursor-pointer bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-lg border border-gray-200/60 overflow-hidden hover:shadow-2xl hover:scale-[1.02] hover:border-blue-300/60 transition-all duration-300 ease-out"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-start gap-5 p-6">
        {/* Icon Container */}
        <div className="relative flex-shrink-0">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 group-hover:scale-110 transition-all duration-300">
            <FaTruck className="text-white text-2xl" />
          </div>
          {/* Pulsing dot indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Header Info */}
          <div className="space-y-2 mb-4">
            <ETA ETA={String(ETAdata)} />
            <ToLocation tolocation={String(tolocation)} />
            <OrderId OrderId={String(OrderIdprops)} />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 my-4" />

          {/* Footer Info */}
          <div className="space-y-3">
            <QuantityOrder 
              Volume={Number(Volume)} 
              Weight={Number(Weight)} 
              quantity={String(quantity)} 
            />
            <StatusOrder status={String(status)} />
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg 
            className="w-6 h-6 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;