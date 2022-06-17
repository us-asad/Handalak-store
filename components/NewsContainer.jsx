import { SplideSlide } from '@splidejs/react-splide';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import SplideSlider from './SpliteSlider';

const splideOptions = {
  rewind: true,
  loop: true,
  pagination: false,
  perPage: 3,
  breakpoints: {
    1024: {
      perPage: 2
    },
    768: {
      perPage: 1
    }
  }
};

export default function NewsContainer({ news }) {
  return (
    <div className='flex my-8 mb-40 relative flex-col w-full'>
      <div className='flex items-baseline justify-between'>
        <h3 className='text-gray-900 text-[26px] md:text-4xl font-bold md:font-medium md:mb-4'>Yangiliklar</h3>
        <Link href="/blog">
          <a className='flex md:hidden text-[13px] text-red font-semibold whitespace-nowrap items-center'>
            <span>Hammasini o&lsquo;qish</span>
            <BiChevronRight className='text-[26px]' />
          </a>
        </Link>
      </div>
      <SplideSlider options={splideOptions}>
        {news?.map(item => (
          <SplideSlide key={item?.slug}>
            <Link href={`/blog/${item?.slug}`}>
              <a className='flex flex-col rounded-lg p-4 cursor-pointer relative transform group'>
                <h4 className='text-gray-900 text-lg font-semibold mt-4 group-hover:text-red h-14 line-clamp-2'>{item?.title}</h4>
                <div className='text-gray-700 text-base font-medium line-clamp-8 mb-8 mt-2 h-48 pb-2'>
                  {item?.excerpt}
                </div>
                <span className='text-black text-base font-bold absolute bottom-0 right-2 text-right flex'>
                  {moment(item?.createdAt).format('DD.MM.YYYY')}
                </span>
              </a>
            </Link>
          </SplideSlide>
        ))}
      </SplideSlider>
      <Link href="/blog">
        <a className='items-center text-red text-xl font-semibold mt-6 w-max hidden md:flex'>
          <span>Hammasini o&lsquo;qish</span>
          <BiChevronRight className='text-[30px]' />
        </a>
      </Link>
    </div>
  )
}
