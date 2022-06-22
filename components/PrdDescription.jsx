import React from 'react'
import parser from "html-react-parser";

export default function PrdDescription({ description }) {
  return (
    <div className='descr'>
      {description
        ? parser(description.html || "")
        : <p className='font-bold text-center text-xl leading-6 text-black'>Tavsifi mavjud emas</p>
      }
    </div>
  )
}
