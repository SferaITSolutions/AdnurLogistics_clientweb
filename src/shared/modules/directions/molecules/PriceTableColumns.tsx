import { Button, Space, Popconfirm } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  renderMinWeight,
  renderMaxWeight,
  renderCub3,
  renderOverPrice,
} from "./PriceTableRow";

interface EditForm {
  minWeight: number;
  maxWeight?: number;
  cub3: number;
  overPrice: boolean;
}

interface PriceTableColumnsParams {
  editingKey: string;
  editForm: EditForm;
  setEditForm: (form: EditForm) => void;
  isUpdating: boolean;
  isDeleting: boolean;
  showAddForm: boolean;
  onEdit: (record: any) => void;
  onSave: (record: any) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

/**
 * ViewDirectionPricesModal Table uchun ustunlar konfiguratsiyasi.
 */
export const getPriceTableColumns = ({
  editingKey,
  editForm,
  setEditForm,
  isUpdating,
  isDeleting,
  showAddForm,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: PriceTableColumnsParams) => {
  const isEditing = (record: any) => record.id === editingKey;

  return [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Min og'irlik (kg)",
      dataIndex: "minWeight",
      key: "minWeight",
      render: (value: number, record: any) =>
        renderMinWeight(value, isEditing(record), editForm, setEditForm),
    },
    {
      title: "Max og'irlik (kg)",
      dataIndex: "maxWeight",
      key: "maxWeight",
      render: (value: number, record: any) =>
        renderMaxWeight(value, isEditing(record), editForm, setEditForm),
    },
    {
      title: "Kub (m³) narxi",
      dataIndex: "cub3",
      key: "cub3",
      render: (value: number, record: any) =>
        renderCub3(value, isEditing(record), editForm, setEditForm),
    },
    {
      title: "1000+ kg",
      dataIndex: "overPrice",
      key: "overPrice",
      width: 120,
      render: (value: boolean, record: any) =>
        renderOverPrice(value, isEditing(record), editForm, setEditForm),
    },
    {
      title: "Amallar",
      key: "actions",
      width: 200,
      render: (_: any, record: any) => {
        if (isEditing(record)) {
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => onSave(record)}
                loading={isUpdating}
                size="small"
              >
                Saqlash
              </Button>
              <Button onClick={onCancel} size="small">
                Bekor
              </Button>
            </Space>
          );
        }
        return (
          <Space>
            <Button
              type="link"
              icon={<FaEdit />}
              onClick={() => onEdit(record)}
              disabled={editingKey !== "" || showAddForm}
            >
              Tahrirlash
            </Button>
            <Popconfirm
              title="Narxni o'chirish"
              description="Ushbu narxni o'chirishga ishonchingiz komilmi?"
              onConfirm={() => onDelete(record.id)}
              okText="Ha"
              cancelText="Yo'q"
              okButtonProps={{ danger: true, loading: isDeleting }}
              disabled={editingKey !== "" || showAddForm}
            >
              <Button
                type="link"
                danger
                icon={<MdDelete />}
                disabled={editingKey !== "" || showAddForm}
              >
                O'chirish
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
};