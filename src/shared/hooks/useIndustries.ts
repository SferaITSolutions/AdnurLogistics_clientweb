import { formService } from "@/services/formService";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { IndustriesResponse } from "../types/form";
import { useLocale } from "next-intl";

export const useIndustries = () => {
  const locale = useLocale()
  const { data, isLoading } = useQuery<IndustriesResponse>({
    queryKey: ["industries_list", locale],
    queryFn: (meta) => formService.getIndustries(meta),
  });

  const transformedIndustriesList = useMemo(() => {
    if (!data?.results || isLoading) {
      return [];
    }

    return data.results.map(({ name, id }) => ({
      label: name,
      value: String(id),
    }));
  }, [data]);

  return {
    industriesList: transformedIndustriesList,
    isIndustryLoading: isLoading,
  };
};
