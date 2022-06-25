import axios from 'axios';
import { checkCookies, getCookie } from 'cookies-next';
import { getDiscountedPrice, getFormattedPrice } from 'data';
import { getProductsById } from 'data/graphql';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { FiCopy } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addItems } from 'redux/basketSlice';
import CartProduct from 'subcomponents/CartProduct';
import { Spinner } from 'subcomponents/Icons';
import { loadStripe } from "@stripe/stripe-js";
import { EmptyCart } from 'components';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

const getCuponValue = (error, loading, success, cupon) => ({ error, loading, success, cupon });

export default function Cart({ products }) {
  const dispatch = useDispatch();
  const { basket: { items }, user: { user } } = useSelector(state => state);
  const [{ error, success, loading, cupon }, setCuponResult] = useState(getCuponValue("", false, "", null));
  const amount = items.reduce((result, prd) => result + getDiscountedPrice(prd.price, prd.discount) * prd.purchaseQty, 0);
  const totalAmount = getDiscountedPrice(amount, cupon?.percentOff);
  const cuponRef = useRef(null);

  useEffect(() => {
    if (products)
      dispatch(addItems(products.map(({ name, image, price, discount, id, quantity, slug }) => ({ name, image, price, discount, id, quantity, slug }))));
  }, [products]);

  const checkCupon = async () => {
    const code = cuponRef.current.value;
    if (!code)
      return setCuponResult(getCuponValue("Iltimos cupon codeini kiriting!", false, "", null));

    setCuponResult(getCuponValue("", true, "", null));
    const result = await axios.get(`/api/check-cupon?code=${code}`);
    const cupon = result?.data?.cupon;

    if (!cupon) {
      setCuponResult(getCuponValue("Cupon mavjud emas!", false, "", null));
    } else if (cupon?.count < 1) {
      setCuponResult(getCuponValue("Cupon muddati tugagan", false, "", null));
    } else {
      setCuponResult(getCuponValue("", false, `${cupon?.code} kodi -${cupon?.percentOff}% tuhfa qildi!`, cupon));
    }
    console.log(result);
  }

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/create-stripe-session', {
      email: user?.email,
      items,
      cupon: cupon || {percentOff: 0, code: null, count: 0}
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className='custom-container mx-auto'>
      {items.length
        ? (
          <div className='mx-12 mb-12 overflow-hidden grid xl:grid-cols-5 grid-cols-1 gap-x-24 2xl:gap-x-40 xl:w-full items-start justify-around'>
            <div className='w-full leading-5 col-span-3'>
              <h1 className='text-black text-4xl mt-2.5 mb-10 font-semibold'>Savatda {items.length} mahsulot</h1>
              <div>
                <hr className='bg-gray-300' />
                {items.map(prd => <CartProduct key={prd?.slug} {...prd} />)}
              </div>
            </div>
            <div className='w-full mt-20 mb-10 xl:mb-0 col-span-2'>
              <div className='py-8 px-6 rounded-3xl border border-solid border-gray-300 h-full'>
                <div className='relative rounded-full border-2 border-solid border-gray-800 shadow-1'>
                  <input
                    type="text"
                    ref={cuponRef}
                    placeholder='Promo - kodni kiriting'
                    className='py-4 px-7 outline-none bg-transparent text-base font-semibold'
                  />
                  <button
                    onClick={checkCupon}
                    className='bg-red text-[26px] text-white py-3 px-6 cursor-pointer rounded-r-full absolute right-0 top-0 h-full flex items-center justify-center'
                  >
                    {loading
                      ? <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      : <FiCopy />
                    }
                  </button>
                </div>
                {(!loading && error || success) && <p className={`pl-8 mt-2 ${error ? "text-red" : "text-green-500"}`}>{error || success}</p>}
                <ul className='mt-7 mb-5 w-full text-gray-800 text-base font-semibold'>
                  <li className='flex justify-between items-center mb-2'>
                    <p>Narxi:</p>
                    <p>{getFormattedPrice(amount)} so&apos;m</p>
                  </li>
                  <li className='flex justify-between items-center mb-2'>
                    <p>Cupon:</p>
                    <p>-{getFormattedPrice(cupon?.percentOff) || 0}%</p>
                  </li>
                </ul>
                <hr className='bg-gray-400' />
                <div className='flex justify-between w-full mt-4 mb-7 text-gray-800 font-bold text-2xl'>
                  <p>Jami:</p>
                  <p>{getFormattedPrice(totalAmount)} so&apos;m</p>
                </div>
                <button
                  disabled={!user?.email}
                  onClick={createCheckOutSession}
                  className='text-white disabled:opacity-50 disabled:cursor-not-allowed font-semibold uppercase bg-red rounded-full p-4 w-full'
                >
                  {user?.email ? "BUYURTMANI RASMIYLASHTIRISH" : "Iltimos Oldin kabinetingizga kiring"}
                </button>
              </div>
            </div>
          </div>
        )
        : <EmptyCart title="Savatchangiz b'oshmi? Muammo y'oq!" />
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

/*
<span class="flex items-center justify-center">
  <img src="data:image/svg+xml;base64,++Cg==" alt="spin-circle" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"></span>
*/