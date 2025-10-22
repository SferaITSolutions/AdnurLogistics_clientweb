"use client";
import { Input } from "antd";
import React from "react";
import { useOrderDetailsStore } from "@/features/order-details/lib/store";

export default function FilterPersonalNumber() {
  // const { PersonalNumber, setPersonalNumber } = useDashboardFilters();
  const { setOrderIdFilter, orderIdFilter } = useOrderDetailsStore();
  return (
    <div className="flex flex-col gap-2 border rounded-xl p-3">
      <label htmlFor="personal-number text-2xl">Buyurtma raqami</label>
      <Input
        id="personal-number"
        value={orderIdFilter || ""}
        onChange={(e) => {
          setOrderIdFilter(e.target.value);
        }}
        placeholder="Shaxsiy hisob raqam"
      />
    </div>
  );
}
