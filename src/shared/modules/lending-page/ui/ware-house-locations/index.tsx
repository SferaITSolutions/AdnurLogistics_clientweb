import React from "react";
import LocationCards from "../../molecules/location-cards";
import { TitleText } from "@/shared/components/dump/atoms/title";
import AwarehouseTitle from "../../molecules/warehouse-title";

export default function WareHouseLocations() {
  return (
    <div className="flex flex-col gap-4 py-10">
      <AwarehouseTitle />
      <LocationCards />
    </div>
  );
}
