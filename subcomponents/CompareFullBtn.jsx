import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { addComparedPrd } from 'redux/slices/storeProduct';

export default function CampareFullBtn() {
  const [textRed, setTextRed] = useState(false);
  const dispatch = useDispatch();
  const { storeProduct: { comparedPrds }, product: { id } } = useSelector(state => state);
  const router = useRouter();

  const handleClick = () => {
    if (textRed)
      router.push("/compare")
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
