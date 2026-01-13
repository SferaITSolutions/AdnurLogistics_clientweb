"use client";

import React, { useEffect } from "react";
import { Form, InputNumber, Select, Button, message, Space, Spin } from "antd";
import { useUpdateDeliveryPrice } from "@/entities/hooks/Prices/hooks";
import { useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks";
import { toast } from "sonner";

const { Option } = Select;

interface DeliveryPrice {
  id: string;
  minWeight: number;
  maxWeight: number | null;
  cub3: number;
  price: number;
  cubMultiplier: number | null;
  priceMultiplier: number | null;
  fromLocation: string;
  toLocation: string;
}

interface DeliveryPriceUpdateFormProps {
  initialValues: DeliveryPrice;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function DeliveryPriceUpdateForm({
  initialValues,
  onSuccess,
  onCancel,
}: DeliveryPriceUpdateFormProps) {
  const [form] = Form.useForm<DeliveryPrice>();
  const { mutate: updatePrice, isPending } = useUpdateDeliveryPrice();

  const { data: fromData, isLoading: fromLoading } = useGetFromList();
  const { data: toData, isLoading: toLoading } = useGetToList();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        maxWeight: initialValues.maxWeight ?? null,
        cubMultiplier: initialValues.cubMultiplier ?? null,
        priceMultiplier: initialValues.priceMultiplier ?? null,
      });
    }
  }, [initialValues, form]);

  const onFinish = (values: DeliveryPrice) => {
    console.log("Update form values:", values); // ← DEBUG: Konsolda ko‘rinadi

    const payload = {
      ...values,
      id: initialValues.id,
      maxWeight: values.maxWeight ?? null,
      cubMultiplier: values.cubMultiplier ?? null,
      priceMultiplier: values.priceMultiplier ?? null,
    };

    updatePrice(values, {
      onSuccess: () => {
        toast.success("Narx muvaffaqiyatli yangilandi");
        onSuccess?.();
      },
      onError: (error: any) => {
        toast.error("Update error:");
        console.log("Yangilashda xatolik: " + (error?.message || "Server xatosi"));
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      preserve={false} // modal yopilganda tozalanadi
    >
      {/* Og‘irlik oralig‘i */}
      <Form.Item label="Og‘irlik oralig‘i (kg)" required>
        <Space.Compact className="!w-full">
          <Form.Item
            name="minWeight"
            rules={[
              { required: true, message: "Min og‘irlik majburiy" },
              { type: "number", min: 0, message: "Musbat son" },
            ]}
            className="!mb-0 !w-full"
          >
            <InputNumber min={0} className="!w-full" />
          </Form.Item>
          <span className="px-2 self-center">—</span>
          <Form.Item
            name="maxWeight"
            rules={[
              { type: "number", min: 0, message: "Musbat son" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && getFieldValue("minWeight") >= value) {
                    return Promise.reject(new Error("Max > Min bo‘lishi kerak"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            className="!mb-0 !w-full"
          >
            <InputNumber
              placeholder="Cheksiz bo‘lsa bo‘sh"
              min={0}
              allowClear
              className="!w-full"
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      {/* Kub */}
      <Form.Item
        label="Kub (m³)"
        name="cub3"
        rules={[
          { required: true, message: "Kub majburiy" },
          { type: "number", min: 0, message: "Musbat son" },
        ]}
      >
        <InputNumber min={0} step={0.01} precision={2} className="!w-full" />
      </Form.Item>

      {/* Narx */}
      <Form.Item
        label="Narx (so'm)"
        name="price"
        rules={[
          { required: true, message: "Narx majburiy" },
          { type: "number", min: 0, message: "Musbat son" },
        ]}
      >
        <InputNumber
          min={0}
          className="!w-full"
          formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          parser={(v) => v!.replace(/\s/g, "")}
        />
      </Form.Item>

      {/* Ko'paytirgichlar - ixtiyoriy */}
      <Form.Item label="Ko'paytirgichlar (ixtiyoriy)">
        <Space.Compact className="!w-full">
          <Form.Item name="cubMultiplier" className="!mb-0 !w-full">
            <InputNumber
              step={0.1}
              placeholder="Cub × (bo‘sh = null)"
              allowClear
              className="!w-full"
            />
          </Form.Item>
          <Form.Item name="priceMultiplier" className="!mb-0 !w-full">
            <InputNumber
              step={0.1}
              placeholder="Price × (bo‘sh = null)"
              allowClear
              className="!w-full"
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      {/* From */}
      <Form.Item
        label="Jo'nash joyi (From)"
        name="fromLocation"
        rules={[{ required: true, message: "From joyini tanlang" }]}
      >
        <Select
          loading={fromLoading}
          showSearch
          optionFilterProp="children"
          placeholder="Tanlang"
        >
          {fromData?.result?.map((loc: any) => (
            <Option key={loc.id} value={loc.id}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* To */}
      <Form.Item
        label="Borish joyi (To)"
        name="toLocation"
        rules={[{ required: true, message: "To joyini tanlang" }]}
      >
        <Select
          loading={toLoading}
          showSearch
          optionFilterProp="children"
          placeholder="Tanlang"
        >
          {toData?.result?.map((loc: any) => (
            <Option key={loc.id} value={loc.id}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={onCancel} disabled={isPending}>
          Bekor qilish
        </Button>
        <Button type="primary" htmlType="submit" loading={isPending}>
          {isPending ? "Yangilanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </Form>
  );
}