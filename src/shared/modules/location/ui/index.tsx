"use client";

import React, { useState } from 'react';
import { Tabs, Button, Modal, Breadcrumb } from 'antd';
import FromLocationTable from '../molecules/fromLocationTable';
import ToLocationTable from '../molecules/toLocationTable';
import { FaPlus } from 'react-icons/fa';
import CreateLocations from '@/features/create-locations';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const { TabPane } = Tabs;

export default function LocationsUi() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'from' | 'to'>('from');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  // Modal yopilganda yoki muvaffaqiyatli saqlanganda chaqiriladi
  const afterLocationCreated = () => {
    setIsModalOpen(false);
    toast.success("yangi manzil yaratildi!")
  };

  return (
    <div className="">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !items-center gap-4 mb-3">
        <h1 className="text-2xl !font-bold text-gray-800 !mb-0 ">Joylashuvlar</h1>

        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={handleAddNew}
          size="large"
        >
          Yangi joylashuv qo'shish
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as 'from' | 'to')}
          size="large"
          tabBarStyle={{
            margin: 0,
            padding: '0 24px',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <TabPane tab="Junash joylari" key="from">
            <div className="py-6 px-2">
              <FromLocationTable />
            </div>
          </TabPane>

          <TabPane tab="Kelish joylari" key="to">
            <div className="py-6 px-2">
              <ToLocationTable />
            </div>
          </TabPane>
        </Tabs>
      </div>

      <Modal
        title="Yangi joylashuv qo'shish"
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <CreateLocations
          onSuccess={afterLocationCreated}
          onCancel={handleModalCancel}
        />
      </Modal>
    </div>
  );
}