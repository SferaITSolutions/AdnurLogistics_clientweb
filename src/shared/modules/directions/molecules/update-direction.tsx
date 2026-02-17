"use client";

import React, { useEffect } from "react";
import { Modal, Form, Select, Button, Spin, message } from "antd";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks";
import { useUpdateDirection } from "@/entities/hooks/directions/hooks"; // oldingi hook
import { getLocalItem } from "@/shared/utils/storage";

const { Option } = Select;

interface Direction {
  id: string;
  productId: string;
  fromLocationId: string;
  toLocationId: string;
  // agar nomlar backenddan kelsa:
  // fromLocationName?: string;
  // toLocationName?: string;
}

interface EditDirectionModalProps {
  open: boolean;
  onClose: () => void;
  direction: Direction | null;   // tahrirlanayotgan yo'nalish
  onSuccess?: () => void;
}

export default function EditDirectionModal({
  open,
  onClose,
  direction,
  onSuccess,
}: EditDirectionModalProps) {
  const t = useTranslations("calculationPage"); // yoki kerakli namespace
  const [form] = Form.useForm();  

  const lang = getLocalItem("lang")?.toString() || "uz";

  const { data: fromData, isLoading: fromLoading } = useGetFromList(lang);
  const { data: toData, isLoading: toLoading } = useGetToList(lang);

  const { mutate: updateDirection, isPending: isUpdating } = useUpdateDirection();

  // Modal ochilganda formani to'ldirish
  useEffect(() => {
    if (open && direction) {
      form.setFieldsValue({
        from: direction.fromLocationId,
        to: direction.toLocationId,
      });
    } else {
      form.resetFields();
    }
  }, [open, direction, form]);

  const onFinish = (values: any) => {
    if (!direction?.id) {
      message.error("Yo'nalish ID topilmadi");
      return;
    }

    const payload: any = {
      id: direction.id,
      productId: direction.productId,
      fromLocationId: values.from,
      toLocationId: values.to,
      priceList: []
    };

    updateDirection(payload, {
      onSuccess: () => {
        message.success("Yo'nalish muvaffaqiyatli yangilandi");
        form.resetFields();
        onClose();
        onSuccess?.();
      },
      onError: (err: any) => {
        message.error("Yangilashda xato: " + (err.message || "Noma'lum xato"));
      },
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const loading = fromLoading || toLoading;

  return (
    <Modal
      title={
        <div className="text-xl font-bold flex items-center gap-3">
          <FaMapMarkerAlt className="text-blue-600" />
          Yo'nalishni tahrirlash
        </div>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
      centered
    >
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Spin size="large" tip="Joylashuvlar yuklanmoqda..." />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-4"
        >
          {/* From Location */}
          <Form.Item
            label={
              <span className="flex items-center gap-2 font-medium">
                <FaMapMarkerAlt className="text-blue-600" />
                {t("fromLabel")}
              </span>
            }
            name="from"
            rules={[{ required: true, message: t("fromPlaceholder") }]}
          >
            <Select
              placeholder={t("fromPlaceholder")}
              size="large"
              showSearch
              optionFilterProp="children"
              loading={fromLoading}
              filterOption={(input, option) =>
                String(option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              notFoundContent={
                fromLoading ? <Spin size="small" /> : t("noLocationsFound")
              }
            >
              {fromData?.result?.map((loc: any) => (
                <Option key={loc.id} value={loc.id}>
                  {loc.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* To Location */}
          <Form.Item
            label={
              <span className="flex items-center gap-2 font-medium">
                <FaMapMarkerAlt className="text-red-600" />
                {t("toLabel")}
              </span>
            }
            name="to"
            rules={[{ required: true, message: t("toPlaceholder") }]}
          >
            <Select
              placeholder={t("toPlaceholder")}
              size="large"
              showSearch
              optionFilterProp="children"
              loading={toLoading}
              filterOption={(input, option) =>
                String(option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              notFoundContent={
                toLoading ? <Spin size="small" /> : t("noLocationsFound")
              }
            >
              {toData?.result?.map((loc: any) => (
                <Option key={loc.id} value={loc.id}>
                  {loc.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Tugmalar */}
          <Form.Item className="mt-8 text-right">
            <Button onClick={handleCancel} className="mr-3" size="large">
              Bekor qilish
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              disabled={isUpdating}
              size="large"
              className="!px-8"
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" />
                  Saqlanmoqda...
                </span>
              ) : (
                "Saqlash"
              )}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}