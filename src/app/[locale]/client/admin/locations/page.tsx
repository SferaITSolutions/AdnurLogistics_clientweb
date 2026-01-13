"use client"
import LocationsUi from '@/shared/modules/location/ui'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

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
    <div className='container'><LocationsUi/></div>
  )
}
