import CalculationService from "@/services/calculation/calculation.service";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { toast } from "sonner";

export const useCalculation = (onSuccess: (data: any) => void) => {
  return useMutation({
    mutationFn: (data: {
      fromLocation: string;
      customs: boolean;
      weight: number;
      cub: number;
    }) => CalculationService.calculate(data),
    onSuccess: (data) => {
      onSuccess(data);
      return data;
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Xatolik yuz berdi");
      return error;
    },
  });
};
export const useCreatePetition = () => {
  return useMutation({
    mutationFn: (data: {
      fromLocation: string;
      toLocation: string;
      weight: number;
      bulk: number;
      // density: number;
      containerType: string;
      customs: boolean;
      price: number;
    }) => CalculationService.createPetition(data),
    onSuccess: () => {
      toast.success("So'rov qoldirildi");
     
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Xatolik yuz berdi");
      return error;
    },
  });
};
