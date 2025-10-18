import React from "react";
import LocationCards from "../../molecules/location-cards";
import { TitleText } from "@/shared/components/dump/atoms/title";

export default function WareHouseLocations() {
  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-4xl">
        <TitleText title="Xitoyda ulgurji yuklarni qabul qilish uchun ombor" />
      </div>
      <LocationCards />
    </div>
  );
}
