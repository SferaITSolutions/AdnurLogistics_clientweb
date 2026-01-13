"use client";

import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import DeliveryPricesPage from "../molecules/price-list";
import DeliveryPriceCreateForm from "@/features/prices/prices-create";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function PricesUi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("pricesTable");
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    toast.success("Yangi narx muvaffaqiyatli qo'shildi!");
  };

  return (
    <div className="">
      {/* Header + Tugma */}
      <div className="!mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-4">
        <h1 className="text-xl md:text-2xl !font-bold text-gray-800 !mb-0">
          {t("deliveryRates")}
        </h1>

        <Button
          type="primary"
          size="large"
          onClick={handleOpenModal}
        >
          <b>+</b> {t("add")}
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
        destroyOnHidden           
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