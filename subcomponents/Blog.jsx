import moment from 'moment'
import Link from 'next/link'
import React from 'react'

export default function Blog({ slug, title, excerpt, createdAt }) {
  return (
    <Link href={`/blog/${slug}`}>
      <a className='flex flex-col rounded-lg p-4 cursor-pointer relative transform group'>
        <h4 className='text-gray-900 text-lg font-semibold mt-4 group-hover:text-red h-14 line-clamp-2'>{title}</h4>
        <div className='text-gray-700 text-base font-medium line-clamp-8 mb-8 mt-2 h-48 pb-2'>
          {excerpt}
        </div>
        <span className='text-black text-base font-bold absolute bottom-0 right-2 text-right flex'>
          {moment(createdAt).format('DD.MM.YYYY')}
        </span>
      </a>
    </Link>
  )
}
