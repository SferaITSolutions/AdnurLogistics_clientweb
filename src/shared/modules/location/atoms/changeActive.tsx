"use client";

import { Switch, message } from "antd";
import React from "react";
import { useUpdateLocationStatus } from "@/entities/hooks/Locations/hooks";

interface ChangeActiveProps {
  id: string;
  active: boolean;
  disabled?: boolean;
  size?: "small" | "default" | "large"; // Switchda "middle" yo'q, default ishlatiladi
}

export default function ChangeActive({
  id,
  active,
  disabled = false,
  size = "default",
}: ChangeActiveProps) {
  const { mutate: updateStatus, isPending } = useUpdateLocationStatus();

  const handleChange = (checked: boolean) => {
    updateStatus(
      { id: id, active: checked },
      {
        onSuccess: () => {
          message.success(`Status ${checked ? "Active" : "Inactive"} ga o'zgartirildi`);
        },
        onError: (error) => {
          message.error("Statusni yangilab bo'lmadi");
          console.error(error);
        },
      }
    );
  };

  return (
    <Switch
      checked={active}
      onChange={handleChange}
      loading={isPending}
      disabled={disabled || isPending}
      size={"default"} // large ni default sifatida qoldiramiz
      checkedChildren="Active"
      unCheckedChildren="Inactive"
      // iOS ga yaqinroq ko'rinish uchun qo'shimcha style (ixtiyoriy)
      style={{
        backgroundColor: active ? "#52c41a" : undefined, // faol bo'lsa yashil
      }}
      className={active ? "status-active" : "status-inactive"}
    />
  );
}