"use client";
import { ButtonLight, TitleText } from "@/shared/components/dump/atoms";
import { HeroDescription } from "../../atoms/HeroDescription";
import Image from "next/image";
import AboutSectionImage from "@/assets/images/landing-images/about-section.svg";
import { FaVideo, FaWpforms } from "react-icons/fa";
import { VideoModal } from "../video-modal";
import { useState } from "react";
import { Modal } from "antd";
import "antd/dist/reset.css";
import { ButtonOutline } from "@/shared/components/dump/atoms/button";
import AboutTitle from "../../molecules/about-title";
import { ApplyModal } from "@/features/lending-page/ui/apply-modal/ui/ApplyModal";
import { useApplyModalStore } from "@/features/lending-page/ui/apply-modal/model/useApplyModalStore";
import { useTranslations } from "next-intl";

export const AboutLogistic = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { setOpen } = useApplyModalStore();
  const t = useTranslations("LendingPage.about");
  return (
    <div>
      <div className="flex justify-between flex-col lg:flex-row  items-start lg:items-center gap-5 pt-6">
        <Image src={AboutSectionImage} alt="Container" width={500} />
        <div className="flex flex-col gap-10 p-0 lg:p-6">
          <AboutTitle classNameDy="" />
          <HeroDescription
            classNameDy="leading-6"
            color="gray-300"
            text={t("description")}
          />
          <div className="flex sm:flex-row flex-col   gap-2">
            <ButtonOutline
              label={t("apply")}
              onClick={() => {
                setOpen(true);
              }}
              Icon={<FaWpforms color="#fff" />}
            />
            <ButtonLight
              icon={<FaVideo color="#004f98" />}
              label={t("watchVideo")}
              onClick={() => {
                setIsVideoModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <ApplyModal />
      <Modal
        open={isVideoModalOpen}
        onCancel={() => setIsVideoModalOpen(false)}
        footer={null}
        width={800}
        centered
        destroyOnClose
      >
        <VideoModal />
      </Modal>
    </div>
  );
};
