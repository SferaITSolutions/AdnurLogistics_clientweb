'use client';
import { HeroCard } from "../../molecules/hero-card";
import Image from "next/image";
import ContainerImage from "@/assets/images/landing-images/container-photo.svg";
import { HeroDescription } from "../../atoms/description";
import { ButtonPrimary } from "@/shared/components/dump/atoms/button";
import { TitleText } from "@/shared/components/dump/atoms";
import { FaWpforms } from "react-icons/fa";
import { useApplyModalStore } from "@/features/lending-page/ui/apply-modal/model/useApplyModalStore";
import { ApplyModal } from "@/features/lending-page/ui/apply-modal/ui/ApplyModal";

export const Hero = () => {

  const { setOpen } = useApplyModalStore();
  return (
    <div className="flex flex-col gap-4 mt-24">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <TitleText title="Adnur Logistika" />
          <HeroDescription text="Adnur Logistika - bu yillar mobaynida tajribali va keng tayyorlovli logistika xizmati ko'rsatuvchisi. Biz sizga eng yaxshi logistika echimlarni taklif qilamiz va sizning tayyorlovlaringizni eng yaxshi sharoitda yetkazib beramiz." />
          <ButtonPrimary type="primary" label="Ariza qoldirish" Icon={<FaWpforms color="#fff" />} onClick={() => setOpen(true)} />
        </div>
        <Image src={ContainerImage} alt="Container" width={600} />
      </div>

      <div className="flex justify-between items-center gap-4 mt-10">
        <HeroCard title="10+" description="Yillik tajriba" />
        <HeroCard title="3+" description="Davlatlar aro" />
        <HeroCard title="4+" description="Xizmat ko'rsatish turlari" />
      </div>
      <ApplyModal />
    </div>
  );
};
