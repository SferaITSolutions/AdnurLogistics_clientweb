import { useFormRequestStore } from "@/features/send-request-to-admin/lib/store";
import RequestToAdminModal from "@/features/send-request-to-admin/ui";
import { TitleText } from "@/shared/modules/lending-page";
import { Button } from "antd";
import React from "react";

export default function ResultCalculation({ result, response }: { result: any, response: any }) {
  const { setRequestModalStatus } = useFormRequestStore();
  // const { setResponse } = useCalculationStore();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Hisoblangan narx: </h1>
          <p className="text-xl font-bold">{result.result || 0} so'm</p>
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
        onClick={() => setRequestModalStatus("pending")}
      >
        Adminga so’rov qoldirish
      </Button>
      <RequestToAdminModal />
    </div>
  );
}
