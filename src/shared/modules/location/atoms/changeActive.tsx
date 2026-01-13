"use client";

import { Select, message } from "antd";
import React from "react";
import { useUpdateLocationStatus } from "@/entities/hooks/Locations/hooks";

interface ChangeActiveProps {
  id: string;
  active: boolean;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
}

export default function ChangeActive({
    id,
    active,
    disabled = false,
    size = "middle",
}: ChangeActiveProps) {
    const { mutate: updateStatus, isPending } = useUpdateLocationStatus();
    
    console.log(typeof active);
  const handleChange = (value: string) => {
    const newActive = value === "active";

    updateStatus(
      { id: id, active: newActive },
      {
        onSuccess: () => {
          message.success(`Status successfully changed to ${value}`);
        },
        onError: (error) => {
          message.error("Failed to update status");
          console.error(error);
        },
      }
    );
  };

  return (
    <Select
      value={active ? "active" : "inactive"}
      onChange={handleChange}
      loading={isPending}
      disabled={disabled || isPending}
      size={size}
      style={{ width: 120 }}
      options={[
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ]}
      className={active ? "status-active" : "status-inactive"}
    />
  );
}
