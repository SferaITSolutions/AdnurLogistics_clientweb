// components/atoms/StatusBadge.tsx

type Status = "PUBLIC" | "DRAFT";

interface StatusBadgeProps {
    status: Status;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    if (status === "PUBLIC") {
        return (
            <span className="px-3 py-1 bg-green-500 !text-white text-xs font-semibold rounded-full shadow-lg">
                E'lon qilingan
            </span>
        );
    }

    return (
        <span className="px-3 py-1 bg-amber-500 !text-white text-xs font-semibold rounded-full shadow-lg">
            Qoralama
        </span>
    );
};

export default StatusBadge;