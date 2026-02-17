"use client";

import { Table, message } from "antd";
import { useState } from "react";
import { useDeleteDirection } from "@/entities/hooks/directions/hooks";
import { getDirectionsColumns, Direction } from "../molecules/DirectionsTableColumns";
import EditDirectionModal from "./EditDirectionModal";
import ViewDirectionPricesModal from "./ViewDirectionPricesModal";

interface DirectionsTableProps {
  data: Direction[];
  isLoading: boolean;
  productId: string;
}

/**
 * Yo'nalishlar jadvali + Edit va View modal holatlari.
 * DeleteDirection ham shu yerda boshqariladi.
 */
const DirectionsTable = ({ data, isLoading, productId }: DirectionsTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingDirection, setEditingDirection] = useState<Direction | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingDirectionId, setViewingDirectionId] = useState<string | null>(null);

  const { mutate: deleteDirection, isPending: isDeleting } = useDeleteDirection();

  const tableData = data.map((item, index) => ({ ...item, index: index + 1 }));

  const handleDelete = (id: string) => {
    deleteDirection(
      { id, productId },
      {
        onSuccess: () => message.success("Yo'nalish muvaffaqiyatli o'chirildi"),
        onError: (err: any) =>
          message.error("O'chirishda xato: " + (err.message || "Noma'lum xato")),
      }
    );
  };

  const columns = getDirectionsColumns({
    onView: (record) => {
      setViewingDirectionId(record.id);
      setViewModalOpen(true);
    },
    onEdit: (record) => {
      setEditingDirection(record);
      setEditModalOpen(true);
    },
    onDelete: handleDelete,
    isDeleting,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: "Bu mahsulot uchun yo'nalishlar mavjud emas" }}
      />

      <ViewDirectionPricesModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewingDirectionId(null);
        }}
        directionId={viewingDirectionId}
      />

      <EditDirectionModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingDirection(null);
        }}
        direction={editingDirection}
      />
    </>
  );
};

export default DirectionsTable;