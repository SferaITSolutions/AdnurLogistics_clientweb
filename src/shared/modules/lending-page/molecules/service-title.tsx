"use client"
import { useTranslations } from 'next-intl';
import React from 'react'


export default function ServiceTitle({ classNameDy }: { classNameDy?: string }) {
  const t = useTranslations("LendingPage.services");
  return (
    <div className=''>
      <div className='flex gap-3'>
        <h1 className='heading-title-size text-black text-xl'>{t("title1")}</h1>
        <h2 className='text-red-600 heading-title-size text-xl'>{t("title2")}</h2>
      </div>
      <h2 className='heading-title-size text-black text-xl'>{t("title3")}</h2>
    </div>
  )
}
