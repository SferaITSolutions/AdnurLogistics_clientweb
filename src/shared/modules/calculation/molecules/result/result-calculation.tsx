import { useCalculationStore } from "@/entities/hooks/calculation/store";
import { useFormRequestStore } from "@/features/send-request-to-admin/lib/store";
import RequestToAdminModal from "@/features/send-request-to-admin/ui";
import { TitleText } from "@/shared/modules/lending-page";
import { Button } from "antd";
import React from "react";
import { useFormStore } from "../../store/store";
import { useCreatePetition } from "@/entities/hooks/calculation/hooks";

export default function ResultCalculation({ response }: { response: any }) {
  const { setRequestModalStatus } = useFormRequestStore();
  const createPetitionMutation = useCreatePetition();
  const { values } = useFormStore();
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
  return response ? (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Hisoblangan narx: </h1>
          <p className="text-xl font-bold">${response?.result || 0} USD</p>
        </div>
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
      >
        Adminga so’rov qoldirish
      </Button>
      <RequestToAdminModal />
    </div>
  ) : null;
}
