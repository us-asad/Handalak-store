import React from 'react'
import { BiX } from 'react-icons/bi';
import { useDispatch } from 'react-redux'
import { toggleModal } from 'redux/slices/toggleModal';

export default function CloseBtn({ modal, className }) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleModal([modal, false]))}
      className={`text-[28px] rounded-full p-1.5 text-black hover:bg-blue-500 hover:text-white bg-transparent transition-colors duration-200 ${className || ""}`}
    >
      <BiX />
    </button>
  )
}
