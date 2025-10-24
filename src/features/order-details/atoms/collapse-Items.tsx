import React from 'react'
import InfoRow from './inforow'
import { useTranslations } from 'next-intl';

interface ProductData {
  documentNumber: string;
  productName: string;
  productDescription: string;
  productCount: string;
  productRate: string;
  productNetAmount: string;
}

interface CollapseItemsProps {
  productData: ProductData;
}

export default function CollapseItems({ productData }: CollapseItemsProps) {
  const t = useTranslations("orderInfo");
  const items = [
    {
      key: "1",
      label: (
        <div className="flex flex-row items-center gap-2">
          <span className="text-xs bg-blue-50 text-primary-blue font-semibold rounded px-2.5 py-1 mr-3">
            {t("orderNumber")}
          </span>
          <span className="text-base text-gray-700 font-bold">
            {productData?.documentNumber}
          </span>
        </div>
      ),
      children: (
        <div className="flex flex-col gap-3 pt-2 pb-1 px-1">
          <InfoRow
            label={t("productName")}
            value={productData?.productName || "-"}
          />
          <InfoRow
            label={t("description")}
            value={productData?.productDescription || "-"}
          />
          <InfoRow
            label={t("quantity")}
            value={productData?.productCount || "-"}
          />
          <InfoRow
            label={t("priceSum")}
            value={productData?.productRate || "-"}
          />
          <InfoRow
            label={t("totalAmount")}
            value={productData?.productNetAmount || "-"}
            valueClass={
              Number(productData?.productNetAmount || 0) < 0
                ? "text-red-500 font-semibold"
                : "text-primary-blue font-semibold"
            }
          />
        </div>
      ),
      className: "!rounded-lg !mb-2 !border-none !p-0",
    },
  ];

  // This component returns just the items array, should be used within a parent Collapse
  return items;
}
