import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useUpdateProfileModalStore } from "../lib/store";

const UpdateProfileModal: React.FC = () => {
  const { isModalOpen, closeModal, userId } = useUpdateProfileModalStore();
  const [inputValue, setInputValue] = useState("John Doe");

  const handleOk = () => {
    closeModal();
    setInputValue("");
  };

  const handleCancel = () => {
    closeModal();
    setInputValue("");
  };

  return (
    <Modal
      title="Tahrirlash"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Saqlash"
      cancelText="Bekor qilish"
    >
      <Input
        placeholder="Ismni kiriting"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Modal>
  );
};

export default UpdateProfileModal;
