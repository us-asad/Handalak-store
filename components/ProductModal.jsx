import { SplideSlide } from '@splidejs/react-splide';
import { getFormattedPrice, getRating } from 'data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { BiX } from 'react-icons/bi';
import { BsFillStarFill } from 'react-icons/bs';
import { MdNavigateNext } from "react-icons/md";
import { CompareFullBtn, ProductVarieties } from 'subcomponents';
import SplideSlider from './SpliteSlider';

export default function ProductModal({ toggleModal, product, price }) {
  const { name, subtitle, discount, image, monthlyPay, price: totlaPrice, slug, comments, warrantyPeriod } = product;
  const [mainImgs, setMainImgs] = useState(image);

  return (
    <>
      <div
        onClick={toggleModal}
        className='fixed top-0 left-0 w-screen h-screen z-50 bg-[#ff000057] custom-transition'
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
              <ul className='flex space-x-1'>
                {[...Array(5)].map((_, i) => (
                  <li key={i} className='text-[19px]'>
                    <BsFillStarFill className={i + 1 > getRating(comments) ? "text-gray-300" : "text-red"} />
                  </li>
                ))}
              </ul>
              <p className='text-gray-800 text-base font-medium'>{comments.length} {comments.length > 1 ? "sharhlar" : "sharh"}</p>
              <CompareFullBtn />
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
                {discount && discount > 0 && <p className='text-red text-base font-medium line-through'>{getFormattedPrice(totlaPrice)} so&lsquo;m</p>}
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
            <div className='grid grid-cols-3 gap-x-4'>
              <button className='bg-red hover:bg-white text-white hover:text-red py-2 px-4 rounded-full border border-red border-solid text-sm font-bold'>
                Savatchaga qo&lsquo;shish
              </button>
              <button className='bg-green-500 hover:bg-white text-white hover:text-green-500 py-2 px-4 rounded-full border border-green-500 border-solid text-sm font-bold'>
                Bo&lsquo;lib to&lsquo;lash
              </button>
              <button className='bg-gray-800 hover:bg-white text-white hover:text-gray-800 py-2 px-4 rounded-full border border-gray-800 border-solid text-sm font-bold'>
                Bir klikda sotib olish
              </button>
            </div>
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
