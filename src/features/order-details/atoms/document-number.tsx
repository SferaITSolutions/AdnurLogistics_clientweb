import React from "react";

export default function DocumentNumber({
  documentNumber,
}: {
  documentNumber: string;
}) {
  return (
    <div className="flex flex-row items-center justify-between mb-3">
      <span className="text-sm text-gray-500">Buyurtma raqami</span>
      <span className="text-sm font-medium text-blue-700">
        {documentNumber}
      </span>
    </div>
  );
}
