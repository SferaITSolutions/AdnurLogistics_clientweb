import { mainService } from "@/services/mainService";
import { placesRequestService } from "@/services/places";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useState } from "react";



export const useRegion = (location: string | undefined) => {
  const { data: places, isLoading: isPlacesLoading } = useQuery({
    queryKey: ["places", location],
    queryFn: () => placesRequestService.getPlaces(location),
    retry: false,
  });

  // Map regions (flatten nested arrays for local)
  const regions = places?.regions?.flat().map((region: { name: string; id: number }) => ({
    label: region.name,
    value: region.id.toString(),
  })) ?? [];

  // Map countries
  const countries = places?.countries?.map((country: { name: string; id: number }) => ({
    label: country.name,
    value: country.id.toString(),
  })) ?? [];

  // Return filtered list based on location
  const filteredRegions = location === "global" ? countries : location === "local" ? regions : [];

  return {
    regions: filteredRegions,
    isPlacesLoading,
  };
};

export const usePlaces = () => {
  const locale = useLocale();
  const [countryId, setCountryId] = useState("0");

  const { data: countries } = useQuery({
    queryKey: ["countries", locale],
    queryFn: (meta) => mainService.getCountries(locale, meta),
    retry: false,
  });

  const { data: regions } = useQuery({
    queryKey: ["regions", countryId, locale],
    queryFn: (meta) => mainService.getRegions(countryId, locale, meta),
    enabled: countryId !== "0", // Only fetch regions if a valid countryId is selected
  });

  const filteredCountries = (ids: number[] = []) => {
    return countries?.filter((country) => ids.includes(Number(country.id))) ?? [];
  };

  return { countries, regions, setCountryId, filteredCountries };
};

