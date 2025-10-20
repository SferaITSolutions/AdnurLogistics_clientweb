import { QuantityOrderProps } from '@/shared/types/props';
import React from 'react'



export default function QuantityOrder({ Quantity, Weight, Volume }: QuantityOrderProps) {
  return (
    <div>
      {Quantity} ta |{" "}
      <span className="font-semibold">{Weight} kg</span> |{" "}
      <span className="font-semibold">{Volume} m³</span>
    </div>
  );
}

