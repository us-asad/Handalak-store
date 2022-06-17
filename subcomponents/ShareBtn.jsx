import React from 'react'
import { ShareIcon } from 'subcomponents/Icons'

export default function ShareBtn({ className }) {
  return (
    <button className={`outline-none bg-white rounded-full border-0 ${className}`}>
      <ShareIcon />
    </button>
  )
}
