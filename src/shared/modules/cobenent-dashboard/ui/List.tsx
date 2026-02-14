"use client";

import React, { useEffect } from "react";

import { useOrder } from "@/entities/hooks/order/hooks";
import { useOrderDetailsStore } from "@/features/order-details/lib/store";
import OrderDetailsModal from "@/features/order-details/ui";
import { Empty } from "antd";
import { useTranslations } from "next-intl";
import { FaSpinner } from "react-icons/fa";
import DashboardCard from "../molecules/cards";
import Pagination from "../molecules/pagination";
import { useSidebarStore } from "@/features/auth/register/store/sidebarStore";

export default function OrdersList() {
  const t = useTranslations("clientDashboard");
  const { selectedEntityId } = useSidebarStore();
  const {
    setOrderId,
    openModal,
    orderIdFilter,
    page,
    type,
    setLoading,
    setStartEndDate,
    statusOfInvoice,
    setStatusOfInvoice,
    setTotalprice
  } = useOrderDetailsStore();
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
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [page, type, orderIdFilter]);

  const { data, isLoading } = useOrder({ ...filterParams, page, entityId: selectedEntityId });
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="relative">
      {isLoading ? (
        <div className="flex items-center justify-center ">
          <FaSpinner size={40} className="animate-spin" />
        </div>
      ) : (
        <>
          {data?.data.content ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.data.content.map(
                  (
                    card: {
                      density: string;
                      documentnumber: string;
                      etadate: string | null;
                      createddate: string | null;
                      id: string;
                      weight: string;
                      tolocation: string | null;
                      totalprice: number | string | any;
                      quantity: string | null;
                      salesorderstatus: string | null;
                    },
                    index: number
                  ) => (
                    <DashboardCard
                      key={`${card.documentnumber || "card"}-${index}`}
                      ETAdata={card.etadate || "-"}
                      OrderIdprops={card.documentnumber}
                      Quantity={Number(card.weight)}
                      Volume={Number(card.density)}
                      Weight={String(card.weight)}
                      quantity={String(card.quantity)}
                      tolocation={String(card.tolocation)}
                      status={String(card.salesorderstatus)}
                      onClick={() => {
                        setOrderId(card.id);
                        openModal();
                        setStatusOfInvoice(card?.salesorderstatus)
                        setTotalprice(card?.totalprice)
                        console.log(card?.totalprice, "price");

                        setStartEndDate({
                          start: card.createddate,
                          end: card.etadate,
                        });
                      }}
                    />
                  )
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center ">
              <p className="text-gray-500">
                <Empty description={""} />
              </p>
            </div>
          )}
          <Pagination dataLength={data?.data.totalElements} />
          <OrderDetailsModal />
        </>
      )}
    </div>
  );
}
