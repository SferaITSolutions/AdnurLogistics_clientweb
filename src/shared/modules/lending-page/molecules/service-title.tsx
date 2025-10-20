import React from 'react'


export default function ServiceTitle({ classNameDy }: { classNameDy?: string }) {
  return (
    <div className=''>
      <div className='flex gap-3'>
        <h1 className='text-5xl text-black'>Sizga kerak bo‘lgan </h1>
        <h2 className='text-red-600 text-5xl'> HAMMA</h2>
      </div>
      <h2 className='text-5xl text-black'>narsa bizda bor!</h2>
    </div>
  )
}
