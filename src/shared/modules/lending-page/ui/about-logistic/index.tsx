"use client";
import { ButtonPrimary, TitleText } from "@/shared/components/dump/atoms";
import { HeroDescription } from "../../atoms/description";
import Image from "next/image";
import AboutSectionImage from "@/assets/images/landing-images/about-section.svg";
import { FaVideo, FaWpforms } from "react-icons/fa";
import { ButtonOutline } from "../../atoms/button-outline";
import { VideoModal } from "../video-modal";
import { useState } from "react";
import { Modal } from "antd";
import "antd/dist/reset.css";

export const AboutLogistic = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <Image src={AboutSectionImage} alt="Container" width={600} />
        <div className="flex flex-col gap-10">
          <TitleText
            title="O’zbekistonda #1 Logistik Kampaniya"
            redText={`"Adnur Logistics"`}
          />
          <HeroDescription text="Biz xalqaro miqyosda faoliyat yurituvchi, dunyo bo‘ylab 4 tadan oshiq davlatda ishonch qozongan kompaniyamiz. Bizning xizmatimiz orqali yuklaringizni tez va ishonchli yetkazib keling!" />
          <div className="flex gap-2">
            <ButtonPrimary
              type="primary"
              label="Ariza qoldirish"
              Icon={<FaWpforms color="#fff" />}
            />
            <ButtonOutline
              icon={<FaVideo color="#004f98" />}
              label="Video ko'rish"
              onClick={() => {
                setIsVideoModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
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
