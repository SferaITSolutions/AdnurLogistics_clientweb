import { useTranslations } from "next-intl";

export const useRegions = () => {
  const t = useTranslations("regions");
  const FROM_OPTIONS = [
    { value: "HORGOS", label: t("horgos") },
    { value: "YIWU", label: t("yiwu") },
    { value: "FOSHAN", label: t("foshan") },
  ];

  return {FROM_OPTIONS}
}

export const FROM_OPTIONS = [
  { value: "HORGOS", label: "Horgos" },
  { value: "YIWU", label: "Yiwu" },
  { value: "FOSHAN", label: "Foshan" },
];

export const TO_OPTIONS = [{ value: "TASHKENT", label: "Tashkent" }];
