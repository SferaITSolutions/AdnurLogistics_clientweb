"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Pagination,
  Spin,
  message,
  Modal,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDeleteDeliveryPrice, useGetDeliveryPrices } from "@/entities/hooks/Prices/hooks";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeliveryPriceUpdateForm from "@/features/prices/prices-update";

interface DeliveryPrice {
  id: string;
  minWeight: number;
  maxWeight: number;
  cub3: number;
  price: number;
  cubMultiplier: number;
  priceMultiplier: number;
  fromLocation: string;
  toLocation: string;
}

export default function DeliveryPricesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isFetching } = useGetDeliveryPrices(
    currentPage - 1,
    pageSize
  );
  const { mutate: deletePrice, isPending: isDeleting } = useDeleteDeliveryPrice();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<DeliveryPrice | null>(
    null
  );

  // Edit handler
  const handleEdit = (record: DeliveryPrice) => {
    setSelectedPrice(record);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedPrice(null);
  };
  const columns: ColumnsType<DeliveryPrice> = [
    {
      title: "#",
      width: 60,
      render: (_, __, index) => index + 1 + (currentPage - 1) * pageSize,
      align: "center",
    },
    {
      title: "From → To",
      key: "locations",
      render: (_, record) => (
        <Space>
          <Tag color="blue">{record.fromLocationName}</Tag>→
          <Tag color="green">{record.toLocationName}</Tag>
        </Space>
      ),
    },
    {
      title: "Og'irlik (kg)",
      key: "weight",
      align: "center",
      render: (_, record) => (
        <span>
          {record.minWeight} – {record.maxWeight}
        </span>
      ),
    },
    {
      title: "Kub (m³)",
      dataIndex: "cub3",
      align: "center",
      render: (value) => value.toFixed(2),
    },
    {
      title: "Narx (so'm)",
      dataIndex: "price",
      align: "right",
      render: (value) => value.toLocaleString("uz-UZ"),
    },
    // {
    //   title: "Amallar",
    //   key: "actions",
    //   width: 120,
    //   align: "center",
    //   render: (_, record) => (
    //     <Space>
    //       <Button
    //         type="text"
    //         icon={<FaEdit />}
    //         onClick={() => message.info(`Edit: ${record.id}`)}
    //       />
    //       <Button
    //         type="text"
    //         danger
    //         icon={<MdDelete />}
    //         onClick={() => message.info(`Delete: ${record.id}`)}
    //       />
    //     </Space>
    //   ),
    // },
    {
      title: "Amallar",
      key: "actions",
      width: 140,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<FaEdit />}
            onClick={() => handleEdit(record)}
            title="Tahrirlash"
          />
          {/* <Button
            type="text"
            danger
            icon={<MdDelete />}
            onClick={() => message.info(`Delete: ${record.id}`)}
            title="O'chirish"
          /> */}
          <Popconfirm
            title="Narxni o‘chirish"
            description={
              <span>
                <strong>{record.fromLocation} → {record.toLocation}</strong> narxi o‘chiriladi. <br />
                Bu amalni ortga qaytarib bo‘lmaydi.
              </span>
            }
            onConfirm={() => deletePrice(record.id)}
            okText="Ha, o‘chirish"
            cancelText="Yo‘q"
            okButtonProps={{
              danger: true,
              loading: isDeleting,
            }}
            cancelButtonProps={{
              disabled: isDeleting,
            }}
            placement="topRight"
          >
            <Button
              type="text"
              danger
              icon={<MdDelete />}
              loading={isDeleting}
              disabled={isDeleting}
              title="O‘chirish"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <Table
        columns={columns}
        dataSource={data?.result?.content || []}
        rowKey="id"
        loading={isFetching}
        pagination={false}
        size="middle"
        bordered
      />

      {data && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data?.result?.totalElements}
            showSizeChanger
            onChange={handleTableChange}
          />
        </div>
      )}
      <Modal
        title="Narxni tahrirlash"
        open={editModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        destroyOnClose
      >
        {selectedPrice && (
          <DeliveryPriceUpdateForm
            initialValues={selectedPrice}
            onSuccess={() => {
              message.success("Yangilandi!");
              handleModalClose();
            }}
            onCancel={handleModalClose}
          />
        )}
      </Modal>
    </div>
  );
}
