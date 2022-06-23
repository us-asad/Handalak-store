import { checkCookies, getCookie } from 'cookies-next';
import { getFormattedPrice } from 'data';
import { getProductsById } from 'data/graphql';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { FiCopy } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addItems } from 'redux/basketSlice';
import CartProduct from 'subcomponents/CartProduct';

export default function Cart({ products }) {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.basket);

  useEffect(() => {
    if (products && !items.length)
      dispatch(addItems({products, items}))

    console.log("i fire once")
  }, []);
console.log(items, "itemss")
  return (
    <div className='custom-container mx-auto'>
      {products.length
        ? (
          <div className='mx-12 mb-12 overflow-hidden grid xl:grid-cols-5 grid-cols-1 gap-x-24 2xl:gap-x-40 xl:w-full items-start justify-around'>
            <div className='w-full leading-5 col-span-3'>
              <h1 className='text-black text-4xl mt-2.5 mb-10 font-semibold'>Savatda {items.length} mahsulot</h1>
              <div>
                <hr className='bg-gray-300' />
                {products.map(prd => <CartProduct key={prd?.slug} {...prd} />)}
              </div>
            </div>
            <div className='w-full mt-20 mb-10 xl:mb-0 col-span-2'>
              <div className='py-8 px-6 rounded-3xl border border-solid border-gray-300 h-full'>
                <div className='relative rounded-full border-2 border-solid border-gray-800 shadow-1'>
                  <input
                    type="text"
                    placeholder='Promo - kodni kiriting'
                    className='py-4 px-7 outline-none bg-transparent text-base font-semibold'
                  />
                  <button
                    className='bg-red text-[26px] text-white py-3 px-6 cursor-pointer rounded-r-full absolute right-0 top-0 h-full flex items-center justify-center'
                  >
                    <FiCopy />
                  </button>
                </div>
                <ul className='mt-7 mb-5 w-full text-gray-800 text-base font-semibold'>
                  <li className='flex justify-between items-center mb-2'>
                    <p>Narxi:</p>
                    <p>{getFormattedPrice(323434)} so&apos;m</p>
                  </li>
                  <li className='flex justify-between items-center mb-2'>
                    <p>Chegirmada:</p>
                    <p>{getFormattedPrice(323434)} so&apos;m</p>
                  </li>
                  <li className='flex justify-between items-center mb-2'>
                    <p>Cupon:</p>
                    <p>{getFormattedPrice(323434)} so&apos;m</p>
                  </li>
                </ul>
                <hr className='bg-gray-400' />
                <div className='flex justify-between w-full mt-4 mb-7 text-gray-800 font-bold text-2xl'>
                  <p>Jami:</p>
                  <p>{getFormattedPrice(23444432)} so&apos;m</p>
                </div>
                <button
                  className='text-white font-semibold uppercase bg-red rounded-full p-4 w-full'
                >
                  BUYURTMANI RASMIYLASHTIRISH
                </button>
              </div>
            </div>
          </div>
        )
        : (
          <div className='flex flex-col justify-center items-center my-20 mx-4'>
            <Image
              src="/empty_basket.png"
              alt="Empty Basket"
              width={280}
              height={240}
            />
            <h1 className='text-gray-700 md:text-3xl text-2xl my-4'>
              Savatchangiz b&apos;oshmi? Muammo y&apos;oq!
            </h1>
            <p className='text-gray-300 md:text-xl text-sm'>
              Bizning katalogimizdan keng assortimentidan mahsulot tanlashni boshlang.
            </p>
            <Link href="/">
              <a className='w-80 text-white opacity-80 text-center hover:opacity-100 bg-red focus:outline-none md:w-96 py-4 rounded-lg leading-4 text-base font-bold mt-10 mb-4'>
                Asosiy saxifaga
              </a>
            </Link>
          </div>
        )
      }
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const options = { req, res };
  const prdIds = checkCookies("basket", options) ? JSON.parse(getCookie("basket", options)) : [];
  const products = await getProductsById(prdIds);

  return {
    props: {
      products
    }
  }
}