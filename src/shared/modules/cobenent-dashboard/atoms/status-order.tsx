"use client";

import { useTranslations } from "next-intl";
import React from "react";

export default function StatusOrder({ status }: { status: string }) {
  // Biz JSONda "yandexMap" bo'limiga joylaganimiz uchun shu namespace'ni ishlatamiz
  const t = useTranslations("yandexMap");

  function formatStatusKey(status: string) {
    switch (status) {
      case 'Sales Order : Pending Approval':
        return 'pendingConfirmation';
      case 'Sales Order : Pending Fulfillment':
        return 'pendingFulfillment';
      case 'Sales Order : Partially Fulfilled':
        return 'partiallyFulfilled';
      case 'Sales Order : Pending Billing / Partially Fulfilled':
        return 'pendingBillingPartially';
      case 'Sales Order : Pending Billing':
        return 'pendingPayment';
      case 'Sales Order : Billed':
        return 'billed';
      case 'Sales Order : Closed':
        return 'closedDelivered';
      default:
        return 'default';
    }
  }

  const statusStyle: Record<string, string> = {
    pendingConfirmation: "bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-md shadow-slate-400/30",
    pendingFulfillment: "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-amber-400/30",
    partiallyFulfilled: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/30",
    pendingBillingPartially: "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-md shadow-orange-400/30",
    pendingPayment: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md shadow-yellow-400/30",
    billed: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30",
    closedDelivered: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-500/30",
    default: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md shadow-gray-400/30",
  };

  const key = formatStatusKey(status);

  return (
    <div 
      className={`w-max font-semibold py-2 px-4 flex items-center justify-center text-sm rounded-xl transition-all duration-300 hover:scale-105 ${statusStyle[key] || statusStyle.default}`}
    >
      <h1 className="text-sm w-fit !m-0 !p-0 tracking-wide uppercase">
        {key === 'default' ? status : t(key)}
      </h1>
    </div>
  );
}