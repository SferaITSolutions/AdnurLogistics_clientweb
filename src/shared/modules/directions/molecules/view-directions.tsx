"use client";

import React, { useState, useRef, useEffect } from "react";
import { Modal, Table, Spin, Button, InputNumber, Switch, Space, Popconfirm, message, Divider, Card, Checkbox, Form } from "antd";
import { useDeliveryPricesPaginated, useUpdateDeliveryPrice, useDeleteDeliveryPrice, useCreateDeliveryPrice } from "@/entities/hooks/delivery-price/hooks";
import { FaEdit, FaPlus, FaWeight, FaCube } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface ViewDirectionPricesModalProps {
  open: boolean;
  onClose: () => void;
  directionId: string | null;
}

interface PriceItem {
  minWeight: number;
  maxWeight?: number;
  cub3: number;
  overPrice: boolean;
}

// Price Item Card Component - AddDeliveryPricesModal'dan olindi
const PriceItemCard: React.FC<{
  name: number;
  index: number;
  restField: any;
  fieldsLength: number;
  onRemove: () => void;
  onAdd: () => void;
  form: any;
  isLast: boolean;
}> = ({ name, index, restField, fieldsLength, onRemove, onAdd, form, isLast }) => {
  const isOverPrice = Form.useWatch(["priceList", name, "overPrice"], form);

  return (
    <Card
      className="relative !p-0 transition-all border-none! shadow-none duration-300 flex justify-between items-center"
      bodyStyle={{ padding: "10px", paddingBottom: "0px", marginBottom: "10px" }}
    >
      <div className="flex gap-4 !w-full md:flex-row flex-col">
        {/* Min Weight */}
        <Form.Item
          {...restField}
          name={[name, "minWeight"]}
          className="flex-1"
          label={index === 0 ? (
            <span className="flex items-center gap-2 font-medium">
              <FaWeight className="text-green-500" />
              Minimal og'irlik (kg)
            </span>
          )
            : <span className="opacity-0">Label</span>}
          rules={[
            { required: true, message: "Minimal og'irlikni kiriting" },
          ]}
        >
          <InputNumber
            step={0.1}
            className="!w-full"
            size="large"
            disabled={isOverPrice}
            placeholder="Masalan: 0.1"
          />
        </Form.Item>

        {/* Max Weight */}
        <Form.Item
          {...restField}
          className="flex-1"
          name={[name, "maxWeight"]}
          label={index === 0 ? (
            <span className="flex items-center gap-2 font-medium">
              <FaWeight className="text-red-500" />
              Maksimal og'irlik (kg)
            </span>
          ) : <span className="opacity-0">Label</span>
          }
          tooltip={index === 0 ? "Cheksiz bo'lsa bo'sh qoldiring" : undefined}
        >
          <InputNumber
            step={0.1}
            className="!w-full"
            size="large"
            disabled={isOverPrice}
            placeholder="Cheksiz bo'lsa bo'sh qoldiring"
          />
        </Form.Item>

        {/* Cub Price */}
        <Form.Item
          {...restField}
          name={[name, "cub3"]}
          className="flex-1"
          label={index === 0 ? (
            <span className="flex items-center gap-2 font-medium">
              <FaCube className="text-purple-500" />
              Kub narxi ($)
            </span>
          ) : <span className="opacity-0">Label</span>}
          rules={[{ required: true, message: "Kub narxini kiriting" }]}
        >
          <InputNumber
            min={0}
            step={1000}
            className="!w-full"
            size="large"
            placeholder="Masalan: 50000"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }
            parser={(value: any) => value!.replace(/\s?/g, "")}
          />
        </Form.Item>

        {/* Action Buttons */}
        <Form.Item
          label={<span className="opacity-0">Actions</span>}
          className="mb-0"
        >
          <div className="flex gap-2 items-center">
            {fieldsLength > 1 && (
              <Button
                danger
                type="text"
                icon={<MdDelete size={20} className="!mt-1" />}
                onClick={onRemove}
                className="hover:bg-red-50 h-full"
                size="large"
              />
            )}
            <Button
              type="dashed"
              icon={<FaPlus size={20} className="!mt-1" />}
              onClick={onAdd}
              className="hover:border-blue-500 hover:text-blue-500 h-full"
              size="large"
            />
          </div>
        </Form.Item>
      </div>

      {/* 1000 kg dan yuqori checkbox - faqat oxirgi element uchun */}
      {isLast && (
        <Form.Item
          {...restField}
          name={[name, "overPrice"]}
          valuePropName="checked"
          className="mb-4"
        >
          <Checkbox
            className="text-base font-medium"
            onChange={(e) => {
              if (e.target.checked) {
                form.setFieldValue(["priceList", name, "minWeight"], 1000);
                form.setFieldValue(["priceList", name, "maxWeight"], undefined);
              } else {
                form.setFieldValue(["priceList", name, "minWeight"], null);
              }
            }}
          >
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold">
              🚀 1000 kg dan yuqori
            </span>
          </Checkbox>
        </Form.Item>
      )}
    </Card>
  );
};

const ViewDirectionPricesModal: React.FC<ViewDirectionPricesModalProps> = ({
  open,
  onClose,
  directionId,
}) => {
  const [editingKey, setEditingKey] = useState<string>("");
  const [editForm, setEditForm] = useState<any>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [form] = Form.useForm();
  const [priceListLength, setPriceListLength] = useState(0);
  const priceListContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, refetch } = useDeliveryPricesPaginated({
    page: 0,
    size: 100,
    directionId: directionId || "",
  });

  const { mutate: updatePrice, isPending: isUpdating } = useUpdateDeliveryPrice();
  const { mutate: deletePrice, isPending: isDeleting } = useDeleteDeliveryPrice();
  const { mutate: createPrices, isPending: isCreating } = useCreateDeliveryPrice();

  const prices = data?.result?.content || [];

  // Modal ochilganda form'ni reset qilish
  useEffect(() => {
    if (open && showAddForm) {
      form.setFieldsValue({
        priceList: [
          {
            minWeight: null,
            maxWeight: undefined,
            cub3: null,
            overPrice: false,
          },
        ],
      });
    }
  }, [open, showAddForm, form]);

  // PriceList uzunligi o'zgarganda scroll pastga
  useEffect(() => {
    if (priceListLength > 0 && priceListContainerRef.current) {
      requestAnimationFrame(() => {
        if (priceListContainerRef.current) {
          priceListContainerRef.current.scrollTop = priceListContainerRef.current.scrollHeight;
        }
      });
    }
  }, [priceListLength]);

  const isEditing = (record: any) => record.id === editingKey;

  const handleEdit = (record: any) => {
    setEditingKey(record.id);
    setEditForm({
      minWeight: record.minWeight,
      maxWeight: record.maxWeight,
      cub3: record.cub3,
      overPrice: record.overPrice,
    });
  };

  const handleCancel = () => {
    setEditingKey("");
    setEditForm({});
  };

  const handleSave = (record: any) => {
    // Validatsiya
    if (!editForm.overPrice && editForm.maxWeight && editForm.minWeight >= editForm.maxWeight) {
      message.error("Min og'irlik Max og'irlikdan kichik bo'lishi kerak");
      return;
    }


    updatePrice(
      {
        id: record.id,
        directionId: directionId || "",
        ...editForm,
      },
      {
        onSuccess: () => {
          setEditingKey("");
          setEditForm({});
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deletePrice(id);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    form.resetFields();
  };

  const onFinish = (values: { priceList: PriceItem[] }) => {
    // Validatsiya
    const hasError = values.priceList.some((item, idx) => {
      if (
        !item.overPrice &&
        item.maxWeight !== undefined &&
        item.maxWeight != null &&
        item.minWeight >= item.maxWeight
      ) {
        message.error(
          `${idx + 1}-oralig'da Min og'irlik Maxdan katta yoki teng bo'lmasligi kerak`
        );
        return true;
      }
      return false;
    });

    if (hasError) return;

    const payload: any = {
      priceList: values.priceList.map((item) => ({
        ...item,
        directionId,
        maxWeight: item.overPrice ? null : item.maxWeight ?? null,
      })),
    };

    createPrices(payload, {
      onSuccess: (data: any) => {
        if (data && (typeof data === "object") && data.success === false) {
          const errMsg = data.message || "Server muvaffaqiyatsiz javob qaytardi";
          message.error(`Xatolik: ${errMsg}`);
          return;
        }
        message.success("Narxlar muvaffaqiyatli qo'shildi");
        form.resetFields();
        setShowAddForm(false);
        refetch();
      },
      onError: (err: any) => {
        message.error("Xatolik yuz berdi: " + err);
      },
    });
  };

  const columns = [
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
      render: (value: number, record: any) => {
        if (isEditing(record)) {
          return (
            <InputNumber
              min={0.1}
              step={0.1}
              value={editForm.minWeight}
              onChange={(val) => setEditForm({ ...editForm, minWeight: val })}
              disabled={editForm.overPrice}
              className="w-full"
            />
          );
        }
        return <span className="font-medium">{value} kg</span>;
      },
    },
    {
      title: "Max og'irlik (kg)",
      dataIndex: "maxWeight",
      key: "maxWeight",
      render: (value: number, record: any) => {
        if (isEditing(record)) {
          return (
            <InputNumber
              min={0.1}
              step={0.1}
              value={editForm.maxWeight}
              onChange={(val) => setEditForm({ ...editForm, maxWeight: val })}
              disabled={editForm.overPrice}
              placeholder="Cheksiz"
              className="w-full"
            />
          );
        }
        return <span className="font-medium">{value ? `${value} kg` : "Cheksiz"}</span>;
      },
    },
    {
      title: "Kub (m³) narxi",
      dataIndex: "cub3",
      key: "cub3",
      render: (value: number, record: any) => {
        if (isEditing(record)) {
          return (
            <InputNumber
              min={0}
              step={1000}
              value={editForm.cub3}
              onChange={(val) => setEditForm({ ...editForm, cub3: val })}
              formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              parser={(val) => val!.replace(/\s?/g, "")}
              className="w-full"
            />
          );
        }
        return (
          <span className="font-semibold text-green-600">
            {value.toLocaleString()} $
          </span>
        );
      },
    },
    {
      title: "1000+ kg",
      dataIndex: "overPrice",
      key: "overPrice",
      width: 120,
      render: (value: boolean, record: any) => {
        if (isEditing(record)) {
          return (
            <Switch
              checked={editForm.overPrice}
              onChange={(checked) => {
                setEditForm({
                  ...editForm,
                  overPrice: checked,
                  minWeight: checked ? 1000 : 0.1,
                  maxWeight: checked ? undefined : editForm.maxWeight,
                });
              }}
            />
          );
        }
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${value
                ? "bg-orange-100 text-orange-600"
                : "bg-gray-100 text-gray-600"
              }`}
          >
            {value ? "Ha" : "Yo'q"}
          </span>
        );
      },
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
                onClick={() => handleSave(record)}
                loading={isUpdating}
                size="small"
              >
                Saqlash
              </Button>
              <Button
                onClick={handleCancel}
                size="small"
              >
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
              onClick={() => handleEdit(record)}
              disabled={editingKey !== "" || showAddForm}
            >
              Tahrirlash
            </Button>
            <Popconfirm
              title="Narxni o'chirish"
              description="Ushbu narxni o'chirishga ishonchingiz komilmi?"
              onConfirm={() => handleDelete(record.id)}
              okText="Ha"
              cancelText="Yo'q"
              okButtonProps={{
                danger: true,
                loading: isDeleting
              }}
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

  return (
    <Modal
      title={
        <div className="flex items-end justify-between !mr-6">
          <span className="text-lg font-semibold">Yetkazib berish narxlari</span>
          {!showAddForm && prices.length > 0 && (
            <Button
              type="primary"
              icon={<FaPlus />}
              onClick={() => setShowAddForm(true)}
              disabled={editingKey !== ""}
            >
              Narx qo'shish
            </Button>
          )}
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      destroyOnClose
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="Narxlar yuklanmoqda..." />
        </div>
      ) : isError ? (
        <div className="text-red-600 text-center p-8">
          Narxlarni yuklashda xato yuz berdi
        </div>
      ) : (
        <>
          {prices.length === 0 && !showAddForm ? (
            <div className="text-center p-8">
              <p className="text-gray-500 mb-4">Bu yo'nalish uchun narxlar hali kiritilmagan</p>
              <Button
                type="primary"
                icon={<FaPlus />}
                onClick={() => setShowAddForm(true)}
                size="large"
              >
                Birinchi narxni qo'shish
              </Button>
            </div>
          ) : (
            <>
              {(
                <Table
                  columns={columns}
                  dataSource={prices.map((p: any, idx: number) => ({ ...p, key: p.id || idx }))}
                  rowKey={(record) => record.id}
                  pagination={false}
                  size="middle"
                  className="mt-4"
                  rowClassName={(record) =>
                    isEditing(record) ? "bg-blue-50" : "hover:bg-gray-50"
                  }
                />
              )}

              {/* Yangi narxlar qo'shish formi */}
              {showAddForm && (
                <>
                  <Divider orientation="left" className="!mt-6 !mb-4">
                    <span className="flex items-center gap-2 text-lg font-semibold">
                      <FaWeight className="text-blue-500" />
                      Yetkazib berish narxlarini qo'shish
                    </span>
                  </Divider>

                  <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                  >
                    <Form.List name="priceList">
                      {(fields, { add, remove }) => {
                        // PriceList uzunligini update qilish
                        if (fields.length !== priceListLength) {
                          setPriceListLength(fields.length);
                        }

                        return (
                          <div
                            ref={priceListContainerRef}
                            className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 mb-4"
                            style={{ scrollBehavior: 'smooth' }}
                          >
                            {fields.map((field, index) => (
                              <PriceItemCard
                                key={field.key}
                                name={field.name}
                                index={index}
                                restField={field}
                                fieldsLength={fields.length}
                                onRemove={() => remove(field.name)}
                                onAdd={() =>
                                  add({
                                    minWeight: null,
                                    maxWeight: undefined,
                                    cub3: null,
                                    overPrice: false,
                                  })
                                }
                                form={form}
                                isLast={index === fields.length - 1}
                              />
                            ))}
                          </div>
                        );
                      }}
                    </Form.List>

                    {/* Submit Buttons */}
                    <Divider />
                    <div className="flex justify-end gap-3">
                      <Button onClick={handleCancelAdd} size="large" className="min-w-[120px]">
                        Bekor qilish
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isCreating}
                        size="large"
                        className="min-w-[120px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      >
                        {isCreating ? "Saqlanmoqda..." : "Narxlarni saqlash"}
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default ViewDirectionPricesModal;