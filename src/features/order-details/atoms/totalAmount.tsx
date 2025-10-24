"use client";
import { useTranslations } from "next-intl";
import React from "react";

export default function TotalAmount({
  invoiceTotalAmount,
  currency,
}: {
  invoiceTotalAmount: string;
  currency: string;
}) {
  const t = useTranslations("clientDashboard");
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-500">{t("totalAmount")}</span>
      <span className="font-bold text-primary-blue text-lg">
        {Number(invoiceTotalAmount).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        {currency}
      </span>
    </div>
  );
}
