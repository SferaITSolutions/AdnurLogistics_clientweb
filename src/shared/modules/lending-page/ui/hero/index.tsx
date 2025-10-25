"use client";
import { HeroCard } from "../../molecules/hero-card";
import Image from "next/image";
import ContainerImage from "@/assets/images/landing-images/container-photo.svg";
import { HeroDescription } from "../../atoms/HeroDescription";
import { ButtonPrimary } from "@/shared/components/dump/atoms/button";

import { FaWpforms } from "react-icons/fa";
import { useApplyModalStore } from "@/features/lending-page/ui/apply-modal/model/useApplyModalStore";
import { ApplyModal } from "@/features/lending-page/ui/apply-modal/ui/ApplyModal";
import { HeroText } from "../../atoms/Herotitle";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const t = useTranslations("LendingPage");
  const { setOpen } = useApplyModalStore();
  return (
    <div className="flex flex-col gap-4 mt-14 relative">
      <div className="flex justify-between items-center lg:flex-row flex-col">
        <div className="flex flex-col gap-6 row:mt-0 mt-10 w-full">
          <HeroText
            title={t("hero.title")}
            classnameDy={"lg:px-0 md:py-8 py-6"}
          />
          <HeroDescription
            classNameDy="lg:absolute w-[350px] right-0 md:top-18 top-12 lg:text-center text-start"
            text={t("hero.subtitle")}
          />
          <ButtonPrimary
            type="primary"
            label={t("hero.applyButton")}
            Icon={<FaWpforms color="#fff" />}
            onClick={() => setOpen(true)}
          />
          <div className="flex md:flex-row lg:flex-col flex-col mt-12 justify-center gap-10 md:gap-3 lg:mb-0 mb-20">
            <HeroCard
              title="12+"
              description={t("stats.experienceLabel")}
              classNameDy="text-red-600 text-center lg:text-start  "
            />
            <HeroCard
              title="3+"
              description={t("stats.countriesLabel")}
              classNameDy="text-center lg:text-start heading-title-size"
            />
            <HeroCard 
              title="4+"
              description={t("stats.servicesLabel")}
              classNameDy="text-center lg:text-start heading-title-size"
            />
          </div>
        </div>
        <Image
          src={ContainerImage}
          alt="Container"
          width={800}
          className="relative -top-6"
        />
      </div>

      <ApplyModal />
    </div>
  );
};
