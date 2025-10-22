import { ApplyRequest } from "@/shared/types/lenging-page-types";
import { useMutation } from "@tanstack/react-query";
import { ApplyService } from "../services/apply.service";
import { message } from "antd";

export const useApplyRequest = () => {
  return useMutation({
    mutationFn: (data: ApplyRequest) =>  new ApplyService().sendApplyRequest(data),
    onSuccess: () => {
      message.success("Ariza qoldirildi");
    },
    onError: (error) => {
      message.error("Ariza qoldirishda xatolik");
    },
  });
};