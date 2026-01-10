import { useTranslations } from "next-intl";
import React from "react";

export default function StatusOrder({ status }: { status: string }) {
  const t = useTranslations("");
  function formatStatus(status: string) {
    switch (status) {
      case 'Sales Order : Pending Approval':
        return 'Pending_Approval';
      case 'Sales Order : Closed':
        return 'Closed';
      case 'Sales Order : Pending Billing':
        return 'Pending_Billing';
      default:
        return status;
    }
  }

  const statusStyle: Record<string, string> = {
    Pending_Approval: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md shadow-gray-400/30",
    Closed: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-500/30",
    Pending_Billing: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md shadow-yellow-400/30",
    Default: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md shadow-gray-400/30",
  };

  return (
    <div className={`w-max font-semibold py-2 px-4 flex items-center justify-center text-sm rounded-xl transition-all duration-300 hover:scale-105 ${statusStyle[formatStatus(status)] || statusStyle.Default}`}>
      <h1 className="text-sm w-fit !m-0 !p-0 tracking-wide">{t(formatStatus(status))}</h1>
    </div>
  );
}