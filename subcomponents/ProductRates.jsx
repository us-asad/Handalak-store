import { getRating } from 'data/functions'
import React from 'react'
import { BsFillStarFill } from 'react-icons/bs'

export default function ProductRates({ small, rates = null, comments }) {
  return (
    <ul className='flex space-x-1'>
      {[...Array(5)].map((_, i) => (
        <li key={i} className={small ? "text-sm" : "text-[19px]"}>
          <BsFillStarFill className={i + 1 > (rates || getRating(comments || [])) ? "text-gray-300" : "md:text-red text-yellow-600"} />
        </li>
      ))}
    </ul>
  )
}
