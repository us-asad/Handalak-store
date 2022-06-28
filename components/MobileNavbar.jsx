import { mobile_navitems } from 'data'
import Link from 'next/link'
import React from 'react'
import { AiOutlineAppstore } from 'react-icons/ai';
import { FiHome, FiShoppingBag } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { UserIcon } from 'subcomponents/Icons';

export default function MobileNavbar() {
  const { basket } = useSelector(state => state.storeProduct);

  return (
    <ul className='z-[50] flex md:hidden items-center justify-between text-center text-sm px-4 pb-2 bg-white fixed bottom-0 left-0 right-0 pt-2'>
      {mobile_navitems.map(({ slug, name, icon }) => (
        <li key={slug}>
          <Link href={slug}>
            <a className='text-gray-600'>
              <div className='h-9 flex justify-center items-center text-[20px]'>
                {{
                  "home": <FiHome />,
                  "apps": <AiOutlineAppstore className='text-[24px]' />,
                  "basket": (
                    <div className='relative'>
                      <FiShoppingBag />
                      {basket.length
                        ? <span className='absolute -top-[12px] -right-[20px]  bg-red rounded-full text-sm px-[7px] text-white'>{basket.length}</span>
                        : null
                      }
                    </div>
                  ),
                  "user": <UserIcon color="#4b5563" />
                }[icon]}
              </div>
              <span className='font-extrabold'>{name}</span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
