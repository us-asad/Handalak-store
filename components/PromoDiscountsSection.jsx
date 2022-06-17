import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PromoDiscountsSection({ promosDiscounts }) {
  return (
    <div className='flex mb-10 mt-14 gap-4 custom-scroll justify-between flex-col md:flex-row'>
      {promosDiscounts?.map(discount => (
        <Link key={discount?.destination} href={`/${discount?.destination}`}>
          <a>
            <Image
              src={discount?.image?.url}
              alt={discount?.name}
              width={380}
              height={132}
              objectFit="contain"
              className='rounded-xl'
            />
          </a>
        </Link>
      ))}
    </div>
  )
}
