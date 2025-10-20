import React from 'react'
import { LocationCard } from '../atoms/location-card'
import { locationConstants } from '@/shared/constants'

export default function LocationCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10 px-6 bg-[#C9D6E8] rounded-4xl'>
        {locationConstants.map((location) => (
            <LocationCard key={location.id} location={location} />
        ))}
    </div>
  )
}
