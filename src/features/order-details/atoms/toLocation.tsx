import React from 'react'

export default function toLocation({ to }: { to: string }) {
  return (
    <div className="flex flex-col items-center text-center flex-1">
    <span className="text-xs text-gray-500">Ga:</span>
    <span className="font-semibold text-gray-800 text-base">{to}</span>
  </div>
  )
}
