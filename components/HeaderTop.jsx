import React, { useState } from 'react'
import { FiPercent } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import Link from 'next/link';
import { Logo, LanguageSelect } from 'subcomponents';
import { ChartIcon } from 'subcomponents/Icons';
import { FaRegHeart } from 'react-icons/fa';
import CategoryBtn from 'subcomponents/CategoryBtn';
import { CallModal } from "components";

export default function HeaderTop() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='border-b-[1px] border-[#68386b] md:block hidden'>
        <div className='mx-auto flex items-center justify-between py-2 custom-container'>
          <div className='flex items-center'>
            <LanguageSelect />
            <Link href='/'>
              <a className='flex items-center border-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full ml-4 lg:ml-7 mr-4 bg-red text-white font-raleway'>
                <FiPercent className='w-5 h-5' />
                <span className='ml-2'>Chegirmalar</span>
              </a>
            </Link>
            <Link href='/'>
              <a className='flex items-center border-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-white bg-green-400 font-raleway'>
                <span>Muddatli to&lsquo;lov</span>
              </a>
            </Link>
          </div>
          <div className='flex items-center'>
            <ul className='flex items-center justify-between text-white text-base font-normal font-raleway gap-4'>
              <li className='md:block hidden'>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Bizga qo&lsquo;shiling
                </a>
              </li>
              <li>
                <Link href="/">
                  <a>Yordam</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Sayt haritasi</a>
                </Link>
              </li>
              <li>
                <a
                  href="tel:+998712022021"
                  rel="noreferrer"
                  target="_blank"
                  className='hidden xl:block font-bold text-base text-white '
                >
                  +998 (71) 202 20 21
                </a>
              </li>
              <li
                onClick={() => setShowModal(true)}
                className='lg:p-2 lg:border-2 border-solid rounded-lg w-max cursor-pointer'
              >
                <BsTelephone className='w-6 h-6 lg:hidden' />
                <span className='text-base font-medium hidden lg:block'>Qo&lsquo;ng&lsquo;iroq qilishni so&lsquo;rash</span>
              </li>
            </ul>
          </div>
        </div>
        {showModal && <CallModal setShowModal={setShowModal} />}
      </div>
      <div className='md:hidden flex justify-between items-center pt-5 pb-3 bg-white px-5'>
        <div className="flex items-center">
          <CategoryBtn />
          <Logo src="/logo-red.png" />
        </div>
        <div className='flex items-center'>
          <Link href="/">
            <a className='font-medium text-base text-white'>
              <FiPercent className='text-[22px]' color="red" />
            </a>
          </Link>
          <Link href="/">
            <a className='font-medium text-base relative mx-5 text-white'>
              <FaRegHeart className='text-[22px]' color="red" />
              <span className='text-white text-xs font-medium py-0.5 px-1 rounded-lg absolute -top-[11px] -right-[10px] bg-red'>1</span>
            </a>
          </Link>
          <Link href="/">
            <a className='font-medium text-base relative text-white'>
              <ChartIcon className='text-[22px]' color="red" />
              <span className='text-white text-xs font-medium py-0.5 px-1 rounded-lg absolute -top-[11px] -right-[10px] bg-red'>1</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
