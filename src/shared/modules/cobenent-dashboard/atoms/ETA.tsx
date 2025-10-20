import React from 'react'

export default function ETA({ ETA }: { ETA: string }) {
  return (
    <div>ETA: <span className="font-semibold">{ETA}</span></div>
  )
}
