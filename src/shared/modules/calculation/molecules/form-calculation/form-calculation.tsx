"use client";
import React from "react";
import { Form, Select, InputNumber, Radio, Checkbox, Button } from "antd";
import { useFormStore } from "../../store/store";
import { MdLocationOn, MdScale, MdVolumeUp } from "react-icons/md";
import { LiaWeightSolid } from "react-icons/lia";

const { Option } = Select;

const FROM_OPTIONS = [
  { value: "Tashkent", label: "Toshkent" },
  { value: "Shanghai", label: "Shanxay" },
  { value: "Moscow", label: "Moskva" },
];

const TO_OPTIONS = [
  { value: "New York", label: "Nyu-York" },
  { value: "London", label: "London" },
  { value: "Dubai", label: "Dubay" },
];

export default function FormCalculation() {
  const { values, setValue, resetForm } = useFormStore();

  const [form] = Form.useForm();

  const handleFinish = (data: any) => {
    console.log("Hisoblash so'rovi:", data);
    resetForm();
    form.resetFields();
  };

  const handleFieldsChange = (changedFields: any, allFields: any) => {
    if (changedFields && changedFields.length) {
      changedFields.forEach((field: any) => {
        setValue(field.name[0], field.value);
      });
    }
  };

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
        <Select placeholder="Qayerdan tanlang">
          {FROM_OPTIONS.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Qayerga"
        name="to"
        rules={[{ required: true, message: "Boriladigan manzilni tanlang" }]}
      >
        <Select placeholder="Qayerga tanlang">
          {TO_OPTIONS.map((option) => (
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
        <LiaWeightSolid color="blue" className="absolute !z-1 mt-1.5 ml-2" size={20} />
        <InputNumber
          className="!min-w-[100%] !pl-5"
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
        <LiaWeightSolid
          color="blue"
          className="absolute !z-1 mt-1.5 ml-2"
          size={20}
        />
        <InputNumber
          className="!min-w-[100%] !pl-5"
          style={{ width: "100%" }}
          placeholder="KG/m³ kiriting"
          min={0.01}
        />
      </Form.Item>
      <Form.Item
        label="m³"
        name="m3"
        rules={[
          { required: true, message: "Iltimos, hajmni m³ da kiriting" },
          {
            type: "number",
            min: 0.01,
            message: "Qiymat 0 dan katta bo‘lishi kerak",
          },
        ]}
      >
        <LiaWeightSolid
          color="blue"
          className="absolute !z-1 mt-1.5 ml-2"
          size={20}
        />
        <InputNumber
          className="!min-w-[100%] !pl-5"
          style={{ width: "100%" }}
          placeholder="Hajmni kiriting (m³)"
          min={0.01}
        />
      </Form.Item>
      <Form.Item
        label="Turi"
        name="containerType"
        rules={[{ required: true, message: "Konteyner turini tanlang" }]}
      >
        <Radio.Group>
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
        <Checkbox>Bojxona xizmat narxi bilan hisoblash</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          className="bg-secondary-blue-color !p-4 w-full"
          htmlType="submit"
          //   style={{ width: "100%" }}
        >
          Hisoblash
        </Button>
      </Form.Item>
    </Form>
  );
}
