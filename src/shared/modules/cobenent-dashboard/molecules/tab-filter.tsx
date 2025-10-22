"use client";
import { Tabs } from "antd";
import React, { useState } from "react";
import { items } from "@/shared/constants";
import { useOrderDetailsStore } from "@/features/order-details/lib/store";

export default function TabFilter() {
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
