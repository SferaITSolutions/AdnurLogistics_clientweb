"use client";
import { Input } from "antd";
import React from "react";
import { useOrderDetailsStore } from "@/features/order-details/lib/store";
import { useTranslations } from "next-intl";

export default function FilterPersonalNumber() {
  // const { PersonalNumber, setPersonalNumber } = useDashboardFilters();
  const { setOrderIdFilter, orderIdFilter } = useOrderDetailsStore();
  const t = useTranslations("clientDashboard");
  return (
    <div className="flex flex-col gap-2 border rounded-xl p-3">
      <label htmlFor="personal-number text-2xl">{t("orderId")}</label>
      <Input
        id="personal-number"
        value={orderIdFilter || ""}
        onChange={(e) => {
          setOrderIdFilter(e.target.value);
        }}
        placeholder={t("orderId")}
      />
    </div>
  );
}
