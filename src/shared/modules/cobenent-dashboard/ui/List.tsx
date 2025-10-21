"use client";
import React from "react";
import { cardsExampleList } from "@/shared/constants/dasboard-client";
import DashboardCard from "../molecules/cards";
import { useOrderDetailsStore } from "@/features/order-details/lib/store";
import OrderDetailsModal from "@/features/order-details/ui";

export default function OrdersList() {
  const { setOrderId, openModal } = useOrderDetailsStore();

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsExampleList.map((card) => (
          <DashboardCard
            key={card.id}
            ETAdata={card.ETA}
            OrderIdprops={card.OrderId}
            Quantity={card.Quantity}
            Volume={card.Volume}
            Weight={card.Weight}
            Status={card.Status}
            onClick={() => {
              setOrderId(card.OrderId);
              openModal();
            }}
          />
        ))}
      </div>

      <OrderDetailsModal />
    </div>
  );
}
