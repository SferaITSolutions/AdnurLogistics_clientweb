import { useTranslations } from "next-intl";

export const useInvestorType = () => {
  const t = useTranslations();

  return [
    {
      value: "venture",
      label: t("Form.investor_type.venture"),
    },
    {
      value: "angel",
      label: t("Form.investor_type.angel"),
    }
  ];
};
