"use client";
import React, { useEffect } from "react";
import {
  Form,
  Select,
  InputNumber,
  Radio,
  Checkbox,
  Button,
  message,
} from "antd";
import { useFormStore } from "../../store/store";
import { LiaWeightSolid } from "react-icons/lia";
import { FROM_OPTIONS, useRegions } from "@/shared/constants";
import { useCalculation } from "@/entities/hooks/calculation/hooks";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { FaSpinner } from "react-icons/fa";
import { useTranslations } from "next-intl";

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

  // Sync all store values into form fields when store values change
  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  // When the form fields change, keep the store values in sync
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
      customs: data.customsPriceCalculation,
      weight: data.kg,
      cub: data.m3,
    });
    form.resetFields();
  };
  if (calculationMutation.isPending) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center bg-black/50 justify-center !z-50">
        <FaSpinner color="white" size={50} className="animate-spin" />
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
      <Form.Item
        label={t("fromLabel")}
        name="from"
        rules={[{ required: true, message: t("fromPlaceholder") }]}
      >
        <Select placeholder={t("fromPlaceholder")} value={values.from}>
          {FROM_OPTIONS.map((option: { value: string; label: string }) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={t("weightLabel")}
        name="kg"
        rules={[
          { required: true, message: t("weightPlaceholder") },
          {
            type: "number",
            min: 0.01,
            message: t("valueGreaterThanZero"),
          },
        ]}
      >
        <InputNumber
          prefix={<LiaWeightSolid color="blue" size={18} />}
          style={{ width: "100%" }}
          placeholder={t("weightPlaceholder")}
          min={0.01}
        />
      </Form.Item>

      {/* <Form.Item
        label={t("densityLabel")}
        name="kgm3"
        rules={[
          {
            required: true,
            message: t("densityPlaceholder"),
          },
          {
            type: "number",
            min: 0.01,
            message: t("valueGreaterThanZero"),
          },
        ]}
      >
        <InputNumber
          prefix={<LiaWeightSolid color="blue" size={18} />}
          style={{ width: "100%" }}
          placeholder={t("densityPlaceholder")}
          min={0.01}
          value={values.kgm3}
          onChange={(val) => setValue("kgm3", val)}
        />
      </Form.Item> */}
      <Form.Item
        label={t("volumeLabel")}
        name="m3"
        rules={[
          { required: true, message: t("volumePlaceholder") },
          {
            type: "number",
            min: 0.01,
            message: t("valueGreaterThanZero"),
          },
        ]}
      >
        <InputNumber
          prefix={<LiaWeightSolid color="blue" size={18} />}
          style={{ width: "100%" }}
          placeholder={t("volumePlaceholder")}
          min={0.01}
          value={values.m3}
          onChange={(val) => setValue("m3", val)}
        />
      </Form.Item>
      <Form.Item
        label={t("typeLabel")}
        name="containerType"
        rules={[{ required: true, message: t("containerTypePlaceholder") }]}
      >
        <Radio.Group
          value={values.containerType}
          onChange={(e) => setValue("containerType", e.target.value)}
        >
          <Radio value="ICL">{t("typeIcl")}</Radio>
          <Radio value="FCL">{t("typeFcl")}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="customsPriceCalculation"
        valuePropName="checked"
        rules={[
          {
            validator(_, value) {
              if (value) return Promise.resolve();
              return Promise.reject(new Error(t("customsAgreement")));
            },
          },
        ]}
      >
        <Checkbox
          checked={values.customsPriceCalculation}
          onChange={(e) =>
            setValue("customsPriceCalculation", e.target.checked)
          }
        >
          {t("customsLabel")}
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          className="bg-secondary-blue-color !p-4 w-full"
          htmlType="submit"
        >
          {t("calculateButton")}
        </Button>
      </Form.Item>
    </Form>
  );
}
