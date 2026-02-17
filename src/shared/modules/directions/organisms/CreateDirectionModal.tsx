"use client";

import { useState, useEffect } from "react";
import { Modal, Form, Spin, Divider } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks";
import { useCreateDirection } from "@/entities/hooks/directions/hooks";
import { getLocalItem } from "@/shared/utils/storage";
import ModalTitle from "../atoms/ModalTitle";
import ModalFooterButtons from "../atoms/ModalFooterButtons";
import LocationSelectFields from "../molecules/LocationSelectFields";
import PriceFormList from "../molecules/PriceFormList";

interface PriceItem {
  minWeight: number;
  maxWeight?: number;
  cub3: number;
  overPrice: boolean;
}

interface CreateDirectionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  productId: string;
}

const CreateDirectionModal = ({
  open,
  onClose,
  onSuccess,
  productId,
}: CreateDirectionModalProps) => {
  const t = useTranslations("calculationPage");
  const lang = getLocalItem("lang")?.toString() || "uz";
  const [form] = Form.useForm();
  const [showPriceList, setShowPriceList] = useState(false);

  const toLocationValue = Form.useWatch("to", form);

  const { data: fromData, isLoading: fromLoading } = useGetFromList(lang);
  const { data: toData, isLoading: toLoading } = useGetToList(lang);
  const { mutate: createDirection, isPending: isCreating } = useCreateDirection();

  // To location tanlanganida price list ko'rsatish
  useEffect(() => {
    if (toLocationValue) {
      setShowPriceList(true);
      const currentPriceList = form.getFieldValue("priceList");
      if (!currentPriceList || currentPriceList.length === 0) {
        form.setFieldsValue({
          priceList: [
            { minWeight: null, maxWeight: undefined, cub3: null, overPrice: false },
          ],
        });
      }
    } else {
      setShowPriceList(false);
    }
  }, [toLocationValue, form]);

  const onFinish = (values: any) => {
    if (values.priceList?.length > 0) {
      const hasError = values.priceList.some((item: PriceItem, idx: number) => {
        if (
          !item.overPrice &&
          item.maxWeight !== undefined &&
          item.maxWeight != null &&
          item.minWeight >= item.maxWeight
        ) {
          toast.error(
            `${idx + 1}-oralig'da Min og'irlik Maxdan katta yoki teng bo'lmasligi kerak`
          );
          return true;
        }
        return false;
      });
      if (hasError) return;
    }

    const payload = {
      productId,
      fromLocationId: values.from,
      toLocationId: values.to,
      priceList:
        values.priceList?.map((item: PriceItem) => ({
          minWeight: item.minWeight ?? null,
          maxWeight: item.overPrice ? null : item.maxWeight ?? null,
          cub3: item.cub3 ?? null,
          overPrice: item.overPrice ?? false,
        })) || [],
    };

    createDirection(payload, {
      onSuccess: () => {
        toast.success("Yo'nalish va narxlar muvaffaqiyatli qo'shildi");
        form.resetFields();
        setShowPriceList(false);
        onClose();
        onSuccess?.();
      },
      onError: (err: any) => {
        toast.error("Xatolik: " + (err.message || "Noma'lum xato"));
      },
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setShowPriceList(false);
    onClose();
  };

  return (
    <Modal
      title={
        <ModalTitle
          icon={<FaMapMarkerAlt className="text-blue-600" />}
          title="Yangi yo'nalish va narxlar qo'shish"
        />
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={1000}
      destroyOnClose
      centered
      className="top-8"
    >
      {fromLoading || toLoading ? (
        <div className="flex justify-center items-center h-48">
          <Spin size="large" tip="Joylashuvlar yuklanmoqda..." />
        </div>
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
          <LocationSelectFields
            fromData={fromData}
            toData={toData}
            fromLoading={fromLoading}
            toLoading={toLoading}
            fromLabel={t("fromLabel")}
            toLabel={t("toLabel")}
            fromPlaceholder={t("fromPlaceholder")}
            toPlaceholder={t("toPlaceholder")}
            noLocationsFound={t("noLocationsFound")}
            layout="grid"
          />

          {showPriceList && (
            <PriceFormList
              form={form}
              title="Yetkazib berish narxlari"
            />
          )}

          <Divider />
          <ModalFooterButtons
            onCancel={handleCancel}
            isLoading={isCreating}
            submitLabel="Saqlash"
            loadingLabel="Saqlanmoqda..."
          />
        </Form>
      )}
    </Modal>
  );
};

export default CreateDirectionModal;