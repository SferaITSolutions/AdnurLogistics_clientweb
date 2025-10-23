"use client";
import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { useFormRequestStore } from "@/features/send-request-to-admin/lib/store";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useFormStore } from "../../store/store";
import { useCreatePetition } from "@/entities/hooks/calculation/hooks";
import { FaArrowLeft, FaArrowUp, FaSpinner } from "react-icons/fa";

export default function ResultCalculation({ response }: { response: any }) {
  const { values } = useFormStore();
  const createPetitionMutation = useCreatePetition();

  // Modal state for petition success
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePetition = () => {
    createPetitionMutation.mutate({
      fromLocation: values.from,
      toLocation: "TASHKENT",
      weight: values.kg,
      bulk: values.m3,
      density: values.kgm3,
      containerType: values.containerType,
      customs: values.customsPriceCalculation,
      price: Number(response?.result),
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

  if (createPetitionMutation.isPending) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center bg-black/70 justify-center !z-50">
        <FaSpinner color="white" size={50} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Modal
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        centered
        footer={[
          <Button key="ok" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-3 items-center">
          <span className="text-lg font-semibold">
            So’rovingiz qabul qilindi!
          </span>
          <span>
            Adminga so’rov yuborildi. Yaqin orada siz bilan bog'lanishadi.
          </span>
        </div>
      </Modal>
      {response ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Hisoblangan narx: </h1>
            <p className="text-xl font-bold">${response?.result || 0} USD</p>
          </div>
          <p>
            Bojxonadan o’tishda har bir tavar uchun qo’shimcha to’lovlar bulishi
            mumkin. Yuqoridagi narx bojxona to’lovlarisiz hisoblandi.
          </p>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            onClick={handleCreatePetition}
            disabled={createPetitionMutation.isPending}
          >
            Adminga so’rov qoldirish
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3 py-8 text-gray-500">
          <div className="flex items-center flex-col gap-5 text-lg font-semibold">
            <FaArrowLeft size={40} className="text-primary lg:block hidden" />
            <FaArrowUp size={40} className="text-primary lg:hidden block" />
            <span>
              So'rov qoldirish uchun avval hisoblashni amalga oshiring!
            </span>
          </div>
          <p className="text-sm text-center">
            Iltimos, hisob-kitob natijasini olish uchun avval formadagi barcha
            maydonlarni to'ldirib, hisoblashingiz kerak.
          </p>
        </div>
      )}
    </div>
  );
}
