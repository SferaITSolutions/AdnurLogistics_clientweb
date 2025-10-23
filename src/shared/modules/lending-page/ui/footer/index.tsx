import { TitleText } from "@/shared/components/dump/atoms/title";
import React from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTelegram,
} from "react-icons/fa";

export default function Footer() {
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
                +7 980 470 00958
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://t.me/totrans">
              <FaTelegram color="white" size={20} />
            </a>
            <a href="mailto:info@totrans.com">
              <FaEnvelope color="white" size={20} />
            </a>
            <a href="https://www.instagram.com/adnur_totrans/">
              <FaInstagram color="white" size={20} />
            </a>
            <a href="https://www.facebook.com/totrans.uz/">
              <FaFacebook color="white" size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:flex-row flex-col items-center gap-20 mt-20">
        <div className="flex flex-col gap-2">
          <p className="text-white text-md !mb-0">
            © 2025 Adnur Logistics - All Rights Reserved
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="https://www.sfera-solutions.uz/"
            className="text-white text-md hover:underline"
          >
            Developed Sfera IT Solutions
          </a>
        </div>
      </div>
    </div>
  );
}
