"use client";

import React, { useState } from "react";
import { Table, Button, Modal, message, Popconfirm } from "antd";
import {
  useGetFromLocations,
  useDeleteLocation,
} from "@/entities/hooks/Locations/hooks";
import ChangeActive from "../atoms/changeActive";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdateLocationForm from "@/features/update-location";

export default function FromLocationTable() {
  const { data, isPending } = useGetFromLocations();
  const { mutate: deleteLocation, isPending: isDeleting } = useDeleteLocation();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const handleEdit = (record: any) => {
    setSelectedLocation(record);
    setEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteLocation(id, {
      onSuccess: () => {
        message.success("Joylashuv muvaffaqiyatli o‘chirildi");
      },
      onError: () => {
        message.error("O‘chirishda xatolik yuz berdi");
      },
    });
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedLocation(null);
  };

  const columns = [
    {
      title: "#",
      width: 60,
      align: "center" as const,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Nomi",
      dataIndex: "name",
    },
    {
      title: "Tavsif",
      dataIndex: "description",
      render: (text: string | null) => text || "—",
    },
    {
      title: "Faol",
      dataIndex: "active",
      width: 120,
      align: "center" as const,
      render: (active: boolean, record: any) => (
        <ChangeActive id={record.id} active={active} size="small" />
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      width: 140,
      align: "center" as const,
      render: (_: any, record: any) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            type="text"
            icon={<FaEdit size={16} />}
            onClick={() => handleEdit(record)}
            title="Tahrirlash"
            className="text-blue-600 hover:text-blue-800"
          />

          <Popconfirm
            title="Joylashuvni o‘chirish"
            description={
              <>
                <strong>{record.name}</strong> nomli joylashuv o‘chiriladi.
                <br />
                Ushbu amal qaytarib bo‘lmaydi.
              </>
            }
            onConfirm={() => handleDelete(record.id)}
            okText="Ha, o‘chirish"
            cancelText="Yo‘q"
            okButtonProps={{
              danger: true,
            }}
            cancelButtonProps={{
              disabled: isDeleting,
            }}
            placement="topRight"
          >
            <Button
              type="text"
              danger
              icon={<MdDelete size={16} />}
              title="O‘chirish"
              disabled={isDeleting}
              className="text-red-600 hover:text-red-800"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-auto">
        <Table
          loading={isPending}
          columns={columns}
          dataSource={
            data?.result?.map((item: any) => ({ ...item, key: item.id })) || []
          }
          pagination={false}
          rowKey="id"
          size="middle"
          locale={{ emptyText: "Hozircha joylashuvlar mavjud emas" }}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        title="Joylashuvni tahrirlash"
        open={editModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        destroyOnClose
      >
        {selectedLocation && (
          <UpdateLocationForm
            id={selectedLocation.id}
            initialValues={{
              name: selectedLocation.name,
              description: selectedLocation.description || "",
              type: selectedLocation.type,
            }}
            onSuccess={() => {
              message.success("Joylashuv muvaffaqiyatli yangilandi");
              handleModalClose();
            }}
            onCancel={handleModalClose}
          />
        )}
      </Modal>
    </>
  );
}
