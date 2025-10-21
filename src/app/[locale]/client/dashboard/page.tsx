import { Filters, List } from "@/shared/modules/cobenent-dashboard/ui";
import React from "react";

export default function DashboardClient() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard Client</h1>
     <Filters />
     <List />
    </div>
  );
}
