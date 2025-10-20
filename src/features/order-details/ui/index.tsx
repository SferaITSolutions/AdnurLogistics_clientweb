"use client";
import React from "react";
import { Drawer } from "antd";
import { useOrderDetailsStore } from "../lib/store";

const OrderDetailsModal: React.FC = () => {
  const { isModalOpen, closeModal, orderId } = useOrderDetailsStore();

  return (
    <Drawer
      title={`Order Details${orderId ? ` - ${orderId}` : ""}`}
      placement="right"
      onClose={closeModal}
      open={isModalOpen}
      width={480}
      className="!p-0"
      bodyStyle={{ padding: 0 }}
      maskClosable
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2">Order Info</h2>
        {orderId ? (
          <div className="space-y-3">
            {/* Place detailed order info here */}
            <div className="text-gray-800">Details for order: <span className="font-mono">{orderId}</span></div>
          </div>
        ) : (
          <div className="text-gray-400">
            No order selected.
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default OrderDetailsModal;
