"use client";
import { TitleText } from "@/shared/components/dump/atoms/title";
import { useTranslations } from "next-intl";
import React from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("LendingPage.footer");
  return (
    <div className=" items-center gap-4 bg-primary-blue-color p-10 rounded-t-4xl">
      <div className="container mx-auto flex justify-between md:flex-row flex-col w-full">
        <div className="flex flex-col gap-10">
          <h1 className="text-white text-md">
            Toshkent shaxar, Shayxontohur tumani, O'qchi - 6. (Mo'ljal Toshkent
            City Bulvar)
          </h1>
          <div className="flex  items-center gap-2">
            <TitleText redText="GET" color="white" title="IN TOUCH" />{" "}
            <FaArrowRight color="white" size={30} />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[300px]">
          <div className="">
            <div className="flex items-center gap-2">
              <h1 className="text-white text-md hover:underline">
                +998 71 200 1909
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://t.me/">
              <FaTelegram color="white" size={20} />
            </a>
            <a href="mailto:info@gmail.com">
              <FaEnvelope color="white" size={20} />
            </a>
            <a href="https://www.instagram.com/">
              <FaInstagram color="white" size={20} />
            </a>
            <a href="https://www.facebook.com/">
              <FaFacebook color="white" size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:flex-row flex-col items-center gap-20 mt-20">
        <div className="flex flex-col gap-2">
          <p className="text-white text-md !mb-0">{t("copyright")}</p>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="https://www.sfera-solutions.uz/"
            className="text-white text-md hover:underline"
          >
            {t("developedBy")}
          </a>
        </div>
      </div>{" "}
    </div>
  );
}
