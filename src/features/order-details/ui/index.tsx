"use client";
import React from "react";
import { Drawer } from "antd";
import { useOrderDetailsStore } from "../lib/store";
import dynamic from "next/dynamic";

// SSRda map yuklanmasligi uchun dynamic import
const YandexMapWithMovingCar = dynamic(
  () => import("../molecules/MapWithRoute"),
  { ssr: false }
);
const OrderDetailsModal: React.FC = () => {
  const { isModalOpen, closeModal, orderId } = useOrderDetailsStore();

  return (
    <Drawer
      title={`Order Details${orderId ? ` - ${orderId}` : ""}`}
      placement="right"
      onClose={closeModal}
      open={isModalOpen}
      width={520}
      className="!p-0"
      bodyStyle={{ padding: 0 }}
      maskClosable
    >
      <div className="p-6 space-y-4">
        {orderId ? (
          <>
            <div className="text-gray-800 mb-2">
              Details for order: <span className="font-mono">{orderId}</span>
            </div>
            <YandexMapWithMovingCar
              origin="Tashkent, Uzbekistan"
              destination="Samarkand, Uzbekistan"
            />
          </>
        ) : (
          <div className="text-gray-400">No order selected.</div>
        )}
      </div>
    </Drawer>
  );
};

export default OrderDetailsModal;
