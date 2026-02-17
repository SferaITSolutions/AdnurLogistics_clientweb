"use client";

import React, { useEffect, useState } from "react";
import { Form, InputNumber, Select, Button, Spin, Checkbox } from "antd";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { useFormStore } from "../../store/store";
import { useTranslations } from "next-intl";
import { FaWeightHanging, FaCube } from "react-icons/fa";
import { getLocalItem } from "@/shared/utils/storage";
import {
  useGetProductsList,
  useGetPetitionList,
  useCreatePetition,
  useCalculation,
} from "@/entities/hooks/calculation/hooks";

const { Option } = Select;

export default function FormCalculation() {
  const t = useTranslations("calculationPage");
  const { values, setValue } = useFormStore();
  const { setResponse } = useCalculationStore();
  const lang = getLocalItem("lang")?.toString();
 
  const [form] = Form.useForm();
  const [customs, setCustoms] = useState(false);

  const { data: productsData, isLoading: productsLoading } = useGetProductsList();

  const selectedProductId = Form.useWatch("product", form);
  const selectedProduct = productsData?.result?.find((p: any) => p.id === selectedProductId);

  const calculateKg = !!selectedProduct?.calculateKg;

  const { data: petitionList, isLoading: petitionLoading } = useGetPetitionList(
    selectedProductId || ""
  );

  const createPetitionMutation = useCalculation();

  useEffect(() => {
    if (selectedProductId) {
      form.setFieldsValue({
        directionId: undefined,
        weight: undefined,
        customs: false,
      });
      setCustoms(false);
    } else {
      form.resetFields(["directionId", "weight", "customs"]);
      setCustoms(false);
    }
  }, [selectedProductId, form]);

  const onFinish = (formValues: any) => {
    // API ga kerakli shaklda jo'natamiz

    const payload: any = {
      directionId: formValues.directionId,
      weight: calculateKg ? Number(formValues.weight) : 0,
      cub: Number(formValues.bulk),
      customs: formValues.customs ?? false,
    };

    createPetitionMutation.mutate(payload, {
      onSuccess: (res: any) => {
        setValue("directionId", formValues.directionId);
        setValue("weight", calculateKg ? Number(formValues.weight) : undefined);
        setValue("bulk", Number(formValues.bulk));
        setValue("cub", Number(formValues.bulk));
        setValue("customs", formValues.customs ?? false);
        setResponse(res);
        // form.resetFields();
      },
      onError: (err) => {
        console.error("Hisoblashda xatolik:", err);
        // xohlasangiz user ga xabar ko'rsatish mumkin
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={values}
      onFinish={onFinish}
      onFieldsChange={(_, allFields) => {
        allFields.forEach((field) => {
          if (field.name?.[0]) {
            setValue(field.name[0], field.value);
          }
        });
      }}
      className="w-full"
    >
      {/* Product */}
      <Form.Item
        label={<div className="flex items-center gap-2 global-text-size font-semibold">{t("productLabel") || "Mahsulot"}</div>}
        name="product"
        rules={[{ required: true, message: t("selectProduct") || "Mahsulotni tanlang!" }]}
      >
        <Select
          className="!rounded-xl"
          placeholder={t("productPlaceholder") || "Mahsulotni tanlang"}
          size="large"
          showSearch
          optionFilterProp="children"
          loading={productsLoading}
          notFoundContent={productsLoading ? <Spin size="small" /> : t("noProductsFound")}
        >
          {productsData?.result?.map((product: any) => (
            <Option key={product.id} value={product.id}>
              {product.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Direction */}
      <Form.Item
        label={<div className="flex items-center gap-2 global-text-size font-semibold">{t("directionLabel") || "Yo'nalish"}</div>}
        name="directionId"
        rules={[{ required: true, message: t("directionRequired") || "Yo'nalish tanlanishi shart!" }]}
      >
        <Select
          className="!rounded-xl"
          placeholder={t("directionPlaceholder") || "Yo'nalishni tanlang"}
          size="large"
          showSearch
          optionFilterProp="children"
          loading={petitionLoading}
          disabled={!selectedProduct || petitionLoading}
        >
          {petitionList?.result?.map((dir: any) => (
            <Option key={dir.id} value={dir.id}>
              {dir.directionName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Weight - faqat calculateKg bo'lsa */}
      {calculateKg || (
        <Form.Item
          label={<div className="flex items-center gap-2 global-text-size font-semibold">{t("weightLabel") || "Og‘irlik (kg)"}</div>}
          name="weight"
          rules={[
            { required: true, message: t("weightRequired") || "Og‘irlikni kiriting!" },
            { type: "number", min: 0.01, message: t("valueGreaterThanZero") || "0 dan katta bo‘lishi kerak" },
          ]}
        >
          <InputNumber
            className="!rounded-xl"
            prefix={<FaWeightHanging className="text-blue-600" />}
            style={{ width: "100%" }}
            placeholder={t("weightPlaceholder") || "Masalan: 12.5"}
            min={0.01}
            step={0.01}
            size="large"
          />
        </Form.Item>
      )}

      {/* Bulk */}
      <Form.Item
        label={<div className="flex items-center gap-2 global-text-size font-semibold">{t("volumeLabel") || "Hajm (m³)"}</div>}
        name="bulk"
        rules={[
          { required: true, message: t("volumeRequired") || "Hajmni kiriting!" },
          { type: "number", min: 0.01, message: t("valueGreaterThanZero") || "0 dan katta bo‘lishi kerak" },
        ]}
      >
        <InputNumber
          prefix={<FaCube className="text-blue-600" />}
          className="!rounded-xl"
          placeholder={t("volumePlaceholder") || "Masalan: 0.8"}
          min={0.01}
          step={0.01}
          size="large"
          style={{ width: "100%" }}
        />
      </Form.Item>
      {/* Customs */}
      <Form.Item name="customs" valuePropName="checked" className="mb-6">
        <Checkbox
          checked={customs}
          onChange={(e) => setCustoms(e.target.checked)}
          disabled={!selectedProduct}
          className="global-text-size"
        >
          <span className="font-semibold">{t("customsLabel") || "Bojsiz / customs yo‘q"}</span>
        </Checkbox>
      </Form.Item>

      {/* Submit */}
      <Form.Item className="mt-8">
        <Button
          type="primary"
          className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !border-0 !shadow-lg !shadow-blue-500/30 hover:!shadow-xl hover:!shadow-blue-500/40 !py-6 w-full !rounded-xl !font-semibold !text-base hover:!scale-[1.02] !transition-all !duration-300"
          htmlType="submit"
          loading={createPetitionMutation.isPending}
          disabled={!selectedProduct || createPetitionMutation.isPending}
          size="large"
        >
          {t("calculateButton") || "Hisoblash"}
        </Button>
      </Form.Item>
    </Form>
  );
}