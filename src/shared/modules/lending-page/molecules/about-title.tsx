"use client"
import { useTranslations } from 'next-intl';
import React from 'react'


export default function AboutTitle({ classNameDy }: { classNameDy?: string }) {
  const t = useTranslations("LendingPage.about");  
  return (
    <div className=''>
      <h1 className='text-white heading-title-size'>{t("titleHead")}</h1>
      <h2 className='text-red-600 heading-title-size'>{t("titleRed")}</h2>
      <h2 className='text-white heading-title-size'>{t("titleFooter")}</h2>
    </div>
  )
}
