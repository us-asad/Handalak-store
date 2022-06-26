import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBasketPrd } from 'redux/slices/storeProduct';

export default function ProductEventBtns({ short, showModalFunc = Function.prototype }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const { storeProduct: { basket }, product: { id } } = useSelector(state => state);
  const isAdded = basket.findIndex(item => item === id);

  const addToCart = () => {
    if (isAdded === -1)
      dispatch(addBasketPrd(id));
    else {
      showModalFunc(false);
      router.push("/cart");
    }
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <div className={`grid gap-x-4 ${short ? "grid-flow-col auto-cols-max" : "grid-cols-3"}`}>
      <button
        onClick={addToCart}
        className='bg-red hover:bg-white text-white hover:text-red py-2 px-4 rounded-full border border-red border-solid text-sm font-bold'
      >
        Savatchaga {isAdded === -1 ? "qo'shish" : "o'tish"}
      </button>
      <button className='bg-green-500 hover:bg-white text-white hover:text-green-500 py-2 px-4 rounded-full border border-green-500 border-solid text-sm font-bold'>
        Bo&lsquo;lib to&lsquo;lash
      </button>
      <button className='bg-gray-800 hover:bg-white text-white hover:text-gray-800 py-2 px-4 rounded-full border border-gray-800 border-solid text-sm font-bold'>
        Bir klikda sotib olish
      </button>
    </div>
  );
}
