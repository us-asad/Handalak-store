import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStoredProductState } from 'redux/slices/storeProduct';
import { toggleDynamicModal, toggleModal } from 'redux/slices/toggleModal';
import emailjs from '@emailjs/browser';
import { createCheckOutSession } from 'data/api';

const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_PRE_ORDER_TEMPLATE_ID;
const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ProductEventBtns({ short, product }) {
  const [loading, setLoading] = useState(true);
  const [preOrderResult, setPreOrderResult] = useState({});
  const dispatch = useDispatch();
  const { storeProduct: { basket }, user: { user } } = useSelector(state => state);

  const preOrder = () => {
    if (!user?.id)
      return dispatch(toggleModal(["loginModal", true]));

    const value = {
      user_name: user.name,
      user_email: user.email,
      product_id: product.id
    }

    emailjs.send(emailjsServiceId, emailjsTemplateId, value, emailjsPublicKey)
      .then(() => {
        setPreOrderResult({ ok: true, message: `So'rov muvaffaqiyatli yuborildi, ${user.email} ga javob yuboramiz!` });
        setTimeout(() => {
          setPreOrderResult({});
        }, 5000)
      }, err => {
        setPreOrderResult({ ok: false, message: err.text || "Unknown error, please try again later :(" });
        dispatch(toggleDynamicModal(["product", false]))
      });
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  if (!product?.quantity) return (
    <div>
      <div className='flex items-center gap-x-4'>
        <p className='text-red text-base font-medium uppercase'>OMBORDA MAVJUD EMAS</p>
        <button
          onClick={preOrder}
          className='bg-red text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded-full focus:outline-none border text-sm'
        >Oldindan buyurtma berish</button>
      </div>
      {preOrderResult?.message && (
        <span className={`mt-3 mb-2 block ${preOrderResult?.ok ? "text-green-500" : "text-red"}`}>{preOrderResult.message}</span>
      )}
    </div>
  );

  return (
    <div className={`grid gap-x-4 ${short ? "grid-flow-col auto-cols-max" : "grid-cols-3"}`}>
      <button
        onClick={() => dispatch(changeStoredProductState(["basket", product.id]))}
        className='bg-red hover:bg-white text-white hover:text-red py-2 px-4 rounded-full border border-red border-solid text-sm font-bold'
      >
        {basket.includes(product.id) ? "Savatchadan o'chirish" : "Savatchaga qo'shish"}
      </button>
      <button
        onClick={() => createCheckOutSession(user, [{ ...product, purchaseQty: 1 }, null, `/product/${product?.slug}`])}
        className='bg-green-500 hover:bg-white text-white hover:text-green-500 py-2 px-4 rounded-full border border-green-500 border-solid text-sm font-bold'
      >
        Bir klikda sotib olish
      </button>
    </div>
  );
}
