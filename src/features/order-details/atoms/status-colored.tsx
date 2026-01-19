const StatusBadge = ({ status }: { status: string }) => {
    console.log(status,"stas");
    
    const formatStatus = (rawStatus: string): string => {
        const statusMap: Record<string, string> = {
            "Sales Order : Pending Approval": "Kutilmoqda (Tasdiqlash)",
            "Sales Order : Closed": "Yopilgan / Yetkazib berilgan",
            "Sales Order : Pending Billing": "To‘lov kutilmoqda",
        };

        return statusMap[rawStatus] || rawStatus;
    };
    const getStatusColor = (rawStatus: string): string => {
        const colorMap: Record<string, string> = {
            "Sales Order : Pending Approval": "bg-slate-400 text-white",
            "Sales Order : Closed": "bg-green-500 text-white",
            "Sales Order : Pending Billing": "bg-orange-500 text-white",
        };

        return colorMap[rawStatus] || "bg-gray-500 text-white";
    };
    const formatted = formatStatus(status);
    const colorClass = getStatusColor(status);

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border shadow-sm">
            <div className={`w-3 h-3 rounded-full ${colorClass.replace("text-white", "")}`} />
            <span className="font-medium text-gray-800">{formatted}</span>
        </div>
    );
};
export default StatusBadge