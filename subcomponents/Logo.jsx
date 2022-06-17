import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ src }) {
  return (
    <Link href="/">
      <a className='relative my-auto md:w-[238px] w-[140px] md:h-[25px] h-[21px]'>
        <Image
          src={src}
          alt="Olcha Logo"
          layout='fill'
          objectFit='contain'
        />
      </a>
    </Link>
  )
}
