"use client";

import React, { useState } from "react";
import { Form, InputNumber, Select, Button, message, Space, Spin, Checkbox } from "antd";
import {
  useCreateDeliveryPrice,
  useGetFromList,
  useGetToList,
} from "@/entities/hooks/Prices/hooks";
import { useTranslations } from "next-intl";

const { Option } = Select;

type CreatePriceFormValues = {
  minWeight: number;
  maxWeight: number | null;
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
  const t = useTranslations("deliveryPriceCreateForm");
  const [form] = Form.useForm<CreatePriceFormValues>();
  const [isUnlimitedWeight, setIsUnlimitedWeight] = useState(false);
  
  const { mutate: createPrice, isPending: isCreating } =
    useCreateDeliveryPrice();

  const { data: fromData, isLoading: fromLoading } = useGetFromList();
  const { data: toData, isLoading: toLoading } = useGetToList();

  const handleUnlimitedWeightChange = (checked: boolean) => {
    setIsUnlimitedWeight(checked);
    if (checked) {
      form.setFieldsValue({
        minWeight: 1000,
        maxWeight: null,
      });
    }
  };

  const onFinish = (values: CreatePriceFormValues) => {
    // Ensure values are set correctly when unlimited weight is checked
    const submitValues = {
      ...values,
      overPrice: isUnlimitedWeight,
      minWeight: isUnlimitedWeight ? 1000 : values.minWeight,
      maxWeight: isUnlimitedWeight ? null : values.maxWeight,
    };

    createPrice(submitValues, {
      onSuccess: () => {
        message.success(t("messages.success"));
        form.resetFields();
        setIsUnlimitedWeight(false); // Reset checkbox state
        onSuccess?.();
      },
      onError: () => {
        message.error(t("messages.error"));
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        minWeight: null,
        maxWeight: null,
        cub3: null,
        price: null,
      }}
      autoComplete="off"
    >
      {/* From Location */}
      <Form.Item
        label={t("fromLocationLabel")}
        name="fromLocation"
        rules={[
          { required: true, message: t("validation.fromLocationRequired") },
        ]}
      >
        <Select
          placeholder={t("selectPlaceholder")}
          loading={fromLoading}
          notFoundContent={
            fromLoading ? <Spin size="small" /> : t("locationNotFound")
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

      {/* To Location */}
      <Form.Item
        label={t("toLocationLabel")}
        name="toLocation"
        rules={[
          { required: true, message: t("validation.toLocationRequired") },
        ]}
      >
        <Select
          placeholder={t("selectPlaceholder")}
          loading={toLoading}
          notFoundContent={
            toLoading ? <Spin size="small" /> : t("locationNotFound")
          }
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

      {/* Checkbox for unlimited weight */}
      <Form.Item>
        <Checkbox 
          checked={isUnlimitedWeight} 
          onChange={(e) => handleUnlimitedWeightChange(e.target.checked)}
        >
          {"1000 kg dan yuqori"}
        </Checkbox>
      </Form.Item>

      {/* Og'irlik oralig'i */}
      <Form.Item label={t("weightRangeLabel")} required>
        <Space.Compact style={{ width: "100%" }}>
          <Form.Item
            name="minWeight"
            rules={[
              { required: true, message: t("validation.minWeightRequired") },
              {
                type: "number",
                min: 0,
                message: t("validation.mustBePositive"),
              },
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber<number>
              placeholder={t("minPlaceholder")}
              min={0}
              maxLength={13}
              style={{ width: "100%" }}
              disabled={isUnlimitedWeight}
            />
          </Form.Item>

          <span className="px-2">—</span>

          <Form.Item
            name="maxWeight"
            rules={[
              {
                type: "number",
                min: 0,
                message: t("validation.mustBePositive"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value !== undefined &&
                    value !== null &&
                    getFieldValue("minWeight") >= value
                  ) {
                    return Promise.reject(
                      new Error(t("validation.maxWeightError"))
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber<number>
              placeholder={t("maxPlaceholder")}
              min={0}
              maxLength={13}
              style={{ width: "100%" }}
              disabled={isUnlimitedWeight}
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      {/* Kub (m³) */}
      <Form.Item label={t("cubLabel")} name="cub3">
        <InputNumber<number>
          placeholder="USD"
          min={0}
          step={0.01}
          maxLength={13}
          precision={2}
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Tugmalar */}
      <Form.Item className="mb-0 text-right">
        <div className="flex justify-end gap-3 mt-6">
          {onCancel && (
            <Button onClick={onCancel} disabled={isCreating}>
              {t("cancelButton")}
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating}
            disabled={isCreating}
          >
            {isCreating ? t("savingButton") : t("saveButton")}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}