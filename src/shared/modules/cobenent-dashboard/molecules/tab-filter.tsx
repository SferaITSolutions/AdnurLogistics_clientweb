"use client";
import { Tabs } from "antd";
import React, { useState } from "react";
import { useOrderDetailsStore } from "@/features/order-details/lib/store";
import { useTranslations } from "next-intl";

export default function TabFilter() {
  const t = useTranslations("clientDashboard");
  const items = [
    {
      key: "0",
      label: t("all"),
    },
    {
      key: "1",
      label: t("inDelivery"),
    },
    {
      key: "2",
      label: t("pendingDelivery"),
    },
    {
      key: "3",
      label: t("pendingPayment"),
    },
  ];
  const [activeKey, setActiveKey] = useState("0");
  const { setType } = useOrderDetailsStore();
  const onChange = (key: string) => {
    setActiveKey(key);
    setType(key);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="0"
        activeKey={activeKey}
        onChange={onChange}
        items={items}
        tabBarStyle={{
          fontWeight: 600,
          marginBottom: 16,
        }}
      />
    </div>
  );
}
