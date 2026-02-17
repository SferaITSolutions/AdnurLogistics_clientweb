"use client";

import React, { useState, useRef, useEffect } from "react";
import { Modal, Table, Spin, Button, Form, Divider, message } from "antd";
import { FaPlus, FaWeight } from "react-icons/fa";
import {
  useDeliveryPricesPaginated,
  useUpdateDeliveryPrice,
  useDeleteDeliveryPrice,
  useCreateDeliveryPrice,
} from "@/entities/hooks/delivery-price/hooks";
import { getPriceTableColumns } from "../molecules/PriceTableColumns";
import PriceFormList from "../molecules/PriceFormList";
import ModalFooterButtons from "../atoms/ModalFooterButtons";

interface PriceItem {
  minWeight: number;
  maxWeight?: number;
  cub3: number;
  overPrice: boolean;
}

interface EditForm {
  minWeight: number;
  maxWeight?: number;
  cub3: number;
  overPrice: boolean;
}

interface ViewDirectionPricesModalProps {
  open: boolean;
  onClose: () => void;
  directionId: string | null;
}

const ViewDirectionPricesModal = ({
  open,
  onClose,
  directionId,
}: ViewDirectionPricesModalProps) => {
  const [editingKey, setEditingKey] = useState<string>("");
  const [editForm, setEditForm] = useState<EditForm>({
    minWeight: 0,
    maxWeight: undefined,
    cub3: 0,
    overPrice: false,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [form] = Form.useForm();

  const { data, isLoading, isError, refetch } = useDeliveryPricesPaginated({
    page: 0,
    size: 100,
    directionId: directionId || "",
  });

  const { mutate: updatePrice, isPending: isUpdating } = useUpdateDeliveryPrice();
  const { mutate: deletePrice, isPending: isDeleting } = useDeleteDeliveryPrice();
  const { mutate: createPrices, isPending: isCreating } = useCreateDeliveryPrice();

  const prices = data?.result?.content || [];

  // Modal ochilganda add form uchun boshlang'ich qiymatlar
  useEffect(() => {
    if (open && showAddForm) {
      form.setFieldsValue({
        priceList: [
          { minWeight: null, maxWeight: undefined, cub3: null, overPrice: false },
        ],
      });
    }
  }, [open, showAddForm, form]);

  // --- Inline edit handlers ---
  const handleEdit = (record: any) => {
    setEditingKey(record.id);
    setEditForm({
      minWeight: record.minWeight,
      maxWeight: record.maxWeight,
      cub3: record.cub3,
      overPrice: record.overPrice,
    });
  };

  const handleSave = (record: any) => {
    if (!editForm.overPrice && editForm.maxWeight && editForm.minWeight >= editForm.maxWeight) {
      message.error("Min og'irlik Max og'irlikdan kichik bo'lishi kerak");
      return;
    }
    updatePrice(
      { id: record.id, directionId: directionId || "", maxWeight: editForm.maxWeight ?? 0, ...editForm },
      {
        onSuccess: () => {
          setEditingKey("");
          setEditForm({ minWeight: 0, cub3: 0, overPrice: false });
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setEditingKey("");
    setEditForm({ minWeight: 0, cub3: 0, overPrice: false });
  };

  const handleDelete = (id: string) => {
    deletePrice(id);
  };

  // --- Add form handlers ---
  const handleCancelAdd = () => {
    setShowAddForm(false);
    form.resetFields();
  };

  const onFinish = (values: { priceList: PriceItem[] }) => {
    const hasError = values.priceList.some((item, idx) => {
      if (
        !item.overPrice &&
        item.maxWeight !== undefined &&
        item.maxWeight != null &&
        item.minWeight >= item.maxWeight
      ) {
        message.error(
          `${idx + 1}-oralig'da Min og'irlik Maxdan katta yoki teng bo'lmasligi kerak`
        );
        return true;
      }
      return false;
    });
    if (hasError) return;

    const payload = {
      priceList: values.priceList.map((item) => ({
        ...item,
        directionId,
        maxWeight: item.overPrice ? null : item.maxWeight ?? null,
      })),
    };

    createPrices(payload, {
      onSuccess: (data: any) => {
        if (data && typeof data === "object" && data.success === false) {
          message.error(`Xatolik: ${data.message || "Server muvaffaqiyatsiz javob qaytardi"}`);
          return;
        }
        message.success("Narxlar muvaffaqiyatli qo'shildi");
        form.resetFields();
        setShowAddForm(false);
        refetch();
      },
      onError: (err: any) => {
        message.error("Xatolik yuz berdi: " + err);
      },
    });
  };

  const columns = getPriceTableColumns({
    editingKey,
    editForm,
    setEditForm,
    isUpdating,
    isDeleting,
    showAddForm,
    onEdit: handleEdit,
    onSave: handleSave,
    onCancel: handleCancelEdit,
    onDelete: handleDelete,
  });

  return (
    <Modal
      title={
        <div className="flex items-end justify-between !mr-6">
          <span className="text-lg font-semibold">Yetkazib berish narxlari</span>
          {!showAddForm && prices.length > 0 && (
            <Button
              type="primary"
              icon={<FaPlus />}
              onClick={() => setShowAddForm(true)}
              disabled={editingKey !== ""}
            >
              Narx qo'shish
            </Button>
          )}
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
      ) : (
        <>
          {prices.length === 0 && !showAddForm ? (
            <div className="text-center p-8">
              <p className="text-gray-500 mb-4">
                Bu yo'nalish uchun narxlar hali kiritilmagan
              </p>
              <Button
                type="primary"
                icon={<FaPlus />}
                onClick={() => setShowAddForm(true)}
                size="large"
              >
                Birinchi narxni qo'shish
              </Button>
            </div>
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={prices.map((p: any, idx: number) => ({
                  ...p,
                  key: p.id || idx,
                }))}
                rowKey={(record) => record.id}
                pagination={false}
                size="middle"
                className="mt-4"
                rowClassName={(record) =>
                  record.id === editingKey ? "bg-blue-50" : "hover:bg-gray-50"
                }
              />

              {showAddForm && (
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <PriceFormList
                    form={form}
                    title="Yetkazib berish narxlarini qo'shish"
                  />
                  <Divider />
                  <ModalFooterButtons
                    onCancel={handleCancelAdd}
                    isLoading={isCreating}
                    submitLabel="Narxlarni saqlash"
                    loadingLabel="Saqlanmoqda..."
                  />
                </Form>
              )}
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default ViewDirectionPricesModal;