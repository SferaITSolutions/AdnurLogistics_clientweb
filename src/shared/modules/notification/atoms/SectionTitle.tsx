// components/atoms/SectionTitle.tsx

import { Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface SectionTitleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
}

/**
 * Icon + asosiy matn + tavsif — Card ichidagi sarlavha bloki.
 */
const SectionTitle = ({ icon, label, description }: SectionTitleProps) => {
  return (
    <Space>
      <span className="text-2xl text-blue-600">{icon}</span>
      <div>
        <Text strong className="text-lg block">
          {label}
        </Text>
        <Text type="secondary">{description}</Text>
      </div>
    </Space>
  );
};

export default SectionTitle;