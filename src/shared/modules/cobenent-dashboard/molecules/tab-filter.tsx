'use client'
import { Tabs } from 'antd'
import React, { useState } from 'react'
import { items } from '@/shared/constants'

export default function TabFilter() {
    const [activeKey, setActiveKey] = useState("ALL");

    const onChange = (key: string) => {
      setActiveKey(key);
      // You can use activeKey elsewhere for filtering logic
    };



    return (
      <div>
        <Tabs
          defaultActiveKey="ALL"
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
