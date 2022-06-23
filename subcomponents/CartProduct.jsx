import { getDiscountedPrice, getFormattedPrice } from 'data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineMinus } from 'react-icons/ai'
import { BiX } from 'react-icons/bi'
import { HiOutlinePlusCircle } from 'react-icons/hi'

export default function CartProduct({ name, quantity, price, discount, id, slug, image }) {
  return (
    <div>
      <div className='flex justify-between items-center py-5'>
        <Link href={`/product/${slug}`}>
          <a>
            <Image
              src={image[0]?.url}
              alt={name}
              width={64}
              height={64}
            />
          </a>
        </Link>
        <p className='text-gray-800 md:text-sm text-xs font-semibold w-1/3'>{name}</p>
        <div className='flex border-2 border-solid border-gray-800 rounded-full py-2 pl-4 pr-2 shadow-1 ml-4'>
          <AiOutlineMinus className='text-gray-400 w-[16px] h-[24px]' />
          <p className='text-gray-800 font-semibold text-base mx-6'>{quantity}</p>
          <HiOutlinePlusCircle className='text-red w-[22px] h-[24px]' />
        </div>
        <div className='flex flex-col mx-4 items-center'>
          <p className='text-base font-bold'>{getFormattedPrice(getDiscountedPrice(price))}</p>
          <p className='text-red text-sm font-semibold line-through'>{getFormattedPrice(price)}</p>
        </div>
        <button className='cursor-pointer'>
          <BiX className='text-[28px] text-gray-300' />
        </button>
      </div>
      <hr className='bg-gray-300' />
    </div>
  )
}
