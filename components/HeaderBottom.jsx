import Link from 'next/link';
import { FiShoppingBag } from "react-icons/fi";
import { FaRegHeart } from 'react-icons/fa';
import { UserIcon, ChartIcon } from 'subcomponents/Icons';
import { Logo, LanguageSelect, SearchForm } from 'subcomponents';
import CategoryBtn from 'subcomponents/CategoryBtn';
import { useEffect, useState } from 'react';
import { LoginModal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { HiLogout } from 'react-icons/hi';
import { signOutAccount } from 'redux/slices/user';
import { toggleModal } from 'redux/slices/toggleModal';

const maxScrollSize = 300;
const smallIconClassName = "text-xs font-medium py-1 px-1.5 rounded-lg absolute -top-[11px] right-[12px] bg-black text-white";

export default function HeaderBottom() {
  const [scrollY, setScrollY] = useState(0);
  const dispatch = useDispatch();
  const {
    user: { user, loading },
    storeProduct: { savedPrds, comparedPrds, basket },
    toggleModal: { cabinetDropDown }
  } = useSelector(state => state);

  const handleSignOut = () => {
    dispatch(toggleModal(["cabinetDropDown", false]))
    dispatch(signOutAccount());
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, []);

  return (
    <>
      <div className={`${scrollY > maxScrollSize && "fixed fixed-header bg-white z-40 top-0 w-full shadow-md"}`}>
        <div className={`w-full md:flex hidden justify-between items-center py-4 font-raleway transition-transform duration-300 custom-container mx-auto`}>
          <Logo src={scrollY > maxScrollSize ? "/logo-red.png" : "/logo.png"} />
          <div className='flex items-center w-full ml-0 mr-4  md:ml-8 md:mr-8'>
            <CategoryBtn changeStyles={scrollY > maxScrollSize} />
            <SearchForm changeStyles={scrollY > maxScrollSize} />
          </div>
          <div className={`h-full w-max flex gap-4 items-center ${scrollY > maxScrollSize ? "text-black" : "text-white"}`}>
            <div className="relative">
              <button
                onClick={() => dispatch(toggleModal([user?.email ? "cabinetDropDown" : "loginModal", true, false]))}
                disabled={loading}
                className='flex flex-col items-center font-medium text-base focus:outline-none cursor-pointer'
              >
                <UserIcon color={scrollY > maxScrollSize ? "black" : ""} />
                <span className='hidden lg:block mt-2'>{
                  loading ? "Yuklanmoqda" : user ? "Kabinet" : "Kirish"
                }</span>
              </button>
              {cabinetDropDown && (
                <>
                  <div className='shadow-1 px-6 py-4 rounded-lg absolute top-full right-0 bg-white text-black z-50 w-max grid grid-cols-1 gap-y-2 cursor-auto'>
                    <div className='mb-4 text-left'>
                      <p>Assalomu aleykum,</p>
                      <b>{user?.name}</b>
                    </div>
                    <ul className='grid grid-cols-1 gap-y-4 text-gray-800 font-medium text-sm lg:text-[17px]'>
                      <li>
                        <Link href="/cabinet">
                          <a
                            onClick={() => toggleModal(["cabinetDropDown", false])}
                            className='flex items-center space-x-2'
                          >
                            <UserIcon className="w-6" color="#1f2937" />
                            <span>Shaxsiy kabinet</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/cabinet/orders">
                          <a className='flex items-center space-x-2'>
                            <FiShoppingBag className="w-6 text-[20px]" />
                            <span>Mening buyurtmalarim</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleSignOut}
                          className='flex items-center space-x-2 text-red cursor-pointer'
                        >
                          <HiLogout className="w-6 text-[20px]" />
                          <span>Saytdan chiqish</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
            <div
              onClick={() => dispatch(toggleModal(["cabinetDropDown", false]))}
              className={`fixed top-0 left-0 w-full h-full z-[49] bg-transparent cursor-auto ${cabinetDropDown ? "block" : "hidden"}`}
            />
            <Link href="/compare">
              <a className='lg:flex flex-col items-center font-medium text-base relative ml-8 hidden'>
                <ChartIcon color={scrollY > maxScrollSize ? "black" : ""} />
                <span className='mt-2'>Taqqoslash</span>
                {comparedPrds?.length ? <span className={smallIconClassName}>{comparedPrds?.length}</span> : null}
              </a>
            </Link>
            <Link href="/">
              <a className='lg:flex flex-col items-center font-medium text-base relative mx-8 hidden'>
                <FaRegHeart className='text-[22px]' />
                <span className='mt-2'>Sevimlilar</span>
                {savedPrds?.length ? <span className={smallIconClassName}>{savedPrds?.length}</span> : null}
              </a>
            </Link>
            <Link href="/cart">
              <a className='flex flex-col items-center font-medium text-base relative'>
                <FiShoppingBag className='text-[22px]' />
                <span className='hidden lg:block mt-2'>Savatcha</span>
                {basket?.length ? <span className={smallIconClassName}>{basket?.length}</span> : null}
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex md:hidden items-center justify-between py-1 px-8 space-x-5'>
        <SearchForm changeStyles={scrollY > maxScrollSize} />
        <LanguageSelect />
      </div>
      <LoginModal />
    </>
  )
}
