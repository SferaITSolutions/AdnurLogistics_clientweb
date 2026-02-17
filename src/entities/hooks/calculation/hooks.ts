import CalculationService from "@/services/calculation/calculation.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { toast } from "sonner";

export const useCalculation = (onSuccess?: (data: any) => void) => {
  return useMutation({
    mutationFn: (data: {
      fromLocation: string;
      customs: boolean;
      toLocation:string;
      weight: number;
      cub: number;
    }) => CalculationService.calculate(data),
    onSuccess: (data) => {
      onSuccess?.(data as any);
      return data;
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Xatolik yuz berdi");
      return error;
    },
  });
};
export const useGetProductsList = () => {
  return useQuery({
    queryKey: ["productsList"],
    queryFn: () => CalculationService.getProductsList(),
  });
};
export const useGetPetitionList = (ProductId: string) => {
  return useQuery({
    queryKey: ["petitionList", ProductId],
    queryFn: () => CalculationService.getDirectionList(ProductId),
    enabled: !!ProductId,
  });
};
export const useCreatePetition = () => {
  return useMutation({
    mutationFn: (data: {
      directionId: string;
      weight: number;
      bulk: number;
      containerType: string;
      customs: boolean;
      price: number;
    }) => CalculationService.createPetition(data),
    onSuccess: () => {
      toast.success("So'rov qoldirildi");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Xatolik yuz berdi");
    },
  });
};
export const useApplyFCL = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (data: {
      fromLocation: string;
      toLocation: string;
      weight: number;
      bulk: number;
      customs: boolean;
    }) => CalculationService.applyForm(data),
    onSuccess: () => {
      toast.success("#application submitted successfully ✅");
      onSuccess();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "#something went wrong ❌");
    },
  });
};
