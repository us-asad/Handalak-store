import Image from 'next/image'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDynamicModal } from 'redux/slices/toggleModal';
import { ProductRates, SubCommentCard } from 'subcomponents'
import { UpIcon } from 'subcomponents/Icons'

export default function CommentCard({ rating, createdAt, text, replies, id, userName, prdId }) {
  const [showReplies, setShowReplies] = useState(false);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

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
          <p className='w-max font-medium text-sm text-black leading-6 line-clamp-1 border-b border-black border-dashed'>{userName}</p>
          <div className='mt-2 flex space-x-2 items-center'>
            <ProductRates rates={rating} small />
            <span className='text-sm leading-4 text-gray-500'>{createdAt}</span>
          </div>
        </div>
        <p className='text-black text-base leading-5 py-4'>{text}</p>
        <div className='flex items-center justify-between space-x-4'>
          <div className='flex items-center space-x-4'>
            {user && (
              <button
                onClick={() => dispatch(toggleDynamicModal(["reply", true, { commentId: id, prdId }]))}
                className='focus:outline-none bg-transparent text-gray-500 text-xs font-semibold border-b border-black border-dashed uppercase'
              >
                Javob Yozish
              </button>
            )}
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
        </div>
        {showReplies && replies?.map((reply, i) => <SubCommentCard key={i} {...reply} prdId={prdId} />)}
      </div>
    </div>
  );
}
