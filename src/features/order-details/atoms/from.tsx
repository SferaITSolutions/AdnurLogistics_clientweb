import React from 'react'

export default function From({ from }: { from: string }) {
  return (
    <div className="flex flex-col items-center text-center flex-1">
    <span className="text-xs text-gray-500">Dan:</span>
    <span className="font-semibold text-gray-800 text-base">{from}</span>
  </div>
  )
}
