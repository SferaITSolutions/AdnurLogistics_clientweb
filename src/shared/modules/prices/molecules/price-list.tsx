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
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeliveryPriceUpdateForm from "@/features/prices/prices-update";
import { useTranslations } from "next-intl"; // Tarjima uchun hook

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
  fromLocationName?: string;
  toLocationName?: string;
}

export default function DeliveryPricesPage() {
  const t = useTranslations("deliveryPrices"); // JSON dagi 'deliveryPrices' bo'limini ishlatamiz
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isFetching } = useGetDeliveryPrices(
    currentPage - 1,
    pageSize
  );
  
  const { mutate: deletePrice, isPending: isDeleting } = useDeleteDeliveryPrice();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<DeliveryPrice | null>(null);

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
      title: t("columns.number"),
      width: 60,
      render: (_, __, index) => index + 1 + (currentPage - 1) * pageSize,
      align: "center",
    },
    {
      title: t("columns.route"),
      key: "locations",
      render: (_, record) => (
        <Space>
          <Tag color="blue">{record.fromLocationName}</Tag>→
          <Tag color="green">{record.toLocationName}</Tag>
        </Space>
      ),
    },
    {
      title: t("columns.weight"),
      key: "weight",
      align: "center",
      render: (_, record) => (
        <span>
          {record.minWeight} – {record.maxWeight}
        </span>
      ),
    },
    {
      title: t("columns.volume"),
      dataIndex: "cub3",
      align: "center",
      render: (value) => value.toFixed(2),
    },
    {
      title: t("columns.price"),
      dataIndex: "price",
      align: "right",
      render: (value) => value.toLocaleString(),
    },
    {
      title: t("columns.actions"),
      key: "actions",
      width: 140,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<FaEdit />}
            onClick={() => handleEdit(record)}
            title={t("actions.edit")}
          />
          <Popconfirm
            title={t("deleteConfirm.title")}
            description={
              <span>
                <strong>{record.fromLocationName} → {record.toLocationName}</strong> {t("deleteConfirm.description").replace("{route}", "")}
                <br />
                {/* Agar descriptionda 'ortga qaytarib bo'lmaydi' qismi alohida bo'lsa JSON dan kelaveradi */}
              </span>
            }
            onConfirm={() => deletePrice(record.id)}
            okText={t("deleteConfirm.okText")}
            cancelText={t("deleteConfirm.cancelText")}
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
              title={t("actions.delete")}
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
        title={t("editModal.title")}
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
              message.success(t("editModal.successMessage"));
              handleModalClose();
            }}
            onCancel={handleModalClose}
          />
        )}
      </Modal>
    </div>
  );
}