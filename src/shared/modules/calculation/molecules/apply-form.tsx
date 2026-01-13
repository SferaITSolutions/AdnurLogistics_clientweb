"use client";
import React, { useState } from "react";
import { Form, Input, InputNumber, Checkbox, Button, Modal } from "antd";
import { useApplyFormStore } from "../store/store";
import { useTranslations } from "next-intl";
import { useApplyFCL } from "@/entities/hooks/calculation/hooks";
import { FaMapMarkerAlt, FaWeightHanging, FaCube, FaCheckCircle } from "react-icons/fa";

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
        className="!w-full"
      >
        <Form.Item
          label={
            <div className="flex items-center gap-2 global-text-size font-semibold">
              {/* <FaMapMarkerAlt className="text-green-600" /> */}
              {t("fromLabel")}
            </div>
          }
          name="from"
          rules={[{ required: true, message: t("fromRequiredError") }]}
        >
          <Input
            className="!rounded-xl global-input-height"
            placeholder={t("fromPlaceholder")}
            prefix={<FaMapMarkerAlt className="text-green-600" />}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex items-center gap-2 global-text-size font-semibold">
              {/* <FaMapMarkerAlt className="text-red-600" /> */}
              {t("toLabel")}
            </div>
          }
          name="to"
          rules={[{ required: true, message: t("toRequiredError") }]}
        >
          <Input
            className="!rounded-xl global-input-height"
            placeholder={t("toPlaceholder")}
            prefix={<FaMapMarkerAlt className="text-red-600" />}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex items-center gap-2 global-text-size font-semibold">
              {/* <FaWeightHanging className="text-blue-600" /> */}
              {t("weightLabel")}
            </div>
          }
          name="weight"
          rules={[
            { required: true, message: t("weightRequiredError") },
            { type: "number", min: 0.00001, message: t("weightMinError") },
          ]}
        >
          <InputNumber
            className="!rounded-xl global-input-height"
            placeholder={t("weightPlaceholder")}
            prefix={<FaWeightHanging className="text-blue-600" />}
            style={{ width: "100%" }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex items-center gap-2 global-text-size font-semibold">
              {/* <FaCube className="text-purple-600" />   */}
              {t("bulkLabel")}
            </div>
          }
          name="bulk"
          rules={[
            { required: true, message: t("bulkRequiredError") },
            { type: "number", min: 0.00001, message: t("bulkMinError") },
          ]}
        >
          <InputNumber
            type="number"
            className="!rounded-xl global-input-height"
            placeholder={t("bulkPlaceholder")}
            prefix={<FaCube className="text-purple-600" />}
            style={{ width: "100%" }}
            size="large"
          />
        </Form.Item>

        <Form.Item name="customs" valuePropName="checked" style={{ marginBottom: 16 }}>
          <Checkbox className="global-text-size font-medium">
            {t("customsCheckbox")}
          </Checkbox>
        </Form.Item>

        <Button
          type="primary"
          className="!bg-gradient-to-r !from-green-500 !to-green-600 hover:!from-green-600 hover:!to-green-700 !border-0 !shadow-lg !shadow-green-500/30 hover:!shadow-xl hover:!shadow-green-500/40 !rounded-xl !px-4 !py-2 global-input-height !font-semibold hover:!scale-[1.02] !transition-all !duration-300"
          htmlType="submit"
          loading={applyMutation.isPending}
        >
          {t("submitButton")}
        </Button>
      </Form>

      {/* Success Modal */}
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
            {t("successModalTitle") || "Success!"}
          </div>
          <div className="text-gray-600 text-center text-base">
            {t("successModalText") || "Your request has been submitted successfully."}
          </div>
          <Button
            type="primary"
            className="!bg-gradient-to-r !from-green-500 !to-green-600 !border-0 !shadow-lg !shadow-green-500/30 !rounded-xl !px-8 !py-2 global-input-height !font-semibold hover:!scale-105 !transition-all !duration-300"
            onClick={() => setIsModalOpen(false)}
          >
            {t("successModalCloseButton") || "Close"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
