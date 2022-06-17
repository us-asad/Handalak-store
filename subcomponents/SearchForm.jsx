import Link from 'next/link';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchForm({ changeStyles }) {
  return (
    <form className={`overflow-hidden md:rounded-full md:border-2 w-full rounded-lg flex items-center bg-gray-100 md:bg-white ${changeStyles ? "md:border-black" : "md:border-white"}`}>
      <input type="search" placeholder='Olchada qidiring...' className='flex overflow-hidden bg-white  md:py-2 md:px-3 md:rounded-full outline-none text-black bg-transparent w-full' />
      <Link href="/">
        <a className={`lg:px-7 cursor-pointer md:px-4 text-[21px] h-[41px] flex items-center justify-center ${changeStyles ? "md:bg-black" : "md:bg-red"}`}>
          <FiSearch className='text-gray-500 md:text-white' />
        </a>
      </Link>
    </form>
  )
}
