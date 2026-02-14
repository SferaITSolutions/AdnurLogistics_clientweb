'use client'

import React, { useState } from 'react'
import { Button, Card, Col, Form, Image, Input, Row, Select, Space, Table, Pagination } from 'antd'
import { useEntityIds, useExcel, useUpdateUserEntity, useUsers } from '@/services/users/hook'
import UpdateEntities from '@/features/update-entities-of-users'
import { FaDownload, FaEdit, FaEraser, FaEye, FaPlus, FaSearch, FaUser } from 'react-icons/fa'
import { toast } from 'sonner'
import { IoReload } from "react-icons/io5";


export default function UsersUi() {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState()

  // Filtr holatini saqlash
  const [filterParams, setFilterParams] = useState({
    page: 0,
    size: 10,
    phone: null,
    client: null,
    entityId: null,
  });

  const { mutate: updateEntity, isPending } = useUpdateUserEntity(userId);
  const { data, isLoading, refetch } = useUsers(filterParams);
  const { refetch: downloadExcel, isLoading: isExcelLoading } = useExcel();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Excel yuklab olish
  const handleDownloadExcel = async () => {
    try {
      const response = await downloadExcel();

      if (!response?.data) {
        toast.error("Excel faylni yuklab olishda xatolik yuz berdi");
        return;
      }

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Foydalanuvchilar_Royxati.xlsx`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Excel fayl muvaffaqiyatli yuklab olindi!");
    } catch (error) {
      console.error('Excel yuklab olishda xatolik:', error);
      toast.error("Excel faylni yuklab olishda xatolik yuz berdi");
    }
  };

  // Filtrni qo'llash
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    setFilterParams({
      page: 0, // Yangi qidiruv bo'lganda birinchi sahifaga qaytish
      size: filterParams.size,
      phone: values.phone || null,
      client: values.client ?? null,
      entityId: values.entityId || null,
    });
  };

  // Filtrni tozalash
  const onReset = () => {
    form.resetFields();
    setFilterParams({
      page: 0,
      size: 10,
      phone: null,
      client: null,
      entityId: null,
    });
  };

  const openEditModal = (record: any) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  // Pagination o'zgarganda
  const handlePageChange = (page: number, pageSize: number) => {
    setFilterParams(prev => ({
      ...prev,
      page: page - 1, // Ant Design 1 dan boshlanadi, API 0 dan
      size: pageSize
    }));
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      align: "center" as const,
      render: (_: any, __: any, index: number) => {
        // To'g'ri index hisoblash (pagination hisobga olinadi)
        return filterParams.page * filterParams.size + index + 1;
      },
    },
    {
      title: 'Rasm',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 80,
      align: "center" as const,
      render: (imageUrl: string) => {
        if (!imageUrl) {
          return (
            <span className="text-gray-400 flex justify-center items-center object-cover">
              <FaUser size={20} />
            </span>
          );
        }

        return (
          <Image
            src={imageUrl}
            alt="User image"
            width={50}
            height={50}
            className="rounded object-cover"
            preview={{
              mask: <div><FaEye/></div>,
            }}
          />
        );
      },
    },
    {
      title: 'Ism',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Telefon raqam',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string | null) => {
        if (!text) return '-';
        const digits = text.replace(/[^\d]/g, '');
        let formatted = digits;

        if (digits.length === 12 && digits.startsWith('998')) {
          formatted = `+998 (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
        } else if (digits.length === 9) {
          formatted = `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7, 9)}`;
        } else if (digits.length === 13 && digits.startsWith('998')) {
          formatted = `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
        }

        return formatted;
      },
    },
    {
      title: 'Faoliyat turi',
      dataIndex: 'companyName',
      render: (text: string | null) => text || '-',
      key: 'companyName',
    },
    {
      title: 'Yuk tashish manzillari',
      dataIndex: 'entityIds',
      key: 'entityIds',
      render: (text: string[]) => text?.join(', ') || '-',
    },
    {
      title: 'Oracle ID',
      dataIndex: 'userType',
      width: 140,
      key: 'userType',
      render: (text: string | null) => text || '-',
    },
    {
      title: 'Amallar',
      key: 'action',
      width: 100,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Button
          type="primary"
          // loading={isPending && userId === record.userId}
          onClick={() => {
            setUserId(record.userId);
            updateEntity();
          }}
        >
          <IoReload className={`${Boolean(isPending && userId === record.userId) && 'animate-spin translate-0.5'}`} /> Bog'lanish
        </Button>
      ),
    },
  ];

  return (
    <div className='container !mb-10'>
      <h1 className='text-2xl !font-bold'>Users</h1>
      <Card className="mb-6 !border-b-0 !rounded-b-none">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item
                name="phone"
                label="Telefon raqam"
                rules={[
                  { pattern: /^\d+$/, message: "Faqat raqam kiriting!" },
                  { min: 9, message: "Kamida 9 ta raqam!" }
                ]}
              >
                <Input placeholder="998901234567" allowClear />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item name="client" label="Foydalanuvchi turi">
                <Select placeholder="Turini tanlang" allowClear>
                  <Select.Option value={1}>CLIENT</Select.Option>
                  <Select.Option value={0}>USER</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item name="entityId" label="Manzil (Entity)">
                <Input
                  placeholder="Manzilni kiriting"
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Col xs={24} sm={12} md={6} className="flex">
            <Form.Item className="w-full mb-0">
              <Space>
                <Button icon={<FaEraser />} onClick={onReset}>
                  Tozalash
                </Button>
                <Button type="primary" htmlType="submit" icon={<FaSearch />}>
                  Qidirish
                </Button>
                <Button
                  style={{ backgroundColor: '#722ed1', color: 'white' }}
                  icon={<FaDownload />}
                  onClick={handleDownloadExcel}
                  loading={isExcelLoading}
                  disabled={isExcelLoading}
                >
                  Excel
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Form>
      </Card>

      <div className="overflow-x-auto w-full">
        <Table
          size="middle"
          dataSource={data?.result?.content || []}
          columns={columns}
          loading={isLoading}
          scroll={{ x: "max-content" }}
          rowKey="userId"
          pagination={false}
        />

        {/* Alohida Pagination */}

      </div>
      <div className="flex justify-end mt-4">
        <Pagination
          current={filterParams.page + 1}
          pageSize={filterParams.size}
          total={data?.result?.totalElements || 0}
          showSizeChanger
          showTotal={(total, range) => `${range[0]}-${range[1]} / ${total} ta`}
          pageSizeOptions={['10', '20', '50', '100']}
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
          showQuickJumper
          locale={{
            items_per_page: '/ sahifa',
            jump_to: 'O\'tish',
            page: 'Sahifa',
          }}
        />
      </div>
      {selectedUser && (
        <UpdateEntities
          user={selectedUser}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  )
}