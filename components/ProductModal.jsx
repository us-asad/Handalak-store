import { SplideSlide } from '@splidejs/react-splide';
import { getFormattedPrice } from 'data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { BiX } from 'react-icons/bi';
import { MdNavigateNext } from "react-icons/md";
import { CompareFullBtn, ProductVarieties, ProductRates } from 'subcomponents';
import { ProductEventBtns, SplideSlider } from 'components';

export default function ProductModal({ toggleModal, product, price }) {
  const { name, subtitle, discount, image, monthlyPay, price: totlaPrice, slug, comments, warrantyPeriod, id, quantity } = product;
  const [mainImgs, setMainImgs] = useState(image);

  return (
    <>
      <div
        onClick={toggleModal}
        className='fixed top-0 left-0 w-screen h-screen z-50 !m-0 bg-[#ff000057] custom-transition'
      />
      <div className='fixed top-0 left-0 h-screen w-[88vw] z-[51] mx-auto bg-white overflow-y-auto py-16 px-8 translate-x-[6vw]'>
        <button
          onClick={toggleModal}
          className='w-[42px] h-[42px] absolute top-3 right-5 text-[30px] hover:text-white hover:bg-blue-400 rounded-full grid place-content-center'
        >
          <BiX />
        </button>
        <div>
          <div className='px-8 py-4 md:px-0 w-10/12'>
            <h3 className='text-black text-3xl mb-2 text-left'>{name}</h3>
            <div className='grid grid-flow-col auto-cols-max gap-4'>
              <ProductRates comments={comments} />
              <p className='text-gray-800 text-base font-medium'>{comments.length} {comments.length > 1 ? "sharhlar" : "sharh"}</p>
              <CompareFullBtn id={id} />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 border-t'>
          <div className='md:col-span-2 xl:col-span-1 xl:border-r py-2'>
            <SplideSlider className="w-[490px] mx-auto" images={image} options={{ rewind: true, loop: true }}>
              {mainImgs?.map((item, i) => (
                <SplideSlide key={`${item?.url}_${i}`}>
                  <div className="w-full h-[490px]">
                    <Image
                      src={item?.url}
                      alt={name}
                      layout="fill"
                      objectFit='contain'
                    />
                  </div>
                </SplideSlide>
              ))}
            </SplideSlider>
          </div>
          <div className='md:col-span-2 xl:col-span-1 flex flex-col justify-between pt-2'>
            <div className='grid grid-cols-1 gap-y-2 items-baseline w-96'>
              <div className='flex items-center'>
                <p className='text-gray-900 text-[30px] font-bold mr-2.5'>{getFormattedPrice(price)} so&lsquo;m</p>
                {discount ? <p className='text-red text-base font-medium line-through'>{getFormattedPrice(totlaPrice)} so&lsquo;m</p> : null}
              </div>
              <p className='text-gray-400 text-base font-medium'>{monthlyPay && `${getFormattedPrice(monthlyPay?.monthlyPrice)} so'mdan/oyiga`}</p>
              <div>
                <p className='font-bold text-lg text-black leading-6'>Mahsulot haqida qisqacha</p>
                <p className='text-base leading-5 text-gray-600 py-2'>Kafolat muddati (oy): {warrantyPeriod}</p>
                <p className='break-words text-base leading-5 text-gray-500 py-2'>{subtitle}</p>
              </div>
              <ProductVarieties {...product} setMainImgs={setMainImgs} />
            </div>
          </div>
          <div className='md:col-span-2 xl:col-span-1 xl:col-start-2'>
            {quantity
              ? <ProductEventBtns id={id} toggleModal={toggleModal} />
              : (
                <div className='flex items-center gap-x-4'>
                  <p className='text-red text-base font-medium uppercase'>OMBORDA MAVJUD EMAS</p>
                  <button className='bg-red text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded-full focus:outline-none border text-sm'>Oldindan buyurtma berish</button>
                </div>
              )
            }
          </div>
          <Link href={`/product/${slug}`}>
            <a className='md:col-span-2 xl:col-span-1 xl:col-start-2 pl-3 py-5 xl:border-t pr-10 text-red flex items-center'>
              <span>MAHSULOT HAQIDA BATAFSIL</span>
              <MdNavigateNext className='text-[25px]' />
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
