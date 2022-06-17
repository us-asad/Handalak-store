import { HeaderBottom, HeaderTop } from 'components';
import React from 'react';

export default function Header() {
  return (
    <div className="bg-grad md:min-h-[150px] text-white">
      <HeaderTop />
      <HeaderBottom />
    </div>
  )
}
