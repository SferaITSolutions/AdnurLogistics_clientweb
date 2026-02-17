// components/atoms/StatusLabel.tsx

type Status = "PUBLIC" | "DRAFT";

interface StatusLabelProps {
  status: Status;
}

const StatusLabel = ({ status }: StatusLabelProps) => {
  if (status === "PUBLIC") {
    return (
      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
        E'lon qilingan
      </span>
    );
  }

  return (
    <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
      Qoralama
    </span>
  );
};

export default StatusLabel;