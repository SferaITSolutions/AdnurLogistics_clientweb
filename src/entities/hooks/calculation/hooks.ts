import CalculationService from "@/services/calculation/calculation.service";
import { useMutation } from "@tanstack/react-query";

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
    onError: (error) => {
      return error;
    },
  });
};
export const useCreatePetition = ({
  data,
  onSuccess,
}: {
  data: {
    fromLocation: string;
    toLocation: string;
    weight: number;
    bulk: number;
    density: number;
    containerType: string;
    customs: boolean;
    price: number;
  };
  onSuccess: () => void;
}) => {
  return useMutation({
    mutationFn: () => CalculationService.createPetition(data),
    onSuccess: (data) => {
      onSuccess();
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
