'use client';
import { HeroCard } from "../../molecules/hero-card";
import Image from "next/image";
import ContainerImage from "@/assets/images/landing-images/container-photo.svg";
import { HeroDescription } from "../../atoms/HeroDescription";
import { ButtonPrimary } from "@/shared/components/dump/atoms/button";

import { FaWpforms } from "react-icons/fa";
import { useApplyModalStore } from "@/features/lending-page/ui/apply-modal/model/useApplyModalStore";
import { ApplyModal } from "@/features/lending-page/ui/apply-modal/ui/ApplyModal";
import { HeroText } from "../../atoms/Herotitle";

export const Hero = () => {

  const { setOpen } = useApplyModalStore();
  return (
    <div className="flex flex-col gap-4 mt-14 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <HeroText title="Adnur Logistika" classnameDy={''} />
          <HeroDescription classNameDy="absolute w-[350px] right-0 top-18 text-center" text="Adnur Logistika - bu yillar mobaynida tajribali va keng tayyorlovli logistika xizmati ko'rsatuvchisi. Biz sizga eng yaxshi logistika echimlarni taklif qilamiz va sizning tayyorlovlaringizni eng yaxshi sharoitda yetkazib beramiz." />
          <ButtonPrimary type="primary" label="Ariza qoldirish" Icon={<FaWpforms color="#fff" />} onClick={() => setOpen(true)} />
          <div className="flex row flex-col gap-3 mt-12">
            <HeroCard title="10+" description="Yillik tajriba" classNameDy="text-red-600" />
            <HeroCard title="3+" description="Davlatlar aro" />
            <HeroCard title="4+" description="Xizmat ko'rsatish turlari" />
          </div>
        </div>
        <Image src={ContainerImage} alt="Container" width={800} className="relative -top-6" />
      </div>


      <ApplyModal />
    </div>
  );
};
