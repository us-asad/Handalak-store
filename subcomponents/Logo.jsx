import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ src }) {
  return (
    <Link href="/">
      <a className='relative my-auto md:w-[200px] w-[95px] md:h-[80px] h-[37px]'>
        <Image
          src={src}
          alt="Handalak Logo"
          layout='fill'
          objectFit='contain'
        />
      </a>
    </Link>
  )
}
