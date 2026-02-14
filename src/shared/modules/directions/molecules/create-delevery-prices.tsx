"use client";
import React, { useEffect } from "react";
import {
  Modal,
  Form,
  InputNumber,
  Checkbox,
  Button,
  message,
  Space,
  Divider,
  Card,
} from "antd";
import { useCreateDeliveryPrice } from "@/entities/hooks/delivery-price/hooks";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaWeight, FaCube } from "react-icons/fa";

interface PriceItem {
  minWeight: number;
  maxWeight?: number;
  cub3: number;
  overPrice: boolean;
}

interface AddDeliveryPricesModalProps {
  open: boolean;
  onClose: () => void;
  directionId: string;
  onSuccess?: () => void;
}

// Alohida komponent yaratish
const PriceItemCard: React.FC<{
  name: number;
  index: number;
  restField: any;
  fieldsLength: number;
  onRemove: () => void;
  form: any;
}> = ({ name, index, restField, fieldsLength, onRemove, form }) => {
  const isOverPrice = Form.useWatch(["priceList", name, "overPrice"], form);

  return (
    <Card
      className="relative border-2 !mt-4 border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
      bodyStyle={{ padding: "20px" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {index + 1}
          </div>
          <span className="text-base font-semibold text-gray-700">
            Og'irlik oralig'i
          </span>
        </div>
        {fieldsLength > 1 && (
          <Button
            danger
            type="text"
            icon={<MdDelete size={18} />}
            onClick={onRemove}
            className="hover:bg-red-50"
          >
            O'chirish
          </Button>
        )}
      </div>

      <Divider className="my-3" />

      {/* OverPrice Checkbox */}
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
              form.setFieldValue(["priceList", name, "minWeight"], 0.1);
            }
          }}
        >
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold">
            🚀 1000 kg dan yuqori
          </span>
        </Checkbox>
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Min Weight */}
        <Form.Item
          {...restField}
          name={[name, "minWeight"]}
          label={
            <span className="flex items-center gap-2 font-medium">
              <FaWeight className="text-green-500" />
              Minimal og'irlik (kg)
            </span>
          }
          rules={[
            { required: true, message: "Minimal og'irlikni kiriting" },
          ]}
        >
          <InputNumber
            min={0.1}
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
          name={[name, "maxWeight"]}
          label={
            <span className="flex items-center gap-2 font-medium">
              <FaWeight className="text-red-500" />
              Maksimal og'irlik (kg)
            </span>
          }
          tooltip="Cheksiz bo'lsa bo'sh qoldiring"
        >
          <InputNumber
            min={0.1}
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
          label={
            <span className="flex items-center gap-2 font-medium">
              <FaCube className="text-purple-500" />
              Kub narxi ($)
            </span>
          }
          rules={[{ required: true, message: "Kub narxini kiriting" }]}
          className="md:col-span-2"
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
      </div>
    </Card>
  );
};

const AddDeliveryPricesModal: React.FC<AddDeliveryPricesModalProps> = ({
  open,
  onClose,
  directionId,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { mutate: createPrices, isPending } = useCreateDeliveryPrice();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        priceList: [
          {
            minWeight: 0.1,
            maxWeight: undefined,
            cub3: 0,
            overPrice: false,
          },
        ],
      });
    }
  }, [open, form]);

  const onFinish = (values: { priceList: PriceItem[] }) => {
    const hasError = values.priceList.some((item, idx) => {
      if (!item.overPrice && item.maxWeight !== undefined && item.minWeight >= item.maxWeight) {
        message.error(`${idx + 1}-oralig'da Min og'irlik Maxdan katta bo'lmasligi kerak`);
        return true;
      }
      if (item.minWeight <= 0) {
        message.error("Min og'irlik 0 dan katta bo'lishi kerak");
        return true;
      }
      return false;
    });
  
    if (hasError) return;
  
    const payload: any = {
      priceList: values.priceList.map((item) => ({
        ...item,
        directionId,
        maxWeight: item.overPrice ? null : (item.maxWeight ?? null),
      })),
    };
  
    createPrices(payload, {
      onSuccess: (data) => {
        console.log("Success response:", data); // Debug uchun
        message.success("Narxlar muvaffaqiyatli qo'shildi");
        form.resetFields();
        onClose();
        onSuccess?.();
      },
      onError: (err: any) => {
        console.error("Error details:", err); // Debug uchun
        
        // Error message'ni xavfsiz extract qilish
        let errorMessage = "Noma'lum xato";
        
        if (err?.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err?.message) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }
        
        message.error("Xatolik yuz berdi: " + errorMessage);
      },
    });
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FaWeight className="text-blue-500" />
          <span>Yetkazib berish narxlarini qo'shish</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      className="top-8"
    >
      <Form form={form} onFinish={onFinish} layout="vertical" className="mt-6">
        <Form.List name="priceList">
          {(fields, { add, remove }) => (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 mb-4 ">
                {fields.map(({ key, name, ...restField }, index) => (
                  <PriceItemCard
                    key={key}
                    name={name}
                    index={index}
                    restField={restField}
                    fieldsLength={fields.length}
                    onRemove={() => remove(name)}
                    form={form}
                  />
                ))}
              </div>

              <Button
                type="dashed"
                onClick={() =>
                  add({
                    minWeight: 0.1,
                    maxWeight: undefined,
                    cub3: 0,
                    overPrice: false,
                  })
                }
                block
                icon={<FaPlus />}
                className="mt-4 h-12 text-base font-medium border-2 border-dashed hover:border-blue-500 hover:text-blue-500"
              >
                Yangi oralig' qo'shish
              </Button>
            </>
          )}
        </Form.List>

        {/* Submit Buttons */}
        <Divider />
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} size="large" className="min-w-[120px]">
            Bekor qilish
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            size="large"
            className="min-w-[120px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            {isPending ? "Saqlanmoqda..." : "Narxlarni saqlash"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddDeliveryPricesModal;