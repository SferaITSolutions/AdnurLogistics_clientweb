
import { Button, Popconfirm, Tooltip } from "antd";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

interface Direction {
  id: string;
  productId: string;
  fromLocationId: string;
  toLocationId: string;
  fromLocationName?: string;
  toLocationName?: string;
}

interface ColumnHandlers {
  onView: (record: Direction) => void;
  onEdit: (record: Direction) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

/**
 * DirectionsPage Table uchun ustunlar konfiguratsiyasi.
 * Organism ichida ishlatiladi.
 */
export const getDirectionsColumns = ({
  onView,
  onEdit,
  onDelete,
  isDeleting,
}: ColumnHandlers) => [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    width: 60,
    align: "center" as const,
  },
  {
    title: "Qayerdan (From)",
    dataIndex: "fromLocationName",
    key: "fromLocationId",
    render: (_: string, record: Direction) =>
      record.fromLocationName || record.fromLocationId || "-",
  },
  {
    title: "Qayerga (To)",
    dataIndex: "toLocationName",
    key: "toLocationId",
    render: (_: string, record: Direction) =>
      record.toLocationName || record.toLocationId || "-",
  },
  {
    title: "Yetkazish narxlari",
    key: "prices-actions",
    width: 220,
    align: "center" as const,
    render: (_: any, record: Direction) => (
      <div className="flex items-center justify-center gap-3">
        <Button
          type="text"
          icon={<FaEye className="text-blue-600" size={20} />}
          onClick={() => onView(record)}
          title="Narxlarni ko'rish"
        />
      </div>
    ),
  },
  {
    title: "Amallar",
    key: "actions",
    width: 140,
    align: "center" as const,
    render: (_: any, record: Direction) => (
      <div className="flex items-center justify-center gap-3">
        <Button
          type="text"
          shape="circle"
          icon={<FaEdit color="orange" size={20} />}
          onClick={() => onEdit(record)}
        />
        <Popconfirm
          title="Yo'nalishni o'chirish"
          description="Bu yo'nalishni haqiqatan ham o'chirmoqchimisiz?"
          onConfirm={() => onDelete(record.id)}
          okText="Ha, o'chirish"
          cancelText="Yo'q"
          okButtonProps={{ danger: true, loading: isDeleting }}
        >
          <Tooltip title="O'chirish">
            <Button
              danger
              type="text"
              icon={<FaTrash />}
              onClick={(e) => e.stopPropagation()}
            />
          </Tooltip>
        </Popconfirm>
      </div>
    ),
  },
];

export type { Direction };