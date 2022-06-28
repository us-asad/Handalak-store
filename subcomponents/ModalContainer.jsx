import React from 'react'
import { BiX } from 'react-icons/bi'

export default function ModalContainer({ state, zIndex, children, closeEvent, className }) {
  return (
    <div className={state ? "block" : "hidden"}>
      <div
        className={className}
        style={{ zIndex }}
      >
        <button
          onClick={closeEvent}
          className="absolute top-3 right-5 text-[28px] rounded-full p-1.5 text-black hover:bg-blue-500 hover:text-white bg-transparent transition-colors duration-200"
        >
          <BiX />
        </button>
        {children}
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-grad opacity-50"
        style={{ zIndex: zIndex - 1 }}
        onClick={closeEvent}
      />
    </div>
  )
}
