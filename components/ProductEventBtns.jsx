import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from 'redux/basketSlice';

export default function ProductEventBtns({ short, id, toggleModal }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.basket);
  let isAdded = items.findIndex(item => item.id === id);

  const addToCart = () => {
    console.log(items, id, "first")
    if (isAdded === -1)
      dispatch(addItem(id));
    else {
      toggleModal();
      router.push("/cart");
    }
    console.log(items, id, "second")

  }
console.log(items, id)
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
