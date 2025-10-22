import React from "react";

export default function InvoiceNumber({
  invoiceNumber,
}: {
  invoiceNumber: string;
}) {
  return (
    <div className="flex flex-row items-center justify-between mb-4">
      <span className="text-sm font-semibold text-gray-500">
        Faktura raqami
      </span>
      <span className="text-base font-bold text-gray-800">{invoiceNumber}</span>
    </div>
  );
}
