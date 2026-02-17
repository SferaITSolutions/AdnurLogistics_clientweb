"use client";

import { useEffect } from "react";
import { Modal, Form, Divider, message } from "antd";
import { FaWeight } from "react-icons/fa";
import { useCreateDeliveryPrice } from "@/entities/hooks/delivery-price/hooks";
import ModalTitle from "../atoms/ModalTitle";
import ModalFooterButtons from "../atoms/ModalFooterButtons";
import PriceFormList from "../molecules/PriceFormList";

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

const AddDeliveryPricesModal = ({
  open,
  onClose,
  directionId,
  onSuccess,
}: AddDeliveryPricesModalProps) => {
  const [form] = Form.useForm();
  const { mutate: createPrices, isPending } = useCreateDeliveryPrice();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        priceList: [
          { minWeight: null, maxWeight: undefined, cub3: null, overPrice: false },
        ],
      });
    }
  }, [open, form]);

  const onFinish = (values: { priceList: PriceItem[] }) => {
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

    if (hasError) return;

    const payload = {
      priceList: values.priceList.map((item) => ({
        ...item,
        directionId,
        maxWeight: item.overPrice ? null : item.maxWeight ?? null,
      })),
    };

    createPrices(payload, {
      onSuccess: (data: any) => {
        if (data && typeof data === "object" && data.success === false) {
          message.error(`Xatolik: ${data.message || "Server muvaffaqiyatsiz javob qaytardi"}`);
          return;
        }
        message.success("Narxlar muvaffaqiyatli qo'shildi");
        form.resetFields();
        onClose();
        onSuccess?.();
      },
      onError: (err: any) => {
        message.error("Xatolik yuz berdi: " + err);
      },
    });
  };

  return (
    <Modal
      title={
        <ModalTitle
          icon={<FaWeight className="text-blue-500" />}
          title="Yetkazib berish narxlarini qo'shish"
        />
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      className="top-8"
    >
      <Form form={form} onFinish={onFinish} layout="vertical" className="mt-6">
        <PriceFormList form={form} />
        <Divider />
        <ModalFooterButtons
          onCancel={onClose}
          isLoading={isPending}
          submitLabel="Narxlarni saqlash"
          loadingLabel="Saqlanmoqda..."
        />
      </Form>
    </Modal>
  );
};

export default AddDeliveryPricesModal;