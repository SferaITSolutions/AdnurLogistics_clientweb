import React from 'react'

export const SideText = ({ text }: { text: string }) => {
  return (
    <div className="text-sm text-gray-500">
      {text}
    </div>
  )
}
