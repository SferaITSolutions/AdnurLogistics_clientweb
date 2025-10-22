import React from "react";
import {
  DocumentNumber,
  InvoiceNumber,
  InvoiceStatus,
  TotalAmount,
} from "../atoms";

type InvoiceProps = {
  amountPaid: string;
  amountRemaining: string;
  invoiceNumber: string;
  invoiceStatus: string;
  invoiceTotalAmount: string;
  documentNumber: string;
};

export default function InvoiceCard({
  amountPaid,
  amountRemaining,
  invoiceNumber,
  invoiceStatus,
  invoiceTotalAmount,
  documentNumber,
}: InvoiceProps) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 border border-gray-100 font-sans">
      <InvoiceNumber invoiceNumber={invoiceNumber} />
      <DocumentNumber documentNumber={documentNumber} />
      <InvoiceStatus invoiceStatus={invoiceStatus} />

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex flex-col gap-1">
          <TotalAmount invoiceTotalAmount={invoiceTotalAmount} />
          <span className="text-xs text-gray-500">To'langan summa</span>
          <span className="font-semibold text-green-700">
            {Number(amountPaid).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            so'm
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">Qolgan summa</span>
          <span
            className={
              +amountRemaining === 0
                ? "font-semibold text-gray-500"
                : "font-semibold text-red-600"
            }
          >
            {Number(amountRemaining).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            so'm
          </span>
        </div>
      </div>
    </div>
  );
}
