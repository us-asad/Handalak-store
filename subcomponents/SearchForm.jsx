import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

export default function SearchForm({ changeStyles }) {
  const [result, setResult] = useState([]);
  const [value, setValue] = useState("");
  const router = useRouter();

  const submitSearch = e => {
    e.preventDefault();
    if (value)
      router.push(`/search?q=${value}`);
  }

  useEffect(() => {
    if (!value)
      setResult([]);
    else if (value) {
      const fetchResultData = async () => {
        const searchResult = await axios.get(`/api/search?q=${value}`);
        setResult(searchResult.data);
      }
      fetchResultData()
    }
  }, [value]);

  return (
    <form
      onSubmit={submitSearch}
      className={`relative md:rounded-full md:border-2 w-full rounded-lg flex items-center bg-gray-100 md:bg-white ${changeStyles ? "md:border-black" : "md:border-white"}`}
    >
      <input
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Olchada qidiring...'
        className='flex overflow-hidden bg-white  md:py-2 md:px-3 md:rounded-full outline-none text-black bg-transparent w-full'
      />
      <button className={`lg:px-7 cursor-pointer rounded-r-full md:px-4 text-[21px] h-[41px] flex items-center justify-center ${changeStyles ? "md:bg-black" : "md:bg-red"}`}>
        <FiSearch className='text-gray-500 md:text-white' />
      </button>
      {result?.length && value
        ? (
          <div className='absolute z-[40] top-[43.1px] left-0 w-full bg-white text-black p-4 text-center rounded-[6px] shadow-1'>
            <div className='overflow-y-auto max-h-96'>
              {result?.map(item => (
                <Link key={item?.slug} href={`/product/${item?.slug}`}>
                  <a className='flex items-center group pl-4 cursor-pointer text-gray-700 hover:bg-gray-200'>
                    <Image
                      src={item?.image[0].url}
                      alt={item?.name}
                      width={42}
                      height={42}
                    />
                    <p className='ml-4 pr-4 py-4 w-full border-b relative flex justify-between items-center border-gray-200'>
                      <span className='capitalize-first text-sm font-medium lowercase'>{item?.name}</span>
                      <BsArrowRight className='fill-current text-gray-400 group-hover:text-red' />
                    </p>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
    </form>
  );
}
