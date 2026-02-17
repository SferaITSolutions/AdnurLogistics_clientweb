import React from "react";
import { Card, Form, InputNumber, Button } from "antd";
import { FaWeight, FaCube, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import OverPriceCheckbox from "../atoms/OverPriceCheckbox";

interface PriceItemCardProps {
  name: number;
  index: number;
  restField: any;
  fieldsLength: number;
  onRemove: () => void;
  onAdd: () => void;
  form: any;
  isLast: boolean;
  /** Faqat birinchi qatorda label ko'rsatiladi, qolganlarida yashiriladi */
  showLabels?: boolean;
}

/**
 * Bitta narx oralig'i kartasi.
 * CreateDirectionModal, ViewDirectionPricesModal va AddDeliveryPricesModal
 * da bir xil ishlatiladi — endi bitta joyda.
 */
const PriceItemCard: React.FC<PriceItemCardProps> = ({
  name,
  index,
  restField,
  fieldsLength,
  onRemove,
  onAdd,
  form,
  isLast,
  showLabels = true,
}) => {
  const isOverPrice = Form.useWatch(["priceList", name, "overPrice"], form);
  const isFirstRow = index === 0;

  const makeLabel = (icon: React.ReactNode, text: string) =>
    showLabels && isFirstRow ? (
      <span className="flex items-center gap-2 font-medium">
        {icon}
        {text}
      </span>
    ) : (
      <span className="opacity-0">Label</span>
    );

  return (
    <Card
      className="relative !p-0 transition-all border-none shadow-none duration-300"
      bodyStyle={{ padding: "10px", paddingBottom: "0px", marginBottom: "10px" }}
    >
      <div className="flex gap-4 !w-full md:flex-row flex-col">
        {/* Min Weight */}
        <Form.Item
          {...restField}
          name={[name, "minWeight"]}
          className="flex-1"
          label={makeLabel(
            <FaWeight className="text-green-500" />,
            "Minimal og'irlik (kg)"
          )}
          rules={[{ required: true, message: "Minimal og'irlikni kiriting" }]}
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
          label={makeLabel(
            <FaWeight className="text-red-500" />,
            "Maksimal og'irlik (kg)"
          )}
          tooltip={isFirstRow ? "Cheksiz bo'lsa bo'sh qoldiring" : undefined}
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
          label={makeLabel(
            <FaCube className="text-purple-500" />,
            "Kub narxi ($)"
          )}
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
          label={
            showLabels && isFirstRow ? (
              <span className="opacity-0">Actions</span>
            ) : (
              <span className="opacity-0">Actions</span>
            )
          }
          className="mb-0"
        >
          <div className="flex gap-2 items-center h-full">
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

      {/* 1000 kg dan yuqori — faqat oxirgi elementda */}
      {isLast && (
        <OverPriceCheckbox name={name} restField={restField} form={form} />
      )}
    </Card>
  );
};

export default PriceItemCard;