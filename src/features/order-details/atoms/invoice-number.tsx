"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function InvoiceNumber({
  invoiceNumber,
}: {
  invoiceNumber: string;
}) {
  const t = useTranslations("clientDashboard");
  return (
    <div className="flex flex-row items-center justify-between mb-4">
      <span className="text-sm font-semibold text-gray-500">
        {t("invoiceNumber")}
      </span>
      <span className="text-base font-bold text-gray-800">{invoiceNumber}</span>
    </div>
  );
}
