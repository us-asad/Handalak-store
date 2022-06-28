import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { SelectRates } from 'subcomponents';
import { toggleModal } from 'redux/slices/toggleModal';
import { setComments } from 'redux/slices/product';

export default function Comment() {
  const [result, setResult] = useState({ ok: null, message: "ads" });
  const { user: { user }, toggleModal: { commentModal }, product: { image, name, id } } = useSelector(state => state);
  const [rates, setRates] = useState(5);
  const commentRef = useRef(null);
  const dispatch = useDispatch();

  const submitComment = async () => {
    const comment = commentRef.current?.value;
    if (!comment)
      return setResult({ ok: false, message: "Iltimos fikringizni yozing." });

    const newComment = {
      text: comment,
      rating: rates,
      userId: user?.id || "",
      replies: [],
      createdAt: new Date().toLocaleString(),
      like: [],
      dislike: [],
      id: nanoid()
    }

    try {
      const updatedComments = await axios.put("/api/comment", { comment: newComment, id });
      
      if (updatedComments.data) {
        dispatch(setComments(updatedComments.data));
        setResult({ ok: true, message: "Izoh muvaffaqiyatli qoldirildi" });
        setTimeout(() => {
          dispatch(toggleModal(["commentModal", false]));
          setResult({ ok: null, message: "" });
        }, 2000);
      }
    } catch (ex) {
      setResult({ ok: false, message: ex.response.data.message || "Nomalum xato aniqlandi, Iltimos kerinroq qayta urinib ko'ring :`(" });
    }
  }

  return (
    <div className={commentModal ? "block" : "hidden"}>
      <div className='fixed max-h-screen min-w-[30vw] translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 overflow-y-auto flex flex-col bg-white h-max z-[51] py-16 px-12 w-full md:w-auto'>
        <button
          onClick={() => dispatch(toggleModal(["commentModal", false]))}
          className='absolute top-5 right-4 text-[30px]'
        >
          <BiX />
        </button>
        <p className={`text-sm ${result.ok === null ? "hidden" : result.ok ? "text-green-500" : "text-red"}`}>{result.message}</p>
        <div className='flex items-center space-x-4 py-6 border-b-2 border-gray-200'>
          <Image
            src={image[0].url}
            alt={name}
            width={60}
            height={60}
          />
          <p className='text-base font-medium text-black'>{name}</p>
        </div>
        <div className='py-6'>
          <p className='text-left text-base leading-5 text-gray-700 mb-2'>Mahsulotga baho bering</p>
          <SelectRates setRates={setRates} rates={rates} />
        </div>
        <div>
          <textarea
            ref={commentRef}
            className='rounded-xl bg-gray-100 w-full p-4 h-44 resize-none focus:outline-none mb-5'
            placeholder="Sizning fikringiz"
          ></textarea>
        </div>
        <button
          onClick={submitComment}
          className='w-full font-bold rounded-lg bg-red text-white focus:outline-none border-0 px-4 py-2'
        >
          Fikr qoldirish
        </button>
      </div>
      <div
        onClick={() => dispatch(toggleModal(["commentModal", false]))}
        className='fixed top-0 left-0 w-full h-full z-[50] bg-grad opacity-50'
      />
    </div>
  )
}
