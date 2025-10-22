import React from "react";
// import DeleveryStatus from '../atoms/delevery-status'
import { FaArrowRight } from "react-icons/fa";
import { From, ToLocation } from "../atoms";

interface DeliviryStatusProps {
  deliviryStatus: {
    status: string;
    fromLocation?: string;
    toLocation?: string;
  };
}

export default function DeliviryStatus({
  deliviryStatus,
}: DeliviryStatusProps) {
  const from = deliviryStatus?.fromLocation;
  const to = deliviryStatus?.toLocation;

  const isLoading = !from && !to;

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-blue-50 border border-blue-200 shadow-sm text-gray-500 font-medium">
          <span>Maxsulotingiz Yig'ilmoqda </span>
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200 shadow-sm">
          <From from={from || "Shanghai"} />
          <FaArrowRight className="text-blue-400 text-lg" />
          <ToLocation to={to || "Tashkent"} />
        </div>
      )}
      {/* <DeleveryStatus deliviryStatus={deliviryStatus.status} /> */}
    </div>
  );
}
