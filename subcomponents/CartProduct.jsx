import { getDiscountedPrice, getFormattedPrice } from 'data/functions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineMinus } from 'react-icons/ai'
import { BiX } from 'react-icons/bi'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { changeQty, removeItem } from 'redux/slices/basket'
import { removeBasketPrd } from 'redux/slices/storeProduct'

export default function CartProduct({ name, purchaseQty, price, discount, id, slug, image }) {
  const dispatch = useDispatch();

  const removeFromBasket = () => {
    dispatch(removeItem(id));
    dispatch(removeBasketPrd(id));
  }

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
          <AiOutlineMinus
            onClick={() => dispatch(changeQty({id}))}
            className='text-gray-400 w-[16px] h-[24px]'
          />
          <p className='text-gray-800 font-semibold text-base mx-6'>{purchaseQty}</p>
          <HiOutlinePlusCircle
            onClick={() => dispatch(changeQty({id, add: true}))}
            className='text-red w-[22px] h-[24px]'
          />
        </div>
        <div className='flex flex-col mx-4 items-center'>
          <p className='text-base font-bold'>{getFormattedPrice(getDiscountedPrice(price, discount))}</p>
          {discount ? <p className='text-red text-sm font-semibold line-through'>{getFormattedPrice(price)}</p> : null}
        </div>
        <button
          onClick={removeFromBasket}
          className='cursor-pointer'
        >
          <BiX className='text-[28px] text-gray-300' />
        </button>
      </div>
      <hr className='bg-gray-300' />
    </div>
  )
}
