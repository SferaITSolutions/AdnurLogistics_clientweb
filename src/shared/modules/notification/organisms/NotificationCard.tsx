"use client";
import { Card, Divider } from 'antd';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useUpdateNotificationStatus, useCreateNotification } from '@/entities/hooks/notifications/hooks';
import SectionTitle from '../atoms/SectionTitle';
import NotificationToggle from '../molecules/NotificationToggle';
import SmsTextEditor from '../molecules/SmsTextEditor';
import SmsPreviewCard from '../molecules/SmsPreviewCard';

interface Notification {
  status: string;
  active: boolean;
  message: string;
}

interface NotificationCardProps {
  notification: Notification;
  icon: React.ReactNode;
  label: string;
  description: string;
}

/**
 * Bitta xabar turi uchun to'liq karta:
 * - Sarlavha + holat toggle
 * - SMS matn tahrirlash
 * - SMS namunasi preview
 */
const NotificationCard = ({
  notification,
  icon,
  label,
  description,
}: NotificationCardProps) => {
  const [editedMessage, setEditedMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateStatus, isPending } = useUpdateNotificationStatus();
  const { mutate: createStatus, isPending: isCreating } = useCreateNotification();

  useEffect(() => {
    if (!isEditing) {
      setEditedMessage(notification.message || '');
    }
  }, [notification.message, isEditing]);

  const handleToggle = (checked: boolean) => {
    updateStatus(
      { status: notification.status, active: checked },
      {
        onSuccess: () => toast.success(checked ? 'Yoqildi' : "O'chirildi"),
        onError: () => toast.error("Holat o'zgartirishda xatolik yuz berdi"),
      }
    );
  };

  const handleSave = () => {
    if (!editedMessage.trim()) {
      toast.error("Matn bo'sh bo'lishi mumkin emas");
      return;
    }

    createStatus(
      { status: notification.status, message: editedMessage } as any,
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success('Matn saqlandi');
        },
        onError: () => toast.error('Matn saqlashda xatolik yuz berdi'),
      }
    );
  };

  const handleCopy = () => {
    if (!notification.message) return;
    navigator.clipboard.writeText(notification.message);
    toast.success('SMS matni nusxalandi');
  };

  return (
    <Card>
      <div className="space-y-6">
        {/* Header: sarlavha + toggle */}
        <div className="flex items-center justify-between">
          <SectionTitle
            icon={icon}
            label={label}
            description={description}
          />
          <NotificationToggle
            active={notification.active}
            isLoading={isPending}
            onChange={handleToggle}
          />
        </div>

        <Divider />

        {/* SMS matn tahrirlash */}
        <SmsTextEditor
          message={notification.message}
          editedMessage={editedMessage}
          isEditing={isEditing}
          isActive={notification.active}
          isSaving={isCreating}
          onEdit={() => {
            setEditedMessage(notification.message || '');
            setIsEditing(true);
          }}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setEditedMessage(notification.message || '');
          }}
          onChange={setEditedMessage}
        />

        {/* SMS namunasi preview */}
        <SmsPreviewCard
          message={notification.message}
          onCopy={handleCopy}
        />
      </div>
    </Card>
  );
};

export default NotificationCard;    