import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HoveredBox({ name, imageUrl, destination, height, imgClassName, smallScale }) {
  return (
    <Link href={destination}>
      <a
        className='flex flex-col items-center justify-between min-w-[144px] lg:w-auto h-24 p-4 overflow-hidden bg-white border bg-opacity-70 rounded-2xl group relative'
        style={{height: height}}
      >
        <div className='flex items-center justify-center'>
          <div className={`relative mb-1 transform transition duration-500 ease-in-out ${smallScale ? "group-hover:scale-110" : "group-hover:scale-150"} ${imgClassName}`}>
            <Image
              src={imageUrl}
              alt={`${name} Handalak`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <p className='text-gray-700 text-center text-tiny font-medium leading-5 mt-2'>{name}</p>
        <div className='absolute inset-0 bg-gray-600 opacity-0 duration-500 group-hover:opacity-20' />
      </a>
    </Link>
  )
}
