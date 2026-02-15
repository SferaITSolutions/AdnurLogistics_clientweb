"use client"
import NewsUi from '@/shared/modules/news-modules/ui/news-ui';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function News() {
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
        Admin | News
      </title>
      <NewsUi/>
      </div>
  )
}
