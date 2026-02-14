// molecules/ViewDirectionPricesModal.tsx
"use client";

import React, { useState } from "react";
import { Modal, Table, Spin, Button, InputNumber, Switch, Space, Popconfirm, message } from "antd";
import { useDeliveryPricesPaginated, useUpdateDeliveryPrice, useDeleteDeliveryPrice } from "@/entities/hooks/delivery-price/hooks";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface ViewDirectionPricesModalProps {
  open: boolean;
  onClose: () => void;
  directionId: string | null;
}

const ViewDirectionPricesModal: React.FC<ViewDirectionPricesModalProps> = ({
  open,
  onClose,
  directionId,
}) => {
  const [editingKey, setEditingKey] = useState<string>("");
  const [editForm, setEditForm] = useState<any>({});

  const { data, isLoading, isError } = useDeliveryPricesPaginated({
    page: 0,
    size: 100,
    productId: directionId || "",
  });

  const { mutate: updatePrice, isPending: isUpdating } = useUpdateDeliveryPrice();
  const { mutate: deletePrice, isPending: isDeleting } = useDeleteDeliveryPrice();

  const prices = data?.result?.content || [];

  const isEditing = (record: any) => record.id === editingKey;

  const handleEdit = (record: any) => {
    setEditingKey(record.id);
    setEditForm({
      minWeight: record.minWeight,
      maxWeight: record.maxWeight,
      cub3: record.cub3,
      overPrice: record.overPrice,
    });
  };

  const handleCancel = () => {
    setEditingKey("");
    setEditForm({});
  };

  const handleSave = (record: any) => {
    // Validatsiya
    if (!editForm.overPrice && editForm.maxWeight && editForm.minWeight >= editForm.maxWeight) {
      message.error("Min og'irlik Max og'irlikdan kichik bo'lishi kerak");
      return;
    }

    if (editForm.minWeight <= 0) {
      message.error("Min og'irlik 0 dan katta bo'lishi kerak");
      return;
    }

    updatePrice(
      {
        id: record.id,
        directionId: directionId || "",
        ...editForm,
      },
      {
        onSuccess: () => {
          setEditingKey("");
          setEditForm({});
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deletePrice(id);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Min og'irlik (kg)",
      dataIndex: "minWeight",
      key: "minWeight",
      render: (value: number, record: any) => {
        if (isEditing(record)) {
          return (
            <InputNumber
              min={0.1}
              step={0.1}
              value={editForm.minWeight}
              onChange={(val) => setEditForm({ ...editForm, minWeight: val })}
              disabled={editForm.overPrice}
              className="w-full"
            />
          );
        }
        return <span className="font-medium">{value} kg</span>;
      },
    },
    {
      title: "Max og'irlik (kg)",
      dataIndex: "maxWeight",
      key: "maxWeight",
      render: (value: number, record: any) => {
        if (isEditing(record)) {
          return (
            <InputNumber
              min={0.1}
              step={0.1}
              value={editForm.maxWeight}
              onChange={(val) => setEditForm({ ...editForm, maxWeight: val })}
              disabled={editForm.overPrice}
              placeholder="Cheksiz"
              className="w-full"
            />
          );
        }
        return <span className="font-medium">{value ? `${value} kg` : "Cheksiz"}</span>;
      },
    },
    {
      title: "Kub (m³) narxi",
      dataIndex: "cub3",
      key: "cub3",
      render: (value: number, record: any) => {
        if (isEditing(record)) {
          return (
            <InputNumber
              min={0}
              step={1000}
              value={editForm.cub3}
              onChange={(val) => setEditForm({ ...editForm, cub3: val })}
              formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              parser={(val) => val!.replace(/\s?/g, "")}
              className="w-full"
            />
          );
        }
        return (
          <span className="font-semibold text-green-600">
            {value.toLocaleString()} $
          </span>
        );
      },
    },
    {
      title: "1000+ kg",
      dataIndex: "overPrice",
      key: "overPrice",
      width: 120,
      render: (value: boolean, record: any) => {
        if (isEditing(record)) {
          return (
            <Switch
              checked={editForm.overPrice}
              onChange={(checked) => {
                setEditForm({
                  ...editForm,
                  overPrice: checked,
                  minWeight: checked ? 1000 : 0.1,
                  maxWeight: checked ? undefined : editForm.maxWeight,
                });
              }}
            />
          );
        }
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              value
                ? "bg-orange-100 text-orange-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {value ? "Ha" : "Yo'q"}
          </span>
        );
      },
    },
    {
      title: "Amallar",
      key: "actions",
      width: 200,
      render: (_: any, record: any) => {
        if (isEditing(record)) {
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => handleSave(record)}
                loading={isUpdating}
                size="small"
              >
                Saqlash
              </Button>
              <Button
                onClick={handleCancel}
                size="small"
              >
                Bekor
              </Button>
            </Space>
          );
        }
        return (
          <Space>
            <Button
              type="link"
              icon={<FaEdit />}
              onClick={() => handleEdit(record)}
              disabled={editingKey !== ""}
            >
              Tahrirlash
            </Button>
            <Popconfirm
              title="Narxni o'chirish"
              description="Ushbu narxni o'chirishga ishonchingiz komilmi?"
              onConfirm={() => handleDelete(record.id)}
              okText="Ha"
              cancelText="Yo'q"
              okButtonProps={{ 
                danger: true,
                loading: isDeleting 
              }}
              disabled={editingKey !== ""}
            >
              <Button
                type="link"
                danger
                icon={<MdDelete />}
                disabled={editingKey !== ""}
              >
                O'chirish
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span>Yetkazib berish narxlari</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      destroyOnClose
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="Narxlar yuklanmoqda..." />
        </div>
      ) : isError ? (
        <div className="text-red-600 text-center p-8">
          Narxlarni yuklashda xato yuz berdi
        </div>
      ) : prices.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          Bu yo'nalish uchun narxlar hali kiritilmagan
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={prices.map((p: any, idx: number) => ({ ...p, key: p.id || idx }))}
          rowKey={(record) => record.id}
          pagination={false}
          size="middle"
          className="mt-4"
          rowClassName={(record) =>
            isEditing(record) ? "bg-blue-50" : "hover:bg-gray-50"
          }
        />
      )}
    </Modal>
  );
};

export default ViewDirectionPricesModal;