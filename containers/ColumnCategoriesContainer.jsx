import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

export default function ColumnCategoriesContainer({ categories, starterSlug }) {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <div className='my-5'>
      <div className='grid grid-cols-1 gap-y-4'>
        {categories?.map(({ slug, name, image, categories2 }) => (
          <div key={slug} className='overflow-hidden'>
            <details open={openDetails} className='bg-gray-100 rounded-xl'>
              <summary className={`flex items-center justify-between px-2 duration-300 rounded-xl ${openDetails && categories2.length ? "bg-gray-200 rounded-b-none" : "bg-gray-100"}`}>
                <Link href={`/${starterSlug}/${slug}`}>
                  <a className='w-full flex items-center justify-start relative'>
                    <Image
                      src={image?.url}
                      alt={name}
                      width={77}
                      height={67}
                      className="!mr-2 !p-2"
                    />
                    <p className='line-clamp-2'>{name}</p>
                  </a>
                </Link>
                {categories2.length
                  ? (
                    <button
                      onClick={() => setOpenDetails(prev => !prev)}
                      className='focus:outline-none flex items-center justify-center p-5 w-14 h-full'
                    >
                      <FiChevronDown className={`transition duration-200 ${openDetails ? "rotate-180" : ""}`} />
                    </button>
                  )
                  : <></>
                }
              </summary>
              {categories2 && (
                <ul className='rounded-b-xl bg-gray-100'>
                  {categories2.map(category2 => (
                    <li key={category2?.slug}>
                      <Link href={`/${starterSlug}/${slug}/${category2?.slug}`}>
                        <a className='flex items-center justify-start p-2'>
                          <Image
                            src={category2?.image?.url}
                            alt={category2?.name}
                            width={77}
                            height={67}
                            className="!mr-2 !p-2"
                          />
                          <p className='line-clamp-2'>{category2?.name}</p>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          </div>
        ))}
      </div>
    </div>
  )
}
