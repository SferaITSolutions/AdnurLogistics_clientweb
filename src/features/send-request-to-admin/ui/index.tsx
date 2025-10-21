import React from "react";
import { Modal } from "antd";
import FormRequest from "../molecules/form-request";
import { useFormRequestStore } from "../lib/store";

export default function RequestToAdminModal() {
  const { requestModalStatus, setRequestModalStatus } = useFormRequestStore();

  const handleCancel = () => setRequestModalStatus("idle");

  return (
    <Modal
      open={requestModalStatus === "pending"}
      onCancel={handleCancel}
      footer={null}
      width={1000}
      centered
      title="Adminga so‘rov qoldirish"
    >
      <FormRequest />
    </Modal>
  );
}

