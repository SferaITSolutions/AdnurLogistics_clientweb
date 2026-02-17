"use client";

import { Button, Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowUp, FaSpinner, FaDollarSign, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { useCreatePetition } from "@/entities/hooks/calculation/hooks";
import { formatNumber } from "@/shared/utils/formatter";
import { useTranslations } from "next-intl";
import { useFormStore } from "../../store/store";

export default function ResultCalculation({ response }: { response: any }) {
  const { values, setValue } = useFormStore();
  const t = useTranslations("calculationResult");
  const createPetitionMutation = useCreatePetition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePetition = () => {
    createPetitionMutation.mutate({
      directionId: values.directionId,
      weight: values.weight || 0,
      bulk: values.bulk ?? values.cub ?? 0,
      containerType: "OTHER",
      customs: values.customs || false,
      price: Number(response?.result) || 0,
    });
  };

  useEffect(() => {
    if (createPetitionMutation.isSuccess) {
      setIsModalOpen(true);
    }
  }, [createPetitionMutation.isSuccess]);

  const handleModalOk = () => {
    setIsModalOpen(false);
    createPetitionMutation.reset();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Success Modal */}
      <Modal
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        centered
        footer={null}
      >
        <div className="flex flex-col gap-6 items-center py-8">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-500/40 animate-bounce">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <span className="text-2xl font-bold text-gray-800">
            {t("modalTitleSuccess")}
          </span>
          <span className="text-gray-600 text-center">{t("modalMessageSuccess")}</span>
          <Button
            type="primary"
            className="!bg-gradient-to-r !from-green-500 !to-green-600 !border-0 !shadow-lg !shadow-green-500/30 !rounded-xl !px-8 !py-2 global-input-height !font-semibold hover:!scale-105 !transition-all !duration-300"
            onClick={handleModalOk}
          >
            {t("modalButtonOk")}
          </Button>
        </div>
      </Modal>

      {response ? (
        <>
          {/* Price Display */}
          <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl shadow-blue-500/40 border border-blue-400">
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <FaDollarSign className="text-lg" />
                {t("calculatedPriceTitle")}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">
                  ${formatNumber(response?.result) || 0}
                </span>
                <span className="text-xl text-white/80">{t("priceSuffix")}</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
            <FaExclamationTriangle className="text-yellow-600 flex-shrink-0 mt-1" />
            <p className="text-sm text-yellow-800 !mb-0">{t("disclaimer")}</p>
          </div>

          {/* Customs Checkbox */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
            <Checkbox
              checked={values.customsPriceCalculation || false}
              onChange={(e: any) =>
                setValue("customsPriceCalculation", e.target.checked)
              }
              className="global-text-size font-medium"
            >
              {t("customsLabel")}
            </Checkbox>
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !border-0 !shadow-lg !shadow-blue-500/30 hover:!shadow-xl hover:!shadow-blue-500/40 w-full !py-6 !rounded-xl !font-semibold !text-base hover:!scale-[1.02] !transition-all !duration-300"
            onClick={handleCreatePetition}
            disabled={createPetitionMutation.isPending}
          >
            {t("sendRequestButton")}
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-2xl gap-6 px-6 py-12 bg-gradient-to-br from-gray-50 to-blue-50/30 border-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
              <div className="relative flex items-center gap-3 mb-4">
                <FaArrowLeft
                  size={40}
                  className="text-blue-500/60 lg:block hidden"
                />
                <FaArrowUp
                  size={40}
                  className="text-blue-500/60 lg:hidden block"
                />
              </div>
            </div>
            <span className="text-2xl font-bold text-blue-600 text-center">
              {t("errorNeedCalculationTitle")}
            </span>
          </div>
          <p className="text-lg text-center text-gray-600 max-w-md">
            {t("errorNeedCalculationMessage")}
          </p>
        </div>
      )}
    </div>
  );
}