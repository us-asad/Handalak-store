import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { FilterCheckbox, FilterInput } from 'subcomponents';

export default function FilterBox({ type, name, items, indexKey }) {
  const [opened, setOpened] = useState(false);

  return (
    <details
      onToggle={() => setOpened(prev => !prev)}
      className="overflow-hidden"
      open
    >
      <summary className='flex justify-between mb-4 cursor-pointer'>
        <p className='text-gray-800 font-bold text-xl capitalize'>{name}</p>
        <FiChevronDown className={`text-red text-[24px] transition duration-200 ${opened && "rotate-180"}`} />
      </summary>
      {type === "price"
        ? (
          <div className='grid grid-cols-1 gap-y-2'>
            <div className='grid grid-cols-2'>
              <p className='ml-2.5 mr-1.5 text-gray-500 text-base font-medium'>Dan</p>
              <p className='ml-2.5 mr-1.5 text-gray-500 text-base font-medium'>Gacha</p>
            </div>
            <div className='grid grid-cols-2 w-full rounded border border-solid border-gray-200'>
              <FilterInput name="min_price" />
              <FilterInput name="max_price" />
            </div>
          </div>
        ) : type === "checkbox"
          ? (
            <ul className='flex-col flex'>
              {items?.sort()?.map(item => (
                <li key={item}>
                  <FilterCheckbox name={item} indexKey={indexKey} />
                </li>
              ))}
            </ul>
          ) : <></>
      }
    </details>
  );
}
