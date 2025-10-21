import React from 'react'


export default function ServiceTitle({ classNameDy }: { classNameDy?: string }) {
  return (
    <div className=''>
      <div className='flex gap-3'>
        <h1 className='md:text-5xl text-black text-xl'>Sizga kerak bo‘lgan </h1>
        <h2 className='text-red-600 md:text-5xl text-xl'> HAMMA</h2>
      </div>
      <h2 className='md:text-5xl text-black text-xl'>narsa bizda bor!</h2>
    </div>
  )
}
