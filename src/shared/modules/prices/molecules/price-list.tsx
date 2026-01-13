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
import { useTranslations } from "next-intl";

interface DeliveryPrice {
  id: string;
  minWeight: number;
  maxWeight: number | null;
  cub3: number;
  price: number;
  cubMultiplier: number | null;
  priceMultiplier: number | null;
  fromLocation: string;
  toLocation: string;
  fromLocationName?: string;
  toLocationName?: string;
}

export default function DeliveryPricesPage() {
  const t = useTranslations("deliveryPrices");
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
      title: "#",
      width: 60,
      align: "center" as const,
      render: (_, __, index) => index + 1 + (currentPage - 1) * pageSize,
    },
    {
      title: t("columns.route"),
      key: "locations",
      render: (_, record) => (
        <Space>
          <Tag color="blue">{record.fromLocationName || record.fromLocation}</Tag>
          →
          <Tag color="green">{record.toLocationName || record.toLocation}</Tag>
        </Space>
      ),
    },
    {
      title: t("columns.weight"),
      key: "weight",
      align: "center" as const,
      render: (_, record) => (
        <span>
          {record.minWeight} {record.maxWeight !== null ? `– ${record.maxWeight}` : "+"}
        </span>
      ),
    },
    {
      title: t("columns.volume"),
      dataIndex: "cub3",
      align: "center" as const,
      render: (value) => value.toFixed(2),
    },
    {
      title: t("columns.price"),
      dataIndex: "price",
      align: "right" as const,
      render: (value) => value?.toLocaleString("uz-UZ"),
    },
    {
      title: t("columns.actions"),
      key: "actions",
      width: 140,
      align: "center" as const,
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          {/* Edit Button */}
          <Button
            type="text"
            icon={<FaEdit size={16} />}
            onClick={() => handleEdit(record)}
            title={t("actions.edit")}
            className="text-blue-600 hover:text-blue-800"
          />

          {/* Delete Button with Popconfirm */}
          <Popconfirm
            title={t("deleteConfirm.title")}
            description={
              <>
                <strong>
                  {record.fromLocationName || record.fromLocation} →{" "}
                  {record.toLocationName || record.toLocation}
                </strong>{" "}
                {t("deleteConfirm.description")}
                <br />
                {t("deleteConfirm.warning")}
              </>
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
              icon={<MdDelete size={16} />}
              title={t("actions.delete")}
              loading={isDeleting}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-800"
            />
          </Popconfirm>
        </div>
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
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={data?.result?.content || []}
          rowKey="id"
          pagination={false}
          size="middle"
          locale={{ emptyText: "Hozircha narxlar mavjud emas" }}
          rowClassName={() => "hover:bg-gray-50 transition-colors"}
        />
      </div>

      {data && data.result?.totalElements > 0 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.result?.totalElements}
            showSizeChanger
            showQuickJumper
            // showTotal={(total) => total}
            onChange={handleTableChange}
          />
        </div>
      )}  

      {/* Edit Modal */}
      <Modal
        title={t("editModal.title")}
        open={editModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        destroyOnClose
        centered
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
    </>
  );
}