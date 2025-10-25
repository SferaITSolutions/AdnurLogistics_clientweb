"use client"
import { useTranslations } from 'next-intl';
import React from 'react'


export default function AwarehouseTitle({ classNameDy }: { classNameDy?: string }) {
  const t = useTranslations("LendingPage.warehouses");
  return (
    <div className=''>
      <h1 className='text-5xl text-black heading-title-size'>{t("china")}</h1>
    </div>
  )
}
