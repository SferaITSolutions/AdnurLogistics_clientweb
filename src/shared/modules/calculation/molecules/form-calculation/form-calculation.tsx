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
import { FROM_OPTIONS } from "@/shared/constants";
import { useCalculation } from "@/entities/hooks/calculation/hooks";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { FaSpinner } from "react-icons/fa";

const { Option } = Select;

export default function FormCalculation() {
  const { values, setValue, resetForm } = useFormStore();
  const { setResponse } = useCalculationStore();
  const calculationMutation = useCalculation((data: any) => {
    setResponse(data);
  });
  const [form] = Form.useForm();

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
        label="Qayerdan"
        name="from"
        rules={[{ required: true, message: "Manzilni tanlang" }]}
      >
        <Select placeholder="Qayerdan tanlang" value={values.from}>
          {FROM_OPTIONS.map((option: { value: string; label: string }) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="KG"
        name="kg"
        rules={[
          { required: true, message: "Iltimos, og'irlikni kg da kiriting" },
          {
            type: "number",
            min: 0.01,
            message: "Qiymat 0 dan katta bo‘lishi kerak",
          },
        ]}
      >
        <InputNumber
          prefix={<LiaWeightSolid color="blue" size={18} />}
          style={{ width: "100%" }}
          placeholder="Og'irlikni kiriting (kg)"
          min={0.01}
        />
      </Form.Item>

      <Form.Item
        label="KG/m³"
        name="kgm3"
        rules={[
          {
            required: true,
            message: "Iltimos, 1 m³ uchun og'irlikni kiriting",
          },
          {
            type: "number",
            min: 0.01,
            message: "Qiymat 0 dan katta bo‘lishi kerak",
          },
        ]}
      >
        <InputNumber
          prefix={<LiaWeightSolid color="blue" size={18} />}
          style={{ width: "100%" }}
          placeholder="KG/m³ kiriting"
          min={0.01}
          value={values.kgm3}
          onChange={(val) => setValue("kgm3", val)}
        />
      </Form.Item>
      <Form.Item
        label="m³"
        name="m3"
        rules={[
          { required: true, message: "Iltimos, hajmni m³ ni kiriting" },
          {
            type: "number",
            min: 0.01,
            message: "Qiymat 0 dan katta bo‘lishi kerak",
          },
        ]}
      >
        <InputNumber
          prefix={<LiaWeightSolid color="blue" size={18} />}
          style={{ width: "100%" }}
          placeholder="Hajmni kiriting (m³)"
          min={0.01}
          value={values.m3}
          onChange={(val) => setValue("m3", val)}
        />
      </Form.Item>
      <Form.Item
        label="Turi"
        name="containerType"
        rules={[{ required: true, message: "Konteyner turini tanlang" }]}
      >
        <Radio.Group
          value={values.containerType}
          onChange={(e) => setValue("containerType", e.target.value)}
        >
          <Radio value="ICL">ICL (Qisman konteyner)</Radio>
          <Radio value="FCL">FCL (To‘liq konteyner)</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="customsPriceCalculation"
        valuePropName="checked"
        rules={[
          {
            validator(_, value) {
              if (value) return Promise.resolve();
              return Promise.reject(
                new Error("Hisoblash uchun bojxona narxi bilan rozilik kerak")
              );
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
          Bojxona xizmat narxi bilan hisoblash
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          className="bg-secondary-blue-color !p-4 w-full"
          htmlType="submit"
        >
          Hisoblash
        </Button>
      </Form.Item>
    </Form>
  );
}
