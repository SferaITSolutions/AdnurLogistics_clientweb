// components/molecules/NotificationToggle.tsx

import { Switch, Space } from 'antd';
import ActiveStatusBadge from '../atoms/ActiveStatusBadge';

interface NotificationToggleProps {
  active: boolean;
  isLoading: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * Xabarni yoqish/o'chirish: Switch + holat badge yonma-yon.
 */
const NotificationToggle = ({ active, isLoading, onChange }: NotificationToggleProps) => {
  return (
    <Space>
      <Switch
        checked={active}
        onChange={onChange}
        loading={isLoading}
      />
      <ActiveStatusBadge active={active} />
    </Space>
  );
};

export default NotificationToggle;