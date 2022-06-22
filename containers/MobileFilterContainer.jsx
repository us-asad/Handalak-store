import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { BiX } from 'react-icons/bi';
import { MobileFilterInput } from 'subcomponents';
import MobileFilterCheckbox from 'subcomponents/MobileFilterCheckbox';

const listItemClassNames = "flex justify-between items-center py-4 cursor-pointer";
const filterNameClassNames = "font-bold text-sm sm:text-base text-gray-800 capitalize";
const filterValueClassNames = "font-bold text-sm sm:text-base text-orange-600 line-clamp-1";
const filterItemsProps = { listItemClassNames, filterNameClassNames, filterValueClassNames };

export default function MobileFilterContainer({ showFilter, setShowFilter, allArrangedVrts, manufacturers }) {
  const router = useRouter();

  return (
    <div className={`w-full z-50 h-full top-0 fixed bg-white duration-500 ease-in-out ${showFilter ? "right-0" : "-right-full"}`}>
      <div className='py-5 px-5 bg-white flex justify-between items-center font-bold'>
        <div className='flex space-x-4 items-center'>
          <button
            onClick={() => setShowFilter(false)}
            className='flex items-center py-1 text-gray-300'
          >
            <BiX className='text-[28px]' />
          </button>
          <p className='font-bold text-2xl text-gray-800'>Filtr</p>
        </div>
        <Link href={router.asPath.split("?")[0]} scroll={false} shallow>
        <a className='focus:outline-none text-xs sm:text-sm text-red font-bold'>
          Filtrni o&lsquo;chirish
        </a>
        </Link>
      </div>
      <ul className='px-4 overflow-auto max-h-[70vh] divide-y divide-gray-200'>
        <MobileFilterInput {...filterItemsProps} />
        <MobileFilterCheckbox name="Brend" {...filterItemsProps} items={manufacturers} indexName="brands" />
        {Object.keys(allArrangedVrts)?.map(key => <MobileFilterCheckbox key={key} name={key} items={allArrangedVrts[key]} indexName={key} {...filterItemsProps} />)}
      </ul>
      <div className='bg-white absolute bottom-0 w-full'>
        <button
          onClick={() => setShowFilter(false)}
          className='block w-[90vw] mx-auto bg-red my-6 p-3 rounded-xl text-white font-bold text-sm sm:text-base'
        >Mahsulotlarni ko&lsquo;rsatish</button>
      </div>
    </div>
  )
}
