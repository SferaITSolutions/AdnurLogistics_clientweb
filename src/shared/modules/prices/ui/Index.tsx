"use client";

import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import DeliveryPricesPage from "../molecules/price-list";
import DeliveryPriceCreateForm from "@/features/prices/prices-create";

export default function PricesUi() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    message.success("Yangi narx muvaffaqiyatli qo'shildi!");
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header + Tugma */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl !font-bold text-gray-800 !mb-0">
          Yetkazib berish narxlari
        </h1>

        <Button
          type="primary"
          size="large"
          onClick={handleOpenModal}
        >
          + Yangi narx qo'shish
        </Button>
      </div>

      {/* Jadval */}
      <DeliveryPricesPage />

      {/* Yangi narx qo'shish Modal */}
      <Modal
        title="Yangi yetkazib berish narxini qo'shish"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}                
        destroyOnClose           
        centered
      >
        <DeliveryPriceCreateForm
          onSuccess={handleCreateSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}