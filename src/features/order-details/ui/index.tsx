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
import { FaExclamationCircle } from 'react-icons/fa';

const YandexMapWith = dynamic(
  async () => {
    return (await import('../molecules/MapWithRoute')).default;
  },
  { ssr: false },
);

const OrderDetailsModal: React.FC = () => {
  const { isModalOpen, closeModal, orderId, startEndDate, statusOfInvoice, totalPrice, setStartEndDate } = useOrderDetailsStore();

  const t = useTranslations('clientDashboard');
  const tr = useTranslations('yandexMap');
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
  // console.log(orderData, "readMap");

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
              statusProps={statusOfInvoice}
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
                {/* <Empty description={t('unpaid')} /> */}
                <div className="group relative w-full max-w-[220px]">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative p-4 rounded-xl bg-white border border-red-200/60 shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow shadow-red-500/30">
                        <FaExclamationCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                        {tr("toBePaid")}
                      </span>
                    </div>

                    {/* Amount */}
                    <span className="block text-xl font-bold text-black">
                      {Number(totalPrice || 0).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}$
                    </span>
                  </div>
                </div>

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
