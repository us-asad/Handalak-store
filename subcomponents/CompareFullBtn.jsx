import React from 'react'
import { FiCopy } from 'react-icons/fi'

export default function CampareFullBtn() {
  return (
    <button className='flex items-center justify-center text-gray-400'>
      <FiCopy />
      <p className='text-base font-semibold ml-3'>Taqqoslashga qo&lsquo;shish</p>
    </button>
  )
}
