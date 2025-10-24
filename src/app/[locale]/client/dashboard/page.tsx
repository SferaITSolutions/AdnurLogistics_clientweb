"use client";
import { useOrderDetailsStore } from "@/features/order-details/lib/store";
import { Filters, List } from "@/shared/modules/cobenent-dashboard/ui";
import { useTranslations } from "next-intl";
import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function DashboardClient() {
  const t = useTranslations("clientDashboard");
  return ( 
    <div className="flex flex-col gap-4 container max-w-full">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <Filters />
      <List />
    </div>
  );
}
