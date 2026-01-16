"use client";

import React from "react";
import { Form, InputNumber, Select, Button, Spin } from "antd";
import { useCalculation } from "@/entities/hooks/calculation/hooks";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { useFormStore } from "../../store/store";
import { useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks"; // ← sizning hooklaringiz
import { useTranslations } from "next-intl";
import { FaSpinner, FaMapMarkerAlt, FaWeightHanging, FaCube } from "react-icons/fa";
import { getLocalItem } from "@/shared/utils/storage";

const { Option } = Select;

export default function FormCalculation() {
  const t = useTranslations("calculationPage");
  const { values, setValue } = useFormStore();
  const { setResponse } = useCalculationStore();
  const calculationMutation = useCalculation((data: any) => {
    setResponse(data);
  });
  const lang = getLocalItem('lang')?.toString()
  const [form] = Form.useForm();

  // API dan joylashuvlarni olish
  const { data: fromData, isLoading: fromLoading } = useGetFromList(lang);
  const { data: toData, isLoading: toLoading } = useGetToList(lang);
  console.log(lang);
  
  const onFinish = (data: any) => {
    calculationMutation.mutate({
      fromLocation: data.from,
      toLocation: data.to,
      customs: data.customsPriceCalculation || false,
      weight: data.kg || 0,
      cub: data.m3 || 0,
    });
  };

  // Loading holati
  if (fromLoading || toLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Joylashuvlar yuklanmoqda..." />
      </div>
    );
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={values}
      onFinish={onFinish}
      onFieldsChange={(_, allFields) => {
        allFields.forEach((field) => {
          if (field.name) setValue(field.name[0], field.value);
        });
      }}
      className="w-full"
    >
      {/* From Location - Dinamik API dan */}
      <Form.Item
        label={
          <div className="flex items-center gap-2 global-text-size font-semibold">
            {t("fromLabel")}
          </div>
        }
        name="from"
        rules={[{ required: true, message: t("fromPlaceholder") }]}
      >
        <Select
          className="!rounded-xl"
          placeholder={t("fromPlaceholder")}
          size="large"
          showSearch
          optionFilterProp="children"
          loading={fromLoading}
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

      {/* To Location - Dinamik API dan */}
      <Form.Item
        label={
          <div className="flex items-center gap-2 global-text-size font-semibold">
            {t("toLabel")}
          </div>
        }
        name="to"
        rules={[{ required: true, message: t("toPlaceholder") }]}
      >
        <Select
          className="!rounded-xl"
          placeholder={t("toPlaceholder")}
          size="large"
          showSearch
          optionFilterProp="children"
          loading={toLoading}
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

      {/* Weight */}
      <Form.Item
        label={
          <div className="flex items-center gap-2 global-text-size font-semibold">
            {t("weightLabel")}
          </div>
        }
        name="kg"
        rules={[
          { required: true, message: t("weightPlaceholder") },
          { type: "number", min: 0.01, message: t("valueGreaterThanZero") },
        ]}
      >
        <InputNumber
          className="!rounded-xl"
          prefix={<FaWeightHanging className="text-blue-600" />}
          style={{ width: "100%" }}
          placeholder={t("weightPlaceholder")}
          min={0.01}
          size="large"
        />
      </Form.Item>

      {/* Volume */}
      <Form.Item
        label={
          <div className="flex items-center gap-2 global-text-size font-semibold">
            {t("volumeLabel")}
          </div>
        }
        name="m3"
        rules={[
          { required: true, message: t("volumePlaceholder") },
          { type: "number", min: 0.01, message: t("valueGreaterThanZero") },
        ]}
      >
        <InputNumber
          prefix={<FaCube className="text-blue-600" />}
          className="!rounded-xl"
          placeholder={t("volumePlaceholder")}
          min={0.01}
          size="large"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item className="mt-6">
        <Button
          type="primary"
          className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !border-0 !shadow-lg !shadow-blue-500/30 hover:!shadow-xl hover:!shadow-blue-500/40 !py-6 w-full !rounded-xl !font-semibold !text-base hover:!scale-[1.02] !transition-all !duration-300"
          htmlType="submit"
          loading={calculationMutation.isPending}
          disabled={calculationMutation.isPending}
        >
          {t("calculateButton")}
        </Button>
      </Form.Item>
    </Form>
  );
}