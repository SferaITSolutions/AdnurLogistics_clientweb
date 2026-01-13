// features/delivery-price/create/DeliveryPriceCreateForm.tsx
"use client";

import React from "react";
import { Form, InputNumber, Select, Button, message, Space, Spin } from "antd";
import { useCreateDeliveryPrice } from "@/entities/hooks/Prices/hooks";
import { useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks"; // sizning hooklaringiz

const { Option } = Select;

type CreatePriceFormValues = {
  minWeight: number;
  maxWeight: number;
  cub3: number;
  price: number;
  cubMultiplier: number;
  priceMultiplier: number;
  fromLocation: string;
  toLocation: string;
};

interface DeliveryPriceCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function DeliveryPriceCreateForm({
  onSuccess,
  onCancel,
}: DeliveryPriceCreateFormProps) {
  const [form] = Form.useForm<CreatePriceFormValues>();
  const { mutate: createPrice, isPending: isCreating } =
    useCreateDeliveryPrice();

  // From va To locationlarni olish
  const { data: fromData, isLoading: fromLoading } = useGetFromList();
  const { data: toData, isLoading: toLoading } = useGetToList();

  const onFinish = (values: CreatePriceFormValues) => {
    // minWeight >= maxWeight tekshiruvi form validatoriga o'tkazilgan (quyida)
    createPrice(values, {
      onSuccess: () => {
        message.success("Yangi narx muvaffaqiyatli qo'shildi");
        form.resetFields();
        onSuccess?.();
      },
      onError: () => {
        message.error("Narx qo'shishda xatolik yuz berdi");
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        minWeight: 0,
        maxWeight: 10,
        cub3: 1,
        price: 0,
      }}
      autoComplete="off"
    >
      {/* Og‘irlik oralig‘i */}
      <Form.Item label="Og‘irlik oralig‘i (kg)" required>
        <Space.Compact style={{ width: "100%" }}>
          <Form.Item
            name="minWeight"
            rules={[
              { required: true, message: "Minimal og‘irlikni kiriting" },
              { type: "number", min: 0, message: "Musbat son bo‘lishi kerak" },
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber placeholder="Min" min={0} style={{ width: "100%" }} />
          </Form.Item>

          <span className="px-2">—</span>

          <Form.Item
            name="maxWeight"
            rules={[
              { type: "number", min: 0, message: "Musbat son bo‘lishi kerak" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // Agar maxWeight kiritilgan bo‘lsa, minWeight dan katta bo‘lishi shart
                  if (
                    value !== undefined &&
                    value !== null &&
                    getFieldValue("minWeight") >= value
                  ) {
                    return Promise.reject(
                      new Error("Max og‘irlik min dan katta bo‘lishi kerak")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber
              placeholder="Max (ixtiyoriy, cheksiz bo‘lsa bo‘sh qoldiring)"
              min={0}
              allowClear
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      {/* Kub (m³) */}
      <Form.Item label="Kub (m³)" name="cub3">
        <InputNumber
          min={0}
          step={0.01}
          precision={2}
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Narx (so‘m) */}
      <Form.Item label="Asosiy narx (so‘m)" name="price">
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
          parser={(value) => value!.replace(/\s/g, "")}
        />
      </Form.Item>

      {/* Ko‘paytirgichlar */}
      <Form.Item required>
        <Space.Compact style={{ width: "100%" }}>
          <Form.Item
            name="cubMultiplier"
            label="Max kg dan keyingi ko'paytiriladigan Cub"
            style={{ flex: 1 }}
          >
            <InputNumber placeholder="Cub ×" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="priceMultiplier"
            label="Max kg dan keyingi ko'paytiriladigan narx"
            style={{ flex: 1 }}
          >
            <InputNumber placeholder="Price ×" style={{ width: "100%" }} />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      {/* From Location - Dinamik */}
      <Form.Item
        label="Jo'nash joyi (From)"
        name="fromLocation"
        rules={[{ required: true, message: "Jo'nash joyini tanlang" }]}
      >
        <Select
          placeholder="Tanlang"
          loading={fromLoading}
          notFoundContent={
            fromLoading ? <Spin size="small" /> : "Joy topilmadi"
          }
          showSearch
          optionFilterProp="children"
        >
          {fromData?.result?.map((loc: any) => (
            <Option key={loc.id} value={loc.id}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* To Location - Dinamik */}
      <Form.Item
        label="Borish joyi (To)"
        name="toLocation"
        rules={[{ required: true, message: "Borish joyini tanlang" }]}
      >
        <Select
          placeholder="Tanlang"
          loading={toLoading}
          notFoundContent={toLoading ? <Spin size="small" /> : "Joy topilmadi"}
          showSearch
          optionFilterProp="children"
        >
          {toData?.result?.map((loc: any) => (
            <Option key={loc.id} value={loc.id}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Tugmalar */}
      <Form.Item className="mb-0 text-right">
        <div className="flex justify-end gap-3 mt-6">
          {onCancel && (
            <Button onClick={onCancel} disabled={isCreating}>
              Bekor qilish
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating}
            disabled={isCreating}
          >
            {isCreating ? "Saqlanmoqda..." : "Narxni qo‘shish"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
