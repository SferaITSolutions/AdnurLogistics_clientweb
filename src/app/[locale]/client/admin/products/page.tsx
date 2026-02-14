"use client"
import DirectionsPage from '@/shared/modules/directions/ui';
import PricesUi from '@/shared/modules/prices/ui/Index'
import ProductsPage from '@/shared/modules/products/ui/products-ui';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Locations() {
  const role = localStorage.getItem("roleName")
  const router = useRouter();

  useEffect(() => {
    const rolename = role
    if (rolename !== "ROLE_SUPER_ADMIN") {
      router.replace("/403");
    }
  }, [router,role]);

  return (
    <div className='container'>
      <title>
        Admin | products
      </title>
      <ProductsPage/>
    </div>
  )
}
