import { QuantityOrderProps } from "@/shared/types/props";
import { useTranslations } from "next-intl";
import React from "react";

export default function QuantityOrder({ Weight, Volume, quantity }: QuantityOrderProps) {
  const t = useTranslations('clientDashboard');
  
  return (
    <div>
      {/* {Quantity} ta |{" "} */}
      <span className="font-semibold">{quantity} {t('countOfProducts')}</span> |{" "}
      <span className="font-semibold">{Weight} kg</span> |{" "}
      <span className="font-semibold">{Volume} m³</span>
    </div>
  );
}
