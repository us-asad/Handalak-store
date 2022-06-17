import React, { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";
import Link from 'next/link';

export default function DetailItem({ category }) {
  const [openDetails, setOpenDetails] = useState(false);

  const detailsToggle = e => {
    e.preventDefault();
    setOpenDetails(prev => !prev)
  }

  return (
    <li className='mb-4'>
      <details
        open={openDetails}
        onClick={detailsToggle}
      >
        <summary className='flex justify-between items-center text-lg font-bold h-15 pl-4 pr-5 py-3 leading-tight rounded-lg bg-gray-100'>
          <span>{category?.name}</span>
          <FiChevronDown className={`text-red text-[27px] ${openDetails ? "rotate-180" : ""}`} />
        </summary>
        <ul className='px-3 mt-7'>
          {category?.categories1?.map(subcategory => (
            <li key={subcategory?.slug} className="mb-1.5">
              <Link href={`/category/${category?.slug}/${subcategory?.slug || ""}`}>
                <a className='font-bold mb-1.5 hover:text-red'>{subcategory?.name}</a>
              </Link>
              <ul className='mt-1'>
                {subcategory?.categories2?.map(subcategory2 => (
                  <li key={subcategory2?.slug} className="">
                    <Link href={`/category/${category?.slug}/${subcategory?.slug}/${subcategory2?.slug || ""}`}>
                      <a className='font-normal hover:text-red'>{subcategory2?.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </details>
    </li>
  )
}
