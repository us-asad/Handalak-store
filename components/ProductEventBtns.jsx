import React from 'react'

export default function ProductEventBtns({ short }) {
  return (
    <div className={`grid gap-x-4 ${short ? "grid-flow-col auto-cols-max" : "grid-cols-3"}`}>
      <button className='bg-red hover:bg-white text-white hover:text-red py-2 px-4 rounded-full border border-red border-solid text-sm font-bold'>
        Savatchaga qo&lsquo;shish
      </button>
      <button className='bg-green-500 hover:bg-white text-white hover:text-green-500 py-2 px-4 rounded-full border border-green-500 border-solid text-sm font-bold'>
        Bo&lsquo;lib to&lsquo;lash
      </button>
      <button className='bg-gray-800 hover:bg-white text-white hover:text-gray-800 py-2 px-4 rounded-full border border-gray-800 border-solid text-sm font-bold'>
        Bir klikda sotib olish
      </button>
    </div>
  );
}
