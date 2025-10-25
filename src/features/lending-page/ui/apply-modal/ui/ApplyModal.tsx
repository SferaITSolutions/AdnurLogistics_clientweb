"use client";

import {
  deformatPhone,
  deformatPhoneTR,
  formatPhone,
  formatPhoneTR,
} from "@/shared/utils/formatter";
import { Button, Checkbox, Form, Input, Modal, Select, message } from "antd";

import SelectBefore from "@/shared/components/dump/atoms/select-before";
import { FROM_OPTIONS, useRegions } from "@/shared/constants";
import { TitleText } from "@/shared/modules/lending-page";
import { useGlobalStore } from "@/shared/store/globalStore";
import { ApplyRequest } from "@/shared/types/lenging-page-types";
import { useEffect } from "react";
import { useApplyRequest } from "../lib/hooks/hooks";
import { useApplyModalStore } from "../model/useApplyModalStore";
import { useTranslations } from "next-intl";

export const ApplyModal = () => {
  const { open, setOpen } = useApplyModalStore();
  const { beforePhone } = useGlobalStore();
  const t = useTranslations("LendingPage.applyModal");
  const applyRequest = useApplyRequest();
  const [form] = Form.useForm();
  const handleSubmit = async (values: ApplyRequest) => {
    try {
      const { phone, bulk, density, weight, ...data } = values;
      // Ensure bulk, density, weight are numbers or null if not provided
      const cleanData = {
        ...data,
        phone:
          beforePhone === "+998"
            ? deformatPhone(phone)
            : deformatPhoneTR(phone),
        bulk: bulk !== undefined && bulk !== null ? Number(bulk) : undefined,
        density:
          density !== undefined && density !== null
            ? Number(density)
            : undefined,
        weight:
          weight !== undefined && weight !== null ? Number(weight) : undefined,
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
      // setOpen(true);
    }, 1000000000000000);

    setInterval(() => {
      // setOpen(true);
    }, 3000000000000000);
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
        {/* Name & Phone - first row */}
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label={
              <span className="global-label-size">
                {t("fields.fullname.label")}
              </span>
            }
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
              onKeyPress={(e) => {
                const regex = /^[A-Za-z\u0400-\u04FF\s'-]$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="global-label-size">
                {t("fields.phone.label")}
              </span>
            }
            name="phone"
            className="flex-1"
            rules={[
              { required: true, message: t("fields.phone.required") },
              {
                pattern: /^(?:\+998\s|\+90\s)?\d{2,3}\s\d{3}\s\d{2}\s\d{2}$/,
                message: `${t("fields.phone.patternUz")} ${
                  beforePhone === "+998"
                    ? "+998 90 123 45 67"
                    : "+90 123 123 1234"
                }`,
              },
            ]}
          >
            <Input
              addonBefore={<SelectBefore />}
              placeholder={
                beforePhone === "+998" ? "90 123 45 67" : "123 123 1234"
              }
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
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label={
              <span className="global-label-size">
                {t("fields.fromLocation.label")}
              </span>
            }
            name="fromLocation"
            className="flex-1"
            rules={[
              { required: true, message: t("fields.fromLocation.required") },
            ]}
          >
            <Select
              placeholder={t("fields.fromLocation.placeholder")}
              options={useRegions().FROM_OPTIONS}
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="global-label-size">
                {t("fields.toLocation.label")}
              </span>
            }
            name="toLocation"
            className="flex-1"
            rules={[
              { required: true, message: t("fields.toLocation.required") },
            ]}
          >
            <Select
              placeholder={t("fields.toLocation.placeholder")}
              options={[{ label: "Toshkent", value: "TASHKENT" }]}
            />
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label={
              <span className="global-label-size">
                {t("fields.bulk.label")}
              </span>
            }
            name="bulk"
            className="flex-1"
            rules={[{ required: true, message: t("fields.bulk.required") }]}
          >
            <Input placeholder={t("fields.bulk.placeholder")} />
          </Form.Item>
          <Form.Item
            label={
              <span className="global-label-size">
                {t("fields.density.label")}
              </span>
            }
            name="density"
            className="flex-1"
            rules={[{ required: true, message: t("fields.density.required") }]}
          >
            <Input placeholder={t("fields.density.placeholder")} />
          </Form.Item>
        </div>
        {/* Message */}
        <Form.Item
          label={
            <span className="global-label-size">
              {t("fields.weight.label")}
            </span>
          }
          name="weight"
          rules={[{ required: true, message: t("fields.weight.required") }]}
        >
          <Input placeholder={t("fields.weight.placeholder")} />
        </Form.Item>

        <Form.Item
          label={
            <span className="global-label-size">
              {t("fields.description.label")}
            </span>
          }
          name="description"
          rules={[
            { required: true, message: t("fields.description.required") },
          ]}
        >
          <Input.TextArea
            rows={3}
            placeholder={t("fields.description.placeholder")}
          />
        </Form.Item>
        {/* <Form.Item
          name="isAgree"
          rules={[{ required: true, message: "Rozi bo'lish shart" }]}
        >
          <Checkbox>Shaxsiy ma'lumotlarimni qayta ishlashga roziman</Checkbox>
        </Form.Item> */}
        <Button
          htmlType="submit"
          type="primary"
          loading={applyRequest.isPending}
          className="
            w-full 
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
