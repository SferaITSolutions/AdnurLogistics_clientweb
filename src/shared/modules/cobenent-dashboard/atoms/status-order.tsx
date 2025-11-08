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

  return (
    <div className=" bg-green-600 w-max text-white font-semibold  py-1 px-2 flex items-center justify-center text-sm rounded-xl">
      <h1 className="text-md w-fit !m-0 !p-0">{t(formatStatus(status))}</h1>
    </div>
  );
}
