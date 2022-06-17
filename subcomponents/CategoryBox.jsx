import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryBox({ boxDetails }) {
  return (
    <Link href={`/${boxDetails?.starterSlug}/${boxDetails?.slug || ""}`}>
      <a className='rounded-lg cursor-pointer flex flex-col items-center p-4 shadow-1 overflow-hidden'>
        <Image
          src={boxDetails?.image?.url}
          alt={boxDetails?.name}
          width={200}
          height={200}
          objectFit="contain"
        />
        <p>{boxDetails?.name}</p>
      </a>
    </Link>
  )
}
