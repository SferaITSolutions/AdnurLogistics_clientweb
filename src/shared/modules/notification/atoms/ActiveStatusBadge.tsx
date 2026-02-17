
import { Badge } from 'antd';

interface ActiveStatusBadgeProps {
  active: boolean;
}

const ActiveStatusBadge = ({ active }: ActiveStatusBadgeProps) => {
  return (
    <Badge
      status={active ? 'success' : 'default'}
      text={active ? 'Faol' : "O'chirilgan"}
    />
  );
};

export default ActiveStatusBadge;