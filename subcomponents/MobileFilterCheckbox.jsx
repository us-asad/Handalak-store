import { useRouteChanger } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react'
import { BiX } from 'react-icons/bi';

export default function MobileFilterCheckbox({ name, items, indexName, listItemClassNames, filterNameClassNames, filterValueClassNames }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const changeRoute = useRouteChanger();

  const handleFilter = () => {
    const elements = formRef.current.elements;
    const formResults = [...elements].map(item => item.checked);

    const itemNames = items.filter((_, i) => formResults[i]).join(",");
    const query = {...router.query};

    if (itemNames)
      query[indexName] = itemNames;
    else delete query[indexName];
    
    changeRoute(query);
    setOpen(false)
  }

  return (
    <>
      <li
        onClick={() => setOpen(true)}
        className={listItemClassNames}
      >
        <p className={filterNameClassNames}>{name}</p>
        <p className={filterValueClassNames}>
          {router.query[indexName] || "Ko'rsatilmagan"}
        </p>
      </li>
      <div className={`w-full rounded-t-3xl z-50 fixed left-0 right-0 bg-white px-4 py-6 duration-500 ease-in-out border border-black ${open ? "bottom-0" : "-bottom-[150vh]"}`}>
        <div className='w-full bg-white px-2 py-1 flex items-center justify-between'>
          <p className='font-bold text-xl text-c-gray-6 capitalize'>{name}</p>
          <button onClick={() => setOpen(false)}>
            <BiX className='flex items-center justify-center text-[28px] text-gray-400 cursor-pointer' />
          </button>
        </div>
        <form
          ref={formRef}
          className='grid grid-cols-1 gap-y-4 px-2 py-4'
        >
          {items?.map(item => (
            <label key={item} className='flex items-center'>
              <input
                type="checkbox"
                name={item}
                defaultChecked={router.query[indexName]?.includes(item)}
                className='form-checkbox h-5 sm:h-6 w-5 sm:w-6 text-green-500 border-2 border-solid border-gray-300 focus:outline-none'
              />
              <p className='text-gray-800 text-base sm:text-lg font-font-550 ml-4'>{item}</p>
            </label>
          ))}
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
        className={`fixed top-0 left-0 w-full z-[40] h-screen bg-[#00000060] ${open ? "block" : "hidden"}`}
      />
    </>
  )
}
