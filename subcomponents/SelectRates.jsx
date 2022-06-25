import React from 'react'
import { BsFillStarFill } from 'react-icons/bs'

export default function SelectRates({ rates, setRates }) {
  return (
    <ul className='flex space-x-1'>
      {[...Array(5)].map((_, i) => (
        <li
          onClick={() => setRates(i + 1)}
          key={i}
        >
          <BsFillStarFill className={i + 1 > rates ? "text-gray-300" : "md:text-red text-yellow-600"} />
        </li>
      ))}
    </ul>
  )
}
