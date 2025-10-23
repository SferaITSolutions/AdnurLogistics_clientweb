"use client";
import React from "react";
import { cardsExampleList } from "@/shared/constants/dasboard-client";
import DashboardCard from "../molecules/cards";
import { useOrderDetailsStore } from "@/features/order-details/lib/store";
import OrderDetailsModal from "@/features/order-details/ui";
import { useOrder } from "@/entities/hooks/order/hooks";
import Pagination from "../molecules/pagination";
import { Spin } from "antd";

export default function OrdersList() {
  const { setOrderId, openModal, orderIdFilter, page, type } =
    useOrderDetailsStore();
  const [filterParams, setFilterParams] = React.useState({
    search: Number(type),
    orderId: orderIdFilter,
  });

  // Add debounce to filter parameters
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setFilterParams({
        search: Number(type),
        orderId: orderIdFilter,
      });
    }, 500); // 500ms timeout

    return () => {
      clearTimeout(handler);
    };
  }, [page, type, orderIdFilter]);

  const { data, isLoading, refetch } = useOrder({...filterParams, page});

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? <div className="flex items-center justify-center">
          <Spin size="large" />
        </div> : data?.data.map(
          (card: {
            density: string;
            documentnumber: string;
            etadate: string | null;
            id: string;
            weight: string;
          }, index: number) => (
            <DashboardCard
              key={`${card.documentnumber || "card"}-${index}`}
              ETAdata={card.etadate || "-"}
              OrderIdprops={card.documentnumber}
              Quantity={Number(card.weight)}
              Volume={Number(card.density)}
              Weight={String(card.weight)}
              // Status={card.status}
              onClick={() => {
                setOrderId(card.id);
                openModal();
              }}
            />
          )
        )}
      </div>
      <Pagination dataLength={data?.data.length || 0} />
      <OrderDetailsModal />
    </div>
  );
}
