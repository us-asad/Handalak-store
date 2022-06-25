import Image from 'next/image'
import { useState } from 'react';
import { AiFillDislike, AiTwotoneLike } from 'react-icons/ai'
import { ProductRates, SubCommentCard } from 'subcomponents'
import { UpIcon } from 'subcomponents/Icons'

export default function CommentCard({ comment }) {
  const [showReplies, setShowReplies] = useState(false);
  const { rating, createdAt, text, likeCount, dislikeCount, replies } = comment;

  return (
    <div className="flex items-start pt-4">
      <div className='mr-4'>
        <Image
          src="/default_user.jpg"
          alt="default user - Handalak Uz"
          width={44}
          height={44}
          className="rounded-full"
        />
      </div>
      <div className='w-full'>
        <div>
          <p className='w-max font-medium text-sm text-black leading-6 line-clamp-1 border-b border-black border-dashed'>{comment?.userName}</p>
          <div className='mt-2 flex space-x-2 items-center'>
            <ProductRates rates={rating} small />
            <span className='text-sm leading-4 text-gray-500'>{createdAt}</span>
          </div>
        </div>
        <p className='text-black text-base leading-5 py-4'>{text}</p>
        <div className='flex items-center justify-between space-x-4'>
          <div className='flex items-center space-x-4'>
            <button className='focus:outline-none bg-transparent text-gray-500 text-xs font-semibold border-b border-black border-dashed uppercase'>
              Javob Yozish
            </button>
            {replies?.length ? (
              <button
                onClick={() => setShowReplies(prev => !prev)}
                className='flex focus:outline-none bg-transparent text-gray-500 text-xs font-semibold border-b border-black border-dashed uppercase'
              >
                Javoblar
                <UpIcon className={`ml-2 transition duration-200 ${showReplies && "rotate-180"}`} />
              </button>
            ) : <></>}
          </div>
          <div className='flex items-center space-x-2 text'>
            <button className='border-0 focus:outline-none flex items-center mr-5'>
              <AiTwotoneLike className='text-[22px] text-gray-300' />
              <span className='text-sm font-medium ml-2'>{likeCount}</span>
            </button>
            <button className='border-0 focus:outline-none flex items-center mr-5'>
              <AiFillDislike className='text-[22px] text-gray-300' />
              <span className='text-sm font-medium ml-2'>{dislikeCount}</span>
            </button>
          </div>
        </div>
        {showReplies && replies?.map((reply, i) => <SubCommentCard key={i} {...reply} />)}
      </div>
    </div>
  );
}
