import { useTranslations } from "next-intl";
import { FaCheckCircle } from "react-icons/fa";

interface StatusBadgeProps {
    status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const t = useTranslations("yandexMap");
    
    const formatStatus = (raw: string): string => {
        const map: Record<string, string> = {
            "Sales Order : Pending Approval": t("pendingConfirmation"),
            "Sales Order : Closed": t("closedDelivered"),
            "Sales Order : Pending Billing": t("pendingPayment"),
        };
        return map[raw] || raw;
    };

    // Gradient ranglarni statusga qarab tanlash
    const getGradient = (raw: string): string => {
        if (raw.includes("Closed")) return "from-green-500 to-emerald-600";
        if (raw.includes("Pending Billing")) return "from-orange-500 to-orange-600";
        if (raw.includes("Pending Approval")) return "from-slate-500 to-slate-700";
        return "from-gray-500 to-gray-600"; // default
    };

    const formatted = formatStatus(status);
    const gradient = getGradient(status);

    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${gradient}`}
            >
                <FaCheckCircle className="text-white text-lg" />
            </div>

            <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">
                    {t("status")}
                </span>
                <span className="text-sm font-bold text-gray-900">{formatted}</span>
            </div>
        </div>
    );
};

export default StatusBadge;