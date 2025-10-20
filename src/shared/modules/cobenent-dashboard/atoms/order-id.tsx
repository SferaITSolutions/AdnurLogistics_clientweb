import React from 'react'

export default function OrderId({ OrderId }: { OrderId: string }) {
  return <div>
  Buyurtma ID:{" "}
  <span className="font-semibold">{OrderId}</span>
</div>
}
