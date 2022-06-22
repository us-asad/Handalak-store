import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi';

export default function SubCategories({ subCategories }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <details
      hidden={!subCategories?.length}
      onToggle={() => setOpen(prev => !prev)}
      open={open}
      className="overflow-hidden"
    >
      <summary className='flex justify-between mb-4 cursor-pointer'>
        <p className='text-gray-800 font-bold text-xl'>Kategoriyalar</p>
        <FiChevronDown className={`text-red text-[24px] transition duration-200 ${open && "rotate-180"}`} />
      </summary>
      <ul className='grid grid-cols-1 gap-y-2 pl-3'>
        {subCategories?.map(ctg => (
          <li key={ctg?.slug}>
            <Link href={`${router.asPath}/${ctg?.slug || ""}`}>
              <a>{ctg?.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
