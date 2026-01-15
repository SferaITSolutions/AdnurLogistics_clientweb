import React from "react";
import { DocumentNumber, InvoiceNumber, TotalAmount } from "../atoms";
import { useTranslations } from "next-intl";
import StatusOrder from "@/shared/modules/cobenent-dashboard/atoms/status-order";
import { FaDollarSign, FaExclamationCircle, FaReceipt } from "react-icons/fa";

type InvoiceProps = {
  amountPaid: string;
  amountRemaining: string;
  invoiceNumber: string;
  invoiceStatus: string;
  invoiceTotalAmount: string;
  documentNumber: string;
  currency: string;
};

export default function InvoiceCard({
  amountPaid,
  amountRemaining,
  invoiceNumber,
  invoiceStatus,
  invoiceTotalAmount,
  documentNumber,
  currency,
}: InvoiceProps) {
  const t = useTranslations("clientDashboard");
  const hasRemaining = +amountRemaining > 0;
  
  return (
    <div className="group relative max-w-md mx-auto">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200/60 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        {/* Header with icon */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
            <FaReceipt className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <InvoiceNumber invoiceNumber={invoiceNumber} />
            <DocumentNumber documentNumber={documentNumber} />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

        {/* Status */}
        <div className="mb-4">
          <StatusOrder status={invoiceStatus} />
        </div>

        {/* Amount Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Total Amount */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/60">
            <TotalAmount invoiceTotalAmount={invoiceTotalAmount} currency={currency} />
          </div>

          {/* Paid Amount */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200/60">
            <div className="flex items-center gap-2">
              <FaDollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 uppercase tracking-wide">
                {t("paidAmount")}
              </span>
            </div>
            <span className="font-bold text-lg text-green-700">
              {Number(amountPaid).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              <span className="text-sm font-semibold">{currency}</span>
            </span>
          </div>
        </div>

        {/* Remaining Amount - Full Width */}
        {hasRemaining && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-red-50 to-orange-50/50 border-2 border-red-200/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaExclamationCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-700 uppercase tracking-wide">
                  {t("remainingAmount")}
                </span>
              </div>
              <span className="font-bold text-xl text-red-600">
                {Number(amountRemaining).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-base font-semibold">{currency}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}