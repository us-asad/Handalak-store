import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { addSavedPrd, removeSavedPrd } from 'redux/productSlice';

export default function HeartBtn({ id }) {
  const [bgRed, setBgRed] = useState(false);
  const dispatch = useDispatch();
  const { savedPrds } = useSelector(state => state.product);

  const handleClick = () => {
    if (bgRed)
      dispatch(removeSavedPrd(id));
    else
      dispatch(addSavedPrd(id));
  };

  useEffect(() => {
    setBgRed(savedPrds.includes(id));
  }, [savedPrds]);

  return (
    <button
      onClick={handleClick}
      className='outline-none bg-white rounded-full border-0'
    >
      {bgRed
        ? <AiFillHeart className='w-[22px] h-[22px] text-red' />
        : <AiOutlineHeart className='w-[22px] h-[22px] text-red' />
      }
    </button>
  )
}
