import Link from 'next/link';
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { FaRegHeart } from 'react-icons/fa';
import { UserIcon, ChartIcon } from 'subcomponents/Icons';
import { Logo, LanguageSelect, SearchForm } from 'subcomponents';
import CategoryBtn from 'subcomponents/CategoryBtn';
import { useEffect, useState } from 'react';

const maxScrollSize = 300;
const smallIconClassName = "text-xs font-medium py-1 px-1.5 rounded-lg absolute -top-[11px] right-[12px] bg-black text-white";

export default function HeaderBottom() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, []);

  return (
    <>
      <div className={`${scrollY > maxScrollSize && "fixed fixed-header bg-white z-40 top-0 w-full shadow-md"}`}>
        <div className={`w-full md:flex hidden justify-between items-center py-4 font-raleway transition-transform duration-300 custom-container mx-auto`}>
          <Logo src={scrollY > maxScrollSize ? "/logo-red.png" :"/logo.png"} />
          <div className='flex items-center w-full ml-0 mr-4  md:ml-8 md:mr-8'>
            <CategoryBtn changeStyles={scrollY > maxScrollSize} />
            <SearchForm changeStyles={scrollY > maxScrollSize} />
          </div>
          <div className={`h-full w-max flex gap-4 items-center ${scrollY > maxScrollSize ? "text-black" : "text-white"}`}>
            <button className='flex flex-col items-center font-medium text-base focus:outline-none'>
              <UserIcon color={scrollY > maxScrollSize ? "black" : ""} />
              <span className='hidden lg:block mt-2'>Kirish</span>
            </button>
            <Link href="/">
              <a className='lg:flex flex-col items-center font-medium text-base relative ml-8 hidden'>
                <ChartIcon color={scrollY > maxScrollSize ? "black" : ""} />
                <span className='mt-2'>Taqqoslash</span>
                <span className={smallIconClassName}>1</span>
              </a>
            </Link>
            <Link href="/">
              <a className='lg:flex flex-col items-center font-medium text-base relative mx-8 hidden'>
                <FaRegHeart className='text-[22px]' />
                <span className='mt-2'>Sevimlilar</span>
                <span className={smallIconClassName}>1</span>
              </a>
            </Link>
            <Link href="/">
              <a className='flex flex-col items-center font-medium text-base relative'>
                <FiShoppingBag className='text-[22px]' />
                <span className='hidden lg:block mt-2'>Savatcha</span>
                <span className={smallIconClassName}>1</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex md:hidden items-center justify-between py-1 px-8 space-x-5'>
        <SearchForm changeStyles={scrollY > maxScrollSize} />
        <LanguageSelect />
      </div>
    </>
  )
}
