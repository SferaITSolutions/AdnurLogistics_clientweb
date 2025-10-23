"use client";
import React from "react";
import { Collapse } from "antd";
import InfoRow from "../atoms/inforow";
import CollapseItems from "../atoms/collapse-Items";

export default function Products({
  productData,
}: {
  productData: {
    documentNumber: string;
    productName: string;
    productDescription: string;
    productCount: string;
    productRate: string;
    productNetAmount: string;
  };
}) {

  return (
    <div className="max-w-md mx-auto font-sans">
      <Collapse
        bordered
        items={CollapseItems({ productData })} // ✅ yangi tavsiya etilgan usul
        className="!bg-white !shadow-sm !rounded-xl !border !border-gray-100 overflow-hidden"
        expandIconPosition="end"
        style={{ boxShadow: "0 1px 8px 0 rgb(24 24 27 / 6%)" }}
      />
    </div>
  );
}
