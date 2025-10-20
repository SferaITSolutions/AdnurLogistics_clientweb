import { TitleText } from "@/shared/components/dump/atoms";
import { CopyText } from "@/shared/components/dump/atoms/copyText";
import { LocationTypes } from "@/shared/types/lenging-page-types";
import React from "react";

export const LocationCard: React.FC<{ location: LocationTypes }> = ({
  location,
}) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center">{location.title}</h1>
      <div className="p-6 rounded-2xl flex flex-col gap-6 bg-[#fff]">
        <div className="flex flex-col">
          <div className="font-semibold mb-1">To'liq manzil:</div>
          <CopyText text={location.fullLocation} />
        </div>
        <div>
          <div className="font-semibold mb-1">Qabul qiluvchi:</div>
          <CopyText text={location.receiver} />
        </div>
        <div>
          <div className="font-semibold mb-1">
            Tijorat jo'natmalari uchun majburiy belgilar:
          </div>
          <CopyText text={location.marks} />
        </div>
        <div>
          <div className="font-semibold mb-1">
            Transport turlari bo'yicha ajratish uchun:
          </div>
          <CopyText text={location.transport} />
        </div>
      </div>
    </div>
  );
};
