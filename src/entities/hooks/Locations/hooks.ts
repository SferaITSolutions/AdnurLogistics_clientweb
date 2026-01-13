import LocationsService from "@/services/locations/locations.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


/* ===================== GET ===================== */

// FROM locations
export const useGetFromLocations = () => {
  return useQuery({
    queryKey: ["from-locations"],
    queryFn: async () => {
      const res = await LocationsService.getFromLocations();
      return res.data;
    },
  });
};

// TO locations
export const useGetToLocations = () => {
  return useQuery({
    queryKey: ["to-locations"],
    queryFn: async () => {
      const res = await LocationsService.getToLocations();
      return res.data;
    },
  });
};

/* ===================== CREATE ===================== */

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => LocationsService.createLocations(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["from-locations"] });
      queryClient.invalidateQueries({ queryKey: ["to-locations"] });
    },
  });
};

/* ===================== UPDATE ===================== */

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      type: string;
      id: string;
    }) => LocationsService.updateLocations(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["from-locations"] });
      queryClient.invalidateQueries({ queryKey: ["to-locations"] });
    },
  });
};

/* ===================== UPDATE STATUS ===================== */

export const useUpdateLocationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ active, id }: { active: boolean; id: string }) =>
      LocationsService.updateLocationsStatus(active, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["from-locations"] });
      queryClient.invalidateQueries({ queryKey: ["to-locations"] });
    },
  });
};
export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => LocationsService.deleteLocations(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["from-locations"] });
      queryClient.invalidateQueries({ queryKey: ["to-locations"] });
    },

    onError: (error) => {
      console.error("Error deleting location:", error);
    },
  });
};