"use client"
import { useGetSelesOrders } from '@/entities/hooks/sales-manager/hooks'
import SalesOrderFilters from '@/shared/modules/sales-manager/ui/filters'
import SalesOrdersList from '@/shared/modules/sales-manager/ui/List'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function SalesManager() {
  const role = localStorage.getItem("roleName")
  const router = useRouter();
  const t = useTranslations("common");
  // const {data} = useGetSelesOrders({
  //   page: 0,
  //   userNumber: "12345",
  //   search: +0
  // })
  useEffect(() => {
    const rolename = role
    if (rolename !== "ROLE_CONTROLLER") {
      router.replace("/403");
    }
  }, [router,role]);
  return (
    <div className='container'>
      <title>
        Sales manager | sales orders
      </title>
      <h1 className='text-2xl !font-bold !mb-6'>{t("salesManager")}</h1>
      <SalesOrderFilters/>
      <SalesOrdersList />
    </div>
  )
}
