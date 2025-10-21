import React from 'react'
import Image from 'next/image'
import fonImage from '@/assets/images/client/fon-Image.png'
export default function FonImage() {
  return (
    <div >

        <Image src={fonImage} alt="fon"className='w-full h-full object-cover !mt-[]' />
    </div>
  )
}
