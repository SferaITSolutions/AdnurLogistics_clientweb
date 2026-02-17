import { Typography } from 'antd';

const { Text } = Typography;

interface LoadingViewProps {
  message?: string;
}

/**
 * Sahifa yuklanayotganda ko'rsatiladigan markaziy view.
 */
const LoadingView = ({ message = 'Yuklanmoqda...' }: LoadingViewProps) => {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Text>{message}</Text>
    </div>
  );
};

export default LoadingView;