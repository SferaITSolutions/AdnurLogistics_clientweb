'use client';

import { Drawer, Empty, Spin } from 'antd';

import { useOrderById } from '@/entities/hooks/order/hooks';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { StatusProductTitle } from '../atoms';
import { useOrderDetailsStore } from '../lib/store';
import DeliviryStatus from '../molecules/deliviry';
import InvoiceCard from '../molecules/invoices';

const YandexMapWith = dynamic(
  async () => {
    return (await import('../molecules/MapWithRoute')).default;
  },
  { ssr: false },
);

const OrderDetailsModal: React.FC = () => {
  const { isModalOpen, closeModal, orderId, startEndDate, setStartEndDate } = useOrderDetailsStore();
  const t = useTranslations('clientDashboard');
  const { data, isLoading } = useOrderById(orderId || '');
  const orderData = data?.data;

  useEffect(() => {
    if (orderData?.readMap?.createddate && orderData.readMap.createddate !== startEndDate.start) {
      setStartEndDate({ 
        start: orderData.readMap.createddate, 
        end: startEndDate.end 
      });
    }
  }, [orderData?.readMap?.createddate]);

  if (isLoading) return <Spin />;
  console.log(orderData?.readMap, "readMap");
  
  return (
    <Drawer
      title={`${t('orderDetails')}${orderId ? ` - ${orderId}` : ''}`}
      placement="right"
      onClose={closeModal}
      open={isModalOpen}
      width={520}
      className="!p-0"
      maskClosable
    >
      <div className="p-6 space-y-4">
        {orderId ? (
          <>
            <YandexMapWith
              origin={orderData?.readMap?.fromlocation ?? ''}
              destination={orderData?.readMap?.tolocation ?? ''}
              startDate={startEndDate?.start}
              endDate={startEndDate?.end}
              statusProps={orderData?.invoiceStatus}
            />
            <div className="text-gray-800 mb-2 text-xl font-bold border-t border-gray-100 pt-4">
              <DeliviryStatus deliviryStatus={orderData?.readMap || {}} />
            </div>
            <div className="grid grid-cols-2 gap-3"></div>
            <StatusProductTitle title={t('productDetails')} />

            {/* {orderData?.products ? (
              orderData?.products?.map((product: any, index: number) => (
                <Products
                  key={`${product.documentNumber || 'prod'}-${index}`}
                  productData={product}
                />
              ))
            ) : (
              <Empty description={t('noProductsFound')} />
            )} */}

            {orderData?.invoices ? (
              orderData?.invoices?.map((invoice: any, index: number) => (
                <InvoiceCard
                  key={`${invoice.documentNumber || 'inv'}-${index}`}
                  amountPaid={invoice.amountPaid}
                  amountRemaining={invoice.amountRemaining}
                  invoiceNumber={invoice.invoiceNumber}
                  invoiceStatus={invoice.invoiceStatus}
                  invoiceTotalAmount={invoice.invoiceTotalAmount}
                  documentNumber={invoice.documentNumber}
                  currency={invoice.currency}
                />
              ))
            ) : (
              <>
                <Empty description={t('unpaid')} />
              </>
            )}
          </>
        ) : (
          <div className="text-gray-400">{t('noOrderSelected')}</div>
        )}
      </div>
    </Drawer>
  );
};

export default OrderDetailsModal;
