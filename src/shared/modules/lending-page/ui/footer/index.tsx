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
    <div className=" items-center gap-4 bg-primary-blue-color p-10 rounded-t-2xl mt-[50px]">
      <div className="container mx-auto flex justify-between w-full">
        <div className="flex flex-col gap-10">
          <h1 className="text-white text-md">
            Toshkent shaxar, Shayxontohur tumani, O'qchi - 6. (Mo'ljal Toshkent
            City Bulvar)
          </h1>
          <div className="flex items-center gap-2">
            <TitleText redText="GET" color="white" title="IN TOUCH" />{" "}
            <FaArrowRight color="white" size={30} />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-white text-md">
                © 2025 Adnur Logistics - All Rights Reserved
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.sfera-solutions.uz/"
                className="text-white text-md"
              >
                Developed Sfera IT Solutions
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[300px]">
          <div className="">
            <div className="flex items-center gap-2">
              <h1 className="text-white text-md">+7 980 470 00958</h1>
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
    </div>
  );
}
