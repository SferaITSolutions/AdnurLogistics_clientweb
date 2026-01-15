'use client';

import { useState, useEffect } from 'react';
import { FiRefreshCw, FiCopy, FiSave } from 'react-icons/fi';
import { toast } from 'sonner';

import { useCreateNotification, useNotifications, useUpdateNotificationStatus } from '@/entities/hooks/notifications/hooks';

import {
  Switch,
  Button,
  Badge,
  Card,
  Typography,
  Input,
  Space,
  Tag,
  Divider,
} from 'antd';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

const NOTIFICATION_TYPE = {
  status: 'APP_VERSION',
  label: "Versiya o'zgarganda",
  keyForDisplay: 'version_changed',
  icon: FiRefreshCw,
} as const;

export default function AutoNotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();
  const { mutate: updateStatus, isPending } = useUpdateNotificationStatus();
  const { mutate: createStatus, isPending: isCreating } = useCreateNotification();
  
  const [editedMessage, setEditedMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const currentNotification = notifications?.result?.find(
    (n: any) => n.status === NOTIFICATION_TYPE.status
  ) || null;

  // currentNotification o'zgarganda editedMessage ni yangilash
  useEffect(() => {
    if (currentNotification && !isEditing) {
      setEditedMessage(currentNotification.message || '');
    }
  }, [currentNotification, isEditing]);

  const handleToggle = (checked: boolean) => {
    if (!currentNotification) {
      toast.error("Xabar topilmadi");
      return;
    }

    updateStatus(
      {
        status: currentNotification?.status?.toString(),
        active: checked,
      },
      {
        onSuccess: () => {
          toast.success(checked ? 'Yoqildi' : "O'chirildi");
        },
        onError: () => {
          toast.error("Holat o'zgartirishda xatolik yuz berdi");
        },
      }
    );
  };

  const handleEdit = () => {
    setEditedMessage(currentNotification?.message || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editedMessage.trim()) {
      toast.error("Matn bo'sh bo'lishi mumkin emas");
      return;
    }

    // Message ni yangilash uchun updateStatus ishlatamiz
    // Agar backend message ni ham qabul qilsa
    createStatus(
      {
        status: currentNotification?.status?.toString(),
        message: editedMessage, // Backend bu field ni qabul qilishi kerak
      } as any,
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Matn saqlandi");
        },
        onError: () => {
          toast.error("Matn saqlashda xatolik yuz berdi");
        },
      }
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMessage(currentNotification?.message || '');
  };

  const handleCopy = () => {
    if (!currentNotification?.message) return;

    navigator.clipboard.writeText(currentNotification.message);
    toast.success('SMS matni nusxalandi');
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Text>Yuklanmoqda...</Text>
      </div>
    );
  }

  if (!notifications?.result?.length || !currentNotification) {
    return (
      <div className="p-6 text-center">
        <Text type="secondary">
          "APP_VERSION" xabari hali sozlanmagan yoki serverda mavjud emas
        </Text>
      </div>
    );
  }

  return (
    <div className="">
      <Title level={2} className="!mb-4">
        Avtomatik SMS sozlamalari
      </Title>

      <div className="mb-6">
        <Tag color="blue" style={{ padding: '6px 16px', fontSize: 14 }}>
          <Space>
            <NOTIFICATION_TYPE.icon />
            {NOTIFICATION_TYPE.label}
          </Space>
        </Tag>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Space>
              <NOTIFICATION_TYPE.icon className="text-2xl text-blue-600" />
              <div>
                <Text strong className="text-lg block">
                  {NOTIFICATION_TYPE.label}
                </Text>
                <Text type="secondary">Dastur yangilanganda yuboriladi</Text>
              </div>
            </Space>

            <Space>
              <Switch
                checked={currentNotification.active}
                onChange={handleToggle}
                loading={isPending}
              />
              <Badge
                status={currentNotification.active ? 'success' : 'default'}
                text={currentNotification.active ? 'Faol' : "O'chirilgan"}
              />
            </Space>
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-2">
              <Text strong>SMS matni</Text>
              {!isEditing && currentNotification.active && (
                <Button 
                  type="link" 
                  onClick={handleEdit}
                  disabled={isPending}
                >
                  Tahrirlash
                </Button>
              )}
            </div>
            
            <TextArea
              value={isEditing ? editedMessage : currentNotification.message || 'Matn mavjud emas'}
              onChange={(e) => setEditedMessage(e.target.value)}
              readOnly={!isEditing}
              disabled={!currentNotification.active && !isEditing}
              autoSize={{ minRows: 4, maxRows: 10 }}
              placeholder="SMS matnini kiriting"
              className={!currentNotification.active && !isEditing ? 'bg-gray-100' : ''}
            />

            {isEditing && (
              <Space className="mt-3">
                <Button 
                  type="primary" 
                  icon={<FiSave />}
                  onClick={handleSave}
                  loading={isPending}
                >
                  Saqlash
                </Button>
                <Button onClick={handleCancel} disabled={isPending}>
                  Bekor qilish
                </Button>
              </Space>
            )}

            {!currentNotification.active && !isEditing && (
              <Text type="secondary" className="text-xs block mt-2">
                Tahrirlash uchun avval xabarni yoqing
              </Text>
            )}
          </div>

          <div className="mt-8">
            <Title level={4}>Yuboriladigan SMS namunasi</Title>
            <Card className="bg-gray-50">
              <Space direction="vertical" className="w-full">
                <Space className="mb-3">
                  <div>
                    <Text type="secondary" className="text-xs">
                      {new Date().toLocaleTimeString('uz-UZ')}
                    </Text>
                  </div>
                </Space>

                <Paragraph className="whitespace-pre-line !mb-0">
                  {currentNotification.message || 'Namuna mavjud emas'}
                </Paragraph>
              </Space>
            </Card>

            {currentNotification.message && (
              <Button
                type="default"
                icon={<FiCopy />}
                onClick={handleCopy}
                className="!mt-3"
              >
                Matnni nusxalash
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}