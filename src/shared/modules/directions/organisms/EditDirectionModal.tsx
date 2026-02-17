"use client";

import { useEffect } from "react";
import { Modal, Form, Spin, Divider, message } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks";
import { useUpdateDirection } from "@/entities/hooks/directions/hooks";
import { getLocalItem } from "@/shared/utils/storage";
import ModalTitle from "../atoms/ModalTitle";
import ModalFooterButtons from "../atoms/ModalFooterButtons";
import LocationSelectFields from "../molecules/LocationSelectFields";

interface Direction {
  id: string;
  productId: string;
  fromLocationId: string;
  toLocationId: string;
}

interface EditDirectionModalProps {
  open: boolean;
  onClose: () => void;
  direction: Direction | null;
  onSuccess?: () => void;
}

const EditDirectionModal = ({
  open,
  onClose,
  direction,
  onSuccess,
}: EditDirectionModalProps) => {
  const t = useTranslations("calculationPage");
  const [form] = Form.useForm();
  const lang = getLocalItem("lang")?.toString() || "uz";

  const { data: fromData, isLoading: fromLoading } = useGetFromList(lang);
  const { data: toData, isLoading: toLoading } = useGetToList(lang);
  const { mutate: updateDirection, isPending: isUpdating } = useUpdateDirection();

  useEffect(() => {
    if (open && direction) {
      form.setFieldsValue({
        from: direction.fromLocationId,
        to: direction.toLocationId,
      });
    } else {
      form.resetFields();
    }
  }, [open, direction, form]);

  const onFinish = (values: any) => {
    if (!direction?.id) {
      message.error("Yo'nalish ID topilmadi");
      return;
    }

    updateDirection(
      {
        id: direction.id,
        productId: direction.productId,
        fromLocationId: values.from,
        toLocationId: values.to,
        priceList: [],
      },
      {
        onSuccess: () => {
          message.success("Yo'nalish muvaffaqiyatli yangilandi");
          form.resetFields();
          onClose();
          onSuccess?.();
        },
        onError: (err: any) => {
          message.error("Yangilashda xato: " + (err.message || "Noma'lum xato"));
        },
      }
    );
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <ModalTitle
          icon={<FaMapMarkerAlt className="text-blue-600" />}
          title="Yo'nalishni tahrirlash"
        />
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
      centered
    >
      {fromLoading || toLoading ? (
        <div className="flex justify-center items-center h-48">
          <Spin size="large" tip="Joylashuvlar yuklanmoqda..." />
        </div>
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
          <LocationSelectFields
            fromData={fromData?.result}
            toData={toData?.result}
            fromLoading={fromLoading}
            toLoading={toLoading}
            fromLabel={t("fromLabel")}
            toLabel={t("toLabel")}
            fromPlaceholder={t("fromPlaceholder")}
            toPlaceholder={t("toPlaceholder")}
            noLocationsFound={t("noLocationsFound")}
            layout="stack"
          />

          <Form.Item className="mt-8 text-right mb-0">
            <Divider />
            <ModalFooterButtons
              onCancel={handleCancel}
              isLoading={isUpdating}
              submitLabel="Saqlash"
              loadingLabel="Saqlanmoqda..."
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditDirectionModal;