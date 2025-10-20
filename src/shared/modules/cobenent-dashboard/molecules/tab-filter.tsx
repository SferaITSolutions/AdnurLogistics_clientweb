'use client'
import { Tabs } from 'antd'
import React, { useState } from 'react'

export default function TabFilter() {
    const [activeKey, setActiveKey] = useState("1");

    const onChange = (key: string) => {
      setActiveKey(key);
      // You can use activeKey elsewhere for filtering logic
    };

    const items = [
        {
            key: "ALL",
            label: "Barchasi",
        },
        {
            key: "INTRANSIT",
            label: "Yetkazib berish jarayonida",
        },
        {
            key: "DELAVERED",
            label: "Yetkazib berish kutilmoqda",
        },
        {
            key: "PAYMENT_WAITING",
            label: "To'lov kutilmoqda",
        }
    ];

    return (
      <div>
        <Tabs
          defaultActiveKey="1"
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
