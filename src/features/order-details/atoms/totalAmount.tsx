import React from "react";

export default function TotalAmount({
  invoiceTotalAmount,
}: {
  invoiceTotalAmount: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-500">Jami summa</span>
      <span className="font-bold text-primary-blue text-lg">
        {Number(invoiceTotalAmount).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        so'm
      </span>
    </div>
  );
}
