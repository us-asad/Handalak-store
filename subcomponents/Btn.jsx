import React from 'react'
import Link from 'next/link';

export default function Btn({ children, className, href }) {
  return (
    <Link href={href}>
      <a className={className}>
        {children}
      </a>
    </Link>
  )
}
