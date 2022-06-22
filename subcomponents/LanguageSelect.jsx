import React, { useState } from 'react'
import Image from 'next/image'
import { TiArrowSortedDown } from 'react-icons/ti';
import { languages } from "data";

export default function LanguageSelect() {
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <div
      className='relative text-left flex items-center md:text-white text-red w-[100px] md:w-auto'
      onBlur={() => setShowLanguages(false)}
    >
      <button
        className='font-medium flex items-center'
        onClick={() => setShowLanguages(prev => !prev)}
      >
        <div className="mr-1.5 font-normal flex items-end">
          <Image
            src="/uz-flag.svg"
            alt="uzbekistan flag"
            width={32}
            height={24}
          />
        </div>
        <span className='font-raleway'>O&lsquo;zb</span>
        <TiArrowSortedDown className='w-[14px] h-[14px] mx-1.5 md:block hidden' />
      </button>
      {showLanguages && (
        <ul className="absolute drop-shadow-xl py-2 px-4 rounded-lg top-full -left-[17px] bg-white w-max z-40">
          {languages.map(language => (
            <li key={language.code} className='flex text-black items-end'>
              <div className='mr-1.5 font-normal flex items-center'>
                <Image
                  src="/uz-flag.svg"
                  alt="uzbekistan flag"
                  width={32}
                  height={24}
                />
              </div>
              <span className='font-raleway'>{language.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
