import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import SplideSlider from './SpliteSlider';
import { SplideSlide } from '@splidejs/react-splide';

const splideOptions = {
  rewind: true,
  loop: true,
  pagination: false,
  perPage: 9,
  breakpoints: {
    1400: {
      perPage: 7
    },
    1024: {
      perPage: 5
    }
  }
};

export default function CategoriesCarousel({ autoContainer }) {
  const { categories } = useSelector(state => state.main);

  return (
    <div className={autoContainer ? "custom-container mx-auto" : ""}>
      <div className='hidden md:block my-4 min-h-[138px]'>
        <div className='relative'>
          <SplideSlider options={splideOptions}>
            {categories?.map(category => (
              <SplideSlide key={category?.slug}>
                <Link href={`/category/${category?.slug || ""}`}>
                  <a className='w-[148px] px-2 flex flex-col items-center'>
                    <Image
                      src={category?.image?.url}
                      alt={category?.name}
                      width={60}
                      height={50}
                    />
                    <span className='text-gray-700 text-tiny font-medium leading-5 mt-2 text-center'>{category?.name}</span>
                  </a>
                </Link>
              </SplideSlide>
            ))}
          </SplideSlider>
        </div>
      </div>
      <div className='block md:hidden'>
        <div className='flex mb-2 justify-between items-baseline pr-2'>
          <p className='text-lg font-bold whitespace-nowrap mr-1'>Kategoriyalar</p>
          <Link href="/category">
            <a className='font-semibold text-blue-500 text-[14px]'>Hammasini ko&lsquo;rish</a>
          </Link>
        </div>
        <div className='grid grid-rows-3 gap-x-10 gap-5 grid-flow-col auto-cols-max md:auto-cols-min overflow-x-scroll'>
          {categories?.map(category => (
            <Link key={category?.slug} href={`/category/${category?.slug}`}>
              <a className='flex w-80 items-center bg-gray-100 rounded-lg pl-4 py-2'>
                <Image
                  src={category?.image?.url}
                  alt={category?.name}
                  width={60}
                  height={60}
                  objectFit="contain"
                />
                <span className='text-base text-gray-700  pr-4 pl-4 font-medium'>{category?.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
