'use client';

import React, { useEffect } from 'react';

import { useOrder } from '@/entities/hooks/order/hooks';
import { useOrderDetailsStore } from '@/features/order-details/lib/store';
import OrderDetailsModal from '@/features/order-details/ui';
import { Spin } from 'antd';
import DashboardCard from '../molecules/cards';
import Pagination from '../molecules/pagination';
import { FaSpinner } from 'react-icons/fa';

export default function OrdersList() {
  const { setOrderId, openModal, orderIdFilter, page, type, setLoading, setStartEndDate } =
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

  const { data, isLoading, refetch } = useOrder({ ...filterParams, page });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {isLoading ? (
          <div className="flex items-center justify-center " >
            <FaSpinner size={40} className="animate-spin" />
          </div>
        ) : (
          data?.data.map(
            (
              card: {
                density: string;
                documentnumber: string;
                etadate: string | null;
                createddate: string | null;
                id: string;
                weight: string;
              },
              index: number,
            ) => (
              <DashboardCard
                key={`${card.documentnumber || 'card'}-${index}`}
                ETAdata={card.etadate || '-'}
                OrderIdprops={card.documentnumber}
                Quantity={Number(card.weight)}
                Volume={Number(card.density)}
                Weight={String(card.weight)}
                onClick={() => {
                  setOrderId("33541");
                  openModal();
                  setStartEndDate({ start: card.createddate, end: card.etadate });
                }}
              />
            ),
          )
        )}
      </div>
      <Pagination dataLength={data?.data.length || 0} />
      <OrderDetailsModal />
    </div>
  );
}
