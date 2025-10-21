import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useStage = () => {
  const t = useTranslations();

  const stagesList = useMemo(
    () => [
      {
        value: "idea",
        label: "Idea",
      },
      {
        value: "pre_seed",
        label: t("Form.stage.pre_seed"),
      },
      {
        value: "seed_",
        label: t("Form.stage.seed_"),
      },
      {
        value: "early_a",
        label: t("Form.stage.early_a"),
      },
      {
        value: "serias_a",
        label: "Series A",
      },
      {
        value: "early_b",
        label: t("Form.stage.early_b"),
      }
    ],
    [t]
  );
  const getLabelByValue = (value: string) => {
    return stagesList.find((item) => item.value === value)?.label;
  };

  return {
    list: stagesList,
    getLabelByValue,
  };
};
