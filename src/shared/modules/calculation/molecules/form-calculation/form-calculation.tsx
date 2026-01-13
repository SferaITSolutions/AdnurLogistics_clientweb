"use client";

import { Button, Form, InputNumber, Select } from "antd";
import { useCalculation } from "@/entities/hooks/calculation/hooks";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { useRegions, useToRegions } from "@/shared/constants";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { FaSpinner, FaMapMarkerAlt, FaWeightHanging, FaCube } from "react-icons/fa";
import { useFormStore } from "../../store/store";

const { Option } = Select;

export default function FormCalculation() {
  const t = useTranslations("calculationPage");
  const { values, setValue, resetForm } = useFormStore();
  const { setResponse } = useCalculationStore();
  const calculationMutation = useCalculation((data: any) => {
    setResponse(data);
  });
  const [form] = Form.useForm();
  const { FROM_OPTIONS } = useRegions();
  const { TO_OPTIONS } = useToRegions();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const handleFieldsChange = (changedFields: any, allFields: any) => {
    if (changedFields && changedFields.length) {
      changedFields.forEach((field: any) => {
        setValue(field.name[0], field.value);
      });
    }
  };

  const handleFinish = (data: any) => {
    Object.keys(data).forEach((key) => setValue(key, data[key]));
    calculationMutation.mutate({
      fromLocation: data.from?.toUpperCase(),
      customs: data.customsPriceCalculation || false,
      weight: data.kg || 0,
      cub: data.m3 || 0,
    });
    form.resetFields();
  };

  if (calculationMutation.isPending) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center bg-black/50 justify-center !z-50 rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner color="white" size={50} className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={values}
      onFinish={handleFinish}
      onFieldsChange={handleFieldsChange}
      className="w-full"
    >
      {/* From Location */}
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
          value={values.from}
          size="large"
          suffixIcon={<FaMapMarkerAlt className="text-gray-400" />}
        >
          {FROM_OPTIONS.map((option: { value: string; label: string }) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* To Location */}
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
          value={values.to}
          size="large"
          suffixIcon={<FaMapMarkerAlt className="text-gray-400" />}
        >
          {TO_OPTIONS.map((option: { value: string; label: string }) => (
            <Option key={option.value} value={option.value}>
              {option.label}
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
            {/* <FaCube className="text-purple-600" /> */}
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
          prefix={<FaCube className="text-purple-600" />}
          className="!rounded-xl"
          placeholder={t("volumePlaceholder")}
          min={0.01}
          value={values.m3}
          onChange={(val) => setValue("m3", val)}
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
        >
          {t("calculateButton")}
        </Button>
      </Form.Item>
    </Form>
  );
}

