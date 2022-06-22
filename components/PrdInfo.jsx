import React from 'react'

export default function PrdInfo({ features }) {
  return (
    <ul className='w-full relative'>
      {features.map((item, i) => (
        <li
          className='relative w-full mb-3 flex items-baseline'
          key={i}
        >
          <p className='bg-white text-base font-medium text-gray-500 pr-2 w-max'>{item?.feature}</p>
          <div className='h-px bg-gray-200 w-full' />
          <p className='bg-white text-base font-medium text-gray-800 pl-2 text-right w-max'>{item?.featureName}</p>
        </li>
      ))}
    </ul>
  )
}
