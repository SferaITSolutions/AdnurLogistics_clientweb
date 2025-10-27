"use client";
import { Input, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";

import { useUpdateMe } from "@/widgets/headers/navbar-cabinet/hook/hook";
import { useTranslations } from "next-intl";

interface Props {
  userName: string;
  userPhone: string;
}

const EditablePopconfirm: React.FC<Props> = ({ userName, userPhone }) => {
  const t = useTranslations();
  const updateData = useUpdateMe();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(userName);

  useEffect(() => {
    if (open) setInputValue(userName);
  }, [open]);

  const handleConfirm = async () => {
    await updateData.mutateAsync(inputValue);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setInputValue(userName);
  };

  return (
    <Popconfirm
      icon={null}
      placement="bottom"
      title={t("editNameModal.title")}
      description={
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
      }
      okText={t("editNameModal.okText")}
      cancelText={t("editNameModal.cancelText")}
      open={open}
      onOpenChange={setOpen}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      okButtonProps={{ loading: updateData.isPending }}
    >
      <div className="cursor-pointer">
        <h1 className="text-md font-semibold !mb-0">{userName}</h1>
        <p className="text-sm !mb-0 text-gray-500">{userPhone}</p>
      </div>
    </Popconfirm>
  );
};

export default EditablePopconfirm;
