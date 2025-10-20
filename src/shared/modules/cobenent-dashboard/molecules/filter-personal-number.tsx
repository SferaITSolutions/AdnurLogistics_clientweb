import { Input } from "antd";
import React from "react";
import { useDashboardFilters } from "../api/store";

export default function FilterPersonalNumber() {
  const { PersonalNumber, setPersonalNumber } = useDashboardFilters();
  return (
    <div className="flex flex-col gap-2 border rounded-xl p-3">
      <label htmlFor="personal-number text-2xl">Shaxsiy hisob raqam</label>
      <Input
        id="personal-number"
        value={PersonalNumber}
        onChange={(e) => setPersonalNumber(e.target.value)}
        placeholder="Shaxsiy hisob raqam"
      />
    </div>
  );
}
