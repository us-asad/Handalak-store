import { ReplyModal } from 'components';
import { hideBodyOverflow } from 'data/functions';
import Image from 'next/image';
import React, { useState } from 'react';
import { UpIcon } from './Icons';

export default function SubCommentCard({ createdAt, text, replies, id, userName }) {
  const [showReplies, setShowReplies] = useState(false);
  const [openRlyModal, setOpenRlyModal] = useState(false);

  const openModal = state => {
    setOpenRlyModal(state);
    hideBodyOverflow(state);
  }

  return (
    <div className='grid grid-cols-1 gap-y-4 -ml-7 md:ml-0'>
      <div className='flex items-start pt-4'>
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
          <p className='w-max font-medium text-sm text-black leading-6 line-clamp-1 border-b border-black border-dashed'>{userName}</p>
          <p className='text-sm leading-4 text-gray-500 mt-2'>{createdAt}</p>
          <p className='text-black text-base leading-5 line-clamp-6 py-4'>{text}</p>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => openModal(true)}
              className='focus:outline-none bg-transparent text-gray-500 text-xs font-semibold border-b border-black border-dashed uppercase'
            >
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
          {showReplies && replies?.map((reply, i) => <SubCommentCard key={i} {...reply} />)}
        </div>
      </div>
      <ReplyModal
        openModal={openModal}
        openRlyModal={openRlyModal}
        id={id}
      />
    </div>
  )
}
