"use client";
import { useTranslations } from "next-intl";
import React from "react";

export default function InvoiceStatus({ invoiceStatus }: { invoiceStatus: string }) {
  const t = useTranslations("clientDashboard");
  const statusStyle: Record<string, string> = {
    Paid: "bg-green-50 text-green-700 border-green-200",
    "Paid In Full": "bg-green-50 text-green-700 border-green-200",
    Unpaid: "bg-red-50 text-red-700 border-red-200",
    Overdue: "bg-red-100 text-red-800 border-red-200",
    Partial: "bg-yellow-50 text-yellow-800 border-yellow-200",
    // default fallback
    Default: "bg-gray-100 text-gray-700 border-gray-200",
  };

  function extractStatusStyle(status = "") {
    if (status.includes("Paid In Full")) return statusStyle["Paid In Full"];
    if (status.includes("Paid")) return statusStyle.Paid;
    if (status.includes("Unpaid")) return statusStyle.Unpaid;
    if (status.includes("Overdue")) return statusStyle.Overdue;
    if (status.includes("Partial")) return statusStyle.Partial;
    return statusStyle.Default;
  }
  return (
    <div className="flex flex-row items-center justify-between mb-3">
      <span className="text-sm text-gray-500">{t("status")}</span>
      <span
        className={
          "px-3 py-1 text-xs rounded-xl border font-semibold " +
          extractStatusStyle(invoiceStatus)
        }
      >
        {invoiceStatus}
      </span>
    </div>
  );
}
