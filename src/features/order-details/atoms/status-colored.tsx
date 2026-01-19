"use client";

import { useTranslations } from "next-intl";
import { FaCheckCircle, FaClock, FaBoxOpen, FaFileInvoiceDollar, FaTruckLoading } from "react-icons/fa";

interface StatusBadgeProps {
    status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const t = useTranslations("yandexMap");

    const formatStatus = (raw: string): string => {
        const map: Record<string, string> = {
            "Sales Order : Pending Approval": t("pendingConfirmation"),
            "Sales Order : Pending Fulfillment": t("pendingFulfillment"),
            "Sales Order : Partially Fulfilled": t("partiallyFulfilled"),
            "Sales Order : Pending Billing / Partially Fulfilled": t("pendingBillingPartially"),
            "Sales Order : Pending Billing": t("pendingPayment"),
            "Sales Order : Billed": t("billed"),
            "Sales Order : Closed": t("closedDelivered"),
        };
        return map[raw] || raw;
    };

    // Statusga qarab gradient va belgi (icon) tanlash
    const getStatusStyle = (raw: string) => {
        if (raw.includes("Closed")) {
            return { 
                gradient: "from-green-500 to-emerald-600", 
                icon: <FaCheckCircle className="text-white text-lg" /> 
            };
        }
        if (raw.includes("Billed")) {
            return { 
                gradient: "from-blue-600 to-indigo-700", 
                icon: <FaFileInvoiceDollar className="text-white text-lg" /> 
            };
        }
        if (raw.includes("Partially")) {
            return { 
                gradient: "from-cyan-500 to-blue-500", 
                icon: <FaTruckLoading className="text-white text-lg" /> 
            };
        }
        if (raw.includes("Pending Billing")) {
            return { 
                gradient: "from-orange-500 to-orange-600", 
                icon: <FaClock className="text-white text-lg" /> 
            };
        }
        if (raw.includes("Fulfillment")) {
            return { 
                gradient: "from-amber-500 to-orange-500", 
                icon: <FaBoxOpen className="text-white text-lg" /> 
            };
        }
        if (raw.includes("Pending Approval")) {
            return { 
                gradient: "from-slate-500 to-slate-700", 
                icon: <FaClock className="text-white text-lg" /> 
            };
        }
        return { 
            gradient: "from-gray-500 to-gray-600", 
            icon: <FaCheckCircle className="text-white text-lg" /> 
        };
    };

    const formatted = formatStatus(status);
    const { gradient, icon } = getStatusStyle(status);

    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br shadow-lg ${gradient}`}
            >
                {icon}
            </div>

            <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium tracking-wider">
                    {t("status")}
                </span>
                <span className="text-sm font-bold text-gray-900 leading-tight">
                    {formatted}
                </span>
            </div>
        </div>
    );
};

export default StatusBadge;