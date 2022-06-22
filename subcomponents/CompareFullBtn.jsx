import React, { useEffect, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { addComparedPrd, removeComparedPrd } from 'redux/productSlice';

export default function CampareFullBtn({ id }) {
  const [textRed, setTextRed] = useState(false);
  const dispatch = useDispatch();
  const { comparedPrds } = useSelector(state => state.product);

  const handleClick = () => {
    if (textRed)
      dispatch(removeComparedPrd(id));
    else
      dispatch(addComparedPrd(id));
  };

  useEffect(() => {
    setTextRed(comparedPrds.includes(id));
  }, [comparedPrds]);

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center ${textRed ? "text-red" :"text-gray-400"}`}
    >
      <FiCopy />
      <p className='text-base font-semibold ml-3'>{textRed ? "Taqqoslashga o'tish" : "Taqqoslashdan qo'shish"}</p>
    </button>
  )
}
