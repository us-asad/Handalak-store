import React from 'react'
import { ChartIcon } from './Icons'

export default function CompareBtn({ color, className }) {
  return (
    <button className={`relative ${className || ""}`}>
      <ChartIcon color={color || "#fff"} />
    </button>
  )
}
