// components/atoms/EmptyView.tsx

import { Typography } from 'antd';

const { Text } = Typography;

interface EmptyViewProps {
  message: string;
}

/**
 * Ma'lumot topilmaganda ko'rsatiladigan view.
 */
const EmptyView = ({ message }: EmptyViewProps) => {
  return (
    <div className="p-6 text-center">
      <Text type="secondary">{message}</Text>
    </div>
  );
};

export default EmptyView;