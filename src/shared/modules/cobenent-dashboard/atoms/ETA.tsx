"use client";
import React from 'react'
import { useTranslations } from 'next-intl';

export default function ETA({ ETA }: { ETA: string }) {
  const t = useTranslations("clientDashboard");
  return (
    <div>{t("eta")} <span className="font-semibold">{ETA}</span></div>
  )
}
