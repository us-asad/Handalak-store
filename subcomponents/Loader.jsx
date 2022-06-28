import React from 'react'

const loaderClassName = "animate-loader w-[18px] h-[18px] bg-red rounded-full inline-block"

export default function Loader() {
  return (
    <div className='flex justify-center items-center space-x-1 fixed w-full h-full top-0 left-0 bg-white bg-opacity-80 z-[999]'>
      <span
        className={loaderClassName}
        style={{ animationDelay: "-.32s" }}
      />
      <span
        className={loaderClassName}
        style={{ animationDelay: "-.16s" }}
      />
      <span className={loaderClassName} />
    </div>
  )
}
