"use client";
import React from 'react'

export default function StatusProductTitle({ title }: { title: string }) {
  return (<div key={title} className="text-gray-800 mb-2 text-xl font-bold border-t border-gray-100 pt-4">
    {title}
  </div>
  )
}
