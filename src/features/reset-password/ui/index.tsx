"use client";

import React from "react";
import { Modal, Button, Input, Form } from "antd";
import { useTranslations } from "next-intl";
import { useResetPassword } from "../lib/hooks";
import { useResetModalStore } from "../lib/store";

const ResetPasswordModal: React.FC = () => {
  const t = useTranslations();
  const { isOpen: open, close: onClose } = useResetModalStore();
  const [form] = Form.useForm();
  const resetPasswordMutation = useResetPassword();

  const handleFinish = (values: {
    oldPassword: string;
    newPassword: string;
    prePassword: string;
  }) => {
    resetPasswordMutation
      .mutateAsync({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        prePassword: values.prePassword,
      })
      .then(() => {
        form.resetFields();
        onClose();
      });
  };

  return (
    <Modal
      open={open}
      title={
        <span className="text-2xl">{t("resetPasswordPage.pageTitle")}</span>
      }
      onCancel={onClose}
      width={400}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
      >
        {/* Old Password */}
        <Form.Item
          label={
            <span className="global-label-size">
              {t("resetPasswordPage.oldPasswordLabel")}
            </span>
          }
          name="oldPassword"
          rules={[
            {
              required: true,
              message: t("resetPasswordPage.validation.oldPasswordRequired"),
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t("resetPasswordPage.oldPasswordPlaceholder")}
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          label={
            <span className="global-label-size">
              {t("resetPasswordPage.newPasswordLabel")}
            </span>
          }
          name="newPassword"
          rules={[
            {
              required: true,
              message: t("resetPasswordPage.validation.newPasswordRequired"),
            },
            {
              min: 5,
              message: t("resetPasswordPage.minLength"),
            },
            // {
            //   validator: (_, value) => {
            //     if (!value) return Promise.resolve();
            //     if (!/[A-Z]/.test(value))
            //       return Promise.reject(t("Schemas.passwordUppercase"));
            //     if (!/[a-z]/.test(value))
            //       return Promise.reject(t("Schemas.passwordLowercase"));
            //     if (!/[0-9]/.test(value))
            //       return Promise.reject(t("Schemas.passwordNumber"));
            //     if (!/[@$!%*?&]/.test(value))
            //       return Promise.reject(t("Schemas.passwordSpecial"));
            //     return Promise.resolve();
            //   },
            // },
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t("resetPasswordPage.newPasswordPlaceholder")}
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label={
            <span className="global-label-size">
              {t("resetPasswordPage.confirmNewPasswordLabel")}
            </span>
          }
          name="prePassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: t(
                "resetPasswordPage.validation.confirmPasswordRequired"
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  t("resetPasswordPage.validation.passwordsDoNotMatch")
                );
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t("resetPasswordPage.confirmNewPasswordPlaceholder")}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={resetPasswordMutation.isPending}
            block
          >
            <span className="global-button-size">
              {t("resetPasswordPage.submitButton")}
            </span>
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResetPasswordModal;
