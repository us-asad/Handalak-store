import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { CompareBtn, HeartBtn, ShareBox, ShareBtn } from 'subcomponents';

export default function MobileProductCard(props) {
  const [isVisible, setIsVisible] = useState(false)
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: 'hover',
    placement: 'right',
    closeOnOutsideClick: false,
    visible: isVisible,
  })

  const { name, discount, image, monthlyPay, price: totlaPrice, slug, category, delivery, className } = props;
  const price = totlaPrice - (totlaPrice * (discount / 100));

  return (
    <div className='relative'>
      <Link href={`/product/${slug}`}>
        <a className='inset-0 absolute' />
      </Link>
      <div className='grid grid-cols-3 gap-x-2 p-3 border bg-white rounded-xl border-gray-300'>
        <div className='my-auto col-span-1'>
          <Image
            src={image[0]?.url}
            alt={name}
            width={129}
            height={129}
          />
        </div>
        <div className='pl-3 pt-4 col-span-2'>
          <Link href={`/category/${category?.slug}`}>
            <a className='relative text-gray-400 line-clamp-1 font-semibold hover:text-dc-red-1 router-link-active'>{category?.name}</a>
          </Link>
          <div className='absolute top-2 right-4'>
            <HeartBtn />
          </div>
          <div className='absolute bottom-2 right-12'>
            <div
              ref={setTriggerRef}
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
              className='bg-white rounded-full'
            >
              <ShareBtn className="after:w-[30px] after:h-[30px] after:block after:absolute after:-top-[4px] after:-left-[7px]" />
            </div>
            {visible && (
              <div
                ref={setTooltipRef}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                {...getTooltipProps({ className: 'tooltip-container' })}
                className='absolute z-[11] -top-[9px] left-[28px] transition duration-200'
              >
                <ShareBox setIsVisible={setIsVisible} />
              </div>
            )}
          </div>
          <div className='absolute bottom-2 right-2'>
            <CompareBtn color="black" />
          </div>
          <p className='text-base leading-snug text-black font-medium mt-1 mb-2 line-clamp-3'>
            {name}
          </p>
          <p className='font-bold text-lg text-black leading-6 line-clamp-1 w-1/2'>
            {price} so&lsquo;m
          </p>
        </div>
      </div>
    </div>
  )
}
