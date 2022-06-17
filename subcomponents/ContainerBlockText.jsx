import Link from 'next/link'
import React from 'react'
import { BiChevronRight } from 'react-icons/bi'

export default function ContainerBlockText({ name, destination }) {
  return (
    <div>
      <div className='flex items-center justify-between'>
          <h3 className='md:text-gray-800 text-lg font-bold whitespace-nowrap md:text-4xl md:font-medium leading-9 md:mb-6'>{name}</h3>
          <Link href={destination}>
            <a className='text-[13px] md:text-sm text-blue-500 md:text-red font-semibold md:font-medium whitespace-nowrap flex items-center uppercase'>
              <span>HAMMASINI KO&lsquo;RISH</span>
              <BiChevronRight className='text-2xl hidden md:block' />
            </a>
          </Link>
        </div>
    </div>
  )
}
