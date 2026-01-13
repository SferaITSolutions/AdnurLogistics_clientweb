"use client";

import React from "react";
import { Form, InputNumber, Select, Button, message, Space, Spin } from "antd";
import { useCreateDeliveryPrice, useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("deliveryPriceCreateForm");
  const [form] = Form.useForm<CreatePriceFormValues>();
  const { mutate: createPrice, isPending: isCreating } = useCreateDeliveryPrice();

  const { data: fromData, isLoading: fromLoading } = useGetFromList();
  const { data: toData, isLoading: toLoading } = useGetToList();

  const onFinish = (values: CreatePriceFormValues) => {
    createPrice(values, {
      onSuccess: () => {
        message.success(t("messages.success"));
        form.resetFields();
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
        minWeight: 0,
        maxWeight: 10,
        cub3: 1,
        price: 0,
      }}
      autoComplete="off"
    >
      {/* Og‘irlik oralig‘i */}
      <Form.Item label={t("weightRangeLabel")} required>
        <Space.Compact style={{ width: "100%" }}>
          <Form.Item
            name="minWeight"
            rules={[
              { required: true, message: t("validation.minWeightRequired") },
              { type: "number", min: 0, message: t("validation.mustBePositive") },
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber placeholder={t("minPlaceholder")} min={0} style={{ width: "100%" }} />
          </Form.Item>

          <span className="px-2">—</span>

          <Form.Item
            name="maxWeight"
            rules={[
              { type: "number", min: 0, message: t("validation.mustBePositive") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value !== undefined &&
                    value !== null &&
                    getFieldValue("minWeight") >= value
                  ) {
                    return Promise.reject(new Error(t("validation.maxWeightError")));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber
              placeholder={t("maxPlaceholder")}
              min={0}
              allowClear
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      {/* Kub (m³) */}
      <Form.Item label={t("cubLabel")} name="cub3">
        <InputNumber
          min={0}
          step={0.01}
          precision={2}
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Narx (so‘m) */}
      <Form.Item label={t("priceLabel")} name="price">
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          parser={(value) => value!.replace(/\s/g, "")}
        />
      </Form.Item>

      {/* Ko‘paytirgichlar */}
      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item
          name="cubMultiplier"
          label={t("cubMultiplierLabel")}
          style={{ flex: 1 }}
        >
          <InputNumber placeholder="Cub ×" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="priceMultiplier"
          label={t("priceMultiplierLabel")}
          style={{ flex: 1 }}
        >
          <InputNumber placeholder="Price ×" style={{ width: "100%" }} />
        </Form.Item>
      </div>

      {/* From Location */}
      <Form.Item
        label={t("fromLocationLabel")}
        name="fromLocation"
        rules={[{ required: true, message: t("validation.fromLocationRequired") }]}
      >
        <Select
          placeholder={t("selectPlaceholder")}
          loading={fromLoading}
          notFoundContent={fromLoading ? <Spin size="small" /> : t("locationNotFound")}
          showSearch
          optionFilterProp="children"
        >
          {fromData?.result?.map((loc: any) => (
            <Option key={loc.id} value={loc.id}>{loc.name}</Option>
          ))}
        </Select>
      </Form.Item>

      {/* To Location */}
      <Form.Item
        label={t("toLocationLabel")}
        name="toLocation"
        rules={[{ required: true, message: t("validation.toLocationRequired") }]}
      >
        <Select
          placeholder={t("selectPlaceholder")}
          loading={toLoading}
          notFoundContent={toLoading ? <Spin size="small" /> : t("locationNotFound")}
          showSearch
          optionFilterProp="children"
        >
          {toData?.result?.map((loc: any) => (
            <Option key={loc.id} value={loc.id}>{loc.name}</Option>
          ))}
        </Select>
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