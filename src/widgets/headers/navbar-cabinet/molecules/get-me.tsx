"use client";
import { Input, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";

import { useUpdateMe } from "@/widgets/headers/navbar-cabinet/hook/hook";
import { useTranslations } from "next-intl";
import { useResetModalStore } from "@/features/reset-password/lib/store";
import ResetPasswordModal from "@/features/reset-password/ui";

interface Props {
  userName: string;
  userPhone: string;
}

const EditableModal: React.FC<Props> = ({ userName, userPhone }) => {
  const t = useTranslations();
  const updateData = useUpdateMe();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(userName);
  const { open: openResetPasswordModal } = useResetModalStore();

  useEffect(() => {
    if (open) setInputValue(userName);
  }, [open, userName]);

  const handleOk = async () => {
    if (!inputValue.trim()) return;
    await updateData.mutateAsync(inputValue);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setInputValue(userName);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        <h1 className="global-label-size font-semibold !mb-0">{userName}</h1>
        <p className="global-text-size !mb-0">{userPhone}</p>
      </div>
      <Modal
        title={t("editNameModal.title")}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            disabled={updateData.isPending}
          >
            {t("editNameModal.cancelText")}
          </Button>,
          <Button
            key="resetPassword"
            onClick={() => openResetPasswordModal()}
            disabled={updateData.isPending}
          >
            {t("resetPasswordPage.pageTitle")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={updateData.isPending}
            onClick={handleOk}
            disabled={!inputValue.trim()}
          >
            {t("editNameModal.okText")}
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-2">
          <Input
            placeholder={t("editNameModal.placeholder")}
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              const cleaned = val.replace(
                /[^A-Za-zА-Яа-яЎўҚқҒғҲҳЪъʼ‘ʼʼʼʼ’ʼʼ'-\s]/g,
                ""
              );
              setInputValue(cleaned);
            }}
            maxLength={32}
            status={!inputValue.trim() ? "error" : undefined}
          />
          {!inputValue.trim() && (
            <p className="text-xs text-red-500">
              {t("editNameModal.validationError")}
            </p>
          )}
          <p className="text-xs text-gray-400">{t("editNameModal.hint")}</p>
        </div>
      </Modal>
      <ResetPasswordModal/>
    </>
  );
};

export default EditableModal;
