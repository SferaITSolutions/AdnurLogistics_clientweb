"use client";
import React from 'react'
import { useTranslations } from 'next-intl';

export default function OrderId({ OrderId }: { OrderId: string }) {
  const t = useTranslations("clientDashboard");
  return <div>
    {t("orderId")}
    <span className="font-semibold">{OrderId}</span>
  </div>
}
