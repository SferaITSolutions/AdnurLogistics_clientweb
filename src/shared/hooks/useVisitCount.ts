import { useMutation } from "@tanstack/react-query";
import { resourcesService, VisitLogPayload } from "@/services/resourcesService";
import { ProgramService, SupportProgramVisitLogPayload } from "@/services/programService";

export function useResourcesVisitCount(locale?: string) {
  return useMutation({
    mutationFn: (payload: VisitLogPayload) =>
      resourcesService.addVisitCount(payload, locale),
  });
}

export function useSupportProgramVisitCount(locale?: string) {
  return useMutation({
    mutationFn: (payload: SupportProgramVisitLogPayload) =>
      ProgramService.addVisitCountSupportPrograms(payload, locale),
  });
}
