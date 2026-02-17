
import { Tag, Space } from 'antd';
import React from 'react';

interface NotificationTagProps {
  icon: React.ReactNode;
  label: string;
}

/**
 * "Versiya o'zgarganda" kabi xabar turi tegi.
 */
const NotificationTag = ({ icon, label }: NotificationTagProps) => {
  return (
    <Tag color="blue" style={{ padding: '6px 16px', fontSize: 14 }}>
      <Space>
        {icon}
        {label}
      </Space>
    </Tag>
  );
};

export default NotificationTag;