'use client';

export default function StatusProductTitle({ title }: { title: string }) {
  return (
    <div
      key={title}
      className="text-gray-800 mb-2 text-lg !font-bold border-t border-gray-100 pt-4"
    >
      {title}
    </div>
  );
}
