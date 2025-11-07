'use client';

import React from 'react';
import { FaTruck } from 'react-icons/fa';
import ETA from '../atoms/ETA';
import OrderId from '../atoms/order-id';
import QuantityOrder from '../atoms/quentity-order';
import ToLocation from '../atoms/tolacation';

interface DashboardCardProps {
  ETAdata?: number | string;
  OrderIdprops?: number | string;
  Quantity?: number | string;
  Volume?: number | string;
  Weight?: number | string;
  Status?: number | string;
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
  Status,
  quantity,
  tolocation,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative w-full cursor-pointer flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-[2px] transition-all duration-200"
    >
      {/* Chapdagi rasm */}
      <div className="flex items-center gap-4 p-4">
        <div className="flex items-center justify-center min-w-14 h-14 rounded-full bg-gray-100">
          <FaTruck className="text-gray-700 text-2xl" />
        </div>

        {/* Ma'lumotlar */}
        <div className="flex flex-col text-sm text-gray-700 leading-6">
          <ETA ETA={String(ETAdata)} />
          <ToLocation tolocation={String(tolocation)} />
          <OrderId OrderId={String(OrderIdprops)} />
          <QuantityOrder Volume={Number(Volume)} Weight={Number(Weight)} quantity={String(quantity)} />
        </div>
      </div>

      {/* <StatusOrder status={Status} /> */}
    </div>
  );
};

export default DashboardCard;
