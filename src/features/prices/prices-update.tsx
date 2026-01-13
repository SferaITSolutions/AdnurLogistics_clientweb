"use client";

import React, { useEffect, useState } from "react";
import { Form, InputNumber, Select, Button, Space, Checkbox } from "antd";
import {
  useUpdateDeliveryPrice,
  useGetFromList,
  useGetToList,
} from "@/entities/hooks/Prices/hooks";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("deliveryPriceUpdateForm");
  const [form] = Form.useForm<DeliveryPrice>();
  const { mutate: updatePrice, isPending } = useUpdateDeliveryPrice();
  const [isUnlimitedWeight, setIsUnlimitedWeight] = useState(false);

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
      
      // Check if initial values match unlimited weight criteria
      if (initialValues.minWeight === 1000 && initialValues.maxWeight === null) {
        setIsUnlimitedWeight(true);
      }
    }
  }, [initialValues, form]);

  const handleUnlimitedWeightChange = (checked: boolean) => {
    setIsUnlimitedWeight(checked);
    if (checked) {
      form.setFieldsValue({
        minWeight: 1000,
        maxWeight: null,
      });
    }
  };

  const onFinish = (values: DeliveryPrice) => {
    updatePrice(
      {
        ...values,
        overPrice: isUnlimitedWeight,
        id: initialValues.id,
      },
      {
        onSuccess: () => {
          toast.success(t("successMessage"));
          onSuccess?.();
        },
        onError: (error: any) => {
          toast.error(t("errorMessage") + (error?.message || "Server error"));
        },
      }
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      preserve={false}
    >
      <Form.Item
        label={t("fromLocationLabel")}
        name="fromLocation"
        rules={[{ required: true, message: t("fromLocationRequired") }]}
      >
        <Select
          loading={fromLoading}
          showSearch
          optionFilterProp="children"
          placeholder={t("selectPlaceholder")}
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
        label={t("toLocationLabel")}
        name="toLocation"
        rules={[{ required: true, message: t("toLocationRequired") }]}
      >
        <Select
          loading={toLoading}
          showSearch
          optionFilterProp="children"
          placeholder={t("selectPlaceholder")}
        >
          {toData?.result?.map((loc: any) => (
            <Option key={loc.id} value={loc.id}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Checkbox for unlimited weight */}
      <Form.Item>
        <Checkbox 
          checked={isUnlimitedWeight} 
          onChange={(e) => handleUnlimitedWeightChange(e.target.checked)}
        >
          {t("unlimitedWeightLabel") || "Cheksiz og'irlik (1000 kg dan yuqori)"}
        </Checkbox>
      </Form.Item>

      {/* Og'irlik oralig'i */}
      <Form.Item label={t("weightRangeLabel")} required>
        <Space.Compact className="!w-full">
          <Form.Item
            name="minWeight"
            rules={[
              { required: true, message: t("minWeightRequired") },
              { type: "number", min: 0, message: t("mustBePositive") },
            ]}
            className="!mb-0 !w-full"
          >
            <InputNumber<number> 
              min={0} 
              className="!w-full" 
              disabled={isUnlimitedWeight}
            />
          </Form.Item>
          <span className="px-2 self-center">—</span>
          <Form.Item
            name="maxWeight"
            rules={[
              { type: "number", min: 0, message: t("mustBePositive") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && getFieldValue("minWeight") >= value) {
                    return Promise.reject(new Error(t("maxWeightError")));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            className="!mb-0 !w-full"
          >
            <InputNumber<number>
              placeholder={t("maxWeightPlaceholder")}
              min={0}
              className="!w-full"
              disabled={isUnlimitedWeight}
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      {/* Kub */}
      <Form.Item
        label={t("cubLabel")}
        name="cub3"
        rules={[
          { required: true, message: t("cubRequired") },
          { type: "number", min: 0, message: t("mustBePositive") },
        ]}
      >
        <InputNumber<number> min={0} step={0.01} precision={2} className="!w-full" />
      </Form.Item>

      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={onCancel} disabled={isPending}>
          {t("cancelButton")}
        </Button>
        <Button type="primary" htmlType="submit" loading={isPending}>
          {isPending ? t("updatingButton") : t("saveButton")}
        </Button>
      </div>
    </Form>
  );
}