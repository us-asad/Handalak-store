import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addComparedPrd, removeComparedPrd } from 'redux/productSlice';
import { ChartIcon } from './Icons'

export default function CompareBtn({ color, className, id }) {
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
      className={`relative ${className || ""}`}
    >
      <ChartIcon color={textRed ? "red" : color || "#fff"} />
    </button>
  )
}
