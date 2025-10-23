"use client";
import React from "react";
import { Drawer, Empty, Spin } from "antd";
import { useOrderDetailsStore } from "../lib/store";
import dynamic from "next/dynamic";
import { useOrderById } from "@/entities/hooks/order/hooks";
import Products from "../molecules/products";
import InvoiceCard from "../molecules/invoices";
import DeliviryStatus from "../molecules/deliviry";
import { StatusProductTitle } from "../atoms";

// SSRda map yuklanmasligi uchun dynamic import
const YandexMapWith = dynamic(
  async () => {
    return (await import("../molecules/MapWithRoute")).default;
  },
  { ssr: false }
);

const OrderDetailsModal: React.FC = () => {
  const { isModalOpen, closeModal, orderId } = useOrderDetailsStore();
  const { data, isLoading } = useOrderById(orderId || "");
  console.log(data, "data");
  const orderData = data?.data;
  if (isLoading) {
    return <Spin />;
  }
  return (
    <Drawer
      title={`Order Details${orderId ? ` - ${orderId}` : ""}`}
      placement="right"
      onClose={closeModal}
      open={isModalOpen}
      width={520}
      className="!p-0"
      maskClosable
    >
      <div className="p-6 space-y-4">
        {orderId ? (
          <>
            <div className="text-gray-800 mb-2">
              Details for order: <span className="font-mono">{orderId}</span>
            </div>
            <YandexMapWith
              origin={orderData?.orderRoadMap?.fromLocation}
              destination={orderData?.orderRoadMap?.toLocation}
            />
            <div className="text-gray-800 mb-2 text-xl font-bold border-t border-gray-100 pt-4">
              <DeliviryStatus deliviryStatus={orderData?.orderRoadMap || {}} />
            </div>
            <div className="grid grid-cols-2 gap-3"></div>
            <StatusProductTitle title="Mahsulot tafsilotlari" />

            {orderData?.products ? (
              orderData?.products?.map((product: any, index: number) => (
                <Products
                  key={`${product.documentNumber || "prod"}-${index}`}
                  productData={product}
                />
              ))
            ) : (
              <Empty description="Mahsulotlar topilmadi" />
            )}

            {orderData?.invoices ? (
              orderData?.invoices?.map((invoice: any, index: number) => (
                <InvoiceCard
                  key={`${invoice.documentNumber || "inv"}-${index}`}
                  amountPaid={invoice.amountPaid}
                  amountRemaining={invoice.amountRemaining}
                  invoiceNumber={invoice.invoiceNumber}
                  invoiceStatus={invoice.invoiceStatus}
                  invoiceTotalAmount={invoice.invoiceTotalAmount}
                  documentNumber={invoice.documentNumber}
                />
              ))
            ) : (
              <>
                <Empty description="To'lov qilinmagan" />
              </>
            )}
          </>
        ) : (
          <div className="text-gray-400">No order selected.</div>
        )}
      </div>
    </Drawer>
  );
};

export default OrderDetailsModal;
