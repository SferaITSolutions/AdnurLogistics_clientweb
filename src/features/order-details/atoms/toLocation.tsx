import { useTranslations } from 'next-intl';
import React from 'react'

export default function toLocation({ to }: { to: string }) {
  const t = useTranslations('LendingPage.applyModal.fields.toLocation');
  return (
    <div className="flex flex-col items-center text-center flex-1">
    <span className="text-xs text-gray-500">{t('label')}:</span>
    <span className="font-semibold text-gray-800 text-base">{to}</span>
  </div>
  )
}
