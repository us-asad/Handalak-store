import { SplideSlide } from '@splidejs/react-splide';
import { SplideSlider } from 'components';
import { getDiscountedPrice, getFormattedPrice } from 'data/functions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi';
import { usePopperTooltip } from 'react-popper-tooltip';
import { ProductVarieties, ShareBox } from 'subcomponents';
import { DeliveryTruck, ShareIcon } from 'subcomponents/Icons';
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { FaRegHeart } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import { BsChevronRight } from 'react-icons/bs';
import { ProductDetails } from 'containers';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckOutSession } from 'data/api';
import { changeStoredProductState } from 'redux/slices/storeProduct';

const splideOptions = {
  rewind: true,
  loop: true,
  arrows: false,
  pagination: true
}

export default function MobileProductPage({
  mainImgs,
  setMainImgs,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
  } = usePopperTooltip({
    trigger: 'hover',
    placement: 'top',
    closeOnOutsideClick: false,
    visible: isVisible
  });
  const router = useRouter();
  const {
    product: { name, discount, price, slug, category, delivery, subtitle, manufacturer, warrantyPeriod, id },
    product,
    user: { user },
    storeProduct: { basket }
  } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => router.back()}
        className='block p-5 text-[22px] text-gray-500'
      >
        <HiArrowLeft />
      </button>
      <ul className='flex items-center pl-4 mb-2.5 font-semibold'>
        <li className='line-clamp-1'>
          <Link href="/">
            <a className='text-red'>Bosh sahifa</a>
          </Link>
        </li>
        <span className='px-1 text-gray-900'>/</span>
        <li className='line-clamp-1'>
          <Link href={`/category/${category?.slug}`}>
            <a className='text-red'>{category?.name}</a>
          </Link>
        </li>
        <span className='px-1 text-gray-900'>/</span>
        <li className='line-clamp-1'>
          <Link href={`/manufacturer/${manufacturer?.slug}`}>
            <a className='text-red'>{manufacturer?.name}</a>
          </Link>
        </li>
      </ul>
      <div className='mb-10'>
        <SplideSlider images={mainImgs} options={splideOptions}>
          {mainImgs?.map(img => (
            <SplideSlide key={img.url}>
              <div className='grid place-content-center'>
                <Image
                  src={img?.url || "/loading.gif"}
                  alt={name}
                  width={340}
                  height={340}
                />
              </div>
            </SplideSlide>
          ))}
        </SplideSlider>
      </div>
      <div className='space-y-4'>
        <div className='flex items-center'>
          <Link href={`/category/${category?.name}`}>
            <a className='text-gray-500 line-clamp-1 font-semibold text-lg'>
              {category?.name}
            </a>
          </Link>
          <button
            ref={setTriggerRef}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            className='flex items-center justify-center cursor-pointer text-red space-x-2 ml-2 relative after:w-[30px] after:h-[30px] after:block after:absolute after:top-0 after:-right-[10px]'
          >
            <ShareIcon />
            <span>Ulashish</span>
          </button>
          {isVisible && (
            <div
              ref={setTooltipRef}
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
              {...getTooltipProps({ className: 'tooltip-container' })}
              className='absolute z-[11] -top-[9px] left-[28px]'
            >
              <ShareBox setIsVisible={setIsVisible} />
            </div>
          )}
        </div>
        <h1 className='font-bold text-2xl text-black'>{name}</h1>
        <ProductVarieties setMainImgs={setMainImgs} />
        <div className='flex flex-col-reverse sm:flex-row sm:items-center font-bold'>
          <p className='text-black text-4xl sm:mr-4'>{getFormattedPrice(getDiscountedPrice(price, discount))} so&lsquo;m</p>
          {discount
            ? <p className='text-red line-through text-2xl'>{getFormattedPrice(price)} so&lsquo;m</p>
            : null
          }
        </div>
        <div className='flex items-center justify-start mb-2'>
          <IoMdCheckmarkCircleOutline className='text-green-500 text-[20px]' />
          <p className='font-medium text-black text-base leading-5 ml-2'>Mahsulot omborda mavjud</p>
        </div>
        <div className='w-max flex items-center rounded-lg bg-gray-200'>
          {delivery === "fast" && (
            <div className='w-8 h-8 flex items-center justify-center rounded-lg bg-black overflow-hidden'>
              <DeliveryTruck />
            </div>
          )}
          <p className='text-sm sm:text-base text-black font-medium leading-5 mx-3'>
            {{
              "fast": "24 soat ichida tezkor etkazib berish",
              "normally": "Manzilga qarab 4 soatdan 2 ish kunigacha yetkazib beriladi"
            }[delivery]}
          </p>
        </div>
        <div className='py-4'>
          <button
            onClick={() => createCheckOutSession(user, [{ ...product, purchaseQty: 1 }], null, `/product/${slug}`)}
            className='w-full border border-gray-600 text-base font-extrabold leading-5 text-black focus:outline-none rounded-lg py-3 px-4 shadow-1'
          >
            Bir klikda sotib olish
          </button>
        </div>
        <div className='space-y-4'>
          <p className='font-bold text-lg text-black leading-6'>Mahsulot haqida qisqacha</p>
          <p className='text-base leading-5 text-gray-700 py-2'>Kafolat muddati (oy): {warrantyPeriod}</p>
          <p className='text-base leading-5 text-gray-500 py-2 break-words'>
            {subtitle}
          </p>
        </div>
        <div className='font-semibold'>
          <div className='flex items-center -ml-4'>
            <button
              onClick={() => dispatch(changeStoredProductState(["savedPrds", id]))}
              className='ml-4 flex items-center justify-center py-2 w-1/2 rounded-lg border-0 focus:outline-none bg-gray-100 text-gray-900'
            >
              <FaRegHeart className='text-red ' />
              <span className='text-base leading-5 ml-2'>Sevimlilarga</span>
            </button>
            <button
              onClick={() => dispatch(changeStoredProductState(["comparedPrds", id]))}
              className='ml-4 flex items-center justify-center py-2 w-1/2 rounded-lg border-0 focus:outline-none bg-gray-100 text-gray-900'
            >
              <FiCopy className='text-red ' />
              <span className='text-base leading-5 ml-2'>Taqqoslash</span>
            </button>
          </div>
          <Link href={`/manufacturer/${manufacturer?.slug}`}>
            <a className='mt-4 flex items-center justify-center space-x-1 py-2 rounded-lg bg-gray-100 focus:outline-none'>
              <span>Barcha mahsulotlar {manufacturer?.name}</span>
              <span className='flex items-center'>
                <BsChevronRight className='text-[10px]' />
              </span>
            </a>
          </Link>
        </div>
      </div>
      <ProductDetails />
      <div className='fixed w-full z-20 left-0 right-0 bg-white pb-2 pt-4 bottom-[70px]'>
        <div className='custom-container mx-auto'>
          <button
            onClick={() => dispatch(changeStoredProductState(["basket", id]))}
            className='w-full bg-red text-sm font-bold leading-5 text-white focus:outline-none rounded-lg py-1.5 px-2 text-center'
          >Savatga {basket.includes(id) ? "qo'shish" : "o'tish"}</button>
        </div>
      </div>
    </div>
  )
}
