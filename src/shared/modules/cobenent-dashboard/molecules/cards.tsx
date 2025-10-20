"use client";
import React from "react";
import { FaTruck } from "react-icons/fa";
import StatusOrder from "../atoms/status-order";
import QuantityOrder from "../atoms/quentity-order";
import OrderId from "../atoms/order-id";
import ETA from "../atoms/ETA";

interface DashboardCardProps {
  ETAdata: string;
  OrderIdprops: string;
  Quantity: number;
  Volume: number;
  Weight: string;
  Status: string;
  onClick: () => void,
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  ETAdata,
  OrderIdprops,
  Quantity,
  Volume,
  Weight,
  Status,
  onClick
}) => {
  return (
    <div onClick={onClick} className="relative cursor-pointer flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-[2px] transition-all duration-200">
      {/* Chapdagi rasm */}
      <div className="flex items-center gap-4 p-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100">
          <FaTruck className="text-gray-700 text-xl" />
        </div>

        {/* Ma'lumotlar */}
        <div className="flex flex-col text-sm text-gray-700 leading-6">
          <ETA ETA={ETAdata} />
          <OrderId OrderId={OrderIdprops} />
          <QuantityOrder Quantity={Quantity} Volume={Volume} Weight={Weight} />
        </div>
      </div>

      <StatusOrder status={Status} />
    </div>
  );
};

export default DashboardCard;
