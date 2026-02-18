'use client';

import { Typography } from 'antd';
import { FiRefreshCw } from 'react-icons/fi';
import { useNotifications } from '@/entities/hooks/notifications/hooks';
import LoadingView from '../atoms/LoadingView';
import EmptyView from '../atoms/EmptyView';
import NotificationTag from '../atoms/NotificationTag';
import NotificationCard from '../organisms/NotificationCard';

const { Title } = Typography;

const NOTIFICATION_TYPE = {
  status: 'APP_VERSION',
  label: "Versiya o'zgarganda",
  description: 'Dastur yangilanganda yuboriladi',
  icon: <FiRefreshCw />,
} as const;

export default function AutoNotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();

  if (isLoading) {
    return <LoadingView />;
  }

  const currentNotification = notifications?.result?.find(
    (n: any) => n.status === NOTIFICATION_TYPE.status
  ) || null;

  if (!notifications?.result?.length || !currentNotification) {
    return (
      <EmptyView message='"APP_VERSION" xabari hali sozlanmagan yoki serverda mavjud emas' />
    );
  }

  return (
    <div>
      <Title level={2} className="!mb-4">
        Avtomatik SMS sozlamalari
      </Title>

      <div className="mb-6">
        <NotificationTag
          icon={<FiRefreshCw />}
          label={NOTIFICATION_TYPE.label}
        />
      </div>

      <NotificationCard
        notification={currentNotification}
        icon={<FiRefreshCw />}
        label={NOTIFICATION_TYPE.label}
        description={NOTIFICATION_TYPE.description}
      />
    </div>
  );
}