"use client";
import { useTranslations } from "next-intl";
import React from "react";

export default function DocumentNumber({
  documentNumber,
}: {
  documentNumber: string;
}) {
  const t = useTranslations("clientDashboard");
    return (
    <div className="flex flex-row items-center justify-between mb-3">
      <span className="text-sm text-gray-500">{t("orderId")}</span>
      <span className="text-sm font-medium text-blue-700">
        {documentNumber}
      </span>
    </div>
  );
}
