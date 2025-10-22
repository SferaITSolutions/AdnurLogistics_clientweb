export default function InfoRow({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex md:flex-row gap-2 flex-col items-baseline justify-between bg-blue-50 rounded-lg px-4 py-2.5">
      <span className="text-gray-500 font-semibold text-[15px]">{label}</span>
      <span className={valueClass ? valueClass : "text-gray-900 font-medium"}>
        {value}
      </span>
    </div>
  );
}