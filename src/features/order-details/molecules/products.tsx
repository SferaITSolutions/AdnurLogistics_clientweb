import React from "react";
import { Collapse } from "antd";
import InfoRow from "../atoms/inforow";

const { Panel } = Collapse;

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
        className="!bg-white !shadow-sm !rounded-xl !border !border-gray-100 overflow-hidden"
        expandIconPosition="right"
        style={{ boxShadow: "0 1px 8px 0 rgb(24 24 27 / 6%)" }}
      >
        <Panel
          header={
            <div className="flex flex-row items-center gap-2">
              <span className="text-xs bg-blue-50 text-primary-blue font-semibold rounded px-2.5 py-1 mr-3">
                Buyurtma raqami
              </span>
              <span className="text-base text-gray-700 font-bold">
                {productData.documentNumber}
              </span>
            </div>
          }
          key="1"
          className="!rounded-lg !mb-2 !border-none !p-0"
        >
          <div className="flex flex-col gap-3 pt-2 pb-1 px-1">
            <InfoRow label="Mahsulot nomi:" value={productData.productName || "-"} />
            <InfoRow label="Tasnifi:" value={productData.productDescription || "-"} />
            <InfoRow label="Soni:" value={productData.productCount || "-"} />
            <InfoRow label="Narx (so'm):" value={productData.productRate || "-"} />
            <InfoRow
              label="Jami summa (so'm):"
              value={productData.productNetAmount || "-"}
              valueClass={
                Number(productData.productNetAmount || 0) < 0
                  ? "text-red-500 font-semibold"
                  : "text-primary-blue font-semibold"
              }
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
