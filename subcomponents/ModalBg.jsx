import React from 'react'

export default function ModalBg({ state, zIndex }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-grad ${state ? "block" : "hidden"}`}
      style={{zIndex}}
    />
  )
}
