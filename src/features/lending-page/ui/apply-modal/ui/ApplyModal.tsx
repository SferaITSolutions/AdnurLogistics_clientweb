"use client";

import {
  deformatPhone,
  deformatPhoneTR,
  formatPhone,
  formatPhoneTR,
} from "@/shared/utils/formatter";
import { Button, Checkbox, Form, Input, Modal, Select, Spin, message } from "antd";

import SelectBefore from "@/shared/components/dump/atoms/select-before";
import { TitleText } from "@/shared/modules/lending-page";
import { useGlobalStore } from "@/shared/store/globalStore";
import { ApplyRequest } from "@/shared/types/lenging-page-types";
import { useEffect } from "react";
import { useApplyRequest } from "../lib/hooks/hooks";
import { useApplyModalStore } from "../model/useApplyModalStore";
import { useTranslations } from "next-intl";
import { useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks";
import { useGetProductsList } from "@/entities/hooks/calculation/hooks";

export const ApplyModal = () => {
  const { Option } = Select;
  const { open, setOpen } = useApplyModalStore();
  const { beforePhone } = useGlobalStore();
  const t = useTranslations("LendingPage.applyModal");
  const tr = useTranslations("calculationPage");

  const [form] = Form.useForm();
  const lang = localStorage.getItem("roleName");

  const { data: productsData, isLoading: productsLoading } = useGetProductsList();
  const { data: fromData, isLoading: fromLoading } = useGetFromList(lang);
  const { data: toData, isLoading: toLoading } = useGetToList(lang);

  const applyRequest = useApplyRequest();

  const handleSubmit = async (values: any) => {
    try {
      const { phone, bulk, weight, description, fromLocation, toLocation, product, ...rest } = values;

      const cleanData: any = {
        fromLocation,
        toLocation,
        productId: product,
        phone:
          beforePhone === "+998"
            ? deformatPhone(phone)
            : deformatPhoneTR(phone),
        bulk: bulk !== undefined && bulk !== null ? Number(bulk) : undefined,
        weight: weight !== undefined && weight !== null ? Number(weight) : undefined,
        fullname: rest.fullname,
        description,
      };

      await applyRequest.mutateAsync(cleanData);
      message.success(t("success"));
      form.resetFields();
      setOpen(false);
    } catch {
      message.error(t("error"));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 30000);

    setInterval(() => {
      setOpen(true);
    }, 30000);
  }, []);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      footer={null}
      centered
      width={800}
      className="rounded-2xl"
    >
      <div className="py-4 mb-5">
        <TitleText title={t("title")} />
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Fullname & Phone */}
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label={<span className="global-label-size">{t("fields.fullname.label")}</span>}
            name="fullname"
            className="flex-1"
            rules={[
              { required: true, message: t("fields.fullname.required") },
              {
                pattern: /^[A-Za-z\u0400-\u04FF\s'-]+$/,
                message: t("fields.fullname.pattern"),
              },
            ]}
          >
            <Input
              placeholder={t("fields.fullname.placeholder")}
              size="large"
              onKeyPress={(e) => {
                const regex = /^[A-Za-z\u0400-\u04FF\s'-]$/;
                if (!regex.test(e.key)) e.preventDefault();
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="global-label-size">{t("fields.phone.label")}</span>}
            name="phone"
            className="flex-1"
            rules={[
              { required: true, message: t("fields.phone.required") },
              {
                pattern: /^(?:\+998\s|\+90\s)?\d{2,3}\s\d{3}\s\d{2}\s\d{2}$/,
                message: `${t("fields.phone.patternUz")} ${beforePhone === "+998" ? "+998 90 123 45 67" : "+90 123 123 1234"
                  }`,
              },
            ]}
          >
            <Input
              size="large"
              addonBefore={<SelectBefore />}
              placeholder={beforePhone === "+998" ? "90 123 45 67" : "123 123 1234"}
              onChange={(e) => {
                form.setFieldsValue({
                  phone:
                    beforePhone === "+998"
                      ? formatPhone(e.target.value, true)
                      : formatPhoneTR(e.target.value, true),
                });
              }}
            />
          </Form.Item>
        </div>

        {/* Product */}
        <div className="flex flex-col md:flex-row gap-4 !w-full">
          <Form.Item
            label={
              <div className="flex w-full items-center gap-2 global-text-size font-semibold">
                {tr("productLabel") || "Mahsulot"}
              </div>
            }
            name="product"
            className="flex-1"
            rules={[{ required: true, message: tr("selectProduct") || "Mahsulotni tanlang!" }]}
          >
            <Select
              placeholder={tr("productPlaceholder") || "Mahsulotni tanlang"}
              size="large"
              showSearch
              optionFilterProp="children"
              loading={productsLoading}
              notFoundContent={productsLoading ? <Spin size="small" /> : tr("noProductsFound")}
            >
              {productsData?.result?.map((product: any) => (
                <Option key={product.id} value={product.id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* From & To */}
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label={
              <div className="flex w-full items-center gap-2 global-text-size font-semibold">
                {t("fields.fromLocation.label") || "Qayerdan"}
              </div>
            }
            name="fromLocation"
            className="flex-1"
            rules={[{ required: true, message: t("fields.fromLocation.required") || "Qayerdan kiriting!" }]}
          >
            <Input
              size="large"
              placeholder={t("fields.fromLocation.placeholder")}
            />
          </Form.Item>

          <Form.Item
            label={
              <div className="flex w-full items-center gap-2 global-text-size font-semibold">
                {t("fields.toLocation.label")}
              </div>
            }
            name="toLocation"
            className="flex-1"
            rules={[{ required: true, message: t("fields.toLocation.required") || "Qayerga kiriting!" }]}
          >
            <Input
              size="large"
              placeholder={t("fields.toLocation.placeholder")}
            />
          </Form.Item>
        </div>

        {/* Bulk & Weight */}
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label={<span className="global-label-size">{t("fields.bulk.label")}</span>}
            name="bulk"
            className="flex-1"
            rules={[{ required: true, message: t("fields.bulk.required") }]}
          >
            <Input size="large" placeholder={t("fields.bulk.placeholder")} />
          </Form.Item>

          <Form.Item
            label={<span className="global-label-size">{t("fields.density.label")}</span>}
            name="weight"
            className="flex-1"
            rules={[{ required: true, message: t("fields.density.required") }]}
          >
            <Input size="large" placeholder={t("fields.density.placeholder")} />
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item
          label={<span className="global-label-size">{t("fields.description.label")}</span>}
          name="description"
          rules={[{ required: true, message: t("fields.description.required") }]}
        >
          <Input.TextArea rows={3} placeholder={t("fields.description.placeholder")} />
        </Form.Item>

        {/* Agree */}
        <Form.Item name="isAgree">
          <Checkbox>{t("fields.isAgree.label")}</Checkbox>
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          loading={applyRequest.isPending}
          className="
            bg-primary-blue-color 
            cursor-pointer 
            hover:!text-[#004F98] 
            hover:!bg-[#fff] 
            hover:!border-[#0D6CEC] 
            hover:!border-2 
            !border-2 
            border-primary-blue-color 
            !px-6 !py-4 !rounded-full 
            flex items-center 
            gap-2 !text-[#fff] 
            transition-all 
            duration-200"
        >
          {t("button.submit")}
        </Button>
      </Form>
    </Modal>
  );
};