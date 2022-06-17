import React from 'react'
import { FaRegHeart } from 'react-icons/fa'

export default function HeartBtn() {
  return (
    <button className='outline-none bg-white rounded-full border-0'>
      <FaRegHeart className='text-red' />
    </button>
  )
}
