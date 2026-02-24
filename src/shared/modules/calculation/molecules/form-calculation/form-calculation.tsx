"use client";

import React, { useEffect, useState } from "react";
import { Form, InputNumber, Select, Button, Spin, Checkbox, Input, Modal } from "antd";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { useFormStore } from "../../store/store";
import { useTranslations } from "next-intl";
import { FaWeightHanging, FaCube, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { useGetProductsList, useGetPetitionList, useCalculation, useApplyFCL } from "@/entities/hooks/calculation/hooks";

const { Option } = Select;

export default function FormCalculation() {
  const t = useTranslations("calculationPage");
  const { values, setValue } = useFormStore();
  const { setResponse } = useCalculationStore();

  const [form] = Form.useForm();
  const [customs, setCustoms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: productsData, isLoading: productsLoading } = useGetProductsList();

  const selectedProductId = Form.useWatch("product", form);
  const selectedProduct = productsData?.result?.find((p: any) => p.id === selectedProductId);

  // calculateKg: true  → Calculation forma
  // calculateKg: false → Apply forma (from, to, weight, bulk)
  const calculateKg = !!selectedProduct?.calculateKg;
  const calculate = !!selectedProduct?.calculate;

  const { data: petitionList, isLoading: petitionLoading } = useGetPetitionList(
    selectedProductId || ""
  );

  const calculationMutation = useCalculation();
  const applyMutation = useApplyFCL(() => {
    setIsModalOpen(true);
    form.resetFields([
      "directionId", "weight", "bulk", "customs", "from", "to",
    ]);
    setCustoms(false);
  });

  // Product o'zgarganda bog'liq fieldlarni tozalash
  useEffect(() => {
    if (selectedProductId) {
      form.setFieldsValue({
        directionId: undefined,
        weight: undefined,
        bulk: undefined,
        customs: false,
        from: undefined,
        to: undefined,
      });
      setCustoms(false);
    }
  }, [selectedProductId, form]);

  const onFinish = (formValues: any) => {
    if (calculate) {
      // --- Calculation ---
      const payload: any = {
        directionId: formValues.directionId,
        weight: Number(formValues.weight),
        cub: Number(formValues.bulk) || 0,
        customs: formValues.customs ?? false,
      };

      calculationMutation.mutate(payload, {
        onSuccess: (res: any) => {
          setValue("directionId", formValues.directionId);
          setValue("weight", Number(formValues.weight));
          setValue("bulk", Number(formValues.bulk));
          setValue("cub", Number(formValues.bulk));
          setValue("customs", formValues.customs ?? false);
          setResponse(res);
        },
        onError: (err) => {
          console.error("Hisoblashda xatolik:", err);
        },
      });
    } else {
      // --- Apply (FCL) ---
      applyMutation.mutate({
        fromLocation: formValues.from ?? "",
        toLocation: formValues.to ?? "",
        productId: selectedProductId ?? "",
        weight: formValues.weight ?? "",
        bulk: formValues.bulk ?? "",
        customs: formValues.customs || false,
      });
    }
  };
  useEffect(() => {
    setResponse(null);
  }, [form?.getFieldValue("product")]);
  const isPending = calculate
    ? calculationMutation.isPending
    : applyMutation.isPending;

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={values}
        onFinish={onFinish}
        onFieldsChange={(_, allFields) => {
          allFields.forEach((field) => {
            if (field.name?.[0]) setValue(field.name[0], field.value);
          });
        }}
        className="w-full"
      >
        {/* ── Product ── */}
        <Form.Item
          label={
            <div className="flex items-center gap-2 global-text-size font-semibold">
              {t("productLabel") || "Mahsulot"}
            </div>
          }
          name="product"
          rules={[{ required: true, message: t("selectProduct") || "Mahsulotni tanlang!" }]}
        >
          <Select
            className="!rounded-xl"
            placeholder={t("productPlaceholder") || "Mahsulotni tanlang"}
            size="large"
            showSearch
            optionFilterProp="children"
            allowClear
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

        {/* ── calculateKg: true → Direction + Weight + Bulk ── */}
        {selectedProduct && calculate && (
          <>
            {/* Direction */}
            <Form.Item
              label={
                <div className="flex items-center gap-2 global-text-size font-semibold">
                  {t("directionLabel") || "Yo'nalish"}
                </div>
              }
              name="directionId"
              rules={[{ required: true, message: t("directionRequired") || "Yo'nalish tanlanishi shart!" }]}
            >
              <Select
                className="!rounded-xl"
                placeholder={t("directionPlaceholder") || "Yo'nalishni tanlang"}
                size="large"
                allowClear
                showSearch
                optionFilterProp="children"
                loading={petitionLoading}
                disabled={petitionLoading}
              >
                {petitionList?.result?.map((dir: any) => (
                  <Option key={dir.id} value={dir.id}>
                    {dir.directionName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Weight */}
            {<Form.Item
              label={
                <div className="flex items-center gap-2 global-text-size font-semibold">
                  {t("weightLabel") || "Og'irlik (kg)"}
                </div>
              }
              name="weight"
              rules={[
                { required: true, message: t("weightRequired") || "Og'irlikni kiriting!" },
                { type: "number", min: 0.01, message: t("valueGreaterThanZero") || "0 dan katta bo'lishi kerak" },
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
            </Form.Item>}

            {/* Bulk */}
            {!calculateKg && <Form.Item
              label={
                <div className="flex items-center gap-2 global-text-size font-semibold">
                  {t("volumeLabel") || "Hajm (m³)"}
                </div>
              }
              name="bulk"
              rules={[
                { required: true, message: t("volumeRequired") || "Hajmni kiriting!" },
                { type: "number", min: 0.01, message: t("valueGreaterThanZero") || "0 dan katta bo'lishi kerak" },
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
            </Form.Item>}
          </>
        )}

        {/* ── calculateKg: false → From + To + Weight + Bulk ── */}
        {selectedProduct && !calculate && (
          <>
            {/* From */}
            <Form.Item
              label={
                <div className="flex items-center gap-2 global-text-size font-semibold">
                  {t("fromLabel") || "Qayerdan"}
                </div>
              }
              name="from"
              rules={[{ required: true, message: t("fromRequiredError") || "Manzilni kiriting!" }]}
            >
              <Input
                allowClear
                className="!rounded-xl global-input-height"
                placeholder={t("fromPlaceholder") || "Masalan: Toshkent"}
                prefix={<FaMapMarkerAlt className="text-blue-600" />}
              />
            </Form.Item>

            {/* To */}
            <Form.Item
              label={
                <div className="flex items-center gap-2 global-text-size font-semibold">
                  {t("toLabel") || "Qayerga"}
                </div>
              }
              name="to"
              rules={[{ required: true, message: t("toRequiredError") || "Manzilni kiriting!" }]}
            >
              <Input
                className="!rounded-xl global-input-height"
                placeholder={t("toPlaceholder") || "Masalan: Moskva"}
                prefix={<FaMapMarkerAlt className="text-blue-600" />}
              />
            </Form.Item>

            {/* Weight */}
            <Form.Item
              label={
                <div className="flex items-center gap-2 global-text-size font-semibold">
                  {t("weightLabel") || "Og'irlik (kg)"}
                </div>
              }
              name="weight"
              rules={[
                { required: true, message: t("weightRequiredError") || "Og'irlikni kiriting!" },
                { type: "number", min: 0.00001, message: t("weightMinError") || "0 dan katta bo'lishi kerak" },
              ]}
            >
              <InputNumber
                className="!rounded-xl global-input-height"
                placeholder={t("weightPlaceholder") || "Masalan: 12.5"}
                prefix={<FaWeightHanging className="text-blue-600" />}
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>

            {/* Bulk */}
            <Form.Item
              label={
                <div className="flex items-center gap-2 global-text-size font-semibold">
                  {t("bulkLabel") || "Hajm (m³)"}
                </div>
              }
              name="bulk"
              rules={[
                { required: true, message: t("bulkRequiredError") || "Hajmni kiriting!" },
                { type: "number", min: 0.00001, message: t("bulkMinError") || "0 dan katta bo'lishi kerak" },
              ]}
              normalize={(value) => (value === "" ? null : value)}
            >
              <InputNumber
                type="number"
                className="!rounded-xl global-input-height"
                placeholder={t("bulkPlaceholder") || "Masalan: 0.8"}
                prefix={<FaCube className="text-blue-600" />}
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>
            {selectedProduct && (
              <Form.Item name="customs" valuePropName="checked" className="mb-6">
                <Checkbox
                  checked={customs}
                  onChange={(e) => setCustoms(e.target.checked)}
                  className="global-text-size"
                >
                  <span className="font-semibold">
                    {t("customsLabel") || "Bojsiz / customs yo'q"}
                  </span>
                </Checkbox>
              </Form.Item>
            )}
          </>
        )}

        {/* ── Customs (har ikkala holatda ham) ── */}

        {/* ── Submit ── */}
        <Form.Item className="mt-8">
          <Button
            type="primary"
            className={`
              !border-0 !shadow-lg !py-6 w-full !rounded-xl !font-semibold !text-base
              hover:!scale-[1.02] !transition-all 
              !duration-300 !bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !shadow-blue-500/30 hover:!shadow-blue-500/40
              !text-white !disabled:text-white disabled:opacity-60
            `}
            htmlType="submit"
            loading={isPending}
            disabled={!selectedProduct || isPending}
            size="large"
            style={{
              color: 'white',
            }}
          >
            {calculate
              ? t("calculateButton") || "Hisoblash"
              : t("submitButton") || "Yuborish"}
          </Button>
        </Form.Item>
      </Form>

      {/* ── Apply muvaffaqiyatli modal ── */}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        centered
        className="custom-success-modal"
      >
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-500/40 animate-bounce">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <div className="text-2xl font-bold text-center text-gray-800">
            {t("successModalTitle") || "Muvaffaqiyatli!"}
          </div>
          <div className="text-gray-600 text-center text-base">
            {t("successModalText") || "Arizangiz muvaffaqiyatli yuborildi."}
          </div>
          <Button
            type="primary"
            className="!bg-gradient-to-r !from-green-500 !to-green-600 !border-0 !shadow-lg !shadow-green-500/30 !rounded-xl !px-8 !py-2 global-input-height !font-semibold hover:!scale-105 !transition-all !duration-300"
            onClick={() => setIsModalOpen(false)}
          >
            {t("successModalCloseButton") || "Yopish"}
          </Button>
        </div>
      </Modal>
    </>
  );
}