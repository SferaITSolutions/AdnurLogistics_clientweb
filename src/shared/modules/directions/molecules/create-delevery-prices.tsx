"use client";
import React, { useEffect } from "react";
import {
  Modal,
  Form,
  InputNumber,
  Checkbox,
  Button,
  message,
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

// Karta uchun komponent
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
      className="relative !p-0 border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
      bodyStyle={{ padding: "10px", paddingBottom: "0px" }}
    >
      <div className="flex gap-4 !w-full md:flex-row flex-col">
        {/* Min Weight */}
        <Form.Item
          {...restField}
          name={[name, "minWeight"]}
          className="flex-1"
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
          label={
            <span className="flex items-center gap-2 font-medium">
              <FaWeight className="text-red-500" />
              Maksimal og'irlik (kg)
            </span>
          }
          tooltip="Cheksiz bo'lsa bo'sh qoldiring"
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
          label={
            <span className="flex items-center gap-2 font-medium">
              <FaCube className="text-purple-500" />
              Kub narxi ($)
            </span>
          }
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
          <div className="flex gap-2 h-[40px] items-center">
            {fieldsLength > 1 && (
              <Button
                danger
                type="text"
                icon={<MdDelete size={20} />}
                onClick={onRemove}
                className="hover:bg-red-50 h-full"
                size="large"
              />
            )}
            <Button
              type="dashed"
              icon={<FaPlus />}
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

const AddDeliveryPricesModal: React.FC<AddDeliveryPricesModalProps> = ({
  open,
  onClose,
  directionId,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { mutate: createPrices, isPending } = useCreateDeliveryPrice();

  // Modal ochilganda boshlang'ich qiymatni o'rnatish
  useEffect(() => {
    if (open) {
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
  }, [open, form]);

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
      if (item.minWeight != null && item.minWeight <= 0) {
        message.error(`${idx + 1}-oralig'da Min og'irlik 0 dan katta bo'lishi kerak`);
        return true;
      }
      return false;
    });

    // if (hasError) return; // Validatsiya xatoligida to'xtasin

    const payload: any = {
      priceList: values.priceList.map((item) => ({
        ...item,
        directionId,
        maxWeight: item.overPrice ? null : item.maxWeight ?? null,
      })),
    };

    createPrices(payload, {
      onSuccess: (data: any) => {
        // Ba'zan backenddan success = false keladi, shunda ham react-query onSuccess ishlaydi.
        if (data && (typeof data === "object") && data.success === false) {
          const errMsg = data.message || "Server muvaffaqiyatsiz javob qaytardi";
          console.log(`Xatolik: ${errMsg}`);
          return;
        }
        message.success("Narxlar muvaffaqiyatli qo'shildi");
        form.resetFields();
        onClose();
        onSuccess?.();
        console.log("success");
      },
      onError: (err: any) => {
        console.log("Xatolik yuz berdi: " + err);
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
      width={900}
      className="top-8"
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="mt-6"
      >
        <Form.List name="priceList">
          {(fields, { add, remove }) => (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 mb-4">
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