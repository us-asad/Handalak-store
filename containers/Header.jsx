import React from 'react';
import dynamic from 'next/dynamic'

export default function Header() {
  const HeaderBottom = dynamic(() => import("components/HeaderBottom"), {
    ssr: false,
  });
  const HeaderTop = dynamic(() => import("components/HeaderTop"), {
    ssr: false,
  });

  return (
    <div className="bg-grad md:min-h-[150px] text-white">
      <HeaderTop />
      <HeaderBottom />
    </div>
  )
}
