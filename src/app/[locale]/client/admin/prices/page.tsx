"use client"
import PricesUi from '@/shared/modules/prices/ui/Index'
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Prices() {
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
        Admin | Prices
      </title>
      <PricesUi/>
    </div>
  )
}
