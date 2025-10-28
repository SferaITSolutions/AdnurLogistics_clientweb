"use client";
import React, { useState } from "react";
import { Form, Input, InputNumber, Checkbox, Button, Modal } from "antd";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { useApplyFormStore } from "../store/store";
import { useTranslations } from "next-intl";
import { useApplyFCL } from "@/entities/hooks/calculation/hooks";

type ApplyFormValues = {
  from: string;
  to: string;
  weight: number;
  bulk: number;
  customs: boolean;
};

export default function ApplyForm() {
  const { values, setValue } = useApplyFormStore();
  const t = useTranslations("applyForm");
  const [form] = Form.useForm<ApplyFormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues: ApplyFormValues = {
    from: values?.from ?? "",
    to: values?.to ?? "",
    weight: values?.weight ?? 0,
    bulk: values?.bulk ?? 0,
    customs: values?.customs ?? false,
  };

  const applyMutation = useApplyFCL(() => {
    setValue("from", "");
    setValue("to", "");
    setValue("weight", 0);
    setValue("bulk", 0);
    setValue("customs", false);
    form.resetFields();
    setIsModalOpen(true);
  });

  const onFinish = (values: ApplyFormValues) => {
    applyMutation.mutate({
      fromLocation: values.from ?? "",
      toLocation: values.to ?? "",
      weight: values.weight ?? 0,
      bulk: values.bulk ?? 0,
      customs: values.customs || false,
    });
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          label={t("fromLabel")}
          name="from"
          rules={[{ required: true, message: t("fromRequiredError") }]}
        >
          <Input className="!rounded-xl" placeholder={t("fromPlaceholder")} />
        </Form.Item>
        <Form.Item
          label={t("toLabel")}
          name="to"
          rules={[{ required: true, message: t("toRequiredError") }]}
        >
          <Input className="!rounded-xl" placeholder={t("toPlaceholder")} />
        </Form.Item>
        <Form.Item
          label={t("weightLabel")}
          name="weight"
          rules={[
            { required: true, message: t("weightRequiredError") },
            { type: "number", min: 0.00001, message: t("weightMinError") },
          ]}
        >
          <InputNumber
            className="!rounded-xl"
            placeholder={t("weightPlaceholder")}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label={t("bulkLabel")}
          name="bulk"
          rules={[
            { required: true, message: t("bulkRequiredError") },
            { type: "number", min: 0.00001, message: t("bulkMinError") }, // 0 dan katta bo'lishi kerak
          ]}
        >
          <InputNumber
            type="number"
            className="!rounded-xl"
            placeholder={t("bulkPlaceholder")}
            style={{ width: "100%" }}
            // min={1}
          />
        </Form.Item>
        <Form.Item
          name="customs"
          valuePropName="checked"
          style={{ marginBottom: 16 }}
        >
          <Checkbox>{t("customsCheckbox")}</Checkbox>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={applyMutation.isPending}
        >
          {t("submitButton")}
        </Button>
      </Form>
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        centered
      >
        <div className="flex flex-col items-center gap-4 py-6">
          <span style={{ fontSize: 32, color: "#16a34a" }}>✅</span>
          <div className="text-lg font-semibold text-center">
            {t("successModalTitle") || "Tasdiqlash muvoffaqiyatli bo'ldi"}
          </div>
          <div className="text-gray-500 text-center">
            {t("successModalText") || "So‘rovingiz muvaffaqiyatli yuborildi."}
          </div>
          <Button type="primary" onClick={() => setIsModalOpen(false)}>
            {t("successModalCloseButton") || "Yopish"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
