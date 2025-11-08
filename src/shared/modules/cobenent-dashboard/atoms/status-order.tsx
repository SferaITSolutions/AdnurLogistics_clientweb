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
    Pending_Approval: "bg-gray-400 text-white border-gray-500",
    Closed: "bg-green-500 text-white",
    Pending_Billing: "bg-yellow-500 text-white",
    Default: "bg-gray-400 text-white border-gray-500",
  };

  return (
    <div className={`w-max font-semibold  py-1 px-2 flex items-center justify-center text-sm rounded-xl ${statusStyle[formatStatus(status)]}`}>
      <h1 className={`text-md w-fit !m-0 !p-0`}>{t(formatStatus(status))}</h1>
    </div>
  );
}
