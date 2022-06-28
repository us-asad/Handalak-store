import { SplideSlide } from '@splidejs/react-splide';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { SplideSlider } from 'components';
import { Blog } from 'subcomponents';

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
            <Blog {...item} />
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
