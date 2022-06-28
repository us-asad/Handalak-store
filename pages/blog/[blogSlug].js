import { getBlog } from 'data/graphql';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { MdOutlineDateRange } from 'react-icons/md';
import parser from "html-react-parser";

export default function BlogPage({ blog }) {
  return (
    <div className='custom-container mx-auto'>
      <ul className='my-4 hidden md:flex'>
        <li>
          <Link href="/">
            <a className='block text-base font-medium text-red mr-5'>Bosh sahifa</a>
          </Link>
        </li>
        <li className='text-gray-800 text-base font-medium'>/</li>
        <li className='block text-base font-medium text-gray-400 mx-5'>
          <Link href="/">
            <a className='block text-base font-medium text-red mr-5'>Handalak Blog</a>
          </Link>
        </li>
      </ul>
      <div className='my-4 max-w-[760px] mt-[1rem] mx-auto mb-[6rem]'>
        <div className='mb-3'>
          <Image
            src={blog?.image?.url || "/loading.gif"}
            alt={blog?.title}
            width={720}
            height={400}
            objectFit="contain"
          />
          <h1 className='text-black text-2xl font-bold my-4'>{blog?.title}</h1>
          <div className='flex items-center font-bold space-x-2'>
            <MdOutlineDateRange className='text-red text-[25px]' />
            <span>{moment(blog?.createdAt).format('DD.MM.YYYY')}</span>
          </div>
        </div>
        <div className='descr'>
          {parser(blog?.text?.html || "")}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const blog = await getBlog(context.query.blogSlug);

  return {
    props: { blog }
  }
}
