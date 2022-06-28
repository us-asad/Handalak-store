import { getAllNews } from 'data/graphql';
import Link from 'next/link'
import React from 'react'
import { Blog } from 'subcomponents'

export default function Blogs({ news }) {
  return (
    <div className='custom-container mx-auto mt-3 mb-16'>
      <ul className='my-4 hidden md:flex'>
        <li>
          <Link href="/">
            <a className='block text-base font-medium text-red mr-5'>Bosh sahifa</a>
          </Link>
        </li>
        <li className='text-gray-800 text-base font-medium'>/</li>
        <li className='block text-base font-medium text-gray-400 mx-5'>Handalak Blog</li>
      </ul>
      <h1 className='text-black text-3xl mb-4'>Handalak Blog</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-8 ml-2'>
        {news.map(item => <Blog key={item.slug} {...item} />)}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const news = await getAllNews();

  return {
    props: { news }
  }
}
