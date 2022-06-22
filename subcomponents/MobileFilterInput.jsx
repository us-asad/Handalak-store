import { useRouteChanger } from 'hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useRef } from 'react';
import { BiX } from 'react-icons/bi';

export default function MobileFilterInput({ filterValueClassNames, listItemClassNames, filterNameClassNames }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const changeRoute = useRouteChanger();

  const handleFilter = () => {
    const { min_price: { value: min_price }, max_price: { value: max_price } } = formRef.current.elements;
    const query = { ...router.query };

    if (min_price)
      query.min_price = min_price;
    else delete query.min_price;

    if (max_price)
      query.max_price = max_price;
    else delete query.max_price;

    changeRoute(query);
    setOpen(false);
  }

  return (
    <>
      <li
        onClick={() => setOpen(true)}
        className={listItemClassNames}
      >
        <p className={filterNameClassNames}>Narx</p>
        <p className={filterValueClassNames}>
          Dan: {router.query.min_price || 0} so&lsquo;m / gacha: {router.query.max_price || 0} so&lsquo;m
        </p>
      </li>
      <div className={`w-full rounded-t-3xl z-50 fixed left-0 right-0 bg-white px-4 py-6 duration-500 ease-in-out border border-black ${open ? "bottom-0" : "-bottom-[150vh]"}`}>
        <div className='w-full bg-white px-2 py-1 flex items-center justify-between'>
          <p className='font-bold text-xl text-c-gray-6'>Narx</p>
          <button onClick={() => setOpen(false)}>
            <BiX className='flex items-center justify-center text-[28px] text-gray-400 cursor-pointer'/>
          </button>
        </div>
        <form
          ref={formRef}
          className='grid grid-cols-2 gap-x-2 px-2 py-4'
        >
          <label className='bg-gray-100 rounded-xl py-2 px-4 mr-2 w-full flex justify-center flex-col'>
            <p className='text-gray-500 font-bold text-sm sm:text-base'>Dan</p>
            <input
              type="number"
              name="min_price"
              defaultValue={router.query.min_price || ""}
              className='w-full text-gray-800 text-sm sm:text-base font-bold bg-transparent outline-none'
              placeholder="0 so'm"
            />
          </label>
          <label className='bg-gray-100 rounded-xl py-2 px-4 mr-2 w-full flex justify-center flex-col'>
            <p className='text-gray-500 font-bold text-sm sm:text-base'>Gacha</p>
            <input
              type="number"
              name="max_price"
              defaultValue={router.query.max_price || ""}
              className='w-full text-gray-800 text-sm sm:text-base font-bold bg-transparent outline-none'
              placeholder="500 000 so'm"
            />
          </label>
        </form>
        <div className='grid grid-cols-2 gap-x-2'>
          <button
            onClick={() => setOpen(false)}
            className='w-full bg-gray-100 p-3 rounded-xl text-gray-800 font-bold text-sm sm:text-base'
          >Orqaga</button>
          <button
            onClick={handleFilter}
            className='w-full bg-red p-3 rounded-xl text-white font-bold text-sm sm:text-base'
          >Saqlash</button>
        </div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className={`fixed top-0 left-0 w-full h-screen bg-[#00000060] ${open ? "block" : "hidden"}`}
      />
    </>
  )
}
