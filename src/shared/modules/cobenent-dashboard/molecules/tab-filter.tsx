'use client';

import { useOrderDetailsStore } from '@/features/order-details/lib/store';
import { Tabs } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function TabFilter() {
  const t = useTranslations('clientDashboard');
  const items = [
    {
      key: '0',
      label: t('activeOrder'),
    },
    {
      key: '1',
      label: t('savedOrder'),
    },
  ];
  const [activeKey, setActiveKey] = useState('0');
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
